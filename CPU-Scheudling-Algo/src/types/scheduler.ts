export interface Process {
  id: string;
  name: string;
  arrivalTime: number;
  burstTime: number;
  priority: number;
  color: string;
}

export interface ExecutedProcess {
  processId: string;
  name: string;
  startTime: number;
  endTime: number;
  color: string;
}

export interface ScheduleResult {
  timeline: ExecutedProcess[];
  avgWaitingTime: number;
  avgTurnaroundTime: number;
  totalTime: number;
  processMetrics: {
    processId: string;
    name: string;
    waitingTime: number;
    turnaroundTime: number;
  }[];
}

export type AlgorithmType = 'FCFS' | 'SJF' | 'RR' | 'Priority';
