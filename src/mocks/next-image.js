// src/mocks/next-image.js
import * as React from 'react';

// This is a mock of the Next.js Image component for development
const NextImage = React.forwardRef((props, ref) => {
  const { src, alt, width, height, style, className, ...rest } = props;
  return React.createElement('img', {
    ref,
    src,
    alt,
    width,
    height,
    style,
    className,
    ...rest
  });
});

NextImage.displayName = 'NextImage';

export default NextImage;