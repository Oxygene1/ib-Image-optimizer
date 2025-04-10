import React from "react";
import { createRoot } from "react-dom/client";
import { ImageOptimizer } from "../src";

const App: React.FC = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Image Optimizer Examples</h1>

      <h2>Square Image with Loading State</h2>
      <ImageOptimizer
        src="https://picsum.photos/400"
        aspectRatio="square"
        width={400}
        height={400}
        alt="Random square image"
      />

      <h2>Portrait Image with Loading State</h2>
      <ImageOptimizer
        src="https://picsum.photos/300/400"
        aspectRatio="portrait"
        width={300}
        height={400}
        alt="Random portrait image"
      />

      <h2>Landscape Image with Fallback</h2>
      <ImageOptimizer
        src="https://invalid-url.com/image.jpg"
        fallbackSrc="https://picsum.photos/400/300"
        aspectRatio="landscape"
        width={400}
        height={300}
        alt="Random landscape image with fallback"
        onError={(error) => console.log("Image error:", error)}
      />

      <h2>Image without Loading State</h2>
      <ImageOptimizer
        src="https://picsum.photos/400/400"
        aspectRatio="square"
        width={400}
        height={400}
        alt="Image without loading state"
        showSkeleton={false}
      />
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
