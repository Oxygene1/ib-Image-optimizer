import React from "react";
import { Image, type ImageProps } from "./components/ui/image";
import { cn } from "./lib/utils";


export interface ImageOptimizerProps
  extends Omit<ImageProps, "src" | "onError"> {
  src: string;
  fallbackSrc?: string;
  onError?: (error: Error) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const ImageOptimizer: React.FC<ImageOptimizerProps> = ({
  src,
  fallbackSrc,
  onError,
  className,
  style,
  ...props
}) => {
  const [imgSrc, setImgSrc] = React.useState(src);

  const handleError = () => {
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
    if (onError) {
      onError(new Error("Failed to load image"));
    }
  };

  return (
    <Image
      src={imgSrc}
      className={cn(className, "object-cover w-full h-full")}
      style={style}
      onError={handleError}
      {...props}
    />
  );
};

export { Image, type ImageProps };
export default ImageOptimizer;
