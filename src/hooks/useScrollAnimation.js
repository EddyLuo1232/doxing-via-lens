import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-triggered animations using Intersection Observer
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Intersection threshold (0-1)
 * @param {string} options.rootMargin - Root margin for intersection observer
 * @param {boolean} options.triggerOnce - Whether to trigger animation only once
 * @returns {Object} - { ref, isVisible, hasAnimated }
 */
export const useScrollAnimation = ({
  threshold = 0.1,
  rootMargin = '0px 0px -100px 0px',
  triggerOnce = true
} = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            setHasAnimated(true);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible, hasAnimated };
};

/**
 * Hook for staggered animations with different delays
 * @param {number} index - Index for stagger calculation
 * @param {number} staggerDelay - Delay between each item (in ms)
 * @param {Object} options - Same as useScrollAnimation options
 * @returns {Object} - Same as useScrollAnimation plus calculated delay
 */
export const useStaggeredAnimation = (index, staggerDelay = 200, options = {}) => {
  const { ref, isVisible, hasAnimated } = useScrollAnimation(options);
  const delay = index * staggerDelay;

  return { ref, isVisible, hasAnimated, delay };
};

/**
 * Get animation classes based on visibility state
 * @param {boolean} isVisible - Whether element is visible
 * @param {string} animation - Animation type ('fadeInUp', 'slideInLeft', etc.)
 * @param {number} delay - Animation delay in milliseconds
 * @param {number} duration - Animation duration in milliseconds
 * @returns {string} - CSS classes for animation
 */
export const getAnimationClasses = (
  isVisible,
  animation = 'fadeInUp',
  delay = 0,
  duration = 800
) => {
  const baseClasses = 'transition-all duration-300';
  
  if (!isVisible) {
    return `${baseClasses} opacity-0`;
  }

  const animationClass = `animate-[${animation}_${duration}ms_ease-out_${delay}ms_forwards]`;
  return `${baseClasses} ${animationClass}`;
};

export default useScrollAnimation; 