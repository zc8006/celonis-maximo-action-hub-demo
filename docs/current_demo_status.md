# Current Demo Status

## Last Updated

Current working status after the Celonis environment build and first upgrade iterations.

## Current Positioning

This project is no longer only a local mock dashboard. A first Celonis environment demo has been built using synthetic Maximo-like work order data.

The current demo direction is:

```text
Monitor -> Analyze Process Flow -> Prioritize Action
```

The demo should be positioned as a Celonis concept demo that shows how maintenance teams can identify high-risk Maximo-like work order exceptions, analyze delay root causes, and prioritize follow-up actions.

It is still not an official IBM product, not a Celonis Marketplace asset, and not a real Maximo integration.

## Celonis Assets Created

### Package

```text
Maximo Work Order Demo Package
```

### View 1

```text
Maximo Work Order Action Hub
```

Current tabs:

```text
Overview
Work Order Process Flow
```

### View 2

```text
Maximo Work Order Action Center
```

Current status: basic table-based Action Center exists, but it still needs the next upgrade.

## Completed Step 1: Overview Upgrade

Status: Done.

The `Overview` tab in `Maximo Work Order Action Hub` has been upgraded from a simple dashboard into a root-cause-oriented work order risk overview.

Current KPI cards:

- Open Work Orders: 15
- Overdue Work Orders: 13
- High Priority Overdue: 9
- Escalated Work Orders: 7
- Waiting for Parts: 3
- Delay-Related Overdue: 12

Current analysis charts:

- Work Orders by Priority
- Work Orders by Location
- Work Orders by SLA Status
- Overdue Work Orders by Delay Reason
- Overdue Work Orders by Failure Code

Business message:

The overview page shows that most open work orders have already breached SLA, and most overdue work orders are related to delay reasons such as technician availability, approval waiting, spare parts, or permit/vendor dependency.

This makes the page more than a basic work order dashboard. It now supports root cause discussion.

## Completed Step 2: Process Flow Upgrade

Status: Done / usable for demo.

The `Work Order Process Flow` tab has been added to the same View.

Component added:

```text
Process Explorer
```

Event log used:

```text
Work Order Activities Event Log
```

The process map now shows a real process-mining style flow with branches after technician assignment.

Observed process flow:

```text
Start
-> Work Order Created
-> Technician Assigned
   -> Work Started
   -> Technician Unavailable
   -> Safety Permit Pending
   -> Waiting For Approval
-> SLA Breached
-> Work Order Escalated
-> End
```

Available KPI Groups in the Process Explorer:

- Case Frequency
- Activity Frequency
- Throughput Time (Avg)
- Throughput Time (Median)
- Throughput Time (Trimmed Mean)

Recommended demo usage:

Start with `Case Frequency` to show the most common paths. If the throughput time view looks good, switch to `Throughput Time (Avg)` to explain where time is spent between activities.

Business message:

This tab demonstrates Celonis-specific process mining capability. It does not only show static work order records. It reconstructs the actual work order lifecycle from event logs and shows where the process branches or gets delayed.

## Current Demo Story

The current story is now stronger than a simple dashboard:

1. `Overview` shows the overall maintenance risk and delay root causes.
2. `Work Order Process Flow` shows the actual process path and delay points.
3. `Action Center` will show the concrete work orders that require follow-up.

Recommended final story:

```text
Monitor risk -> Analyze where the process gets delayed -> Prioritize the work orders that need action
```

## What Is Still Missing

The demo is not finished yet.

The next important upgrade is the Action Center.

## Next Step: Action Center Upgrade

Target:

Upgrade `Maximo Work Order Action Center` from a filtered table into a prioritized action view.

Current problem:

The Action Center is still close to a normal table/filter view.

Expected upgrade:

Rename or position the table as:

```text
Top Risk Work Orders
```

Add or simulate the following business fields:

- Risk Score
- Recommended Action
- Delay Reason
- Priority
- SLA Status
- Escalation Status

Recommended logic:

```text
Critical priority: +40
High priority: +30
SLA breached: +30
Has delay reason: +20
Not escalated: +10
```

Recommended action examples:

| Delay Reason | Recommended Action |
|---|---|
| Waiting for parts | Check spare parts / procurement |
| Waiting for approval | Escalate approval |
| Technician unavailable | Reassign technician |
| Safety permit pending | Follow up permit process |
| Vendor response pending | Contact vendor |
| None | Review work order manually |

Business message:

The Action Center should not only list problematic work orders. It should help the user decide which work orders should be handled first and what the next action should be.

## Optional Future Step: Action Flow

After the Action Center is upgraded, the next optional step is to connect the Action Center to an Action Flow.

Possible action:

```text
Escalate Work Order
```

Possible flow:

```text
Selected work order -> Action Flow -> HTTP/mock endpoint -> escalation created -> status returned
```

This is optional because it depends on Celonis permissions and available endpoints.

## Recording Status

Do not record the final demo yet.

Recommended recording only after:

1. Overview tab is finalized.
2. Process Flow tab is finalized.
3. Action Center is upgraded.
4. Create version is completed.
5. Deploy is completed.

Current recommendation:

Proceed with the Action Center upgrade next.

## Demo Value After Current Upgrade

Before upgrade, the demo looked like a normal work order dashboard.

After the current upgrade, the demo now shows:

- maintenance risk overview
- delay reason analysis
- failure code analysis
- process flow reconstruction from event logs
- branch paths leading to SLA breach and escalation

This is much closer to a Celonis process mining demo.

The remaining gap is action prioritization.
