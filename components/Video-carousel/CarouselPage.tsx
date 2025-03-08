import VideoCarousel from "@/components/Video-carousel/VideoCarousel";

const videos: { id: string; platform: "cloudinary"; title: string }[] = [
  { id: "Untitled_design_lfptf1", platform: "cloudinary", title: "Video 1" },
  { id: "Untitled_design_1_u2iafa", platform: "cloudinary", title: "Video 2" },
  { id: "Untitled_design_1_qyhpbb", platform: "cloudinary", title: "Video 3" },
];

import React from "react";

const CarouselPage = () => {
  return (
    <div className="w-full min-h-screen bg-black text-center flex-col items-center justify-center hidden md:block ">
      {/* Responsive Heading */}
      <h2 className="text-3xl md:text-4xl font-bold mb-4  bg-gradient-to-r from-gray-100 to-indigo-400 bg-clip-text text-transparent">
        Our Work
      </h2>
      <p className="text-slate-300 mb-6 text-base">
        Showcasing our creative projects through captivating videos.
      </p>
      {/* Carousel - Hidden on mobile, visible on md and up */}
      <div className=" w-full ">
        <VideoCarousel videos={videos} />
      </div>
      
    </div>
  );
};

export default CarouselPage;
