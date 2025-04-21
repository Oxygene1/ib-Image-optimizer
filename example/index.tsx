import React from "react";
import ReactDOM from "react-dom/client";
import { ImageOptimizer } from "../src";
import "./styles.css";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Image Optimizer Examples
        </h1>

        {/* Square Image with Loading State */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Square Image with Loading State
          </h2>
          <div className="w-64 h-64">
            <ImageOptimizer
              src="https://picsum.photos/400/400"
              alt="Square image"
              aspectRatio="square"
              className="rounded-lg shadow-lg"
              showSkeleton={true}
            />
          </div>
        </div>

        {/* Portrait Image with Loading State */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Portrait Image with Loading State
          </h2>
          <div className="w-64 h-96">
            <ImageOptimizer
              src="https://picsum.photos/400/600"
              alt="Portrait image"
              aspectRatio="portrait"
              className="rounded-lg shadow-lg"
              showSkeleton={true}
            />
          </div>
        </div>

        {/* Landscape Image with Loading State */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Landscape Image with Loading State
          </h2>
          <div className="w-96 h-64">
            <ImageOptimizer
              src="https://picsum.photos/600/400"
              alt="Landscape image"
              aspectRatio="landscape"
              className="rounded-lg shadow-lg"
              showSkeleton={true}
            />
          </div>
        </div>

        {/* Image with Fallback and Error Handler */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Image with Fallback and Error Handler
          </h2>
          <div className="w-64 h-64">
            <ImageOptimizer
              src="https://invalid-url.com/image.jpg"
              fallbackSrc="https://picsum.photos/400/400"
              alt="Image with fallback"
              aspectRatio="square"
              className="rounded-lg shadow-lg"
              showSkeleton={true}
              onError={(error) => console.error("Image failed to load:", error)}
            />
          </div>
        </div>

        {/* Image without Loading State */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Image without Loading State
          </h2>
          <div className="w-64 h-64">
            <ImageOptimizer
              src="https://picsum.photos/400/400"
              alt="Image without loading state"
              aspectRatio="square"
              className="rounded-lg shadow-lg"
              showSkeleton={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
