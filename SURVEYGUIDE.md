# SURVEYGUIDE.md — BIRD 2026–2035 SurveyWizard Integration Guide

> **Version:** 1.1  
> **Date:** 2026-07-16  
> **Purpose:** Wire the SurveyWizard to the BIRD strategic planning engine, Supabase backend, and domain-specific computation layer.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Architecture Overview](#2-architecture-overview)
3. [File-by-File Integration Assessment](#3-file-by-file-integration-assessment)
4. [Required Enhancements](#4-required-enhancements)
5. [Implementation Roadmap](#5-implementation-roadmap)
6. [Appendix: Type Mappings](#6-appendix-type-mappings)

---

## 1. Executive Summary

The SurveyWizard (`src/components/strategic/SurveyWizard.tsx`) is a 16-step wizard that collects stakeholder input across the BEIE framework, Moral Governance, cluster assessments, and strategic validation. The uploaded BIRD files provide:

| File | Role | Integration Necessity |
|------|------|----------------------|
|  `survey-schema.ts` | Core validation survey schema | **CRITICAL** - Survey responses shall call and feed into tables and policies
| `strategicPlanStore.ts` | Core domain schema (types, factories, storage) | **CRITICAL** — Survey responses must hydrate into `StrategicPlan` entities |
| `formulas.ts` | BIRD mathematical formulas (RI, KPI, ROI, leverage) | **CRITICAL** — Survey scoring must use official BIRD formulas |
| `supabase.ts` | Supabase client + Edge Functions | **CRITICAL** — Survey submission must persist via `STRATEGIC_PLANNER_SYNC` |
| `utils.ts` | Utilities + template converter | **HIGH** — Template-to-plan conversion for survey-generated plans |
| `motion-shim.tsx` | Framer-motion shim | **LOW** — Only if SurveyWizard uses animations |

**Note:** All files except `motion-shim.tsx` require integration wiring. The SurveyWizard currently submits raw survey data; it must be enhanced to:

- Compute BIRD scores using `formulas.ts` during survey progression
- Convert survey responses into `StrategicPlan` entities using `strategicPlanStore.ts`
- Persist plans via Supabase Edge Functions in `supabase.ts`
- Use `utils.ts` for SWOT metric computation and template conversion

Critical To-Do: 
1. Read all uploaded files to understand codebase structure
2. Create Section0 with compelling Validation Survey banner + srategic intent
    2.1   Ensure a compelling web copy consistent with the attached survey-orientation.html
    2.2  Incorporate a full view and wide format of this Validation Survey Banner- https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Validation%20Survey%20Banner.png
3. Re-create Section 1 for Privacy, Consent, and Confidentiality (hyperlink public/privacy-policy.html and public/cookies-policy.html
4. Re-create Section 2 for Demographic Profile (excluding organization)
5. Re-create Section 3 for intro to Systems Thinking, Paradigm Shift, and BEIE 101
5.1 Embed this video in  its Wide and Full View Format 
Title: Systems Thinking: Moving from Checklists to Interconnected Investment Ecosystem
Description: Discover how the Bangsamoro Investment Roadmap (BIRD 2026–2035) turns fragmented efforts into a unified engine of growth. This video unpacks: Systems Thinking — shifting from checklists to interconnected strategies; Feedback Loops — cycles that amplify progress and stabilize change; Causal Loop Diagrams — visuals that expose traps and leverage points; and  Leverage Strategies — small shifts sparking big gains in governance, infrastructure, and equity. From governance hurdles to resource equity, see how Bangsamoro can move beyond quick fixes toward lasting systemic solutions.
URL: https://youtu.be/VBAHk0WYz_c?si=sbA9QhA4M791C1ET

5. 2 From Sector-Based Planning to Ecosystem Approach - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/From%20Sector-Based%20Planning%20to%20BEIE%20Approach.png
Description: The image illustrates a mental model shift—from siloed development to an interconnected ecosystem that drives inclusive and sustainable growth.
* On the left, sector-based planning is shown as reactive and fragmented—where infrastructure follows production, capital is allocated by single-sector grants, and market access remains limited to raw exports.
* On the right, the BEIE approach integrates systems thinking: infrastructure is primed first, equity extends across island provinces, financing is synchronized through Shariah-compliant instruments, and market access connects to global halal and green economies.
How can stakeholders across government, business, and civil society work together to make the BEIE ecosystem approach more actionable in real investment planning? Write your answer in one to two sentences.
5.3 BEIE Framework -https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/BEIE%20Framework%20-1%20.png
Description: The “Bangsamoro Economic and Investment Ecosystem” presents a circular system powered by Moral Governance at its center—symbolizing ethical leadership as the engine of development.
Surrounding it are five interconnected components:
* Foundations — agriculture, forestry, and energy as the resource base.
* Transformers — industries and halal manufacturing that create value.
* Financiers —  Islamic banking, waqf, sukuk, taqaful, and microfinance that empower expansion.
* Connectors — trade, tourism, and regional links (like BIMP‑EAGA) that open markets.
* Enablers — infrastructure, health, and education providing support systems.
Together, these parts form a cohesive ecosystem where governance, finance, production, and connectivity work in harmony to drive sustainable and inclusive growth in Bangsamoro.

6. Re-create Section 4 for Cluster 1 - Foundations
6.1 Incorporate a wide and full view format of this image[https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Cluster%201-Foundations.png]
“Cluster 1 | Foundations: The Infrastructure‑First Resource Base”** illustrates the core resource pillars driving Bangsamoro’s economy.  
It highlights four sectors:  
- **Agri‑Fisheries** — contributes 32.4 % of GRDP (₱97.2 B), led by Tawi‑Tawi seaweed and Maguindanao rice/corn production.  
- **Energy** — BARMM has a 75.86 % renewable mix from hydro, solar, and biomass, essential for industrial growth.  
- **Forestry** — massive untapped carbon and ecosystem service potential.  
- **Environment** — positions the green economy as a revenue generator rather than a compliance cost.  
These elements sectors the **resource base** that supports industrialization and sustainable development under the Bangsamoro Investment Roadmap 2026‑2035 .  
Question:
> “How effectively do you think BARMM’s agriculture, fisheries, forestry, energy, and environmental sectors are being integrated to form a sustainable resource base for investment growth?”
Critical Note: Transfer here questions on Green Economy in current Section 12.
> Select critical and relevant SWOT scale questions in the attached SWOT_scale_questions.md, and insert here.
>  Select relevant Shorten Systems Mapping questions in the attached BIRD-Systems-Archetypes-Descriptions-and-Validation-Questions.md, shorten the description in a succinct way and insert here.
> Insert this image [https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Maguidano-del-Sur.png] Description: **“Maguindanao del Sur: The Agro‑Industrial Breadbasket”** shows how the province moves from raw production to higher‑value processing.  
It outlines three layers of economic activity:  
- **Raw Inputs (Foundations):** fertile plains along the Pulangi River basin support agriculture and fisheries.  
- **Modern Processing (Transformers):** shifting from commodity exports to value‑added products like VCO, desiccated coconut, corn starch, and premium rice milling.  
- **Logistics Grid (Enablers):** integrating farm‑to‑market roads and solar‑dryer warehousing to support distribution.  
The key message: **capture processing margins instead of relying on low‑yield raw extraction.**  
**Question:**  
> “Do you agree that improving processing and logistics infrastructure in Maguindanao del Sur will significantly increase the value of its agricultural output?”

7. Re-create Section 5 for Cluster 2 - Transformers
> Select critical and relevant SWOT scale questions in the attached SWOT_scale_questions.md, and insert here.
>  Select relevant Shorten Systems Mapping questions in the attached BIRD-Systems-Archetypes-Descriptions-and-Validation-Questions.md, shorten the description in a succinct way and insert here.
> Insert a wide format and full view of this image [https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Cluster%202%20_%20Transformers.png]
Description: **“Cluster 2 | Transformers: Engines of Value Creation”** shows how Bangsamoro’s industrial sector should transform raw materials into high‑value halal products for export.  
It illustrates a three‑stage progression:  
- **Raw Material (Tier 1):** basic agro‑processing from agriculture and fisheries.  
- **High‑Value Processing (Tier 2):** halal‑certified MSMEs and the WOW Matnog Special Economic Zone driving industrial growth.  
- **Premium Export (Tier 3):** halal pharmaceuticals, cosmetics, and premium foods targeting the USD 2.3 trillion ASEAN halal market.  
**Question:**  
> “Do you believe strengthening halal‑certified processing industries will help Bangsamoro capture a larger share of the ASEAN halal market?”
> Insert this image [https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Transformers-Farm-to-Market%20Pipeline%20.png]
Description: **“Transformers: MAFAR Halal Farm‑to‑Market Pipeline”** illustrates the step‑by‑step flow that connects production to export within Bangsamoro’s halal value chain.  
It shows four linked stages:  
1. **Input Supply** — hatcheries, aqua‑feed mills, and seaweed buying stations.  
2. **Cold Chain & Logistics** — farm‑to‑market roads, ice plants, and cold‑storage facilities to reduce post‑harvest losses.  
3. **Processing** — halal livestock, poultry, seaweed, and agri‑fishery plants.  
4. **Market Linkage** — halal pasalubong centers and BIMP‑EAGA export integration.  
These stages depict how infrastructure physically resolves historical bottlenecks and enables a seamless halal farm‑to‑market system.  
**Question:**  
> “Do you think improving cold‑chain and logistics infrastructure will significantly strengthen Bangsamoro’s halal farm‑to‑market pipeline?”
> Insert this image: [https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Industrial%20and%20Economic%20Zones.png]
Description: **“Industrial & Economic Zones”** highlights Bangsamoro’s strategic hubs for manufacturing, trade, and logistics.  
It presents two key sites:  
- **Polloc Freeport & EcoZone (PFEZ)** —a 119‑hectare agro‑industrial hub in Parang, Maguindanao del Norte, funded by ADB and focused on fuel and logistics.  
- **WOW Matanog Special Economic Zone** — the upcoming Bangsamoro Halal Park, a private‑led initiative for halal‑compliant manufacturing and trade aligned with global standards.  
They represent the region’s shift toward integrated industrial growth and ASEAN halal‑economy participation.  
**Question:**  
> “Do you think developing specialized economic zones like Polloc Freeport and WOW Matanog will significantly boost Bangsamoro’s industrial and halal trade capacity?”

8. Section 5 Cluster 3 - Enablers - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Cluster%203%20Enablers.png
Decription:“Cluster 3 | Enablers: Constructing the Support Architecture” illustrates four enablers for a sustainable value creation in the Bangsamoro economy. These enablers form the backbone that supports industrialization and inclusive growth across Bangsamoro.
* Digital Connectivity — expanding broadband, e‑governance, and cybersecurity to accelerate investment facilitation.
* Physical Infrastructure — improving ports, airports, and cold‑chain logistics to reduce post‑harvest losses and support halal integrity.
* Education & Skills — aligning TESDA programs with industry needs to close the 59.3 % literacy and skills gap.
* Health & Social Protection — ensuring workforce resilience through accessible healthcare and social safety nets.
8.1 > Select critical and relevant SWOT scale questions in the attached SWOT_scale_questions.md, and insert here.
8.2 > Select relevant Shorten Systems Mapping questions in the attached BIRD-Systems-Archetypes-Descriptions-and-Validation-Questions.md, shorten the description in a succinct way and insert here.
8.3 Capitalizing Cultural Advantage - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Capitalizing%20Cultural%20Advantage%20-%20Halal%20Industry%20Adv.png
Description: “The Halal Industry Advantage” highlights Bangsamoro’s cultural and geographic strengths in capturing the ASEAN halal market.
It presents three key sectors of opportunity:
* Halal Food & Beverage — focusing on coconut‑based by‑products.
* Halal Cosmetics — beauty products tailored for Muslim consumers.
* Halal Pharmaceuticals — compliant medicine and healthcare solutions.
A map shows the BIMP‑EAGA trade corridor (Brunei‑Indonesia‑Malaysia‑Philippines), emphasizing Bangsamoro’s strategic position serving a large regional Muslim population.
Suggested Question:
“Rank which halal sector—Food & Beverage, Cosmetics, or Pharmaceuticals—offers the greatest growth potential for Bangsamoro’s ASEAN market integration.”

8.4 The Enabling Grid - 2nd Layer of BARMM Interconnectivity - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Layer%202%20-%20The%20Enabling%20Grid%20and%20Lawof%20Sequencing.png 
Description:  The Enabling Grid & The Law of Sequencing” illustrates the step‑by‑step infrastructure progression required before large‑scale industrial growth can occur in Bangsamoro.
It shows four sequential stages:
1. Energy Priming — connecting island provinces to the Mindanao grid through projects like the ₱6.67 B Zamboanga‑Basilan Interconnection.
2. Physical Mobility — improving connectivity via major bridges and transport links to enhance labor and market access.
3. Logistics Integrity — building modern cold‑storage and warehousing to preserve halal product quality post‑harvest.
4. Industrial Scaling — once power, roads, and storage are secured, capital investment can safely expand agro‑industrial operations.
The diagram emphasizes that infrastructure readiness must precede industrial scaling to ensure sustainable growth.
Suggested Question:
On a scale of 1 to 5, how effectively do you think Bangsamoro’s current infrastructure sequencing (energy, mobility, logistics, industrial) supports future industrial expansion?

Capitalizing Cultural Advantage - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Capitalizing%20Cultural%20Advantage%20-%20Halal%20Industry%20Adv.png
Description: “The Halal Industry Advantage” highlights Bangsamoro’s cultural and geographic strengths in capturing the ASEAN halal market.
It presents three key sectors of opportunity:
* Halal Food & Beverage — focusing on coconut‑based by‑products.
* Halal Cosmetics — beauty products tailored for Muslim consumers.
* Halal Pharmaceuticals — compliant medicine and healthcare solutions.

A map shows the BIMP‑EAGA trade corridor (Brunei‑Indonesia‑Malaysia‑Philippines), emphasizing Bangsamoro’s strategic position serving a large regional Muslim population.
Suggested Question:
“Rank which halal sector—Food & Beverage, Cosmetics, or Pharmaceuticals—offers the greatest growth potential for Bangsamoro’s ASEAN market integration.”

The Digital Transformation Plan - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Digital%20Transformation%20Master%20Plan.png
“Digital Transformation (BEGMP)” presents Bangsamoro’s roadmap for bridging the digital divide and enabling efficient governance.
It contrasts “The Gap”—low internet penetration, fragmented government systems, and limited digital skills—with “The Roadmap”, which includes:
* Broadband & Connectivity — building data centers and last‑mile hubs.
* Smart Cities — establishing public safety and command centers.
* E‑Government — creating digital identities and shared services.
* Cybersecurity — ensuring data protection and secure transactions.
These components outline a comprehensive plan for digital inclusion and governance modernization.
Suggested Question:
“On a scale of 1 to 5, how confident are you that the BEGMP roadmap will effectively bridge Bangsamoro’s digital divide and improve governance efficiency?”

Tourism Master Plan - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Tourism%20Master%20Plan.png
Description: The “Tourism Master Plan (BTDP 2024–2033)” outlines Bangsamoro’s ten‑year strategy for building global tourism competitiveness.
It shows three sequential phases:
* Phase 1 – Organizing (2025–2026): quick wins and legislation.
* Phase 2 – Stabilizing (2027–2028): infrastructure implementation.
* Phase 3 – Institutionalizing (2029–2033): global branding and evaluation.
A pie chart highlights that ₱161.97 billion will fund the plan, with 93 % allocated to physical access and connectivity—mainly tourism infrastructure support.
Suggested Guestion:
“On a scale of 1 to 5, how confident are you that prioritizing infrastructure and connectivity will make Bangsamoro globally competitive in tourism by 2033?”

Tourism and Digital Connectivity - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Tourism%20and%20Digital%20Connectivity.png
Description: Reinforcing Loop II: Digital Infrastructure & Smart Tourism” emphasizes that digital infrastructure enables tourism, which in turn fuels broader economic development.
It shows two layers:
* The Activation (Tourism Master Plan – BTDP): a ₱161.97 billion investment where 93.54 % of funds go to physical access and connectivity for sites like Ligawasan Marsh and Ramba Park.
* The Foundation (Digital Transformation – BEGMP): broadband, smart cities, e‑government, and cybersecurity forming the digital backbone for tourism and regional growth.
Suggested Question: “Rank these components—Broadband, Smart Cities, E‑Government, Cybersecurity—by their importance to tourism.”


Activating the Enablers- Primed by Moral Governance- https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Activating%20the%20Enablers%20-%20Infra%20Primed%20by%20Moral%20Governance.png
The image  illustrates how Moral Governance acts as the operating system that powers Bangsamoro’s physical development.
* On the left, Transparency, Accountability, and Stability form the governance core that builds trust — described as the currency of investment.
* On the right, the physical backbones show measurable infrastructure goals:
    * 100% Electrification through renewable expansion
    * 85% Broadband Penetration by 2035
    * 30% Logistics Cost Reduction via improved inter‑island routes
These elements depict how ethical governance can directly enable infrastructure growth and investor confidence.
How realistic is it that Moral Governance can effectively deliver these physical enablers — electrification, broadband connectivity, and logistics efficiency — in BARMM?
* ☐ Very realistic
* ☐ Somewhat realistic
* ☐ Needs stronger institutional support
* ☐ Not realistic

9. Re-create Section 7 Cluster 4 - Connectors (please see additional URLs for images and their descriptions. - Insert the wide and full view format of this image https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Cluster%204_%20Connectors.png
Description: Cluster 4 | Connectors- Linking Local Value to Global Demand” visually maps how Bangsamoro (BARMM) connects its halal and cultural assets to international markets.
It highlights two major international trade routes:
* Target Vector 1 – BIMP‑EAGA Corridor: leveraging BARMM’s location to capture a 3 % share of the ASEAN halal market through regulated cross‑border trade.
* Target Vector 2 – UAE & GCC: building halal export linkages to meet global Islamic demand.
At the base, Cultural Tourism (BTDP 2024–2033) invests ₱161.97 billion to develop Ligawasan Marsh and Lake Lanao as Muslim‑friendly eco‑tourism hubs promoting peace and revenue

9.1 Based on the matched image descriptions below, select critical and relevanr SWOT scale questions in the updloaded SWOT_scale_questions.md, and insert them here
9.2 Based on the matched image descriptions below, select critical and relevanr Systems Mapping questions in the uploaded Systems Mapping_questions.md, shorten them and insert them here.
The Connectivity Capital - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/The%20Connectivity%20Capital%20.png
Description: “The Connectivity Capital Matrix: Categorizing the Investment Pipeline” presents three pillars that define Bangsamoro’s infrastructure and digital investment priorities:
* Physical Pipelines: ₱627 million MPW projects in Basilan and 1,000 km of farm‑to‑market roads in key corridors.
* Digital Backbones: fiber‑optic deployment and e‑governance systems targeting 1‑day business registration by 2028.
* Market‑Access Assets: modern cold‑chain facilities in Tawi‑Tawi and Maguindanao del Norte, plus upgrades to 10 provincial ports for inter‑island trade.
Together, these components illustrate how connectivity—physical, digital, and logistical—forms the foundation of regional economic growth.

9.2 Does connectivity integrate economic zones? https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-strategic-options-roadmap/Critical%20Test%20-%20Integrating%20Zones%20and%20Scaling%20Capiral%20-%20Think%20of%20one%20challenge%20%20we%20must%20overcome%20to%20achieve%20this%20vision.png
Description: “The Critical Test: Integrating Zones & Scaling Capital” visualizes Bangsamoro’s challenge of linking physical connectivity with ethical financing to achieve sustainable growth.
It has two main sections:
* Connectivity Map: showing the Basilan–Zamboanga Bridge, Polloc Freeport, and UAE Halal Export Corridors as key links integrating isolated zones into global trade.
* Ethical Bloodstream Pyramid: illustrating how Islamic Banking & Sukuk, Takaful Insurance, and Microfinance & Waqf form a layered capital system that scales development through Shariah‑compliant finance.
Together, the image emphasizes that true integration requires both physical and financial connectivity.


9.3 Critical Note: Transfer in this section questions on Provincial Equity in Section 11: Provincial Equity & Inclusion

9.4 Add these images and create the right questions
Layer 1: The Provincial Specialized Node and Equity - “One Bangsamoro”- https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Layer%201%20-%20Provincial%20-%20Geopolitical%20Specialized%20Nodes.png
Description:  “Layer 1 – Geopolitical Specialized Nodes” maps Bangsamoro’s six provincial and island hubs, showing how each contributes to the region’s economic specialization.
It divides the area into two clusters:
* Mainland Nodes:
    1. Maguindanao del Norte & Cotabato – Administrative & Halal Hub (Polloc Freeport, Halal Park).
    2. Maguindanao del Sur – Agri‑Industrial Breadbasket (Rice/Corn production).
    3. Lanao del Sur – Clean Energy & Agro‑Hub (Lake Lanao Hydroelectric, Coffee/Rubber).
    4. Special Geographic Area (SGA) – Agro‑Industrial Corridor bridging BARMM with Mindanao.
* Archipelagic Hubs:
    1. Basilan – Logistics Gateway (ZBIP Grid Interconnection, Rubber/Coconut).
    2. Tawi‑Tawi – Maritime Gateway (Seaweed Capital, Cross‑border Trade via BIMP‑EAGA).
The map illustrates how each node anchors a distinct economic role, forming a connected network of halal, agricultural, and logistics hubs.

9.5 The Trapped Value - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/The%20Trapped%20Value.png
Description: The image titled “The Geographic Reality: We Cannot Export Value We Cannot Move” illustrates how limited connectivity traps Bangsamoro’s economic potential. Farm‑to‑market roads and modernized ports must precede agro‑industrial scale‑up.
It contrasts two maps:
* Trapped Value: shows Basilan’s 48,386 hectares of rubber and Tawi‑Tawi’s 40 % of national seaweed output isolated from global trade due to poor logistics.
* The Law of Sequencing: highlights the Zamboanga‑Basilan Interconnection Project, ZBID zone, and digital backbones as essential steps to unlock movement and export capacity.
The caption reinforces that 


9.6. Revitalizing the Maritime Trade - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/
Description : Revitalizing the Maritime Trade shows an infographic mapping maritime trade flows and proposed port and logistics upgrades to unlock regional exports. It combines a map of sea routes, icons for key ports and terminals, and callouts for infrastructure investments and expected economic benefits, showing how improved maritime links would connect producers to markets.


9.7 Shattering Geographic isolation - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Shattering%20Geographical%20Isolation.png
Description: “The Archipelagic Bridge: Shattering Geographic Isolation” illustrates how strategic infrastructure projects will physically and economically connect Bangsamoro’s island provinces to the Mindanao mainland.
It highlights three key initiatives:
* Zamboanga–Basilan Interconnection Project (ZBIP): ₱6.67 billion investment linking Basilan to the Mindanao grid via a 69 kV transmission line to boost industrial capacity.
* Basilan–Zamboanga Bridge: a 31‑km transport corridor targeted for 2030 to cut travel time and logistics costs.
* Bongao Bridge (Tawi‑Tawi): a 541‑meter span enhancing intra‑provincial connectivity.
These are not just transport projects but systemic interventions improving market access and labor mobility.

9.8 Basilan and Tawi-Tawi - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Basilan%20and%20tawi-Tawi.png
Description: The “Basilan and Tawi‑Tawi: Provincial Endowments & Strategic Leverages” highlights the two provinces’ economic strengths and growth drivers. This emphasizes that both provinces use their natural assets and infrastructure to drive targeted economic growth.
* Basilan – The Archipelagic Catalyst:
    * Endowments: 48,366 ha of rubber plantations and coastal aquaculture potential.
    * Leverages: Security normalization, ZBIP power project, and the planned Basilan‑Zamboanga Bridge.
* Tawi‑Tawi – The Maritime & Eco‑Tourism Hub:
    * Endowments: Strategic BIMP‑EAGA location, rich natural resources, and marine biodiversity.
    * Leverages: Maritime gateway for trade, eco‑tourism, and blue economy development.


9.9 Global Integration - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Global%20Integration%20Vectors.png
Desceription: “Layer 3: Global Integration Vectors” presents two strategic trade corridors that connect Bangsamoro to international halal markets.
* Vector 1 – BIMP‑EAGA Corridor: focuses on proximity‑based maritime trade, aiming for 3 % of the ASEAN halal market by formalizing traditional barter routes through Tawi‑Tawi.
* Vector 2 – UAE & GCC Corridor: emphasizes standards‑based air and sea logistics, targeting access to a $2.3 trillion global halal market via Polloc Freeport and OIC/SMIIC halal accreditation.
Together, these vectors illustrate how regional and global linkages complement each other to expand Bangsamoro’s halal export reach.

9.10 Global Value Chain Integration with UAE-GCC - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/UAE%20&%20GCC.png
 Description: The image titled “BARMM Connectivity vis‑à‑vis UAE & GCC” presents a geographic map linking Bangsamoro’s key provinces to the $2.3 trillion global halal market through strategic logistics and trade corridors.
It highlights:
* Basilan as The Archipelagic Logistics Gateway with ₱23.15 B GDP (2.9 % growth), anchored by the ZBIP Interconnection.
* Maguindanao del Norte as The Administrative & Halal Hub with ₱81.91 B GDP (4.1 % growth), anchored by Polloc Freeport & Halal Park.
* Maguindanao del Sur as The Agri‑Industrial Breadbasket with ₱39.54 B GDP (3.4 % growth), anchored by Inland Warehousing & Irrigation.
Arrows from these hubs point toward the UAE & GCC region, symbolizing export connectivity and halal trade expansion.


9.11 BARMM Strategic Connectivity Map - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/BARMM%20Connectivity-BIMP-EAGA.png
Description: “BARMM Strategic Connectivity Map” visually links Bangsamoro’s provincial hubs to two major international trade corridors — the BIMP‑EAGA Corridor and the UAE & GCC Route.
It highlights:
* Tawi‑Tawi and Basilan as maritime gateways feeding into the BIMP‑EAGA Corridor, strengthening regional sea trade with Southeast Asia.
* Maguindanao del Norte and Polloc Freeport as administrative and halal export centers connecting to the UAE & GCC markets.
* Maguindanao del Sur and Lanao del Sur as inland production zones supporting agro‑industrial exports.
Together, the map emphasizes that BARMM’s growth depends on bridging local production with regional and global halal trade routes.

9.12 Note: Insert questions here about Provincial Equity and Specialized Node

10.  Re-create Section 8 for Cluster 5 - Financiers https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/38.%20Cluster%205_%20Financiers.png
Description:  “Cluster 5 | Financiers: Powering the Bloodstream of the Economy” illustrates how Islamic finance underpins Bangsamoro’s economic system through ethical and faith‑aligned capital mechanisms.
It shows two interconnected loops labeled Ethical Capital Supply and Cultural Trust, joined by Financial Inclusion at the center. Key highlights include:
* Systemic Advantage: Islamic banking promotes risk‑sharing and asset‑backed financing consistent with Bangsamoro values.
* Landmark Integration: Republic Act 11439 provides the legal framework for post‑conflict enterprises to access capital ethically.
* Capital Mechanisms: Shari’ah‑compliant banking, Waqf (endowments), Takaful (insurance), and Microfinance for MSMEs.
Ethical finance and cultural trust jointly sustain inclusive economic growth.

10.1 Based on the matched image descriptions below, select critical and relevanr SWOT scale questions in the updloaded SWOT_scale_questions.md, and insert them here
10.2 Based on the matched image descriptions below, select critical and relevanr Systems Mapping

10.3 Financiers - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Financiers.png 
Description: “The Capital Bloodstream: Scaling Shariah‑Compliant Finance to Power Inclusive Enterprise Growth” presents a layered pyramid symbolizing how Islamic finance fuels Bangsamoro’s economic development.
It highlights three tiers:
* Macro‑Capital – Islamic Banking & Sukuk: mobilizing large‑scale public‑private partnerships for infrastructure and green energy.
* Risk Mitigation – Takaful (Islamic Insurance): protecting agriculture and supply chains from climate and operational shocks.
* Micro‑Access – Islamic Microfinance & Waqf: empowering farmers, MSMEs, and cooperatives through risk‑sharing capital.
At the base, the message reinforces that Islamic finance ensures inclusive capital access aligned with local values, turning compliance into a competitive advantage for regional growth.


10.4 Islamic Finance Roadmap - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Islamic%20Finance%20Roadmap.png
Description: The image titled “Islamic Finance Roadmap (2024–2028)” presents a structured plan for developing Bangsamoro’s Shariah‑compliant financial ecosystem.
It shows six progressive layers:
1. Strengthen Islamic Banking Foundation
2. Enhance Islamic Microfinance & Waqf
3. Establish Takaful (Insurance) Operations
4. Facilitate Islamic Capital Market (Sukuk)
5. Harness Fintech Potential
6. Develop Human Capital
On the right, a timeline divides the roadmap into 2024–2025 (Foundation & Governance), Mid‑Term (Takaful & Insurance), and 2028 Goal (Functional System & Tax Neutrality) — illustrating a clear evolution from institutional setup to full financial integration.


11. Re-create Section 9 for Operating Systems (Moral Governance , Resilience, Inclusivity and Peace)
    Section 9 Operating Systems - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/OS.png
Description: Moral Governance serves as the central operating system of the Bangsamoro ecosystem.
At the core of the Operating Systems is Moral Governance ensuring justice, transparency, accountability, and Islamic ethics (khalifa stewardship). Surrounding it are three foundational pillars:
* Peace — provides long-term stability for investment.
* Resilience — promotes adaptive, climate-smart planning to withstand external shocks.
* Inclusivity — broadens participation so marginalized communities share in value creation9

11.1 Select critical and relevant SWOT scale questions in the uploaded SWOT_scale_questions.md, and insert them here.
11.2 Select relevant Systems Mapping questions in the attached Systems Mapping_questions.md, shorten them and distribute to applicable Sections 4 - 9

11.3 How Moral Governance de-risks capital? https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/How%20moral%20Governance%20De-Risks%20Capital.png
Description: The reinforcing feedback loop in the diagram shows how moral governance continuously strengthens a region’s economic and institutional health.
* Moral Governance Implementation builds institutional transparency, which lowers bureaucratic friction (through systems like BIFOSS).
* This transparency and efficiency raise investor confidence, leading to increased foreign direct investment (FDI).
* More FDI boosts regional revenue, enabling stronger governance capacity.
* That improved capacity further supports moral governance, completing a positive cycle where each element amplifies the next.
In short, ethical and transparent governance creates trust and efficiency, attracting investment that funds even better governance—a self-reinforcing system of growth and stability.

11.4 Investment-Development Loop and Governance- Investor Confidence Loop - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/Investment%20and%20Governance%20Cycles.png
Description: The diagrams illustrate two reinforcing loop on synchronized investment and governance reforms suggesting sustaiinable inclusive economic growth.
* Loop 1 – Investment–Development (R1): Investments create jobs and expand markets, attracting more investors and strengthening business viability.
* Loop 2 – Governance–Investor Confidence (R2): Transparent governance builds investor trust, expands the tax base, and increases public funding, which further improves governance.

11.5 Regulatory Architecture of the Bangsamoro Investment Roadmap 2026—2035-  https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Regulatory%20Architecture.png
Description:“The Regulatory Architecture Securing Capital” at its core is the Bangsamoro Organic Law (RA 11054) — the constitutional mandate for economic self‑determination — supported by five pillars. These regulatory pillars illustrate how regulatory coherence secures capital and drives sustainable, values‑based development in BARMM.
1. 2nd BDP & SIPP: Strategic investment priorities.
2. BHIDP: Halal ecosystem strategy aligned with OIC/SMIIC standards.
3. BSEMP: Renewable‑energy framework targeting a 75.86 % clean‑energy mix.
4. RA 11439 & CREATE MORE Act: Islamic banking and national tax incentives.
5. Pending Forestry Code: Legal architecture for carbon credits and payment for ecosystem services.

11.6 Draft Joint Memorandum Circular 2026 -01 - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Draft%20JMC%202026-01.png
Description: “Draft JMC 2026‑01 Transforms Conservation into Municipal Revenue Streams” visualizes how environmental protection can directly fund local development.
* It shows three flowing channels—Carbon Credits, Payment for Ecosystem Services (PES), and Eco‑Tourism User Fees—merging into a Revenue River that feeds Local Government Units (LGUs). The funds are earmarked for capacity building, sustainable livelihood programs, and infrastructure maintenance, illustrating a system where conservation generates tangible economic returns.

11.7 Policy Recommendations Specifically for Policy Makers-Planners-Investors - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Policy%20Recommendations-Policy%20Makers-Planners-Investors.png
Description:  “A Synchronized Mandate Coordinates Policymakers, Planners, and Investors” recommends aligning government, planning, and private‑sector actions  - known as collaborative governance -  creating synergy between policy, planning, and investment to drive inclusive growth.
* For Policymakers: enact the Forestry Code, Bangsamoro Investment Code, establish the Investment Command Center, fast‑track BHIDP, institutionalize Bangsamoro Corp, and accelerate Islamic banking.
* For Development Planners: apply the BEIE framework, sequence infrastructure (farm‑to‑market roads before ports), and set up provincial BBOI offices.
* For Investors: target agro, halal, and rubber clusters, pursue carbon/green finance, and invest in Islamic fintech and renewable energy.


11.8 Policy Recommendations: Activating the Framework - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Policy%20recommendations-Institutional-Fiscal-Regulatory.png 
“Policy Recommendations include three integrated institutional, fiscal, and regulatory reforms to strengthen investment coordination and sustainable growth:
* Institutional: Deploy BIF‑Net to coordinate inter‑agency investment facilitation and eliminate fragmented approvals.
* Fiscal: Harmonize SIPP & CREATE MORE Act to align regional projects with national tax incentives, prioritizing high‑value manufacturing over raw exports.
* Regulatory: Institutionalize BEIE to synchronize ministry budgets and master plans for ecosystem‑based development.


12. Re-create Section 10 for Stategic Options and Leverage Points 
    
15. Re-create Section 11 for IEDS and Three-Phase Implementation

16. Re-create Section 12 for the Metrics Architecture and Key Metrics
    
17. Re-create Section 13 for the Balanced Scorecard, Mission, and Vision

18. Re-create Section 14 for Priority Actions and Budget

19. Re-create Section 15 for Access to Resources and Optional Engagements and Commitments
- [ ] Re-create Section 16 for Submission
- [ ] Update ContextPanel.tsx with URLs and resources
- [ ] Select critical SWOT scale questions in the attached SWOT_scale_questions.md, and distribute to applicable Sections 4 - 9
- [ ] Systems Mapping questions in the attached Systems Mapping_questions.md, shorten them and distribute to applicable Sections 4 - 9
- [ ] Update SurveyWizard.tsx with new sections
- [ ] Update survey-schema.ts with new sections
- [ ] Update URLs and desccriptions in bird-urls.ts with all new sections, images/videos titles and descriptions, and sites

---

## 2. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SURVEYWIZARD ARCHITECTURE                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                  │
│  │ 16 Sections  │───▶│  Form State  │───▶│  BIRD Score  │                  │
│  │ (react-hook- │    │  (useForm)   │    │  Computation │                  │
│  │  form + zod) │    │              │    │  (formulas)  │                  │
│  └──────────────┘    └──────────────┘    └──────┬───────┘                  │
│                                                  │                          │
│                                                  ▼                          │
│  ┌──────────────────────────────────────────────────────────────┐          │
│  │              STRATEGIC PLAN ENTITY (strategicPlanStore)       │          │
│  │  ┌─────────┐ ┌─────────────┐ ┌──────────┐ ┌────────────┐    │          │
│  │  │ SWOT    │ │ Strategic   │ │ BSC      │ │ PAPs       │    │          │
│  │  │ Items   │ │ Options     │ │ Objectives│ │            │    │          │
│  │  └─────────┘ └─────────────┘ └──────────┘ └────────────┘    │          │
│  └────────────────────┬─────────────────────────────────────────┘          │
│                       │                                                     │
│                       ▼                                                     │
│  ┌──────────────────────────────────────────────────────────────┐          │
│  │              SUPABASE EDGE FUNCTIONS (supabase.ts)            │          │
│  │  • STRATEGIC_PLANNER_SYNC (POST/GET/DELETE)                  │          │
│  │  • AI_STRATEGY_ASSISTANT (optional: AI recommendations)      │          │
│  │  • EMAIL_NOTIFICATIONS (post-submission alerts)              │          │
│  └──────────────────────────────────────────────────────────────┘          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. File-by-File Integration Assessment

### 3.1 `strategicPlanStore.ts` — Domain Schema & Factories

**Status:** ⚠️ **MISSING WIRING** — SurveyWizard does not import or use this file.

**What it provides:**
- `StrategicPlan` root entity with `swotItems`, `strategicOptions`, `objectives`, `paps`
- `SWOTItem`, `StrategicOption`, `BSCObjective`, `PAP` interfaces
- `createEmptyPlan()` and `createSamplePlan()` factories
- `computePlanCompletion()` utility
- `loadFromStorage()` / `saveToStorage()` for local persistence

**Integration Requirements:**

```typescript
// NEW: Import in SurveyWizard.tsx
import {
  createEmptyPlan,
  type StrategicPlan,
  type SWOTItem,
  type StrategicOption,
  type BSCObjective,
  type PAP,
  type SWOTCategory,
  type BEIECluster,
  type LeveragePoint,
  generateId,
} from "@/lib/strategicPlanStore";
```

**Mapping Survey Responses → StrategicPlan:**

| Survey Field | StrategicPlan Field | Section |
|-------------|---------------------|---------|
| `Survey Briefing` | Introduction | 1 |
|  `Dempgraphics  | `personal info`, `contacts` | 2 |
| `q1_1`, `q1_2` | `organization`, `strategicIntent` | 0 |
| `q1_1`, `q1_2` | `organization`, `strategicIntent` | 1 |
| `q2_1`–`q2_4` | `swotItems` (moral governance archetype) | 2 |
| `q3_1`–`q3_limits_growth` | `swotItems` (Foundations cluster) | 3 |
| `q4_1`–`q4_5` | `swotItems` (Transformers cluster) | 4 |
| `q5_1`–`q5_6` | `swotItems` (Enablers cluster) | 5 |
| `q6_1`–`q6_5` | `swotItems` (Connectors cluster) | 6 |
| `q7_1`–`q7_5` | `swotItems` (Financiers cluster) | 7 |
| `q8_1`–`q8_3` | `strategicOptions` | 8 |
| `q9_1` | `paps[].budget` aggregate | 9 |
| `q10_matrix` | `strategicOptions[].priorityScore` | 10 |
| `q11_1`–`q11_2` | `objectives` (equity KPIs) | 11 |
| `q12_1`–`q12_2` | `objectives` (climate KPIs) | 12 |
| `q13_1`–`q13_2` | `objectives` (governance KPIs) | 13 |
| `q14_1'-q14 | `createdByName`, `organization` | 14 |
| `care_*` | Plan metadata / validation score | 15 |



Add Section0 - Provide a compelling web copy  consistent with the attached survey-orientation.html
Incorporate a full view and wide format of this Validation Survey Banner- https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Validation%20Survey%20Banner.png

Embed this video in  its Wide and Full View Format 
Title: Systems Thinking: Moving from Checklists to Interconnected Investment Ecosystem
Description: Discover how the Bangsamoro Investment Roadmap (BIRD 2026–2035) turns fragmented efforts into a unified engine of growth. This video unpacks: Systems Thinking — shifting from checklists to interconnected strategies; Feedback Loops — cycles that amplify progress and stabilize change; Causal Loop Diagrams — visuals that expose traps and leverage points; and  Leverage Strategies — small shifts sparking big gains in governance, infrastructure, and equity. From governance hurdles to resource equity, see how Bangsamoro can move beyond quick fixes toward lasting systemic solutions.
URL: https://youtu.be/VBAHk0WYz_c?si=sbA9QhA4M791C1ET

Suggested additional question in Section1
From Sector-Based Planning tp Ecosystem Approach - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/From%20Sector-Based%20Planning%20to%20BEIE%20Approach.png
Description: The image illustrates a mental model shift—from siloed development to an interconnected ecosystem that drives inclusive and sustainable growth.
* On the left, sector-based planning is shown as reactive and fragmented—where infrastructure follows production, capital is allocated by single-sector grants, and market access remains limited to raw exports.
* On the right, the BEIE approach integrates systems thinking: infrastructure is primed first, equity extends across island provinces, financing is synchronized through Shariah-compliant instruments, and market access connects to global halal and green economies.

How can stakeholders across government, business, and civil society work together to make the BEIE ecosystem approach more actionable in real investment planning? Write your answer in one to two sentences.

BEIE Framework -https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/BEIE-v2.png
Description: The “Bangsamoro Economic and Investment Ecosystem” presents a circular system powered by Moral Governance at its center—symbolizing ethical leadership as the engine of development.
Surrounding it are five interconnected components:
* Foundations — agriculture, forestry, and energy as the resource base.
* Transformers — industries and halal manufacturing that create value.
* Financiers —  Islamic banking, waqf, sukuk, taqaful, and microfinance that empower expansion.
* Connectors — trade, tourism, and regional links (like BIMP‑EAGA) that open markets.
* Enablers — infrastructure, health, and education providing support systems.
Together, these parts form a cohesive ecosystem where governance, finance, production, and connectivity work in harmony to drive sustainable and inclusive growth in Bangsamoro.

Bangsamoro Investment Ecosystem - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/BEIE-v3.png
Description: The Bangsamoro Investment Ecosystem” depicts a circular system powered by Moral Governance at its center.  The layers form a cohesive ecosystem where ethical governance drives sustainable development through balanced economic collaboration.
It shows four interconnected layers:
* Foundations — agriculture, fisheries, and energy that sustain growth.
* Transformers — industries and halal enterprises that create value.
* Enablers — infrastructure, labor, and health sectors that support productivity.
* Financiers — Islamic banking and finance that empower expansion.

Note: Retain questions existing questions on BEIE framework.


Section 2
Operating Systems - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/OS.png
Description: Moral Governance serves as the central operating system of the Bangsamoro ecosystem.
At the core of the Operating Systems is Moral Governance ensuring justice, transparency, accountability, and Islamic ethics (khalifa stewardship). Surrounding it are three foundational pillars:
* 🕊️ Peace — provides long-term stability for investment.
* 🌿 Resilience — promotes adaptive, climate-smart planning to withstand external shocks.
* 🤝 Inclusivity — broadens participation so marginalized communities share in value creation.


Investment-Development Loop and Governance- Investor Confidence Loop - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/Investment%20and%20Governance%20Cycles.png
Description: The diagrams illustrate two reinforcing loop on synchronized investment and governance reforms suggesting sustaiinable inclusive economic growth.
* Loop 1 – Investment–Development (R1): Investments create jobs and expand markets, attracting more investors and strengthening business viability.
* Loop 2 – Governance–Investor Confidence (R2): Transparent governance builds investor trust, expands the tax base, and increases public funding, which further improves governance.

To what extent do you think these loops accurately reflect how investment and governance reinforce each other in BARMM’s development?
* ☐ Very accurately
* ☐ Somewhat accurately
* ☐ Needs revision
* ☐ Not accurate

Regulatory Architecture- https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Regulatory%20Architecture.png

Draft JMC - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Draft%20JMC%202026-01.png
Policy Recommendations-Policy Makers-Planners-Investors - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Policy%20Recommendations-Policy%20Makers-Planners-Investors.png

Core Policy Mandates - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Policy%20recommendations-Institutional-Fiscal-Regulatory.png

How Moral. Governance de-risks capital? https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/How%20moral%20Governance%20De-Risks%20Capital.png
Description: The reinforcing feedback loop in the diagram shows how moral governance continuously strengthens a region’s economic and institutional health.
* Moral Governance Implementation builds institutional transparency, which lowers bureaucratic friction (through systems like BIFOSS).
* This transparency and efficiency raise investor confidence, leading to increased foreign direct investment (FDI).
* More FDI boosts regional revenue, enabling stronger governance capacity.
* That improved capacity further supports moral governance, completing a positive cycle where each element amplifies the next.
In short, ethical and transparent governance creates trust and efficiency, attracting investment that funds even better governance—a self-reinforcing system of growth and stability.

Five Interconnected Clusters - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/bird-images/5%20Interconnected%20Clusters.png
Description: “The Parts of the Engine” presents how the Bangsamoro economy functions as an interconnected system driven by Moral Governance at its core. It shows five clusters working together:
* Foundations – provide natural and energy resources (agriculture, fisheries, forestry).
* Financiers – supply capital through Islamic banking, waqf, and microfinance.
* Transformers – create value via industry and halal manufacturing.
* Enablers – support movement through infrastructure, health, education, and connectivity.
* Connectors – open markets through exports, trade, and tourism


Critical Note: Transfer in this section (Section 2) the questions on Climate Resilience in Section 12, questions on Policy and Governance Recommendations from Section 13: Policy & Governance Recommendations, in effect deleting Section 13.


Title: SWOT Analysis & Systems Mapping Explained 
Description: In this video, we break down the SWOT Analysis—examining Strengths, Weaknesses, Opportunities, and Threats—and use Systems Mapping to show how strategic investments can reshape the region. Through non-linear diagramming, we co-created narratives using tools like Causal Loop Diagrams and Systems Archetypes to reveal patterns of change and leverage points for transformation.
URL: https://youtu.be/LSmBzwyX2uw


Section 3 -  Cluster 1 -Foundations - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/10.%20Cluster%201.png

Critical Note: Transfer here questions on Green Economy in Section 12. In effect, deleting Section 12.


Section 4 -  Cluster 2 - Transformers - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/11.%20Cluster%202%20_%20Transformers.png

Farm-to-Market Pipeline-  https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Transformers-Farm-to-Market%20Pipeline%20.png


The Transformers -Capturing Value Through Industrial and Economic Zones - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Industrial%20and%20Economic%20Zones.png

Capitalizing Cultural Advantage - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Capitalizing%20Cultural%20Advantage%20-%20Halal%20Industry%20Adv.png


Section 5 Cluster 3 - Enablers - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Cluster%203%20Enablers.png

Skills and Education Gap-https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Skills%20and%20Education%20Gap.png
The Enabling Grid - 2nd Layer of BARMM Interconnectivity - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Layer%202%20-%20The%20Enabling%20Grid%20and%20Lawof%20Sequencing.png

The Digital Backbone - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/The%20Digital%20Backbone.png
Tourism Master Plan - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Tourism%20Master%20Plan.png
Tourism and Digital Connectivity - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Tourism%20and%20Digital%20Connectivity.png

Activating the Enablers- Primed by Moral Governance- https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Activating%20the%20Enablers%20-%20Infra%20Primed%20by%20Moral%20Governance.png
The image  illustrates how Moral Governance acts as the operating system that powers Bangsamoro’s physical development.
* On the left, Transparency, Accountability, and Stability form the governance core that builds trust — described as the currency of investment.
* On the right, the physical backbones show measurable infrastructure goals:
    * 100% Electrification through renewable expansion
    * 85% Broadband Penetration by 2035
    * 30% Logistics Cost Reduction via improved inter‑island routes
Together, these elements depict how ethical governance can directly enable infrastructure growth and investor confidence.
How realistic is it that Moral Governance can effectively deliver these physical enablers — electrification, broadband connectivity, and logistics efficiency — in BARMM?
* ☐ Very realistic
* ☐ Somewhat realistic
* ☐ Needs stronger institutional support
* ☐ Not realistic


Section 6 Cluster 4 - Connectors - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Cluster%204_%20Connectors.png

Does connectivity integrate economic zones? https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-strategic-options-roadmap/Critical%20Test%20-%20Integrating%20Zones%20and%20Scaling%20Capiral%20-%20Think%20of%20one%20challenge%20%20we%20must%20overcome%20to%20achieve%20this%20vision.png


The Connectivity Capital - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/The%20Connectivity%20Capital%20.png

Critical Note: Transfer in this section questions on Provincial Equity in Section 11: Provincial Equity & Inclusion

Add these images and create the right questions
The Provincial Specialized Node and Equity - “One Bangsamoro”- https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Layer%201%20-%20Provincial%20-%20Geopolitical%20Specialized%20Nodes.png
Revitalizing the Maritime Trade - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Revitalizing%20the%20Maritime%20Trade.png
Provincial Endowments - Mainlands - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Mainlands%20Provincial%20Endowments.png
Provincial Endowments - Islands - 
Maguindanao del Sur - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Maguidano-del-Sur.png
Maguindanao del  Norte - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Maguindanao-del-Norte.png
Basilan and Tawi-Tawi - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Basilan%20and%20tawi-Tawi.png
The Trapped Value - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/The%20Trapped%20Value.png
Shattering Geographic isolation - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Shattering%20Geographical%20Isolation.png


Global Integration - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Global%20Integration%20Vectors.png
Global Value Chain Integration with UAE-GCC - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/UAE%20&%20GCC.png 
Global Value Chain Integration with BIMP -EAGA-https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/BARMM%20Connectivity-BIMP-EAGA.png 

Priority Tourism Clusters - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Priority%20Tourism%20Clusters%20and%20Investment%20Sites.png

Section 7-  Cluster 5 Financiers - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/38.%20Cluster%205_%20Financiers.png

Islamic Finance Roadmap - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Islamic%20Finance%20Roadmap.png


Anatomy of Causal Loop Diagram - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/3-Anatomy%20of%20CLD.png
Description: A Causal Loop Diagram (CLD)  has interconnected elements.
* Variables — factors that change over time, such as Governance Capacity and Investor Confidence.
* Links — arrows showing how one variable directly influences another.
* Polarity — marked as ‘s’ for same-direction effects (e.g., higher governance increases confidence) and ‘o’ for opposite-direction effects (e.g., more bottlenecks reduce private investment).
* The circular layout illustrates how these relationships form feedback loops that either reinforce or balance system behavior.
In short, a CLD visually maps cause-and-effect relationships that drive dynamic change within a system.

Example of Reinforcing Loop
1. Investment-Development Loop and Governance- Investor Confidence Loop - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/Investment%20and%20Governance%20Cycles.png 
Description: Investment and governance reinforce each other to drive sustained growth.
🟡 Loop 1: Investment–Development (R1)
* Starts with investments in sectors like halal, agro, and tourism.
* These create employment and income growth, which expands the domestic market.
* A larger market improves business viability, attracting more investors, and the cycle repeats—strengthening development.
🟢 Loop 2: Governance–Investor Confidence (R2)
* Improved moral governance (transparency) increases investor confidence.
* Confidence fuels economic growth, which expands the tax base and public funding.
* More resources allow for better governance, completing a reinforcing loop that sustains trust and growth.
Together, these loops show how ethical governance and active investment synchronize to compound regional prosperity.

2. How Moral. Governance de-risks capital? https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/How%20moral%20Governance%20De-Risks%20Capital.png
Description: The reinforcing feedback loop in the diagram shows how moral governance continuously strengthens a region’s economic and institutional health.
* Moral Governance Implementation builds institutional transparency, which lowers bureaucratic friction (through systems like BIFOSS).
* This transparency and efficiency raise investor confidence, leading to increased foreign direct investment (FDI).
* More FDI boosts regional revenue, enabling stronger governance capacity.
* That improved capacity further supports moral governance, completing a positive cycle where each element amplifies the next.
In short, ethical and transparent governance creates trust and efficiency, attracting investment that funds even better governance—a self-reinforcing system of growth and stability.

Balancing Loops
Unchecked Growth hits hard infrastructure and Security Ceilings - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/19.%20The%20Archetypes.png
Description: The diagram visualizes two balancing loops that constrain Bangsamoro’s development:
* Constraint 1 – Limits to Growth (B1): Investment expands but eventually hits resource and infrastructure ceilings—such as low literacy, limited broadband, and power shortages—that slow progress.
* Constraint 2 – Security‑Investment Tensions (B2): Security incidents trigger investor caution, reduce capital flows, and weaken regional stability, creating a feedback loop that dampens economic growth.
Together, these loops highlight how unchecked expansion without parallel investment in infrastructure and security can stall long‑term development.
How accurately do these loops reflect the real constraints limiting Bangsamoro’s investment‑driven growth?
* ☐ Very accurately
* ☐ Somewhat accurately
* ☐ Needs revision
* ☐ Not accurate

Why synchronization matters?  https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/6.%20Why%20Synchronization%20Matters.png
Ask participants for  two-three phrases resulting to wordcloud.



Systems Archetypes banner
https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Systems%20Archetypes%20Banner.png

Anatomy of Systems Traps or Archetypes - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/6-Anatomy%20of%20Systems%20Traps.png

Capacity Traps
https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Hitting%20the%20Growth%20Wall-%20Limits%20to%20Growth%20and%20Growth%20and%20Underinvestment.png

The Capacity Traps diagrams illustrate two systemic archetypes that limit Bangsamoro’s growth:
Limits to Growth — Investment expands rapidly but eventually hits hard ceilings such as unreliable infrastructure, low literacy, and resource bottlenecks. Without parallel capacity building, growth plateaus - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Limits%20to%20Growth%20Archetype.png

Growth and Underinvestment — Rising demand outpaces institutional capacity (certifiers, staff, infrastructure). Delays and inefficiencies reduce investor confidence, creating a self‑reinforcing cycle of stagnation. https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Growth%20and%20Underinvestment.png



Together, these archetypes show how unchecked expansion and chronic underinvestment can trap the region in a cycle where performance lags behind potential.

How well do these two systems archetypes reflect the real capacity constraints affecting Bangsamoro’s investment and development performance?
* ☐ Very accurately
* ☐ Somewhat accurately
* ☐ Needs revision
* ☐ Not accurate


Governance Traps

Shifting the Burden - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Shifting%20the%20Burden%20Archetype.png
Fixes that Fail - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Fixes%20that%20Fail%20Archetype.png
Drifting Goals -https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/Drifting%20Goals.png

Resource and Equity Traps
https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Resource%20and%20Equity%20Traps%20-%20Success%20to%20the%20Successful%20and%20Growth%20and%20Tragedy%20of%20the%20Commons%20Archetypes%20.png

Success to the Successful - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Success%20to%20the%20Successful%20Aarchetype.png

Tragedy of the Commons - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Tragedy%20of%20the%20Commons%20Archetype.png

Instability Traps
https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Instability%20Traps%20Introduction.png
Cycles of Exclusion and Retaliation - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Cycles%20of%20Exclusion%20and%20Retaliation.png

Escalation - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/Escalation.png

The “Big Man” Archetype -  https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/The%20Big%20Man%20Archetype.png


Leverage Points Banner - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Leverage%20Points%20Banner.png

How to  identify leverage points - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/How%20to%20Identify%20Leverage%20Points.png

Activating Leverage Points - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/Activating%20Leverage%20Points.png

Strategic Leverage Points - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/27.%20Strategic%20Leverage%20Points.png

Leverage Points in Capacity Traps- https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Skills%20and%20Education%20Gap.png

Leverage Points in Governance Traps : The Iceberg Model- https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Iceberg%20Model%20Paradigm.png

Architecting Collaborative Governance- https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Skills%20and%20Education%20Gap.png

Archetypes and Leverage Points - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Archetypes%20&%20Leverage%20Points.png

Section 8
Video
Title: Strategic Options & Path to Growth 
Description: Discover the strategic choices shaping Bangsamoro’s Investment Roadmap 2026–2035. This video shows how well-crafted strategies and priorities can fuel inclusive growth, sustainability, and regional competitiveness in BARMM.”
URL - https://youtu.be/kb_snh8mo1k 

Four Strategic Options  - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-strategic-options-roadmap/3.%20Strategic%20Options%20Ranking.png

The Phasing - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-strategic-options-roadmap/Sequencing.png

Section 9
The Budget for three phases - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/22.%20Regulatory%20Architecture.png

Total Capital Deployment Per Phase - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/28.%20Ecosystem%20Success.png

Executing the Roadmap-timeline  - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-strategic-options-roadmap/Executing%20the%20Roadmap.png

Roadmap in Motion - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Roadmap%20on%20Motion.png

Section 10 
IEDS - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-strategic-options-roadmap/The%20Execution%20Engine%20-IEDS.png

Metrics Architecture - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Metrics%20Architecture%20(1).png

Section 11 - Synthesis

Investment Roadmap Infographic: https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/2035%20Bangsamoro%20Investment%20Roadmap%20Infographics.png
The diagram presents the Bangsamoro Investment Ecosystem as a layered system built around Moral Governance at its center.
* Foundations (Agriculture, Fishery, Energy) sustain the economy and provide essential resources.
* Transformers (Industry, Halal) create value and drive production.
* Enablers (Infrastructure, Labor, Health) support growth and ensure inclusivity.
* Financiers (Islamic Banking) empower expansion through ethical financing.
Each layer interacts dynamically, showing how governance, production, support systems, and finance form a synchronized ecosystem for sustainable and inclusive development.
In which cluster—Foundations, Transformers, Enablers, or Financiers—does your organization believe it can contribute most meaningfully to the Bangsamoro Investment Ecosystem?
* ☐ Foundations (Agriculture, Fishery, Energy)
* ☐ Transformers (Industry, Halal)
* ☐ Enablers (Infrastructure, Labor, Health)
* ☐ Financiers (Islamic Banking, 
Section 11 Policies 



Wrapping Up

Title: Bangsamoro Investment Roadmap 2026‑2035 | Southeast Asia’s Hub for Ethical & Sustainable Growth
Description: Discover how the Bangsamoro Investment Roadmap (BIRD) 2026‑2035 positions BARMM as Southeast Asia’s hub for resilient, ethical, and sustainable investments — highlighting its growth momentum, the risks ahead, and the frameworks driving transformation.
URL:  https://youtu.be/UCi2dVUmSbE 

When Vision Meets Execution -https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-strategic-options-roadmap/When%20Vision%20Meets%20Execution.png


The Decade Ahead - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/The%20Decade%20Ahead_Bird%20App-CTA.png

Invest in Bangsamoro - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Invest%20in%20Bangsamoro.png
Choose Bangsamoro - https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Choose%20Bangsamoro.png



**Implementation Pattern:**

```typescript
// NEW FUNCTION: Add to SurveyWizard or a new survey-converter.ts
function convertSurveyToPlan(data: SurveySchemaType, userInfo: UserInfo): StrategicPlan {
  const plan = createEmptyPlan({
    name: `BIRD Survey — ${data.demo_organization || "Anonymous"}`,
    organization: data.demo_organization || "",
    vision: "Emerging Bangsamoro — Survey-derived strategic plan",
    mission: data.q8_1 || "",
    strategicIntent: data.q1_2 || "",
  }, userInfo);

  // Map SWOT items from survey responses
  plan.swotItems = buildSwotItemsFromSurvey(data);

  // Map strategic options
  plan.strategicOptions = buildStrategicOptionsFromSurvey(data);

  // Map objectives + KPIs
  plan.objectives = buildObjectivesFromSurvey(data);

  // Map PAPs
  plan.paps = buildPAPsFromSurvey(data);

  return plan;
}
```

---

### 3.2 `formulas.ts` — BIRD Mathematical Formulas

**Status:** ⚠️ **MISSING WIRING** — SurveyWizard computes no scores.

**What it provides:**
- `calculateResilienceIndex()` — √(Impact × Likelihood)
- `calculateRiskLevel()` — Critical/High/Medium/Low/Minimal
- `calculateVulnerabilityIndex()` — (Impact × Likelihood) / Control
- `calculateKPIProgress()` — (Current / Target) × 100
- `calculateLeveragePriority()` — Weighted leverage point scoring
- `estimateInvestmentROI()` — Sector-specific ROI estimates
- `getStatusColor()` — Status color mapping
- `PHASE1_BUDGET_ALLOCATION` — Reference budget data

**Integration Requirements:**

```typescript
// NEW: Import in SurveyWizard.tsx
import {
  calculateResilienceIndex,
  calculateRiskLevel,
  calculateVulnerabilityIndex,
  calculateKPIProgress,
  calculateLeveragePriority,
  estimateInvestmentROI,
  getStatusColor,
  formatCurrency,
  formatGrowthRate,
} from "@/lib/formulas";
```

**Where to apply formulas:**

| Survey Section | Formula Application | UI Impact |
|---------------|---------------------|-----------|
| Sections 3–7 (Cluster assessments) | `calculateResilienceIndex()` + `calculateRiskLevel()` | Real-time risk badges on each cluster |
| Section 9 (Budget) | `estimateInvestmentROI()` | ROI preview per sector |
| Section 10 (IEDS Matrix) | `calculateLeveragePriority()` | Priority ranking of strategies |
| Section 12 (Climate) | `calculateVulnerabilityIndex()` | Vulnerability score display |
| All KPI fields | `calculateKPIProgress()` | Progress bars on targets |

**Implementation Pattern:**

```typescript
// NEW: Add to SurveyWizard — real-time score computation
const computedScores = useMemo(() => {
  const scores: Record<string, number> = {};

  // Example: Section 3 (Foundations) resilience
  if (values.q3_el_nino_impact && values.q3_el_nino_like) {
    scores.foundationsResilience = calculateResilienceIndex(
      values.q3_el_nino_impact,
      values.q3_el_nino_like
    );
  }

  // Example: Section 9 budget ROI
  if (values.q9_1 && values.q8_1) {
    const sector = inferSectorFromStrategy(values.q8_1);
    scores.estimatedROI = estimateInvestmentROI(values.q9_1, sector);
  }

  return scores;
}, [form.watch()]);
```

---

### 3.3 `supabase.ts` — Backend Persistence

**Status:** ⚠️ **PARTIAL WIRING** — SurveyWizard calls `submitSurvey()` but this is NOT the Supabase Edge Function.

**Current code:**
```typescript
import { submitSurvey } from "@/lib/api"; // ← Unknown implementation
```

**What `supabase.ts` provides:**
- `supabase` client (auth + data)
- `EDGE_FUNCTIONS.STRATEGIC_PLANNER_SYNC` — Plan CRUD
- `EDGE_FUNCTIONS.AI_STRATEGY_ASSISTANT` — AI recommendations
- `EDGE_FUNCTIONS.EMAIL_NOTIFICATIONS` — Email alerts
- `fetchPlannerState()`, `saveFullState()`, `saveSinglePlan()`, `archivePlan()`

**Integration Requirements:**

**Replace `submitSurvey()` with Supabase-backed persistence:**

```typescript
// NEW: In SurveyWizard.tsx — replace the onSubmit handler
import {
  supabase,
  saveSinglePlan,
  triggerEmailNotification,
  EDGE_FUNCTIONS,
} from "@/lib/supabase";

const onSubmit = useCallback(async (data: SurveySchemaType) => {
  // ... validation ...

  setIsSubmitting(true);
  try {
    // 1. Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Authentication required");

    const token = (await supabase.auth.getSession()).data.session?.access_token;
    if (!token) throw new Error("Session expired");

    // 2. Build user info
    const userInfo: UserInfo = {
      id: user.id,
      email: user.email!,
      name: data.demo_name || user.email!,
      organization: data.demo_organization,
    };

    // 3. Convert survey → StrategicPlan
    const plan = convertSurveyToPlan(data, userInfo);

    // 4. Save to Supabase
    const saved = await saveSinglePlan(plan, token);
    if (!saved) throw new Error("Failed to save plan to BIRD repository");

    // 5. Trigger email notification
    await triggerEmailNotification("welcome", user.id, {
      plan_name: plan.name,
      organization: plan.organization,
    });

    setIsSuccess(true);
    toast.success("Your strategic input has been securely recorded in the BIRD repository.");
  } catch (error) {
    console.error("Submission failed:", error);
    toast.error(error instanceof Error ? error.message : "Submission failed.");
  } finally {
    setIsSubmitting(false);
  }
}, [form]);
```

**Also required:** Update the success-state button to use `EXTERNAL_URLS.PWA`:

```typescript
// CURRENT (hardcoded):
window.open("https://bird-app.bolt.host", "_blank")

// RECOMMENDED (from supabase.ts):
import { EXTERNAL_URLS } from "@/lib/supabase";
window.open(EXTERNAL_URLS.PWA, "_blank")
```

---

### 3.4 `utils.ts` — Utilities & Template Converter

**Status:** ⚠️ **MISSING WIRING** — SurveyWizard does not import this file.

**What it provides:**
- `cn()` — Tailwind class merging
- `calculateSWOTMetric()` — Unified SWOT scoring (strength/weakness/opportunity/threat)
- `convertTemplateToPlan()` — Template → StrategicPlan conversion
- `getStatusColor()` — Status badge styling

**Integration Requirements:**

```typescript
// NEW: Import in SurveyWizard.tsx
import {
  calculateSWOTMetric,
  getStatusColor,
  cn,
} from "@/lib/utils";
```

**Usage in survey sections:**

```typescript
// In section components (e.g., Section3_Foundations):
const swotScore = calculateSWOTMetric(
  "weakness", // or "strength", "opportunity", "threat"
  impactScore,
  likelihoodScore
);

// Display with appropriate color
const statusClass = getStatusColor(riskLevel); // e.g., "on-track", "delayed"
```

**Note:** `convertTemplateToPlan()` is useful if the SurveyWizard offers "start from template" functionality. This is a **future enhancement**.

---

### 3.5 `motion-shim.tsx` — Animation Shim

**Status:** ✅ **NOT REQUIRED** — SurveyWizard does not use `framer-motion`.

The SurveyWizard uses CSS transitions (`animate-pulse`, `transition-colors`) and native React state. No animation library integration is needed.

---

## 4. Required Enhancements

### 4.1 Critical (Must-Have)

#### E1. Wire `strategicPlanStore.ts` — Survey-to-Plan Conversion

**File:** `src/lib/survey-converter.ts` (NEW)

```typescript
// src/lib/survey-converter.ts
import {
  createEmptyPlan,
  generateId,
  type StrategicPlan,
  type SWOTItem,
  type StrategicOption,
  type BSCObjective,
  type PAP,
  type UserInfo,
  type SWOTCategory,
  type BEIECluster,
  type LeveragePoint,
} from "./strategicPlanStore";

import type { SurveySchemaType } from "./survey-schema";

export function convertSurveyToPlan(
  data: SurveySchemaType,
  userInfo: UserInfo
): StrategicPlan {
  const plan = createEmptyPlan(
    {
      name: `BIRD Survey — ${data.demo_organization || "Stakeholder Input"}`,
      organization: data.demo_organization || "",
      vision: "Emerging Bangsamoro 2026–2035",
      mission: data.q8_1 || "",
      strategicIntent: data.q1_2 || "",
      planningPeriodStart: "2026-01-01",
      planningPeriodEnd: "2035-12-31",
      status: "draft",
    },
    userInfo
  );

  plan.swotItems = buildSwotItems(data, userInfo);
  plan.strategicOptions = buildStrategicOptions(data, userInfo);
  plan.objectives = buildObjectives(data, userInfo);
  plan.paps = buildPAPs(data, userInfo);

  return plan;
}

function buildSwotItems(data: SurveySchemaType, userInfo: UserInfo): SWOTItem[] {
  const items: SWOTItem[] = [];
  const now = new Date().toISOString();

  // Section 3: Foundations
  if (data.q3_el_nino_impact && data.q3_el_nino_like) {
    items.push({
      id: generateId(),
      category: "threat",
      description: `El Niño impact assessment: ${data.q3_el_nino_impact}/5 impact, ${data.q3_el_nino_like}/5 likelihood`,
      impactScore: data.q3_el_nino_impact,
      likelihoodScore: data.q3_el_nino_like,
      aiGenerated: false,
      beieCluster: "foundations",
      leveragePoint: "LP5",
      createdBy: userInfo.id,
      createdByEmail: userInfo.email,
      createdByName: userInfo.name,
      createdAt: now,
    });
  }

  // Section 4: Transformers — Halal barrier
  if (data.q4_1_barrier) {
    items.push({
      id: generateId(),
      category: "weakness",
      description: data.q4_1_barrier,
      impactScore: 4,
      likelihoodScore: 4,
      aiGenerated: false,
      beieCluster: "transformers",
      leveragePoint: "LP1",
      createdBy: userInfo.id,
      createdByEmail: userInfo.email,
      createdByName: userInfo.name,
      createdAt: now,
    });
  }

  // Section 5: Enablers — Infrastructure
  if (data.q5_1_infra) {
    items.push({
      id: generateId(),
      category: data.q5_1_infra >= 4 ? "weakness" : "strength",
      description: `Infrastructure adequacy rated ${data.q5_1_infra}/5`,
      impactScore: data.q5_1_infra,
      likelihoodScore: 5,
      aiGenerated: false,
      beieCluster: "enablers",
      leveragePoint: "LP2",
      createdBy: userInfo.id,
      createdByEmail: userInfo.email,
      createdByName: userInfo.name,
      createdAt: now,
    });
  }

  // Section 6: Connectors — BIMP-EAGA
  if (data.q6_1_bimpeaga) {
    items.push({
      id: generateId(),
      category: data.q6_1_bimpeaga >= 4 ? "opportunity" : "weakness",
      description: `BIMP-EAGA integration potential rated ${data.q6_1_bimpeaga}/5`,
      impactScore: data.q6_1_bimpeaga,
      likelihoodScore: 4,
      aiGenerated: false,
      beieCluster: "connectors",
      leveragePoint: "LP3",
      createdBy: userInfo.id,
      createdByEmail: userInfo.email,
      createdByName: userInfo.name,
      createdAt: now,
    });
  }

  // Section 7: Financiers — Islamic finance
  if (data.q7_1_criticality) {
    items.push({
      id: generateId(),
      category: data.q7_1_criticality >= 4 ? "opportunity" : "weakness",
      description: `Islamic finance criticality rated ${data.q7_1_criticality}/5`,
      impactScore: data.q7_1_criticality,
      likelihoodScore: 4,
      aiGenerated: false,
      beieCluster: "financiers",
      leveragePoint: "LP4",
      createdBy: userInfo.id,
      createdByEmail: userInfo.email,
      createdByName: userInfo.name,
      createdAt: now,
    });
  }

  // Section 2: Moral Governance — Archetype
  if (data.q2_3_archetype) {
    items.push({
      id: generateId(),
      category: "strength",
      description: `Moral Governance archetype: ${data.q2_3_archetype}`,
      impactScore: data.q2_1 || 3,
      likelihoodScore: data.q2_2 || 4,
      aiGenerated: false,
      beieCluster: "cross-cutting",
      leveragePoint: "LP3",
      createdBy: userInfo.id,
      createdByEmail: userInfo.email,
      createdByName: userInfo.name,
      createdAt: now,
    });
  }

  return items;
}

function buildStrategicOptions(
  data: SurveySchemaType,
  userInfo: UserInfo
): StrategicOption[] {
  const options: StrategicOption[] = [];
  const now = new Date().toISOString();

  if (data.q8_1) {
    options.push({
      id: generateId(),
      optionType: "SO",
      title: data.q8_1,
      description: data.q8_3 || "",
      priorityScore: data.q10_1_ambition || 3,
      feasibilityScore: data.q3_2_feasibility || 3,
      selected: true,
      leveragePoint: "LP1",
      beieCluster: "transformers",
      birdPhase: "1",
      resourceRequirement: data.q9_1 && data.q9_1 > 1_000_000_000 ? "high" : "medium",
      createdBy: userInfo.id,
      createdByEmail: userInfo.email,
      createdByName: userInfo.name,
      createdAt: now,
    });
  }

  // Add IEDS as selected if matrix scores it highest
  if (data.q10_matrix) {
    const matrix = data.q10_matrix;
    const scores = {
      heds: Object.values(matrix.heds).reduce((a, b) => a + b, 0),
      gems: Object.values(matrix.gems).reduce((a, b) => a + b, 0),
      ifes: Object.values(matrix.ifes).reduce((a, b) => a + b, 0),
      ieds: Object.values(matrix.ieds).reduce((a, b) => a + b, 0),
    };
    const winner = (Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] || "ieds") as
      | "heds" | "gems" | "ifes" | "ieds";

    const strategyMap = {
      heds: { title: "Halal Ecosystem Development Strategy", lp: "LP1" as LeveragePoint, cluster: "transformers" as BEIECluster },
      gems: { title: "Green Economy & MSME Strategy", lp: "LP5" as LeveragePoint, cluster: "foundations" as BEIECluster },
      ifes: { title: "Islamic Finance Ecosystem Strategy", lp: "LP4" as LeveragePoint, cluster: "financiers" as BEIECluster },
      ieds: { title: "Integrated Ecosystem Development Strategy", lp: "LP1" as LeveragePoint, cluster: "cross-cutting" as BEIECluster },
    };

    options.push({
      id: generateId(),
      optionType: "SO",
      title: strategyMap[winner].title,
      description: `Highest-scoring strategy from IEDS Matrix evaluation (${scores[winner]} points)`,
      priorityScore: 5,
      feasibilityScore: data.q3_2_feasibility || 3,
      selected: true,
      leveragePoint: strategyMap[winner].lp,
      beieCluster: strategyMap[winner].cluster,
      birdPhase: "1",
      resourceRequirement: "high",
      createdBy: userInfo.id,
      createdByEmail: userInfo.email,
      createdByName: userInfo.name,
      createdAt: now,
    });
  }

  return options;
}

function buildObjectives(data: SurveySchemaType, userInfo: UserInfo): BSCObjective[] {
  const objectives: BSCObjective[] = [];
  const now = new Date().toISOString();

  // Financial: Budget target
  if (data.q9_1) {
    const objId = generateId();
    objectives.push({
      id: objId,
      perspective: "financial",
      objective: `Mobilize ₱${(data.q9_1 / 1e9).toFixed(1)}B in strategic investments`,
      description: "Survey-derived budget target for BIRD 2026–2035 implementation",
      weight: 1.5,
      leveragePoint: "LP1",
      beieCluster: "transformers",
      birdPhase: "1",
      createdBy: userInfo.id,
      createdByName: userInfo.name,
      createdAt: now,
      champion: userInfo.id,
      championName: userInfo.name,
      kpis: [
        {
          id: generateId(),
          objectiveId: objId,
          name: "Total Investment Mobilized",
          description: "Cumulative investment approvals and commitments",
          unit: "₱B",
          baselineValue: 5.1,
          targetValue: data.q9_1 / 1e9,
          target2030: (data.q9_1 / 1e9) * 0.6,
          currentValue: 5.1,
          frequency: "quarterly",
          owner: userInfo.id,
          ownerName: userInfo.name,
          ownerEmail: userInfo.email,
          status: "on-track",
          leveragePoint: "LP1",
        },
      ],
    });
  }

  // Stakeholder: Poverty reduction
  if (data.q11_1_affirmative) {
    const objId = generateId();
    objectives.push({
      id: objId,
      perspective: "stakeholder",
      objective: "Ensure equitable provincial development across BARMM",
      description: `Affirmative action approach: ${data.q11_1_affirmative}`,
      weight: 1.5,
      leveragePoint: "LP3",
      beieCluster: "cross-cutting",
      birdPhase: "1",
      createdBy: userInfo.id,
      createdByName: userInfo.name,
      createdAt: now,
      champion: userInfo.id,
      championName: userInfo.name,
      kpis: [
        {
          id: generateId(),
          objectiveId: objId,
          name: "Provincial Equity Index",
          description: "Inter-provincial development gap closure metric",
          unit: "index",
          baselineValue: 0,
          targetValue: 100,
          target2030: 60,
          currentValue: 0,
          frequency: "annually",
          owner: userInfo.id,
          ownerName: userInfo.name,
          ownerEmail: userInfo.email,
          status: "on-track",
          leveragePoint: "LP3",
        },
      ],
    });
  }

  // Internal Process: Climate resilience
  if (data.q12_1_green_priority) {
    const objId = generateId();
    objectives.push({
      id: objId,
      perspective: "internal_process",
      objective: "Integrate climate resilience into all BEIE cluster investments",
      description: `Green economy priority rating: ${data.q12_1_green_priority}/5`,
      weight: 1.5,
      leveragePoint: "LP5",
      beieCluster: "foundations",
      birdPhase: "2",
      createdBy: userInfo.id,
      createdByName: userInfo.name,
      createdAt: now,
      champion: userInfo.id,
      championName: userInfo.name,
      kpis: [
        {
          id: generateId(),
          objectiveId: objId,
          name: "Climate-Adaptive Investments",
          description: "Percentage of PAPs with climate risk assessment",
          unit: "%",
          baselineValue: 0,
          targetValue: 100,
          target2030: 75,
          currentValue: 0,
          frequency: "annually",
          owner: userInfo.id,
          ownerName: userInfo.name,
          ownerEmail: userInfo.email,
          status: "on-track",
          leveragePoint: "LP5",
        },
      ],
    });
  }

  return objectives;
}

function buildPAPs(data: SurveySchemaType, userInfo: UserInfo): PAP[] {
  const paps: PAP[] = [];
  const now = new Date().toISOString();

  if (data.q9_1 && data.q9_1 > 0) {
    paps.push({
      id: generateId(),
      papType: "program",
      name: "BIRD Survey-Derived Investment Program",
      description: `Strategic investment program derived from stakeholder survey. Priority sectors: ${data.q5_2_sectors?.join(", ") || "TBD"}`,
      owner: userInfo.id,
      ownerName: userInfo.name,
      ownerEmail: userInfo.email,
      budget: data.q9_1,
      spent: 0,
      startDate: "2026-01-01",
      endDate: "2035-12-31",
      progress: 0,
      status: "planned",
      beieCluster: "transformers",
      birdPhase: "1",
      leveragePoint: "LP1",
      leadAgency: data.demo_organization || "TBD",
      sdgAlignment: "SDG 8, 9, 17",
      createdBy: userInfo.id,
      createdByName: userInfo.name,
      createdAt: now,
      teamMembers: [userInfo.id],
    });
  }

  return paps;
}
```

---

#### E2. Wire `formulas.ts` — Real-Time Score Computation

**File:** `src/hooks/useSurveyScores.ts` (NEW)

```typescript
// src/hooks/useSurveyScores.ts
import { useMemo } from "react";
import { useWatch } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import type { SurveySchemaType } from "@/lib/survey-schema";

import {
  calculateResilienceIndex,
  calculateRiskLevel,
  calculateVulnerabilityIndex,
  calculateLeveragePriority,
  estimateInvestmentROI,
  getStatusColor,
  formatCurrency,
} from "@/lib/formulas";

export interface SurveyScores {
  // Per-cluster resilience scores
  foundationsResilience: number | null;
  transformersResilience: number | null;
  enablersResilience: number | null;
  connectorsResilience: number | null;
  financiersResilience: number | null;

  // Risk levels
  foundationsRisk: string | null;
  transformersRisk: string | null;
  enablersRisk: string | null;
  connectorsRisk: string | null;
  financiersRisk: string | null;

  // Strategic
  iedsPriorityScore: number | null;
  estimatedROI: { estimatedReturn: number; multiplier: number; timeframe: string } | null;

  // C.A.R.E.
  careAverage: number | null;
  careStatus: string;
}

export function useSurveyScores(form: UseFormReturn<SurveySchemaType>): SurveyScores {
  const values = useWatch({ control: form.control });

  return useMemo(() => {
    const scores: SurveyScores = {
      foundationsResilience: null,
      transformersResilience: null,
      enablersResilience: null,
      connectorsResilience: null,
      financiersResilience: null,
      foundationsRisk: null,
      transformersRisk: null,
      enablersRisk: null,
      connectorsRisk: null,
      financiersRisk: null,
      iedsPriorityScore: null,
      estimatedROI: null,
      careAverage: null,
      careStatus: "incomplete",
    };

    // Section 3: Foundations
    if (values.q3_el_nino_impact && values.q3_el_nino_like) {
      scores.foundationsResilience = calculateResilienceIndex(
        values.q3_el_nino_impact,
        values.q3_el_nino_like
      );
      scores.foundationsRisk = calculateRiskLevel(
        values.q3_el_nino_impact,
        values.q3_el_nino_like
      );
    }

    // Section 4: Transformers
    if (values.q4_4_commodity_impact) {
      scores.transformersResilience = calculateResilienceIndex(
        values.q4_4_commodity_impact,
        4 // assumed likelihood
      );
      scores.transformersRisk = calculateRiskLevel(
        values.q4_4_commodity_impact,
        4
      );
    }

    // Section 5: Enablers
    if (values.q5_1_infra) {
      scores.enablersResilience = calculateResilienceIndex(
        values.q5_1_infra,
        5
      );
      scores.enablersRisk = calculateRiskLevel(values.q5_1_infra, 5);
    }

    // Section 6: Connectors
    if (values.q6_1_bimpeaga) {
      scores.connectorsResilience = calculateResilienceIndex(
        values.q6_1_bimpeaga,
        4
      );
      scores.connectorsRisk = calculateRiskLevel(values.q6_1_bimpeaga, 4);
    }

    // Section 7: Financiers
    if (values.q7_1_criticality) {
      scores.financiersResilience = calculateResilienceIndex(
        values.q7_1_criticality,
        4
      );
      scores.financiersRisk = calculateRiskLevel(values.q7_1_criticality, 4);
    }

    // Section 10: IEDS Matrix priority
    if (values.q10_matrix) {
      const matrix = values.q10_matrix;
      const iedsScores = matrix.ieds;
      scores.iedsPriorityScore = calculateLeveragePriority(
        iedsScores.systems_leverage,
        iedsScores.inclusivity,
        iedsScores.feasibility
      );
    }

    // Section 9: Budget ROI
    if (values.q9_1 && values.q8_1) {
      const sector = inferSector(values.q8_1);
      scores.estimatedROI = estimateInvestmentROI(values.q9_1, sector);
    }

    // Section 15: C.A.R.E.
    if (
      values.care_context !== undefined &&
      values.care_action !== undefined &&
      values.care_realtime !== undefined &&
      values.care_evidence !== undefined &&
      values.care_overall !== undefined
    ) {
      scores.careAverage =
        (values.care_context +
          values.care_action +
          values.care_realtime +
          values.care_evidence +
          values.care_overall) / 5;
      scores.careStatus =
        scores.careAverage >= 4
          ? "excellent"
          : scores.careAverage >= 3
          ? "good"
          : scores.careAverage >= 2
          ? "needs-improvement"
          : "critical";
    }

    return scores;
  }, [values]);
}

function inferSector(strategy: string): "halal" | "agro-industrial" | "green-economy" | "digital" | "infrastructure" {
  const s = strategy.toLowerCase();
  if (s.includes("halal")) return "halal";
  if (s.includes("green") || s.includes("climate") || s.includes("carbon")) return "green-economy";
  if (s.includes("digital") || s.includes("tech") || s.includes("broadband")) return "digital";
  if (s.includes("infra") || s.includes("road") || s.includes("power")) return "infrastructure";
  return "agro-industrial";
}
```

---

#### E3. Wire `supabase.ts` — Backend Persistence

**File:** `src/lib/api.ts` (MODIFY existing `submitSurvey`)

```typescript
// src/lib/api.ts
import {
  supabase,
  saveSinglePlan,
  triggerEmailNotification,
  EXTERNAL_URLS,
} from "./supabase";
import { convertSurveyToPlan } from "./survey-converter";
import type { SurveySchemaType } from "./survey-schema";
import type { UserInfo } from "./strategicPlanStore";

export async function submitSurvey(data: SurveySchemaType): Promise<void> {
  // 1. Authenticate
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Authentication required. Please sign in.");

  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData.session?.access_token;
  if (!token) throw new Error("Session expired. Please sign in again.");

  // 2. Build user info from survey demographics
  const userInfo: UserInfo = {
    id: user.id,
    email: user.email!,
    name: data.demo_name || user.email!,
    role: "editor",
    organization: data.demo_organization || undefined,
  };

  // 3. Convert survey → StrategicPlan
  const plan = convertSurveyToPlan(data, userInfo);

  // 4. Persist to Supabase
  const saved = await saveSinglePlan(plan, token);
  if (!saved) {
    // Fallback: save to localStorage
    const { loadFromStorage, saveToStorage } = await import("./strategicPlanStore");
    const existing = loadFromStorage(user.id);
    existing.plans.push(plan);
    saveToStorage(existing.plans, plan.id, user.id);
    console.warn("[submitSurvey] Edge function failed — saved to localStorage as fallback");
  }

  // 5. Send confirmation email
  await triggerEmailNotification("welcome", user.id, {
    plan_name: plan.name,
    organization: plan.organization,
    survey_completed: true,
  });
}

export { EXTERNAL_URLS };
```

---

#### E4. Wire `utils.ts` — SWOT Metric Display

**File:** `src/components/strategic/SurveyScorePanel.tsx` (NEW)

```typescript
// src/components/strategic/SurveyScorePanel.tsx
import React from "react";
import { useSurveyScores } from "@/hooks/useSurveyScores";
import { getStatusColor, cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formulas";
import type { UseFormReturn } from "react-hook-form";
import type { SurveySchemaType } from "@/lib/survey-schema";

interface Props {
  form: UseFormReturn<SurveySchemaType>;
}

export const SurveyScorePanel: React.FC<Props> = ({ form }) => {
  const scores = useSurveyScores(form);

  const clusters = [
    { name: "Foundations", resilience: scores.foundationsResilience, risk: scores.foundationsRisk },
    { name: "Transformers", resilience: scores.transformersResilience, risk: scores.transformersRisk },
    { name: "Enablers", resilience: scores.enablersResilience, risk: scores.enablersRisk },
    { name: "Connectors", resilience: scores.connectorsResilience, risk: scores.connectorsRisk },
    { name: "Financiers", resilience: scores.financiersResilience, risk: scores.financiersRisk },
  ];

  return (
    <div className="space-y-4">
      {/* Cluster Resilience Cards */}
      <div className="grid grid-cols-1 gap-2">
        {clusters.map((c) =>
          c.resilience !== null ? (
            <div
              key={c.name}
              className={cn(
                "flex items-center justify-between rounded-lg border px-3 py-2 text-sm",
                getStatusColor(
                  c.risk === "Critical"
                    ? "critical"
                    : c.risk === "High"
                    ? "behind"
                    : c.risk === "Medium"
                    ? "watch"
                    : "on-track"
                )
              )}
            >
              <span className="font-medium">{c.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs opacity-70">RI: {c.resilience}</span>
                <span className="text-xs font-bold">{c.risk}</span>
              </div>
            </div>
          ) : null
        )}
      </div>

      {/* ROI Preview */}
      {scores.estimatedROI && (
        <div className="rounded-lg border border-[#C9A84C]/30 bg-[#022c22]/60 p-3">
          <p className="text-xs font-bold text-[#C9A84C] uppercase tracking-wider mb-1">
            Estimated ROI
          </p>
          <p className="text-lg font-serif text-[#E8C560]">
            {formatCurrency(scores.estimatedROI.estimatedReturn)}
          </p>
          <p className="text-xs text-[#ecfdf5]/60">
            {scores.estimatedROI.multiplier}x multiplier · {scores.estimatedROI.timeframe}
          </p>
        </div>
      )}

      {/* C.A.R.E. Score */}
      {scores.careAverage !== null && (
        <div className="rounded-lg border border-[#C9A84C]/30 bg-[#022c22]/60 p-3">
          <p className="text-xs font-bold text-[#C9A84C] uppercase tracking-wider mb-1">
            C.A.R.E. Validation
          </p>
          <div className="flex items-center gap-2">
            <div className="h-2 flex-1 rounded-full bg-[#064e3b]">
              <div
                className="h-2 rounded-full bg-[#C9A84C] transition-all"
                style={{ width: `${(scores.careAverage / 5) * 100}%` }}
              />
            </div>
            <span className="text-sm font-bold text-[#E8C560]">
              {scores.careAverage.toFixed(1)}/5
            </span>
          </div>
          <p className="text-xs text-[#ecfdf5]/60 mt-1 capitalize">
            {scores.careStatus.replace(/-/g, " ")}
          </p>
        </div>
      )}
    </div>
  );
};
```

---

### 4.2 High Priority (Should-Have)

#### E5. Add Score Panel to SurveyWizard Layout

**File:** `src/components/strategic/SurveyWizard.tsx` (MODIFY)

Insert the `SurveyScorePanel` into the right sidebar, below `ContextPanel`:

```tsx
{/* Context Panel Column — Videos, Images, Sites + Scores */}
<div className="lg:col-span-1">
  <div className="sticky top-6 space-y-4">
    <ContextPanel sectionId={currentSectionId} compact />

    {/* NEW: Live Score Panel */}
    <SurveyScorePanel form={form} />

    {/* Quick Links Card */}
    <Card className="bg-[#022c22]/40 backdrop-blur-xl border-[#C9A84C]/20">
      {/* ... existing content ... */}
    </Card>
  </div>
</div>
```

---

#### E6. Use `EXTERNAL_URLS` from `supabase.ts`

**File:** `src/components/strategic/SurveyWizard.tsx` (MODIFY)

```tsx
// REPLACE hardcoded URL:
import { EXTERNAL_URLS } from "@/lib/supabase";

// In success state:
<Button onClick={() => window.open(EXTERNAL_URLS.PWA, "_blank")}>
  Access BIRD App →
</Button>
```

---

### 4.3 Medium Priority (Nice-to-Have)

#### E7. Local Storage Fallback

Use `loadFromStorage()` / `saveToStorage()` from `strategicPlanStore.ts` as a fallback when Supabase is unavailable.

#### E8. Plan Completion Tracking

Use `computePlanCompletion()` from `strategicPlanStore.ts` to show survey-to-plan completion progress.

#### E9. AI Strategy Assistant Integration

Call `EDGE_FUNCTIONS.AI_STRATEGY_ASSISTANT` after survey submission to generate AI-powered strategic recommendations based on the survey data.

---

## 5. Implementation Roadmap

### Phase 1: Foundation (Week 1)
- [ ] Create `src/lib/survey-converter.ts` (E1)
- [ ] Create `src/hooks/useSurveyScores.ts` (E2)
- [ ] Modify `src/lib/api.ts` to use Supabase (E3)
- [ ] Test survey → plan conversion with sample data

### Phase 2: UI Integration (Week 2)
- [ ] Create `src/components/strategic/SurveyScorePanel.tsx` (E4)
- [ ] Integrate score panel into SurveyWizard sidebar (E5)
- [ ] Replace hardcoded URLs with `EXTERNAL_URLS` (E6)
- [ ] Add real-time resilience badges to section components

### Phase 3: Polish & Fallbacks (Week 3)
- [ ] Implement localStorage fallback (E7)
- [ ] Add plan completion tracking (E8)
- [ ] Integrate AI Strategy Assistant (E9)
- [ ] End-to-end testing with Supabase Edge Functions

---

## 6. Appendix: Type Mappings

### Survey Schema → StrategicPlan Mapping (Complete)

| Survey Field | Type | StrategicPlan Target | Transform Logic |
|-------------|------|---------------------|-----------------|
| `q1_1` | `string` | `organization` | Direct assignment |
| `q1_2` | `string` | `strategicIntent` | Direct assignment |
| `q2_1` | `number` | `swotItems[].impactScore` | Moral Governance strength |
| `q2_2` | `number` | `swotItems[].likelihoodScore` | Moral Governance strength |
| `q2_3_archetype` | `string` | `swotItems[].description` | Archetype name + scores |
| `q2_4_peace` | `string[]` | `swotItems[]` | One item per peace pillar |
| `q3_1_priorities` | `string[]` | `swotItems[]` | Foundations priorities |
| `q3_2_feasibility` | `number` | `strategicOptions[].feasibilityScore` | Global feasibility |
| `q3_el_nino_impact` | `number` | `swotItems[].impactScore` | Climate threat |
| `q3_el_nino_like` | `number` | `swotItems[].likelihoodScore` | Climate threat |
| `q3_pestalotiopsis_impact` | `number` | `swotItems[].impactScore` | Disease threat |
| `q3_pestalotiopsis_like` | `number` | `swotItems[].likelihoodScore` | Disease threat |
| `q3_postharvest_impact` | `number` | `swotItems[].impactScore` | Post-harvest weakness |
| `q3_postharvest_like` | `number` | `swotItems[].likelihoodScore` | Post-harvest weakness |
| `q3_limits_growth` | `string` | `swotItems[].description` | Growth limiter |
| `q4_1_barrier` | `string` | `swotItems[].description` | Halal barrier |
| `q4_2_halal_park` | `string` | `swotItems[].description` | Park assessment |
| `q4_3_fixes_fail` | `string` | `swotItems[].description` | Systemic weakness |
| `q4_4_commodity_impact` | `number` | `swotItems[].impactScore` | Commodity threat |
| `q4_5_heds_ranking` | `string[]` | `strategicOptions[]` | HEDS strategy ranking |
| `q5_1_infra` | `number` | `swotItems[].impactScore` | Infrastructure weakness |
| `q5_2_sectors` | `string[]` | `paps[].description` | Priority sectors |
| `q5_3_broadband` | `number` | `swotItems[].impactScore` | Digital gap |
| `q5_4_literacy` | `number` | `swotItems[].impactScore` | Human capital weakness |
| `q5_5_stunting` | `number` | `swotItems[].impactScore` | Health weakness |
| `q5_6_digital_divide` | `string` | `swotItems[].description` | Digital narrative |
| `q6_1_bimpeaga` | `number` | `swotItems[].impactScore` | BIMP-EAGA opportunity |
| `q6_2_markets` | `string[]` | `swotItems[]` | Target markets |
| `q6_3_export_target` | `number` | `objectives[].kpis[].targetValue` | Export KPI |
| `q6_4_uae_feasibility` | `number` | `swotItems[].impactScore` | UAE opportunity |
| `q6_5_perception` | `string` | `swotItems[].description` | Perception threat |
| `q7_1_criticality` | `number` | `swotItems[].impactScore` | Finance opportunity |
| `q7_2_instruments` | `string[]` | `swotItems[]` | Finance instruments |
| `q7_3_inclusion_target` | `number` | `objectives[].kpis[].targetValue` | Inclusion KPI |
| `q7_4_asset_paradox` | `string` | `swotItems[].description` | Asset paradox |
| `q7_5_block_grant` | `string` | `swotItems[].description` | Fiscal threat |
| `q8_1_strategy` | `string` | `strategicOptions[].title` | Primary strategy |
| `q8_2_sequencing` | `string` | `strategicOptions[].description` | Sequencing logic |
| `q8_3_comments` | `string` | `strategicOptions[].description` | Append to description |
| `q9_1_budget` | `number` | `paps[].budget` | Total budget |
| `q10_1_ambition` | `number` | `strategicOptions[].priorityScore` | Ambition level |
| `q10_matrix` | `object` | `strategicOptions[]` | Matrix winner → selected strategy |
| `q11_1_affirmative` | `string` | `objectives[].description` | Equity approach |
| `q11_2_mechanisms` | `string[]` | `objectives[].description` | Equity mechanisms |
| `q12_1_green_priority` | `number` | `objectives[].weight` | Climate priority |
| `q12_2_adaptation` | `string[]` | `objectives[].description` | Adaptation measures |
| `q13_1_legislation` | `string[]` | `swotItems[]` | Legislative gaps |
| `q13_2_bicc` | `number` | `swotItems[].impactScore` | BICC strength |
| `demo_category` | `string` | `plan.metadata` | Stakeholder category |
| `demo_province` | `string` | `plan.organization` | Province context |
| `demo_expertise` | `string[]` | `plan.metadata` | Expertise areas |
| `demo_name` | `string` | `createdByName` | Submitter name |
| `demo_email` | `string` | `createdByEmail` | Submitter email |
| `demo_organization` | `string` | `organization` | Organization |
| `care_context` | `number` | `plan.metadata` | C.A.R.E. score |
| `care_action` | `number` | `plan.metadata` | C.A.R.E. score |
| `care_realtime` | `number` | `plan.metadata` | C.A.R.E. score |
| `care_evidence` | `number` | `plan.metadata` | C.A.R.E. score |
| `care_overall` | `number` | `plan.metadata` | C.A.R.E. score |
| `consent_final` | `boolean` | `plan.status` | `"active"` if true |

---

## End of Document

> **Maintainers:** BIRD Engineering Team  
> **Next Review:** 2026-07-23
