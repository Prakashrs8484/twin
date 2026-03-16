# Calculator As An Embedded Digital Twin Example

This folder shows how to use digital twin thinking in a normal web app.

## What is the twin here

The twin is `src/twin/calculatorTwin.js`.

It models calculator state and behavior:

- current display value
- previous value
- selected operator
- error state

The UI in `src/ui/app.js` only sends button or keyboard events to the twin and renders the returned snapshot.

## Why this helps development

- Behavior is testable without clicking through the UI.
- UI and logic are separated, so bugs are easier to locate.
- Replay tests verify state transitions before you change UI code.

## Run locally

1. Open `index.html` in a browser.
2. For tests, run:

```bash
npm test
```

If `npm` is not available, run the test file with a recent Node.js runtime.