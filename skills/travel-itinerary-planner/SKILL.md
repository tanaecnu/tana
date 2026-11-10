---
name: travel-itinerary-planner
description: Plan or revise travel itineraries around fixed appointments, transport and personal preferences, using current sources and time-space constraints. By default, deliver a mobile-friendly interactive trip website with itinerary, maps, packing and review.
---

# Travel itinerary planner

Create a usable trip plan from the traveler's real time windows and preferences. For a new trip-planning request, deliver a responsive interactive trip website by default, alongside a concise summary. Honor an explicit request for another format, a narrower scope, or advice only. For edits to an existing trip, change the requested parts and retain the site and saved data. Keep personal trip details out of reusable templates.

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

For the default trip website, include a packing list and weather context. If editing a list, inspect existing packing lists and keep user-entered checkmarks and notes. Use a dated forecast for the destination and trip dates, identify its issue time and forecast horizon, acknowledge long-range uncertainty, and point to a live source for a closer check. For trips beyond reliable forecast horizons, use clearly identified seasonal climate information. Translate weather and activities into a concise clothing-layer plan and specific quantities, distinguishing worn items from packed items and avoiding duplicated lists. Include meeting equipment, tickets and identifiers only where relevant; respect travel mode and personal needs.

## Default interactive trip website

For a new itinerary, copy and adapt the reusable [trip-site template](references/trip-site-template.md) as the default starting point. Follow its customization and delivery checklist. Do not reuse personal data from prior trips. Create working mobile-first HTML with a compact home hub and clearly connected sections for the daily itinerary, packing list, food recommendations and trip review. Use the existing project design when editing. Otherwise use a calm travel-journal style: spacious cards, a restrained teal palette, rounded corners, readable Chinese typography, strong information hierarchy and accessible touch controls. Keep the design responsive and printable.

Implement these behaviors in the default deliverable:

- Daily navigation shows dates, fixed commitments and chronological route cards. Each transfer displays origin, destination, mode, realistic duration range and a map route when verified. Provide practical alternatives with clear switching conditions and show the relevant option alongside the corresponding time window.
- Place booking, reservation and guide options next to the relevant activity. Track both desired and completed states, with editable saved details for the booking or contact. Display those details alongside the relevant itinerary step.
- Provide a weather-informed, categorized packing checklist with quantities, progress and local persistence. Include an editable weather recheck reminder.
- Recommend relevant food at sensible times with map destinations and allow a selected item and editable time to appear in the corresponding daily itinerary.
- For constrained time windows, offer an adjustable comparison of alternatives with actual start, departure time, minimum dwell, next destination, deadline and applicable admission times. Clearly indicate estimates, inputs and uncertainties. Recalculate from matching door-to-door route estimates; do not assume an unknown endpoint or invent a fixed deadline.
- Provide optional daily satisfaction and notes, plus planned-versus-actual travel times when recorded. Show a useful next-step summary when time, location and itinerary inputs are sufficiently known; label schedule assumptions and time zone.
- Keep user selections, notes and booking information across refreshes. Provide usable local HTML, and distinguish local-only storage from actual hosted synchronization. Retain earlier saved fields and notes when revising an existing site.

Use only relevant features for the trip. Keep inputs editable and optional where information is unknown. Test core navigation, maps, itinerary selection, checklists, persistence and mobile layout; clearly report any unsupported function or verification limit.

Give map directions only with verified endpoints and a documented, appropriate map URL. Distinguish a destination search from a route with both endpoints. State mode and whether durations are estimates or live. If a user changes an endpoint, recalculate with a reliable route service or ask for the matching travel times before showing a comparison.

If cross-device synchronization is requested, use the existing authorized deployment and access model when practical. Design per-field or conflict-aware persistence so concurrent edits, retries, refreshes, checkbox changes, imports and offline work do not silently erase data. Preserve existing records and offer an explicit migration path from local storage. Show actual synchronization state and surface failures. Never claim sync based solely on a successful HTTP response without checking application success. Test independent clients, local-to-hosted migration and failure or retry behavior. A private or bearer-link site must protect both page data and API, and any change to its audience follows the user's authorization and host access checks. Never embed another trip's token, account, endpoints, content or records in reusable assets.

Publish or modify a hosted site only when authorized by the user's request and applicable access checks. Verify the actual deployment and access behavior. Disclose if an existing local-only plan must be imported, if login or a bearer link is required, and what the link holder can do.

Keep ratings and feedback optional; access to the itinerary must not depend on completing them.
