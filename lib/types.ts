import { ImagesProduct, Product } from "@prisma/client";

export type ProductWithImage = Product & {
  images: ImagesProduct[]
}