'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({ children, className = '' }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalCards, setTotalCards] = useState(0);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate active index
    const cards = Array.from(el.children) as HTMLElement[];
    setTotalCards(cards.length);
    if (cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth;
    const gap = 24; // gap-6 = 24px
    const index = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(index, cards.length - 1));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    if (cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth;
    const gap = 24;
    const scrollAmount = direction === 'left' ? -(cardWidth + gap) : cardWidth + gap;

    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    if (index < 0 || index >= cards.length) return;

    const cardWidth = cards[0].offsetWidth;
    const gap = 24;
    el.scrollTo({ left: index * (cardWidth + gap), behavior: 'smooth' });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') scroll('left');
      if (e.key === 'ArrowRight') scroll('right');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [scroll]);

  return (
    <div className={`relative group ${className}`}>
      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}
      >
        {children}
      </div>

      {/* Left arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 items-center justify-center rounded-full bg-[#0a120a]/90 border border-green-500/30 text-green-400 backdrop-blur-sm transition-all hover:bg-green-500/10 hover:border-green-500/50 hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] opacity-0 group-hover:opacity-100"
          aria-label="Previous"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* Right arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 items-center justify-center rounded-full bg-[#0a120a]/90 border border-green-500/30 text-green-400 backdrop-blur-sm transition-all hover:bg-green-500/10 hover:border-green-500/50 hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] opacity-0 group-hover:opacity-100"
          aria-label="Next"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* Dot indicators */}
      {totalCards > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: totalCards }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-6 bg-green-400 shadow-[0_0_8px_rgba(0,255,65,0.6)]'
                  : 'w-2 bg-gray-700 hover:bg-gray-600'
              }`}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
