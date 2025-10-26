import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Upload, Play } from 'lucide-react';

interface HeroProps {
  onRunSimulation: () => void;
  onExploreAlgorithms: () => void;
}

export const Hero = ({ onRunSimulation, onExploreAlgorithms }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-20">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--primary) / 0.15) 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }} />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-[15%] w-16 h-16 border-2 border-primary/20 rounded-lg animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-48 right-[20%] w-12 h-12 border-2 border-secondary/20 rounded-lg animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 right-[25%] w-20 h-20 border-2 border-accent/20 rounded-lg animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-32 left-[20%] w-14 h-14 border-2 border-primary/20 rounded-lg animate-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-tight tracking-tight animate-fade-in">
          <span className="text-foreground">Visualize in the</span>
          <br />
          <span className="inline-block">
            <span className="text-gradient-multi">Scheduler</span>
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Interactive CPU scheduling algorithms with real-time visualization.
          <br />
          Educational, powerful, and beautifully animated.
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Badge variant="outline" className="px-4 py-2 text-sm border-primary/40 text-primary bg-primary/5 hover:bg-primary/10 transition-colors rounded-full">
            Real-time
          </Badge>
          <Badge variant="outline" className="px-4 py-2 text-sm border-secondary/40 text-secondary bg-secondary/5 hover:bg-secondary/10 transition-colors rounded-full">
            Interactive
          </Badge>
          <Badge variant="outline" className="px-4 py-2 text-sm border-accent/40 text-accent bg-accent/5 hover:bg-accent/10 transition-colors rounded-full">
            Educational
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button 
            size="lg"
            onClick={onRunSimulation}
            className="group relative bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-primary/50"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Start Simulation
          </Button>

          <Button 
            size="lg"
            variant="outline"
            onClick={onExploreAlgorithms}
            className="group relative border-2 border-white/10 bg-white/5 hover:bg-white/10 text-foreground hover:scale-105 px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300"
          >
            <Upload className="w-5 h-5 mr-2" />
            Explore Algorithms
          </Button>

          <Button 
            size="lg"
            variant="ghost"
            className="group relative text-foreground hover:bg-white/5 hover:scale-105 px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300"
          >
            <Play className="w-5 h-5 mr-2" />
            View Demo
          </Button>
        </div>
      </div>
    </section>
  );
};
