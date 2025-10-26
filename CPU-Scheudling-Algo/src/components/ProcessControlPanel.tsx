import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { Process } from '@/types/scheduler';
import { z } from 'zod';
import { toast } from 'sonner';

interface ProcessControlPanelProps {
  processes: Process[];
  onAddProcess: (process: Omit<Process, 'id'>) => void;
  onRemoveProcess: (id: string) => void;
  onUpdateProcess: (id: string, process: Partial<Process>) => void;
}

const NEON_COLORS = [
  'hsl(200, 100%, 50%)', // Cyber Blue
  'hsl(180, 100%, 50%)', // Neon Cyan
  'hsl(270, 100%, 60%)', // Electric Purple
  'hsl(320, 100%, 50%)', // Magenta
  'hsl(150, 100%, 50%)', // Neon Green
  'hsl(40, 100%, 50%)',  // Electric Yellow
];

const processSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
  arrivalTime: z.number().min(0, "Arrival time must be 0 or greater").max(1000, "Arrival time too large"),
  burstTime: z.number().min(1, "Burst time must be at least 1").max(1000, "Burst time too large"),
  priority: z.number().min(1, "Priority must be at least 1").max(100, "Priority must be less than 100"),
});

interface ProcessInput {
  name: string;
  arrivalTime: string;
  burstTime: string;
  priority: string;
}

export const ProcessControlPanel = ({ processes, onAddProcess, onRemoveProcess, onUpdateProcess }: ProcessControlPanelProps) => {
  const [step, setStep] = useState<'count' | 'input'>('count');
  const [processCount, setProcessCount] = useState('');
  const [currentProcessIndex, setCurrentProcessIndex] = useState(0);
  const [processInputs, setProcessInputs] = useState<ProcessInput[]>([]);

  const handleSetProcessCount = () => {
    const count = parseInt(processCount);
    
    if (!count || count < 1) {
      toast.error('Please enter a valid number', {
        description: 'Process count must be at least 1'
      });
      return;
    }

    if (count > 20) {
      toast.error('Too many processes', {
        description: 'Maximum 20 processes allowed'
      });
      return;
    }

    setProcessInputs(Array(count).fill(null).map(() => ({
      name: '',
      arrivalTime: '0',
      burstTime: '5',
      priority: '1'
    })));
    setCurrentProcessIndex(0);
    setStep('input');
  };

  const handleUpdateCurrentProcess = (field: keyof ProcessInput, value: string) => {
    const newInputs = [...processInputs];
    newInputs[currentProcessIndex] = {
      ...newInputs[currentProcessIndex],
      [field]: value
    };
    setProcessInputs(newInputs);
  };

  const handleAddCurrentProcess = () => {
    const input = processInputs[currentProcessIndex];
    
    try {
      const validated = processSchema.parse({
        name: input.name,
        arrivalTime: parseInt(input.arrivalTime),
        burstTime: parseInt(input.burstTime),
        priority: parseInt(input.priority),
      });

      onAddProcess({
        name: validated.name,
        arrivalTime: validated.arrivalTime,
        burstTime: validated.burstTime,
        priority: validated.priority,
        color: NEON_COLORS[(processes.length + currentProcessIndex) % NEON_COLORS.length],
      });

      if (currentProcessIndex < processInputs.length - 1) {
        setCurrentProcessIndex(currentProcessIndex + 1);
        toast.success(`Process ${currentProcessIndex + 1} added!`, {
          description: `${processInputs.length - currentProcessIndex - 1} more to go`
        });
      } else {
        toast.success('All processes added!', {
          description: `${processInputs.length} processes ready for simulation`
        });
        resetToStart();
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error('Invalid input', {
          description: error.errors[0].message
        });
      }
    }
  };

  const handlePrevious = () => {
    if (currentProcessIndex > 0) {
      setCurrentProcessIndex(currentProcessIndex - 1);
    }
  };

  const resetToStart = () => {
    setStep('count');
    setProcessCount('');
    setProcessInputs([]);
    setCurrentProcessIndex(0);
  };

  const currentInput = processInputs[currentProcessIndex];

  return (
    <div className="glass-panel rounded-2xl p-8 h-full animate-slide-in-left">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-1.5 h-10 bg-gradient-to-b from-primary via-secondary to-accent rounded-full" />
        <h2 className="font-display text-3xl font-bold text-foreground">Process Control</h2>
      </div>

      {/* Step 1: Process Count */}
      {step === 'count' && (
        <Card className="glass-card p-6 mb-8 border-primary/20 hover-lift">
          <div className="space-y-5">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">How many processes?</h3>
              <p className="text-sm text-muted-foreground">Enter the number of processes you want to add</p>
            </div>
            
            <div>
              <Label htmlFor="processCount" className="text-sm font-semibold text-foreground mb-3 block">
                Number of Processes
              </Label>
              <Input
                id="processCount"
                type="number"
                value={processCount}
                onChange={(e) => setProcessCount(e.target.value)}
                placeholder="Enter number (1-20)"
                className="bg-input/80 border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-center text-2xl font-bold"
                min="1"
                max="20"
                autoFocus
              />
            </div>

            <Button 
              onClick={handleSetProcessCount}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all shadow-lg shadow-primary/30"
              size="lg"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              Continue
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Process Input */}
      {step === 'input' && currentInput && (
        <Card className="relative glass-card p-8 mb-8 border border-primary/30 hover-lift overflow-hidden">
          {/* Shining background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">
                  Process {currentProcessIndex + 1} of {processInputs.length}
                </h3>
                <p className="text-sm text-muted-foreground">Fill in the details below</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetToStart}
                className="text-muted-foreground hover:text-foreground hover:bg-muted/50"
              >
                Reset
              </Button>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-border/30 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 h-full rounded-full transition-all duration-500 shadow-lg shadow-primary/50"
                style={{ width: `${((currentProcessIndex + 1) / processInputs.length) * 100}%` }}
              />
            </div>
            
            {/* Process Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold text-foreground">
                Process Name
              </Label>
              <Input
                id="name"
                value={currentInput.name}
                onChange={(e) => handleUpdateCurrentProcess('name', e.target.value)}
                placeholder={`P${currentProcessIndex + 1}`}
                className="h-12 bg-background/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all text-lg font-medium"
                autoFocus
              />
            </div>

            {/* Time and Priority Inputs */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="arrival" className="text-xs font-semibold text-foreground/80">
                  Arrival Time
                </Label>
                <Input
                  id="arrival"
                  type="number"
                  value={currentInput.arrivalTime}
                  onChange={(e) => handleUpdateCurrentProcess('arrivalTime', e.target.value)}
                  className="h-11 bg-background/50 border-border/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all text-center font-mono text-lg"
                  min="0"
                  max="1000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="burst" className="text-xs font-semibold text-foreground/80">
                  Burst Time
                </Label>
                <Input
                  id="burst"
                  type="number"
                  value={currentInput.burstTime}
                  onChange={(e) => handleUpdateCurrentProcess('burstTime', e.target.value)}
                  className="h-11 bg-background/50 border-border/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all text-center font-mono text-lg"
                  min="1"
                  max="1000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority" className="text-xs font-semibold text-foreground/80">
                  Priority
                </Label>
                <Input
                  id="priority"
                  type="number"
                  value={currentInput.priority}
                  onChange={(e) => handleUpdateCurrentProcess('priority', e.target.value)}
                  className="h-11 bg-background/50 border-border/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all text-center font-mono text-lg"
                  min="1"
                  max="100"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-2">
              {currentProcessIndex > 0 && (
                <Button 
                  onClick={handlePrevious}
                  variant="outline"
                  className="flex-1 h-12 border-2 border-border/50 hover:border-foreground/30 hover:bg-muted/50 transition-all"
                  size="lg"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Previous
                </Button>
              )}
              <Button 
                onClick={handleAddCurrentProcess}
                className={`h-12 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white font-semibold hover:shadow-xl hover:shadow-primary/50 hover:scale-[1.02] transition-all ${currentProcessIndex === 0 ? 'flex-1' : 'flex-1'}`}
                size="lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                {currentProcessIndex < processInputs.length - 1 ? 'Add & Next' : 'Add & Finish'}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Process List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-foreground/80 mb-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
          Active Processes ({processes.length})
        </h3>
        {processes.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Plus className="w-8 h-8 text-primary/50" />
            </div>
            <p className="text-sm font-medium">No processes yet</p>
            <p className="text-xs mt-1">Add one to get started!</p>
          </div>
        ) : (
          processes.map((process, index) => (
            <Card 
              key={process.id}
              className="glass-card p-5 border-l-4 hover-lift group relative overflow-hidden animate-fade-in"
              style={{ 
                borderLeftColor: process.color,
                animationDelay: `${index * 0.05}s`
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" 
                style={{ 
                  background: `linear-gradient(90deg, ${process.color}10, transparent)` 
                }}
              />
              <div className="flex items-center justify-between relative z-10">
                <div className="flex-1">
                  <div className="font-bold text-lg flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: process.color }} />
                    {process.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-3 flex gap-6">
                    <span className="flex items-center gap-1">
                      <span className="font-semibold">Arrival:</span> {process.arrivalTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="font-semibold">Burst:</span> {process.burstTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="font-semibold">Priority:</span> {process.priority}
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onRemoveProcess(process.id)}
                  className="hover:bg-destructive/20 hover:text-destructive hover:scale-110 transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
