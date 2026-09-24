import { useEffect, useState } from 'react';
export default function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches || (import.meta.env.DEV && new URLSearchParams(location.search).get('motion') === 'off'));
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches || (import.meta.env.DEV && new URLSearchParams(location.search).get('motion') === 'off'));
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return reduced;
}
