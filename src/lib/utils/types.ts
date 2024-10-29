export type Product = {
  id: number;
  name: string;
  price: number;
};

export type TProduct = {
  data : Array<Product>
}

export type CreateOrder = {
  customer_name: string;
  products: Array<{ product_id: string; quantity: number }>;
  total_order_price : number
};
export type OrderDetailData = {
  quantity: number;
  product: Product;
};

export type OrderDetail = {
  order_id: string;
  customer_name: string;
  products: Array<OrderDetailData>;
};

export type OrderItem = {
  id: string;
  customer_name: "string";
  total_products: number;
  total_price: number;
  created_at: string;
};

export type Orders = {
  page: number;
  limit: number;
  total: number;
  list: Array<OrderItem>;
};

export enum METHOD {
  GET = "get",POST = "post", DELETE = "delete",PUT = "put"
}