import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "@/data/site";
import { PRODUCTS } from "@/data/products";

export function useProducts() {
  const [products, setProducts] = useState(PRODUCTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    axios
      .get(`${API}/products`)
      .then((r) => {
        if (active && Array.isArray(r.data)) setProducts(r.data);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { products, loading };
}
