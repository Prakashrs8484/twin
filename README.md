# Digital Twin Software Workspace

This repository is for building a digital twin as a software system.

## What this digital twin will do

Later, the twin should become a live software representation of a real asset, machine, process, or environment. Its job is not just to store data. It should continuously accept telemetry, maintain state, expose current and historical views, and support prediction or simulation.

Core responsibilities:

- Ingest telemetry from devices, gateways, APIs, or replay files.
- Maintain the current state of each asset in a structured domain model.
- Store historical events and time-series data for analysis and debugging.
- Detect anomalies, threshold breaches, and state transitions.
- Run simulation, forecasting, or rule logic against the twin state.
- Expose APIs and dashboards for operators, developers, and downstream systems.
- Support replay of past data to validate model behavior and new logic.

## What we should build first

Start with the thinnest useful twin, not a full platform.

Phase 1 MVP:

- One asset type with a clear state model.
- One ingestion path such as REST or MQTT.
- One state store for current asset state.
- One history store for events or telemetry.
- One API to read current state and recent history.
- One rules or alert path for simple derived insights.
- One replay test flow using captured sample data.

Phase 2:

- Multiple asset instances and asset relationships.
- Time-series analytics and trend calculations.
- Simulation or predictive logic.
- Operator dashboard.
- Better observability, auditability, and deployment automation.

Phase 3:

- Multi-site scale.
- Schema evolution and versioned contracts.
- Workflow automation.
- Optimization and what-if simulation.
- Integration with enterprise systems.

## Recommended system shape

Keep the system separated into clear parts:

- Ingestion: receives telemetry and normalizes it.
- Twin domain: owns asset models, state transitions, and derived fields.
- Rules or simulation: computes alerts, predictions, and outcomes.
- Storage: separates current state from historical telemetry.
- API: exposes twin state and operations.
- UI: dashboards and operator views.
- Platform: logging, metrics, tracing, CI/CD, secrets, and deployment.

## How we will use this repo

This repo should be used to design and implement the twin in small vertical slices.

Each feature should answer:

- Which asset or process does this represent?
- What events or telemetry update it?
- What state changes should happen?
- What API or UI surface exposes the result?
- How do we test it with replayed or synthetic data?

See [docs/development-process.md](docs/development-process.md) for the engineering workflow.
See [docs/embedded-twin-pattern.md](docs/embedded-twin-pattern.md) for how to keep the twin inside any existing software project.
See [calculator/README.md](calculator/README.md) for a concrete HTML/CSS/JS example with twin logic separated from UI.