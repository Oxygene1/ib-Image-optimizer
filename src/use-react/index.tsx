// react/FunctionalImageOptimizer.tsx
import { useEffect, useState, useRef } from "react";
import {
  createImageOptimizer,
  type ImageOptimizerState,
} from "../core/image-optimizer";
import { Image, type ImageProps } from "../components/ui/image";
import { Skeleton } from "../components/ui/skeleton";
import { cn } from "../lib/utils";

export interface ImageOptimizerProps
  extends Omit<ImageProps, "src" | "onError"> {
  src: string;
  fallbackSrc?: string;
  onError?: (error: Error) => void;
  onLoad?: () => void;
  className?: string;
  style?: React.CSSProperties;
  showSkeleton?: boolean;
}

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
  const [state, setState] = useState<ImageOptimizerState>({
    currentSrc: src,
    isLoading: true,
    hasError: false,
  });

  const optimizerRef = useRef<ReturnType<typeof createImageOptimizer> | null>(
    null
  );

  useEffect(() => {
    // Create the optimizer if it doesn't exist
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
    <div className={cn("relative", className)} style={style}>
      {showSkeleton && isLoading && (
        <Skeleton aspectRatio={aspectRatio} className="absolute inset-0" />
      )}
      <Image
        src={currentSrc}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onError={() => optimizerRef.current?.handleError()}
        onLoad={() => optimizerRef.current?.handleLoad()}
        aspectRatio={aspectRatio}
        {...props}
      />
    </div>
  );
};

export { Image, type ImageProps };
export default ImageOptimizer;
