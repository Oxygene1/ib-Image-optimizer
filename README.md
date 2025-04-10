# IB Image Optimizer

A sleek and powerful React component for optimizing images with loading states, fallback support, and aspect ratio control.

## Features

- 🖼️ **Image Optimization**: Efficient image loading with fallback support
- ⚡ **Loading States**: Beautiful skeleton loading states
- 📐 **Aspect Ratio Control**: Support for square, portrait, landscape, and auto aspect ratios
- 🎨 **Styling**: Fully customizable with className and style props
- 🌙 **Dark Mode Support**: Built-in dark mode compatibility
- 🛠️ **TypeScript Support**: Fully typed components and props
- 📱 **Responsive**: Works seamlessly across all device sizes

## Installation

```bash
npm install ib-image-optimizer
```

## Usage

### Basic Usage

```tsx
import { ImageOptimizer } from "ib-image-optimizer";

function App() {
  return (
    <ImageOptimizer
      src="https://example.com/image.jpg"
      alt="Example image"
      width={400}
      height={300}
    />
  );
}
```

### With Loading State

```tsx
<ImageOptimizer
  src="https://example.com/image.jpg"
  aspectRatio="square"
  width={400}
  height={400}
  alt="Square image with loading state"
/>
```

### With Fallback Image

```tsx
<ImageOptimizer
  src="https://invalid-url.com/image.jpg"
  fallbackSrc="https://example.com/fallback.jpg"
  aspectRatio="landscape"
  width={400}
  height={300}
  alt="Image with fallback"
  onError={(error) => console.log("Image error:", error)}
/>
```

### Without Loading State

```tsx
<ImageOptimizer
  src="https://example.com/image.jpg"
  showSkeleton={false}
  width={400}
  height={300}
  alt="Image without loading state"
/>
```

## Props

| Prop           | Type                                            | Default   | Description                                        |
| -------------- | ----------------------------------------------- | --------- | -------------------------------------------------- |
| `src`          | string                                          | required  | The source URL of the image                        |
| `fallbackSrc`  | string                                          | undefined | Fallback image URL if the main image fails to load |
| `aspectRatio`  | "square" \| "portrait" \| "landscape" \| "auto" | "auto"    | Controls the aspect ratio of the image             |
| `width`        | number                                          | undefined | Width of the image                                 |
| `height`       | number                                          | undefined | Height of the image                                |
| `alt`          | string                                          | required  | Alt text for the image                             |
| `className`    | string                                          | undefined | Additional CSS classes                             |
| `style`        | React.CSSProperties                             | undefined | Inline styles                                      |
| `showSkeleton` | boolean                                         | true      | Whether to show the loading skeleton               |
| `onError`      | (error: Error) => void                          | undefined | Error handler callback                             |

## Aspect Ratios

The component supports four aspect ratio options:

- `square`: 1:1 aspect ratio
- `portrait`: 3:4 aspect ratio
- `landscape`: 4:3 aspect ratio
- `auto`: Natural aspect ratio of the image

## Styling

The component can be styled using the `className` and `style` props:

```tsx
<ImageOptimizer
  src="https://example.com/image.jpg"
  className="custom-class"
  style={{ border: "1px solid #ccc" }}
  alt="Styled image"
/>
```

## Error Handling

The component provides error handling through the `onError` callback and fallback image support:

```tsx
<ImageOptimizer
  src="https://invalid-url.com/image.jpg"
  fallbackSrc="https://example.com/fallback.jpg"
  onError={(error) => console.error("Image failed to load:", error)}
  alt="Image with error handling"
/>
```

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build the package:
   ```bash
   npm run build
   ```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
