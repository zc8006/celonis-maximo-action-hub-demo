# Celonis PQL Library

This document provides starter PQL formulas for the first Celonis View.

Adjust table and column names if your Celonis environment changes the uploaded names.

Assumed table:

```text
WORK_ORDERS
```

## 1. Total Work Orders

```pql
COUNT_TABLE("WORK_ORDERS")
```

## 2. Open Work Orders

```pql
COUNT(
  CASE
    WHEN "WORK_ORDERS"."STATUS" IN ('Open', 'In Progress', 'Waiting', 'Reopened')
    THEN "WORK_ORDERS"."WORK_ORDER_ID"
  END
)
```

## 3. Overdue Work Orders

```pql
COUNT(
  CASE
    WHEN "WORK_ORDERS"."SLA_STATUS" = 'Breached'
    THEN "WORK_ORDERS"."WORK_ORDER_ID"
  END
)
```

## 4. High Priority Overdue Work Orders

```pql
COUNT(
  CASE
    WHEN "WORK_ORDERS"."SLA_STATUS" = 'Breached'
      AND "WORK_ORDERS"."PRIORITY" IN ('High', 'Critical')
    THEN "WORK_ORDERS"."WORK_ORDER_ID"
  END
)
```

## 5. Escalated Work Orders

```pql
COUNT(
  CASE
    WHEN "WORK_ORDERS"."ESCALATION_STATUS" = 'Escalated'
    THEN "WORK_ORDERS"."WORK_ORDER_ID"
  END
)
```

## 6. Waiting For Parts

```pql
COUNT(
  CASE
    WHEN "WORK_ORDERS"."WAITING_REASON" = 'Waiting for parts'
      OR "WORK_ORDERS"."WAITING_REASON" = 'Waiting For Parts'
    THEN "WORK_ORDERS"."WORK_ORDER_ID"
  END
)
```

## 7. Reopened Work Orders

```pql
COUNT(
  CASE
    WHEN "WORK_ORDERS"."STATUS" = 'Reopened'
    THEN "WORK_ORDERS"."WORK_ORDER_ID"
  END
)
```

## 8. Escalation Rate

```pql
COUNT(
  CASE
    WHEN "WORK_ORDERS"."ESCALATION_STATUS" = 'Escalated'
    THEN "WORK_ORDERS"."WORK_ORDER_ID"
  END
)
/
COUNT_TABLE("WORK_ORDERS")
```

Format suggestion:

```text
Percentage
```

## 9. Average Resolution Time

Use this only if `COMPLETED_DATE` is available and recognized as a date field.

```pql
AVG(
  DAYS_BETWEEN(
    "WORK_ORDERS"."CREATED_DATE",
    "WORK_ORDERS"."COMPLETED_DATE"
  )
)
```

## 10. Action Center Table Filter Condition

Use this logic as a filter concept for the Action Center:

```pql
"WORK_ORDERS"."SLA_STATUS" = 'Breached'
AND "WORK_ORDERS"."PRIORITY" IN ('High', 'Critical')
AND "WORK_ORDERS"."ESCALATION_STATUS" = 'Not Escalated'
```

## 11. Activity Count

Assumed activity table:

```text
WORK_ORDER_ACTIVITIES
```

```pql
COUNT_TABLE("WORK_ORDER_ACTIVITIES")
```

## 12. Number of Escalation Events

```pql
COUNT(
  CASE
    WHEN "WORK_ORDER_ACTIVITIES"."ACTIVITY" = 'Work Order Escalated'
    THEN "WORK_ORDER_ACTIVITIES"."CASE_KEY"
  END
)
```

## Notes

If a formula fails, check:

- table name
- column name
- data type
- whether uploaded CSV column names were automatically changed
- whether date columns are recognized as date fields

Start with simple `COUNT_TABLE` formulas first. Add more complex formulas only after the View works.
