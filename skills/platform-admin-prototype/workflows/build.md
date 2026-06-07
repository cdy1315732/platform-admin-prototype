# Build Workflow

Use this workflow when the user asks to create, implement, or update an interactive PC backend/admin prototype, or as the implementation stage of a complete prototype request.

This workflow must work from either an existing prototype plan or raw PRD, screenshot, notes, and requirements. If no plan exists, perform the minimum necessary planning before implementation.

## Goal

Produce a runnable and interactive Vue backend prototype using the local platform component system.

## Load

Read only the references needed for the implementation:

- `references/source-of-truth.md`
- `references/component-catalog.md`
- `references/page-patterns.md`
- `references/composition-patterns.md`
- `references/interaction-states.md`
- `references/visual-rules.md`
- `references/usage-examples.md`
- `references/component-code-map.md`
- `references/chart-rules.md` whenever requirements, PRD content, page names, existing plan, or module intent include charts, trends, distributions, rankings, dashboards, statistics visualization, or any non-card visual representation of data

## Target And Stack

- Locate a checked-out `platform-admin-prototype` repository by finding `pnpm-workspace.yaml`.
- Default to `apps/playground`.
- Use Vue 3 and `@platform/components`.
- Use raw Arco components only when the platform package has no required wrapper.
- Use the bundled `assets/component-source` snapshot only when a live repository is unavailable.

## Process

1. Confirm the required page map and interactions from the available plan or raw input.
2. Implement a real backend workflow rather than a one-page component showcase.
3. Compose with local platform components and follow the local visual rules.
4. Implement navigation, input echo, filter/reset feedback, selection and bulk actions, sorting, pagination, modal/drawer behavior, upload and switch states, and form submit/cancel where applicable.
5. Use form-item `required` for required indicators, keep Select / Dropdown triggers single-line, and preserve the standard `16px` gap between detail-page modules.
6. Implement real validation for every required field. Blur/focus-out should validate the current field, while submit/save/confirm validates all required fields. For modal or drawer save actions, bind validation to the pre-save/pre-close guard (`before-ok`, `before-submit`, or equivalent) so invalid data cannot run the save handler, mutate data, close the overlay, or show success feedback. Submission must expose field-level red error states and actionable messages, block invalid submission without clearing input, and remove each error after that field becomes valid. Do not rely only on disabled submit buttons, `ok`-only early returns, or silent returns.
7. Give every editable/selectable control an initial display: use the PRD-defined default value when one exists; otherwise add a control-specific placeholder. Keep actual values in normal text color and placeholders in weak hint color.
8. For every real chart module, use an Apache ECharts official example as the implementation pattern, install ECharts if the local project does not already include it, and adapt the option colors and component styling to the local PC backend visual rules. Do not implement product charts as hand-written SVG, CSS-only charts, div bars, canvas drawings, or manually calculated polylines unless the user explicitly requests a static placeholder.
9. Add conservative sample data when business data is missing.
10. Add or update focused tests for important state, validation, navigation behavior, and chart option/data mapping when charts are implemented.
11. Run the available build, typecheck, and tests.
12. Start or keep the local development server running, confirm its complete URL responds successfully, and provide that clickable URL in the final response.
13. Use `workflows/review.md` after implementation unless the user explicitly says not to verify.

## Completion Check

- The prototype opens and the requested pages are reachable.
- Secondary pages stay out of the sidebar and keep their parent selected.
- Requested controls and workflows are interactive.
- Local platform components are preferred over raw Arco components.
- Build, typecheck, and relevant tests pass, or failures are clearly reported.
- The development server remains running, its accessible URL responds, and the final response includes the complete clickable URL.
