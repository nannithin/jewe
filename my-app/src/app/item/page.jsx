import { Suspense } from "react";
import SearchClient from "./searchClient";

export default function ItemPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <SearchClient />
    </Suspense>
  );
}