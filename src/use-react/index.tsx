"use client";

import { ClientImageOptimizer, type ImageOptimizerProps } from "./client";
import { Image, type ImageProps } from "../components/ui/image";
import { Skeleton } from "../components/ui/skeleton";

// Export the client component directly
export const ImageOptimizer = ClientImageOptimizer;

// Export types
export type { ImageOptimizerProps, ImageProps };
export { Image, Skeleton };

// Default export
export default ImageOptimizer;