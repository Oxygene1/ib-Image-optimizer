
export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "width" | "height"> {
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
  fill?: boolean;
}

export interface ImageOptimizerProps
  extends Omit<ImageProps, "src" | "onError"> {
  src?: string;
  fallbackSrc?: string;
  onError?: (error: Error | ErrorEvent) => void;
  onLoad?: () => void;
  className?: string;
  style?: React.CSSProperties;
  showSkeleton?: boolean;
}


