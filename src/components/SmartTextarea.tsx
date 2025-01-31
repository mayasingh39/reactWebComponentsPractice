import React, { useState, useCallback } from 'react';
import { Circle } from 'lucide-react';

const MAX_CHARS = 280;
const WARNING_THRESHOLD = Math.floor(MAX_CHARS * 0.1);

export function SmartTextarea() {
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState('');

  const remainingChars = MAX_CHARS - text.length;
  const isOverLimit = remainingChars < 0;
  const isNearLimit = remainingChars <= WARNING_THRESHOLD && remainingChars >= 0;

  const formatText = useCallback((input: string) => {
    return input.split(' ').map((word, index) => {
      if (word.startsWith('@') || word.startsWith('#')) {
        return (
          <a
            key={index}
            href={`https://twitter.com/search?q=${encodeURIComponent(word)}`}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {word}{' '}
          </a>
        );
      }
      return word + ' ';
    });
  }, []);

  const handleSubmit = () => {
    if (!isOverLimit) {
      setSubmitted(text);
    }
  };

  return (
    <div className="w-full max-w-lg">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={`w-full p-4 border rounded-lg resize-none h-32 focus:outline-none focus:ring-2 ${
            isOverLimit
              ? 'border-red-500 focus:ring-red-200'
              : 'border-gray-300 focus:ring-blue-200'
          }`}
          placeholder="What's happening?"
        />
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <div
            className={`text-sm ${
              isOverLimit
                ? 'text-red-500'
                : isNearLimit
                ? 'text-yellow-500'
                : 'text-gray-500'
            }`}
          >
            {remainingChars}
          </div>
          <div className="w-8 h-8">
            <svg className="transform -rotate-90 w-8 h-8">
              <circle
                className="text-gray-200"
                strokeWidth="2"
                stroke="currentColor"
                fill="transparent"
                r="16"
                cx="16"
                cy="16"
              />
              <circle
                className={`${
                  isOverLimit
                    ? 'text-red-500'
                    : isNearLimit
                    ? 'text-yellow-500'
                    : 'text-blue-500'
                }`}
                strokeWidth="2"
                strokeDasharray={100}
                strokeDashoffset={100 - (text.length / MAX_CHARS) * 100}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="16"
                cx="16"
                cy="16"
              />
            </svg>
          </div>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        disabled={isOverLimit || text.length === 0}
        className={`mt-4 px-4 py-2 rounded-full font-medium ${
          isOverLimit || text.length === 0
            ? 'bg-blue-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white transition-colors`}
      >
        Tweet
      </button>
      {submitted && (
        <div className="mt-4 p-4 border rounded-lg">
          <h3 className="font-medium text-gray-700 mb-2">Last Tweet:</h3>
          <p className="text-gray-600">{formatText(submitted)}</p>
        </div>
      )}
    </div>
  );
}