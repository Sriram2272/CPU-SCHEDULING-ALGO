import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlgorithmType } from '@/types/scheduler';
import { Clock, Zap, Users, Trophy } from 'lucide-react';

interface AlgorithmCardsProps {
  selectedAlgorithm: AlgorithmType;
  onSelectAlgorithm: (algorithm: AlgorithmType) => void;
}

const algorithms = [
  {
    type: 'FCFS' as AlgorithmType,
    name: 'First Come First Serve',
    icon: Clock,
    color: 'hsl(200, 100%, 50%)',
    description: 'Simple queue-based scheduling',
    pros: ['Easy to implement', 'Fair ordering'],
    cons: ['Convoy effect', 'Long wait times'],
  },
  {
    type: 'SJF' as AlgorithmType,
    name: 'Shortest Job First',
    icon: Zap,
    color: 'hsl(180, 100%, 50%)',
    description: 'Executes shortest processes first',
    pros: ['Minimum avg wait', 'Optimal efficiency'],
    cons: ['Starvation risk', 'Needs burst time'],
  },
  {
    type: 'RR' as AlgorithmType,
    name: 'Round Robin',
    icon: Users,
    color: 'hsl(270, 100%, 60%)',
    description: 'Time-slice based fair scheduling',
    pros: ['Fair to all', 'No starvation'],
    cons: ['Context switching', 'Quantum sensitive'],
  },
  {
    type: 'Priority' as AlgorithmType,
    name: 'Priority Scheduling',
    icon: Trophy,
    color: 'hsl(320, 100%, 50%)',
    description: 'Executes high priority first',
    pros: ['Urgent tasks first', 'Flexible control'],
    cons: ['Starvation risk', 'Priority inversion'],
  },
];

export const AlgorithmCards = ({ selectedAlgorithm, onSelectAlgorithm }: AlgorithmCardsProps) => {
  return (
    <div className="py-24">
      <div className="text-center mb-16 animate-fade-in">
        <h2 className="font-display text-5xl md:text-7xl font-black mb-6 tracking-tight">
          <span className="gradient-text">Choose Your</span> Algorithm
        </h2>
        <p className="text-muted-foreground text-xl md:text-2xl font-light">Select your scheduling strategy and watch it come alive</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {algorithms.map((algo, index) => {
          const Icon = algo.icon;
          const isSelected = selectedAlgorithm === algo.type;
          
          return (
            <Card
              key={algo.type}
              className={`card-shimmer glass-card hover-lift p-8 cursor-pointer group relative overflow-hidden ${
                isSelected ? 'border-2 ring-2 ring-primary/50' : 'border'
              }`}
              onClick={() => onSelectAlgorithm(algo.type)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="p-4 rounded-2xl relative overflow-hidden group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${algo.color}15` }}
                  >
                    <Icon className="w-8 h-8 relative z-10" style={{ color: algo.color }} />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  </div>
                  {isSelected && (
                    <div className="ml-auto">
                      <div className="w-3 h-3 rounded-full bg-primary animate-glow-pulse" />
                    </div>
                  )}
                </div>

                <h3 className="font-display text-xl font-bold mb-3 group-hover:text-primary transition-colors">{algo.name}</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{algo.description}</p>

                <div className="space-y-4 text-xs mb-6">
                  <div>
                    <div className="font-bold text-emerald-400 mb-2 flex items-center gap-2">
                      <div className="w-1 h-4 bg-emerald-400 rounded-full" />
                      Advantages
                    </div>
                    <ul className="text-muted-foreground space-y-1.5 pl-3">
                      {algo.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-400 mt-0.5">•</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="font-bold text-rose-400 mb-2 flex items-center gap-2">
                      <div className="w-1 h-4 bg-rose-400 rounded-full" />
                      Limitations
                    </div>
                    <ul className="text-muted-foreground space-y-1.5 pl-3">
                      {algo.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-rose-400 mt-0.5">•</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button
                  className={`w-full group-hover:scale-105 transition-all ${
                    isSelected 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/30' 
                      : 'bg-primary/10 hover:bg-primary/20 text-foreground border border-primary/30'
                  }`}
                  size="lg"
                >
                  {isSelected ? (
                    <>
                      <div className="w-2 h-2 rounded-full bg-primary-foreground mr-2 animate-pulse" />
                      Selected
                    </>
                  ) : 'Select'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
