# Plan Workflow

Use this workflow when the user asks to analyze, plan, structure, or design a PC backend/admin prototype without requiring implementation, or as the first stage of a complete prototype request.

## Goal

Turn PRD content, screenshots, notes, or requirements into an implementation-ready backend prototype plan.

## Load

Read only the references needed for the request:

- `references/prd-to-prototype-workflow.md`
- `references/page-patterns.md`
- `references/component-catalog.md`
- `references/composition-patterns.md`
- `references/visual-rules.md`
- `references/chart-rules.md` whenever requirements, PRD content, page names, or module intent include charts, trends, distributions, rankings, dashboards, statistics visualization, or any non-card visual representation of data

## Process

1. Extract pages, fields, table columns, filters, actions, states, permissions, flows, feedback, modals, drawers, and unresolved assumptions.
2. Separate primary navigation pages from secondary pages. Create, edit, and detail pages triggered from another page remain secondary pages.
3. Choose the appropriate page pattern and decide whether each auxiliary interaction should use navigation, a modal, or a drawer.
4. Map required modules to local platform components.
5. For every chart or data-visualization module, select the closest Apache ECharts official example pattern and record the intended chart type, example source, data dimensions, tooltip/legend behavior, and local color adaptation. Do not plan hand-drawn SVG/CSS/canvas charts for real chart modules.
6. Define the important interaction states and page transitions.
7. Record whether the user requested product annotations and which PRD or requirement sources are available for them. Do not silently decide PRD/prototype discrepancies on the user's behalf.
8. State conservative assumptions when business details are missing.

## Deliverable

Produce a concise prototype plan containing:

- Scope and assumptions
- Primary and secondary page map
- Navigation and breadcrumb behavior
- Per-page fields, filters, columns, actions, and states
- Modal, drawer, and workflow behavior
- Local component choices
- Chart choices only when required: include the ECharts official example pattern, chart type, data dimensions, tooltip/legend behavior, and local color adaptation
- Annotation request and available product-rule sources, only when requested
- Known annotation questions or expected discrepancies, only when requested
- Acceptance criteria for implementation

The output must be detailed enough for implementation without requiring this workflow to run again.

## Completion Check

- Every requested capability belongs to a page, modal, or drawer.
- Primary and secondary navigation relationships are explicit.
- Important interactions and feedback states are defined.
- Missing information is recorded as assumptions rather than silently invented.
