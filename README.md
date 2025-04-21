# Image Optimizer

A React component for optimizing images with loading states and aspect ratio control.

## Features

- 🖼️ Image optimization with loading states
- 📐 Flexible aspect ratio control (auto, square, portrait, landscape)
- 💅 Customizable styling with Tailwind CSS
- 🌙 Dark mode support
- 🚀 Smooth fade-in transitions
- 🛡️ Error handling with fallback images
- 📱 Responsive design
- ⚡ TypeScript support
- 🧪 Test coverage with Jest and React Testing Library

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
      alt="Description"
      aspectRatio="auto"
      className="rounded-lg shadow-lg"
      showSkeleton={true}
      fallbackSrc="https://example.com/fallback.jpg"
      onError={(error) => console.error(error)}
      onLoad={() => console.log("Image loaded")}
    />
  );
}
```

### React-Specific Import

If you're using React and want to import directly from the React implementation:

```tsx
import { ImageOptimizer } from "ib-image-optimizer/use-react";
```

## Props

| Prop           | Type                                            | Default | Description                                        |
| -------------- | ----------------------------------------------- | ------- | -------------------------------------------------- |
| `src`          | string                                          | -       | The source URL of the image                        |
| `alt`          | string                                          | -       | Alt text for the image                             |
| `aspectRatio`  | "auto" \| "square" \| "portrait" \| "landscape" | "auto"  | The aspect ratio of the image                      |
| `className`    | string                                          | -       | Additional CSS classes to apply                    |
| `style`        | React.CSSProperties                             | -       | Inline styles to apply                             |
| `showSkeleton` | boolean                                         | true    | Whether to show the loading skeleton               |
| `fallbackSrc`  | string                                          | -       | Fallback image URL if the main image fails to load |
| `onError`      | (error: Error \| ErrorEvent) => void            | -       | Error handler callback                             |
| `onLoad`       | () => void                                      | -       | Load handler callback                              |

## Aspect Ratios

The component supports multiple aspect ratios:

- `auto`: Natural aspect ratio of the image
- `square`: 1:1 aspect ratio
- `portrait`: 3:4 aspect ratio
- `landscape`: 4:3 aspect ratio

## Styling

You can customize the appearance using:

1. `className` prop for Tailwind CSS classes
2. `style` prop for inline styles

Example:

```tsx
<ImageOptimizer
  src="image.jpg"
  alt="Custom styled image"
  className="rounded-full border-4 border-blue-500"
  style={{ filter: "grayscale(50%)" }}
/>
```

## Error Handling

The component provides robust error handling:

1. `fallbackSrc` prop for a backup image
2. `onError` callback for error handling
3. Automatic fallback to null if no fallback image is provided

Example:

```tsx
<ImageOptimizer
  src="https://invalid-url.com/image.jpg"
  fallbackSrc="fallback.jpg"
  onError={(error) => console.error("Image failed to load:", error)}
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
4. Run tests:
   ```bash
   npm test
   ```
5. Generate coverage report:
   ```bash
   npm run test:coverage
   ```

## Testing

The component includes comprehensive tests using Jest and React Testing Library. Key test cases include:

- Loading states
- Error handling
- Aspect ratio changes
- Fallback image behavior
- Event handling

Run the test suite:

```bash
npm test
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
