<!--
  Sync Impact Report
  ==================
  Version change: 0.0.0 (template) → 1.0.0 (initial ratification)
  Modified principles: N/A (initial creation)
  Added sections:
    - I.   Reliability First (Graceful Degradation)
    - II.  Locale-Aware Number Handling
    - III. Storage Hygiene
    - IV.  Privacy-First
    - V.   DOM Safety (No innerHTML)
    - VI.  DRY — Single Source of Truth
    - VII. Progressive Enhancement (Cached Rates)
    - VIII.User-Initiated Side Effects
    - Known Critical Issues (codified)
    - Technology Constraints
    - Development Workflow
  Removed sections: N/A
  Templates requiring updates:
    ✅ plan-template.md — Constitution Check section references principles; no update needed (generic gate)
    ✅ spec-template.md — No constitution-specific content to update
    ✅ tasks-template.md — No constitution-specific content to update
  Follow-up TODOs: None
-->

# Convertly Constitution

## Core Principles

### I. Reliability First (Graceful Degradation)

The extension MUST remain functional even when external services are
unavailable. All network-dependent features MUST degrade gracefully:

- Rate fetching MUST implement a fallback provider chain. Yahoo Finance
  is the primary source; at least one secondary provider (e.g.,
  Frankfurter, ExchangeRate-API) MUST be configured so that a Yahoo
  outage does not brick the converter.
- Cached rates MUST always be preferred over blocking on a network
  request. A stale rate is better than no rate.
- Every `fetch()` call MUST have a timeout and a `catch` path that
  returns a meaningful fallback or user-facing error message.
- The popup and tooltip MUST render immediately from cache; fresh
  rates are fetched silently in the background (stale-while-revalidate).

**Rationale**: A currency converter that stops working when an API has
a hiccup is unusable for travelers and shoppers who rely on it
in real time.

### II. Locale-Aware Number Handling

Number parsing and formatting MUST correctly handle international
conventions, not just US English:

- The parser MUST distinguish EU/Arabic decimal commas (`1.250,50`)
  from US grouping commas (`1,250.50`) by analysing separator
  positions before stripping.
- Formatted output MUST respect the user's chosen locale for
  thousands separators and decimal points.
- All currency-symbol detection regex patterns MUST account for
  RTL markers, non-breaking spaces, and Arabic-Indic digits
  (`٠-٩`).
- Every new number format support case MUST include a test input
  (documented inline or in a test harness) proving correct parsing.

**Rationale**: The extension explicitly supports Arabic and European
users; incorrect number parsing silently corrupts every conversion.

### III. Storage Hygiene

`chrome.storage.sync` and `chrome.storage.local` serve different
purposes and MUST NOT be used interchangeably:

- **`sync` storage**: Configuration-only (preferences, selected
  currencies, theme, locale). Payload per key MUST stay well under
  the 8 KB `QUOTA_BYTES_PER_ITEM` limit.
- **`local` storage**: All data payloads (history, rate cache,
  session state). The 5 MB budget allows larger arrays.
- History arrays MUST NEVER be written to `sync` storage.
- Every `storage.set()` call MUST validate the payload size will not
  exceed quota before writing; if it would, the oldest entries MUST
  be evicted.

**Rationale**: Exceeding `sync` quota silently drops writes, causing
settings loss. Mixing concerns makes debugging quota errors nearly
impossible.

### IV. Privacy-First

Convertly MUST NOT make any external network requests except to the
configured exchange-rate API(s):

- No analytics, telemetry, or tracking scripts of any kind.
- No external font loading from content scripts. Google Fonts or
  any other CDN stylesheet MUST NOT be injected into visited pages.
  Fonts for the popup MUST be bundled locally or use system fonts.
- `host_permissions` in the manifest MUST list only the rate-API
  domains; no wildcards beyond `<all_urls>` for content script
  matching.
- All user data stays in the browser via `chrome.storage`. No data
  is transmitted to any server other than the rate-API GET requests.

**Rationale**: Browser extension users are especially sensitive to
privacy. AMO and Chrome Web Store reviewers flag unnecessary network
calls.

### V. DOM Safety (No innerHTML)

All DOM mutations MUST use safe APIs. `innerHTML`, `outerHTML`, and
`document.write` are strictly prohibited:

- Use `document.createElement`, `textContent`, `appendChild`,
  `insertAdjacentElement`, or the DOM `classList` / `style` APIs.
- Template literals MUST NOT be assigned to `.innerHTML` — use
  a helper that creates elements programmatically instead.
- This rule applies to **all** JS files: `content.js`, `popup.js`,
  and any shared modules.

**Rationale**: Firefox AMO rejects extensions that use `innerHTML`
due to XSS risk. Enforcing this across both builds avoids divergent
code paths.

### VI. DRY — Single Source of Truth

Shared logic MUST exist in exactly one location and be imported or
loaded from there:

- Utility functions (e.g., `guessLocalCurrency()`, `solveMath()`,
  `parseAmount()`) MUST live in shared modules under `src/` and
  MUST NOT be duplicated across `content.js`, `popup.js`, or
  `background.js`.
- Constants (e.g., `YAHOO_SYMBOLS`, currency lists) MUST be defined
  once. If a constant is needed in multiple contexts, it MUST be
  extracted to a shared file.
- When adding a new utility, search the codebase for existing
  implementations before writing a new one.

**Rationale**: Duplicated `guessLocalCurrency()` across 3 files has
already caused desync bugs. Single-source utilities are easier to
fix and test.

### VII. Progressive Enhancement (Cached Rates)

The UI MUST never block on a network request:

- On popup open: display cached rates instantly, show a subtle
  refresh indicator, then update silently when fresh rates arrive.
- On content-script tooltip: use the last-known cached rate. If no
  cache exists at all, show "Rate unavailable" rather than spinning
  indefinitely.
- The service worker MUST pre-warm the cache on `onInstalled` and
  `onStartup` so that the very first popup open after browser launch
  is instant.
- Service-worker in-memory cache MUST be backed by
  `chrome.storage.local` to survive worker termination (Manifest V3
  ephemeral workers).

**Rationale**: Users expect instant results from a tooltip converter;
any loading state defeats the purpose of the extension.

### VIII. User-Initiated Side Effects

Persistent side effects (history writes, storage mutations) MUST
only occur in response to deliberate user actions:

- Highlighting / selecting text on a page and seeing a tooltip is
  a **read-only preview**. It MUST NOT write to history or archive.
- History MUST only be saved when the user explicitly clicks a
  "Save" / "Pin" action, or performs a conversion from the popup
  calculator.
- `bridgeOnPageToPopup` MAY update transient popup-prefill state
  in `sync` storage, but MUST NOT trigger `archiveManualEntry` or
  `saveToHistory`.

**Rationale**: Automatic history logging on every text selection
floods the history with noise and degrades the feature's usefulness.

## Known Critical Issues

These issues are documented violations of the principles above and
MUST be resolved before any new feature work begins:

| # | Issue | Violates | Location |
|---|-------|----------|----------|
| 1 | `solveMath()` ignores operator precedence (BODMAS) | II | `popup.js` / `content.js` |
| 2 | `_lastProviderTimestamp` referenced before declaration | General JS | `popup.js` |
| 3 | Chrome manifest uses single `icon.png` for all sizes | Best Practice | `platforms/chrome/manifest.json` |
| 4 | Yahoo Finance is the sole API — no fallback | I, VII | `background.js` |
| 5 | `guessLocalCurrency()` duplicated across 3 files | VI | `background.js`, `content.js`, `popup.js` |
| 6 | `PAL` currency code missing from `YAHOO_SYMBOLS` | I | `background.js` |
| 7 | Google Fonts loaded on every page via content script | IV | `content.js` |
| 8 | `bridgeOnPageToPopup` saves to history on every highlight | VIII | `background.js` |

## Technology Constraints

- **Language**: Vanilla JavaScript (ES2020+). No bundler, no
  transpiler, no npm dependencies at runtime.
- **Manifest**: V3 for both Chrome and Firefox.
- **Platforms**: Chrome (Chromium) and Firefox (Gecko ≥ 120).
- **Project layout**:
  - `src/` — shared files (popup.html, styles.css, background.js,
    images).
  - `platforms/chrome/` — Chrome-specific manifest and overrides.
  - `platforms/firefox/` — Firefox-specific manifest and overrides.
- **CI**: GitHub Actions assembles platform ZIPs from `src/` +
  `platforms/<browser>/`, resizes icons as needed.
- **Math evaluation**: `solveMath()` MUST implement correct BODMAS
  precedence. `eval()` and `Function()` constructors are banned.
- **Versioning**: Semantic Versioning (`MAJOR.MINOR.PATCH`).
  Manifest `version` is managed by release-please.

## Development Workflow

### Code Quality Gates

Every pull request MUST satisfy:

1. **No `innerHTML`** — grep check: `innerHTML|outerHTML|document\.write`
   MUST return zero matches in JS files.
2. **No duplicated utilities** — shared functions MUST exist in
   exactly one file under `src/`.
3. **No external resource loading in content scripts** — no CDN
   links, no remote font imports, no analytics tags.
4. **Storage separation** — `sync` for config, `local` for data.
   PRs adding `storage.sync.set` with array payloads MUST be
   rejected.
5. **Manifest completeness** — both `platforms/chrome/manifest.json`
   and `platforms/firefox/manifest.json` MUST list correctly sized
   icon assets.

### Amendment Procedure

1. Propose the change as a PR modifying this file.
2. The PR description MUST state which principle is added, removed,
   or modified and the rationale.
3. Version bump follows semantic versioning (see Governance below).
4. All dependent templates (plan, spec, tasks) MUST be reviewed for
   alignment before merging.

### Compliance Review

Before each release, verify:

- [ ] All 8 principles are respected in the current codebase.
- [ ] Known Critical Issues table is updated (resolved items removed,
      new items added).
- [ ] `CHANGELOG.md` reflects principle-related fixes.

## Governance

This constitution is the authoritative source of development
standards for Convertly. It supersedes ad-hoc decisions and
one-off code comments.

- **Amendments** require a documented PR with rationale (see
  Development Workflow above).
- **Versioning** follows SemVer:
  - MAJOR: principle removed or fundamentally redefined.
  - MINOR: new principle or section added.
  - PATCH: clarification, typo, or wording refinement.
- **Compliance**: every PR review MUST include a check against
  the Core Principles. Violations MUST be flagged and resolved
  before merge.

**Version**: 1.0.0 | **Ratified**: 2026-03-21 | **Last Amended**: 2026-03-21
