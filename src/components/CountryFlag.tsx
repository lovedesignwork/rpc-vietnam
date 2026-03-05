'use client';

import Image from 'next/image';
import { useState } from 'react';

interface CountryFlagProps {
  countryCode: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: { width: 16, height: 12 },
  md: { width: 24, height: 18 },
  lg: { width: 32, height: 24 },
};

export function CountryFlag({ countryCode, size = 'md', className = '' }: CountryFlagProps) {
  const [hasError, setHasError] = useState(false);
  const { width, height } = sizeMap[size];
  
  const code = countryCode?.toUpperCase() || 'XX';
  
  if (hasError || code === 'UNKNOWN' || code === 'XX' || !code) {
    return (
      <span 
        className={`inline-flex items-center justify-center bg-cream-200 rounded-sm text-xs ${className}`}
        style={{ width, height }}
      >
        🌐
      </span>
    );
  }

  return (
    <Image
      src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
      alt={`${code} flag`}
      width={width}
      height={height}
      className={`inline-block rounded-sm object-cover ${className}`}
      onError={() => setHasError(true)}
      unoptimized
    />
  );
}
