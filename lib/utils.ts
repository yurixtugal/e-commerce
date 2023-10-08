import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import BillBoard from "@prisma/client";
import { ProductAllDetail } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatValue = (value: any): string => {
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (value instanceof Date) {
    return value.toLocaleDateString();
  }

  if (typeof value === "object" && value !== null) {
    try {
      return parseModelPrisma(value);
    } catch (error) {
      return value.toString();
    }
  }

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number") {
    return value.toString();
  }

  if (typeof value === "undefined") {
    return "---";
  }

  return value;
};

function parseModelPrisma(value: any): string {
  try {
    const model = JSON.parse(JSON.stringify(value));
    return model["name"] || model["label"];
  } catch (error) {
    return value.toString();
  }
}

export const getColors = (product: ProductAllDetail) => {
  if (product.isVariant) {
    const colors = product.variants.map((variant) => variant.Color);
    return colors.filter((color, index) => colors.map((color) => color.id).indexOf(color.id) === index);
  }
  return null;
};

export const getSize = (product: ProductAllDetail) => {
  if (product.isVariant) {
    const sizes = product.variants.map((variant) => variant.Size);
    return sizes.filter((size, index) => sizes.map((size) => size.id).indexOf(size.id) === index);
  }
  return null;
}

export const getSingleQuantity = (product: ProductAllDetail) => {
  if (!product.isVariant) {
    return product.variants.reduce((prev, curr) => prev + curr.quantity, 0);
  }
  return -1;
}
