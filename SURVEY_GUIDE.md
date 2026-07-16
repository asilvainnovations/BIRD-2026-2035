# BIRD 2026-2035 Validation Survey — Complete Guide

## For Respondents, Administrators, and Provincial Coordinators

---

## Table of Contents

1. [Introduction](#1-introduction)
   - [What is BIRD 2026-2035?](#what-is-bird-2026-2035)
   - [Why Your Feedback Matters](#why-your-feedback-matters)
   - [How Responses Shape the Roadmap](#how-responses-shape-the-roadmap)
   - [Anonymity and Data Protection](#anonymity-and-data-protection)
2. [Before You Start](#2-before-you-start)
   - [System Requirements](#system-requirements)
   - [Estimated Completion Time](#estimated-completion-time)
   - [Materials to Prepare](#materials-to-prepare)
   - [Save and Resume Functionality](#save-and-resume-functionality)
   - [Privacy Policy](#privacy-policy)
3. [Survey Navigation](#3-survey-navigation)
   - [How the Wizard Works](#how-the-wizard-works)
   - [Progress Indicator](#progress-indicator)
   - [Previous/Next Navigation](#previous-next-navigation)
   - [Step Jumper for Revisiting Steps](#step-jumper-for-revisiting-steps)
   - [BIRD Live Score Panel](#bird-live-score-panel)
4. [Current 16-Step Survey Structure](#4-current-16-step-survey-structure)
5. [Step-by-Step Guide](#5-step-by-step-guide)
   - [Step 0: Welcome & Orientation](#step-0-welcome--orientation)
   - [Step 1: Privacy & Consent](#step-1-privacy--consent)
   - [Step 2: Your Profile](#step-2-your-profile)
   - [Step 3: Systems Thinking & BEIE](#step-3-systems-thinking--beie)
   - [Step 4: Cluster 1 — Foundations](#step-4-cluster-1--foundations)
   - [Step 5: Cluster 2 — Transformers](#step-5-cluster-2--transformers)
   - [Step 6: Cluster 3 — Enablers](#step-6-cluster-3--enablers)
   - [Step 7: Cluster 4 — Connectors](#step-7-cluster-4--connectors)
   - [Step 8: Cluster 5 — Financiers](#step-8-cluster-5--financiers)
   - [Step 9: Operating Systems](#step-9-operating-systems)
   - [Step 10: IEDS & 3-Phase Plan](#step-10-ieds--3-phase-plan)
   - [Step 11: Metrics Architecture](#step-11-metrics-architecture)
   - [Step 12: Balanced Scorecard](#step-12-balanced-scorecard)
   - [Step 13: Priority Actions & Budget](#step-13-priority-actions--budget)
   - [Step 14: Resources & Engagements](#step-14-resources--engagements)
   - [Step 15: Review & Submit](#step-15-review--submit)
6. [Integration Architecture](#6-integration-architecture)
   - [6.1 strategicPlanStore.ts](#61-strategicplanstorets)
   - [6.2 formulas.ts](#62-formulasts)
   - [6.3 supabase.ts & API Layer](#63-supabase-ts--api-layer)
   - [useSurveyScores Hook](#usesurveyscores-hook)
7. [Question Types Explained](#7-question-types-explained)
   - [SWOT Factor Scales](#swot-factor-scales)
   - [Systems Archetype Validation](#systems-archetype-validation)
   - [Multiple Choice](#multiple-choice)
   - [Rating Scales](#rating-scales)
   - [Open Text](#open-text)
   - [Checkboxes](#checkboxes)
8. [BIRD Score Interpretation](#8-bird-score-interpretation)
   - [What the Live Score Panel Shows](#what-the-live-score-panel-shows)
   - [How Scores Are Calculated](#how-scores-are-calculated)
   - [Score Range Interpretations](#score-range-interpretations)
   - [How Scores Feed Into Final Analysis](#how-scores-feed-into-final-analysis)
9. [For Administrators](#9-for-administrators)
   - [How to Deploy the Survey](#how-to-deploy-the-survey)
   - [Monitoring Responses](#monitoring-responses)
   - [Exporting Data](#exporting-data)
   - [Analyzing Results by Respondent Segment](#analyzing-results-by-respondent-segment)
   - [Iteration Triggers](#iteration-triggers)
10. [Troubleshooting](#10-troubleshooting)
    - [Browser Compatibility](#browser-compatibility)
    - [Session Timeout Handling](#session-timeout-handling)
    - [Image Loading Issues](#image-loading-issues)
    - [Form Validation Errors](#form-validation-errors)
    - [Contacting Support](#contacting-support)
11. [Frequently Asked Questions (FAQ)](#11-frequently-asked-questions-faq)
12. [Appendix](#12-appendix)
    - [Glossary of BIRD Terms](#glossary-of-bird-terms)
    - [Respondent Type to Recommended Steps Mapping](#respondent-type-to-recommended-steps-mapping)
    - [Contact Information](#contact-information)

---

## 1. Introduction

### What is BIRD 2026-2035?

The **Bangsamoro Investment Roadmap (BIRD) 2026-2035** is the comprehensive, evidence-based strategic plan designed to transform the Bangsamoro Autonomous Region in Muslim Mindanao (BARMM) into a competitive, inclusive, and sustainable investment destination. Developed by the Board of Investments - Ministry of Trade, Investments and Tourism (BOI-MTIT BARMM), BIRD serves as the region's 10-year master plan for attracting domestic and foreign investment, fostering private sector growth, and reducing economic disparities.

The roadmap is structured around the **BEIE Framework**:

| Pillar | Full Name | Focus Area |
|--------|-----------|------------|
| **B** | Business Environment | Ease of doing business, regulatory reform, governance |
| **E** | Economic Foundations | Sector development, value chains, comparative advantages |
| **I** | Infrastructure & Connectivity | Physical and digital infrastructure, logistics |
| **E** | Enabling Conditions | Human capital, financial access, innovation ecosystems |

BIRD 2026-2035 represents the collective aspiration of the Bangsamoro people for a prosperous, self-reliant region integrated into the broader economies of the Philippines, BIMP-EAGA, and ASEAN.

### Why Your Feedback Matters

Your participation in this validation survey ensures that the BIRD 2026-2035 reflects:

- **Ground-level realities** from officials, business owners, civil society members, and development partners working directly in BARMM
- **Diverse perspectives** across all five provinces — Basilan, Lanao del Sur, Maguindanao del Norte, Maguindanao del Sur, and Tawi-Tawi
- **Technical rigor** through expert assessment of SWOT factors, systems archetypes, and sectoral priorities
- **Inclusive ownership** so that all stakeholder groups see their concerns and aspirations embedded in the final roadmap

The Bangsamoro Government has committed to an open, participatory planning process. Your feedback is not merely advisory — it directly shapes policy priorities, resource allocation, and implementation sequencing over the next decade.

### How Responses Shape the Roadmap

Every response to this survey is processed through a structured analytical framework:

1. **SWOT Scoring**: Impact and Likelihood ratings for all 116 strategic factors are aggregated to produce weighted priority matrices. Factors with high Impact x Likelihood scores receive priority placement in the action plan.

2. **Archetype Validation**: Your accuracy ratings for each systems archetype determine which causal loop models are retained, revised, or deprioritized in the final diagnostic chapter.

3. **Sector Prioritization**: Cross-cutting development priorities and comparative alignment responses inform the sectoral composition of the investment portfolio.

4. **Governance Feedback**: Responses on institutional capacity, timeline feasibility, and engagement interests directly shape Chapter 7 (Implementation Arrangements) and the stakeholder engagement calendar.

5. **Sentiment Analysis**: Open-text feedback is thematically coded and synthesized to capture qualitative insights not captured by structured questions.

### Anonymity and Data Protection

The BIRD 2026-2035 Validation Survey is fully compliant with the **Data Privacy Act of 2012 (Republic Act No. 10173)** of the Philippines.

**Your privacy protections include:**

| Protection | Description |
|------------|-------------|
| **Voluntary Participation** | All questions are optional unless explicitly marked as required. You may skip any question or exit the survey at any time. |
| **Anonymity Option** | You may complete the survey without providing personally identifiable information. The respondent profile step allows you to select broad categories (sector, organization type, province) without disclosing your name or specific affiliation. |
| **Data Minimization** | We collect only the information necessary for segmenting and validating the roadmap. No sensitive personal information (race, religion, health, biometric data) is requested. |
| **Secure Storage** | All responses are transmitted over HTTPS and stored on encrypted servers with access limited to authorized BIRD team members. |
| **No Third-Party Sharing** | Individual responses are never sold, shared with third parties, or used for commercial purposes. Aggregated, anonymized data may be published in the final roadmap document. |
| **Retention Limit** | Survey data is retained only for the duration of the BIRD 2026-2035 development process (estimated 12 months) unless you consent to long-term retention for follow-up validation rounds. |
| **Right to Access and Rectification** | You may request a copy of your submitted responses or ask for corrections by contacting bird-team@asilvainnovations.com. |
| **Right to Erasure** | You may request deletion of your responses at any time prior to the aggregation and analysis phase by contacting the BIRD team. |

The Bangsamoro Government, through BOI-MTIT BARMM, is the **Personal Information Controller (PIC)** for this survey. The full Privacy Policy is available at: `https://asilvainnovations.github.io/BIRD-2026-2035/public/privacy-policy.html`

By proceeding with the survey, you confirm that you have read and understood this privacy notice and consent to the collection and processing of your responses as described herein.

---

## 2. Before You Start

### System Requirements

The BIRD 2026-2035 Validation Survey is a web-based application that runs directly in your browser. No software installation is required.

**Minimum Requirements:**

| Component | Requirement |
|-----------|-------------|
| **Browser** | Google Chrome 90+, Mozilla Firefox 88+, Microsoft Edge 90+, Apple Safari 14+, or Opera 76+ |
| **Operating System** | Windows 10+, macOS 10.14+, Linux (Ubuntu 18.04+), Android 8+, iOS 14+ |
| **Screen Resolution** | 1024 x 768 pixels minimum; 1366 x 768 or higher recommended |
| **Internet Connection** | Stable broadband connection (minimum 1 Mbps); 3 Mbps or higher recommended for optimal image loading |
| **JavaScript** | Must be enabled in browser settings |
| **Cookies** | Recommended for save-and-resume functionality; not strictly required |

**Recommended Configuration for Best Experience:**

- **Desktop/Laptop**: Full-screen or maximized browser window at 1920 x 1080 resolution
- **Tablet**: Landscape orientation (horizontal) recommended
- **Mobile Phone**: Portrait orientation acceptable; the survey is responsive, but some charts and images display better on larger screens

**Not Supported:**

- Internet Explorer 11 or older
- Browsers with JavaScript disabled
- Text-only browsers (Lynx, w3m)
- Screen resolutions below 800 x 600 pixels

### Estimated Completion Time

The full survey contains 16 steps (0-15) and typically takes **45 to 60 minutes** to complete, depending on your familiarity with the subject matter and the depth of your open-text responses.

| Completion Pattern | Estimated Time |
|-------------------|----------------|
| **Full survey, minimal open-text responses** | 35-45 minutes |
| **Full survey, detailed open-text responses** | 50-75 minutes |
| **Partial survey (8-10 steps)** | 20-30 minutes |
| **Review mode (updating previous responses)** | 10-20 minutes |

You are not required to complete the entire survey in one sitting. The save-and-resume feature (see below) allows you to pause and return at any time.

### Materials to Prepare

To complete the survey efficiently, gather the following information before you begin:

**For All Respondents:**
- Your primary sector of engagement (e.g., agriculture, fisheries, tourism, manufacturing, services, governance)
- Your province of focus within BARMM
- Your organization type (government agency, private enterprise, academic institution, civil society organization, development partner)

**For Government Officials:**
- Familiarity with current BARMM development plans and investment policies
- Awareness of your agency's strategic priorities for 2026-2035
- Understanding of intergovernmental coordination mechanisms

**For Private Sector Representatives:**
- Knowledge of your industry's value chain and competitive landscape
- Awareness of key barriers to investment in your sector
- Familiarity with regional and national trade policies

**For Academic and Research Institutions:**
- Awareness of relevant research on BARMM economic development
- Familiarity with systems thinking concepts (for Steps 3-9)
- Knowledge of regional development frameworks

**For Civil Society Organizations:**
- Understanding of community-level development challenges
- Awareness of marginalized group needs and inclusion gaps
- Knowledge of peacebuilding and social cohesion factors

**For Development Partners:**
- Familiarity with ongoing or planned programs in BARMM
- Awareness of international best practices in investment promotion
- Knowledge of donor coordination mechanisms

### Save and Resume Functionality

The BIRD survey automatically saves your progress using **browser localStorage** technology. This means:

- Your responses are saved **locally in your browser** as you navigate between steps
- You can **close the browser tab or window** and return later using the same device and browser
- Your progress persists even if you shut down your computer
- You will see a "Progress Saved" confirmation each time you move between steps

**Important Notes About Save and Resume:**

| Scenario | Result |
|----------|--------|
| Close tab and reopen on same browser/device | All responses retained |
| Use a different browser (e.g., switch from Chrome to Firefox) | Responses not available; must start over |
| Use a different device (e.g., switch from laptop to phone) | Responses not available; must start over |
| Clear browser cookies and site data | All saved responses deleted |
| Use incognito/private browsing mode | Responses lost when window closes |
| Browser updates or crashes | Responses saved up to last step transition |

**Best Practice**: Complete the survey on a single device and browser. If you must switch devices, note your completed steps and resume from the last unanswered step.

### Privacy Policy

The complete Privacy Policy for the BIRD 2026-2035 Validation Survey is available at:

**`https://asilvainnovations.github.io/BIRD-2026-2035/public/privacy-policy.html`**

The Privacy Policy covers:
- Full details of data collection, processing, and storage practices
- Your rights as a data subject under the Data Privacy Act of 2012
- Contact information for the Data Protection Officer
- Procedures for filing complaints or requests regarding your personal data

We encourage all respondents to review the Privacy Policy before beginning the survey. A summary of key privacy protections is provided in the Anonymity and Data Protection section of this guide.

---

## 3. Survey Navigation

### How the Wizard Works

The BIRD 2026-2035 Validation Survey uses a **step-by-step wizard interface**. The survey is organized into 16 sequential steps (numbered 0 through 15), each focused on a specific theme or assessment area. You progress through the survey by completing one step at a time.

**Wizard Flow:**

```
Step 0 (Welcome) -> Step 1 (Privacy & Consent) -> Step 2 (Profile) -> Step 3 (Systems Thinking & BEIE) -> Step 4 (Cluster 1) -> Step 5 (Cluster 2) -> Step 6 (Cluster 3) -> Step 7 (Cluster 4) -> Step 8 (Cluster 5) -> Step 9 (Operating Systems) -> Step 10 (IEDS) -> Step 11 (Metrics) -> Step 12 (BSC) -> Step 13 (Budget) -> Step 14 (Resources) -> Step 15 (Review & Submit)
```

At each step:
1. Read the step introduction and any instructional text
2. Review any reference images, charts, or diagrams provided
3. Answer the questions presented
4. Click the **Next** button to proceed to the following step
5. Click the **Previous** button to return to the preceding step for review or correction

The wizard interface ensures that you are never overwhelmed with too many questions at once. Each step presents a focused set of related questions with clear context and guidance.

### Progress Indicator

A **progress bar** is displayed at the top of the survey interface throughout your session. The progress indicator shows:

- **Current Step**: The step number you are currently viewing (e.g., "Step 5 of 15")
- **Percentage Complete**: A visual bar showing your overall progress through the survey
- **Step Labels**: The title of each step for easy reference

The progress bar updates automatically as you navigate between steps. It provides immediate visual feedback on how much of the survey remains.

**Example Progress Display:**

```
[████████████████░░░░░░░░] 62% Complete -- Step 10 of 15: IEDS & 3-Phase Plan
```

### Previous/Next Navigation

The survey provides two primary navigation controls at the bottom of each step:

| Button | Action | When Available |
|--------|--------|----------------|
| **Previous** | Returns to the immediately preceding step | Always available from Step 1 onward |
| **Next** | Advances to the next step after saving current responses | Always available; validates required fields before proceeding |

**Navigation Behavior:**

- When you click **Next**, the survey automatically saves your current step's responses to localStorage before advancing
- A brief "Saving..." indicator appears during the save operation
- If any required fields are empty or invalid, the survey displays a validation message and prevents advancement until the errors are corrected
- You can use **Previous** at any time to review or change earlier responses, even after reaching later steps

### Step Jumper for Revisiting Steps

The survey includes a **Step Jumper** interface that allows you to navigate directly to any step without clicking through each intermediate step sequentially.

**How to Use the Step Jumper:**

1. Locate the step jumper control in the navigation area (typically adjacent to the progress bar)
2. Click the step jumper to reveal a dropdown or grid of all 16 steps (0-15)
3. Select the step you wish to visit
4. The survey immediately navigates to that step, loading any previously saved responses

**Step Jumper Visual States:**

| State | Visual Indicator | Meaning |
|-------|-----------------|---------|
| **Completed** | Green checkmark or filled circle | All required questions in this step have been answered |
| **In Progress** | Blue highlight or partial fill | This is the current step, or some questions have been answered |
| **Not Started** | Gray outline or empty circle | No responses have been saved for this step |
| **Locked** | Grayed out with lock icon | This step requires responses from a previous step (rare) |

The step jumper is particularly useful when:
- You want to review and update responses in an earlier step after gaining more context
- You are completing the survey in multiple sessions and want to resume at a specific point
- You are a subject-matter expert who only needs to complete certain thematic steps

### BIRD Live Score Panel

The **BIRD Live Score Panel** is an interactive analytics component that appears alongside the survey and updates in real time as you answer questions. The panel provides immediate quantitative feedback on how your responses are shaping the strategic assessment.

**What the Panel Displays:**

The score panel shows multiple calculated metrics derived from your SWOT ratings and archetype validations. These metrics update dynamically as you progress through the survey.

**Score Panel Location:**
- **Desktop**: Fixed panel on the right-hand side of the survey interface
- **Tablet**: Collapsible panel accessible via a toggle button
- **Mobile**: Expandable overlay panel triggered by a floating button

**Interpreting Live Scores:**

The live scores provide an at-a-glance summary of the strategic landscape as you have assessed it. For a detailed explanation of how scores are calculated and what they mean, see [Section 8: BIRD Score Interpretation](#8-bird-score-interpretation).

---

## 4. Current 16-Step Survey Structure

The SurveyWizard implements a **16-step structure (Steps 0-15)** organized around the BEIE Framework and five cluster archetypes. The following table provides an overview of each step's content:

| Step | Title | SWOT Factors | Archetypes | Images |
|------|-------|-------------|------------|--------|
| 0 | Welcome & Orientation | -- | -- | 1 (banner) |
| 1 | Privacy & Consent | -- | -- | -- |
| 2 | Your Profile | -- | -- | -- |
| 3 | Systems Thinking & BEIE | 3 Strengths | -- | 2 (BEIE diagrams) |
| 4 | Cluster 1: Foundations | 4 (S/T/W) | 2 (Tragedy, Limits) | 1 (Maguindanao) |
| 5 | Cluster 2: Transformers | 5 (W/O/T) | 2 (Fixes, Success) | 2 (pipeline, zones) |
| 6 | Cluster 3: Enablers | 12 (S/W/O/T) | 2 (Shifting, Growth) | 6 (infrastructure) |
| 7 | Cluster 4: Connectors | 16 (S/W/O/T) | 2 (Escalation, Limits) | 9 (corridors, ports) |
| 8 | Cluster 5: Financiers | 14 (S/W/O/T) | 2 (Big Man, Shifting) | 2 (Islamic finance) |
| 9 | Operating Systems | 14 (S/W/O/T) | 2 (Investment, Governance loops) | 6 (moral governance) |
| 10 | IEDS & 3-Phase Plan | -- | -- | 1 (Execution Engine) |
| 11 | Metrics Architecture | -- | -- | 1 (KPI Framework) |
| 12 | Balanced Scorecard | -- | -- | 2 (Strategy Map, Vision) |
| 13 | Priority Actions & Budget | -- | -- | 1 (Capital Deployment) |
| 14 | Resources & Engagements | -- | -- | -- |
| 15 | Review & Submit | -- | -- | -- |
| **Total** | | **116** | **16** | **47** |

**Key Design Decisions:**

- **Step 0** is a non-interactive welcome banner that displays the BIRD 2026-2035 overview and a "Begin Survey" call-to-action.
- **Steps 1-2** collect consent and demographic data for respondent segmentation.
- **Steps 3-9** contain the core SWOT assessment and systems archetype validation across five cluster groups plus the BEIE introduction and Operating Systems step.
- **Steps 10-13** capture strategic planning inputs (IEDS, Metrics, Balanced Scorecard, Budget).
- **Steps 14-15** handle resource preferences, engagement interests, and final submission.
- Each step from 3-9 contains both **SWOT factor ratings** (Impact x Likelihood) and **systems archetype validations** (accuracy ratings).

---

## 5. Step-by-Step Guide

This section provides a detailed walkthrough of each of the 16 survey steps (0-15). For each step, you will find: the purpose and scope, the types of questions asked, guidance on how to answer specific question types, the approximate time required, and any reference images or charts to review.

---

### Step 0: Welcome & Orientation

**Purpose:** To introduce respondents to the BIRD 2026-2035 Validation Survey, provide an overview of what to expect, and set the context for the assessment.

**What Is Being Asked:**

This is an informational step with no questions to answer. It displays:
- A welcome banner with the BIRD 2026-2035 title and branding
- A brief overview of the survey's purpose and how responses will be used
- Estimated completion time and save-and-resume instructions
- A prominent "Begin Survey" button to proceed to Step 1

**Approximate Time:** 1-2 minutes (reading only)

**Reference Images:** 1 banner image (BIRD 2026-2035 welcome graphic)

---

### Step 1: Privacy & Consent

**Purpose:** To ensure respondents understand and agree to the data privacy terms before proceeding with the survey, in compliance with the Data Privacy Act of 2012.

**What Is Being Asked:**

This step presents the privacy notice and consent requirements. You must acknowledge the privacy terms to proceed.

**Question Types in This Step:**

| Question | Type | Required? |
|----------|------|-----------|
| Consent to participate | Checkbox | Yes |
| Consent to data processing under RA 10173 | Checkbox | Yes |
| Acknowledgment of voluntary participation | Checkbox | Yes |

**How to Answer:**

- Read each consent statement carefully before checking the corresponding box
- All three checkboxes must be selected to enable the "Next" button
- If you do not consent, you cannot proceed with the survey
- The full Privacy Policy is linked for reference

**Approximate Time:** 2-3 minutes

**Reference Images:** None

---

### Step 2: Your Profile

**Purpose:** To collect demographic and organizational information that enables the BIRD team to segment and analyze responses by stakeholder group, geographic focus, and sectoral expertise.

**What Is Being Asked:**

This step establishes your respondent identity for analytical segmentation. The profile questions ensure that the BIRD team can compare perspectives across different stakeholder groups and identify patterns specific to provinces, sectors, or organization types.

**Question Types in This Step:**

| Question | Type | Required? | Options |
|----------|------|-----------|---------|
| Primary Province of Engagement | Single-select dropdown | Yes | Basilan, Lanao del Sur, Maguindanao del Norte, Maguindanao del Sur, Tawi-Tawi, BARMM-wide |
| Organization Type | Single-select | Yes | National Government Agency, BARMM Regional Government, Provincial/Municipal Government, Private Enterprise, Academic/Research Institution, Civil Society Organization, Development Partner/Donor, Other |
| Sector of Primary Expertise | Single-select | Yes | Agriculture & Fisheries, Industry & Manufacturing, Tourism & Culture, Infrastructure & Logistics, Governance & Public Administration, Financial Services, Education & Human Capital, Health & Social Services, Peace & Security, Environment & Climate, Cross-Cutting/Multisectoral |
| Years of Experience in BARMM | Single-select | No | Less than 1 year, 1-3 years, 3-5 years, 5-10 years, More than 10 years |
| Size of Organization | Single-select | No | Micro (1-9 employees), Small (10-99), Medium (100-499), Large (500+), Not applicable |
| Are you responding on behalf of an organization or in your personal capacity? | Single-select | Yes | On behalf of an organization, In personal capacity |
| Organization Name (optional) | Open text | No | Free text entry |
| Email Address (optional, for follow-up) | Email input | No | Valid email format |

**How to Answer:**

- Select the option that most accurately describes your **primary** engagement. If you work across multiple provinces or sectors, choose the one where your involvement is deepest or most current.
- The Organization Name and Email Address fields are **strictly optional**. Providing them allows the BIRD team to follow up for clarification or to invite you to validation workshops, but they are not required for your responses to be included in the analysis.

**Approximate Time:** 3-5 minutes

**Reference Images:** None

---

### Step 3: Systems Thinking & BEIE

**Purpose:** To introduce respondents to the systems thinking approach and the BEIE Framework, and to validate the foundational strengths that underpin BARMM's investment climate.

**What Is Being Asked:**

This step presents the BEIE (Business Environment, Economic Foundations, Infrastructure & Connectivity, Enabling Conditions) framework and asks you to rate three foundational strength factors. It also introduces the systems thinking concepts that will be used throughout Steps 4-9.

**Question Types in This Step:**

| Question | Type | Required? |
|----------|------|-----------|
| For each strength factor: Rate its Impact on investment promotion | Impact scale (1-5) | Yes |
| For each strength factor: Rate its Likelihood of persisting/strengthening | Likelihood scale (1-5) | Yes |
| Understanding of the BEIE Framework | Rating scale (1-5) | No |
| Familiarity with systems thinking concepts | Rating scale (1-5) | No |

**Approximate Time:** 4-6 minutes

**Reference Images:** 2 (BEIE Framework diagram, Systems Thinking overview)

---

### Step 4: Cluster 1 — Foundations

**Purpose:** To validate the foundational SWOT factors for BARMM's investment climate and assess two critical systems archetypes: Tragedy of the Commons and Limits to Growth.

**What Is Being Asked:**

This step presents 4 SWOT factors (Strengths, Threats, Weaknesses) related to BARMM's foundational conditions, plus 2 systems archetype validations.

**SWOT Factors Assessed:**

- Climate and environmental conditions affecting investment
- Geopolitical stability and security dynamics
- Basic infrastructure adequacy
- Natural resource endowment and management

**Systems Archetypes Assessed:**

| Archetype | Description |
|-----------|-------------|
| **Tragedy of the Commons** | Unsustainable exploitation of shared natural resources undermines long-term investment viability |
| **Limits to Growth** | Initial investment successes trigger growth, but infrastructure and capacity constraints eventually limit further expansion |

**Question Types in This Step:**

| Question | Type | Required? |
|----------|------|-----------|
| For each SWOT factor: Rate its Impact | Impact scale (1-5) | Yes |
| For each SWOT factor: Rate its Likelihood | Likelihood scale (1-5) | Yes |
| For each archetype: How accurately does this describe reality in BARMM? | Archetype validation (4 options) | Yes |
| If "Somewhat inaccurate" or "Inaccurate": Please explain | Open text (conditional) | Conditional |

**Approximate Time:** 6-8 minutes

**Reference Images:** 1 (Maguindanao provincial context image)

---

### Step 5: Cluster 2 — Transformers

**Purpose:** To validate SWOT factors related to BARMM's transformative economic potential and assess the Fixes That Fail and Success to the Successful archetypes.

**What Is Being Asked:**

This step presents 5 SWOT factors (Weaknesses, Opportunities, Threats) related to transformative sectors and economic potential, plus 2 systems archetype validations.

**Systems Archetypes Assessed:**

| Archetype | Description |
|-----------|-------------|
| **Fixes That Fail** | Quick-fix policy interventions provide temporary relief but create unintended long-term consequences |
| **Success to the Successful** | Early investment successes in certain provinces or sectors draw disproportionate resources, leaving others behind |

**Question Types in This Step:**

| Question | Type | Required? |
|----------|------|-----------|
| For each SWOT factor: Rate its Impact | Impact scale (1-5) | Yes |
| For each SWOT factor: Rate its Likelihood | Likelihood scale (1-5) | Yes |
| For each archetype: How accurately does this describe reality in BARMM? | Archetype validation (4 options) | Yes |
| Additional comments on transformative sectors | Open text | No |

**Approximate Time:** 6-8 minutes

**Reference Images:** 2 (Investment pipeline diagram, Economic zones map)

---

### Step 6: Cluster 3 — Enablers

**Purpose:** To validate 12 SWOT factors across all four dimensions (Strengths, Weaknesses, Opportunities, Threats) related to BARMM's enabling conditions for investment, and assess the Shifting the Burden and Growth Underinvestment archetypes.

**What Is Being Asked:**

This is a comprehensive assessment step covering infrastructure, human capital, financial systems, and institutional capacity. It contains the highest SWOT factor count of any cluster step.

**Systems Archetypes Assessed:**

| Archetype | Description |
|-----------|-------------|
| **Shifting the Burden** | Short-term aid and ODA reduce incentives for domestic revenue mobilization and private investment |
| **Growth Underinvestment** | Insufficient investment in capacity-building infrastructure constrains long-term economic growth |

**Question Types in This Step:**

| Question | Type | Required? |
|----------|------|-----------|
| For each of 12 SWOT factors: Rate its Impact | Impact scale (1-5) | Yes |
| For each of 12 SWOT factors: Rate its Likelihood | Likelihood scale (1-5) | Yes |
| For each archetype: How accurately does this describe reality in BARMM? | Archetype validation (4 options) | Yes |
| Missing enabler factors | Open text | No |

**Approximate Time:** 8-10 minutes

**Reference Images:** 6 (Infrastructure gallery — roads, ports, energy, water, telecom, digital)

---

### Step 7: Cluster 4 — Connectors

**Purpose:** To validate 16 SWOT factors across all four dimensions related to BARMM's connectivity and logistics infrastructure, and assess the Escalation and Limits to Growth archetypes.

**What Is Being Asked:**

This step covers transport corridors, maritime connectivity, digital infrastructure, and regional economic integration. It contains the largest number of SWOT factors (16) in the survey.

**Systems Archetypes Assessed:**

| Archetype | Description |
|-----------|-------------|
| **Escalation** | Competing regions or actors engage in a race to attract investment, leading to diminishing returns for all |
| **Limits to Growth** | Infrastructure constraints limit the growth potential of otherwise promising investment sectors |

**Question Types in This Step:**

| Question | Type | Required? |
|----------|------|-----------|
| For each of 16 SWOT factors: Rate its Impact | Impact scale (1-5) | Yes |
| For each of 16 SWOT factors: Rate its Likelihood | Likelihood scale (1-5) | Yes |
| For each archetype: How accurately does this describe reality in BARMM? | Archetype validation (4 options) | Yes |
| Priority connectivity investments | Open text | No |

**Approximate Time:** 10-12 minutes

**Reference Images:** 9 (Corridor maps, port facilities, intermodal transport, digital connectivity)

---

### Step 8: Cluster 5 — Financiers

**Purpose:** To validate 14 SWOT factors across all four dimensions related to BARMM's financial ecosystem and capital market access, and assess the Big Man and Shifting the Burden archetypes.

**What Is Being Asked:**

This step covers Islamic finance, banking access, capital markets, microfinance, development finance, and investment promotion financing.

**Systems Archetypes Assessed:**

| Archetype | Description |
|-----------|-------------|
| **Big Man** | Concentration of financial decision-making power in few individuals or institutions limits inclusive access to capital |
| **Shifting the Burden** | Reliance on external development assistance undermines domestic financial system development |

**Question Types in This Step:**

| Question | Type | Required? |
|----------|------|-----------|
| For each of 14 SWOT factors: Rate its Impact | Impact scale (1-5) | Yes |
| For each of 14 SWOT factors: Rate its Likelihood | Likelihood scale (1-5) | Yes |
| For each archetype: How accurately does this describe reality in BARMM? | Archetype validation (4 options) | Yes |
| Innovative financing suggestions | Open text | No |

**Approximate Time:** 8-10 minutes

**Reference Images:** 2 (Islamic finance diagram, Capital flows infographic)

---

### Step 9: Operating Systems

**Purpose:** To validate 14 SWOT factors across all four dimensions related to BARMM's governance, regulatory, and institutional operating systems, and assess the Investment Loop and Governance Loop archetypes.

**What Is Being Asked:**

This step covers governance quality, regulatory efficiency, transparency, accountability, and institutional capacity for investment promotion and facilitation.

**Systems Archetypes Assessed:**

| Archetype | Description |
|-----------|-------------|
| **Investment Loop** | Reinforcing feedback between investment inflows, economic growth, and further investment attraction |
| **Governance Loop** | Relationship between governance quality, investor confidence, and institutional capacity building |

**Question Types in This Step:**

| Question | Type | Required? |
|----------|------|-----------|
| For each of 14 SWOT factors: Rate its Impact | Impact scale (1-5) | Yes |
| For each of 14 SWOT factors: Rate its Likelihood | Likelihood scale (1-5) | Yes |
| For each archetype: How accurately does this describe reality in BARMM? | Archetype validation (4 options) | Yes |
| Governance improvement priorities | Open text | No |

**Approximate Time:** 8-10 minutes

**Reference Images:** 6 (Moral governance diagrams, institutional frameworks)

---

### Step 10: IEDS & 3-Phase Plan

**Purpose:** To validate the Inclusive Economic Development Strategy (IEDS) framework and the three-phase implementation plan (Short-term 2026-2028, Medium-term 2029-2031, Long-term 2032-2035).

**What Is Being Asked:**

This step presents the IEDS framework and asks you to assess the strategic options derived from it, including inclusive growth targets, sectoral priorities, and the phasing of interventions.

**Question Types in This Step:**

| Question | Type | Required? |
|----------|------|-----------|
| Rate the clarity of the IEDS framework | Rating scale (1-5) | Yes |
| Rate the feasibility of the 3-phase plan | Rating scale (1-5) | Yes |
| Rate the adequacy of inclusive growth targets | Rating scale (1-5) | Yes |
| Rate the appropriateness of sectoral priorities for each phase | Rating scale (1-5) | Yes |
| Which strategic option should receive highest priority? | Single-select | Yes |
| Suggested modifications to the 3-phase plan | Open text | No |

**Approximate Time:** 6-8 minutes

**Reference Images:** 1 (Execution Engine diagram)

---

### Step 11: Metrics Architecture

**Purpose:** To validate the Key Performance Indicator (KPI) framework and metrics architecture proposed for monitoring BIRD 2026-2035 implementation.

**What Is Being Asked:**

This step presents the proposed KPI framework including outcome indicators, output indicators, and process indicators. You are asked to assess their relevance, measurability, and ambition level.

**Question Types in This Step:**

| Question | Type | Required? |
|----------|------|-----------|
| Rate the relevance of proposed outcome indicators | Rating scale (1-5) | Yes |
| Rate the measurability of proposed indicators | Rating scale (1-5) | Yes |
| Rate the ambition level of targets | Rating scale (1-5) | Yes |
| Are there critical indicators missing? | Open text | No |
| Suggested additional metrics | Open text | No |

**Approximate Time:** 5-7 minutes

**Reference Images:** 1 (KPI Framework diagram)

---

### Step 12: Balanced Scorecard

**Purpose:** To validate the Balanced Scorecard (BSC) approach for strategic performance management, including the strategy map and causal linkages between strategic objectives.

**What Is Being Asked:**

This step presents the BSC framework with its four perspectives (Financial, Customer, Internal Processes, Learning & Growth) and the causal linkages between them. You are asked to validate the strategy map and identify the strongest pathway for achieving the BIRD vision.

**Question Types in This Step:**

| Question | Type | Required? |
|----------|------|-----------|
| Rate the clarity of the strategy map | Rating scale (1-5) | Yes |
| Rate the validity of causal linkages | Rating scale (1-5) | Yes |
| Identify the strongest pathway to vision achievement | Single-select | Yes |
| Rate the feasibility of BSC implementation | Rating scale (1-5) | Yes |
| Suggested improvements to the BSC framework | Open text | No |

**Approximate Time:** 5-7 minutes

**Reference Images:** 2 (Strategy Map diagram, BSC Vision alignment graphic)

---

### Step 13: Priority Actions & Budget

**Purpose:** To validate the priority actions (PAPs) and budget allocation framework for BIRD 2026-2035, including capital deployment priorities across sectors and phases.

**What Is Being Asked:**

This step presents the proposed Priority Actions and Programs (PAPs) with their associated budget allocations and BIRD phase assignments. You are asked to validate the prioritization and budget distribution.

**Question Types in This Step:**

| Question | Type | Required? |
|----------|------|-----------|
| Rate the adequacy of the overall budget envelope | Rating scale (1-5) | Yes |
| Rate the appropriateness of sectoral budget allocations | Rating scale (1-5) | Yes |
| Rate the feasibility of the proposed budget mobilization strategy | Rating scale (1-5) | Yes |
| Which phase should receive the highest budget priority? | Single-select | Yes |
| Suggested budget reallocations | Open text | No |

**Approximate Time:** 5-7 minutes

**Reference Images:** 1 (Capital Deployment diagram)

---

### Step 14: Resources & Engagements

**Purpose:** To identify respondent resource needs and gauge interest in ongoing stakeholder engagement activities for BIRD implementation.

**What Is Being Asked:**

This step asks about the types of resources, support, and engagement formats you or your organization would find most valuable for participating in BIRD implementation.

**Question Types in This Step:**

| Question | Type | Required? |
|----------|------|-----------|
| What type of engagement are you most interested in? | Single-select | Yes |
| Preferred format for follow-up engagement | Multi-select | No |
| Topics you would like to discuss in more depth | Open text | No |
| Resources needed to support BIRD implementation | Open text | No |

**Engagement Interest Options:**

- Provincial validation workshop
- Sector-specific focus group discussion
- One-on-one interview
- Online webinar
- Written submission
- Technical working group participation

**Approximate Time:** 4-6 minutes

**Reference Images:** None

---

### Step 15: Review & Submit

**Purpose:** To provide a final review of all responses, confirm data accuracy, and submit the completed survey.

**What Is Being Asked:**

This final step displays a summary of your responses across all previous steps. You can review, navigate back to edit any step, and confirm accuracy before final submission.

**Question Types in This Step:**

| Question | Type | Required? |
|----------|------|-----------|
| Confirm that all responses are accurate to the best of your knowledge | Checkbox | Yes |
| Overall assessment of the BIRD 2026-2035 draft | Rating scale (1-5) | Yes |
| What are the strongest aspects of the roadmap? | Open text | No |
| What are the weakest aspects or areas needing most improvement? | Open text | No |
| Would you recommend this roadmap to stakeholders in your network? | Single-select: Yes / No / With modifications | Yes |
| If modifications needed, please specify | Open text (conditional) | Conditional |
| Final comments or recommendations | Open text | No |

**How to Answer:**

- Use the review summary to verify your responses. If you notice any errors, use the Step Jumper to navigate back to the relevant step before submitting.
- The accuracy confirmation checkbox is required to submit.
- Your overall assessment and final comments provide valuable qualitative input for the BIRD team.

**Approximate Time:** 5-8 minutes

**Reference Images:** None

---

## 6. Integration Architecture

This section documents the technical architecture of the SurveyWizard application for developers, system administrators, and technical stakeholders. It describes how survey responses flow through the system from the React component layer to persistent storage.

```
+-----------------------------------------------------------------------------+
|                         SURVEYWIZARD ARCHITECTURE                           |
+-----------------------------------------------------------------------------+
|                                                                             |
|  +--------------+    +--------------+    +--------------+                  |
|  | 16 Section   |--->|  useState    |--->|  BIRD Score  |                  |
|  | Components   |    |  per section |    |  Computation |                  |
|  | (section_    |    |              |    |  (formulas)  |                  |
|  |  components) |    +--------------+    +------+-------+                  |
|  +--------------+                               |                          |
|         |                                       v                          |
|  +--------------+    +------------------------------------------+          |
|  | bird-urls.ts |--->|  submitSurvey() -> Supabase / localStorage|          |
|  | (110 images) |    |  (src/lib/api.ts)                        |          |
|  +--------------+    +------------------------------------------+          |
|                                                                             |
+-----------------------------------------------------------------------------+
```

**Architecture Overview:**

The SurveyWizard is built as a React single-page application with the following data flow:

1. **16 Step Components**: Each step (0-15) is implemented as a dedicated React component in `section_components/`. Steps 3-9 contain SWOT factor ratings and archetype validations. Steps 10-13 capture strategic planning inputs.
2. **Per-Step useState**: Each step component manages its own local state via React `useState` hooks. Form inputs update local state immediately.
3. **BIRD Score Computation**: Real-time score calculations are performed by formula functions imported from `src/lib/formulas.ts`. Scores update as respondents rate SWOT factors.
4. **Image Asset Management**: All 110 images (47 displayed in the survey) are referenced through `bird-urls.ts` and loaded as optimized assets.
5. **Submission Layer**: The `submitSurvey()` function in `src/lib/api.ts` handles persistence. It attempts Supabase submission first; if offline or Supabase is unavailable, it falls back to `localStorage` with retry logic.

### 6.1 strategicPlanStore.ts

The SurveyWizard integrates with the strategic planning module through `strategicPlanStore.ts`. Survey responses are mapped to strategic plan fields as follows:

| Survey Field | StrategicPlan Field | Step |
|-------------|---------------------|------|
| `demo_name`, `demo_organization` | `createdByName`, `organization` | 2 |
| `q_s4_tragedy_commons`, `q_s4_limits_growth` | `swotItems` (archetype validations) | 4 |
| `q_s5_fixes_fail`, `q_s5_successful` | `swotItems` (Transformers archetypes) | 5 |
| `q_s6_shifting_burden`, `q_s6_growth_underinvest` | `swotItems` (Enablers archetypes) | 6 |
| `q_s7_escalation`, `q_s7_limits_growth` | `swotItems` (Connectors archetypes) | 7 |
| `q_s8_big_man`, `q_s8_shifting_burden` | `swotItems` (Financiers archetypes) | 8 |
| `q_s9_investment_loop`, `q_s9_governance_loop` | `swotItems` (OS archetypes) | 9 |
| `q10_1_ieds_preference`-`q10_7_outcomes` | `strategicOptions` (IEDS-derived) | 10 |
| `q12_5_strongest_pathway` | `objectives` (BSC causal linkage) | 12 |
| `q13_6_budget_priority_phase` | `paps[].birdPhase` | 13 |
| `q14_1_engagement_type` | Plan metadata / follow-up flags | 14 |
| `q15_1_confirm_accurate` | Plan status activation | 15 |

**Integration Notes:**

- Step 2 demographic fields (`demo_name`, `demo_organization`) populate plan metadata for attribution and follow-up routing.
- Steps 4-9 archetype validations feed into `swotItems` with cluster-specific tagging for segmented analysis.
- Step 10 IEDS preferences generate `strategicOptions` entries that inform the three-phase plan composition.
- Step 12 BSC pathway selection directly influences the `objectives` hierarchy through causal linkage mapping.
- Step 13 budget priority phase determines how Priority Actions and Programs (PAPs) are assigned to BIRD phases.
- Step 14 engagement type sets follow-up flags for stakeholder outreach workflows.
- Step 15 confirmation accuracy triggers plan status activation only when the respondent explicitly confirms data accuracy.

### 6.2 formulas.ts

The BIRD Score Panel uses the following formula exports from `src/lib/formulas.ts`:

| Formula | Purpose | Score Range |
|---------|---------|-------------|
| `calculateStrengthRI()` | Computes Resilience Index for Strength factors | 0-100 |
| `calculateOpportunityRI()` | Computes Resilience Index for Opportunity factors | 0-100 |
| `calculateWeaknessRisk()` | Computes Risk Level for Weakness factors | 0-100 |
| `calculateThreatVI()` | Computes Vulnerability Index for Threat factors | 0-100 |
| `calculateLeveragePriority()` | Ranks strategic options by leverage potential | Rank order |
| `estimateInvestmentROI()` | Estimates return on investment per sector | Percentage |

**Usage by Survey Step:**

| Survey Step | Formula Application | UI Impact |
|------------|---------------------|-----------|
| Steps 4-9 (Cluster SWOT) | `calculateStrengthRI()`, `calculateOpportunityRI()`, `calculateWeaknessRisk()`, `calculateThreatVI()` | Real-time BIRD score badges |
| Step 10 (IEDS) | `calculateLeveragePriority()` | Priority ranking of strategies |
| Step 13 (Budget) | `estimateInvestmentROI()` | ROI preview per sector |

**Score Computation Details:**

**Resilience Index (RI) — Strengths:**

```
RI_Strength = (Sum of (Impact_i x Likelihood_i) across all strength factors / max_possible) x 100
```

Where:
- `Impact_i` = respondent's Impact rating for strength factor i (1-5)
- `Likelihood_i` = respondent's Likelihood rating for strength factor i (1-5)
- `max_possible` = 25 x number of strength factors (maximum combined score)

**Resilience Index (RI) — Opportunities:**

```
RI_Opportunity = (Sum of (Impact_i x Likelihood_i) across all opportunity factors / max_possible) x 100
```

**Risk Level — Weaknesses:**

```
Risk_Weakness = (Sum of (Impact_i x Likelihood_i) across all weakness factors / max_possible) x 100
```

**Vulnerability Index (VI) — Threats:**

```
VI_Threat = (Sum of (Impact_i x Likelihood_i) across all threat factors / max_possible) x 100
```

**Leverage Priority:**

```
Leverage = (RI_Strength x RI_Opportunity) / (Risk_Weakness x VI_Threat)
```

Higher leverage scores indicate strategic options that can maximize strengths and opportunities while minimizing weaknesses and threats.

### 6.3 supabase.ts & API Layer

The SurveyWizard uses `src/lib/api.ts` as the primary API abstraction layer. The `submitSurvey()` function handles all submission logic:

**Submission Flow:**

```typescript
// src/lib/api.ts
import { supabase } from './supabase';

export async function submitSurvey(surveyData: SurveyPayload): Promise<SubmitResult> {
  // 1. Validate payload completeness (all 16 sections, 0-15)
  const validation = validateSurveyPayload(surveyData);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  // 2. Attempt Supabase submission
  try {
    const { data, error } = await supabase
      .from('survey_responses')
      .insert({
        // Demographics (Step 2)
        demo_name: surveyData.demo_name,
        demo_organization: surveyData.demo_organization,
        demo_province: surveyData.demo_province,
        demo_sector: surveyData.demo_sector,
        demo_org_type: surveyData.demo_org_type,

        // Cluster 1 - Foundations (Step 4)
        q_s4_tragedy_commons: surveyData.q_s4_tragedy_commons,
        q_s4_limits_growth: surveyData.q_s4_limits_growth,
        // ... 4 SWOT factor pairs (impact + likelihood)

        // Cluster 2 - Transformers (Step 5)
        q_s5_fixes_fail: surveyData.q_s5_fixes_fail,
        q_s5_successful: surveyData.q_s5_successful,
        // ... 5 SWOT factor pairs

        // Cluster 3 - Enablers (Step 6)
        q_s6_shifting_burden: surveyData.q_s6_shifting_burden,
        q_s6_growth_underinvest: surveyData.q_s6_growth_underinvest,
        // ... 12 SWOT factor pairs

        // Cluster 4 - Connectors (Step 7)
        q_s7_escalation: surveyData.q_s7_escalation,
        q_s7_limits_growth: surveyData.q_s7_limits_growth,
        // ... 16 SWOT factor pairs

        // Cluster 5 - Financiers (Step 8)
        q_s8_big_man: surveyData.q_s8_big_man,
        q_s8_shifting_burden: surveyData.q_s8_shifting_burden,
        // ... 14 SWOT factor pairs

        // Operating Systems (Step 9)
        q_s9_investment_loop: surveyData.q_s9_investment_loop,
        q_s9_governance_loop: surveyData.q_s9_governance_loop,
        // ... 14 SWOT factor pairs

        // IEDS & 3-Phase Plan (Step 10)
        q10_1_ieds_preference: surveyData.q10_1_ieds_preference,
        q10_2_phase1_priority: surveyData.q10_2_phase1_priority,
        // ... through q10_7_outcomes

        // Metrics Architecture (Step 11)
        q11_1_outcome_relevance: surveyData.q11_1_outcome_relevance,
        // ... metric validation ratings

        // Balanced Scorecard (Step 12)
        q12_5_strongest_pathway: surveyData.q12_5_strongest_pathway,
        // ... BSC validation ratings

        // Priority Actions & Budget (Step 13)
        q13_6_budget_priority_phase: surveyData.q13_6_budget_priority_phase,
        // ... budget validation ratings

        // Resources & Engagements (Step 14)
        q14_1_engagement_type: surveyData.q14_1_engagement_type,
        // ... engagement preferences

        // Review & Submit (Step 15)
        q15_1_confirm_accurate: surveyData.q15_1_confirm_accurate,
        q15_2_overall_assessment: surveyData.q15_2_overall_assessment,

        // Computed scores
        bird_score_strength_ri: surveyData.bird_score_strength_ri,
        bird_score_opportunity_ri: surveyData.bird_score_opportunity_ri,
        bird_score_weakness_risk: surveyData.bird_score_weakness_risk,
        bird_score_threat_vi: surveyData.bird_score_threat_vi,
        bird_leverage_priority: surveyData.bird_leverage_priority,

        // Metadata
        submitted_at: new Date().toISOString(),
        version: '2.0'
      })
      .select()
      .single();

    if (error) throw error;

    // 3. Clear localStorage backup on successful submission
    clearLocalStorageBackup();

    return { success: true, responseId: data.id };

  } catch (supabaseError) {
    // 4. Fallback to localStorage if Supabase fails
    saveToLocalStorageBackup(surveyData);
    return {
      success: false,
      error: supabaseError.message,
      fallback: 'localStorage'
    };
  }
}
```

**Payload Structure:**

The `SurveyPayload` type includes all 16 steps (0-15):

```typescript
interface SurveyPayload {
  // Step 1: Consent
  consent_participation: boolean;
  consent_processing: boolean;
  consent_voluntary: boolean;

  // Step 2: Demographics
  demo_name?: string;
  demo_organization?: string;
  demo_province: string;
  demo_sector: string;
  demo_org_type: string;
  demo_experience?: string;
  demo_org_size?: string;
  demo_email?: string;

  // Step 3: BEIE Framework
  q_s3_strength_1_impact: number;
  q_s3_strength_1_likelihood: number;
  // ... 2 more strength factors

  // Step 4: Cluster 1 - Foundations
  q_s4_tragedy_commons: string;     // Archetype validation
  q_s4_limits_growth: string;       // Archetype validation
  q_s4_climate_impact: number;      // SWOT factor
  q_s4_climate_likelihood: number;
  // ... 3 more SWOT factor pairs

  // Step 5: Cluster 2 - Transformers
  q_s5_fixes_fail: string;
  q_s5_successful: string;
  q_s5_halal_cert_impact: number;
  q_s5_halal_cert_likelihood: number;
  // ... 4 more SWOT factor pairs

  // Step 6: Cluster 3 - Enablers
  q_s6_shifting_burden: string;
  q_s6_growth_underinvest: string;
  // ... 12 SWOT factor pairs

  // Step 7: Cluster 4 - Connectors
  q_s7_escalation: string;
  q_s7_limits_growth: string;
  // ... 16 SWOT factor pairs

  // Step 8: Cluster 5 - Financiers
  q_s8_big_man: string;
  q_s8_shifting_burden: string;
  // ... 14 SWOT factor pairs

  // Step 9: Operating Systems
  q_s9_investment_loop: string;
  q_s9_governance_loop: string;
  // ... 14 SWOT factor pairs

  // Step 10: IEDS
  q10_1_ieds_preference: string;
  q10_2_phase1_priority: string;
  // ... through q10_7_outcomes

  // Step 11: Metrics
  q11_1_outcome_relevance: number;
  // ... metric ratings

  // Step 12: BSC
  q12_5_strongest_pathway: string;
  // ... BSC ratings

  // Step 13: Budget
  q13_6_budget_priority_phase: string;
  // ... budget ratings

  // Step 14: Resources
  q14_1_engagement_type: string;
  // ... engagement preferences

  // Step 15: Review
  q15_1_confirm_accurate: boolean;
  q15_2_overall_assessment: number;
  q15_3_strongest_aspects?: string;
  q15_4_weakest_aspects?: string;

  // Computed scores
  bird_score_strength_ri: number;
  bird_score_opportunity_ri: number;
  bird_score_weakness_risk: number;
  bird_score_threat_vi: number;
  bird_leverage_priority: number[];
}
```

### useSurveyScores Hook

The `useSurveyScores` hook provides real-time access to computed BIRD scores for the Live Score Panel:

```typescript
// src/hooks/useSurveyScores.ts
import { useMemo } from 'react';
import {
  calculateStrengthRI,
  calculateOpportunityRI,
  calculateWeaknessRisk,
  calculateThreatVI,
  calculateLeveragePriority,
  estimateInvestmentROI
} from '@/lib/formulas';

export function useSurveyScores(surveyState: SurveyState) {
  return useMemo(() => {
    // Extract SWOT ratings from all cluster steps (4-9)
    const strengthRatings = [
      // Step 3: BEIE
      { impact: surveyState.q_s3_strength_1_impact, likelihood: surveyState.q_s3_strength_1_likelihood },
      // Step 4: Cluster 1
      { impact: surveyState.q_s4_climate_impact, likelihood: surveyState.q_s4_climate_likelihood },
      // ... all strength-impact factors across steps
    ];

    const opportunityRatings = [
      // Step 5: Cluster 2
      { impact: surveyState.q_s5_halal_cert_impact, likelihood: surveyState.q_s5_halal_cert_likelihood },
      // Step 6: Cluster 3
      // ... all opportunity factors
    ];

    const weaknessRatings = [
      // Step 4-9: All weakness factors
      { impact: surveyState.q_s4_infra_gap_impact, likelihood: surveyState.q_s4_infra_gap_likelihood },
      // ... all weakness factors
    ];

    const threatRatings = [
      // Step 4-9: All threat factors
      { impact: surveyState.q_s4_security_threat_impact, likelihood: surveyState.q_s4_security_threat_likelihood },
      // ... all threat factors
    ];

    // Compute dimensional scores
    const strengthRI = calculateStrengthRI(strengthRatings);
    const opportunityRI = calculateOpportunityRI(opportunityRatings);
    const weaknessRisk = calculateWeaknessRisk(weaknessRatings);
    const threatVI = calculateThreatVI(threatRatings);

    // Compute composite leverage priority (Step 10)
    const leveragePriority = calculateLeveragePriority({
      strengthRI,
      opportunityRI,
      weaknessRisk,
      threatVI,
      iedsPreferences: surveyState.q10_1_ieds_preference
    });

    // Compute ROI preview (Step 13)
    const roiPreview = estimateInvestmentROI({
      sectorAllocations: surveyState.q13_sector_allocations,
      phasePriority: surveyState.q13_6_budget_priority_phase
    });

    return {
      strengthRI,
      opportunityRI,
      weaknessRisk,
      threatVI,
      leveragePriority,
      roiPreview,

      // Composite indices
      strategicBalanceIndex: ((strengthRI + opportunityRI) / 2) - ((weaknessRisk + threatVI) / 2) + 50,
      archetypeNetScore: computeArchetypeNetScore(surveyState)
    };
  }, [surveyState]);
}
```

**Key Implementation Notes:**

- The hook uses `useMemo` to avoid unnecessary recalculations on every render.
- Field names follow the `q_s{step}_{descriptor}` convention for Steps 3-9 (e.g., `q_s4_climate_impact`, `q_s5_halal_cert_impact`).
- Steps 10-15 use the `q{step}_{field}` convention (e.g., `q10_1_ieds_preference`, `q12_5_strongest_pathway`).
- All four resilience/risk formulas are called with the extracted rating arrays.
- The composite Strategic Balance Index normalizes scores to a 0-100 scale.
- Archetype validations are scored: Accurate = +2, Somewhat Accurate = +1, Somewhat Inaccurate = -1, Inaccurate = -2.

---

## 7. Question Types Explained

This section provides detailed guidance on each question type used throughout the BIRD 2026-2035 Validation Survey.

### SWOT Factor Scales

The SWOT assessment steps (Steps 3-9) use paired **Impact x Likelihood** rating scales. These are the most important questions in the survey, as they directly feed into the strategic priority matrices.

**Structure:**

For each SWOT factor, you provide two ratings:

| Dimension | Scale | Question |
|-----------|-------|----------|
| **Impact** | 1-5 | How significant is this factor's effect on investment? |
| **Likelihood** | 1-5 | How likely is this factor to persist or materialize? |

**Combined Score:**

The BIRD Score Panel calculates a combined factor score by multiplying Impact x Likelihood, producing a range of 1-25:

| Combined Score | Priority Level | Color Code |
|----------------|----------------|------------|
| 20-25 | Critical priority | Deep green (#022c22) |
| 15-19 | High priority | Green (#1B4D3E) |
| 10-14 | Medium priority | Yellow-Green |
| 5-9 | Low priority | Amber |
| 1-4 | Negligible priority | Gray |

**How to Use the Scales Effectively:**

- **Be discriminating**: Avoid rating every factor a 3 or 4. The value of the analysis comes from differentiation -- identifying which factors truly matter most.
- **Use the full range**: Do not hesitate to use 1 (negligible/very unlikely) or 5 (critical/very likely) when warranted.
- **Consider the time horizon**: Assess factors based on their expected behavior through 2035, not just current conditions.
- **Separate dimensions**: A factor can have high impact but low likelihood (e.g., a major natural disaster) or low impact but high likelihood (e.g., a minor policy adjustment). Rate each dimension independently.

### Systems Archetype Validation

Steps 4-9 use a specialized 4-option validation format for systems archetypes.

**The Four Options:**

| Option | Score Equivalent | Interpretation |
|--------|-----------------|----------------|
| **Accurate** | +2 | The archetype is a valid and useful model |
| **Somewhat Accurate** | +1 | The archetype has some validity but needs refinement |
| **Somewhat Inaccurate** | -1 | The archetype is largely not applicable |
| **Inaccurate** | -2 | The archetype is fundamentally wrong |

**Conditional Follow-Up:**

When you select "Somewhat Inaccurate" or "Inaccurate", a text area appears asking for explanation. Your feedback here is invaluable for:
- Removing or revising archetypes that do not reflect ground-level reality
- Identifying alternative causal mechanisms
- Adding nuance to the diagnostic analysis

**Tips for Providing Useful Archetype Feedback:**

- Be specific about which elements of the archetype do not match your experience
- Provide concrete examples or counter-examples
- Suggest alternative dynamics if you have observed different patterns
- Indicate whether the archetype might apply in some areas/contexts but not others

### Multiple Choice

Multiple choice questions appear in two formats:

**Single-Select:**
- Choose exactly one option from a list
- Used when options are mutually exclusive (e.g., "Which sector is your primary focus?")
- Marked with radio buttons (circular selection indicators)

**Multi-Select:**
- Choose one or more options from a list
- Used when multiple selections are valid (e.g., "Select all engagement formats you are interested in")
- Marked with checkboxes (square selection indicators)
- Maximum selection limits are indicated where applicable (e.g., "Select up to 3")

### Rating Scales

Rating scales use a **1-to-5 Likert format** with labeled anchors:

| Scale Point | Label |
|-------------|-------|
| 1 | Strongly Disagree / Very Poor / Not at all important |
| 2 | Disagree / Poor / Slightly important |
| 3 | Neutral / Adequate / Moderately important |
| 4 | Agree / Good / Very important |
| 5 | Strongly Agree / Excellent / Extremely important |

The specific labels vary by question context. Each rating question displays the appropriate labels alongside the numeric scale.

Rating scales are presented as a row of 5 selectable options. Click or tap the number that best represents your assessment.

### Open Text

Open text fields allow free-form written responses. These fields are used for:
- Qualitative feedback and suggestions
- Explanations of rating choices
- Identification of missing factors or priorities
- Detailed recommendations

**Guidelines for Effective Open Text Responses:**

- Be specific and concrete. Instead of "Infrastructure needs improvement," write "The Cotabato-General Santos road corridor requires widening to accommodate increased freight traffic from agribusiness investments."
- Reference specific locations, programs, or experiences where possible.
- Keep responses focused on the question asked.
- There is no minimum length, but responses of at least 2-3 sentences provide the most useful insights.
- All open text fields are optional unless explicitly marked as required.

### Checkboxes

Checkboxes are used for:
- Consent confirmation (e.g., "I agree to participate")
- Interest indication (e.g., "I would like to attend a validation workshop")
- Multi-select questions with a small number of options

Checkboxes operate independently -- each can be selected or deselected without affecting others.

---

## 8. BIRD Score Interpretation

### What the Live Score Panel Shows

The BIRD Live Score Panel provides real-time quantitative feedback as you complete the survey. The panel displays four key metrics derived from your SWOT ratings and archetype validations.

**Panel Layout:**

```
+-------------------------------------+
|      BIRD LIVE SCORE PANEL          |
+-------------------------------------+
|  Strategic Balance Index:    62     |
|  [████████████░░░░░░░░] 62%         |
+-------------------------------------+
|  Strength RI:               72.4    |
|  Opportunity RI:            65.2    |
|  Weakness Risk:             48.6    |
|  Threat VI:                 51.3    |
+-------------------------------------+
|  Archetype Validation:      +0.8    |
|  (Net agreement with models)        |
+-------------------------------------+
```

### How Scores Are Calculated

The BIRD score panel uses formula functions imported from `src/lib/formulas.ts`:

**Formula 1: Strength Resilience Index (RI)**

```
Strength RI = calculateStrengthRI(ratings)
```

Normalizes the sum of Impact x Likelihood across all strength-rated factors to a 0-100 scale.

**Formula 2: Opportunity Resilience Index (RI)**

```
Opportunity RI = calculateOpportunityRI(ratings)
```

Normalizes the sum of Impact x Likelihood across all opportunity-rated factors to a 0-100 scale.

**Formula 3: Weakness Risk Level**

```
Weakness Risk = calculateWeaknessRisk(ratings)
```

Normalizes the sum of Impact x Likelihood across all weakness-rated factors to a 0-100 scale.

**Formula 4: Threat Vulnerability Index (VI)**

```
Threat VI = calculateThreatVI(ratings)
```

Normalizes the sum of Impact x Likelihood across all threat-rated factors to a 0-100 scale.

**Formula 5: Strategic Balance Index (SBI)**

```
SBI = ((Strength RI + Opportunity RI) / 2) - ((Weakness Risk + Threat VI) / 2) + 50
```

The Strategic Balance Index synthesizes all four SWOT dimensions into a single normalized score ranging from 0 to 100:
- High strength and opportunity scores positively contribute to the balance
- High weakness and threat scores negatively contribute
- A score of 50 represents a neutral strategic position
- Scores above 50 indicate a generally favorable strategic position
- Scores below 50 indicate a challenging strategic position

**Formula 6: Archetype Validation Net Score**

```
Archetype Net = Sum(Option Value_i) / n
```

Where:
- Accurate = +2
- Somewhat Accurate = +1
- Somewhat Inaccurate = -1
- Inaccurate = -2

This produces a score ranging from -2.0 (complete disagreement with all archetypes) to +2.0 (complete agreement with all archetypes).

### Score Range Interpretations

**Resilience / Risk / Vulnerability Scores (0-100):**

| Range | Interpretation |
|-------|----------------|
| 80-100 | Very high resilience / very high risk / very high vulnerability; factors demand immediate strategic attention |
| 60-79 | High resilience / high risk / high vulnerability; significant strategic relevance |
| 40-59 | Moderate level; moderate strategic relevance |
| 20-39 | Low level; limited strategic relevance |
| 0-19 | Negligible level; minimal strategic relevance |

**Strategic Balance Index (0-100):**

| Range | Interpretation |
|-------|----------------|
| 75-100 | Strongly favorable strategic position; strengths significantly outweigh weaknesses and threats |
| 60-74 | Favorable strategic position; strengths moderately outweigh challenges |
| 45-59 | Neutral strategic position; balanced mix of strengths and challenges |
| 30-44 | Challenging strategic position; weaknesses and threats moderately outweigh strengths |
| 0-29 | Very challenging strategic position; significant strategic risks requiring urgent intervention |

**Archetype Validation Net Score (-2.0 to +2.0):**

| Range | Interpretation |
|-------|----------------|
| +1.0 to +2.0 | Strong agreement with the systems diagnostic; the causal models align well with respondent experience |
| +0.1 to +0.9 | Moderate agreement; most archetypes are broadly accurate but some need refinement |
| -0.9 to 0.0 | Moderate disagreement; several archetypes do not match ground-level reality |
| -2.0 to -1.0 | Strong disagreement; the systems diagnostic requires significant revision |

### How Scores Feed Into Final Analysis

Your individual scores are combined with all other respondents' scores through a structured aggregation process:

1. **Segmented Aggregation**: Scores are aggregated by respondent segment (government, private sector, academe, civil society, development partners) to identify convergence and divergence across stakeholder groups.

2. **Provincial Weighting**: Scores are weighted by province representation to ensure that no single province dominates the analysis.

3. **Outlier Detection**: Statistical methods identify responses that deviate significantly from the consensus, triggering qualitative follow-up where needed.

4. **Priority Matrix Construction**: The aggregated Impact x Likelihood scores produce the final SWOT priority matrices that determine which factors receive the most attention in the action plan.

5. **Archetype Retention Threshold**: Archetypes with net validation scores below zero are flagged for revision or removal from the final diagnostic.

6. **Sensitivity Analysis**: The BIRD team tests how sensitive the priority rankings are to different weighting assumptions and respondent segments.

---

## 9. For Administrators

This section is intended for BOI-MTIT BARMM staff, BIRD team members, and provincial coordinators responsible for deploying and managing the validation survey.

### How to Deploy the Survey

**Pre-Deployment Checklist:**

| Task | Responsible | Timeline |
|------|-------------|----------|
| Verify survey link is active and accessible | IT/Development team | T-7 days |
| Test survey on multiple browsers and devices | QA team | T-7 days |
| Prepare respondent contact list by segment | Provincial coordinators | T-14 days |
| Draft invitation email with clear instructions | Communications team | T-7 days |
| Set up response monitoring dashboard | Data team | T-3 days |
| Brief provincial coordinators on support procedures | BIRD team lead | T-3 days |
| Send soft launch to internal testers | BIRD team | T-3 days |
| Full launch to all respondent segments | Provincial coordinators | T-0 |

**Deployment Channels:**

1. **Email Distribution**: Send personalized invitation emails with the survey link to all identified stakeholders
2. **Provincial Coordination**: Provincial coordinators distribute links through their local networks and follow up in person
3. **Social Media**: Share the survey link through official BARMM and BOI-MTIT social media channels
4. **Workshop Integration**: Display QR codes linking to the survey at physical validation workshops
5. **Institutional Partnerships**: Request partner organizations (universities, business chambers, CSO networks) to distribute to their members

**Invitation Email Template Elements:**

- Clear subject line: "Your Input Needed: BIRD 2026-2035 Validation Survey"
- Brief explanation of what BIRD is and why their feedback matters
- Estimated completion time (45-60 minutes)
- Direct survey link (avoid requiring recipients to navigate through multiple pages)
- Mention of save-and-resume functionality
- Privacy assurance and link to privacy policy
- Deadline for completion
- Contact information for questions or technical support

### Monitoring Responses

**Key Metrics to Track:**

| Metric | Target | Frequency |
|--------|--------|-----------|
| Total responses initiated | Baseline target by segment | Daily |
| Completion rate (% of started surveys submitted) | >70% | Daily |
| Average completion time | 45-60 minutes | Weekly |
| Drop-off point (step where most respondents exit) | Identify and address | Weekly |
| Respondent segment distribution | Match target proportions | Weekly |
| Provincial distribution | Adequate coverage of all 5 provinces | Weekly |

**Monitoring Dashboard Views:**

- **Overview**: Total responses, completion rate, average scores by dimension
- **Segment Breakdown**: Responses and scores by organization type, sector, province
- **Quality Indicators**: Completion time distribution, straight-lining detection (respondents giving identical answers to all questions), open-text response rates
- **Geographic Coverage**: Map view of respondent distribution across BARMM provinces

### Exporting Data

Survey data can be exported for external analysis in the following formats:

| Format | Use Case | Notes |
|--------|----------|-------|
| **CSV** | Spreadsheet analysis (Excel, Google Sheets) | One row per respondent; columns for each question |
| **JSON** | Integration with analysis pipelines, databases | Structured format preserving data types |
| **PDF** | Individual response review, audit trail | One PDF per respondent with all answers |

**Export Procedures:**

1. Navigate to the survey administration panel
2. Select the export format and date range
3. Apply filters if needed (e.g., export only completed responses, or only responses from a specific province)
4. Click Export and download the generated file
5. Store exported files securely in accordance with the Data Privacy Act

### Analyzing Results by Respondent Segment

The BIRD analysis framework requires segmenting responses to identify convergence and divergence across stakeholder groups.

**Primary Segmentation Dimensions:**

1. **Organization Type**: Government / Private Sector / Academe / Civil Society / Development Partner
2. **Sector of Expertise**: Agriculture, Industry, Tourism, Infrastructure, Governance, etc.
3. **Province**: Basilan / Lanao del Sur / Maguindanao del Norte / Maguindanao del Sur / Tawi-Tawi / BARMM-wide
4. **Organization Size**: Micro / Small / Medium / Large

**Analytical Outputs:**

- **Consensus Map**: Factors rated consistently high or low across all segments
- **Divergence Map**: Factors with significant rating differences between segments (these require facilitated dialogue)
- **Segment Priority Rankings**: How each stakeholder group ranks the SWOT factors
- **Archetype Validation by Segment**: Which stakeholder groups agree or disagree with each systems archetype

### Iteration Triggers

The BIRD team should consider survey iteration (re-opening the survey, conducting follow-up interviews, or revising specific steps) when the following conditions are met:

| Trigger | Threshold | Action |
|---------|-----------|--------|
| Low completion rate | <50% of targeted responses submitted | Extend deadline, intensify follow-up |
| High drop-off rate | >30% of starters do not submit | Review survey length, simplify complex steps |
| Segment underrepresentation | Any segment <60% of target | Targeted outreach to underrepresented groups |
| Provincial underrepresentation | Any province <50% of target | Provincial coordinator intensification |
| Quality concerns | >20% of responses show straight-lining | Review question clarity, add attention checks |
| Significant divergence | Key factors show >1.5 point variance across segments | Plan facilitated dialogue sessions |
| Archetype rejection | Any archetype scores <-0.5 net validation | Revise or remove archetype, seek qualitative input |

---

## 10. Troubleshooting

### Browser Compatibility

**Problem**: Survey does not load or displays incorrectly.

**Solutions**:

1. **Verify browser version**: Ensure you are using a supported browser (Chrome 90+, Firefox 88+, Edge 90+, Safari 14+, Opera 76+). Update your browser if needed.
2. **Disable browser extensions**: Some ad blockers, privacy extensions, or script blockers may interfere with survey functionality. Temporarily disable extensions and reload the page.
3. **Try an alternative browser**: If the issue persists in one browser, try accessing the survey in a different supported browser.
4. **Clear cache and cookies**: If the survey loaded previously but no longer works, clearing your browser's cache and cookies for the survey site may resolve the issue.
5. **Disable compatibility mode**: If using Microsoft Edge, ensure Internet Explorer compatibility mode is disabled.

**Problem**: Survey loads but interactive elements (scales, buttons) do not respond.

**Solutions**:

1. Ensure JavaScript is enabled in your browser settings
2. Disable any browser extensions that block JavaScript execution
3. Try refreshing the page (press F5 or Ctrl+R)

### Session Timeout Handling

**Problem**: You were interrupted and your session seems to have timed out.

**Solutions**:

1. **Do not panic**: The survey saves your responses to localStorage every time you navigate between steps. Your data is stored in your browser, not on a server session.
2. **Reopen the survey link**: Simply navigate back to the survey URL. Your saved responses will be automatically restored from localStorage.
3. **Check the step jumper**: Use the step jumper to verify which steps have been completed and resume where you left off.
4. **If responses are missing**: This may occur if you were using incognito/private browsing, cleared browser data, or switched devices. In this case, you will need to re-enter your responses. Consider using a standard (non-incognito) browser window for the survey.

**Important Note About Server Timeouts**: Unlike traditional web applications that store session data on a server with time limits, the BIRD survey stores your progress locally in your browser. There is no server-side session timeout. Your responses remain available as long as you use the same browser and device and do not manually clear site data.

### Image Loading Issues

**Problem**: Reference images, charts, or diagrams do not load or appear broken.

**Solutions**:

1. **Check your internet connection**: Images may fail to load on slow or intermittent connections. Ensure you have a stable connection of at least 1 Mbps.
2. **Wait and refresh**: Large images may take time to load on slower connections. Wait 10-15 seconds, then refresh the page.
3. **Disable image blockers**: Some privacy extensions or corporate firewalls block images from certain domains. Check your browser settings or contact your IT administrator.
4. **Try a different network**: If you are on a corporate or institutional network with strict firewall rules, try accessing the survey from a different network (e.g., mobile hotspot).
5. **Text alternatives**: All images in the survey have text descriptions. If an image fails to load, read the descriptive text provided alongside or below the image placeholder to understand the content.

### Form Validation Errors

**Problem**: The survey prevents you from proceeding and displays a validation error.

**Common Validation Errors and Solutions:**

| Error Message | Cause | Solution |
|---------------|-------|----------|
| "This field is required" | A mandatory question has not been answered | Scroll up to find the highlighted field and provide an answer |
| "Please select an option" | A single-select or multi-select question has no selection | Click or tap one of the available options |
| "Please enter a valid email address" | The email field contains an invalid format | Enter a valid email address (e.g., name@example.com) or leave blank if optional |
| "Please check the consent box to proceed" | The consent checkbox in Step 1 is unchecked | Read the consent statement and check the box if you agree to proceed |
| "You have exceeded the maximum number of selections" | A multi-select question with a limit has been over-selected | Deselect one or more options to meet the stated limit |

**General Validation Tips:**

- Required fields are marked with an asterisk (*) or "Required" label
- Scroll through the entire step to ensure no required fields are missed
- Validation errors are typically displayed in red text near the field that needs correction
- If you believe a validation error is incorrect or the field should be optional, contact the BIRD team for assistance

### Contacting Support

If you encounter technical issues not resolved by the troubleshooting steps above, or if you have questions about the survey content or process, contact the BIRD team:

**Technical Support Email:** `bird-team@asilvainnovations.com`

**What to Include in Your Support Request:**

1. **Your name and organization** (optional, but helpful for follow-up)
2. **A clear description of the problem** -- what were you trying to do, and what happened instead?
3. **The step or section** where the issue occurred (e.g., "Step 7, when rating the corridor infrastructure weakness factor")
4. **Your device and browser information**:
   - Device type (desktop, laptop, tablet, phone)
   - Operating system (Windows, macOS, Android, iOS) and version
   - Browser name and version
5. **Screenshots** -- if possible, attach a screenshot showing the issue
6. **Error messages** -- copy and paste any error messages displayed

**Expected Response Time:**

| Inquiry Type | Response Time |
|--------------|---------------|
| Technical issues preventing survey completion | Within 24 hours |
| Content questions about survey questions | Within 48 hours |
| General feedback and suggestions | Within 72 hours |

---

## 11. Frequently Asked Questions (FAQ)

### General Questions

**Q1: Who should take this survey?**

The survey is designed for all stakeholders with knowledge of or interest in BARMM's economic development and investment climate. This includes:
- Government officials at national, regional, provincial, and municipal levels
- Private sector representatives, including business owners, investors, and chamber of commerce members
- Academic and research institution faculty and staff
- Civil society organization leaders and members
- Development partner and donor agency staff
- Individual citizens with informed perspectives on BARMM's development

There are no prerequisites or qualifications required. Your perspective is valuable regardless of your formal role or level of expertise.

**Q2: Is participation mandatory?**

No. Participation is entirely voluntary. While we strongly encourage all invited stakeholders to participate, there is no penalty for declining. Government officials should check with their respective agencies regarding any internal directives about participation.

**Q3: Can I skip steps or questions?**

Yes. Only questions explicitly marked as "Required" must be answered to proceed. You may skip any optional questions or entire steps if they are not relevant to your expertise. However, please note that comprehensive responses provide the most valuable input for the roadmap.

**Q4: How long will the survey take?**

The full survey typically takes 45 to 60 minutes to complete. If you have limited time, you may complete only the steps most relevant to your expertise. The save-and-resume feature allows you to complete the survey across multiple sessions.

**Q5: Is there a deadline for completing the survey?**

Yes. The survey will remain open until the stated deadline, which will be communicated in your invitation email and on the survey landing page. If you need an extension due to exceptional circumstances, contact the BIRD team.

### Data and Privacy Questions

**Q6: Is my data safe?**

Yes. The survey is fully compliant with the Data Privacy Act of 2012 (RA 10173). All data is transmitted over secure HTTPS connections and stored on encrypted servers. Access is limited to authorized BIRD team members. For complete details, please review the Privacy Policy at `https://asilvainnovations.github.io/BIRD-2026-2035/public/privacy-policy.html`.

**Q7: Will my responses be anonymous?**

You have the option to complete the survey anonymously. The Organization Name and Email Address fields are optional. Even if you provide your email for follow-up purposes, your individual responses will not be publicly attributed to you. Only aggregated, anonymized data will be published in the final roadmap.

**Q8: Can I request to see or delete my responses after submission?**

Yes. You have the right to access, correct, or erase your personal data under the Data Privacy Act. Contact the BIRD team at `bird-team@asilvainnovations.com` with your request. Please note that once data has been aggregated and analysis has begun, individual responses cannot be extracted from aggregated datasets, but your raw data can be deleted from the database.

**Q9: Who will have access to my individual responses?**

Only authorized members of the BIRD technical team (BOI-MTIT BARMM staff and designated analysts) have access to individual responses. No external parties, including political offices or private entities, will have access to identifiable individual responses.

### Technical Questions

**Q10: Can I change my answers after submitting the survey?**

Individual responses cannot be edited after final submission. However, if you have not yet clicked the final "Submit" button, you can navigate back to any previous step using the Previous button or Step Jumper and modify your answers. If you have already submitted and need to make a correction, contact the BIRD team.

**Q11: What happens if I close my browser before finishing?**

Your responses are automatically saved to your browser's localStorage every time you navigate between steps. If you close your browser and reopen the survey link later (on the same device and browser), your progress will be restored. You can then continue from where you left off.

**Q12: Can I complete the survey on my phone?**

Yes. The survey is fully responsive and works on smartphones, tablets, laptops, and desktop computers. However, some reference images and charts are easier to view on larger screens. For the best experience, we recommend using a tablet in landscape orientation or a laptop/desktop computer.

**Q13: Do I need to create an account or log in?**

No. The survey does not require user registration, account creation, or password login. You access the survey directly through the provided link. Your progress is saved via browser localStorage, not through a user account system.

### Content Questions

**Q14: I am not an expert in some of the topics covered. Should I still answer those questions?**

Answer the questions where you have knowledge or experience, and skip those outside your expertise. There is no penalty for skipping questions. If you have general knowledge but not deep expertise, your perspective as a generalist is still valuable -- just answer to the best of your knowledge.

**Q15: What are systems archetypes, and how should I assess them?**

Systems archetypes are causal loop models that describe recurring patterns of behavior in complex systems. They help explain why certain problems persist despite repeated interventions. You do not need formal training in systems thinking to assess them. Read each archetype description and ask yourself: "Does this pattern match what I have observed or experienced in BARMM?" Select the accuracy option that best reflects your assessment. If you disagree, use the follow-up text field to explain why -- your explanation is often more valuable than the rating itself.

**Q16: What if I disagree with the premise of a question?**

Use the open-text fields to explain your disagreement. If a question assumes something you believe is incorrect, note this in the comments. Your critical feedback helps identify blind spots in the analysis and improves the final roadmap.

**Q17: What happens after I submit the survey?**

After submission:
1. You will see a confirmation message thanking you for your participation
2. Your responses are securely stored in the BIRD database
3. The BIRD team aggregates all responses across stakeholder segments
4. Results are analyzed to produce priority matrices, revised archetypes, and thematic synthesis
5. Key findings are presented at public validation workshops
6. The final BIRD 2026-2035 document incorporates the validated findings
7. If you provided your email and opted in, you may be invited to follow-up workshops or sent a summary of findings

**Q18: Will I receive a copy of the final BIRD 2026-2035 document?**

The final BIRD 2026-2035 document will be a public document published by BOI-MTIT BARMM. It will be available on the official BARMM government website and distributed to all stakeholders. If you provided your email address, you will receive notification when the document is published.

**Q19: Can I complete the survey as a group or organization?**

The survey is designed for individual responses to capture diverse perspectives. However, organizations may coordinate internal discussions and have a designated representative complete the survey on behalf of the organization's consensus view. If multiple individuals from the same organization wish to participate, each should complete the survey independently, as their individual perspectives provide richer data.

**Q20: I received multiple invitations to this survey from different sources. Should I complete it more than once?**

No. Please complete the survey only once. Multiple submissions from the same individual can skew the analysis. If you accidentally submit twice, contact the BIRD team to have the duplicate removed.

---

## 12. Appendix

### Glossary of BIRD Terms

| Term | Definition |
|------|------------|
| **BARMM** | Bangsamoro Autonomous Region in Muslim Mindanao -- the autonomous region established under the Bangsamoro Organic Law, comprising the provinces of Basilan, Lanao del Sur, Maguindanao del Norte, Maguindanao del Sur, and Tawi-Tawi, plus the cities of Cotabato and Lamitan. |
| **BEIE Framework** | Business Environment, Economic Foundations, Infrastructure & Connectivity, Enabling Conditions -- the four-pillar analytical framework organizing BIRD 2026-2035. |
| **BIMP-EAGA** | Brunei-Indonesia-Malaysia-Philippines East ASEAN Growth Area -- a subregional economic cooperation initiative of which BARMM is a key participant. |
| **BIRD** | Bangsamoro Investment Roadmap -- the comprehensive 10-year strategic plan for attracting investment and promoting economic development in BARMM. |
| **BOI-MTIT BARMM** | Board of Investments - Ministry of Trade, Investments and Tourism of the Bangsamoro Autonomous Region in Muslim Mindanao -- the lead agency developing BIRD 2026-2035. |
| **BSC** | Balanced Scorecard -- a strategic performance management framework used to track implementation of BIRD priorities across multiple dimensions. |
| **Causal Loop Diagram (CLD)** | A visual tool used in systems thinking to map the cause-and-effect relationships between variables in a complex system, showing reinforcing and balancing feedback loops. |
| **CSO** | Civil Society Organization -- non-governmental, non-profit organizations working in the public interest, including community-based organizations, advocacy groups, and non-governmental organizations (NGOs). |
| **Data Privacy Act 2012** | Republic Act No. 10173 -- the Philippine law governing the collection, processing, and protection of personal information. |
| **DPA** | Data Privacy Act -- short form of Republic Act No. 10173. |
| **FDI** | Foreign Direct Investment -- investment made by a company or individual from one country into business interests located in another country. |
| **IEDS** | Inclusive Economic Development Strategy -- a framework for ensuring that economic growth benefits all segments of society, particularly marginalized groups. |
| **Likert Scale** | A psychometric scale commonly used in surveys to measure attitudes or opinions, typically ranging from 1 (strongly disagree/negative) to 5 (strongly agree/positive). |
| **localStorage** | A web browser technology that allows websites to store data locally on the user's device, enabling the save-and-resume functionality of the BIRD survey. |
| **ODA** | Official Development Assistance -- government aid provided by donor countries and multilateral agencies to support economic development and welfare in developing countries. |
| **PAP** | Priority Actions and Programs -- specific interventions identified in BIRD 2026-2035 for implementation during each phase. |
| **SDGs** | Sustainable Development Goals -- the 17 global goals adopted by United Nations member states in 2015 as part of the 2030 Agenda for Sustainable Development. |
| **SME** | Small and Medium Enterprise -- businesses falling below certain thresholds in terms of employees, assets, or revenue, as defined by the Philippine Magna Carta for MSMEs. |
| **SO Matrix** | Strengths-Opportunities Matrix -- a strategic planning tool mapping internal strengths against external opportunities to identify growth strategies. |
| **ST Matrix** | Strengths-Threats Matrix -- a strategic planning tool mapping internal strengths against external threats to identify defensive strategies. |
| **SWOT** | Strengths, Weaknesses, Opportunities, Threats -- a strategic planning framework used to evaluate the competitive position and identify strategic priorities. |
| **Systems Archetype** | A recurring pattern of behavior in complex systems, described using causal loop diagrams, that helps diagnose systemic problems and identify leverage points for intervention. |
| **WE Matrix** | Weaknesses-Opportunities Matrix -- a strategic planning tool mapping internal weaknesses against external opportunities to identify improvement strategies. |
| **WT Matrix** | Weaknesses-Threats Matrix -- a strategic planning tool mapping internal weaknesses against external threats to identify survival strategies. |

### Respondent Type to Recommended Steps Mapping

While all respondents are encouraged to complete the full survey, the following table suggests which steps are most relevant to each stakeholder type. This can help you prioritize if you have limited time.

| Respondent Type | Must-Complete Steps | Highly Recommended Steps | Optional Steps |
|-----------------|---------------------|--------------------------|----------------|
| **National Government Official** | 1, 2, 10, 11, 15 | 4, 6, 7, 8, 9 | 3, 5, 12, 13, 14 |
| **BARMM Regional Government Official** | 1, 2, 9, 10, 11, 15 | 3, 4, 5, 6, 7, 8, 13 | 12, 14 |
| **Provincial/Municipal Official** | 1, 2, 9, 10, 15 | 3, 4, 5, 6, 7, 12, 13 | 8, 11, 14 |
| **Private Sector -- Agriculture** | 1, 2, 3, 5, 15 | 6, 7, 10, 11, 12, 13 | 4, 8, 9, 14 |
| **Private Sector -- Industry/Manufacturing** | 1, 2, 3, 5, 15 | 10, 11, 12, 13 | 4, 6, 7, 8, 9, 14 |
| **Private Sector -- Tourism** | 1, 2, 3, 5, 15 | 6, 7, 10, 11, 12 | 4, 8, 9, 13, 14 |
| **Private Sector -- Services/IT** | 1, 2, 3, 5, 15 | 10, 11, 12, 13 | 4, 6, 7, 8, 9, 14 |
| **Academic/Researcher** | 1, 2, 3, 15 | 4, 5, 6, 7, 8, 9 | 10, 11, 12, 13, 14 |
| **Civil Society Organization** | 1, 2, 6, 9, 15 | 3, 4, 5, 7, 12 | 8, 10, 11, 13, 14 |
| **Development Partner/Donor** | 1, 2, 9, 10, 15 | 4, 6, 7, 11, 13 | 3, 5, 8, 12, 14 |
| **General Citizen** | 1, 2, 15 | 3, 4, 5, 6, 7 | 8, 9, 10, 11, 12, 13, 14 |

**Note**: These recommendations are guidelines, not restrictions. All steps are open to all respondents regardless of organization type. If you have expertise or interest in steps not listed as "must-complete" for your type, we encourage you to complete them.

### Contact Information

**BIRD 2026-2035 Technical Team**

| Role | Contact |
|------|---------|
| **Technical Support & General Inquiries** | `bird-team@asilvainnovations.com` |
| **Data Privacy Officer** | Refer to Privacy Policy at `https://asilvainnovations.github.io/BIRD-2026-2035/public/privacy-policy.html` |
| **Provincial Coordinator -- Basilan** | Contact through BOI-MTIT BARMM provincial office |
| **Provincial Coordinator -- Lanao del Sur** | Contact through BOI-MTIT BARMM provincial office |
| **Provincial Coordinator -- Maguindanao del Norte** | Contact through BOI-MTIT BARMM provincial office |
| **Provincial Coordinator -- Maguindanao del Sur** | Contact through BOI-MTIT BARMM provincial office |
| **Provincial Coordinator -- Tawi-Tawi** | Contact through BOI-MTIT BARMM provincial office |

**Institutional Address:**

Board of Investments
Ministry of Trade, Investments and Tourism (MTIT)
Bangsamoro Autonomous Region in Muslim Mindanao (BARMM)
Cotabato City, Philippines

**Online Resources:**

- BIRD 2026-2035 Public Page: `https://asilvainnovations.github.io/BIRD-2026-2035/`
- Privacy Policy: `https://asilvainnovations.github.io/BIRD-2026-2035/public/privacy-policy.html`
- BOI-MTIT BARMM Official Website: Available through the BARMM official government portal

---

## Document Information

| Field | Details |
|-------|---------|
| **Document Title** | BIRD 2026-2035 Validation Survey -- Complete Guide |
| **Version** | 2.0 |
| **Date** | January 2025 |
| **Prepared For** | Board of Investments - Ministry of Trade, Investments and Tourism (BOI-MTIT), Bangsamoro Autonomous Region in Muslim Mindanao |
| **Classification** | Public Document |
| **Related Documents** | BIRD 2026-2035 Draft Report, Privacy Policy, Survey Instrument Specification, Integration Architecture Document |

---

*This guide is a living document and may be updated to reflect changes to the survey instrument or process. Check the BIRD project page for the latest version.*

*Copyright 2025 Bangsamoro Autonomous Region in Muslim Mindanao. All rights reserved. Published under open access principles for public stakeholder engagement.*
