import { useState, useEffect } from 'react';

export function useVisitorCount() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const stored = localStorage.getItem('icad-visitors');
    const current = stored ? parseInt(stored, 10) : 1247;
    const next = current + 1;
    localStorage.setItem('icad-visitors', next.toString());
    setCount(next);
  }, []);

  return count;
}
