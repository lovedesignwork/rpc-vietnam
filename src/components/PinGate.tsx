'use client';

import { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface PinGateProps {
  onSuccess: (pin: string) => void;
}

export function PinGate({ onSuccess }: PinGateProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length !== 4) {
      setError('PIN phải có 4 số');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/stats', {
        headers: { 'x-dashboard-pin': pin },
      });

      if (response.ok) {
        onSuccess(pin);
      } else {
        setError('PIN không đúng');
        setPin('');
      }
    } catch {
      setError('Có lỗi xảy ra');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-sm shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-gold-500" />
          </div>
          <h1 className="font-serif text-2xl font-semibold text-navy-900">Dashboard Access</h1>
          <p className="text-navy-500 mt-2">Nhập PIN 4 số để xem thống kê</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="relative mb-6">
            <input
              type={showPin ? 'text' : 'password'}
              value={pin}
              onChange={e => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
              className="w-full text-center text-3xl tracking-[0.5em] py-4 border-2 border-cream-300 rounded-sm
                       focus:outline-none focus:border-gold-500 transition-colors"
              placeholder="••••"
              maxLength={4}
              inputMode="numeric"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600"
            >
              {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading || pin.length !== 4}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Đang xác thực...' : 'Truy cập Dashboard'}
          </button>
        </form>

        <p className="text-center text-sm text-navy-400 mt-6">
          Royal Phuket City Hotel Analytics
        </p>
      </div>
    </div>
  );
}
