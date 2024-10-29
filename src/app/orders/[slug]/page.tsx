"use client";

import { fetcher } from "@/lib/utils/fetcher";
import { METHOD, type OrderDetail, type OrderDetailData } from "@/lib/utils/types";
import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useQuery } from "react-query";

const OrderDetail = ({ params }: { params: { slug: string } }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["dataOrderDetail",params.slug],
    queryFn: async () => {
      const response: OrderDetail = await fetcher(`/order/${params.slug}`,METHOD.GET);
      return await response;
    },
  });
  const columns: TableColumn<OrderDetailData>[] = [
    {
      name: "Product Name",
      selector: (row) => row.product.name,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
    },
    { name: "Price (Rp)", selector: (row) => row.product.price },
  ];

    if (isLoading) return <div>loading...</div>;

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-light text-black">Order Id</p>
          <p className="text-lg font-bold text-custom-text-order-detail">
            {data?.order_id}
          </p>
        </div>
      </div>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-light text-black">Customer Name</p>
          <p className="text-lg font-bold text-custom-text-order-detail">
            {data?.customer_name}
          </p>
        </div>
      </div>
      <DataTable columns={columns} data={data?.products || []} />
    </div>
  );
};

export default OrderDetail;
