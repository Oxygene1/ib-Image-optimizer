import * as React from "react";
import { cn } from "../../lib/utils";
import { ImageProps } from "@/types";



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
        className={cn(aspectRatioClass[aspectRatio], className)}
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

// Create a lazy-loaded Next.js Image component
const NextImageWrapper = React.forwardRef<HTMLImageElement, ImageProps>(
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
      priority,
      quality,
      placeholder,
      blurDataURL,
      sizes,
      unoptimized,
      style,
      fill = false,
      ...props
    },
    ref
  ) => {
    // Use state to track if Next.js Image is available
    const [NextImage, setNextImage] = React.useState<any>(null);
    const [error, setError] = React.useState(false);

    // Try to load Next.js Image on the client side only
    React.useEffect(() => {
      // Only try to load Next.js in a browser or SSR environment
      if (typeof window !== 'undefined' || typeof process !== 'undefined') {
        try {
          // Dynamic import for Next.js Image
          import('next/image')
            .then((mod) => {
              setNextImage(mod.default);
            })
            .catch(() => {
              setError(true);
            });
        } catch (e) {
          setError(true);
        }
      }
    }, []);

    // If we're still loading or there was an error, use StandardImage
    if (!NextImage || error) {
      return (
        <StandardImage
          ref={ref}
          className={className}
          aspectRatio={aspectRatio}
          width={width}
          height={height}
          loading={loading}
          fit={fit}
          alt={alt}
          src={src}
          style={style}
          {...props}
        />
      );
    }

    const aspectRatioClass = {
      square: "aspect-square",
      portrait: "aspect-[3/4]",
      landscape: "aspect-[4/3]",
      auto: "aspect-auto",
    };

    // Use Next.js Image component
    return (
      <NextImage
        ref={ref as any}
        className={cn("rounded-lg", aspectRatioClass[aspectRatio], className)}
        src={src || ""}
        width={width}
        height={height}
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

NextImageWrapper.displayName = "NextImageWrapper";

// Determine which Image component to use based on environment
// For server-side rendering, we need to decide at runtime
const Image = React.forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  // In a browser environment, use the NextImageWrapper which will
  // dynamically load Next.js Image if available
  if (typeof window !== 'undefined') {
    return <NextImageWrapper ref={ref} {...props} />;
  }

  // In a server environment, we need to be more careful
  // This will be executed during SSR
  try {
    // Check if we're in a Next.js environment
    if (
      typeof process !== 'undefined' &&
      process.env &&
      (process.env.__NEXT_VERSION || process.env.NEXT_RUNTIME)
    ) {
      // We're in Next.js, try to use Next.js Image
      // This is safe because Next.js will be available in this environment
      const NextImage = require('next/image').default;
      
      const {
        className,
        aspectRatio = "auto",
        width,
        height,
        loading,
        fit = "cover",
        alt = "",
        src,
        priority,
        quality,
        placeholder,
        blurDataURL,
        sizes,
        unoptimized,
        style,
        ...restProps
      } = props;

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
          width={width}
          height={height}
          priority={priority || loading === "eager"}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          sizes={sizes}
          unoptimized={unoptimized}
          style={{ objectFit: fit, ...style }}
          alt={alt}
          {...restProps}
        />
      );
    }
  } catch (e) {
    // Next.js is not available, fall back to StandardImage
  }

  // Default to StandardImage for all other environments
  return <StandardImage ref={ref} {...props} />;
});

Image.displayName = "Image";

export { Image, StandardImage };