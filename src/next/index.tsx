import dynamic from "next/dynamic";
import { ImageOptimizerProps } from "../types";
import { Skeleton } from "../components/ui/skeleton";
import { cn } from "../lib/utils";

function ServerFallback({
  className,
  aspectRatio = "auto",
  style,
}: Partial<ImageOptimizerProps>) {
  return (
    <div
      className={cn(
        "relative",
        aspectRatio && typeof aspectRatio === "string"
          ? `aspect-${aspectRatio}`
          : "",
        className
      )}
      style={style}
    >
      <Skeleton aspectRatio={aspectRatio} className="absolute inset-0" />
    </div>
  );
}

// Dynamically import the client component with loading state
const ClientImageOptimizer = dynamic(
  () => import("../use-react/client").then((mod) => mod.ClientImageOptimizer),
  {
    ssr: false,
    loading: () => <ServerFallback />
  }
);

// Export a component that can be used directly in Next.js without "use client"
export function ImageOptimizer(props: ImageOptimizerProps) {
  return <ClientImageOptimizer {...props} />;
}