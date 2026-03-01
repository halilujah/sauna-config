import type { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface AppLayoutProps {
  viewer: ReactNode;
}

export function AppLayout({ viewer }: AppLayoutProps) {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        {/* 3D Viewport */}
        <div className="flex-1 relative bg-surface-dark min-w-0">
          {viewer}
        </div>
        {/* Sidebar */}
        <div className="w-[400px] shrink-0 max-lg:w-[340px] max-md:w-full max-md:h-[50%] max-md:border-t max-md:border-border">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
