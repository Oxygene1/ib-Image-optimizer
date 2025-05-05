import * as React from "react";
import { cn } from "../../lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: "square" | "portrait" | "landscape" | "auto";
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, aspectRatio = "auto", ...props }, ref) => {
    const aspectRatioClass = {
      square: "aspect-square",
      portrait: "aspect-[3/4]",
      landscape: "aspect-[4/3]",
      auto: "aspect-auto",
    };

    return (
      <div
        ref={ref}
        data-testid="skeleton"
        className={cn(
          "animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700",
          aspectRatioClass[aspectRatio],
          className
        )}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

export { Skeleton };
