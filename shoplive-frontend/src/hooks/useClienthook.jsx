"use client"; // THIS IS REQUIRED FOR NEXT.JS APP ROUTER

import { useState, useCallback } from "react";

const API_BASE_URL = "http://localhost:8000";

/**
 * Client-side CRUD operations
 * Use this in Client Components for create, update, delete
 */
export const useClientCrud = (collectionName) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // CREATE
  const createItem = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/${collectionName}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create item");
      return await res.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  // UPDATE
  const updateItem = useCallback(async (id, payload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/${collectionName}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to update item");
      return await res.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  // DELETE
  const deleteItem = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/${collectionName}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete item");
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  return { loading, error, createItem, updateItem, deleteItem };
};