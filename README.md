# Idea to Impact

A modern, frontend-only Angular 22 demonstration of strategy-to-execution demand management. No backend, login, API keys, database or Docker required.

## Runtime and dependencies

- **Node.js 24.19.0 only**, enforced by engines, .npmrc, .nvmrc, .node-version and lifecycle checks.
- Angular framework, router, forms, CLI and build tooling: **22.2.3**, pinned to matching published versions.
- TypeScript **6.0.3**, RxJS **7.8.2**, tslib **2.8.1**.
- No third-party UI, chart, icon or state-management packages. SVG icons and responsive CSS are local.
- Standalone components, signals, computed state, OnPush, zoneless rendering, lazy-loaded routes and typed reactive forms.

## Run locally

Extract this ZIP, open the `idea-to-impact` folder in VS Code, then:

```bash
nvm install 24.19.0
nvm use 24.19.0
node --version
npm install
npm start
```

Open `http://localhost:4200`. Node must report `v24.19.0`. On Windows, use your installed Node version manager or install that exact official Node version. `npm run dev` is an alias for the same development command. No global Angular CLI is needed.

```bash
npm test
npm run check
npm run build
```

Production files are emitted to `dist/idea-to-impact/browser`. Host this folder on any static host with an SPA fallback to `index.html`. Do not open index.html using a file:// URL. The development server is tooling only, not an application backend.

## Pages and interactions

### Home
Executive dashboard, portfolio metrics, strategic investment allocation, forum agenda and highest-priority ideas. All portfolio metrics derive from the same local store.

### Ideas
16 fictional sample ideas. Search, filter by stage/objective, sort and export the current selection. Capture an idea with validated typed reactive forms. Open a detail drawer with Overview, Assessment, Governance and Activity tabs. Update stage, concept and assurance, change priority scores, record decisions, add comments and reference document names.

### Portfolio
Priority ranking, adjustable budget scenario and funding line, value/effort matrix, governance agenda and delivery cards. Budget allocation follows rank order and stops at the first item that does not fit. It is not an optimiser or approval mechanism.

### Strategy
Four strategic objectives, illustrative targets and progress, dynamically linked idea counts and financial estimates, and the six-stage strategy-to-value lifecycle. Targets and objective progress are intentionally static in this version.

### Reports
Filter by objective, view stage counts, investment mix, expected/realised benefits, export CSV and print a clean report.

## Suggested demo walkthrough

1. Open Home and review the executive summary.
2. Capture an idea, selecting an objective and entering a cost and benefit estimate.
3. In Assessment, add a concept and tick consultation and assurance.
4. In Overview, move the idea to Demand forum.
5. In Governance, enter a rationale and record Endorsed for investment work.
6. The idea becomes Approved. Return to Overview and hand over to Delivery.
7. View Portfolio > Delivery and review the linked initiative.
8. Change the budget in Portfolio > Prioritisation and inspect the funding line.
9. Export a filtered report or use Print report.
10. Refresh the browser to confirm local persistence. Use Reset sample data to restore the seed.

## Demo boundaries

- All organisations, people, proposals, financial amounts and results are fictional.
- No authentication, access control, real multi-tenancy, emails, billing, file uploads or external integrations.
- Browser localStorage persists ideas, scores, comments and decisions on this origin. Do not enter confidential or personal information. This is not secure enterprise storage.
- Decision history is editable local demo state, not an immutable or legally authoritative audit log.
- Forum attendance, delegated authority and voting/quorum are not enforced. Governance view explains the illustrative quorum calculation.
- Document references are names only, not uploaded files or working download links.
- Delivery handover is a local status transition, not a Jira/Azure DevOps call.
- Activity notifications are session-only; comments and decisions persist with ideas.
- The weighted scoring model is illustrative and is NOT a reconstruction of the reference organisation's proprietary RICE or PEFM calculation.
- No automatic investment advice, approval or benefit guarantee.

## Scoring and stage controls

Scores are 1–5 and normalised to 100: strategic alignment 25%, customer value 20%, financial value 20%, risk/compliance 15%, feasibility 10%, urgency 10%.

Forum entry requires a title, description, sponsor, objective, concept, funding pathway, positive cost, delivery consultation and assurance. Approval requires a recorded endorsement. Delivery requires Approved status. Completion requires Delivery status. Other status changes remain flexible for demo exploration.

## Source layout

```text
src/app/
  app.ts                  Responsive navigation and application shell
  routes.ts               Five lazy-loaded routes
  core/models.ts          Typed domain models
  core/seed.ts            Fictional demonstration data
  core/rules.ts           Scoring, readiness, currency and CSV rules
  core/store.ts           Signal state and local persistence
  shared/                 Icons, badges, metrics and accessible dialogs
  pages/                  Home, Ideas, Portfolio, Strategy, Reports
src/styles.css            Responsive design tokens and page styling
scripts/check-node.mjs    Exact Node runtime enforcement
tests/rules.test.mjs      Node built-in test runner, no extra test packages
```

## Reference research

The SharePoint URLs supplied require access that was not available here. The uploaded copies of **Demand APP Increment 2 User Guide.pdf** and **GSIT Governance Framework_Demand Mgt Forum TOR.pdf** were used instead. **Designer.pdf** informed the executive-friendly product narrative. No internal membership names, logos or source documents are redistributed in this package.

Adapted concepts: requestor/sponsor intake, status filtering, concept development, delivery-team consultation, prioritisation, categorisation, business operations assurance, forum prerequisites, recorded outcomes and delivery handover. This is a generic product demo, not an official implementation or endorsed reproduction of the source system.

Official documentation consulted:
- https://angular.dev/events/v22
- https://angular.dev/reference/versions
- https://angular.dev/guide/signals
- https://angular.dev/guide/routing/define-routes
- https://angular.dev/guide/forms/reactive-forms
- https://angular.dev/guide/zoneless
- https://angular.dev/guide/components/lifecycle
- https://github.com/angular/angular/releases

## Future production work

Add server-side identity/authorisation, tenant isolation, durable database storage, protected audit events, real approval authority/quorum, attachment security, integrations, configurable strategies/workflows, backup and privacy controls before using this for real governance decisions.
