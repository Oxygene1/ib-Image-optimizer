import dynamic from "next/dynamic";
import type { ImageOptimizerProps } from "./client";

const ClientImageOptimizer = dynamic(
  () => import("./client").then((mod) => mod.ClientImageOptimizer),
  {
    ssr: false,
    loading: () => (
      <div className="relative aspect-auto">
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      </div>
    ),
  }
);

export const ImageOptimizer = (props: ImageOptimizerProps) => {
  return <ClientImageOptimizer {...props} />;
};

export type { ImageOptimizerProps };
