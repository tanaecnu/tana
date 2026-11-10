---
name: travel-itinerary-planner
description: Plan or revise travel itineraries around fixed appointments, transport and personal preferences, using current sources and time-space constraints. Also supports optional packing lists and interactive trip websites.
---

# Travel itinerary planner

Create a usable trip plan from the traveler's real time windows and preferences. Follow the requested output format and scope. Use prior plans as a design reference when supplied, and keep personal trip details out of reusable templates.

## Establish constraints

- Extract known dates, local time zone, origin and destination, train or flight details, accommodations, fixed events and any return deadline. Distinguish confirmed information, estimates and assumptions.
- Ask together for only the missing information that materially changes feasibility: the earliest time and precise place the traveler can leave, the next fixed commitment's latest arrival and exact entrance, acceptable modes and walking limits, baggage and accessibility needs, minimum useful visit duration, preferences and previous visits. Accept ranges for uncertain meeting end times. Continue independent research while waiting.
- Keep user-provided locations and schedules as ground truth, without assuming a venue's campus, hotel branch, station, train number, or arrival time. Verify in context or label as unconfirmed. A trip with no next deadline needs no invented return deadline.

## Find and evaluate options

Research current, relevant local guides and recent firsthand reports for candidate places, distinctive routes, seasonality and practical observations. Preserve the source title, link, publication or observation date and the detail borrowed. Confirm operational facts using official venue, transport and weather sources where available; flag conflicting or stale information and avoid presenting an unverified future timetable, reservation, availability or forecast as confirmed. Respect source copyright.

Start with the user's feasible windows rather than a list of popular attractions. Group nearby points, include realistic door-to-door transfer, walking, station exits, bag storage, meals, queues and personal buffers, and avoid unnecessary return trips. Provide alternatives that differ in a meaningful way, such as late finish, weather, walking demand or interest. Explain why each fits and show the tradeoffs.

Use time-geography concepts pragmatically: capabilities include mobility, walking tolerance and luggage; coupling includes scheduled meetings and tickets; authority includes entry, reservation and access rules. For each candidate calculate earliest arrival and, where applicable, latest departure for the next commitment. At a minimum:

- Available activity time = next deadline − departure time − outbound travel − onward travel − fixed transfers, waiting and buffers.
- Apply each attraction's opening, last-admission and closing times separately. For multi-stop routes, verify every stop in sequence and allow internal transfers and minimum useful dwell time. For an open-ended final leg, report timing without manufacturing a finite deadline.
- Compare optimistic and conservative plausible durations, showing the input assumptions, where uncertainty enters, and whether enough time remains for the user's minimum visit. A closing museum can limit indoor time while adjacent outdoor walking remains possible. Calculate slack as deadline minus the earliest feasible next-stop arrival after required dwell; show negative slack when late.
- For unknown or changed endpoints, request or obtain matching door-to-door travel estimates. Do not use estimates for another origin or destination as current results. Plans are indicative, and departure-day routing and venue notices govern.

Present routes in chronological order with real dates, precise start and end points, transport, estimated ranges, visit durations, reservation or ticket actions, return buffer and source links. Identify critical decisions and failure alternatives. Reference network guides for inspiration and corroborate operational claims separately.

## Packing and weather

When requested, inspect existing packing lists and keep user-entered checkmarks and notes. Use a dated forecast for the destination and trip dates, identify its issue time and forecast horizon, acknowledge long-range uncertainty, and point to a live source for a closer check. For trips beyond reliable forecast horizons, use clearly identified seasonal climate information. Translate weather and activities into a concise clothing-layer plan and specific quantities, distinguishing worn items from packed items and avoiding duplicated lists. Include meeting equipment, tickets and identifiers only where relevant; respect travel mode and personal needs.

## Interactive website, when requested

Preserve the prior site's style and working features. Keep daily routes, confirmed booking details, actionable checklists and food options near the corresponding activities. Useful optional features include editable notes, selected-food-to-itinerary links, an adjustable feasibility comparison, time stamps, satisfaction and retrospective notes. Mark all prefilled inputs and sample values, persist user changes and maintain compatibility with earlier saved data.

Give map directions only with verified endpoints and a documented, appropriate map URL. Distinguish a destination search from a route with both endpoints. State mode and whether durations are estimates or live. If a user changes an endpoint, recalculate with a reliable route service or ask for the matching travel times before showing a comparison.

If cross-device synchronization is requested, use the existing authorized deployment and access model when practical. Design per-field or conflict-aware persistence so concurrent edits, retries, refreshes, checkbox changes, imports and offline work do not silently erase data. Preserve existing records and offer an explicit migration path from local storage. Show actual synchronization state and surface failures. Never claim sync based solely on a successful HTTP response without checking application success. Test independent clients, local-to-hosted migration and failure or retry behavior. A private or bearer-link site must protect both page data and API, and any change to its audience follows the user's authorization and host access checks. Never embed another trip's token, account, endpoints, content or records in reusable assets.

Publish or modify a hosted site only when authorized by the user's request and applicable access checks. Verify the actual deployment and access behavior. Disclose if an existing local-only plan must be imported, if login or a bearer link is required, and what the link holder can do.

When requested, enable a lightweight retrospective: planned versus actual transfer times, a daily satisfaction score and short notes about what worked or should change. Avoid tying essential itinerary access to ratings or optional feedback.
