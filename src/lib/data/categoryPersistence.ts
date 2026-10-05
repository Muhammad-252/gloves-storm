import { promises as fs } from "fs";
import path from "path";
import { Category } from "@/types/database";
import { initialCategories } from "./initialData";
import { setMemoryCategories } from "./store";

// Global cache to maintain persistent memory across serverless lambda executions
declare global {
  // eslint-disable-next-line no-var
  var __gs_categories_cache: Category[] | undefined;
}

const DATA_DIR = path.join(process.cwd(), "data");
const CATEGORIES_FILE = path.join(DATA_DIR, "categories.json");

/**
 * Loads categories from global memory cache or local disk (data/categories.json).
 * Fallback to initialCategories if file is unavailable.
 */
export async function loadPersistedCategories(): Promise<Category[]> {
  // 1. Return from global in-memory cache if already loaded or modified
  if (
    globalThis.__gs_categories_cache &&
    Array.isArray(globalThis.__gs_categories_cache) &&
    globalThis.__gs_categories_cache.length > 0
  ) {
    setMemoryCategories(globalThis.__gs_categories_cache);
    return globalThis.__gs_categories_cache;
  }

  // 2. Try loading from data/categories.json
  try {
    const content = await fs.readFile(CATEGORIES_FILE, "utf-8");
    const parsed: Category[] = JSON.parse(content);
    if (Array.isArray(parsed) && parsed.length > 0) {
      globalThis.__gs_categories_cache = parsed;
      setMemoryCategories(parsed);
      return parsed;
    }
  } catch {
    // File not readable or does not exist
  }

  // 3. Fallback to initialCategories
  globalThis.__gs_categories_cache = [...initialCategories];
  setMemoryCategories(globalThis.__gs_categories_cache);
  return globalThis.__gs_categories_cache;
}

/**
 * Synchronous accessor for in-memory categories cache
 */
export function getCachedCategories(): Category[] {
  if (
    globalThis.__gs_categories_cache &&
    Array.isArray(globalThis.__gs_categories_cache) &&
    globalThis.__gs_categories_cache.length > 0
  ) {
    return globalThis.__gs_categories_cache;
  }
  return initialCategories;
}

/**
 * Updates the in-memory cache directly
 */
export function setCachedCategories(categories: Category[]) {
  globalThis.__gs_categories_cache = categories;
}

/**
 * Saves or updates a category, updating global memory cache and persisting to data/categories.json.
 */
export async function savePersistedCategory(category: Partial<Category>): Promise<Category> {
  const currentCategories = await loadPersistedCategories();
  const list = [...currentCategories];

  let savedCategory: Category;

  if (category.id) {
    const index = list.findIndex((c) => c.id === category.id);
    if (index !== -1) {
      savedCategory = {
        ...list[index],
        ...category,
        updated_at: new Date().toISOString(),
      } as Category;
      list[index] = savedCategory;
    } else {
      savedCategory = {
        id: category.id,
        name: category.name || "Unnamed Category",
        slug: category.slug || `category-${Date.now()}`,
        description: category.description || null,
        image_url: category.image_url || null,
        parent_id: category.parent_id || null,
        sort_order: category.sort_order ?? list.length + 1,
        is_active: category.is_active ?? true,
        featured_in_menu: category.featured_in_menu ?? true,
        menu_badge: category.menu_badge || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      list.push(savedCategory);
    }
  } else {
    savedCategory = {
      id: `cat-${Date.now()}`,
      name: category.name || "New Category",
      slug: category.slug || `category-${Date.now()}`,
      description: category.description || null,
      image_url: category.image_url || null,
      parent_id: category.parent_id || null,
      sort_order: category.sort_order ?? list.length + 1,
      is_active: category.is_active ?? true,
      featured_in_menu: category.featured_in_menu ?? true,
      menu_badge: category.menu_badge || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    list.push(savedCategory);
  }

  // Update global cache immediately
  globalThis.__gs_categories_cache = list;
  setMemoryCategories(list);

  // Persist to disk if file system is writable (local dev & build)
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(CATEGORIES_FILE, JSON.stringify(list, null, 2), "utf-8");
  } catch (err) {
    console.warn("Notice: File write skipped on serverless filesystem (cached in global memory):", err);
  }

  return savedCategory;
}

/**
 * Deletes a category and updates global memory cache and data/categories.json.
 */
export async function deletePersistedCategory(id: string): Promise<boolean> {
  const currentCategories = await loadPersistedCategories();
  const filtered = currentCategories.filter((c) => c.id !== id);

  globalThis.__gs_categories_cache = filtered;
  setMemoryCategories(filtered);

  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(CATEGORIES_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  } catch (err) {
    console.warn("Notice: File write skipped on serverless filesystem (cached in global memory):", err);
  }

  return true;
}
