# Pitch Deck Outline

## Slide 1: Title and Objective

**Title:** Celonis + Maximo Work Order Action Hub Concept Demo  
**Objective:** Demonstrate how work order exceptions can be detected, prioritized, and escalated through a closed-loop workflow.

## Slide 2: Business Problem

Maintenance teams face:

- high work order volume
- overdue critical work orders
- SLA breach risk
- repeated asset failures
- waiting for parts or approval
- manual follow-up across systems

## Slide 3: Proposed Solution

A Celonis-based Action Hub that:

- monitors work order health
- identifies high-risk exceptions
- prioritizes overdue and critical work orders
- triggers follow-up actions
- tracks escalation status

## Slide 4: Architecture

Flow:

Maximo / synthetic data → Celonis-like data layer → dashboard → Action Center → Action Flow simulation → mock API → status writeback

## Slide 5: Demo Flow

1. Open dashboard
2. Review KPIs
3. Filter high-priority overdue work orders
4. Select one work order
5. Click Escalate
6. Mock API creates escalation
7. Status updates on screen

## Slide 6: Value and Next Steps

**Value:**

- shorter response time
- clearer prioritization
- reduced manual follow-up
- better SLA visibility
- closed loop from insight to action

**Next Steps:**

- validate data fields with a Maximo SME
- map to real Maximo work order data
- evaluate Celonis Data Model feasibility
- define Action Flow integration target
- prepare internal PoC if there is sponsor support
