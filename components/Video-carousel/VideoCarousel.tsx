"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import VideoFrame from "./VideoFrame";
import PhoneNotch from "./PhoneNotch";
import HomeIndicator from "./HomeIndicator";
import PaginationDots from "./PaginationDots";

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

const VideoCarousel: React.FC<VideoCarouselProps> = ({
  videos,
  className,
  frameWidth = "20rem",
  frameHeight = "36rem",
}) => {
  const [state, setState] = useState({
    activeIndex: 0,
    isInView: false,
    isMobile: false,
    isMuted: true,
  });

  const touchData = useRef<{ start: number | null; move: number | null }>({
    start: null,
    move: null,
  });
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const visibilityTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handlePrev = useCallback(() => {
    setState((prev) => ({
      ...prev,
      activeIndex: prev.activeIndex === 0 ? videos.length - 1 : prev.activeIndex - 1,
    }));
  }, [videos.length]);

  const handleNext = useCallback(() => {
    setState((prev) => ({
      ...prev,
      activeIndex: prev.activeIndex === videos.length - 1 ? 0 : prev.activeIndex + 1,
    }));
  }, [videos.length]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchData.current.start = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchData.current.move = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const { start, move } = touchData.current;
    if (start !== null && move !== null) {
      const diff = start - move;
      const threshold = state.isMobile ? 30 : 50;
      if (Math.abs(diff) > threshold) {
        if (diff > 0) handleNext();
        else handlePrev();
      }
    }
    touchData.current = { start: null, move: null };
  }, [state.isMobile, handlePrev, handleNext]);

  const toggleMute = useCallback(() => {
    setState((prev) => ({ ...prev, isMuted: !prev.isMuted }));
    const activeVideo = videoRefs.current[state.activeIndex];
    if (activeVideo) {
      activeVideo.muted = !activeVideo.muted;
    }
  }, [state.activeIndex]);

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length);

    const throttle = (fn: () => void, delay: number) => {
      let timeout: NodeJS.Timeout | null = null;
      return () => {
        if (!timeout) {
          timeout = setTimeout(() => {
            fn();
            timeout = null;
          }, delay);
        }
      };
    };

    const handleResize = throttle(() => {
      setState((prev) => ({ ...prev, isMobile: window.innerWidth < 768 }));
    }, 200);

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (visibilityTimeoutRef.current) {
          clearTimeout(visibilityTimeoutRef.current);
        }
        visibilityTimeoutRef.current = setTimeout(() => {
          setState((prev) => ({ ...prev, isInView: entry.isIntersecting }));
        }, 150);
      },
      { threshold: 0.5 }
    );

    if (carouselRef.current) observerRef.current.observe(carouselRef.current);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (state.isInView) {
        if (e.key === "ArrowLeft") handlePrev();
        else if (e.key === "ArrowRight") handleNext();
      }
    };

    const cachePosters = async () => {
      if (state.isMobile && "caches" in window && navigator.onLine) {
        try {
          const cache = await caches.open("video-posters");
          await Promise.all(
            videos.map(async (video) => {
              const posterUrl = `https://res.cloudinary.com/diftmnwxg/image/upload/q_auto,f_auto/${video.id}.jpg`;
              try {
                const response = await fetch(posterUrl, { mode: "no-cors" });
                if (response.ok) {
                  await cache.put(posterUrl, response);
                } else {
                  console.warn(`Failed to fetch poster: ${posterUrl}`);
                }
              } catch (err) {
                console.error(`Cache failed for ${posterUrl}:`, err);
              }
            })
          );
        } catch (err) {
          console.error("Failed to open cache:", err);
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    cachePosters();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      if (visibilityTimeoutRef.current) clearTimeout(visibilityTimeoutRef.current);
      if (observerRef.current && carouselRef.current) {
        observerRef.current.unobserve(carouselRef.current);
      }
    };
  }, [videos, state.isInView, state.isMobile, handlePrev, handleNext]);

  const getCardStyles = useCallback(
    (index: number) => {
      const isActive = index === state.activeIndex;
      const isPrev =
        (state.activeIndex === 0 && index === videos.length - 1) ||
        index === state.activeIndex - 1;
      const isNext =
        (state.activeIndex === videos.length - 1 && index === 0) ||
        index === state.activeIndex + 1;
      const isPrevPrev =
        (state.activeIndex <= 1 && index === videos.length - (2 - state.activeIndex)) ||
        index === state.activeIndex - 2;
      const isNextNext =
        (state.activeIndex >= videos.length - 2 &&
          index === 1 - (videos.length - state.activeIndex - 1)) ||
        index === state.activeIndex + 2;

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
          (isActive || isPrev || isNext) ? "visible" : "invisible",
          (isActive || isPrev || isNext) && "will-change-transform-opacity"
        ),
        style: {
          width: state.isMobile ? "85vw" : frameWidth,
          maxWidth: "22rem",
          height: state.isMobile ? "75vh" : frameHeight,
          maxHeight: "42rem",
          transform: `perspective(1200px) ${transform} scale(${scale})`,
          opacity,
          zIndex,
        },
      };
    },
    [state.activeIndex, videos.length, frameWidth, frameHeight, state.isMobile]
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
      {state.isMobile ? (
        <div className="w-full h-full flex items-center justify-center">
          <div
            className="relative w-4/5 h-3/4 max-w-xs rounded-3xl overflow-hidden border-4 border-gray-800 shadow-2xl"
            style={{ borderRadius: "2rem" }}
          >
            <div
              className="flex flex-row h-full"
              style={{
                transform: `translateX(-${state.activeIndex * 100}%)`,
                transition: "transform 0.5s ease",
              }}
            >
              {videos.map((video, index) =>
                index === state.activeIndex ||
                index === (state.activeIndex - 1 + videos.length) % videos.length ||
                index === (state.activeIndex + 1) % videos.length ? (
                  <div
                    key={`${video.platform}-${video.id}`}
                    className="flex-shrink-0 w-full h-full relative"
                  >
                    <VideoFrame
                      video={video}
                      isActive={index === state.activeIndex}
                      isInView={state.isInView}
                      isMuted={state.isMuted}
                      isMobile={state.isMobile}
                      onRef={(el) => (videoRefs.current[index] = el)}
                      onVideoEnd={handleNext}
                    />
                    {index === state.activeIndex && (
                      <>
                        <PhoneNotch />
                        <HomeIndicator />
                        <button
                          onClick={toggleMute}
                          className="absolute top-2 right-2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full text-white transition-all duration-200"
                          aria-label={state.isMuted ? "Unmute video" : "Mute video"}
                        >
                          {state.isMuted ? (
                            <VolumeX className="w-5 h-5" />
                          ) : (
                            <Volume2 className="w-5 h-5" />
                          )}
                        </button>
                      </>
                    )}
                  </div>
                ) : null
              )}
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
                  isActive={index === state.activeIndex}
                  isInView={
                    state.isInView &&
                    (index === state.activeIndex ||
                      index === state.activeIndex - 1 ||
                      index === state.activeIndex + 1)
                  }
                  isMuted={state.isMuted}
                  isMobile={state.isMobile}
                  onRef={(el) => (videoRefs.current[index] = el)}
                  onVideoEnd={handleNext}
                />
                <PhoneNotch />
                <HomeIndicator />
                {index === state.activeIndex && (
                  <button
                    onClick={toggleMute}
                    className="absolute top-2 right-2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full text-white transition-all duration-200"
                    aria-label={state.isMuted ? "Unmute video" : "Mute video"}
                  >
                    {state.isMuted ? (
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

      <PaginationDots
        videosLength={videos.length}
        activeIndex={state.activeIndex}
        onDotClick={(index) => setState((prev) => ({ ...prev, activeIndex: index }))}
      />

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/15 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-teal-500/15 rounded-full filter blur-3xl"></div>
      </div>
    </div>
  );
};

export default VideoCarousel;