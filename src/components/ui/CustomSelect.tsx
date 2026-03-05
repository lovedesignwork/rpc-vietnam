'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  required,
  className,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedOption = options.find(opt => opt.value === value || opt.label === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && listRef.current) {
      const selectedIndex = options.findIndex(opt => opt.value === value || opt.label === value);
      if (selectedIndex >= 0) {
        setHighlightedIndex(selectedIndex);
      }
    }
  }, [isOpen, options, value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => (prev + 1) % options.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => (prev - 1 + options.length) % options.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          onChange(options[highlightedIndex].label);
          setIsOpen(false);
        }
        break;
    }
  };

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={cn(
          'w-full px-4 py-3 pr-12 text-left border rounded-xl bg-white transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500',
          isOpen ? 'border-gold-500 ring-2 ring-gold-500/50' : 'border-cream-300 hover:border-gold-400',
          !selectedOption && 'text-navy-400'
        )}
      >
        <span className={cn(selectedOption ? 'text-navy-700' : 'text-navy-400')}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown 
          className={cn(
            'absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-500 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {required && !value && (
        <input
          type="text"
          required
          value={value}
          onChange={() => {}}
          className="sr-only"
          tabIndex={-1}
        />
      )}

      {isOpen && (
        <ul
          ref={listRef}
          className="absolute z-50 w-full mt-2 bg-white border border-cream-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
          role="listbox"
        >
          <div className="max-h-64 overflow-y-auto py-1">
            {options.map((option, index) => {
              const isSelected = option.value === value || option.label === value;
              const isHighlighted = index === highlightedIndex;

              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.label);
                    setIsOpen(false);
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={cn(
                    'flex items-center justify-between px-4 py-3 cursor-pointer transition-colors',
                    isHighlighted && !isSelected && 'bg-cream-50',
                    isSelected && 'bg-gold-50',
                  )}
                >
                  <span className={cn(
                    'text-sm',
                    isSelected ? 'text-gold-700 font-medium' : 'text-navy-700'
                  )}>
                    {option.label}
                  </span>
                  {isSelected && (
                    <Check className="w-4 h-4 text-gold-500" />
                  )}
                </li>
              );
            })}
          </div>
        </ul>
      )}
    </div>
  );
}
