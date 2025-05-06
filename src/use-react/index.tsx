import { ImageProps } from "@/components/ui/image";
import ClientImageOptimizer from "./client";

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

export const ImageOptimizer = ({ ...props }: ImageOptimizerProps) => {
  return <ClientImageOptimizer {...props} />;
};


