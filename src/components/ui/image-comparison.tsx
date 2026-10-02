"use client";

import { cn } from "@/lib/utils";
import { useState, createContext, useContext } from "react";
import {
  motion,
  MotionValue,
  SpringOptions,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const ImageComparisonContext = createContext<
  | {
      sliderPosition: number;
      setSliderPosition: (pos: number) => void;
      motionSliderPosition: MotionValue<number>;
    }
  | undefined
>(undefined);

type ImageComparisonProps = {
  children: React.ReactNode;
  className?: string;
  enableHover?: boolean;
  springOptions?: SpringOptions;
};

const DEFAULT_SPRING_OPTIONS = {
  bounce: 0,
  duration: 0,
};

function ImageComparison({
  children,
  className,
  enableHover,
  springOptions,
}: ImageComparisonProps) {
  const [isDragging, setIsDragging] = useState(false);
  const motionValue = useMotionValue(50);
  const motionSliderPosition = useSpring(
    motionValue,
    springOptions ?? DEFAULT_SPRING_OPTIONS
  );
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleDrag = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging && !enableHover) return;

    const containerRect = (
      event.currentTarget as HTMLElement
    ).getBoundingClientRect();

    const point =
      "touches" in event
        ? event.touches[0] ?? event.changedTouches[0]
        : (event as React.MouseEvent);
    if (!point) return;

    const x = point.clientX - containerRect.left;

    const percentage = Math.min(
      Math.max((x / containerRect.width) * 100, 0),
      100
    );
    motionValue.set(percentage);
    setSliderPosition(percentage);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const stepSize = event.shiftKey ? 10 : 4;
    let next: number | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      next = sliderPosition + stepSize;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      next = sliderPosition - stepSize;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = 100;
    }

    if (next === null) return;
    event.preventDefault();
    const clamped = Math.min(100, Math.max(0, next));
    motionValue.set(clamped);
    setSliderPosition(clamped);
  };

  return (
    <ImageComparisonContext.Provider
      value={{ sliderPosition, setSliderPosition, motionSliderPosition }}
    >
      <div
        role="slider"
        tabIndex={0}
        aria-label="Drag or use arrow keys to reveal the comparison"
        aria-orientation="horizontal"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuetext={`${Math.round(sliderPosition)}% revealed`}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative select-none overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze-bright",
          enableHover && "cursor-ew-resize",
          className
        )}
        style={{ touchAction: "pan-y" }}
        onMouseMove={handleDrag}
        onMouseDown={() => !enableHover && setIsDragging(true)}
        onMouseUp={() => !enableHover && setIsDragging(false)}
        onMouseLeave={() => !enableHover && setIsDragging(false)}
        onTouchMove={handleDrag}
        onTouchStart={() => !enableHover && setIsDragging(true)}
        onTouchEnd={() => !enableHover && setIsDragging(false)}
      >
        {children}
      </div>
    </ImageComparisonContext.Provider>
  );
}

const ImageComparisonImage = ({
  className,
  alt,
  src,
  position,
}: {
  className?: string;
  alt: string;
  src: string;
  position: "left" | "right";
}) => {
  const { motionSliderPosition } = useContext(ImageComparisonContext)!;
  const leftClipPath = useTransform(
    motionSliderPosition,
    (value) => `inset(0 0 0 ${value}%)`
  );
  const rightClipPath = useTransform(
    motionSliderPosition,
    (value) => `inset(0 ${100 - value}% 0 0)`
  );

  return (
    <motion.img
      src={src}
      alt={alt}
      draggable={false}
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
      style={{
        clipPath: position === "left" ? leftClipPath : rightClipPath,
      }}
    />
  );
};

const ImageComparisonSlider = ({
  className,
  children,
}: {
  className: string;
  children?: React.ReactNode;
}) => {
  const { motionSliderPosition } = useContext(ImageComparisonContext)!;

  const left = useTransform(motionSliderPosition, (value) => `${value}%`);

  return (
    <motion.div
      className={cn("absolute bottom-0 top-0 w-1 cursor-ew-resize", className)}
      style={{
        left,
      }}
    >
      {children}
    </motion.div>
  );
};

export { ImageComparison, ImageComparisonImage, ImageComparisonSlider };
