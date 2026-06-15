# 3-Minute English Demo Script

Hello everyone. This is a short concept demo of a Work Order Action Hub for maintenance operations.

In many maintenance teams, users need to manage a large number of work orders every day. Some work orders are overdue, some are high priority, and some are waiting for parts or approval.

The challenge is not only to see these problems, but also to prioritize them and trigger the next action quickly.

In this demo, we simulate how Celonis could help identify high-risk work order exceptions and trigger an escalation action through an API.

On the overview page, we can see the main KPIs. These include open work orders, overdue work orders, high-priority overdue work orders, and escalated work orders.

These KPIs help the maintenance team understand the current workload and identify potential SLA risks.

Next, we move to the Action Center. This table shows work orders that may need attention. The user can filter the list by overdue work orders, high-priority items, or work orders waiting for parts.

Here we can see a high-priority work order that is already overdue. It includes key information such as work order ID, asset, location, priority, due date, technician, and current status.

Instead of only monitoring the issue, the user can take action directly from the dashboard.

The user clicks the Escalate button.

After the button is clicked, the demo calls a mock external API. In a real project, this API could be connected to IBM Maximo, MuleSoft, ServiceNow, Microsoft Teams, or another enterprise system.

The API returns a success response and creates an escalation ID. The escalation status is then updated on the screen.

Now the user can see that the work order has been escalated successfully.

The value of this demo is simple. It shows how process intelligence can move beyond monitoring. It can help users prioritize exceptions, trigger actions, and track the result.

This creates a closed loop from insight to action.

Thank you.
