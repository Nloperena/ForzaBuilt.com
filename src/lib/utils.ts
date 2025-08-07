import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date to a readable string
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Creates a type-safe fetcher for data
 */
export async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }
  return response.json() as Promise<T>;
}

/**
 * Sorts an array of objects by a property
 */
export function sortByProperty<T>(
  array: T[],
  property: keyof T,
  direction: "asc" | "desc" = "asc"
): T[] {
  return [...array].sort((a, b) => {
    if (a[property] < b[property]) return direction === "asc" ? -1 : 1;
    if (a[property] > b[property]) return direction === "asc" ? 1 : -1;
    return 0;
  });
}

/**
 * Filters an array by a search term across multiple properties
 */
export function filterBySearchTerm<T>(
  array: T[],
  searchTerm: string,
  properties: (keyof T)[]
): T[] {
  if (!searchTerm) return array;
  
  const term = searchTerm.toLowerCase();
  
  return array.filter(item =>
    properties.some(prop => {
      const value = item[prop];
      if (typeof value === "string") {
        return value.toLowerCase().includes(term);
      }
      return false;
    })
  );
}

/**
 * Generates a unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Deep clones an object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}