import { useState, useRef } from 'react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { ProcessControlPanel } from '@/components/ProcessControlPanel';
import { GanttChart } from '@/components/GanttChart';
import { MetricsPanel } from '@/components/MetricsPanel';
import { AlgorithmCards } from '@/components/AlgorithmCards';
import { Button } from '@/components/ui/button';
import { Process, ScheduleResult, AlgorithmType } from '@/types/scheduler';
import { fcfsSchedule, sjfSchedule, roundRobinSchedule, prioritySchedule } from '@/lib/schedulers';
import { Play, RotateCcw, Download } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [result, setResult] = useState<ScheduleResult | null>(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType>('FCFS');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);
  const simulatorRef = useRef<HTMLDivElement>(null);
  const algorithmRef = useRef<HTMLDivElement>(null);

  const handleAddProcess = (process: Omit<Process, 'id'>) => {
    const newProcess: Process = {
      ...process,
      id: `P${Date.now()}`,
    };
    setProcesses([...processes, newProcess]);
    toast.success(`Added ${process.name}`, {
      description: 'Process added to the queue',
    });
  };

  const handleRemoveProcess = (id: string) => {
    setProcesses(processes.filter(p => p.id !== id));
    toast.info('Process removed');
  };

  const handleUpdateProcess = (id: string, updates: Partial<Process>) => {
    setProcesses(processes.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const handleRunSimulation = () => {
    if (processes.length === 0) {
      toast.error('Add processes first!', {
        description: 'You need at least one process to run the simulation',
      });
      return;
    }

    setIsAnimating(true);
    
    let scheduleResult: ScheduleResult;
    
    switch (selectedAlgorithm) {
      case 'FCFS':
        scheduleResult = fcfsSchedule(processes);
        break;
      case 'SJF':
        scheduleResult = sjfSchedule(processes);
        break;
      case 'RR':
        scheduleResult = roundRobinSchedule(processes, 2);
        break;
      case 'Priority':
        scheduleResult = prioritySchedule(processes);
        break;
      default:
        scheduleResult = fcfsSchedule(processes);
    }

    setResult(scheduleResult);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, scheduleResult.timeline.length * 200 + 500);

    toast.success('Simulation complete!', {
      description: `${selectedAlgorithm} algorithm executed successfully`,
    });
  };

  const handleReset = () => {
    setProcesses([]);
    setResult(null);
    toast.info('Reset complete');
  };

  const handleExport = () => {
    if (!result) return;
    
    const data = {
      algorithm: selectedAlgorithm,
      processes,
      result,
      timestamp: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cpu-schedule-${selectedAlgorithm}-${Date.now()}.json`;
    a.click();
    
    toast.success('Exported successfully!');
  };

  const scrollToSimulator = () => {
    setShowSimulator(true);
    setTimeout(() => {
      simulatorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const scrollToAlgorithms = () => {
    algorithmRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <Hero
        onRunSimulation={scrollToSimulator}
        onExploreAlgorithms={scrollToAlgorithms}
      />

      {/* Algorithm Cards Section */}
      <section ref={algorithmRef} className="container mx-auto px-6 py-20">
        <AlgorithmCards 
          selectedAlgorithm={selectedAlgorithm}
          onSelectAlgorithm={setSelectedAlgorithm}
        />
      </section>

      {/* Simulator Section */}
      {showSimulator && (
        <section ref={simulatorRef} className="container mx-auto px-6 py-24">
          {/* Control Bar */}
          <div className="glass-panel rounded-3xl p-8 mb-10 flex flex-wrap gap-6 justify-between items-center shadow-2xl border-primary/10 animate-fade-in">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground font-semibold">Algorithm:</span>
                <span className="font-display text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{selectedAlgorithm}</span>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground font-semibold">Processes:</span>
                <span className="text-2xl font-black text-foreground">{processes.length}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={handleRunSimulation}
                disabled={isAnimating || processes.length === 0}
                className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 transition-all shadow-lg shadow-primary/30"
                size="lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Run Simulation
              </Button>
              <Button 
                onClick={handleReset}
                variant="outline"
                size="lg"
                className="border-2 hover:border-destructive/50 hover:bg-destructive/10 hover:text-destructive hover:scale-105 transition-all"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset
              </Button>
              {result && (
                <Button 
                  onClick={handleExport}
                  variant="outline"
                  size="lg"
                  className="border-2 hover:border-accent/50 hover:bg-accent/10 hover:text-accent hover:scale-105 transition-all"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Export
                </Button>
              )}
            </div>
          </div>

          {/* Three Panel Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Panel - Process Control */}
            <div className="lg:col-span-3">
              <ProcessControlPanel
                processes={processes}
                onAddProcess={handleAddProcess}
                onRemoveProcess={handleRemoveProcess}
                onUpdateProcess={handleUpdateProcess}
              />
            </div>

            {/* Center Panel - Gantt Chart */}
            <div className="lg:col-span-6">
              <GanttChart 
                timeline={result?.timeline || []}
                totalTime={result?.totalTime || 0}
                isAnimating={isAnimating}
              />
            </div>

            {/* Right Panel - Metrics */}
            <div className="lg:col-span-3">
              <MetricsPanel 
                result={result}
                algorithm={selectedAlgorithm}
              />
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t-2 border-primary/10 mt-40 py-16">
        <div className="container mx-auto px-6 text-center">
          <p className="font-display text-lg font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-3">
            Intelligent CPU Scheduler Simulator
          </p>
          <p className="text-sm text-muted-foreground">Experience next-gen algorithm visualization</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
