"use client";
import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoItem {
  id: string;
  platform: "cloudinary";
  title: string;
}

interface VideoCarouselProps {
  videos: VideoItem[];
  className?: string;
  frameWidth?: string;
  frameHeight?: string;
}

const VideoFrame = memo(
  ({
    video,
    isActive,
    isInView,
    isMuted,
    onRef,
    onVideoEnd,
  }: {
    video: VideoItem;
    isActive: boolean;
    isInView: boolean;
    isMuted: boolean;
    onRef: (el: HTMLVideoElement | null) => void;
    onVideoEnd: () => void;
  }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const getVideoUrl = useCallback(() => {
      return `https://res.cloudinary.com/diftmnwxg/video/upload/q_auto,f_auto/${video.id}.mp4`;
    }, [video.id]);

    useEffect(() => {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      if (isActive && isInView) {
        videoElement.muted = isMuted; // Set muted state based on toggle
        videoElement
          .play()
          .catch((error) => {
            console.error("Autoplay failed:", error);
            // Retry with muted if sound fails (browser policy)
            videoElement.muted = true;
            videoElement.play().catch((err) => console.error("Retry failed:", err));
          });
      } else {
        videoElement.pause();
        videoElement.currentTime = 0;
      }
    }, [isActive, isInView, isMuted]);

    const handleEnded = useCallback(() => {
      if (isActive && isInView) {
        onVideoEnd();
      }
    }, [isActive, isInView, onVideoEnd]);

    return (
      <div className="w-full h-full relative overflow-hidden">
        <video
          ref={(el) => {
            videoRef.current = el;
            onRef(el);
          }}
          src={getVideoUrl()}
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ pointerEvents: isActive ? "auto" : "none" }}
          loop={false}
          playsInline
          controls={false}
          title={video.title}
          preload={isActive ? "auto" : "metadata"}
          onEnded={handleEnded}
        />
      </div>
    );
  }
);

VideoFrame.displayName = "VideoFrame";

const PhoneNotch = () => (
  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 w-1/2 h-6 bg-black rounded-b-2xl flex justify-center items-center">
    <div className="w-16 h-1 bg-gray-700 rounded-full"></div>
  </div>
);

const HomeIndicator = () => (
  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gray-400 rounded-full z-10"></div>
);

const VideoCarousel: React.FC<VideoCarouselProps> = ({
  videos,
  className,
  frameWidth = "20rem",
  frameHeight = "36rem",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Start muted for autoplay compatibility
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchMove, setTouchMove] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);
  const visibilityTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length);
  }, [videos]);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (visibilityTimeoutRef.current) {
          clearTimeout(visibilityTimeoutRef.current);
        }
        visibilityTimeoutRef.current = setTimeout(() => {
          setIsInView(entry.isIntersecting);
        }, 150);
      },
      { threshold: 0.5 }
    );

    if (carouselRef.current) observer.current.observe(carouselRef.current);

    return () => {
      if (visibilityTimeoutRef.current) {
        clearTimeout(visibilityTimeoutRef.current);
      }
      if (observer.current && carouselRef.current) {
        observer.current.unobserve(carouselRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchMove(e.touches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchStart !== null && touchMove !== null) {
      const diff = touchStart - touchMove;
      const threshold = isMobile ? 30 : 50;
      if (Math.abs(diff) > threshold) {
        if (diff > 0) handleNext();
        else handlePrev();
      }
    }
    setTouchStart(null);
    setTouchMove(null);
  }, [touchStart, touchMove, isMobile]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  }, [videos.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  }, [videos.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isInView) {
        if (e.key === "ArrowLeft") handlePrev();
        else if (e.key === "ArrowRight") handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, isInView]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
    const activeVideo = videoRefs.current[activeIndex];
    if (activeVideo) {
      activeVideo.muted = !activeVideo.muted;
    }
  }, [activeIndex]);

  const getCardStyles = useCallback(
    (index: number) => {
      const isActive = index === activeIndex;
      const isPrev =
        (activeIndex === 0 && index === videos.length - 1) ||
        index === activeIndex - 1;
      const isNext =
        (activeIndex === videos.length - 1 && index === 0) ||
        index === activeIndex + 1;
      const isPrevPrev =
        (activeIndex <= 1 && index === videos.length - (2 - activeIndex)) ||
        index === activeIndex - 2;
      const isNextNext =
        (activeIndex >= videos.length - 2 &&
          index === 1 - (videos.length - activeIndex - 1)) ||
        index === activeIndex + 2;

      let transform = "";
      let opacity = 0;
      let zIndex = 0;
      let scale = 1;

      if (isActive) {
        transform = "translateX(0) rotateY(0deg)";
        opacity = 1;
        zIndex = 20;
        scale = 1;
      } else if (isPrev) {
        transform = "translateX(-80%) rotateY(15deg)";
        opacity = 0.7;
        zIndex = 15;
        scale = 0.85;
      } else if (isNext) {
        transform = "translateX(80%) rotateY(-15deg)";
        opacity = 0.7;
        zIndex = 15;
        scale = 0.85;
      } else if (isPrevPrev) {
        transform = "translateX(-140%) rotateY(25deg)";
        opacity = 0.4;
        zIndex = 10;
        scale = 0.75;
      } else if (isNextNext) {
        transform = "translateX(140%) rotateY(-25deg)";
        opacity = 0.4;
        zIndex = 10;
        scale = 0.75;
      } else {
        transform = "translateX(0)";
        opacity = 0;
        zIndex = 0;
        scale = 0.7;
      }

      return {
        className: cn(
          "absolute",
          "transition-all duration-500 ease-out",
          "rounded-3xl overflow-hidden",
          "bg-black",
          "border-4 border-gray-800",
          "shadow-[0_0_30px_rgba(0,0,0,0.5)]",
          (isActive || isPrev || isNext) ? "visible" : "invisible"
        ),
        style: {
          width: isMobile ? "85vw" : frameWidth,
          maxWidth: "22rem",
          height: isMobile ? "75vh" : frameHeight,
          maxHeight: "42rem",
          transform: `perspective(1200px) ${transform} scale(${scale})`,
          opacity,
          zIndex,
        },
      };
    },
    [activeIndex, videos.length, frameWidth, frameHeight, isMobile]
  );

  const PaginationDots = () => (
    <div
      className={cn(
        "absolute left-1/2 transform -translate-x-1/2 flex space-x-2 z-30",
        "bottom-4 md:bottom-6"
      )}
    >
      {videos.map((_, index) => (
        <button
          key={index}
          onClick={() => setActiveIndex(index)}
          className={cn(
            "rounded-full transition-all duration-300",
            "w-2 h-2 md:w-2.5 md:h-2.5",
            index === activeIndex
              ? "bg-white w-6 md:w-8"
              : "bg-gray-500 hover:bg-gray-400"
          )}
          aria-label={`Go to video ${index + 1}`}
        />
      ))}
    </div>
  );

  if (!videos.length) return null;

  return (
    <div
      ref={carouselRef}
      className={cn(
        "relative w-full h-screen flex items-center justify-center overflow-hidden responsive-container",
        "p-4 md:p-6 lg:p-8",
        className
      )}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {isMobile ? (
        <div className="w-full h-full flex items-center justify-center">
          <div
            className="relative w-4/5 h-3/4 max-w-xs rounded-3xl overflow-hidden border-4 border-gray-800 shadow-2xl"
            style={{ borderRadius: "2rem" }}
          >
            <div
              className="flex flex-row h-full"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
                transition: "transform 0.5s ease",
              }}
            >
              {videos.map((video, index) => (
                <div
                  key={`${video.platform}-${video.id}`}
                  className="flex-shrink-0 w-full h-full relative"
                >
                  <VideoFrame
                    video={video}
                    isActive={index === activeIndex}
                    isInView={isInView}
                    isMuted={isMuted}
                    onRef={(el) => (videoRefs.current[index] = el)}
                    onVideoEnd={handleNext}
                  />
                  {index === activeIndex && (
                    <>
                      <PhoneNotch />
                      <HomeIndicator />
                      <button
                        onClick={toggleMute}
                        className="absolute top-2 right-2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full text-white transition-all duration-200"
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                      >
                        {isMuted ? (
                          <VolumeX className="w-5 h-5" />
                        ) : (
                          <Volume2 className="w-5 h-5" />
                        )}
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full max-w-6xl h-full flex items-center justify-center perspective">
          {videos.map((video, index) => {
            const { className, style } = getCardStyles(index);
            return (
              <div
                key={`${video.platform}-${video.id}`}
                className={className}
                style={style}
              >
                <VideoFrame
                  video={video}
                  isActive={index === activeIndex}
                  isInView={isInView && (index === activeIndex || index === activeIndex - 1 || index === activeIndex + 1)}
                  isMuted={isMuted}
                  onRef={(el) => (videoRefs.current[index] = el)}
                  onVideoEnd={handleNext}
                />
                <PhoneNotch />
                <HomeIndicator />
                {index === activeIndex && (
                  <button
                    onClick={toggleMute}
                    className="absolute top-2 right-2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full text-white transition-all duration-200"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      <button
        className={cn(
          "absolute top-1/2 transform -translate-y-1/2 z-30",
          "left-2 md:left-8",
          "bg-white/10 hover:bg-white/20 backdrop-blur-sm",
          "p-2 md:p-3 rounded-full text-white shadow-lg",
          "transition-all duration-200 group"
        )}
        onClick={handlePrev}
        aria-label="Previous video"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <button
        className={cn(
          "absolute top-1/2 transform -translate-y-1/2 z-30",
          "right-2 md:right-8",
          "bg-white/10 hover:bg-white/20 backdrop-blur-sm",
          "p-2 md:p-3 rounded-full text-white shadow-lg",
          "transition-all duration-200 group"
        )}
        onClick={handleNext}
        aria-label="Next video"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
      </button>

      <PaginationDots />
    </div>
  );
};

export default VideoCarousel;