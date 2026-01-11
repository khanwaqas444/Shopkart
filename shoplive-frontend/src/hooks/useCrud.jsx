
// "use client"; // <--- THIS IS REQUIRED FOR NEXT.JS APP ROUTER

// import { useState, useEffect, useCallback } from "react";

// const API_BASE_URL = "http://localhost:8000";

// /**
//  * @param {string} collectionName - The endpoint to target (e.g., "users", "analytics")
//  */
// export const useCrud = (collectionName) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // 1. READ (List)
//   const fetchItems = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(`${API_BASE_URL}/${collectionName}/`);
//       if (!res.ok) throw new Error("Failed to fetch items");
//       const result = await res.json();
//       setData(result);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [collectionName]);

//   // Load data automatically when collectionName changes
//   useEffect(() => {
//     if (collectionName) fetchItems();
//   }, [fetchItems, collectionName]);

//   // 2. CREATE
//   const createItem = async (payload) => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE_URL}/${collectionName}/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       if (!res.ok) throw new Error("Failed to create item");
      
//       const newItem = await res.json();
//       // Update UI immediately
//       setData((prev) => [...prev, newItem]); 
//       return newItem;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 3. UPDATE
//   const updateItem = async (id, payload) => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE_URL}/${collectionName}/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       if (!res.ok) throw new Error("Failed to update item");

//       const updatedItem = await res.json();
//       // Update UI locally
//       setData((prev) => prev.map((item) => (item.id === id ? updatedItem : item)));
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 4. DELETE
//   const deleteItem = async (id) => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE_URL}/${collectionName}/${id}`, {
//         method: "DELETE",
//       });
//       if (!res.ok) throw new Error("Failed to delete item");

//       // Remove from UI locally
//       setData((prev) => prev.filter((item) => item.id !== id));
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { data, loading, error, fetchItems, createItem, updateItem, deleteItem };
// };



// second vesion

"use client";

import { useState, useEffect, useCallback } from "react";

const API_BASE_URL = "http://localhost:8000";

/**
 * @param {string} collectionName - The endpoint to target (e.g., "sellerProfile", "products")
 */
export const useCrud = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. READ (List)
  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/${collectionName}/`);
      if (!res.ok) throw new Error(`Failed to fetch ${collectionName}`);
      const result = await res.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  useEffect(() => {
    if (collectionName) fetchItems();
  }, [fetchItems, collectionName]);

  // 2. CREATE
  const createItem = async (payload) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/${collectionName}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create item");
      
      const newItem = await res.json();
      
      // Update UI immediately. 
      // We use result from server because it contains the new MongoDB _id
      setData((prev) => [...prev, newItem]); 
      return newItem;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 3. UPDATE
  const updateItem = async (id, payload) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/${collectionName}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to update item");

      const updatedItem = await res.json();
      
      // FIX: Check for both _id (MongoDB) and id (Standard)
      setData((prev) => prev.map((item) => 
        (item._id === id || item.id === id ? updatedItem : item)
      ));
      return updatedItem;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 4. DELETE
  const deleteItem = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/${collectionName}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete item");

      // FIX: Check for both _id (MongoDB) and id (Standard)
      setData((prev) => prev.filter((item) => item._id !== id && item.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchItems, createItem, updateItem, deleteItem };
};