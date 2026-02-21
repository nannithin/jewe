"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import ItemCard from "@/components/cardd";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import earning from "../../public/earnings.jpg"
import bg from "../../public/download.jpg"
import bgimg from "../../public/download (1).jpg"
import necklace from "../../public/necklace.jpg"
import rings from "../../public/rings.jpg"
import bracel from '../../public/bracelets.jpg'
import useEmblaCarousel from "embla-carousel-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import { useRouter } from "next/navigation";
import catering from '../../public/catering.jpg'
import catebrace from '../../public/catbrace.jpg'

export default function Home() {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: 2, // 🔥 Jump 2 items
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 3 },
    },
  });
  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data.slice(0, 10)); // latest 10
      } catch (error) {
        console.error(error);
      }
    };

    fetchLatestProducts();
  }, []);
  const [cate, setCate] = useState([
    {
      title: "Necklaces",
      image: necklace
    },
    {
      title: "Rings",
      image: rings
    },
    {
      title: "Bracelets",
      image: bracel
    },
    {
      title: "Earnings",
      image: earning
    },

  ])

  return (
    <div className="min-h-screen  space-y-8 pb-[100px]">
      <div id="home" className="relative w-full h-[270px] md:h-[600px]">

        {/* Background Image */}
        <Image
          src={bg}
          alt="bg"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-xl px-6 md:px-20 space-y-3 text-black">
            <p className="text-xl max-md:text-sm text-muted-foreground tracking-wide">
              A Unique, Intangible Quality.
            </p>

            <h1 className="text-2xl md:text-4xl font-normal">
              Perfect Match for Elegant Impression
            </h1>

            <a href="#trending"><Button variant="outline" className="mt-3 border-black">
              SHOP NOW
            </Button></a>
          </div>
        </div>

      </div>
      <div className="w-full max-w-6xl mx-auto px-4">
        <Carousel
          opts={{
            align: "start",
            loop: false,
            slidesToScroll: 1,
          }}
          className="relative"
        >
          <CarouselContent>

            {/* ITEM 1 */}
            <CarouselItem className="basis-full md:basis-1/3">
              <div className="relative">
                <Image src={bgimg} alt="bg" className="w-full h-auto" />
                <div className="absolute top-0 left-0 p-6 space-y-2">
                  <p className="text-sm">FLAT DISCOUNT</p>
                  <p className="text-xl max-w-[60%]">
                    Just Lunched Desk the halls
                  </p>
                  <a href="#collections" className="uppercase border-b text-sm border-black">
                    Shop now
                  </a>
                </div>
              </div>
            </CarouselItem>

            {/* ITEM 2 */}
            <CarouselItem className="basis-full md:basis-1/3">
              <div className="relative">
                <Image src={catering} alt="bg" className="w-full h-auto" />
                <div className="absolute top-0 left-0 p-6 space-y-2">
                  <p className="text-sm">NEW COLLECTION</p>
                  <p className="text-xl max-w-[60%]">
                    Jewellery & Charm Rings
                  </p>
                  <a className="uppercase border-b text-sm border-black">
                    Shop now
                  </a>
                </div>
              </div>
            </CarouselItem>

            {/* ITEM 3 */}
            <CarouselItem className="basis-full md:basis-1/3">
              <div className="relative">
                <Image src={catebrace} alt="bg" className="w-full h-auto" />
                <div className="absolute top-0 left-0 p-6 space-y-2">
                  <p className="text-sm">FLAT DISCOUNT</p>
                  <p className="text-xl max-w-[60%]">
                    Necklaces & Body Jewels
                  </p>
                  <a className="uppercase border-b text-sm border-black">
                    Shop now
                  </a>
                </div>
              </div>
            </CarouselItem>

          </CarouselContent>
        </Carousel>
      </div>


      <div id="collections" className="space-y-5 px-4 md:px-5">
        <h1 className="text-2xl text-center">Popular Categories</h1>
        <div className="w-full max-w-6xl mx-auto ">
          <Carousel
            opts={{
              align: "start",
              loop: false,
              slidesToScroll: 1,
            }}
            className="relative"
          >
            <CarouselContent className="-ml-4">
              {cate.map((item, ind) => (
                <CarouselItem
                  key={ind}
                  className="pl-4 basis-1/2 lg:basis-1/5"
                  onClick={() => {
                    router.push(`/item?search=${item.title}`)
                  }}
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-36 w-36 rounded-full border overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={144}
                        height={144}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <p className="font-medium text-center">{item.title}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

      </div>

      <div id="trending" className="px-4 space-y-5">
        <div className="text-center">
          <h1 className="text-2xl">Trendy Collection</h1>
          <p className="text-muted-foreground">Collect your loves with our newest arrivals.</p>
        </div>
        <div className="w-full max-w-6xl mx-auto md:px-4">
          <Carousel
            opts={{
              align: "start",   // 🔥 use start for multi items
              loop: false,
              slidesToScroll: 1,
            }}
            className="relative"
          >
            <CarouselContent>
              {products.map((product, ind) => (
                <CarouselItem
                  key={product._id}
                  className="basis-1/2 md:basis-1/3 lg:basis-1/5 flex justify-center"
                >
                  <ItemCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

      </div>
      <div className="bg-[#FEED9F] w-full h-11 flex items-center justify-center">
        <p className="text-[#B5947C]">Jewellery is like the icing on the cake.</p>
      </div>
      <div id="about" className="w-full bg-[#FCF9F1] ">
        <div className="md:grid grid-cols-2 md:px-10 md:py-20">
          <div className="bg-white">

          </div>
          <div className="flex flex-col items-center p-5 space-y-5 ">
            <h1 className="text-2xl text-center">Shop History</h1>
            <div className="max-md:text-center md:px-20 space-y-3">
              <p>Village did removed enjoyed explain nor ham saw calling talking. Securing as informed declared or margaret. Joy horrible moreover man feelings own shy. Request norland neither mistake for yet. Between the for morning assured country believe.</p>
              <p> On even feet time have an no at. Relation so in confined smallest children unpacked delicate. Why sir end believe uncivil respect. Always get adieus nature day course for common. My little garret repair to desire he esteem.</p>
              <p> Improve ashamed married expense bed her comfort pursuit mrs.</p>
            </div>
            <Button variant="outline" className={"border-[#B5947C] text-[#B5947C]"}>READ MORE</Button>
          </div>
        </div>
        <div id="reviews" className="p-5 space-y-5">
          <h1 className="text-2xl text-center">Customer Reviews</h1>
          <div className="space-y-3">
            <div className="w-30 h-30 mx-auto rounded-full bg-white"></div>
            <p className="text-center max-w-md mx-auto">On even feet time have an no at. Relation so in confined smallest children unpacked delicate. Why sir end believe uncivil respect.</p>
            <p className="text-sm text-[#B5947C] text-center">Y NITHIN</p>
          </div>
        </div>
      </div>

    </div>
  );
}
