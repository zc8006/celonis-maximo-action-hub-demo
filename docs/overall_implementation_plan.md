# Overall Implementation Plan

## Project Direction

Project name:

**Celonis + Maximo Work Order Action Hub Concept Demo**

The goal is to build a lightweight but presentable demo that shows how Celonis can help maintenance teams identify high-risk Maximo-like work order exceptions and move from insight to action.

This project should not be positioned as an official IBM product, an official Celonis Marketplace asset, or a real Maximo integration at this stage. It is a concept demo / internal enablement asset.

## Core Demo Message

The demo should communicate one clear message:

> Celonis can help users detect work order exceptions, prioritize SLA risks, and trigger follow-up actions through Action Flows and APIs.

The business flow is:

```text
Detect -> Prioritize -> Act -> Track
```

## Why We Use a Step-by-Step Approach

There is currently no confirmed official path to publish this as a Celonis Marketplace asset or IBM product. There may also be limitations around Celonis tenant access, Maximo data access, Action Flow permissions, and external API connectivity.

Therefore, the safest approach is to build the demo in layers:

1. Local concept demo
2. Celonis data and View demo
3. Optional Action Flow demo
4. Optional recorded video and pitch material
5. Future real PoC only if there is sponsor support

## Phase 0: Current Local Concept Demo

Status: **Created**

The current GitHub project already contains a local mock version.

Included:

- synthetic Maximo-like work order data
- local Node.js mock API
- local web dashboard
- KPI cards
- Action Center table
- filters for overdue / high priority / waiting for parts
- Escalate button
- mock API response and status update
- architecture documentation
- English demo script
- pitch deck outline

Purpose:

This version is used to prove the demo story and user experience before moving into Celonis.

## Phase 1: Prepare Celonis-Ready Data

Goal:

Create data files that can be uploaded into a Celonis training or demo environment.

Deliverables:

```text
data/celonis/WORK_ORDERS.csv
data/celonis/WORK_ORDER_ACTIVITIES.csv
docs/celonis_data_dictionary.md
docs/celonis_setup_guide.md
```

### WORK_ORDERS.csv

This is the case-level / work-order-level table.

Example fields:

- work_order_id
- asset_id
- asset_name
- location
- priority
- status
- created_date
- due_date
- completed_date
- technician
- work_type
- failure_code
- waiting_reason
- sla_status
- escalation_status

### WORK_ORDER_ACTIVITIES.csv

This is the activity table for process mining.

Example fields:

- case_key
- activity
- event_time
- sorting

Example activities:

- Work Order Created
- Work Order Assigned
- Work Started
- Waiting for Parts
- Work Completed
- Work Reopened
- Work Escalated

## Phase 2: Build the First Celonis Data Model

Goal:

Build a simple Celonis Data Model using the prepared CSV files.

Recommended model:

```text
Case table: WORK_ORDERS
Activity table: WORK_ORDER_ACTIVITIES
Relationship: WORK_ORDER_ACTIVITIES.case_key -> WORK_ORDERS.work_order_id
```

Activity table mapping:

```text
Case ID: case_key
Activity Name: activity
Timestamp: event_time
Sorting: sorting
```

Expected result:

A loaded Celonis Data Model that can support KPI tiles, tables, filters, and optionally Process Explorer.

## Phase 3: Build the First Celonis View

Goal:

Create a real Celonis View based on the Data Model.

Recommended pages:

### Page 1: Work Order Overview

Components:

- KPI Tiles
- Open Work Orders
- Overdue Work Orders
- High Priority Overdue Work Orders
- Escalated Work Orders
- Work Orders by Priority
- Work Orders by Location

### Page 2: Action Center

Components:

- work order table
- priority filter
- status filter
- SLA status filter
- waiting reason filter
- escalation status

Recommended table columns:

- Work Order ID
- Asset Name
- Location
- Priority
- Status
- Due Date
- SLA Status
- Waiting Reason
- Escalation Status

### Page 3: Process Explorer Optional

If the activity table works correctly, add a Process Explorer to show the work order lifecycle.

## Phase 4: KPI / PQL Library

Goal:

Prepare copy-paste ready PQL examples for the Celonis View.

Deliverable:

```text
docs/celonis_pql_library.md
```

Example KPIs:

- Open Work Orders
- Overdue Work Orders
- High Priority Overdue Work Orders
- Waiting for Parts
- Reopened Work Orders
- Escalated Work Orders
- Average Resolution Time

## Phase 5: Optional Action Flow Demo

Goal:

Add a simple action from the Celonis View to demonstrate the path from insight to action.

Recommended first action:

```text
Escalate Work Order
```

Input fields:

- work_order_id
- priority
- asset_id
- due_date

Potential execution targets:

- webhook.site test endpoint
- hosted mock API
- approved MuleSoft endpoint
- approved internal test endpoint

Important limitation:

Celonis Cloud cannot call a local `localhost` API directly. A public or approved endpoint is required.

Minimum acceptable version:

If real Action Flow execution is blocked by permissions, keep the button/action as a documented future extension and demonstrate the flow using the local mock demo.

## Phase 6: Demo Video

Goal:

Create a 2-3 minute English demo video using screen recording and AI voiceover.

Recommended video structure:

1. Business problem
2. Dashboard overview
3. Action Center filtering
4. Identify high-risk work order
5. Demonstrate escalation action or explain future Action Flow
6. Value summary: from insight to action

Existing deliverable:

```text
docs/demo_script_en.md
```

## Phase 7: Pitch Material

Goal:

Create simple material for internal discussion or future opportunity exploration.

Existing deliverable:

```text
docs/pitch_deck_outline.md
```

Recommended final material:

- one-page solution summary
- architecture diagram
- demo screenshots
- 2-3 minute video
- next-step proposal

## Division of Work: ChatGPT, Codex, and User

### ChatGPT can help with

- demo scope definition
- business story
- data model design
- CSV structure
- PQL/KPI examples
- Celonis step-by-step guide
- troubleshooting based on screenshots
- English demo script
- pitch deck outline
- GitHub documentation updates

### Codex can help with

- code changes
- local demo improvements
- static GitHub Pages version
- data generation scripts
- CSV transformation scripts
- README cleanup
- mock API enhancements
- front-end UI improvements

### User needs to do manually

- log in to Celonis
- upload CSV files
- create Data Pool / Data Model
- configure Activity Table mapping
- create View components
- test Action Flow permissions
- record the final screen demo

## Success Criteria

### Minimum Success

A Celonis View using synthetic Maximo-like work order data shows:

- KPI tiles
- high-risk work order table
- SLA breach visibility
- priority filtering
- Action Center style layout

### Good Success

The demo also includes:

- activity table
- Process Explorer
- clean PQL library
- English voiceover script
- recorded demo video

### Strong Success

The demo additionally includes:

- Action Flow trigger
- external mock API call
- escalation status writeback or simulated writeback
- complete internal presentation material

## Recommended Next Step

The immediate next step is:

```text
Create Celonis-ready CSV files and a Celonis setup guide.
```

After that, upload the files into the Celonis environment and build the first Data Model + View.

Do not start with real Maximo integration or Marketplace packaging. Those should only be considered after the concept demo is accepted and a sponsor or official environment is available.
