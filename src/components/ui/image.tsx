import * as React from "react";
import { cn } from "../../lib/utils";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: "square" | "portrait" | "landscape" | "auto";
  width?: number;
  height?: number;
  loading?: "eager" | "lazy";
  fit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      className,
      aspectRatio = "auto",
      width,
      height,
      loading = "lazy",
      fit = "cover",
      alt,
      ...props
    },
    ref
  ) => {
    const aspectRatioClass = {
      square: "aspect-square",
      portrait: "aspect-[3/4]",
      landscape: "aspect-[4/3]",
      auto: "aspect-auto",
    };

    return (
      <img
        ref={ref}
        className={cn(
          "rounded-lg",
          aspectRatioClass[aspectRatio],
          className
        )}
        width={width}
        height={height}
        loading={loading}
        style={{ objectFit: fit }}
        alt={alt}
        {...props}
      />
    );
  }
);

Image.displayName = "Image";

export { Image }; 