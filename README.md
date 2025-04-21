# IB Image Optimizer

A React component for optimizing images with loading states and error handling.

## Features

- Image loading states with skeleton placeholders
- Error handling with fallback images
- Aspect ratio control
- Next.js server component support
- TypeScript support

## Installation

```bash
npm install ib-image-optimizer
```

## Usage

### Basic Usage

```tsx
import { ImageOptimizer } from "ib-image-optimizer/use-react";

function App() {
  return (
    <ImageOptimizer
      src="https://example.com/image.jpg"
      fallbackSrc="https://example.com/fallback.jpg"
      aspectRatio="square"
      onLoad={() => console.log("Image loaded")}
      onError={(error) => console.error("Image failed to load:", error)}
    />
  );
}
```

### Next.js Integration

The component is designed to work seamlessly with Next.js server components:

```tsx
// app/page.tsx
import { ImageOptimizer } from "ib-image-optimizer/use-react";

export default function Page() {
  return (
    <ImageOptimizer
      src="/images/hero.jpg"
      fallbackSrc="/images/fallback.jpg"
      aspectRatio="landscape"
    />
  );
}
```

## Props

| Prop           | Type                                            | Description                                                   |
| -------------- | ----------------------------------------------- | ------------------------------------------------------------- |
| `src`          | string                                          | The source URL of the image                                   |
| `fallbackSrc`  | string                                          | Fallback image URL to display if the main image fails to load |
| `aspectRatio`  | "auto" \| "square" \| "portrait" \| "landscape" | Controls the aspect ratio of the image container              |
| `onLoad`       | () => void                                      | Callback fired when the image loads successfully              |
| `onError`      | (error: Error \| ErrorEvent) => void            | Callback fired when the image fails to load                   |
| `className`    | string                                          | Additional CSS classes to apply to the container              |
| `style`        | React.CSSProperties                             | Inline styles to apply to the container                       |
| `showSkeleton` | boolean                                         | Whether to show a skeleton loading state (default: true)      |

## Requirements

- React 18.2.0 or higher
- Next.js 14.0.0 or higher (for server component support)
- TypeScript 4.9.0 or higher (recommended)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
