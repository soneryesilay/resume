"use client";

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

// Custom hook for checking if an element is in view for scroll animations
export const useScrollInView = () => {
  const ref = useRef(null);
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  
  // Use Framer's useInView hook but only after initial render
  const rawIsInView = useInView(ref, { once: true, amount: 0.2 });
  
  // Don't trigger "in view" during initial page load to prevent premature animations
  useEffect(() => {
    // Wait for initial animations to complete before enabling "in view" detection
    const timer = setTimeout(() => {
      setInitialRenderComplete(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Only consider elements "in view" after initial render is complete
  const isInView = initialRenderComplete && rawIsInView;
  
  return { ref, isInView };
};

// Smooth scrolling for anchor links
export const useSmoothScroll = () => {
  // Track whether page has completed initial load
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  
  useEffect(() => {
    // Don't attach event listeners until the page has fully loaded
    // This prevents unwanted scrolling during initial page animation
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 1100); // Match this with loading animation duration
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Only add scroll handlers after page is fully loaded
    if (!isPageLoaded) return;
    
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A') {
        const href = target.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
              behavior: 'auto' // Use 'auto' instead of 'smooth' for immediate transition
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [isPageLoaded]);
};

// Parallax effect for elements when scrolling
export const useParallax = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  useEffect(() => {
    // Add a small delay before enabling scroll tracking to prevent unwanted animations during page load
    const initialTimer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 1000);
    
    const handleScroll = () => {
      if (!isInitialLoad) {
        setScrollY(window.scrollY);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(initialTimer);
    };
  }, [isInitialLoad]);
  
  return { scrollY };
};

// Loading state handler
export const useLoadingState = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Make sure the DOM is fully loaded before dismissing the loading screen
    if (document.readyState === 'complete') {
      setTimeout(() => setIsLoading(false), 1000);
    } else {
      // Wait for everything to load first
      window.addEventListener('load', () => {
        setTimeout(() => setIsLoading(false), 1000);
      });
    }
    
    // Ensure loading state is cleared if component unmounts
    return () => {
      window.removeEventListener('load', () => setIsLoading(false));
    };
  }, []);
  
  return { isLoading };
};