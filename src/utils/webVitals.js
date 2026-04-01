/**
 * Web Vitals monitoring for Lighthouse metrics
 * Tracks LCP (Largest Contentful Paint), CLS (Cumulative Layout Shift), FID (First Input Delay)
 */

export function initWebVitalsMonitoring() {
  if (typeof window === 'undefined') return;

  // Monitor Largest Contentful Paint (LCP)
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        if (window.gtag) {
          window.gtag('event', 'page_view', {
            value: Math.round(lastEntry.renderTime || lastEntry.loadTime),
            event_category: 'Web Vitals',
            event_label: 'LCP',
          });
        }
        
        console.log('LCP:', Math.round(lastEntry.renderTime || lastEntry.loadTime) / 1000, 's');
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP monitoring not supported');
    }

    // Monitor Cumulative Layout Shift (CLS) - prevents jank/visual instability
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        
        if (window.gtag && clsValue > 0.1) {
          window.gtag('event', 'layout_shift', {
            value: clsValue.toFixed(3),
            event_category: 'Web Vitals',
            event_label: 'CLS',
          });
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('CLS monitoring not supported');
    }

    // Monitor First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (window.gtag) {
            window.gtag('event', 'first_input', {
              value: Math.round(entry.processingDuration),
              event_category: 'Web Vitals',
              event_label: 'FID',
            });
          }
          console.log('FID:', Math.round(entry.processingDuration), 'ms');
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.warn('FID monitoring not supported');
    }
  }

  // Basic performance metrics
  if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
      const timing = window.performance.timing;
      const navigationStart = timing.navigationStart;
      const paintEntries = performance.getEntriesByType('paint');
      
      paintEntries.forEach((entry) => {
        console.log(`${entry.name}: ${Math.round(entry.startTime)}ms`);
      });

      // Report to GA
      if (window.gtag) {
        window.gtag('event', 'page_load', {
          page_load_time: timing.loadEventEnd - navigationStart,
          event_category: 'performance',
        });
      }
    });
  }
}

/**
 * Defer non-critical CSS loading
 */
export function loadNonCriticalCSS() {
  if (typeof window === 'undefined' || !document) return;

  // Find all stylesheets marked as non-critical
  const links = document.querySelectorAll('link[data-deferred="true"]');
  links.forEach((link) => {
    if (link.getAttribute('rel') === 'stylesheet') {
      link.media = 'print';
      link.onload = function () {
        this.media = 'all';
      };
      // Fallback for browsers that don't support onload
      const newLink = link.cloneNode();
      newLink.onload = function () {
        link.remove();
      };
      link.parentNode.insertBefore(newLink, link.nextSibling);
    }
  });
}
