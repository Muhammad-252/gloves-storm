import { Category } from "@/types/database";
import {
  getDbCategories,
  saveDbCategory,
  deleteDbCategory,
} from "./fileDb";

export async function loadPersistedCategories(): Promise<Category[]> {
  return getDbCategories();
}

export function getCachedCategories(): Category[] {
  return [];
}

export function setCachedCategories(_categories: Category[]) {}

export async function savePersistedCategory(category: Partial<Category>): Promise<Category> {
  return saveDbCategory(category);
}

export async function deletePersistedCategory(id: string): Promise<boolean> {
  return deleteDbCategory(id);
}
