import { ImageOptimizerProps } from "@/types";
import ClientImageOptimizer from "./client";
export default function ImageOptimizer({ ...props }: ImageOptimizerProps) {
  return <ClientImageOptimizer {...props} />;
};
