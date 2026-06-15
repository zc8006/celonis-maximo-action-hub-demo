# Celonis + Maximo Work Order Action Hub Concept Demo

A lightweight local concept demo that simulates how Celonis could identify high-risk IBM Maximo work order exceptions and trigger follow-up actions through Action Flows and APIs.

> This is **not** an official IBM product, **not** an official Celonis Marketplace asset, and **does not** connect to real IBM Maximo or Celonis environments. It uses synthetic sample data and a local mock API for learning, internal discussion, and PoC storytelling.

## Current plan

The overall implementation plan is documented here:

- [Overall Implementation Plan](docs/overall_implementation_plan.md)

Recommended next step:

```text
Create Celonis-ready CSV files and a Celonis setup guide.
```

## Why this demo exists

Maintenance teams often manage many work orders every day. Some work orders are overdue, some are high priority, some are waiting for parts, and some require escalation. The business challenge is not only to monitor these exceptions, but also to prioritize and act on them quickly.

This concept demo shows a simplified closed loop:

**Detect → Prioritize → Act → Track**

## Demo story

1. A user opens the Work Order Action Hub dashboard.
2. The dashboard highlights open work orders, overdue work orders, high-priority overdue work orders, and escalated work orders.
3. The user filters the Action Center to focus on urgent exceptions.
4. The user clicks **Escalate** for an overdue high-priority work order.
5. A local mock API simulates an external system action, such as creating an escalation in Maximo, MuleSoft, ServiceNow, or Microsoft Teams.
6. The dashboard writes back the result and updates the escalation status.

## Included deliverables

- `data/work_orders.csv` — synthetic work order data
- `backend/server.js` — dependency-free local Node.js mock API and static file server
- `frontend/index.html` — simple demo dashboard
- `frontend/app.js` — KPI calculation, filtering, and escalation logic
- `frontend/styles.css` — clean business-style UI
- `docs/architecture.md` — architecture explanation and Mermaid diagram
- `docs/demo_script_en.md` — 3-minute English voiceover script
- `docs/pitch_deck_outline.md` — 6-slide outline for internal presentation
- `docs/pql_kpi_examples.md` — example KPI logic that could be translated into Celonis PQL later
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
