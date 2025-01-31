import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';

interface PasswordCriteria {
  label: string;
  test: (password: string) => boolean;
}

const CRITERIA: PasswordCriteria[] = [
  {
    label: 'At least 8 characters',
    test: (password) => password.length >= 8,
  },
  {
    label: 'Contains uppercase letter',
    test: (password) => /[A-Z]/.test(password),
  },
  {
    label: 'Contains lowercase letter',
    test: (password) => /[a-z]/.test(password),
  },
  {
    label: 'Contains number',
    test: (password) => /\d/.test(password),
  },
  {
    label: 'Contains special character',
    test: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
];

export function PasswordInput() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    const passedCriteria = CRITERIA.filter((criterion) => criterion.test(password));
    setStrength((passedCriteria.length / CRITERIA.length) * 100);
  }, [password]);

  const getStrengthColor = () => {
    if (strength < 40) return 'bg-red-500';
    if (strength < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Enter password"
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div className="mt-4">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${getStrengthColor()}`}
            style={{ width: `${strength}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Password strength:{' '}
          <span
            className={
              strength < 40
                ? 'text-red-500'
                : strength < 70
                ? 'text-yellow-500'
                : 'text-green-500'
            }
          >
            {strength < 40 ? 'Weak' : strength < 70 ? 'Medium' : 'Strong'}
          </span>
        </p>
      </div>

      <div className="mt-4 space-y-2">
        {CRITERIA.map((criterion, index) => (
          <div key={index} className="flex items-center gap-2">
            {criterion.test(password) ? (
              <Check size={16} className="text-green-500" />
            ) : (
              <X size={16} className="text-red-500" />
            )}
            <span className="text-sm text-gray-600">{criterion.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}