import { createImageOptimizer, type ImageOptimizerState } from "../core";
import { Image } from "../components/ui/image";
import { Skeleton } from "../components/ui/skeleton";
import { cn } from "../lib/utils";
import { ImageOptimizerProps } from "@/types";
import * as React from "react";

export const ImageOptimizer = ({
  src,
  fallbackSrc,
  onError,
  onLoad,
  className,
  style,
  showSkeleton = true,
  aspectRatio = "auto",
  ...props
}: ImageOptimizerProps) => {
  const [state, setState] = React.useState<ImageOptimizerState>({
    currentSrc: src || "",
    isLoading: Boolean(src),
    hasError: false,
  });

  const optimizerRef = React.useRef<ReturnType<typeof createImageOptimizer> | null>(
    null
  );

  
  React.useEffect(() => {
    // Check if src is missing and trigger error if needed
    if (!src) {
      if (onError) onError(new Error("Missing src prop"));
      setState((prev) => ({ ...prev, hasError: true, isLoading: false }));
      return;
    }

    if (!optimizerRef.current) {
      optimizerRef.current = createImageOptimizer({
        src,
        fallbackSrc,
        onError,
        onLoad,
        aspectRatio,
      });

      const unsubscribe = optimizerRef.current.subscribe(setState);
      return unsubscribe;
    } else {
      // Update the optimizer options if it already exists
      optimizerRef.current.updateOptions({
        src,
        fallbackSrc,
        onError,
        onLoad,
        aspectRatio,
      });
    }
  }, [src, fallbackSrc, onError, onLoad, aspectRatio]);

  const { currentSrc, isLoading, hasError } = state;

  if (hasError && !fallbackSrc) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative",
        aspectRatio && typeof aspectRatio === "string"
          ? `aspect-${aspectRatio}`
          : "",
        className
      )}
      style={style}
      data-testid="image-optimizer-container"
    >
      {showSkeleton && isLoading && (
        <Skeleton
          data-testid="skeleton"
          aspectRatio={aspectRatio}
          className="absolute inset-0"
        />
      )}
      <Image
        src={currentSrc}
        style={{ opacity: isLoading ? 0 : 1 }}
        className="transition-opacity duration-300"
        onError={() => {
          if (optimizerRef.current) {
            optimizerRef.current.handleError();
          } else if (onError) {
            onError(new Error("Image failed to load"));
          }
          if (fallbackSrc) {
            setState((prev) => ({
              ...prev,
              currentSrc: fallbackSrc,
              isLoading: false,
              hasError: true,
            }));
          }
        }}
        onLoad={() => {
          if (optimizerRef.current) {
            optimizerRef.current.handleLoad();
          } else if (onLoad) {
            onLoad();
          }
          setState((prev) => ({ ...prev, isLoading: false }));
        }}
        aspectRatio={aspectRatio}
        {...props}
      />
    </div>
  );
};

export { Image };
