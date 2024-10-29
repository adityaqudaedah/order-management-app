"use client";

import Button from "@/components/atoms/button";
import Input from "@/components/atoms/input";
import { fetcher } from "@/lib/utils/fetcher";
import { Orders, OrderItem, METHOD } from "@/lib/utils/types";
import dayjs from "dayjs";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import Swal from "sweetalert2";

export default function Home() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [customerName, setCustomerName] = useState("");
  const [value, setValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const customer_name = searchParams.get("customerName");
  const current_page = searchParams.get("page");
  const current_row_per_page = searchParams.get("limit");
  const order_date = searchParams.get("orderDate");

  const { data, isLoading } = useQuery({
    queryKey: [
      "dataTableOrder",
      customer_name,
      current_page,
      current_row_per_page,
      order_date,
    ],
    queryFn: async () => {
      const response: Orders = await fetcher("/orders", METHOD.GET, {
        params: {
          customer_name: customer_name,
          limit: current_row_per_page,
          page: current_page,
          order_date: order_date,
        },
      });
      return await response;
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const response = await fetcher(`/order/${id}`, METHOD.DELETE);
      return await response;
    },
    onSuccess: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data success deleted",
        showConfirmButton: false,
        timer: 1500,
      }).then(() =>
        queryClient.invalidateQueries({ queryKey: ["dataTableOrder"] })
      );
      // Invalidate and refetch
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    },
  });

  const columns: TableColumn<OrderItem>[] = [
    {
      name: "Order Id",
      selector: (row) => row.id,
    },
    {
      name: "Customer",
      selector: (row) => row.customer_name,
    },
    {
      name: "Total Products",
      selector: (row) => row.total_products,
    },
    {
      name: "Total Price",
      selector: (row) => row.total_price,
    },
    {
      name: "Edit",
      cell: (row) => (
        <Button
          onClick={() => router.push(`/orders/${row.id}/edit`)}
          label="Edit"
          buttontype="DEFAULT"
          bg="bg-custom-default"
        />
      ),
    },
    {
      name: "Detail",
      cell: (row) => (
        <Button
          onClick={() => router.push(`/orders/${row.id}`)}
          label="Detail"
          buttontype="PRIMARY"
          bg="bg-custom-secondary"
        />
      ),
    },
    {
      name: "Delete",
      cell: (row) => (
        <Button
          onClick={() => mutation.mutate({ id: row.id })}
          label="Delete"
          buttontype="PRIMARY"
          bg="bg-red-500"
        />
      ),
    },
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const params = new URLSearchParams(searchParams.toString());
      params.set("customerName", customerName);
      params.delete("page"); // Reset page when doing a new search
      router.push(`?${params.toString()}`);
    }
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const handlePerRowsChange = (newPerPage: number, page: number) => {
    setPerPage(newPerPage);
    setPage(page); // Ensure page is set when limit changes
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", newPerPage.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <main className="flex flex-col space-y-6">
      <div className="flex flex-row justify-between items-center">
        {/* left */}
        <div className="flex flex-row">
          <div className="flex flex-row w-custom-search-input">
            <Input
              label="Customer Name"
              placeholder="customer name"
              onChange={(e) => setCustomerName(e.currentTarget.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700">
              Create Date
            </label>
            <Datepicker
              displayFormat="DD/MM/YYYY"
              placeholder="Select Date"
              asSingle={true}
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
                const params = new URLSearchParams(searchParams.toString());
                const formattedDate = dayjs(newValue?.startDate).format(
                  "DD/MM/YYYY"
                );
                params.set("orderDate", formattedDate);
                router.push(`?${params.toString()}`);
              }}
              classNames={{
                input: () => "border border-gray-300 rounded-lg p-2",
              }}
            />
          </div>
        </div>

        {/* right */}
        <div className="flex flex-row">
          <Button
            label="Add New Order"
            buttontype="PRIMARY"
            bg="bg-custom-primary"
            onClick={(e) => {
              e.preventDefault();
              router.push("/orders/new-order");
            }}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <DataTable
          columns={columns}
          data={data?.list || []}
          progressPending={isLoading}
          pagination
          paginationServer
          paginationTotalRows={data?.total || 0}
          paginationDefaultPage={page} // Ensure correct default page is passed
          paginationPerPage={perPage}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlePerRowsChange}
          customStyles={{
            pagination: {
              style: {
                justifyContent: "right", // center pagination
                paddingTop: "10px", // add padding above the pagination
              },
            },
          }}
        />
      </div>
    </main>
  );
}
