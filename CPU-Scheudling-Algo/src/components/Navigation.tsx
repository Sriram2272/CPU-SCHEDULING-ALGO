import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';

export const Navigation = () => {
  const [isDark, setIsDark] = useState(true);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-background rounded" />
            </div>
            <span className="font-display text-xl font-bold">
              CPU<span className="text-primary">Scheduler</span>
            </span>
          </div>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#algorithms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Algorithms
            </a>
            <a href="#simulator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Simulator
            </a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              className="rounded-full"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button
              variant="outline"
              className="hidden md:flex border-white/10 bg-white/5 hover:bg-white/10 text-foreground rounded-full px-6"
            >
              Open Source
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
