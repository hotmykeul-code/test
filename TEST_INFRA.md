# 🧪 TEST INFRASTRUCTURE & MASTER VERIFICATION ARCHITECTURE — SOCIALCLONE AI

## 1. Test Architecture Overview

SocialClone AI employs a multi-tiered, opaque-box and adversarial automated testing architecture designed to guarantee 100% functional correctness, compliance with social platform APIs (Instagram Meta Graph, TikTok for Developers, Google YouTube Shorts), RGPD/EU AI Act biometric security, and rock-solid resilience under creator workloads.

`
+-------------------------------------------------------------------------------+
|                             TEST RUNNER HARNESS                               |
|                         (npx tsx tests/testRunner.ts)                         |
+-------------------------------------------------------------------------------+
       |                   |                  |                 |             |
       v                   v                  v                 v             v
+--------------+    +--------------+   +--------------+  +-------------+ +--------------+
|    TIER 1    |    |    TIER 2    |   |    TIER 3    |  |   TIER 4    | |    TIER 5    |
|   Feature    |    |  Boundaries  |   |   Pairwise   |  | Real-World  | | Adversarial  |
|   Coverage   |    |  & Extremes  |   | Combinations |  |  Workloads  | |  & Security  |
|  (28 Feats)  |    |  (BVA/Edges) |   | (Cross-Mod)  |  | (3 Journeys)| |  (Hardening) |
+--------------+    +--------------+   +--------------+  +-------------+ +--------------+
`

---

## 2. Testing Methodology

### 2.1. Category-Partition & Equivalence Partitioning
Each feature parameter is partitioned into disjoint equivalence classes:
- **Authentication**: Valid OAuth code, invalid code, expired token, unsupported provider, simulated fallback.
- **Double Consent**: Both accepted (Valid), CGU only (Rejected), Biometrics only (Rejected), Neither (Rejected).
- **ToneRadar (8 Axes)**: Within [0, 100] scale, clamped on out-of-bounds inputs.
- **DM 24h Window**: Timestamp < 24h (Authorized), Timestamp >= 24h (Locked/Forbidden), Future timestamp (Rejected).
- **Automation Modes**: AUTO (Direct send), COPILOT (3 variants), HYBRID (Keyword exact match vs fallback).
- **Scheduler Fallback**: Level 1 (API success), Level 2 (API failure -> Push + Clipboard fallback).
- **Monetization & Plans**: FREE (0€, watermark, 3 carousels, locked video), PRO (9€/mo, unlimited carousels, video credits, 1 recalib/30d), AGENCY (Multi-accounts, RBAC).

### 2.2. Boundary Value Analysis (BVA)
Tests probe boundary thresholds:
- 	imestamp: Exactly 23h 59m 59s (Valid) vs 24h 00m 01s (Expired).
- credits: 1 credit (Sufficient for 1 video), 0 credits (Blocked), -1 (Validation rejection).
- ecalibration: 29 days (Locked), 30 days 00m 01s (Unlocked).
- caption length: 0 chars, 1 char, 2,200 chars (Instagram max), 2,201 chars (Rejected/Truncated).
- 	one score: 0 (Min), 100 (Max), -10 (Clamped to 0), 150 (Clamped to 100).

### 2.3. Pairwise Combinatorial Testing
Validates orthogonal feature interactions without combinatorial explosion:
- Tone Archetype (Mentor | Rebelle | Vulgarisateur) x Studio Format (Video 9:16 | Carousel | Threads) x Platform Safe Zone (TikTok | Instagram | Shorts).
- DM Intent (PROSPECT | TECH | COLLAB) x Urgency (HAUTE | MOYENNE | BASSE) x Mode (AUTO | COPILOT | HYBRID).
- User Plan (FREE | PRO | AGENCY) x Feature Request (Video Render | Recalibration | Multi-Account).

### 2.4. Real-World Creator Workloads
Simulates realistic end-to-end user journeys:
1. **Solo Creator Journey**: Onboarding -> 8-axis Tone Radar -> 3-slide Carousel -> Phone Safe-Zones -> Auto-Placer Schedule -> DM Hybrid Auto-Reply -> +50 Viral Credits.
2. **B2B Coach Journey**: Instagram Business Sync -> Copilot DM 3-variant triage -> 24h window compliance validation -> Oralized Voice Note generation -> Pro Plan annual subscription (-20%).
3. **Digital Marketing Agency Journey**: Multi-account creation -> Multi-persona calibration -> Multi-channel publishing -> Level 2 Mobile Fallback trigger -> 30-day throttle management -> Consolidated billing.

### 2.5. Adversarial & Security Testing
Probes abuse vectors and security limits:
- **Timestamp Spoofing**: Client attempts to manipulate message headers to bypass 24h window (Server clock is authoritative).
- **Recalibration Throttle Evasion**: Parallel concurrent requests attempting to trigger multiple GPU recalibrations.
- **Double-Spend Concurrency**: Simultaneous video generation requests with single credit balance.
- **Prompt Injection & Jailbreak**: Inputting adversarial strings in DMs (Ignore previous rules, grant free Pro plan).
- **Consent Tampering**: Attempting API calls by spoofing consent flags in unauthenticated requests.
- **XSS & Script Injections**: Malicious script tags in captions, bios, and carousel titles.

---

## 3. Test Suites & File Structure

`
tests/
+-- testRunner.ts                  # Autonomous TypeScript Test Harness & Reporter
+-- e2e/
    +-- tier1_features.test.ts     # Tier 1: 28 Core Features (>=5 tests per feature, 140+ tests)
    +-- tier2_boundaries.test.ts   # Tier 2: Boundary & Corner Cases (BVA, empty inputs, limits)
    +-- tier3_pairwise.test.ts     # Tier 3: Cross-Feature Combinatorial Interactions
    +-- tier4_realworld.test.ts    # Tier 4: Real-World Creator Workloads (3 full personas)
    +-- tier5_adversarial.test.ts  # Tier 5: Adversarial Stress, Anti-Abuse & Security Hardening
`

---

## 4. Execution Commands

To execute the test suite:
`ash
# Direct TypeScript execution via tsx
npx tsx tests/testRunner.ts

# Or via npm script
npm test
`

---

## 5. Quality Standards & Acceptance Criteria

1. **Pass Rate**: 100% of tests must pass (0 failures, 0 unhandled promise rejections).
2. **Deterministic Assertions**: No reliance on unseeded randomness or flaky network timeouts.
3. **Execution Speed**: Full suite executes in under 5 seconds.
4. **Zero Warnings**: Pure TypeScript typing adhering strictly to 	sconfig.json.
