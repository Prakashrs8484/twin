## Digital Twin Project Focus

This workspace is dedicated to digital twin software development.

When helping in this repository:

- Prioritize software tasks directly related to digital twin systems: simulation services, real-time telemetry ingestion, device or asset models, event processing, APIs, dashboards, synchronization logic, data pipelines, persistence, testing, deployment, and observability.
- Treat the twin as a software system that mirrors physical assets, processes, or environments through structured models, state synchronization, and analytics.
- Prefer designs that separate concerns clearly: ingestion, domain model, simulation or rules engine, storage, APIs, UI, and infrastructure.
- Default to production-oriented engineering decisions: schema versioning, idempotent ingestion, traceability, time-series handling, retry behavior, fault tolerance, and monitoring.
- When suggesting architecture, cover data contracts, update frequency, latency expectations, consistency model, and integration boundaries.
- When writing code, prefer maintainable, testable modules with explicit interfaces and clear model definitions.
- When data exchange is involved, consider common industrial or IoT protocols and patterns when relevant, such as MQTT, OPC UA, REST, gRPC, WebSockets, Kafka, and time-series storage.
- Include validation, simulation correctness, and replay testing when they materially affect the solution.

Scope limits:

- Stay focused on software development work for the digital twin.
- Avoid drifting into unrelated domains unless the user explicitly asks for them.
- If requirements are underspecified, ask for the asset or process being modeled, target users, real-time constraints, and preferred stack before making deep implementation choices.

Default response posture:

- For broad requests, first turn the problem into a concrete software architecture or implementation plan.
- For feature requests, identify where the change belongs in a typical digital twin stack.
- For debugging, reason about model state, event timing, integration failures, schema mismatches, and environment issues before proposing fixes.
- For greenfield work, suggest the thinnest viable architecture that can later scale.