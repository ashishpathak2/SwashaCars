import Hero from "../components/Hero";
import CarServices from "../components/CarServices";
// import About from "../components/About";
// import Services from "../components/Services";
import BrandCarousel from "@/components/BrandCarousel";
import Testimonials from "../components/Testimonials";
import CarouselPage from "@/components/Video-carousel/CarouselPage";

export default function Home() {
  return (
    <div className="min-h-screen bg-black  ">
      <Hero />
      <CarouselPage/>
      <CarServices />
      <BrandCarousel />
      {/* <About /> */}
      {/* <Services /> */}
      <Testimonials />
    </div>
  );
}
