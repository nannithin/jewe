import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen px-5 space-y-8 pb-[100px]">
      <div className="max-w-3/4 space-y-2 pt-[50px]">
        <p>A Unique, Intangible Quality.</p>
        <h1 className="text-2xl font-semibold">Perfect Match for Elegant Impression</h1>
        <Button>SHOP NOW</Button>
      </div>
      <div className="grid md:grid-cols-3">
        <div className="bg-[#F6F6F6] p-8 space-y-2">
          <p className="text-sm">FLAT DISCOUNT</p>
          <p className="text-xl max-w-1/2 ">Necklaces & Body Jewels</p>
          <a className="uppercase border-b text-sm border-black" href="">Shop now</a>
        </div>
      </div>

      <div className="space-y-5">
        <h1 className="text-2xl text-center">Popular Categories</h1>
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-36 w-36 rounded-full bg-[#F6F6F6]"></div>
            <p className="font-medium underline">NECKLACES</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="h-36 w-36 rounded-full bg-[#F6F6F6]"></div>
            <p className="font-medium underline">RINGS</p>
          </div>
        </div>
      </div>

      <div>
        <div className="text-center">
          <h1 className="text-2xl">Trendy Collection</h1>
          <p className="text-muted-foreground">Collect your loves with our newest arrivals.</p>
        </div>
      </div>
    </div>
  );
}
