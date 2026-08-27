# Community — Phase 2 (out of MVP scope)

The MVP ships static seed content, client-only likes/bookmarks (`localStorage`), and “remix” as **copy config + deep links** (`/playground?from=community&template=…`, `/explorer?…`).

## Planned work

- **Persistence & identity:** Server-backed projects, user accounts, real like/bookmark/remix counts, optional CMS (e.g. Contentful) for curation.
- **Social:** Comments, threaded discussion, creator profiles, follow graph, notifications.
- **Remix v2:** Fork into workspace, versioning, diff/history, merge-back or publish flow; wire Playground/Explorer to consume `template` query (or postMessage) automatically.
- **Analytics:** Instrument `view_project`, `remix_click`, `docs_click`, `copy_config`; creator dashboards.
- **Preview:** Embeds, live Evaluator runs, graph snapshots in project pages.

Track migrations from seed (`lib/community/seed-projects.ts`) when an API exists.
