# Example KPI Logic for Celonis PQL

These are conceptual KPI examples. Field and table names should be adjusted if this is implemented in a real Celonis Data Model.

Assumed table:

`WORK_ORDERS`

## Open Work Orders

```pql
COUNT(
  CASE WHEN "WORK_ORDERS"."STATUS" IN ('Open', 'In Progress', 'Waiting', 'Reopened')
  THEN "WORK_ORDERS"."WORK_ORDER_ID"
  END
)
```

## Overdue Work Orders

```pql
COUNT(
  CASE WHEN "WORK_ORDERS"."SLA_STATUS" = 'Breached'
  THEN "WORK_ORDERS"."WORK_ORDER_ID"
  END
)
```

## High Priority Overdue Work Orders

```pql
COUNT(
  CASE WHEN "WORK_ORDERS"."SLA_STATUS" = 'Breached'
    AND "WORK_ORDERS"."PRIORITY" IN ('High', 'Critical')
  THEN "WORK_ORDERS"."WORK_ORDER_ID"
  END
)
```

## Escalated Work Orders

```pql
COUNT(
  CASE WHEN "WORK_ORDERS"."ESCALATION_STATUS" = 'Escalated'
  THEN "WORK_ORDERS"."WORK_ORDER_ID"
  END
)
```

## Waiting for Parts

```pql
COUNT(
  CASE WHEN "WORK_ORDERS"."WAITING_REASON" = 'Waiting for parts'
  THEN "WORK_ORDERS"."WORK_ORDER_ID"
  END
)
```

## Average Resolution Time

```pql
AVG(
  DAYS_BETWEEN("WORK_ORDERS"."CREATED_DATE", "WORK_ORDERS"."COMPLETED_DATE")
)
```

## Note

For real process mining analysis, a proper activity table should be created to represent lifecycle events such as:

- Work Order Created
- Work Order Assigned
- Work Started
- Waiting for Parts
- Work Completed
- Work Closed
- Work Reopened

This would allow throughput-time and variant analysis instead of only record-level KPI reporting.
