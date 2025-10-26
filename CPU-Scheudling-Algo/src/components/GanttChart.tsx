import { useEffect, useState } from 'react';
import { ExecutedProcess } from '@/types/scheduler';
import { Card } from '@/components/ui/card';

interface GanttChartProps {
  timeline: ExecutedProcess[];
  totalTime: number;
  isAnimating?: boolean;
}

export const GanttChart = ({ timeline, totalTime, isAnimating = false }: GanttChartProps) => {
  const [visibleProcesses, setVisibleProcesses] = useState<ExecutedProcess[]>([]);

  useEffect(() => {
    if (isAnimating) {
      setVisibleProcesses([]);
      timeline.forEach((process, index) => {
        setTimeout(() => {
          setVisibleProcesses(prev => [...prev, process]);
        }, index * 200);
      });
    } else {
      setVisibleProcesses(timeline);
    }
  }, [timeline, isAnimating]);

  if (timeline.length === 0) {
    return (
      <div className="glass-panel rounded-xl p-8 text-center">
        <div className="text-muted-foreground">
          Add processes and run simulation to see the timeline
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl p-8 animate-scale-in">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-1.5 h-10 bg-gradient-to-b from-primary via-secondary to-accent rounded-full" />
        <h2 className="font-display text-3xl font-bold text-foreground">Real-Time Gantt Chart</h2>
      </div>

      <div className="relative">
        {/* Timeline Container */}
        <div className="relative h-40 bg-gradient-to-br from-muted/30 to-muted/10 rounded-2xl overflow-hidden border-2 border-border/50 shadow-inner">
          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-cols-10 opacity-20">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="border-r border-border" />
            ))}
          </div>
          
          {visibleProcesses.map((process, index) => {
            const left = (process.startTime / totalTime) * 100;
            const width = ((process.endTime - process.startTime) / totalTime) * 100;
            
            return (
              <div
                key={`${process.processId}-${index}`}
                className="absolute top-0 h-full group cursor-pointer animate-slide-in-right hover:z-10"
                style={{
                  left: `${left}%`,
                  width: `${width}%`,
                  animationDelay: isAnimating ? `${index * 0.2}s` : '0s',
                }}
              >
                <div
                  className="h-full border-2 border-white/30 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform"
                  style={{ 
                    backgroundColor: process.color,
                    boxShadow: `0 0 20px ${process.color}50, inset 0 0 20px ${process.color}30`
                  }}
                >
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  {/* Glow Effect */}
                  <div 
                    className="absolute inset-0 animate-pulse-glow pointer-events-none"
                    style={{ 
                      boxShadow: `inset 0 0 30px ${process.color}, 0 0 15px ${process.color}` 
                    }}
                  />
                  
                  {/* Process Name */}
                  <span className="relative z-10 font-black text-white text-base drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] tracking-wide">
                    {process.name}
                  </span>

                  {/* Hover Tooltip */}
                  <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none scale-90 group-hover:scale-100">
                    <Card className="glass-card p-4 text-xs whitespace-nowrap shadow-2xl border-primary/30">
                      <div className="font-black text-base mb-2 text-primary">{process.name}</div>
                      <div className="space-y-1 text-muted-foreground">
                        <div className="flex justify-between gap-4">
                          <span className="font-semibold">Start:</span>
                          <span className="text-foreground">{process.startTime}ms</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="font-semibold">End:</span>
                          <span className="text-foreground">{process.endTime}ms</span>
                        </div>
                        <div className="flex justify-between gap-4 pt-1 border-t border-border">
                          <span className="font-semibold">Duration:</span>
                          <span className="text-primary font-bold">{process.endTime - process.startTime}ms</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Time Markers */}
        <div className="flex justify-between mt-4 px-2">
          {[0, Math.floor(totalTime / 4), Math.floor(totalTime / 2), Math.floor(3 * totalTime / 4), totalTime].map((time) => (
            <div key={time} className="text-center">
              <div className="w-0.5 h-3 bg-primary/50 mx-auto mb-1" />
              <span className="text-xs text-muted-foreground font-mono font-bold">
                {time}ms
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap gap-4">
        {Array.from(new Map(timeline.map(p => [p.processId, p])).values()).map((process, index) => (
          <div 
            key={process.processId} 
            className="flex items-center gap-3 glass-card px-4 py-2 rounded-full hover-lift animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div 
              className="w-5 h-5 rounded-full border-2 border-white/40 shadow-lg"
              style={{ 
                backgroundColor: process.color,
                boxShadow: `0 0 10px ${process.color}50`
              }}
            />
            <span className="text-sm font-semibold">{process.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
