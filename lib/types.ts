import { Category, Color, ImagesProduct, Product, Size, Store, VariantProduct } from "@prisma/client";
import { z } from "zod";

export type ProductDetail = Product & {
  images: ImagesProduct[]
} & {
  variants: VariantProduct[]
}

export type ProductAllDetail = Product & {
  images: ImagesProduct[]
  variants: (VariantProduct & {
    Size: Size
    Color: Color
  })[]
  Category: Category
  Store: Store
} 

export const variantSchema = z.object({
  sizeId: z.string().min(1, { message: "Size is required" }),
  colorId: z.string().min(1, { message: "Color is required" }),
  quantity: z.coerce.number().min(1, { message: "Quantity is required" }),
  price: z.coerce.number().min(1, { message: "Price is required" }),
});