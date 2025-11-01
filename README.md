# CPU Scheduling Algorithm Visualization

## Introduction
This project is an implementation of various CPU scheduling algorithms using React and TypeScript. It provides a visual representation of how different scheduling algorithms work, making it easier to understand their behavior and compare their performance metrics.

## Tech Stack
- **Frontend Framework:** React with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI
- **Charts:** Recharts for Gantt chart visualization
- **State Management:** React Query

## Project Overview

This project implements and visualizes the following key features:
1. Real-time visualization of CPU scheduling algorithms
2. Interactive process management (add, edit, remove processes)
3. Gantt chart visualization of process execution
4. Performance metrics calculation (waiting time, turnaround time)
5. Step-by-step execution mode for better understanding

## Project Structure
```
src/
├── components/          # React components
│   ├── ProcessControlPanel.tsx  # Process input and controls
│   ├── GanttChart.tsx          # Timeline visualization
│   └── MetricsPanel.tsx        # Performance metrics display
├── lib/
│   └── schedulers.ts   # Core scheduling algorithms
└── types/
    └── scheduler.ts    # TypeScript definitions
```

## Implemented Algorithms

The project implements the following CPU scheduling algorithms:

### 1. First Come First Served (FCFS)
- Non-preemptive scheduling algorithm
- Processes are executed in the order they arrive
- Simple to implement but may lead to convoy effect
- Best for batch systems where execution time is not critical

### 2. Shortest Job First (SJF)
- Non-preemptive scheduling algorithm
- Selects process with shortest burst time
- Optimal for minimizing average waiting time
- Requires prediction of burst time

### 3. Shortest Remaining Time First (SRTF)
- Preemptive version of SJF
- Switches to shorter process when it arrives
- Minimizes average waiting time
- Higher overhead due to context switching

### 4. Priority Scheduling
- Supports both preemptive and non-preemptive modes
- Assigns priority to each process
- Higher priority processes are executed first
- May lead to starvation of lower priority processes

### 5. Round Robin
- Time-sharing scheduling algorithm
- Uses fixed time quantum
- Fair allocation of CPU
- Good for interactive systems

## How to Use

### Running the Simulation
1. Start by adding processes using the control panel
2. For each process, specify:
   - Process ID (automatically assigned)
   - Arrival Time (when process enters the system)
   - Burst Time (CPU time required)
   - Priority (for priority scheduling)
3. Select a scheduling algorithm
4. Use the control buttons:
   - Run: Execute complete simulation
   - Step: Execute one step at a time
   - Reset: Clear all processes and start over

### Understanding the Output
- **Gantt Chart:** Visual representation of process execution
- **Metrics Panel:** Displays:
  - Average Waiting Time
  - Average Turnaround Time
  - CPU Utilization
  - Individual process statistics

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm/pnpm (package manager)
- Web browser (Chrome/Firefox/Safari)

### Installation Steps
1. Clone the repository:
```bash
git clone https://github.com/Sriram2272/CPU-SCHEDULING-ALGO.git
cd CPU-SCHEDULING-ALGO
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

### Build for Production
```bash
npm run build
npm run preview
```

## Troubleshooting

Common issues and solutions:

1. **Port Already in Use**
   - Error: EADDRINUSE
   - Solution: Kill the process using the port or use a different port
   ```bash
   npm run dev -- --port 3000
   ```

2. **TypeScript Errors**
   - Run `npm run build` for detailed error messages
   - Check type definitions in `src/types/scheduler.ts`

3. **Dependencies Issues**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: 
     ```bash
     rm -rf node_modules
     npm install
     ```

## Performance Metrics

The simulation calculates and displays the following metrics:

### 1. Waiting Time
- Time a process spends waiting in the ready queue
- Average Waiting Time = Σ(Waiting Time) / Number of Processes

### 2. Turnaround Time
- Total time from submission to completion
- Turnaround Time = Completion Time - Arrival Time

### 3. Response Time
- Time from submission until first CPU burst
- Important for interactive systems

## Sample Process Sets

### Basic Example
```
Process Set 1:
P1: Arrival Time = 0, Burst Time = 4
P2: Arrival Time = 1, Burst Time = 3
P3: Arrival Time = 2, Burst Time = 1
```

### Priority Example
```
Process Set 2:
P1: Arrival Time = 0, Burst Time = 4, Priority = 2
P2: Arrival Time = 0, Burst Time = 3, Priority = 1
P3: Arrival Time = 2, Burst Time = 1, Priority = 3
```

## Future Enhancements
1. Additional scheduling algorithms
   - Multilevel Queue
   - Multilevel Feedback Queue
2. Advanced visualization features
   - Process state diagrams
   - CPU utilization graphs
3. Export/Import process sets
4. Comparison charts for different algorithms

## Contributors
- Sriram (@Sriram2272)

## License
This project is licensed under the MIT License - see the LICENSE file for details.

---
