
import React from 'react';
import { cn } from "@/lib/utils";
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  className,
  hideHeader = false,
  hideFooter = false
}) => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      {!hideHeader && <Header />}
      
      <main className={cn(
        "flex-grow w-full animate-fade-in",
        className
      )}>
        {children}
      </main>
      
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
