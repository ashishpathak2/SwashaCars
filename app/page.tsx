import Hero from "@/components/HeroSection/Hero";
import CarServices from "../components/CarServices";
// import BrandCarousel from "@/components/BrandCarousel";
// import Testimonials from "../components/Testimonials";
import CarouselPage from "@/components/Video-carousel/CarouselPage";

export default function Home() {
  return (
    <div className="min-h-screen  bg-[url(/bg.jpeg)] bg-center bg-contain">
      <Hero />
      <CarouselPage/>
      <CarServices  />
      {/* <BrandCarousel /> */}
      {/* <Testimonials /> */}
    </div>
  );
}
