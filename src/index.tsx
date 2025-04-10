import React from "react";
import { Image, type ImageProps } from "./components/ui/image";
import { Skeleton } from "./components/ui/skeleton";
import { cn } from "./lib/utils";

export interface ImageOptimizerProps
  extends Omit<ImageProps, "src" | "onError"> {
  src: string;
  fallbackSrc?: string;
  onError?: (error: Error) => void;
  className?: string;
  style?: React.CSSProperties;
  showSkeleton?: boolean;
}

export const ImageOptimizer: React.FC<ImageOptimizerProps> = ({
  src,
  fallbackSrc,
  onError,
  className,
  style,
  showSkeleton = true,
  aspectRatio = "auto",
  ...props
}) => {
  const [imgSrc, setImgSrc] = React.useState(src);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  const handleError = () => {
    setHasError(true);
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setIsLoading(true);
    }
    if (onError) {
      onError(new Error("Failed to load image"));
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (hasError && !fallbackSrc) {
    return null;
  }

  return (
    <div className={cn("relative", className)} style={style}>
      {showSkeleton && isLoading && (
        <Skeleton aspectRatio={aspectRatio} className="absolute inset-0" />
      )}
      <Image
        src={imgSrc}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onError={handleError}
        onLoad={handleLoad}
        aspectRatio={aspectRatio}
        {...props}
      />
    </div>
  );
};

export { Image, type ImageProps };
export default ImageOptimizer;
