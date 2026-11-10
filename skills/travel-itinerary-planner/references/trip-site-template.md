# Reusable trip-site template

Use the local files in `../assets/trip-site/` as the default starting point for a new trip site. Copy the entire directory into the requested output location and adapt it. Open `index.html` directly or serve the directory over HTTP; no package installation is needed. For an existing site, integrate missing features into its existing structure and preserve links, storage identifiers and user data rather than replacing it.

Edit `trip-data.js` with the actual researched plan. Set a unique, stable, non-secret `id` for the trip, keep stable day, event and item IDs on later edits, and replace every fictional template value. User data belongs in the trip's output directory, not in the shared skill or a public source repository. Store no tokens or credentials in these files. Record the source and date of operational facts and label estimates and unknowns. Add links only after verifying their destinations and supported route URL format. When a map is unavailable, retain the explicit pending label.

The template supplies a home hub, date tabs, itinerary cards, task state and details, alternatives, weather and packing checklist, food-to-day selection, review, local persistence and a single-route time calculation. Its calculation requires user-supplied same-day start and end, door-to-door travel times, minimum dwell and buffer; it checks optional last entry and closing times. It is not a multi-stop or multi-option solver. When a task needs several alternatives, multiple entry windows, variable hours, waits before opening, transit ranges, or cross-midnight travel, implement and test those requirements before displaying a result. A changed endpoint must invalidate or update the corresponding route estimates.

Before delivery, run the checklist below with the actual trip data:

1. Verify dates, timezone, anchors, sources, admission rules and travel ranges. Distinguish booked tickets from candidates, and show pending information instead of silently inventing it.
2. Open every main section and date, exercise alternatives, tasks and detail fields, packing progress, food-to-itinerary choice, time calculations and review. Refresh and verify that state survives. Verify current locations, maps and sources match their labels.
3. Compare all required default modules against the actual page and test at phone and desktop widths. Correct clipped or inaccessible controls and empty unintended sections. Preserve user-provided or previously saved data.
4. This starter saves only on the same browser and origin. If remote access or synchronization is requested, implement a suitable authorized backend, access control, migration and conflict/retry handling. Test on independent clients; never claim synchronization from local storage alone.
5. Tell the user which output is available, whether it is local or hosted, and what still needs confirmation. Do not publish unless the task authorizes it.
