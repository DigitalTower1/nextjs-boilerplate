// src/components/ui/Cursor.tsx (Snippet di aggiornamento)
import { useAppStore } from '@/store/useAppStore';

export default function Cursor() {
  const cursorType = useAppStore((state) => state.cursorType);
  const cursorRef = useRef(null);

  useGSAP(() => {
    if (cursorType === 'project') {
      gsap.to(cursorRef.current, { 
        width: 100, 
        height: 100, 
        backgroundColor: '#ccff00', // Accent color
        duration: 0.3 
      });
    } else {
      gsap.to(cursorRef.current, { 
        width: 24, 
        height: 24, 
        backgroundColor: 'rgba(255,255,255,0.8)', 
        duration: 0.3 
      });
    }
  }, [cursorType]);

  // ... resto della logica del cursore
}