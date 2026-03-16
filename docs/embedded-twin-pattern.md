# Embedded Twin Pattern

## Short answer

Yes. The digital twin can stay inside any existing project and persist with the codebase.

The right comparison is this:

- Agent files persist as repository metadata and instructions.
- A digital twin persists as repository code, contracts, tests, sample data, and runtime configuration.

So the twin should be packaged as a first-class module in the project, not as an editor-only customization.

## What should persist in the repo

To make the twin portable across projects, keep these parts under version control:

- Asset and state models.
- Telemetry and event schemas.
- State transition logic.
- Rules or simulation logic.
- API endpoints or SDK surfaces.
- Replay datasets and test fixtures.
- Integration tests and regression tests.
- Local development setup and deployment config.
- Project documentation explaining how the twin works.

If these files live in the repository, then the twin travels with the code exactly the way the rest of the product does.

## Recommended embedded structure

Inside an existing project, embed the twin in a bounded area such as:

```text
src/
  twin/
    domain/
    ingestion/
    rules/
    api/
contracts/
  telemetry/
tests/
  replay/
sample-data/
docs/
  twin/
.github/
  copilot-instructions.md
```

Alternative names are fine. The important part is that the twin has a stable home in the repo.

## How this fits the development process

In an existing product, the embedded twin should be used as a development capability and a runtime capability.

As a development capability, it helps with:

- replaying recorded telemetry against new code
- validating schema changes before merge
- testing state transitions deterministically
- simulating edge conditions without real hardware
- debugging regressions with event history

As a runtime capability, it helps with:

- maintaining current asset state
- generating alerts and derived metrics
- exposing state through API or UI
- supporting prediction or simulation features later

## Implementation rule

Do not couple the twin directly to UI code or device-specific adapters.

Keep these boundaries clear:

- adapters receive external inputs
- the twin domain applies state transitions
- persistence stores state and history
- APIs and UI only read or command the twin through stable interfaces

That is what makes the twin reusable across projects and durable over time.

## Best way to adopt it in a real project

Start by embedding only one thin vertical slice:

1. Create one `twin` module in the existing codebase.
2. Define one asset model.
3. Define one telemetry contract.
4. Implement one state transition path.
5. Store latest state and one event history stream.
6. Add one replay test suite.
7. Expose one API endpoint for current state.

After that, expand asset types, rules, and simulation incrementally.

## What makes it feel persistent like agents

If you want the twin to feel as persistent and reusable as custom agents, keep three things in the same repo:

- the twin implementation itself
- the docs that define how engineers work with it
- the repo instructions that keep future changes aligned with twin architecture

That combination makes the digital twin part of the project's permanent development surface, not a temporary feature branch idea.