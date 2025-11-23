import { useEffect, useRef, useState } from 'react';

export function useHover<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const enter = () => setHovered(true);
    const leave = () => setHovered(false);

    node.addEventListener('pointerenter', enter);
    node.addEventListener('pointerleave', leave);

    return () => {
      node.removeEventListener('pointerenter', enter);
      node.removeEventListener('pointerleave', leave);
    };
  }, []);

  return { ref, hovered };
}
