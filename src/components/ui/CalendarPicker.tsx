'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalendarPickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const WEEKDAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
const MONTHS_VI = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
];

export function CalendarPicker({
  value,
  onChange,
  placeholder = 'Chọn ngày',
  className,
}: CalendarPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => {
    if (value) {
      return new Date(value);
    }
    return new Date();
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  const selectedDate = value ? new Date(value) : null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleSelectDate = (day: number) => {
    const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    if (date < today) return;
    
    const formatted = date.toISOString().split('T')[0];
    onChange(formatted);
    setIsOpen(false);
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === viewDate.getMonth() &&
      selectedDate.getFullYear() === viewDate.getFullYear()
    );
  };

  const isToday = (day: number) => {
    const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    return date.toDateString() === today.toDateString();
  };

  const isPast = (day: number) => {
    const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    return date < today;
  };

  const daysInMonth = getDaysInMonth(viewDate);
  const firstDayOfMonth = getFirstDayOfMonth(viewDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const formatDisplayDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full px-4 py-3 pr-12 text-left border rounded-xl bg-white transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500',
          isOpen ? 'border-gold-500 ring-2 ring-gold-500/50' : 'border-cream-300 hover:border-gold-400',
          !value && 'text-navy-400'
        )}
      >
        <span className={cn(value ? 'text-navy-700' : 'text-navy-400')}>
          {value ? formatDisplayDate(value) : placeholder}
        </span>
        <Calendar 
          className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-500"
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white border-[3px] border-[#0d2842] rounded-xl p-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h3 className="text-lg font-semibold text-gray-900">
              {MONTHS_VI[viewDate.getMonth()]} {viewDate.getFullYear()}
            </h3>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="py-2 text-center text-sm font-medium text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells */}
            {emptyDays.map((_, index) => (
              <div key={`empty-${index}`} className="h-10" />
            ))}

            {/* Day cells */}
            {days.map((day) => {
              const past = isPast(day);
              const selected = isSelected(day);
              const todayDate = isToday(day);

              return (
                <div key={day} className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => handleSelectDate(day)}
                    disabled={past}
                    className={cn(
                      'w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all',
                      past && 'text-gray-300 cursor-not-allowed',
                      !past && !selected && 'bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer',
                      selected && 'text-white cursor-pointer',
                      todayDate && !selected && 'ring-2 ring-offset-2 ring-blue-500'
                    )}
                    style={selected ? { backgroundColor: '#008EE6' } : undefined}
                  >
                    {day}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-100 border border-green-200" />
              <span className="text-gray-600">Có thể chọn</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#008EE6' }} />
              <span className="text-gray-600">Đã chọn</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
