import React, { useRef, useEffect, useState } from 'react';

export function ScrollFix() {
  const [isFixed, setIsFixed] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sidebarRef.current && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const shouldFix = containerRect.top <= 0;
        setIsFixed(shouldFix);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-[200vh]" ref={containerRef}>
      <div className="h-[50vh] bg-gray-100 flex items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-700">Scroll down to see the effect</h2>
      </div>
      <div className="flex gap-8">
        <div
          ref={sidebarRef}
          className={`w-64 bg-white p-6 rounded-lg shadow-lg ${
            isFixed ? 'fixed top-4' : ''
          }`}
        >
          <h3 className="text-lg font-semibold mb-4">Fixed Sidebar</h3>
          <ul className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <li
                key={index}
                className="p-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer"
              >
                Menu Item {index + 1}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 p-6">
          <div className="space-y-8">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Section {index + 1}</h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}