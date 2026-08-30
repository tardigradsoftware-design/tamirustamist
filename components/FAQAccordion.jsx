'use client';

import { useState } from 'react';
import Icon from './Icons';

export default function FAQAccordion({ items = [], defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={`overflow-hidden rounded-xl border transition-colors ${
              isOpen ? 'border-brand-200 bg-brand-50/50' : 'border-ink-200 bg-white'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-[15px] font-bold text-ink-800">{item.s}</span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                  isOpen ? 'bg-brand-600 text-white' : 'bg-ink-100 text-ink-600'
                }`}
              >
                <Icon name={isOpen ? 'minus' : 'plus'} size={16} strokeWidth={2.2} />
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="border-t border-ink-100 px-5 pb-5 pt-4 text-sm leading-relaxed text-ink-600">
                  {item.c}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}