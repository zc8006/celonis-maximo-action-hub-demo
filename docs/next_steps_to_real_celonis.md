# Next Steps Toward a Real Celonis PoC

This local demo is only a concept. To move toward a real Celonis PoC, the following steps would be required.

## 1. Confirm ownership and environment

- Identify an internal sponsor.
- Confirm whether a Celonis tenant is available.
- Confirm whether Maximo data can be used.
- Confirm security and data-sharing rules.

## 2. Validate the business use case

Interview a maintenance or Maximo SME to confirm:

- What is the most painful work order exception?
- What does SLA breach mean in their context?
- Which fields are needed for prioritization?
- Who should receive escalations?
- What system should receive the follow-up action?

## 3. Validate data availability

Check whether the following data is available:

- work order ID
- asset ID
- location
- priority
- status
- created date
- due date
- completed date
- technician
- failure code
- waiting reason
- update history / status changes

## 4. Define the Celonis data model

Start with a simple case-centric model:

- Case table: Work Orders
- Activity table: Work Order lifecycle events
- Master data: Asset, Location, Technician

## 5. Build the first Celonis View

Minimum View pages:

- Overview
- SLA & Backlog Monitor
- Action Center

## 6. Configure one Action Flow

First Action Flow:

- Input: work order ID, priority, asset ID, due date
- Action: send HTTP request to mock or approved API endpoint
- Output: escalation status
- Writeback: update status table or send notification

## 7. Prepare demo video

Use:

- screen recording
- AI English voiceover
- subtitles
- 2-3 minute script

## 8. Decide whether to continue

After the concept demo, decide whether to continue based on:

- sponsor interest
- available environment
- available data
- integration feasibility
- business value
