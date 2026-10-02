import { promises as fs } from "fs";
import path from "path";
import { Category } from "@/types/database";
import { initialCategories } from "./initialData";
import { setMemoryCategories, getMemoryCategories } from "./store";

const DATA_DIR = path.join(process.cwd(), "data");
const CATEGORIES_FILE = path.join(DATA_DIR, "categories.json");

let isInitialized = false;

/**
 * Loads categories from local disk (data/categories.json).
 * If the file doesn't exist, initializes it from initialCategories.
 */
export async function loadPersistedCategories(): Promise<Category[]> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });

    try {
      const content = await fs.readFile(CATEGORIES_FILE, "utf-8");
      const parsed: Category[] = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setMemoryCategories(parsed);
        isInitialized = true;
        return parsed;
      }
    } catch {
      // File does not exist yet or is empty
    }

    // Initialize with initialCategories
    const currentMemory = getMemoryCategories();
    const sourceData = currentMemory.length > 0 ? currentMemory : initialCategories;
    await fs.writeFile(CATEGORIES_FILE, JSON.stringify(sourceData, null, 2), "utf-8");
    setMemoryCategories(sourceData);
    isInitialized = true;
    return sourceData;
  } catch (err) {
    console.warn("Failed to read categories from disk, using in-memory store:", err);
    return getMemoryCategories();
  }
}

/**
 * Saves or updates a category and persists to data/categories.json.
 */
export async function savePersistedCategory(category: Partial<Category>): Promise<Category> {
  const currentCategories = await loadPersistedCategories();

  let savedCategory: Category;

  if (category.id) {
    const index = currentCategories.findIndex((c) => c.id === category.id);
    if (index !== -1) {
      savedCategory = {
        ...currentCategories[index],
        ...category,
        updated_at: new Date().toISOString(),
      } as Category;
      currentCategories[index] = savedCategory;
    } else {
      savedCategory = {
        id: category.id,
        name: category.name || "Unnamed Category",
        slug: category.slug || `category-${Date.now()}`,
        description: category.description || null,
        image_url: category.image_url || null,
        parent_id: category.parent_id || null,
        sort_order: category.sort_order || currentCategories.length + 1,
        is_active: category.is_active ?? true,
        featured_in_menu: category.featured_in_menu ?? true,
        menu_badge: category.menu_badge || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      currentCategories.push(savedCategory);
    }
  } else {
    savedCategory = {
      id: `cat-${Date.now()}`,
      name: category.name || "New Category",
      slug: category.slug || `category-${Date.now()}`,
      description: category.description || null,
      image_url: category.image_url || null,
      parent_id: category.parent_id || null,
      sort_order: category.sort_order || currentCategories.length + 1,
      is_active: category.is_active ?? true,
      featured_in_menu: category.featured_in_menu ?? true,
      menu_badge: category.menu_badge || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    currentCategories.push(savedCategory);
  }

  // Update in-memory state
  setMemoryCategories(currentCategories);

  // Persist to disk
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(CATEGORIES_FILE, JSON.stringify(currentCategories, null, 2), "utf-8");
  } catch (err) {
    console.warn("Failed to write updated categories to disk:", err);
  }

  return savedCategory;
}

/**
 * Deletes a category and updates data/categories.json.
 */
export async function deletePersistedCategory(id: string): Promise<boolean> {
  const currentCategories = await loadPersistedCategories();
  const filtered = currentCategories.filter((c) => c.id !== id);

  setMemoryCategories(filtered);

  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(CATEGORIES_FILE, JSON.stringify(filtered, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.warn("Failed to write after category deletion:", err);
    return true;
  }
}
