import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { ScheduleResult, AlgorithmType } from '@/types/scheduler';
import { Clock, Zap, TrendingUp, Trophy } from 'lucide-react';

interface MetricsPanelProps {
  result: ScheduleResult | null;
  algorithm: AlgorithmType;
}

const CountUpAnimation = ({ value, duration = 1000 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <>{count.toFixed(2)}</>;
};

export const MetricsPanel = ({ result, algorithm }: MetricsPanelProps) => {
  const [showAI, setShowAI] = useState(false);

  useEffect(() => {
    if (result) {
      setTimeout(() => setShowAI(true), 1500);
    } else {
      setShowAI(false);
    }
  }, [result]);

  if (!result) {
    return (
      <div className="glass-panel rounded-xl p-6 text-center">
        <div className="text-muted-foreground">
          Run a simulation to see metrics and insights
        </div>
      </div>
    );
  }

  const getAIInsight = () => {
    const insights = {
      FCFS: "Simple and fair! FCFS works great when processes arrive in optimal order.",
      SJF: `Excellent choice! SJF minimized waiting time to ${result.avgWaitingTime.toFixed(2)}ms. Perfect for batch processing!`,
      RR: "Round Robin ensures fairness! All processes get equal CPU time slices.",
      Priority: "Priority scheduling handled urgent tasks first. Great for real-time systems!"
    };
    return insights[algorithm];
  };

  return (
    <div className="glass-panel rounded-2xl p-8 space-y-6 animate-slide-in-right">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-1.5 h-10 bg-gradient-to-b from-accent via-secondary to-primary rounded-full" />
        <h2 className="font-display text-3xl font-bold text-foreground">Performance Metrics</h2>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-5">
        <Card className="glass-card hover-lift p-6 border-primary/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:scale-110 transition-transform">
              <Clock className="w-7 h-7 text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-semibold mb-1">Avg Wait Time</div>
              <div className="text-2xl font-black text-foreground">
                <CountUpAnimation value={result.avgWaitingTime} />
                <span className="text-sm font-normal text-muted-foreground ml-1">ms</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="glass-card hover-lift p-6 border-secondary/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10 group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7 text-secondary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-semibold mb-1">Avg Turnaround</div>
              <div className="text-2xl font-black text-foreground">
                <CountUpAnimation value={result.avgTurnaroundTime} />
                <span className="text-sm font-normal text-muted-foreground ml-1">ms</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="glass-card hover-lift p-6 border-accent/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-7 h-7 text-accent" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-semibold mb-1">Total Time</div>
              <div className="text-2xl font-black text-foreground">
                {result.totalTime}
                <span className="text-sm font-normal text-muted-foreground ml-1">ms</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="glass-card hover-lift p-6 border-primary/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:scale-110 transition-transform">
              <Trophy className="w-7 h-7 text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-semibold mb-1">Processes</div>
              <div className="text-2xl font-black text-foreground">
                {result.processMetrics.length}
                <span className="text-sm font-normal text-muted-foreground ml-1">total</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Process Details */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-foreground/80 mb-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-secondary animate-glow-pulse" />
          Process Details
        </h3>
        {result.processMetrics.map((metric, index) => (
          <Card 
            key={metric.processId}
            className="glass-card p-5 hover-lift group relative overflow-hidden animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-center relative z-10">
              <span className="font-bold text-base flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                {metric.name}
              </span>
              <div className="flex gap-6 text-sm">
                <span className="text-muted-foreground">
                  <span className="font-semibold">Wait:</span> <span className="text-foreground">{metric.waitingTime}ms</span>
                </span>
                <span className="text-muted-foreground">
                  <span className="font-semibold">TAT:</span> <span className="text-foreground">{metric.turnaroundTime}ms</span>
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* AI Insights */}
      {showAI && (
        <Card className="glass-card p-6 border-l-4 border-accent relative overflow-hidden group animate-scale-in">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent" />
          <div className="flex gap-4 relative z-10">
            <div className="p-3 h-fit rounded-2xl bg-gradient-to-br from-accent/30 to-accent/10 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1">
              <div className="text-base font-bold text-accent mb-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                AI Insight
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {getAIInsight()}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
