import * as React from "react";
import { cn } from "../../lib/utils";

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "width" | "height"> {
  aspectRatio?: "square" | "portrait" | "landscape" | "auto";
  width?: number;
  height?: number;
  loading?: "eager" | "lazy";
  fit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  // Next.js specific props
  priority?: boolean;
  quality?: number;
  placeholder?: string | "blur" | "empty";
  blurDataURL?: string;
  sizes?: string;
  unoptimized?: boolean;
}

// Standard HTML Image component
const StandardImage = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      className,
      aspectRatio = "auto",
      width,
      height,
      loading = "lazy",
      fit = "cover",
      alt = "",
      src,
      style,
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
        className={cn("rounded-lg", aspectRatioClass[aspectRatio], className)}
        src={src || "/placeholder.svg"}
        width={width}
        height={height}
        loading={loading}
        style={{ objectFit: fit, ...style }}
        alt={alt}
        {...props}
      />
    );
  }
);

StandardImage.displayName = "StandardImage";

// Determine which Image component to use
let Image: React.ForwardRefExoticComponent<ImageProps & React.RefAttributes<HTMLImageElement>>;

// Try to use Next.js Image if available
try {
  const NextImage = require("next/image").default;
  
  // Next.js Image wrapper
  Image = React.forwardRef<HTMLImageElement, ImageProps>(
    (
      {
        className,
        aspectRatio = "auto",
        width,
        height,
        loading = "lazy", // We'll ignore this for Next.js
        fit = "cover",
        alt = "",
        src,
        // Next.js specific props
        priority,
        quality,
        placeholder,
        blurDataURL,
        sizes,
        unoptimized,
        style,
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
        <NextImage
          ref={ref as any}
          className={cn("rounded-lg", aspectRatioClass[aspectRatio], className)}
          src={src || ""}
          width={width || (height ? undefined : 1920)}
          height={height || (width ? undefined : 1080)}
          priority={priority || loading === "eager"}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          sizes={sizes}
          unoptimized={unoptimized}
          style={{ objectFit: fit, ...style }}
          alt={alt}
          {...props}
        />
      );
    }
  );
} catch (e) {
  // Fallback to standard image if Next.js is not available
  Image = StandardImage;
}

Image.displayName = "Image";

export { Image };