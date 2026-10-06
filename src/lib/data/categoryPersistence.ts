import { Category } from "@/types/database";
import {
  getDbCategories,
  saveDbCategory,
  deleteDbCategory,
} from "./fileDb";
import { setMemoryCategories } from "./store";

export async function loadPersistedCategories(): Promise<Category[]> {
  const cats = await getDbCategories();
  setMemoryCategories(cats);
  return cats;
}

export function getCachedCategories(): Category[] {
  if (
    globalThis.__gs_db_categories &&
    Array.isArray(globalThis.__gs_db_categories) &&
    globalThis.__gs_db_categories.length > 0
  ) {
    return globalThis.__gs_db_categories;
  }
  return [];
}

export function setCachedCategories(categories: Category[]) {
  globalThis.__gs_db_categories = categories;
  setMemoryCategories(categories);
}

export async function savePersistedCategory(category: Partial<Category>): Promise<Category> {
  const saved = await saveDbCategory(category);
  const updated = await getDbCategories();
  setMemoryCategories(updated);
  return saved;
}

export async function deletePersistedCategory(id: string): Promise<boolean> {
  const ok = await deleteDbCategory(id);
  const updated = await getDbCategories();
  setMemoryCategories(updated);
  return ok;
}
