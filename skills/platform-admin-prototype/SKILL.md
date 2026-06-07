---
name: platform-admin-prototype
description: Use when the user asks to plan, create, implement, review, verify, optimize, fix, or produce an annotated PC backend/admin/B-end prototype from PRDs, requirements, screenshots, product notes, document content, or an existing management-console project.
---

# Platform Admin Prototype

## Core Rule

Generate interactive PC backend/admin prototypes from the local customized platform component system. Do not use the Arco website as the primary design source. The bundled references and `@platform/components` implementation are the source of truth.

## Scope

Use this skill only for PC backend, B-end, admin, management-console, dashboard, list, form, detail, settings, modal, drawer, and workflow prototypes.

Do not use it for mobile, dark mode, marketing pages, landing pages, consumer frontends, mini-programs, or documentation unrelated to a backend prototype.

## Workflow Selection

Select the smallest workflow that fully satisfies the request:

- Read `workflows/plan.md` when the user asks to analyze, plan, structure, or design a backend prototype without implementation.
- Read `workflows/build.md` when the user asks to create, implement, or update a backend prototype.
- Read `workflows/review.md` when the user asks to inspect, review, verify, optimize, or fix an existing backend prototype.
- For a complete PRD-to-prototype request, run `plan`, then `build`, then `review`. Review findings must be fixed before completion.
- For a complete annotated PC backend prototype, finish `plan`, `build`, and `review` first, then **REQUIRED SUB-SKILL:** use `prototype-annotation` in `annotate` mode.
- If the user only asks to annotate an existing prototype, use `prototype-annotation` directly instead of running this skill's PC backend workflows.

Each workflow is independently usable. Build must accept either an existing plan or raw requirements. Review must accept any existing PC backend/admin prototype.

## Shared Rules

- Read only the references named by the selected workflow.
- Prefer a checked-out `platform-admin-prototype` repository, then the bundled component snapshot.
- Use `@platform/components` before raw Arco components.
- Build real backend workflows, not one-page component showcases.
- Keep primary pages in the sidebar and button-triggered create, edit, and detail pages as secondary pages.
- Keep the parent sidebar item selected on secondary pages.
- Keep card gaps consistent, usually 16px, and avoid nested cards.
- Do not duplicate page titles or helper text in extra title cards.
- Apply `references/long-text-display.md` to business text and data display. Classify text by the user's current task before choosing complete display, inline expand/collapse, or compact ellipsis; always preserve complete raw values and keep data-length limits separate from display limits.
- Implement real interaction states when building.
- Load `references/chart-rules.md` whenever requirements, PRD content, page names, or module intent include charts, trends, distributions, rankings, dashboards, statistics visualization, or any non-card visual representation of data. Treat "工单趋势", "统计看板", "分布", "占比", "排行", and similar backend analytics modules as chart requirements even when the user does not explicitly say "图表".
- For real chart modules, Apache ECharts official examples are the required pattern source. Do not hand-draw product charts with SVG, CSS, canvas, divs, or pseudo-chart markup unless the user explicitly asks for a static placeholder.
- After selecting an ECharts example, adapt its colors, typography, spacing, legend, tooltip, and container treatment to the local PC backend visual rules instead of copying the example's visual style verbatim.
- Verify in the browser for build and review work unless the user explicitly says not to.
- When delivering a runnable prototype, start or keep the local development server running, verify the accessible URL responds, and include the complete clickable URL in the final response. Do not report only that the prototype is runnable or ask the user to start it themselves.
- Product annotations are optional. They must not replace, restyle, or weaken the base PC backend prototype.
- Do not implement an annotation layer inside the base build workflow. Complete and verify the base prototype before using `prototype-annotation`.
- When annotations are requested, use structured product-logic annotations from `prototype-annotation`: field name, component type, default value, required status, constraints, data source, action result, navigation target, and product-logic conditions. Do not write visual/UI rationale. Browser annotation panels must be draggable by their header and constrained to the visible viewport/prototype canvas. Annotation details expand inline under the selected note only and must not repeat title/component type/summary blocks already shown in the note item.

## Complete Annotated Prototype Completion

For a complete annotated PC backend request, the task is complete only when:

1. The base PC backend prototype passes this skill's review workflow.
2. Required PRD/prototype discrepancies have been resolved with the user.
3. `prototype-annotation` finishes `annotate` mode.
4. Annotation mode and annotation-disabled mode both pass verification.
5. Annotation findings are fixed or clearly reported when they cannot be fixed.

## Source Priority

Use this order when there is ambiguity:

1. This skill's bundled references.
2. A checked-out `platform-admin-prototype` repository if present locally.
3. This skill's bundled `assets/component-source` snapshot.
4. ECharts official examples are mandatory for real chart/data-visualization modules; use them for chart type, option structure, interaction pattern, tooltip, legend, and axis behavior, then adapt visual styling to local page/component rules.
5. Arco documentation only for low-level API troubleshooting, never to override local visual or interaction rules.

## Fallbacks

If the input is not clearly a PC backend/admin request, ask a short clarification before using this skill.

If business data is missing but the page structure is clear, make conservative sample data and state the assumption in the final response.

If local docs and local code disagree, prefer local code plus `visual-rules.md`; do not override user-approved customizations with official Arco examples.
