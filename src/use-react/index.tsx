import { ClientImageOptimizer, type ImageOptimizerProps } from "./client";
import { Image, type ImageProps } from "../components/ui/image";

// ImageOptimizer is imported to this file so that it can work with nextjs and other client and ssr react frameworks
export const ImageOptimizer = ClientImageOptimizer;

// Export types
export type { ImageOptimizerProps, ImageProps };
export { Image };

// Default export
export default ImageOptimizer;
