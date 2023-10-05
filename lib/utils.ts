import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import BillBoard from "@prisma/client";

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
