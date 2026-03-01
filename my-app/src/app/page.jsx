"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import ItemCard from "@/components/cardd";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import earning from "../../public/earnings.jpg"
import bg from "../../public/earrings_desktop_hero-banner_2872-_-1266pix.jpg"
import smallbg from '../../public/earrings_mobile_400-x-515pix.jpg'
import bgimg from "../../public/download (1).jpg"
import necklace from "../../public/necklace.jpg"
import rings from "../../public/rings.jpg"
import bracel from '../../public/bracelets.jpg'
import useEmblaCarousel from "embla-carousel-react";
import bg2 from '../../public/solitaire_desktop_hero-banner.jpg'
import smallbg2 from '../../public/rings_mobile_400-x-515pix_1.jpg'
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
import MultiCarousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import shop from '../../public/66aff2ae-ba09-4467-9030-ecd8ba1bf820.png'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

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
      title: "Necklace",
      image: necklace
    },
    {
      title: "Ring",
      image: rings
    },
    {
      title: "Bracelet",
      image: bracel
    },
    {
      title: "Earning",
      image: earning
    },

  ])

  return (
    <div className="min-h-screen  space-y-8 pb-[100px]">
      <div
        id="home"
        onClick={() => router.push(`/category?search=earrings`)}
        className="relative w-full aspect-4/5 md:h-[600px] cursor-pointer"
      >
        <MultiCarousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={3000}
          arrows={false}
          showDots
        >
          <div className="relative w-full aspect-4/5 md:h-[600px]">
            <Image
              src={bg}
              alt="bg"
              fill
              priority
              className="object-cover max-md:hidden"
            />
            <Image
              src={smallbg}
              alt="bg"
              fill
              priority
              className="object-cover md:hidden"
            />
          </div>

          <div className="relative w-full aspect-4/5 md:h-[600px]">
            <Image
              src={smallbg2}
              alt="bg"
              fill
              className="object-cover md:hidden"
            />
            <Image
              src={bg2}
              alt="bg"
              fill
              priority
              className="object-cover max-md:hidden"
            />
          </div>
        </MultiCarousel>
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
                <div className="absolute top-0 left-0 p-6 space-y-2 text-white">
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
                    router.push(`/item?category=${item.title.toLowerCase()}`)
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
                    <p className="font-medium text-center">{item.title}s</p>
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
          <div className="bg-white max-md:px-3">
            <Image src={shop} alt="shop" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col items-center p-5 space-y-5 ">
            <h1 className="text-2xl text-center">Shop History</h1>
            <div className="max-md:text-center md:px-20 space-y-3">
              <p>Shree Kalka Jewellers stands proudly in the heart of Bhiwani, offering a beautiful collection of traditional and modern jewellery for every occasion. Known for its 5.0 Google rating, the shop has earned the trust of customers through quality products and friendly service. From elegant costume jewellery to festive and bridal designs, every piece reflects style and grace. Located opposite Balaji Mandir on Dinod Road, Shastri Nagar, the store is easy to find and welcomes customers with warmth and respect. The team carefully helps each visitor choose designs that match their taste and budget. Whether it is daily wear, wedding shopping, or a special gift, Shree Kalka Jewellers provides options that suit all needs. With attention to detail and commitment to customer satisfaction, the shop continues to build strong relationships in the local community. Their dedication to quality, affordable pricing, and honest service makes them a trusted jewellery destination in Haryana.
              </p>
            </div>
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
