'use client';

import { ChevronDown, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Option {
  id: string;
  name: string;
}

interface MultiSelectProps {
  options: Option[];
  selectedIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  placeholder?: string;
  emptyMessage?: string;
}

export function MultiSelect({
  options,
  selectedIds,
  onSelectionChange,
  placeholder = 'Select items...',
  emptyMessage = 'No items found.',
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter(
    (option) => option.name.toLowerCase().includes(searchTerm.toLowerCase()) && !selectedIds.includes(option.id)
  );

  const selectedOptions = options.filter((option) => selectedIds.includes(option.id));

  const handleToggleOption = (optionId: string) => {
    if (selectedIds.includes(optionId)) {
      onSelectionChange(selectedIds.filter((id) => id !== optionId));
    } else {
      onSelectionChange([...selectedIds, optionId]);
    }
  };

  const handleRemoveSelected = (optionId: string) => {
    onSelectionChange(selectedIds.filter((id) => id !== optionId));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      inputRef.current?.focus();
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Selected items display */}
      {selectedOptions.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedOptions.map((option) => (
            <Badge key={option.id} variant="secondary" className="flex items-center gap-1 px-2 py-1">
              {option.name}
              <button
                type="button"
                onClick={() => handleRemoveSelected(option.id)}
                className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Main input/button */}
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between h-auto min-h-[40px] px-3 py-2"
      >
        <span className="text-left">
          {selectedOptions.length > 0 ? `${selectedOptions.length} selected` : placeholder}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-lg">
          <div className="p-2 border-b">
            <Input
              ref={inputRef}
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-8"
            />
          </div>

          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="p-3 text-sm text-muted-foreground text-center">{emptyMessage}</div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleToggleOption(option.id)}
                  className="w-full flex items-center px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground text-left"
                >
                  <span>{option.name}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
