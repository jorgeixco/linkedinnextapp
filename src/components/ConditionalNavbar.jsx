'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';

export function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Ocultar navbar si la ruta empieza con /certificate
  if (pathname.startsWith('/certificate')) {
    return null;
  }
  
  return <Navbar />;
} 