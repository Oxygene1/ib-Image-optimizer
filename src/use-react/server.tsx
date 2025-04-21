import dynamic from "next/dynamic";
import type { ImageOptimizerProps } from "./client";
import { Skeleton } from "../components/ui/skeleton";
import { cn } from "../lib/utils";

const ClientImageOptimizer = dynamic(
  () => import("./client").then((mod) => mod.ClientImageOptimizer),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-full" />,
  }
);

const ServerImageOptimizer = ({
  aspectRatio = "auto",
  className,
}: ImageOptimizerProps) => {
  return (
    <div
      className={cn(
        "relative",
        aspectRatio && `aspect-${aspectRatio}`,
        className
      )}
    >
      <Skeleton className="absolute inset-0" />
    </div>
  );
};

export const ImageOptimizer = (props: ImageOptimizerProps) => {
  if (typeof window === "undefined") {
    return <ServerImageOptimizer {...props} />;
  }
  return <ClientImageOptimizer {...props} />;
};

export type { ImageOptimizerProps };
