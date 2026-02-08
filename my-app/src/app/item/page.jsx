export const dynamic = "force-dynamic";


"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import ItemCard from "@/components/cardd";

export default function ItemSearchPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!search) return;

    const fetchResults = async () => {
      try {
        const res = await api.get(`/products?search=${search}`);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [search]);

  if (!search) {
    return <p className="p-5">Search for products</p>;
  }

  if (loading) {
    return <p className="p-5">Loading results...</p>;
  }

  return (
    <div className="p-5 space-y-5 pb-32">
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
