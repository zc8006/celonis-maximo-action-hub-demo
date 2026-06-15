# Celonis Setup Guide

This guide describes how to build the first Celonis environment demo using the prepared CSV files.

The goal of this first version is to build a simple Celonis Data Model and View. Do not start with real Maximo integration or Action Flow integration yet.

## Target Result

After completing this guide, you should have:

- a Celonis Data Pool
- two uploaded CSV tables
- a Data Model with one case table and one activity table
- a loaded Data Model
- a simple View with KPI tiles and an Action Center table

## Files to Upload

Use these files from the repository:

```text
data/celonis/WORK_ORDERS.csv
data/celonis/WORK_ORDER_ACTIVITIES.csv
```

## Step 1: Create a Data Pool

1. Open Celonis.
2. Go to `Data`.
3. Go to `Data Integration`.
4. Create a new Data Pool.
5. Suggested name:

```text
Maximo Work Order Demo
```

## Step 2: Upload CSV Files

Upload the two prepared CSV files into the Data Pool.

Recommended table names:

```text
WORK_ORDERS
WORK_ORDER_ACTIVITIES
```

If Celonis automatically changes table names, keep the generated names but use them consistently later in the Data Model and PQL.

## Step 3: Create a Data Model

Create a new Data Model.

Suggested name:

```text
Maximo Work Order Data Model
```

Add both tables:

```text
WORK_ORDERS
WORK_ORDER_ACTIVITIES
```

## Step 4: Configure the Activity Table

Set `WORK_ORDER_ACTIVITIES` as the Activity Table.

Map the columns as follows:

```text
Case ID: CASE_KEY
Activity Name: ACTIVITY
Timestamp: EVENT_TIME
Sorting: SORTING
```

## Step 5: Configure the Case Table

Set `WORK_ORDERS` as the case table.

Primary key / case identifier:

```text
WORK_ORDER_ID
```

Relationship:

```text
WORK_ORDER_ACTIVITIES.CASE_KEY -> WORK_ORDERS.WORK_ORDER_ID
```

Conceptually:

```text
One work order has many activities.
```

That means:

```text
WORK_ORDERS = 1 side
WORK_ORDER_ACTIVITIES = N side
```

## Step 6: Load the Data Model

Save the Data Model and run the Data Model load.

If the load succeeds, continue to the View.

If the load fails, check:

- timestamp format in `EVENT_TIME`
- relationship direction
- whether `CASE_KEY` values match `WORK_ORDER_ID`
- whether table names were changed during upload

## Step 7: Create a View

Create a new View based on the loaded Data Model.

Suggested View name:

```text
Maximo Work Order Action Hub
```

## Step 8: Build Page 1 - Work Order Overview

Add KPI tiles:

- Open Work Orders
- Overdue Work Orders
- High Priority Overdue Work Orders
- Escalated Work Orders
- Waiting For Parts

Add charts:

- Work Orders by Priority
- Work Orders by Location
- Work Orders by SLA Status

## Step 9: Build Page 2 - Action Center

Add a table component with these columns:

- WORK_ORDER_ID
- ASSET_NAME
- LOCATION
- PRIORITY
- STATUS
- DUE_DATE
- TECHNICIAN
- WAITING_REASON
- SLA_STATUS
- ESCALATION_STATUS

Add filters:

- Priority
- Status
- SLA Status
- Waiting Reason
- Escalation Status

Recommended first filter scenario:

```text
Priority = High or Critical
SLA Status = Breached
Escalation Status = Not Escalated
```

## Step 10: Optional Process Explorer

If the activity table works correctly, add a Process Explorer component.

Use it to show the work order lifecycle:

```text
Work Order Created -> Technician Assigned -> Work Started -> SLA Breached -> Work Order Escalated
```

## Step 11: Record the Demo

Once the View is ready, record a 2-3 minute screen demo.

Recommended demo flow:

1. Open the View.
2. Explain the business problem.
3. Show the KPI tiles.
4. Open the Action Center.
5. Filter high-priority overdue work orders.
6. Explain that the next step is to connect the action to an Action Flow.
7. Summarize the value: from insight to action.

## What Not To Do in Version 1

Do not start with:

- real Maximo API integration
- real IBM data
- real customer data
- Marketplace packaging
- complex writeback
- advanced Action Flow logic

The first goal is only:

```text
Synthetic data -> Celonis Data Model -> View -> KPI -> Action Center
```
