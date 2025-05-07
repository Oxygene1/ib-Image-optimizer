
import { ImageOptimizerProps } from "../types";
import { ClientImageOptimizer } from "./client";

export function ImageOptimizer(props: ImageOptimizerProps) {
  return <ClientImageOptimizer {...props} />;
}
export { ClientImageOptimizer };