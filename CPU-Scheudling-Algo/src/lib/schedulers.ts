import { Process, ExecutedProcess, ScheduleResult } from '@/types/scheduler';

// First Come First Serve
export function fcfsSchedule(processes: Process[]): ScheduleResult {
  const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  const timeline: ExecutedProcess[] = [];
  let currentTime = 0;
  const processMetrics: ScheduleResult['processMetrics'] = [];

  sorted.forEach(process => {
    const startTime = Math.max(currentTime, process.arrivalTime);
    const endTime = startTime + process.burstTime;
    
    timeline.push({
      processId: process.id,
      name: process.name,
      startTime,
      endTime,
      color: process.color,
    });

    const turnaroundTime = endTime - process.arrivalTime;
    const waitingTime = turnaroundTime - process.burstTime;
    
    processMetrics.push({
      processId: process.id,
      name: process.name,
      waitingTime,
      turnaroundTime,
    });

    currentTime = endTime;
  });

  const avgWaitingTime = processMetrics.reduce((sum, p) => sum + p.waitingTime, 0) / processes.length;
  const avgTurnaroundTime = processMetrics.reduce((sum, p) => sum + p.turnaroundTime, 0) / processes.length;

  return {
    timeline,
    avgWaitingTime,
    avgTurnaroundTime,
    totalTime: currentTime,
    processMetrics,
  };
}

// Shortest Job First
export function sjfSchedule(processes: Process[]): ScheduleResult {
  const timeline: ExecutedProcess[] = [];
  const remaining = [...processes];
  let currentTime = 0;
  const processMetrics: ScheduleResult['processMetrics'] = [];

  while (remaining.length > 0) {
    const available = remaining.filter(p => p.arrivalTime <= currentTime);
    
    if (available.length === 0) {
      currentTime = Math.min(...remaining.map(p => p.arrivalTime));
      continue;
    }

    available.sort((a, b) => a.burstTime - b.burstTime);
    const process = available[0];
    
    const startTime = currentTime;
    const endTime = startTime + process.burstTime;
    
    timeline.push({
      processId: process.id,
      name: process.name,
      startTime,
      endTime,
      color: process.color,
    });

    const turnaroundTime = endTime - process.arrivalTime;
    const waitingTime = turnaroundTime - process.burstTime;
    
    processMetrics.push({
      processId: process.id,
      name: process.name,
      waitingTime,
      turnaroundTime,
    });

    currentTime = endTime;
    remaining.splice(remaining.indexOf(process), 1);
  }

  const avgWaitingTime = processMetrics.reduce((sum, p) => sum + p.waitingTime, 0) / processes.length;
  const avgTurnaroundTime = processMetrics.reduce((sum, p) => sum + p.turnaroundTime, 0) / processes.length;

  return {
    timeline,
    avgWaitingTime,
    avgTurnaroundTime,
    totalTime: currentTime,
    processMetrics,
  };
}

// Round Robin
export function roundRobinSchedule(processes: Process[], quantum: number = 2): ScheduleResult {
  const timeline: ExecutedProcess[] = [];
  const queue: (Process & { remainingTime: number })[] = [];
  const processMetrics: ScheduleResult['processMetrics'] = [];
  let currentTime = 0;
  
  const processesWithRemaining = processes.map(p => ({ ...p, remainingTime: p.burstTime }));
  const sorted = [...processesWithRemaining].sort((a, b) => a.arrivalTime - b.arrivalTime);
  
  let index = 0;
  
  while (queue.length > 0 || index < sorted.length) {
    while (index < sorted.length && sorted[index].arrivalTime <= currentTime) {
      queue.push(sorted[index]);
      index++;
    }
    
    if (queue.length === 0) {
      currentTime = sorted[index].arrivalTime;
      continue;
    }
    
    const process = queue.shift()!;
    const executeTime = Math.min(quantum, process.remainingTime);
    const startTime = currentTime;
    const endTime = startTime + executeTime;
    
    timeline.push({
      processId: process.id,
      name: process.name,
      startTime,
      endTime,
      color: process.color,
    });
    
    process.remainingTime -= executeTime;
    currentTime = endTime;
    
    while (index < sorted.length && sorted[index].arrivalTime <= currentTime) {
      queue.push(sorted[index]);
      index++;
    }
    
    if (process.remainingTime > 0) {
      queue.push(process);
    } else {
      const turnaroundTime = currentTime - process.arrivalTime;
      const waitingTime = turnaroundTime - process.burstTime;
      
      processMetrics.push({
        processId: process.id,
        name: process.name,
        waitingTime,
        turnaroundTime,
      });
    }
  }

  const avgWaitingTime = processMetrics.reduce((sum, p) => sum + p.waitingTime, 0) / processes.length;
  const avgTurnaroundTime = processMetrics.reduce((sum, p) => sum + p.turnaroundTime, 0) / processes.length;

  return {
    timeline,
    avgWaitingTime,
    avgTurnaroundTime,
    totalTime: currentTime,
    processMetrics,
  };
}

// Priority Scheduling
export function prioritySchedule(processes: Process[]): ScheduleResult {
  const timeline: ExecutedProcess[] = [];
  const remaining = [...processes];
  let currentTime = 0;
  const processMetrics: ScheduleResult['processMetrics'] = [];

  while (remaining.length > 0) {
    const available = remaining.filter(p => p.arrivalTime <= currentTime);
    
    if (available.length === 0) {
      currentTime = Math.min(...remaining.map(p => p.arrivalTime));
      continue;
    }

    available.sort((a, b) => a.priority - b.priority);
    const process = available[0];
    
    const startTime = currentTime;
    const endTime = startTime + process.burstTime;
    
    timeline.push({
      processId: process.id,
      name: process.name,
      startTime,
      endTime,
      color: process.color,
    });

    const turnaroundTime = endTime - process.arrivalTime;
    const waitingTime = turnaroundTime - process.burstTime;
    
    processMetrics.push({
      processId: process.id,
      name: process.name,
      waitingTime,
      turnaroundTime,
    });

    currentTime = endTime;
    remaining.splice(remaining.indexOf(process), 1);
  }

  const avgWaitingTime = processMetrics.reduce((sum, p) => sum + p.waitingTime, 0) / processes.length;
  const avgTurnaroundTime = processMetrics.reduce((sum, p) => sum + p.turnaroundTime, 0) / processes.length;

  return {
    timeline,
    avgWaitingTime,
    avgTurnaroundTime,
    totalTime: currentTime,
    processMetrics,
  };
}
