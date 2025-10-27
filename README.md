# CPU-SCHEDULING-ALGO

Welcome to an interactive playground for learning CPU scheduling algorithms. This small web app visualizes how different CPU scheduling strategies make decisions, displays Gantt charts, and measures key metrics (turnaround, waiting, response times) so you can learn by doing.

## Why this project is fun

- Tweak processes (arrival time, burst time, priority) and immediately see how the scheduler behaves.
- Compare algorithms side-by-side (Gantt chart + metrics) to build intuition about trade-offs.
- Great for students, instructors, and anyone who loves systems and visualization.

## What you'll find here

- A clean React + Vite UI (TypeScript) with these main pieces:
	- `src/components/ProcessControlPanel.tsx` — add/edit processes and simulation controls.
	- `src/components/GanttChart.tsx` — interactive timeline visualization.
	- `src/lib/schedulers.ts` — core scheduling logic (FCFS, SJF, SRTF, Priority, Round Robin, etc.).
	- `src/components/MetricsPanel.tsx` — computed stats so you can compare algorithms.

## Algorithms (supported / typical)

The app implements the common CPU scheduling strategies you likely expect:

- First-Come, First-Served (FCFS)
- Shortest Job First (SJF) — non-preemptive
- Shortest Remaining Time First (SRTF) — preemptive SJF
- Priority Scheduling (preemptive and/or non-preemptive depending on options)
- Round Robin (with configurable time quantum)

Note: Exact names and options live in `src/lib/schedulers.ts` if you want to add/modify behavior.

## Interactive walkthrough

1. Open the app in your browser (see "Try it" below).
2. Add processes in the control panel. For each process set:
	 - Arrival time (when it becomes available)
	 - Burst (service) time
	 - Priority (optional, for priority-based algorithms)
3. Choose an algorithm and (if applicable) set a time quantum.
4. Hit Run / Step / Reset to simulate and watch the Gantt chart animate.
5. Inspect the Metrics panel to see average waiting time, average turnaround time, and per-process numbers.

The UI is intentionally simple so you can focus on what changes between algorithms.

## Try it (PowerShell-friendly)

Open a PowerShell window in the repository root (this project uses Vite). Use whichever package manager you prefer — npm, pnpm, or bun are all common. The project ships with standard scripts (`dev`, `build`, `preview`).

Using npm (recommended if you're unsure):

```powershell
npm install
npm run dev
```

Using pnpm (if you have pnpm installed):

```powershell
pnpm install
pnpm dev
```

Using bun (if you prefer Bun and the lockfile exists):

```powershell
bun install
bun run dev
```

Then open http://localhost:5173 (or the URL printed by Vite) and explore.

## Quick tips & troubleshooting

- If the UI doesn't reload after changing code, stop the dev server and re-run `npm run dev`.
- If you see type errors from TypeScript, run `npm run build` to get a clearer compiler output.
- Linting: `npm run lint` will run ESLint across the project.
- If ports conflict, Vite will attempt an alternate port; check the terminal output for the final URL.

## For contributors

- Want to add another scheduling algorithm or a new visualization? Great!
- Add your algorithm implementation to `src/lib/schedulers.ts` and expose any config through the control panel component.
- Please keep UI changes consistent with existing patterns in `src/components` and add lightweight tests or examples when practical.

Small checklist for PRs:

1. Run the dev server and test the flow locally.
2. Keep changes small and focused.
3. Update this README if you add new UI options or algorithms.

## Learning contract (what to expect)

- Inputs: processes with arrival, burst, and (optional) priority; a scheduler selection; optional quantum.
- Output: a simulated schedule (Gantt chart) and metrics per-process and averaged.
- Error modes: invalid numbers (negative times) are rejected by the form; extremely large inputs may affect render performance.

Edge cases to think about when experimenting:

- Multiple processes arriving at the same time.
- Zero-length burst (should be ignored or handled gracefully).
- Extremely small quantum for Round Robin (causes many context switches visually).

## Where to look in the code

- Scheduling logic: `src/lib/schedulers.ts`
- UI wiring: `src/components/ProcessControlPanel.tsx` (input) and `src/components/GanttChart.tsx` (output)
- Types: `src/types/scheduler.ts`

## License & attribution

This repository is a small educational project — reuse as you like (add a license file if you plan to publish).

---

Happy scheduling! If you'd like, I can also:

- Add a short GIF or screenshot to this README.
- Generate a lightweight demo script that seeds the app with a few example process sets (beginner/intermediate/advanced).

Tell me which of those you'd like next and I'll implement it for you.

## Screenshots & GIFs

It's helpful to include a visual so others can quickly see the Gantt chart and metrics. Here are two simple options you can use to add screenshots or an animated GIF to this README.

Option 1 — Manual (quick and simple)

- Run the app locally (`npm run dev`), open the URL in your browser, and use your OS screenshot tool (Snipping Tool / Win+Shift+S on Windows) or a GIF recorder to capture the UI.
- Save the image (for example `public/screenshots/schedule-example.png`), commit it, and embed in this README with:

```markdown
![Gantt chart example](public/screenshots/schedule-example.png)
```

Option 2 — Automated capture (one-step capture using Playwright)

If you'd like to produce reproducible screenshots from the running app, you can use Playwright to open the page and save a screenshot programmatically. This is useful for demos, CI, or creating consistent images for the README.

Steps (PowerShell friendly):

1. Install Playwright as a dev dependency:

```powershell
npm install -D playwright
npx playwright install
```

2. Create a small capture script (example: `tools/capture-screenshot.js`) and paste the snippet below.

3. Start the dev server in one terminal (`npm run dev`) and run the script in another terminal:

```powershell
node tools/capture-screenshot.js
```

Sample `tools/capture-screenshot.js` (place in the repository root):

```javascript
const { chromium } = require('playwright');

(async () => {
	const browser = await chromium.launch();
	const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
	// Adjust the URL/port if Vite uses a different port
	await page.goto('http://localhost:5173');
	// Wait for the main chart element to render; adjust selector as needed
	await page.waitForSelector('#gantt-chart, .gantt-chart, [data-testid="gantt"]', { timeout: 5000 }).catch(() => {});
	// Capture full page or a specific element
	await page.screenshot({ path: 'public/screenshots/schedule-playwright.png', fullPage: true });
	console.log('Screenshot saved to public/screenshots/schedule-playwright.png');
	await browser.close();
})();
```

Notes:

- The script captures the page as-is; if your app needs a particular process set, you can either seed the UI with a URL query string or extend the script to interact with the page (fill inputs and click Run) before taking the screenshot.
- Playwright supports headless and headed modes. For debugging, replace `chromium.launch()` with `chromium.launch({ headless: false })`.
- If you want GIFs instead of static images, Playwright doesn't record GIFs directly, but you can record a video (`page.video().start()` methods) or use a screen-recording tool.

Would you like me to:

- Add the `tools/capture-screenshot.js` file and a `screenshot` npm script to `package.json` so you can run `npm run screenshot`?
- Or create a small demo preset and include a screenshot I generate here (I'd need permission to add files to the repo)?

Pick one and I'll implement it next.

