# Source Of Truth And Preferences

This skill generates PC backend/admin prototypes from the local customized component system. The local system already includes user-approved changes; do not replace those decisions with generic Arco website examples.

## Priority

1. Skill references in this folder.
2. A checked-out `platform-admin-prototype` repository when available.
3. Bundled code snapshot under `assets/component-source`.
4. ECharts official examples only for chart pattern selection when a PRD explicitly requires chart/data visualization.
5. Arco Design Vue docs only for low-level API, event, or slot troubleshooting.

Do not use the Arco website as the visual source of truth. If Arco and local rules differ, local rules win.
ECharts examples are a conditional chart-selection reference only; local layout, spacing, color, typography, and interaction rules still win.

## Product Scope

Use this skill only for PC backend/admin/B-end systems:

- dashboards and workbenches
- list pages with filters, tables, pagination, row actions, and bulk actions
- create/edit forms and form modals
- detail pages and detail drawers
- settings, category/tree management, people/role management
- modal, drawer, upload, switch, result, steps, status, and feedback interactions

Do not use this skill for mobile, dark mode, marketing pages, landing pages, mini-program frontend pages, or C-end consumer pages.

## User-Approved Layout Preferences

- Build a real backend workflow, not a single page containing every component.
- Sidebar navigation contains only first-level business pages.
- Create, edit, and detail pages triggered by buttons, links, or table rows are secondary pages; they do not appear in the sidebar.
- Secondary pages keep the parent sidebar item selected.
- Topbar uses breadcrumb on the left and search/notification/user affordances on the right.
- Breadcrumb omits unnecessary system names. Use concise paths like `工作台 / 列表 / 详情`.
- If the current page is the first-level workbench, breadcrumb can show only `工作台`.
- Cards use consistent gaps, usually 16px. Avoid nested cards and large accidental blank areas.
- Page title/helper text must not be duplicated in both a page header and a card header.

## Component Preferences

- Filter panels are standalone modules, but not card-inside-card structures.
- Filters are left aligned. Search/reset buttons align with the filter row and stay close to the other fields.
- Filter selects have default values such as `全部状态`, `全部角色`, `全部分类`.
- Date ranges keep a readable minimum width.
- Table card header contains table title on the left and page-level actions on the right.
- Export/create/add buttons belong on the table card heading right side when the action applies to table data.
- Bulk actions appear only after row selection and sit beside the selected count.
- Time/date table sorters default to no active sort; clicking toggles ascending/descending.
- Avatar table cells keep a perfect circle and must not be compressed.
- Detail status uses colored dot plus text. Priority uses a compact bordered tag.
- Detail summary cards should be compact; do not create tall fields with large blank space.
- Workflow/lifecycle uses steps or process nodes, not a plain horizontal tag strip.
- Detail page header should not show an unnecessary back arrow. Use a business `返回列表` button if needed.
- When detail header actions wrap to a new line, keep 12px vertical gap from the title area; when all fit in one line, do not add extra gap.
- Modal titles are left aligned with 20px horizontal padding. Modal body remains centered on screen.
- Result feedback usually belongs in a modal or explicit PRD result page; do not create a standalone result page by default.
- Upload defaults to no files. Use a regular gray upload button with clickable, hover, active, disabled, and file-list states. Do not use a large blue drag area as the default.
- Small switches must use a vertically centered knob; disabled switch is gray and cannot be clicked.

## Ambiguity Rule

If the PRD leaves color, shadow, exact spacing, or state wording unclear, choose one consistent local rule and continue. Ask the user only when the ambiguity changes product behavior or page scope.
