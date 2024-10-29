"use client";

import Button from "@/components/atoms/button";
import Input from "@/components/atoms/input";
import SelectInputForm from "@/components/atoms/select-input-form";
import { fetcher } from "@/lib/utils/fetcher";
import { METHOD, Product } from "@/lib/utils/types";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Swal from "sweetalert2";

type TProduct = {
  data: Array<Product>;
};

type TProductFormValues = {
  customer_name: string;
  products: Array<{
    product_name: string;
    quantity: number;
    price: number;
    total_product_price: number;
  }>;
  total_order_price: number;
};

const NewOrder = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<TProductFormValues>({
    defaultValues: {
      customer_name: "test",
      products: [
        { product_name: "", quantity: 0, price: 0, total_product_price: 0 },
      ],
      total_order_price: 0,
    },
    mode: "onSubmit",
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (reqData: TProductFormValues) => {
      const transformedData = {
        ...reqData,
        products: reqData.products.map((product, index) => ({
          ...product,
          product_id: index + 1,
        })),
      };
      const response = await fetcher(`/order`, METHOD.POST, {
        data: transformedData,
      });
      return await response;
    },
    onSuccess: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      })
        .then(() => router.push("/"))
        .then(() =>
          queryClient.invalidateQueries({ queryKey: ["dataTableOrder"] })
        );
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  });
  const { fields, append } = useFieldArray({
    name: "products",
    control,
  });

  const productValues = useWatch({
    name: "products",
    control,
  });
  const total = productValues.reduce(
    (acc: number, current: { total_product_price: number }) =>
      acc + (current.total_product_price || 0),
    0
  );

  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["dataProducts"],
    queryFn: async () => {
      const response: TProduct = await fetcher("/products", METHOD.GET);
      return await response;
    },
  });

  const onSubmit: SubmitHandler<TProductFormValues> = (data) => {
    mutation.mutate({ ...data });
  };

  useEffect(() => {
    setValue("total_order_price", total || 0);
  }, [setValue, total]);

  if (isLoading) {
    return <div>...loading</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      {/* top-field */}
      <div className="space-y-6 w-custom-input">
        <Input
          register={{
            ...register("customer_name", {
              required: true,
            }),
          }}
          label="Customer Name"
          required
          placeholder="input customer name"
          error={errors?.customer_name && true}
          errorMessage="This field is required"
        />
      </div>

      {/* mid-field */}
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="flex flex-col">
            <h3 className="text-sm text-gray-300">Product Detail</h3>

            <div className="flex flex-row justify-between">
              {/* left */}
              <div className="flex flex-col w-custom-input">
                <div className="space-y-3">
                  <SelectInputForm
                    register={{
                      ...register(`products.${index}.product_name` as const, {
                        onChange: () => {
                          setValue(
                            `products.${index}.price`,
                            data?.data[index].price || 0
                          );
                        },
                        required: true,
                      }),
                    }}
                    required={true}
                    label="Product Name"
                    placeholder="select"
                    options={
                      data?.data.map((dataProduct) => ({
                        value: dataProduct.id.toString(),
                        label: dataProduct.name,
                        price: dataProduct.price,
                      })) || []
                    }
                    error={errors?.products?.[index]?.product_name && true}
                    errorMessage="This field is required"
                  />
                </div>

                <div className="space-y-3">
                  <Input
                    register={{
                      ...register(`products.${index}.quantity` as const, {
                        required: true,
                        onChange: (val) => {
                          console.log(val.target.value);
                          setValue(
                            `products.${index}.total_product_price`,
                            (data?.data[index].price || 0) *
                              val?.target?.value || 0
                          );
                        },
                      }),
                    }}
                    type="number"
                    label="Quantity"
                    required
                    placeholder="input quantity"
                    error={errors?.products?.[index]?.quantity && true}
                    errorMessage="This field is required"
                  />
                </div>
              </div>

              {/* right */}
              <div className="flex flex-col w-custom-input">
                <div className="space-y-3">
                  <Input
                    register={{
                      ...register(`products.${index}.price` as const, {}),
                    }}
                    type="number"
                    label="Price"
                    disabled
                    placeholder="you need to select product name"
                  />
                </div>

                <div className="space-y-3">
                  <Input
                    register={{
                      ...register(
                        `products.${index}.total_product_price` as const,
                        {}
                      ),
                    }}
                    type="number"
                    label="Total Product Price"
                    disabled
                    placeholder="you need to input quantity"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="flex flex-row w-full mt-2">
        <Button
          onClick={() =>
            append({
              product_name: "",
              quantity: 0,
              price: 0,
              total_product_price: 0,
            })
          }
          label="Add More Product"
          buttontype="PRIMARY"
          bg="bg-custom-secondary"
        />
      </div>
      {/* bottom-field */}
      <div className="space-y-6 w-custom-input mt-6">
        <Input
          register={{
            ...register("total_order_price", {
              // required: true,
            }),
          }}
          disabled
          label="Total Order Price"
          placeholder="Total price"
        />
      </div>

      <div className="flex flex-row w-full space-x-2">
        <Button
          type="submit"
          label="Save"
          buttontype="PRIMARY"
          bg="bg-custom-primary"
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            router.push("/");
          }}
          label="Back"
          buttontype="DEFAULT"
          bg="bg-custom-default"
        />
      </div>
    </form>
  );
};

export default NewOrder;
