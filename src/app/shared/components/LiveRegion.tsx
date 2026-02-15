import { useEffect, useRef } from 'react';

export function useLiveRegion() {
  const liveRegionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Crear l'element si no existeix
    if (!liveRegionRef.current) {
      const div = document.createElement('div');
      div.setAttribute('role', 'status');
      div.setAttribute('aria-live', 'polite');
      div.setAttribute('aria-atomic', 'true');
      div.className = 'sr-only';
      document.body.appendChild(div);
      liveRegionRef.current = div;
    }

    return () => {
      // Cleanup
      if (liveRegionRef.current) {
        liveRegionRef.current.remove();
      }
    };
  }, []);

  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (liveRegionRef.current) {
      liveRegionRef.current.setAttribute('aria-live', priority);
      liveRegionRef.current.textContent = message;
      
      // Netejar després d'un temps
      setTimeout(() => {
        if (liveRegionRef.current) {
          liveRegionRef.current.textContent = '';
        }
      }, 1000);
    }
  };

  return { announce };
}

// Component visual (opcional)
export function LiveRegion() {
  return (
    <div 
      role="status" 
      aria-live="polite" 
      aria-atomic="true" 
      className="sr-only"
      id="live-region"
    />
  );
}