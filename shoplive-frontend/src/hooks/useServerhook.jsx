// Define your API URL (Use env variable in real app, but this works for now)
const API_BASE_URL = "http://localhost:8000";

/**
 * 1. Fetch ALL Products
 * Usage: const products = await getServerProducts();
 */
export async function getServerProducts() {
  try {
    const res = await fetch(`${API_BASE_URL}/products/`, {
      cache: "no-store", // Ensures you get fresh data every time you refresh
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return empty array so the app doesn't crash
  }
}

/**
 * 2. Fetch Single Product (Optional, if you need a detail page later)
 * Usage: const product = await getServerProductById("123");
 */
export async function getServerProductById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}