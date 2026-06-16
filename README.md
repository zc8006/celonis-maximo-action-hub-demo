# Celonis + Maximo Work Order Action Hub Concept Demo

A lightweight local concept demo that simulates how Celonis could identify high-risk IBM Maximo work order exceptions and trigger follow-up actions through Action Flows and APIs.

> This is **not** an official IBM product, **not** an official Celonis Marketplace asset, and **does not** connect to real IBM Maximo or Celonis environments. It uses synthetic sample data and a local mock API for learning, internal discussion, and PoC storytelling.

## Current status

The current Celonis build status is documented here:

- [Current Demo Status](docs/current_demo_status.md)

Completed in the Celonis environment:

- Overview tab with KPI cards and root-cause charts
- Work Order Process Flow tab with Process Explorer
- Basic Action Center View

Current next step:

```text
Upgrade the Action Center into a Top Risk Work Orders view with Risk Score and Recommended Action.
```

## Current plan

The overall implementation plan is documented here:

- [Overall Implementation Plan](docs/overall_implementation_plan.md)

## Celonis-ready files

The first Celonis-ready dataset and guide are now available:

- [WORK_ORDERS.csv](data/celonis/WORK_ORDERS.csv)
- [WORK_ORDER_ACTIVITIES.csv](data/celonis/WORK_ORDER_ACTIVITIES.csv)
- [Celonis Data Dictionary](docs/celonis_data_dictionary.md)
- [Celonis Setup Guide](docs/celonis_setup_guide.md)
- [Celonis PQL Library](docs/celonis_pql_library.md)

Recommended first Celonis target:

```text
Synthetic data -> Data Model -> View -> KPI -> Action Center
```

## Why this demo exists

Maintenance teams often manage many work orders every day. Some work orders are overdue, some are high priority, some are waiting for parts, and some require escalation. The business challenge is not only to monitor these exceptions, but also to prioritize and act on them quickly.

This concept demo shows a simplified closed loop:

**Detect → Prioritize → Act → Track**

## Demo story

1. A user opens the Work Order Action Hub dashboard.
2. The dashboard highlights open work orders, overdue work orders, high-priority overdue work orders, and escalated work orders.
3. The user reviews the process flow to understand where work orders get delayed.
4. The user opens the Action Center to focus on urgent exceptions.
5. The user can later trigger or simulate an escalation action for high-risk work orders.
6. The result can be tracked as part of the insight-to-action story.

## Included deliverables

- `data/work_orders.csv` — synthetic work order data for local demo
- `data/celonis/WORK_ORDERS.csv` — Celonis-ready case table
- `data/celonis/WORK_ORDER_ACTIVITIES.csv` — Celonis-ready activity table
- `backend/server.js` — dependency-free local Node.js mock API and static file server
- `frontend/index.html` — simple demo dashboard
- `frontend/app.js` — KPI calculation, filtering, and escalation logic
- `frontend/styles.css` — clean business-style UI
- `docs/architecture.md` — architecture explanation and Mermaid diagram
- `docs/demo_script_en.md` — 3-minute English voiceover script
- `docs/pitch_deck_outline.md` — 6-slide outline for internal presentation
- `docs/pql_kpi_examples.md` — example KPI logic that could be translated into Celonis PQL later
- `docs/celonis_data_dictionary.md` — explanation of Celonis-ready tables and columns
- `docs/celonis_setup_guide.md` — step-by-step guide for creating the first Celonis Data Model and View
- `docs/celonis_pql_library.md` — starter PQL formulas for KPI tiles and Action Center
- `docs/current_demo_status.md` — current status of the Celonis environment demo and remaining upgrade steps
- `docs/next_steps_to_real_celonis.md` — how to move from local demo to a real Celonis PoC
- `docs/overall_implementation_plan.md` — step-by-step plan for local demo, Celonis demo, optional Action Flow, and final presentation

## How to run locally

Prerequisite: Node.js 18+.

```bash
cd celonis-maximo-action-hub-demo
node backend/server.js
```

Then open:

```text
http://localhost:3000
```

## API endpoint

```http
POST /api/escalate
Content-Type: application/json

{
  "workOrderId": "WO-10003",
  "priority": "High",
  "assetId": "AST-1002",
  "dueDate": "2026-06-10"
}
```

Response:

```json
{
  "success": true,
  "escalationId": "ESC-12345",
  "message": "Work order escalated successfully"
}
```

## What this demo is not

This demo does not include:

- real IBM Maximo API credentials
- real Celonis Data Pool or Data Model setup
- real Action Flow configuration
- real Marketplace packaging
- production security, authentication, or audit logging
- official IBM or Celonis branding approval

## How this could be extended

In a real PoC, the synthetic data layer could be replaced by the existing IBM Maximo workorder connector or another approved integration path. The local mock API could be replaced by a real endpoint in Maximo, MuleSoft, ServiceNow, Microsoft Teams, or another enterprise system.

The concept can then evolve from a local demo into a Celonis-based PoC:

1. Load real or approved sample work order data.
2. Build a Celonis Data Model.
3. Create KPIs and Views.
4. Add an Action Center.
5. Configure Action Flow input mapping.
6. Trigger a real or controlled API action.
7. Track action status and business impact.
