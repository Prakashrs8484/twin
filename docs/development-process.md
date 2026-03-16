# Development Process For The Digital Twin

## 1. Working model

Treat the twin as a set of bounded software components:

- Domain model: asset types, attributes, relationships, commands, and state transitions.
- Ingestion model: incoming telemetry and event contracts.
- Processing model: validation, normalization, enrichment, and deduplication.
- Persistence model: current state, event log, and time-series history.
- Delivery model: APIs, dashboards, notifications, and exports.

Every work item should map to one of these layers.

## 2. Default architecture

Use this baseline unless there is a reason to change it:

- Telemetry source: MQTT, REST, file replay, or gateway feed.
- Ingestion service: validates payloads and converts them into internal events.
- Twin service: applies events to the asset state model.
- Storage:
  - Current state store for latest snapshot.
  - Event or time-series store for history.
- API service: reads current state, history, alerts, and derived metrics.
- UI: operator and developer views.
- Observability: logs, metrics, and traces across ingestion and state updates.

## 3. Development flow

Build in vertical slices.

For each slice:

1. Define one asset or process capability.
2. Define the input contract.
3. Define the internal state model.
4. Define the state transition rules.
5. Implement ingestion and validation.
6. Persist current state and history.
7. Expose the result through API or UI.
8. Add replay tests and failure tests.

Example slice:

- Input: temperature and vibration telemetry from one machine.
- State: current temperature, vibration level, status, last update time.
- Logic: mark machine as warning if thresholds are exceeded.
- Output: API endpoint and alert event.

## 4. How this helps development

The twin should improve engineering work, not just runtime behavior.

Use it in the development process for:

- Replay testing: run old telemetry through new logic before release.
- Contract validation: catch schema breaks early.
- Simulation: test rule changes without touching production devices.
- Root-cause analysis: inspect event history and state transitions.
- Regression prevention: verify that code changes do not alter expected state evolution.

## 5. Definition of done for features

A feature is not done when code compiles. It is done when:

- The asset model or event contract is explicit.
- Validation rules are implemented.
- State transitions are deterministic.
- Current state and history are stored correctly.
- APIs or outputs are documented.
- Replay tests cover expected and bad inputs.
- Logs and metrics exist for debugging.

## 6. Suggested repo evolution

As implementation starts, grow toward this structure:

```text
docs/
  development-process.md
  architecture.md
  data-contracts/
services/
  ingestion/
  twin-core/
  api/
ui/
tests/
  replay/
  integration/
infra/
  local/
  ci/
sample-data/
```

## 7. First implementation target

The best first target is a thin, testable flow:

- Accept sample telemetry.
- Transform it into an internal event.
- Apply it to one asset state model.
- Store the latest state.
- Return the state through an API.
- Validate behavior with replay tests.

That gives a real twin foundation without overbuilding early.

## 8. Using the twin inside an existing project

The twin does not need to live as a separate standalone repository.

It can persist inside an existing software project if it is stored as versioned project assets:

- domain model code
- event and telemetry contracts
- replay datasets
- state transition tests
- local run configuration
- developer instructions and architecture docs

That makes the twin travel with the codebase in the same way repo-level agent instructions do, except the twin is executable application logic rather than editor metadata.

See [docs/embedded-twin-pattern.md](docs/embedded-twin-pattern.md) for the recommended structure.