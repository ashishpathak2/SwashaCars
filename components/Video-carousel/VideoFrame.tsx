"use client";
import React, { useRef, useEffect, useCallback, memo, useState } from "react";

interface VideoItem {
  id: string;
  platform: "cloudinary";
  title: string;
}

interface VideoFrameProps {
  video: VideoItem;
  isActive: boolean;
  isInView: boolean;
  isMuted: boolean;
  isMobile: boolean;
  onRef: (el: HTMLVideoElement | null) => void;
  onVideoEnd: () => void;
}

const VideoFrame = memo(
  ({
    video,
    isActive,
    isInView,
    isMuted,
    isMobile,
    onRef,
    onVideoEnd,
  }: VideoFrameProps) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [shouldLoad, setShouldLoad] = useState(isActive || !isMobile);
    const [metadataCache, setMetadataCache] = useState<Record<string, any>>({}); // Initial empty state

    // Load metadataCache from localStorage only on client side
    useEffect(() => {
      if (typeof window !== "undefined" && window.localStorage) {
        const cachedData = localStorage.getItem("videoMetadata");
        if (cachedData) {
          setMetadataCache(JSON.parse(cachedData));
        }
      }
    }, []); // Runs once on mount in the browser

    const getVideoUrl = useCallback(() => {
      const baseUrl = `https://res.cloudinary.com/diftmnwxg/video/upload/q_auto,f_auto`;
      const mobileParams = isMobile ? ",w_480,q_80" : "";
      return `${baseUrl}${mobileParams}/${video.id}.mp4`;
    }, [video.id, isMobile]);

    useEffect(() => {
      if (isMobile && isActive && !shouldLoad) {
        const timeout = setTimeout(() => setShouldLoad(true), 200);
        return () => clearTimeout(timeout);
      }
    }, [isActive, isMobile, shouldLoad]);

    useEffect(() => {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      if (isActive && isInView) {
        if (videoElement.muted !== isMuted) {
          videoElement.muted = isMuted;
        }
        if (videoElement.paused) {
          videoElement.play().catch((error) => {
            console.error("Autoplay failed:", error);
            videoElement.muted = true;
            videoElement.play().catch((err) => console.error("Retry failed:", err));
          });
        }
      } else {
        if (!videoElement.paused) {
          videoElement.pause();
        }
        if (videoElement.currentTime !== 0) {
          videoElement.currentTime = 0;
        }
      }

      return () => {
        if (videoElement && !videoElement.paused) {
          videoElement.pause();
        }
      };
    }, [isActive, isInView, isMuted]);

    useEffect(() => {
      const videoElement = videoRef.current;
      if (!videoElement || !shouldLoad || metadataCache[video.id]) return;

      const handleMetadata = () => {
        const metadata = { duration: videoElement.duration };
        setMetadataCache((prev) => {
          const newCache = { ...prev, [video.id]: metadata };
          if (typeof window !== "undefined" && window.localStorage) {
            localStorage.setItem("videoMetadata", JSON.stringify(newCache));
          }
          return newCache;
        });
      };

      videoElement.addEventListener("loadedmetadata", handleMetadata);
      return () => videoElement.removeEventListener("loadedmetadata", handleMetadata);
    }, [shouldLoad, video.id, metadataCache]);

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
          src={shouldLoad ? getVideoUrl() : undefined}
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ pointerEvents: isActive ? "auto" : "none" }}
          loop={false}
          playsInline
          controls={false}
          title={video.title}
          preload={isMobile ? (isActive ? "metadata" : "none") : "metadata"}
          poster={
            isMobile && !shouldLoad
              ? `https://res.cloudinary.com/diftmnwxg/image/upload/q_auto,f_auto/${video.id}.jpg`
              : undefined
          }
          onEnded={handleEnded}
        />
      </div>
    );
  }
);

VideoFrame.displayName = "VideoFrame";

export default VideoFrame;