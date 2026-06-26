# BIRD 2026–2035 — User Manual

> **Platform Version:** 2026–2035 · **Published by:** BOI-MTIT, BARMM · **Developer:** ASilva Innovations

---

## Table of Contents

1. [Getting Started](#1-getting-started)
2. [Navigation Overview](#2-navigation-overview)
3. [Sign In & Account Setup](#3-sign-in--account-setup)
4. [Creating & Managing Plans](#4-creating--managing-plans)
5. [MEL Dashboard](#5-mel-dashboard)
6. [SWOT Analysis](#6-swot-analysis)
7. [Systems Thinking](#7-systems-thinking)
8. [Strategy Matrix (TOWS)](#8-strategy-matrix-tows)
9. [Balanced Scorecard](#9-balanced-scorecard)
10. [PAPs Management](#10-paps-management)
11. [BIRD AI Strategy Assistant](#11-bird-ai-strategy-assistant)
12. [Templates Library](#12-templates-library)
13. [Team Collaboration](#13-team-collaboration)
14. [Plan Export](#14-plan-export)
15. [Settings](#15-settings)
16. [Troubleshooting](#16-troubleshooting)

---

## 1. Getting Started

### What is BIRD 2026–2035?

BIRD 2026–2035 is a strategic planning platform built for the **Bangsamoro Investment Roadmap Development** — the 10-year investment blueprint for the Bangsamoro Autonomous Region in Muslim Mindanao (BARMM). The platform integrates:

- Real-time KPI monitoring (MEL Dashboard)
- AI-powered SWOT analysis and strategy generation
- Systems thinking with Causal Loop Diagram (CLD) tools
- Balanced Scorecard tracking across 4 perspectives
- PAPs (Programs, Activities, Projects) management
- BIRD AI — an expert AI consultant for BARMM investment strategy

### Minimum Requirements

| Requirement | Specification |
|-------------|---------------|
| Browser | Chrome 100+, Firefox 100+, Safari 16+, Edge 100+ |
| Internet | Required for AI features and cloud sync |
| Screen | 1024×768 minimum (1280×800+ recommended) |
| Mobile | iOS 15+ / Android 10+ |

### Accessing the Platform

Navigate to: **https://asilvainnovations.github.io/barmm-investment-roadmap/**

Or open the installed Progressive Web App (PWA) on your device.

---

## 2. Navigation Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  [≡ Sidebar]  [BIRD 2026–2035 Logo]          [Topbar Controls] │
├────────────┬────────────────────────────────────────────────────┤
│            │                                                    │
│  Sidebar   │            Main Content Area                      │
│  ──────    │                                                    │
│  • MEL     │    (Selected view renders here)                   │
│  • SWOT    │                                                    │
│  • Systems │                                                    │
│  • Strategy│                                                    │
│  • BSC     │                                                    │
│  • PAPs    │                                                    │
│  • ...     │                                           [AI Bot]│
│            │                                                    │
└────────────┴────────────────────────────────────────────────────┘
```

### Sidebar Navigation

| Menu Item | Function | Keyboard |
|-----------|----------|----------|
| MEL Dashboard | Monitor KPIs and plan progress | — |
| SWOT Analysis | Enter and score SWOT items | — |
| Systems Thinking | Build causal loop diagrams | — |
| Strategy Matrix | Generate TOWS strategic options | — |
| Balanced Scorecard | Manage objectives and KPIs | — |
| PAPs Management | Track programs and projects | — |
| Templates Library | Browse and apply plan templates | — |
| Team Collaboration | Invite members and collaborate | — |
| Plan Generator | Export reports | — |
| Settings | Account and preferences | — |
| Guided Tour | Restart the navigation tutorial | — |

**Collapse the sidebar:** Click the ← button at the bottom of the sidebar (desktop only). On mobile, use the ≡ hamburger button in the top bar.

### Topbar Controls

- **Plan selector** (dropdown): Switch between multiple strategic plans
- **Sync status**: Shows cloud sync state (green = synced, amber = offline)
- **Share**: Generate a public share link for your current plan
- **User menu**: Profile, settings, and sign out

---

## 3. Sign In & Account Setup

### Creating an Account

1. Click **Sign In** in the top right or from the landing page
2. Select **Sign up** (below the sign-in form)
3. Enter your **full name**, **email address**, and a **password** (minimum 8 characters)
4. Click **Create Account**
5. Check your inbox for a **verification email** — click the link to activate

> **Magic Link Option:** Enter your email on the sign-in form and click "Send magic link to my email" for password-free access.

### Signing In

1. Enter your registered **email** and **password**
2. Click **Sign In**
3. You will be redirected to your strategic workspace

### Forgot Password

1. On the sign-in form, click **Forgot password?**
2. Enter your email address
3. Click **Send Reset Link**
4. Follow the instructions in the email (check spam folder if not received)

### Completing Your Profile

1. Click your initials/avatar in the top right
2. Select **My Profile**
3. Fill in: Organization, Job Title, Phone Number
4. Upload a profile photo (optional)
5. Click **Save Changes**

---

## 4. Creating & Managing Plans

### Create a New Plan

**Method 1 — From the sidebar:**
1. Click the plan name in the sidebar header
2. Select **+ New Plan** from the dropdown

**Method 2 — From the landing page:**
1. Click **Start Planning** on the landing page
2. A new plan is automatically created

### Plan Fields

| Field | Description |
|-------|-------------|
| Plan Name | Descriptive title (e.g., "BARMM Halal Sector Strategic Plan 2026") |
| Organization | Your agency/department (e.g., "BOI-MTIT, BARMM") |
| Vision Statement | Long-term aspirational goal |
| Mission Statement | How you will achieve the vision |
| Strategic Intent | One-sentence statement of strategic direction |
| Planning Period | Start and end year (e.g., 2026–2035) |

### Switching Plans

- Click the plan selector in the topbar
- Select from the dropdown list

### Importing / Exporting a Plan (JSON)

- **Export:** Topbar → ⋮ → Export Plan Data (downloads JSON file)
- **Import:** Topbar → ⋮ → Import Plan Data (upload a previously exported JSON)

---

## 5. MEL Dashboard

The **Monitoring, Evaluation, and Learning (MEL) Dashboard** is your real-time command center for the BIRD 2026–2035 strategy.

### Panels Overview

**Panel A — Pareto Vital Few KPIs**
Displays 6 headline KPIs derived from the BIRD BSC:
- Ring progress charts show current vs. target
- Status badges: On Track (green), Watch (blue), Behind (amber), Critical (red)
- Tap/click any KPI for details and source data

**Panel B — BSC Leverage Points**
Shows critical leverage points across 4 BSC perspectives (Financial, Stakeholder, Internal Process, Learning & Growth). Each row displays current vs. 2030 and 2035 targets.

**Panel C — Priority Action Plan**
Lists the 10 priority actions for 2026 (Foundation Phase). Filter by:
- Priority (Critical / High / Medium)
- Status (In Progress / Development / Not Started)
- Quarter (Q1–Q4)

**Panel D — Feedback Loop Health Monitor**
Displays active Causal Loops (R1, R2, B1, B2…) from the Systems Thinking layer. Shows activation percentage and health status.

**Panel E — Phase Progress Tracker**
Timeline view of all 3 BIRD implementation phases:
- Phase 1: Foundation Building (2026–2028), ₱35–45B
- Phase 2: Acceleration (2029–2032), ₱50–65B
- Phase 3: Consolidation & Global Integration (2033–2035), ₱35–50B

---

## 6. SWOT Analysis

### Adding SWOT Items

1. Navigate to **SWOT Analysis** in the sidebar
2. Select the quadrant tab: **Strengths | Weaknesses | Opportunities | Threats**
3. Click **+ Add Item**
4. Enter a description of the SWOT item
5. Rate **Impact Score** (1–5) and **Likelihood Score** (1–5)
6. Click **Save**

### AI-Assisted SWOT Generation

1. Click **✨ Generate with BIRD AI**
2. Optionally provide context about your sector or strategic intent
3. Review the AI-generated items
4. Accept, edit, or reject each item individually
5. Accepted items appear in the SWOT grid

### Resilience Index (RI) Scoring

The platform automatically computes Resilience Index scores using BIRD's official methodology:
- **Strengths:** RI = (Impact × Likelihood) / 5
- **Opportunities:** RI = √(Impact × Likelihood)
- **Weaknesses:** Risk Score = Impact × Likelihood
- **Threats:** Vulnerability Index = (Impact × Likelihood) / Control

Items are color-coded by score for quick prioritization.

### Exporting the SWOT

Click **Export SWOT** to download a formatted PDF or Excel summary.

---

## 7. Systems Thinking

The Systems Thinking workspace enables you to build **Causal Loop Diagrams (CLDs)** and apply **Systems Archetypes** from the BIRD 2026–2035 framework.

### Building a Causal Loop Diagram

**Adding nodes:**
1. Click **+ Add Node** (or double-click the canvas)
2. Enter the variable name (e.g., "Investment Approvals", "BHB Certification Quality")
3. Drag nodes to position them on the canvas

**Adding links:**
1. Hover over a node until you see the connector point
2. Drag to another node to create a causal link
3. Set polarity: **+** (reinforcing) or **–** (counteracting)

**Detecting loops:**
- The system automatically detects **Reinforcing (R)** and **Balancing (B)** loops
- Loops are highlighted with directional arrows

### Systems Archetypes Library

Browse 7 pre-built archetypes from the BIRD 2026–2035 framework:

| Archetype | BARMM Context |
|-----------|---------------|
| Fixes that Fail | Agricultural subsidy dependency |
| Shifting the Burden | Donor funding undermining autonomous revenue |
| Success to the Successful | Mainland vs. island province disparity |
| Growth & Underinvestment | Investment surge outpacing infrastructure |
| Escalation | Clan/political competition dynamics |
| Big Man | Patronage politics constraining governance |
| Tragedy of the Commons | Fragmented watershed/fishery governance |

Click **Apply Archetype** to add a template CLD to your canvas.

### Leverage Point Analysis

1. After building your CLD, click **Analyze Leverage Points**
2. BIRD AI ranks interventions using Meadows' 12 leverage levels (L1–L12)
3. Results are mapped to TOWS quadrants for strategic action

---

## 8. Strategy Matrix (TOWS)

The Strategy Matrix generates **SO, ST, WO, WT strategic options** from your SWOT data.

### Generating Strategies

**Manual:**
1. Navigate to **Strategy Matrix**
2. Click **+ Add Strategy** in any quadrant (SO / ST / WO / WT)
3. Enter title, description, priority (1–5), and feasibility (1–5)

**AI-Assisted:**
1. Ensure your SWOT is populated (at least 2 items per quadrant)
2. Click **✨ Generate Strategies with BIRD AI**
3. Review and accept/edit generated options

### Strategy Quadrants

| Quadrant | Meaning | Action |
|----------|---------|--------|
| SO | Strengths + Opportunities | Use strengths to exploit opportunities |
| ST | Strengths + Threats | Use strengths to mitigate threats |
| WO | Weaknesses + Opportunities | Overcome weaknesses via opportunities |
| WT | Weaknesses + Threats | Minimize weaknesses and avoid threats |

### Selecting Strategies

- Check the ✓ box on strategies you want to include in your plan
- Selected strategies flow into the **Balanced Scorecard** as linked objectives

---

## 9. Balanced Scorecard

The BSC translates your vision and strategies into measurable objectives across 4 perspectives.

### Adding Objectives

1. Navigate to **Balanced Scorecard**
2. Click **+ Add Objective** in any perspective panel
3. Fill in: Objective name, Description, Weight (1.0–2.0)
4. Link to a strategic option (from Strategy Matrix) if applicable

### Adding KPIs to an Objective

1. Expand an objective by clicking it
2. Click **+ Add KPI**
3. Fill in: KPI name, Unit of measurement, Baseline value, 2030 target, 2035 target
4. Set frequency (monthly / quarterly / annually)

### BIRD Pre-loaded KPIs

The platform includes all official BIRD 2026–2035 KPIs pre-loaded in the MEL Dashboard. Reference these when creating your own plan objectives:

- **F1–F5**: Financial perspective KPIs
- **S1–S4**: Stakeholder perspective KPIs
- **IP1–IP7**: Internal Process KPIs
- **LG1–LG4**: Learning & Growth KPIs

---

## 10. PAPs Management

### Adding a PAP

1. Navigate to **PAPs Management**
2. Click **+ Add PAP**
3. Fill in:
   - Name and type (Program / Activity / Project)
   - Linked BSC Objective
   - Description and strategic intent
   - Budget estimate (₱PHP)
   - Duration (months)
   - BEIE Cluster (Foundations / Transformers / Enablers / Connectors / Financiers)
   - BIRD Phase (1, 2, or 3)
   - Lead and support agencies
4. Click **Save**

### Tracking Status

Update PAP status from the Kanban view:
- **Planned** → **In Progress** → **Completed**
- Mark as **Delayed** if behind schedule

### Budget Summary

The dashboard automatically totals:
- Budget by PAP type (Program / Activity / Project)
- Budget by BEIE cluster
- Budget by BIRD phase

---

## 11. BIRD AI Strategy Assistant

BIRD AI is your embedded investment and strategy consultant, available on every page via the floating button (bottom-right corner).

### Opening BIRD AI

- Click the **BIRD AI** button in the bottom-right corner of any page
- The chat panel opens with contextual suggestions for your current workspace

### Example Queries

**MEL Dashboard:**
- "Why is BARMM's GRDP growing slower than the PDP 5% target?"
- "Which Phase 1 milestones are most time-critical in 2026?"

**SWOT Analysis:**
- "Draft 3 SWOT strengths for BARMM's halal sector"
- "What is the Resilience Index formula used in BIRD scoring?"

**Systems Thinking:**
- "Explain the 'Fixes that Fail' archetype in BARMM's agriculture sector"
- "Which Meadows leverage point has the highest impact for BARMM?"

**Strategy Matrix:**
- "Suggest 3 SO strategies for BARMM's halal tourism opportunity"
- "How should BARMM respond to Malaysia's halal hub competition?"

**Balanced Scorecard:**
- "What are the 4 BSC perspectives applied in BIRD 2026–2035?"
- "Explain the F4 Green Economy Revenue objective"

### Tips for Better Results

- Be specific: mention provinces, sectors, KPI codes (F1, LP2, etc.)
- Use BIRD terminology: BEIE clusters, leverage points, archetypes
- Ask for drafts: "Draft a PAP for the Bangsamoro Halal Park"
- Ask for analysis: "Analyze the Growth & Underinvestment archetype for BARMM's energy sector"

---

## 12. Templates Library

### Browsing Templates

1. Navigate to **Templates Library**
2. Browse by category: Investment Plan / Sector Plan / Monitoring Framework
3. Click a template card to preview its contents

### Applying a Template

1. Click **Use Template** on the desired template
2. The plan structure (SWOT, strategies, objectives, PAPs) is applied to a new plan
3. Customize the content for your specific context

### Creating a Custom Template

Save your current plan as a template for reuse by other team members (Admin/Owner roles only).

---

## 13. Team Collaboration

### Inviting Team Members

1. Navigate to **Team Collaboration**
2. Click **+ Invite Member**
3. Enter the email address
4. Select a role: **Admin** / **Editor** / **Viewer**
5. Click **Send Invitation**

### Roles & Permissions

| Role | Create Plans | Edit Plans | Invite Members | Delete Plans |
|------|:---:|:---:|:---:|:---:|
| Owner | ✓ | ✓ | ✓ | ✓ |
| Admin | ✓ | ✓ | ✓ | — |
| Editor | — | ✓ | — | — |
| Viewer | — | — | — | — |

### Comments & Activity Log

- Add comments to any SWOT item, objective, or PAP by clicking **💬 Comment**
- View all activity in the **Activity Log** tab
- Resolve comments by clicking **✓ Resolve**

### Real-Time Presence

When multiple team members are in the same plan, colored avatar indicators show who is online and what section they are viewing.

### Sharing a Plan (Public View)

1. Click **Share** in the topbar
2. Click **Generate Share Link**
3. Copy and share the link — recipients can view (not edit) without an account
4. To revoke access, click **Revoke Link**

---

## 14. Plan Export

### Exporting to PDF

1. Navigate to **Plan Generator** (Export)
2. Select **PDF Report**
3. Choose sections to include (Cover, Executive Summary, SWOT, Strategies, BSC, PAPs, etc.)
4. Click **Generate PDF**
5. The download starts automatically

### Exporting to Word (.docx)

1. Select **Word Document**
2. Choose the template style (Formal / Compact)
3. Click **Generate Word Document**

### Exporting to Excel (.xlsx)

1. Select **Excel Spreadsheet**
2. Choose sections (KPI tracking, PAP budget, SWOT scores)
3. Click **Generate Spreadsheet**

### Print View

Enable print view for any workspace by pressing `Ctrl+P` / `Cmd+P` — the platform is print-optimized.

---

## 15. Settings

### Profile Settings
- Update name, organization, job title, phone, and avatar
- Change email address (requires re-verification)

### Password & Security
- Change password
- View active sessions

### Notification Preferences
Toggle notifications for:
- Welcome emails
- KPI alerts (when KPIs fall behind target)
- Weekly digest
- Stale plan reminders

### Theme
Switch between **Dark** (default) and **Light** modes.

### Data Management
- **Export all data** (JSON backup)
- **Clear local cache** (if sync issues occur)
- **Delete account** (irreversible — contact BOI-MTIT for official records)

---

## 16. Troubleshooting

### Platform won't load
1. Clear browser cache (Ctrl+Shift+Del / Cmd+Shift+Delete)
2. Try a different browser
3. Check your internet connection
4. Disable browser extensions (especially ad blockers)

### Can't sign in
1. Check that your email is verified (check inbox for verification link)
2. Try "Forgot password?" to reset
3. Try "Send magic link" for password-free access
4. Contact BOI-MTIT if your account is locked

### AI Assistant not responding
1. Ensure you have an active internet connection
2. Try refreshing the page
3. If the issue persists, the AI service may be temporarily unavailable — try again in a few minutes

### Plans not saving / sync issues
1. Check the sync status indicator in the topbar (should be green)
2. If offline, your changes are saved locally and will sync when you reconnect
3. Click **Force Sync** in Settings → Data Management

### Data export fails
1. Ensure you have selected at least one section for export
2. Check that your plan has content (SWOT, objectives, PAPs)
3. Try a different export format

### Error: "Session expired"
1. Your login session has timed out — click **Sign In** to re-authenticate
2. Your data is preserved locally

---

## Quick Reference Card

| Task | Steps |
|------|-------|
| Create a plan | Topbar → Plan selector → + New Plan |
| Generate SWOT with AI | SWOT Analysis → ✨ Generate with BIRD AI |
| Build a CLD | Systems Thinking → + Add Node → Draw links |
| Add a strategy | Strategy Matrix → + Add Strategy (or AI generate) |
| Track a KPI | Balanced Scorecard → Expand objective → + Add KPI |
| Add a project | PAPs Management → + Add PAP → Fill form |
| Ask BIRD AI | Click BIRD AI button (bottom right) → Type question |
| Export plan | Plan Generator → Select format → Generate |
| Invite team member | Team Collaboration → + Invite Member |
| Change password | User menu → Profile → Security tab |

---

*BIRD 2026–2035 User Manual — BOI-MTIT, BARMM, Philippines*  
*© 2026 Bureau of Investments — Ministry of Trade, Investments and Tourism. CC BY-NC-SA 4.0*
