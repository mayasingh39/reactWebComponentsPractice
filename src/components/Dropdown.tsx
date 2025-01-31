import React, { useState, useEffect, useRef } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  multiSelect?: boolean;
  placeholder?: string;
}

export function Dropdown({ options, multiSelect = false, placeholder = 'Select...' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  const toggleOption = (option: Option) => {
    if (multiSelect) {
      setSelectedOptions((prev) =>
        prev.some((item) => item.value === option.value)
          ? prev.filter((item) => item.value !== option.value)
          : [...prev, option]
      );
    } else {
      setSelectedOptions([option]);
      setIsOpen(false);
    }
  };

  const removeOption = (optionToRemove: Option, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedOptions((prev) =>
      prev.filter((option) => option.value !== optionToRemove.value)
    );
  };

  return (
    <div className="relative w-full max-w-xs" ref={dropdownRef}>
      <div
        className="border rounded-lg px-4 py-2 bg-white cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1 flex-1">
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option) => (
              <span
                key={option.value}
                className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full flex items-center gap-1"
              >
                {option.label}
                {multiSelect && (
                  <X
                    size={14}
                    className="cursor-pointer"
                    onClick={(e) => removeOption(option, e)}
                  />
                )}
              </span>
            ))
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
        </div>
        <ChevronDown size={20} className="text-gray-500" />
      </div>

      {isOpen && (
        <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-10">
          <input
            type="text"
            className="w-full px-4 py-2 border-b focus:outline-none"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="max-h-60 overflow-auto">
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                className={`px-4 py-2 cursor-pointer flex items-center justify-between hover:bg-gray-100 ${
                  selectedOptions.some((item) => item.value === option.value)
                    ? 'bg-blue-50'
                    : ''
                }`}
                onClick={() => toggleOption(option)}
              >
                {option.label}
                {selectedOptions.some((item) => item.value === option.value) && (
                  <Check size={16} className="text-blue-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}