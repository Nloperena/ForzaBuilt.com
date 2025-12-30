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
    if ((a as any)[property] < (b as any)[property]) return direction === "asc" ? -1 : 1;
    if ((a as any)[property] > (b as any)[property]) return direction === "asc" ? 1 : -1;
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
      const value = (item as any)[prop];
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

/**
 * Generates a URL-safe slug from a title.
 * - Lowercases
 * - Converts diacritics
 * - Replaces ampersands with "and"
 * - Replaces non-alphanumeric with hyphens
 * - Collapses duplicate hyphens and trims
 */
export function generateSlugFromTitle(title: string): string {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Splits a product name on any dash type (en dash, em dash, or regular hyphen)
 * Returns the part before the dash, or the full name if no dash is found
 */
export function getProductNameTitle(name: string): string {
  if (!name) return '';
  // Split on en dash (–), em dash (—), or regular hyphen (-)
  const parts = name.split(/[–—\-]/);
  return parts[0]?.trim() || name;
}

/**
 * Gets the subtitle/description part of a product name (after the dash)
 * Returns the part after the dash, or empty string if no dash is found
 */
export function getProductNameSubtitle(name: string): string {
  if (!name) return '';
  // Split on en dash (–), em dash (—), or regular hyphen (-)
  const parts = name.split(/[–—\-]/);
  return parts[1]?.trim() || '';
}