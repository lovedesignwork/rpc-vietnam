'use client';

import { useState } from 'react';
import { Lock, Eye, EyeOff, Activity } from 'lucide-react';

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
      setError('PIN must be 4 digits');
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
        setError('Invalid PIN');
        setPin('');
      }
    } catch {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-amber-500/20">
            <Activity className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-[22px] font-semibold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-[14px] text-[#666]">Enter your PIN to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Lock className="w-4 h-4 text-[#444]" />
            </div>
            <input
              type={showPin ? 'text' : 'password'}
              value={pin}
              onChange={e => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
              className="w-full pl-11 pr-11 py-4 text-center text-[20px] tracking-[0.4em] 
                       bg-[#141414] border border-[#1f1f1f] rounded-xl text-white
                       focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50
                       transition-all placeholder:text-[#333] placeholder:tracking-[0.5em]"
              placeholder="••••"
              maxLength={4}
              inputMode="numeric"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-[#1f1f1f] rounded-lg transition-colors"
            >
              {showPin ? (
                <EyeOff className="w-4 h-4 text-[#444]" />
              ) : (
                <Eye className="w-4 h-4 text-[#444]" />
              )}
            </button>
          </div>

          {error && (
            <p className="text-[13px] text-red-400 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading || pin.length !== 4}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[14px] font-semibold rounded-xl
                     hover:from-amber-400 hover:to-orange-400 disabled:opacity-40 disabled:cursor-not-allowed
                     transition-all shadow-lg shadow-amber-500/20"
          >
            {isLoading ? 'Verifying...' : 'Access Dashboard'}
          </button>
        </form>

        <p className="text-center text-[12px] text-[#333] mt-8">
          Royal Phuket City Hotel
        </p>
      </div>
    </div>
  );
}
