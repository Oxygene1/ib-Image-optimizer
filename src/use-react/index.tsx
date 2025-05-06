import { ImageOptimizerProps } from "@/types";
import ClientImageOptimizer from "./client";

export const ImageOptimizer = ({ ...props }: ImageOptimizerProps) => {
  return <ClientImageOptimizer {...props} />;
};
