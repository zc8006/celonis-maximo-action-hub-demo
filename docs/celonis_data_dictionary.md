# Celonis Data Dictionary

This document explains the synthetic CSV files prepared for the first Celonis environment demo.

## Files

- `data/celonis/WORK_ORDERS.csv`
- `data/celonis/WORK_ORDER_ACTIVITIES.csv`

## WORK_ORDERS

Purpose: case-level work order information. Each row is one work order.

Recommended role in Celonis: case table or dimension table.

Primary key: `WORK_ORDER_ID`

Columns:

- `WORK_ORDER_ID`: unique work order ID, for example `WO-10001`
- `ASSET_ID`: asset identifier, for example `AST-1002`
- `ASSET_NAME`: asset name, for example `Cooling Tower Fan`
- `LOCATION`: plant or location
- `PRIORITY`: work order priority, such as `Low`, `Medium`, `High`, or `Critical`
- `STATUS`: current work order status
- `CREATED_DATE`: work order creation date
- `DUE_DATE`: SLA due date
- `COMPLETED_DATE`: completion date if completed
- `TECHNICIAN`: assigned technician
- `WORK_TYPE`: maintenance work type
- `FAILURE_CODE`: failure category
- `WAITING_REASON`: reason why the work order is waiting
- `SLA_STATUS`: `Breached` or `On Track`
- `ESCALATION_STATUS`: `Escalated` or `Not Escalated`

## WORK_ORDER_ACTIVITIES

Purpose: event log / activity table for process mining. Each row is one event for a work order.

Recommended role in Celonis: activity table / event log.

Relationship:

```text
WORK_ORDER_ACTIVITIES.CASE_KEY -> WORK_ORDERS.WORK_ORDER_ID
```

Activity table mapping:

- Case ID: `CASE_KEY`
- Activity Name: `ACTIVITY`
- Timestamp: `EVENT_TIME`
- Sorting: `SORTING`

Columns:

- `CASE_KEY`: work order ID used as process case key
- `ACTIVITY`: lifecycle event name
- `EVENT_TIME`: timestamp of the activity
- `SORTING`: sort order when timestamps are close
- `ACTIVITY_SOURCE`: source type, currently `Synthetic`
- `ACTIVITY_DETAIL`: extra event detail

## Activity Types

The current synthetic activity table uses activity names such as:

- Work Order Created
- Technician Assigned
- Work Started
- Waiting For Parts
- Waiting For Approval
- Permit Pending
- Vendor Response Pending
- Technician Unavailable
- SLA Breached
- SLA On Track
- Work Completed
- Work Order Escalated

## Notes

This first dataset is intentionally small. It is designed to make the Celonis Data Model and View easier to build and debug.

Once the first version works, the dataset can be expanded or replaced with a more realistic source.
