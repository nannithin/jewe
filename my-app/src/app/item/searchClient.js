"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import ItemCard from "@/components/cardd";

export default function SearchClient() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const category = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchResults = async () => {
      try {
        let query = "";

        if (search) query += `search=${search}`;
        if (category) query += `${search ? "&" : ""}category=${category}`;

        const res = await api.get(`/products?${query}`);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [search, category]);

  if (!search && !category) {
    return <p className="p-5">Search for products</p>;
  }

  if (loading) {
    return <p className="p-5">Loading results...</p>;
  }

  return (
    <div className="p-5 space-y-5 pb-32 pt-8">
      <h1 className="text-xl">
        Search results for “{search}”
      </h1>

      {products.length === 0 ? (
        <p className="text-muted-foreground">
          No products found
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {products.map((product) => (
            <ItemCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
