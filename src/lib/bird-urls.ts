     1	// ============================================================================
     2	// BIRD 2026–2035 · Multimedia Asset Registry
     3	// Centralized URLs for all images & videos used across the platform.
     4	// Source: Supabase Storage (lydsisparsmvextskevw)
     5	// ============================================================================
     6	
     7	const STORAGE_URL =
     8	  'https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public';
     9	
    10	// ─── Validation Survey Images ────────────────────────────────────────────────
    11	const VALIDATION_IMG = `${STORAGE_URL}/validation-survey-images`;
    12	
    13	// ─── BEIE / Strategic Images ─────────────────────────────────────────────────
    14	const BEIE_IMG = `${STORAGE_URL}/BEIE-images`;
    15	
    16	// ─── SWOT & Systems Maps ─────────────────────────────────────────────────────
    17	const SWOT_SYSTEMS_IMG = `${STORAGE_URL}/images-swot-systems-maps`;
    18	
    19	// ─── Strategic Options & Roadmap ─────────────────────────────────────────────
    20	const ROADMAP_IMG = `${STORAGE_URL}/images-strategic-options-roadmap`;
    21	
    22	// ─────────────────────────────────────────────────────────────────────────────
    23	// BIRD EXTERNAL SITES REGISTRY
    24	// ─────────────────────────────────────────────────────────────────────────────
    25	
    26	export const BIRD_SITES = {
    27	  birdMain: {
    28	    title: 'BIRD 2026–2035 Platform',
    29	    description:
    30	      'The official Bangsamoro Investment Roadmap portal — validation survey, strategic planning tools, and real-time analytics.',
    31	    url: 'https://asilvainnovations.github.io/BIRD-2026-2035/',
    32	  },
    33	  bangsamoroGov: {
    34	    title: 'Bangsamoro Government Portal',
    35	    description:
    36	      'Official government portal of the Bangsamoro Autonomous Region in Muslim Mindanao.',
    37	    url: 'https://www.bangsamoro.gov.ph/',
    38	  },
    39	  mtitBarmm: {
    40	    title: 'MTIT-BARMM',
    41	    description:
    42	      'Ministry of Trade, Investments and Tourism of the Bangsamoro Autonomous Region.',
    43	    url: 'https://mtit.bangsamoro.gov.ph/',
    44	  },
    45	  bimpEaga: {
    46	    title: 'BIMP-EAGA',
    47	    description:
    48	      'Brunei Darussalam-Indonesia-Malaysia-Philippines East ASEAN Growth Area.',
    49	    url: 'https://bimp-eaga.asia/',
    50	  },
    51	  psaBarmm: {
    52	    title: 'PSA-BARMM Statistics',
    53	    description:
    54	      'Philippine Statistics Authority — BARMM regional statistics and data.',
    55	    url: 'https://psa.gov.ph/statistics/census/provincial-profile-barmm',
    56	  },
    57	};
    58	
    59	// ─────────────────────────────────────────────────────────────────────────────
    60	// BIRD IMAGES REGISTRY
    61	// ─────────────────────────────────────────────────────────────────────────────
    62	
    63	export const BIRD_IMAGES = {
    64	  // ── Section 0: Orientation ────────────────────────────────────────────────
    65	  validationBanner: {
    66	    url: `${VALIDATION_IMG}/Validation%20Survey%20Banner.png`,
    67	    title: 'BIRD 2026–2035 Validation Survey',
    68	    alt: 'BIRD Validation Survey Banner',
    69	  },
    70	
    71	  // ── Section 1: BEIE Framework ─────────────────────────────────────────────
    72	  sectorToEcosystem: {
    73	    url: `${VALIDATION_IMG}/From%20Sector-Based%20Planning%20to%20BEIE%20Approach.png`,
    74	    title: 'From Sector-Based Planning to BEIE Ecosystem Approach',
    75	    alt: 'Diagram comparing traditional sector-based planning with the integrated BEIE ecosystem approach for BARMM',
    76	    category: 'framework',
    77	  },
    78	  beieFrameworkV2: {
    79	    url: `${VALIDATION_IMG}/BEIE-v2.png`,
    80	    title: 'BEIE Framework v2',
    81	    alt: 'Bangsamoro Economic and Investment Ecosystem Framework version 2',
    82	    category: 'framework',
    83	  },
    84	  beieFrameworkV3: {
    85	    url: `${VALIDATION_IMG}/BEIE-v3.png`,
    86	    title: 'Bangsamoro Investment Ecosystem v3',
    87	    alt: 'Bangsamoro Investment Ecosystem Framework version 3',
    88	    category: 'framework',
    89	  },
    90	  investmentRoadmapInfographic: {
    91	    url: `${VALIDATION_IMG}/2035%20Bangsamoro%20Investment%20Roadmap%20Infographics.png`,
    92	    title: '2035 Bangsamoro Investment Roadmap Infographic',
    93	    alt: 'Investment roadmap infographic showing the path to 2035 for Bangsamoro',
    94	    category: 'framework',
    95	  },
    96	
    97	  // ── Section 2: Moral Governance ───────────────────────────────────────────
    98	  operatingSystems: {
    99	    url: `${BEIE_IMG}/3.%20MG.png`,
   100	    title: 'Moral Governance — The Operating System',
   101	    alt: 'Moral Governance as the operating system of BARMM',
   102	  },
   103	  investmentGovernanceCycles: {
   104	    url: `${SWOT_SYSTEMS_IMG}/Investment%20and%20Governance%20Cycles.png`,
   105	    title: 'Investment–Development & Governance–Confidence Loops',
   106	    alt: 'Two reinforcing loops showing how investment and governance reinforce each other in BARMM',
   107	  },
   108	  moralGovernanceDeRisks: {
   109	    url: `${BEIE_IMG}/How%20moral%20Governance%20De-Risks%20Capital.png`,
   110	    title: 'How Moral Governance De-Risks Capital',
   111	    alt: 'Diagram explaining how moral governance reduces investment risk in BARMM',
   112	  },
   113	  fiveClusters: {
   114	    url: `${BEIE_IMG}/4%20The%20parts%20of%20the%20Engine.png`,
   115	    title: 'Five Interconnected Clusters',
   116	    alt: 'The five interconnected BEIE clusters that drive BARMM',
   117	    category: 'cluster',
   118	  },
   119	
   120	  // ── Section 3: Cluster 1 Foundations ──────────────────────────────────────
   121	  cluster1Foundations: {
   122	    url: `${BEIE_IMG}/10.%20Cluster%201.png`,
   123	    title: 'Cluster 1 — Foundations',
   124	    alt: 'Cluster 1: Foundations of the Bangsamoro economy',
   125	    category: 'cluster',
   126	  },
   127	
   128	  // ── Section 4: Cluster 2 Transformers ─────────────────────────────────────
   129	  cluster2Transformers: {
   130	    url: `${BEIE_IMG}/11.%20Cluster%202%20_%20Transformers.png`,
   131	    title: 'Cluster 2 — Transformers',
   132	    alt: 'Cluster 2: Transformers of the Bangsamoro economy',
   133	    category: 'cluster',
   134	  },
   135	  farmToMarketPipeline: {
   136	    url: `${VALIDATION_IMG}/Transformers-Farm-to-Market%20Pipeline%20.png`,
   137	    title: 'Farm-to-Market Pipeline',
   138	    alt: 'Farm-to-market pipeline showing agricultural value chain in BARMM',
   139	  },
   140	  transformersIndustrialZones: {
   141	    url: `${VALIDATION_IMG}/Industrial%20and%20Economic%20Zones.png`,
   142	    title: 'The Transformers — Capturing Value Through Industrial and Economic Zones',
   143	    alt: 'Industrial and economic zones in the Transformers cluster',
   144	  },
   145	  capitalizingCulturalAdvantage: {
   146	    url: `${VALIDATION_IMG}/Capitalizing%20Cultural%20Advantage%20-%20Halal%20Industry%20Adv.png`,
   147	    title: 'Capitalizing Cultural Advantage — Halal Industry',
   148	    alt: 'How BARMM capitalizes on its cultural advantage for the halal industry',
   149	  },
   150	
   151	  // ── Section 5: Cluster 3 Enablers ─────────────────────────────────────────
   152	  cluster3Enablers: {
   153	    url: `${BEIE_IMG}/Cluster%203%20Enablers.png`,
   154	    title: 'Cluster 3 — Enablers',
   155	    alt: 'Cluster 3: Enablers of the Bangsamoro economy',
   156	    category: 'cluster',
   157	  },
   158	  skillsEducationGap: {
   159	    url: `${VALIDATION_IMG}/Skills%20and%20Education%20Gap.png`,
   160	    title: 'Skills and Education Gap',
   161	    alt: 'Skills and education gap analysis for BARMM',
   162	  },
   163	  enablingGrid: {
   164	    url: `${BEIE_IMG}/Layer%202%20-%20The%20Enabling%20Grid%20and%20Lawof%20Sequencing.png`,
   165	    title: 'The Enabling Grid — 2nd Layer of BARMM Interconnectivity',
   166	    alt: 'The enabling grid showing the second layer of BARMM interconnectivity',
   167	  },
   168	  digitalBackbone: {
   169	    url: `${VALIDATION_IMG}/The%20Digital%20Backbone.png`,
   170	    title: 'The Digital Backbone',
   171	    alt: 'Digital backbone infrastructure for BARMM',
   172	  },
   173	  tourismMasterPlan: {
   174	    url: `${VALIDATION_IMG}/Tourism%20Master%20Plan.png`,
   175	    title: 'Tourism Master Plan',
   176	    alt: 'Tourism master plan for Bangsamoro',
   177	  },
   178	  tourismDigitalConnectivity: {
   179	    url: `${VALIDATION_IMG}/Tourism%20and%20Digital%20Connectivity.png`,
   180	    title: 'Tourism and Digital Connectivity',
   181	    alt: 'Tourism and digital connectivity in BARMM',
   182	  },
   183	  activatingEnablers: {
   184	    url: `${VALIDATION_IMG}/Activating%20the%20Enablers%20-%20Infra%20Primed%20by%20Moral%20Governance.png`,
   185	    title: 'Activating the Enablers — Primed by Moral Governance',
   186	    alt: 'How moral governance activates infrastructure enablers in BARMM',
   187	  },
   188	
   189	  // ── Section 6: Cluster 4 Connectors ───────────────────────────────────────
   190	  cluster4Connectors: {
   191	    url: `${BEIE_IMG}/Cluster%204_%20Connectors.png`,
   192	    title: 'Cluster 4 — Connectors',
   193	    alt: 'Cluster 4: Connectors of the Bangsamoro economy',
   194	    category: 'cluster',
   195	  },
   196	  connectivityIntegratesZones: {
   197	    url: `${ROADMAP_IMG}/Critical%20Test%20-%20Integrating%20Zones%20and%20Scaling%20Capiral%20-%20Think%20of%20one%20challenge%20%20we%20must%20overcome%20to%20achieve%20this%20vision.png`,
   198	    title: 'Does Connectivity Integrate Economic Zones?',
   199	    alt: 'Critical test on whether connectivity integrates economic zones in BARMM',
   200	  },
   201	  connectivityCapital: {
   202	    url: `${VALIDATION_IMG}/The%20Connectivity%20Capital%20.png`,
   203	    title: 'The Connectivity Capital',
   204	    alt: 'Connectivity capital of Bangsamoro',
   205	  },
   206	  provincialSpecializedConnectivity: {
   207	    url: `${BEIE_IMG}/Layer%201%20-%20Provincial%20-%20Geopolitical%20Specialized%20Nodes.png`,
   208	    title: 'Provincial Specialized Connectivity — One Bangsamoro',
   209	    alt: 'Provincial specialized connectivity nodes for One Bangsamoro',
   210	  },
   211	  revitalizingMaritimeTrade: {
   212	    url: `${BEIE_IMG}/Revitalizing%20the%20Maritime%20Trade.png`,
   213	    title: 'Revitalizing the Maritime Trade',
   214	    alt: 'Revitalizing maritime trade in Bangsamoro',
   215	  },
   216	  provincialEndowmentsMainlands: {
   217	    url: `${BEIE_IMG}/Mainlands%20Provincial%20Endowments.png`,
   218	    title: 'Provincial Endowments — Mainlands',
   219	    alt: 'Provincial endowments of mainland Bangsamoro provinces',
   220	  },
   221	  maguindanaoDelSur: {
   222	    url: `${BEIE_IMG}/Maguidano-del-Sur.png`,
   223	    title: 'Maguindanao del Sur Provincial Endowment',
   224	    alt: 'Provincial endowment map of Maguindanao del Sur',
   225	  },
   226	  maguindanaoDelNorte: {
   227	    url: `${BEIE_IMG}/Maguindanao-del-Norte.png`,
   228	    title: 'Maguindanao del Norte Provincial Endowment',
   229	    alt: 'Provincial endowment map of Maguindanao del Norte',
   230	  },
   231	  basilanTawiTawi: {
   232	    url: `${BEIE_IMG}/Basilan%20and%20tawi-Tawi.png`,
   233	    title: 'Basilan & Tawi-Tawi Provincial Endowments',
   234	    alt: 'Provincial endowment maps of Basilan and Tawi-Tawi',
   235	  },
   236	  trappedValue: {
   237	    url: `${BEIE_IMG}/The%20Trapped%20Value.png`,
   238	    title: 'The Trapped Value',
   239	    alt: 'Diagram showing trapped value in Bangsamoro',
   240	  },
   241	  shatteringGeographicIsolation: {
   242	    url: `${BEIE_IMG}/Shattering%20Geographical%20Isolation.png`,
   243	    title: 'Shattering Geographic Isolation',
   244	    alt: 'How Bangsamoro is shattering geographic isolation',
   245	  },
   246	  globalIntegration: {
   247	    url: `${BEIE_IMG}/Global%20Integration%20Vectors.png`,
   248	    title: 'Global Integration Vectors',
   249	    alt: 'Global integration vectors for Bangsamoro',
   250	  },
   251	  globalValueChainUAE: {
   252	    url: `${BEIE_IMG}/UAE%20&%20GCC.png`,
   253	    title: 'Global Value Chain Integration with UAE-GCC',
   254	    alt: 'Global value chain integration with UAE and GCC',
   255	  },
   256	  globalValueChainBIMP: {
   257	    url: `${BEIE_IMG}/BARMM%20Connectivity-BIMP-EAGA.png`,
   258	    title: 'Global Value Chain Integration with BIMP-EAGA',
   259	    alt: 'Global value chain integration with BIMP-EAGA',
   260	  },
   261	  priorityTourismClusters: {
   262	    url: `${VALIDATION_IMG}/Priority%20Tourism%20Clusters%20and%20Investment%20Sites.png`,
   263	    title: 'Priority Tourism Clusters & Investment Sites',
   264	    alt: 'Priority tourism clusters and investment sites in BARMM',
   265	  },
   266	
   267	  // ── Section 7: Cluster 5 Financiers ───────────────────────────────────────
   268	  cluster5Financiers: {
   269	    url: `${BEIE_IMG}/38.%20Cluster%205_%20Financiers.png`,
   270	    title: 'Cluster 5 — Financiers',
   271	    alt: 'Cluster 5: Financiers of the Bangsamoro economy',
   272	    category: 'cluster',
   273	  },
   274	  islamicFinanceRoadmap: {
   275	    url: `${VALIDATION_IMG}/Islamic%20Finance%20Roadmap.png`,
   276	    title: 'Islamic Finance Roadmap',
   277	    alt: 'Islamic finance roadmap for Bangsamoro',
   278	  },
   279	
   280	  // ── Section 7: Systems Archetypes ─────────────────────────────────────────
   281	  anatomyCLD: {
   282	    url: `${VALIDATION_IMG}/3-Anatomy%20of%20CLD.png`,
   283	    title: 'Anatomy of a Causal Loop Diagram',
   284	    alt: 'Anatomy of a causal loop diagram',
   285	  },
   286	  uncheckedGrowth: {
   287	    url: `${SWOT_SYSTEMS_IMG}/19.%20The%20Archetypes.png`,
   288	    title: 'Unchecked Growth Hits Infrastructure & Security Ceilings',
   289	    alt: 'Diagram showing how unchecked growth hits hard infrastructure and security ceilings',
   290	  },
   291	  whySynchronizationMatters: {
   292	    url: `${BEIE_IMG}/6.%20Why%20Synchronization%20Matters.png`,
   293	    title: 'Why Synchronization Matters',
   294	    alt: 'Why synchronization matters in the Bangsamoro investment ecosystem',
   295	  },
   296	
   297	  // ── Systems Archetypes Banners ────────────────────────────────────────────
   298	  systemsArchetypesBanner: {
   299	    url: `${VALIDATION_IMG}/Systems%20Archetypes%20Banner.png`,
   300	    title: 'Systems Archetypes Banner',
   301	    alt: 'Systems archetypes banner for Bangsamoro',
   302	  },
   303	  anatomySystemsTraps: {
   304	    url: `${VALIDATION_IMG}/6-Anatomy%20of%20Systems%20Traps.png`,
   305	    title: 'Anatomy of Systems Traps or Archetypes',
   306	    alt: 'Anatomy of systems traps or archetypes',
   307	  },
   308	
   309	  // ── Capacity Traps ────────────────────────────────────────────────────────
   310	  capacityTraps: {
   311	    url: `${VALIDATION_IMG}/Hitting%20the%20Growth%20Wall-%20Limits%20to%20Growth%20and%20Growth%20and%20Underinvestment.png`,
   312	    title: 'Capacity Traps — Hitting the Growth Wall',
   313	    alt: 'Capacity traps showing limits to growth and growth and underinvestment archetypes',
   314	  },
   315	  limitsToGrowthArchetype: {
   316	    url: `${VALIDATION_IMG}/Limits%20to%20Growth%20Archetype.png`,
   317	    title: 'Limits to Growth Archetype',
   318	    alt: 'Limits to growth archetype diagram',
   319	  },
   320	  growthUnderinvestment: {
   321	    url: `${VALIDATION_IMG}/Growth%20and%20Underinvestment.png`,
   322	    title: 'Growth and Underinvestment Archetype',
   323	    alt: 'Growth and underinvestment archetype diagram',
   324	  },
   325	
   326	  // ── Governance Traps ──────────────────────────────────────────────────────
   327	  shiftingTheBurden: {
   328	    url: `${VALIDATION_IMG}/Shifting%20the%20Burden%20Archetype.png`,
   329	    title: 'Shifting the Burden Archetype',
   330	    alt: 'Shifting the burden archetype diagram',
   331	  },
   332	  fixesThatFail: {
   333	    url: `${VALIDATION_IMG}/Fixes%20that%20Fail%20Archetype.png`,
   334	    title: 'Fixes that Fail Archetype',
   335	    alt: 'Fixes that fail archetype diagram',
   336	  },
   337	  driftingGoals: {
   338	    url: `${SWOT_SYSTEMS_IMG}/Drifting%20Goals.png`,
   339	    title: 'Drifting Goals Archetype',
   340	    alt: 'Drifting goals archetype diagram',
   341	  },
   342	
   343	  // ── Resource & Equity Traps ───────────────────────────────────────────────
   344	  resourceEquityTraps: {
   345	    url: `${VALIDATION_IMG}/Resource%20and%20Equity%20Traps%20-%20Success%20to%20the%20Successful%20and%20Growth%20and%20Tragedy%20of%20the%20Commons%20Archetypes%20.png`,
   346	    title: 'Resource and Equity Traps',
   347	    alt: 'Resource and equity traps archetypes',
   348	  },
   349	  successToTheSuccessful: {
   350	    url: `${VALIDATION_IMG}/Success%20to%20the%20Successful%20Aarchetype.png`,
   351	    title: 'Success to the Successful Archetype',
   352	    alt: 'Success to the successful archetype diagram',
   353	  },
   354	  tragedyOfTheCommons: {
   355	    url: `${VALIDATION_IMG}/Tragedy%20of%20the%20Commons%20Archetype.png`,
   356	    title: 'Tragedy of the Commons Archetype',
   357	    alt: 'Tragedy of the commons archetype diagram',
   358	  },
   359	
   360	  // ── Instability Traps ─────────────────────────────────────────────────────
   361	  instabilityTrapsIntro: {
   362	    url: `${VALIDATION_IMG}/Instability%20Traps%20Introduction.png`,
   363	    title: 'Instability Traps Introduction',
   364	    alt: 'Introduction to instability traps',
   365	  },
   366	  cyclesExclusionRetaliation: {
   367	    url: `${VALIDATION_IMG}/Cycles%20of%20Exclusion%20and%20Retaliation.png`,
   368	    title: 'Cycles of Exclusion and Retaliation',
   369	    alt: 'Cycles of exclusion and retaliation archetype',
   370	  },
   371	  escalation: {
   372	    url: `${SWOT_SYSTEMS_IMG}/Escalation.png`,
   373	    title: 'Escalation Archetype',
   374	    alt: 'Escalation archetype diagram',
   375	  },
   376	  bigManArchetype: {
   377	    url: `${SWOT_SYSTEMS_IMG}/The%20Big%20Man%20Archetype.png`,
   378	    title: 'The Big Man Archetype',
   379	    alt: 'The Big Man archetype diagram',
   380	  },
   381	
   382	  // ── Leverage Points ───────────────────────────────────────────────────────
   383	  leveragePointsBanner: {
   384	    url: `${VALIDATION_IMG}/Leverage%20Points%20Banner.png`,
   385	    title: 'Leverage Points Banner',
   386	    alt: 'Leverage points banner',
   387	  },
   388	  howToIdentifyLeveragePoints: {
   389	    url: `${SWOT_SYSTEMS_IMG}/How%20to%20Identify%20Leverage%20Points.png`,
   390	    title: 'How to Identify Leverage Points',
   391	    alt: 'How to identify leverage points diagram',
   392	  },
   393	  activatingLeveragePoints: {
   394	    url: `${SWOT_SYSTEMS_IMG}/Activating%20Leverage%20Points.png`,
   395	    title: 'Activating Leverage Points',
   396	    alt: 'Activating leverage points diagram',
   397	  },
   398	  strategicLeveragePoints: {
   399	    url: `${VALIDATION_IMG}/27.%20Strategic%20Leverage%20Points.png`,
   400	    title: 'Strategic Leverage Points',
   401	    alt: 'Strategic leverage points for Bangsamoro',
   402	  },
   403	  leverageCapacityTraps: {
   404	    url: `${VALIDATION_IMG}/Skills%20and%20Education%20Gap.png`,
   405	    title: 'Leverage Points in Capacity Traps',
   406	    alt: 'Leverage points in capacity traps',
   407	  },
   408	  leverageGovernanceTraps: {
   409	    url: `${VALIDATION_IMG}/Iceberg%20Model%20Paradigm.png`,
   410	    title: "Leverage Points in Governance Traps: The Iceberg Model",
   411	    alt: 'Leverage points in governance traps using the iceberg model paradigm',
   412	  },
   413	  archetypesLeveragePoints: {
   414	    url: `${VALIDATION_IMG}/Archetypes%20&%20Leverage%20Points.png`,
   415	    title: 'Archetypes and Leverage Points',
   416	    alt: 'Archetypes and leverage points combined diagram',
   417	  },
   418	
   419	  // ── Section 8: Strategic Options ──────────────────────────────────────────
   420	  fourStrategicOptions: {
   421	    url: `${ROADMAP_IMG}/3.%20Strategic%20Options%20Ranking.png`,
   422	    title: 'Four Strategic Options',
   423	    alt: 'Four strategic options for Bangsamoro',
   424	  },
   425	  sequencing: {
   426	    url: `${ROADMAP_IMG}/Sequencing.png`,
   427	    title: 'The Phasing — Strategic Sequencing',
   428	    alt: 'Strategic sequencing and phasing diagram',
   429	  },
   430	
   431	  // ── Section 9: Budget Targets ─────────────────────────────────────────────
   432	  budgetThreePhases: {
   433	    url: `${VALIDATION_IMG}/22.%20Regulatory%20Architecture.png`,
   434	    title: 'Budget for Three Phases',
   435	    alt: 'Budget allocation across three phases',
   436	  },
   437	  capitalDeploymentPerPhase: {
   438	    url: `${VALIDATION_IMG}/28.%20Ecosystem%20Success.png`,
   439	    title: 'Total Capital Deployment Per Phase',
   440	    alt: 'Total capital deployment per phase',
   441	  },
   442	  executingRoadmap: {
   443	    url: `${ROADMAP_IMG}/Executing%20the%20Roadmap.png`,
   444	    title: 'Executing the Roadmap — Timeline',
   445	    alt: 'Timeline for executing the Bangsamoro roadmap',
   446	  },
   447	  roadmapInMotion: {
   448	    url: `${VALIDATION_IMG}/Roadmap%20on%20Motion.png`,
   449	    title: 'Roadmap in Motion',
   450	    alt: 'Roadmap in motion showing dynamic progress',
   451	  },
   452	
   453	  // ── Section 10: IEDS ──────────────────────────────────────────────────────
   454	  iedsExecutionEngine: {
   455	    url: `${ROADMAP_IMG}/The%20Execution%20Engine%20-IEDS.png`,
   456	    title: 'IEDS — The Execution Engine',
   457	    alt: 'IEDS execution engine diagram',
   458	  },
   459	  metricsArchitecture: {
   460	    url: `${VALIDATION_IMG}/Metrics%20Architecture%20(1).png`,
   461	    title: 'Metrics Architecture',
   462	    alt: 'Metrics architecture for monitoring and evaluation',
   463	  },
   464	
   465	  // ── Section 11: Policies ──────────────────────────────────────────────────
   466	  regulatoryArchitecture: {
   467	    url: `${VALIDATION_IMG}/22.%20Regulatory%20Architecture.png`,
   468	    title: 'Regulatory Architecture',
   469	    alt: 'Regulatory architecture for Bangsamoro',
   470	  },
   471	  draftJMC: {
   472	    url: `${VALIDATION_IMG}/23.%20Draft%20JMC%202026-01.png`,
   473	    title: 'Draft JMC 2026-01',
   474	    alt: 'Draft Joint Memorandum Circular 2026-01',
   475	  },
   476	  policyRecommendations: {
   477	    url: `${VALIDATION_IMG}/Policy%20Recommendations-Policy%20Makers-Planners-Investors.png`,
   478	    title: 'Policy Recommendations — Policy Makers, Planners, Investors',
   479	    alt: 'Policy recommendations for policy makers planners and investors',
   480	  },
   481	  corePolicyMandates: {
   482	    url: `${VALIDATION_IMG}/Policy%20recommendations-Institutional-Fiscal-Regulatory.png`,
   483	    title: 'Core Policy Mandates',
   484	    alt: 'Core policy mandates institutional fiscal regulatory',
   485	  },
   486	
   487	  // ── Section 12: Wrapping Up ───────────────────────────────────────────────
   488	  whenVisionMeetsExecution: {
   489	    url: `${ROADMAP_IMG}/When%20Vision%20Meets%20Execution.png`,
   490	    title: 'When Vision Meets Execution',
   491	    alt: 'When vision meets execution in Bangsamoro',
   492	  },
   493	  decadeAhead: {
   494	    url: `${VALIDATION_IMG}/The%20Decade%20Ahead_Bird%20App-CTA.png`,
   495	    title: 'The Decade Ahead',
   496	    alt: 'The decade ahead for Bangsamoro',
   497	  },
   498	  investInBangsamoro: {
   499	    url: `${VALIDATION_IMG}/Invest%20in%20Bangsamoro.png`,
   500	    title: 'Invest in Bangsamoro',
   501	    alt: 'Invest in Bangsamoro call to action',
   502	  },
   503	  chooseBangsamoro: {
   504	    url: `${VALIDATION_IMG}/Choose%20Bangsamoro.png`,
   505	    title: 'Choose Bangsamoro',
   506	    alt: 'Choose Bangsamoro call to action',
   507	  },
   508	
   509	  // ── Existing BEIE Images (retained for backward compatibility) ────────────
   510	  clusterOverview: {
   511	    url: `${BEIE_IMG}/5.%20Clusters.png`,
   512	    title: 'Five BEIE Clusters',
   513	    alt: 'Overview of the five BEIE clusters',
   514	  },
   515	  cluster1Stocks: {
   516	    url: `${BEIE_IMG}/12.%20Foundations%20Stocks.png`,
   517	    title: 'Cluster 1 — Foundations Stocks & Flows',
   518	    alt: 'Foundations cluster stocks and flows',
   519	  },
   520	  cluster1Loops: {
   521	    url: `${BEIE_IMG}/13.%20Foundations%20Loops.png`,
   522	    title: 'Cluster 1 — Foundations Feedback Loops',
   523	    alt: 'Foundations cluster feedback loops',
   524	  },
   525	  cluster1Provincial: {
   526	    url: `${BEIE_IMG}/14.%20Foundations%20Provincial.png`,
   527	    title: 'Cluster 1 — Provincial Variations',
   528	    alt: 'Provincial variations in the Foundations cluster',
   529	  },
   530	  cluster2Stocks: {
   531	    url: `${BEIE_IMG}/15.%20Transformers%20Stocks.png`,
   532	    title: 'Cluster 2 — Transformers Stocks & Flows',
   533	    alt: 'Transformers cluster stocks and flows',
   534	  },
   535	  cluster2Loops: {
   536	    url: `${BEIE_IMG}/16.%20Transformers%20Loops.png`,
   537	    title: 'Cluster 2 — Transformers Feedback Loops',
   538	    alt: 'Transformers cluster feedback loops',
   539	  },
   540	  cluster3Overview: {
   541	    url: `${BEIE_IMG}/17.%20Enablers%20Overview.png`,
   542	    title: 'Cluster 3 — Enablers Overview',
   543	    alt: 'Enablers cluster overview',
   544	  },
   545	  cluster4Stocks: {
   546	    url: `${BEIE_IMG}/18.%20Connectors%20Stocks.png`,
   547	    title: 'Cluster 4 — Connectors Stocks & Flows',
   548	    alt: 'Connectors cluster stocks and flows',
   549	  },
   550	  cluster4Loops: {
   551	    url: `${BEIE_IMG}/19.%20Connectors%20Loops.png`,
   552	    title: 'Cluster 4 — Connectors Feedback Loops',
   553	    alt: 'Connectors cluster feedback loops',
   554	  },
   555	  cluster5Stocks: {
   556	    url: `${BEIE_IMG}/20.%20Financiers%20Stocks.png`,
   557	    title: 'Cluster 5 — Financiers Stocks & Flows',
   558	    alt: 'Financiers cluster stocks and flows',
   559	  },
   560	  cluster5Loops: {
   561	    url: `${BEIE_IMG}/21.%20Financiers%20Loops.png`,
   562	    title: 'Cluster 5 — Financiers Feedback Loops',
   563	    alt: 'Financiers cluster feedback loops',
   564	  },
   565	  roadmapOverview: {
   566	    url: `${BEIE_IMG}/7.%20Roadmap.png`,
   567	    title: 'Investment Roadmap Overview',
   568	    alt: 'Bangsamoro Investment Roadmap overview',
   569	  },
   570	  roadmapPhases: {
   571	    url: `${BEIE_IMG}/8.%20Phasing.png`,
   572	    title: 'Investment Roadmap Phases',
   573	    alt: 'Investment roadmap phases and timeline',
   574	  },
   575	  virtuousCycle: {
   576	    url: `${BEIE_IMG}/9.%20Virtuous%20Cycle.png`,
   577	    title: 'Investment Virtuous Cycle',
   578	    alt: 'The investment virtuous cycle for Bangsamoro',
   579	  },
   580	  meadows: {
   581	    url: `${BEIE_IMG}/36.%20Meadows.png`,
   582	    title: "Meadows' Leverage Points",
   583	    alt: "Donella Meadows' hierarchy of leverage points",
   584	  },
   585	  bsc: {
   586	    url: `${BEIE_IMG}/35.%20BSC.png`,
   587	    title: 'Balanced Scorecard Perspectives',
   588	    alt: 'Balanced Scorecard strategic perspectives',
   589	  },
   590	};
   591	
   592	// ─────────────────────────────────────────────────────────────────────────────
   593	// BIRD VIDEOS REGISTRY
   594	// ─────────────────────────────────────────────────────────────────────────────
   595	
   596	export const BIRD_VIDEOS = {
   597	  // ── Section 0: Systems Thinking ───────────────────────────────────────────
   598	  systemsThinking: {
   599	    url: 'https://youtu.be/VBAHk0WYz_c?si=sbA9QhA4M791C1ET',
   600	    title: 'Systems Thinking: Moving from Checklists to Interconnected Investment Ecosystem',
   601	    description:
   602	      'Discover how the Bangsamoro Investment Roadmap (BIRD 2026–2035) turns fragmented efforts into a unified engine of growth. This video unpacks: Systems Thinking — shifting from checklists to interconnected strategies; Feedback Loops — cycles that amplify progress and stabilize change; Causal Loop Diagrams — visuals that expose traps and leverage points; and Leverage Strategies — small shifts sparking big gains in governance, infrastructure, and equity.',
   603	    embedUrl: 'https://www.youtube.com/embed/VBAHk0WYz_c',
   604	    duration: '5 min',
   605	  },
   606	
   607	  // ── Section 2: SWOT & Systems Mapping ─────────────────────────────────────
   608	  swotSystemsMapping: {
   609	    url: 'https://youtu.be/LSmBzwyX2uw',
   610	    title: 'SWOT Analysis & Systems Mapping Explained',
   611	    description:
   612	      'In this video, we break down the SWOT Analysis — examining Strengths, Weaknesses, Opportunities, and Threats — and use Systems Mapping to show how strategic investments can reshape the region. Through non-linear diagramming, we co-created narratives using tools like Causal Loop Diagrams and Systems Archetypes to reveal patterns of change and leverage points for transformation.',
   613	    embedUrl: 'https://www.youtube.com/embed/LSmBzwyX2uw',
   614	    duration: '8 min',
   615	  },
   616	
   617	  // ── Section 8: Strategic Options ──────────────────────────────────────────
   618	  strategicOptions: {
   619	    url: 'https://youtu.be/kb_snh8mo1k',
   620	    title: 'Strategic Options & Path to Growth',
   621	    description:
   622	      "Discover the strategic choices shaping Bangsamoro's Investment Roadmap 2026–2035. This video shows how well-crafted strategies and priorities can fuel inclusive growth, sustainability, and regional competitiveness in BARMM.",
   623	    embedUrl: 'https://www.youtube.com/embed/kb_snh8mo1k',
   624	    duration: '6 min',
   625	  },
   626	
   627	  // ── Section 12: Wrapping Up ───────────────────────────────────────────────
   628	  wrappingUp: {
   629	    url: 'https://youtu.be/UCi2dVUmSbE',
   630	    title: 'Bangsamoro Investment Roadmap 2026‑2035 | Southeast Asia\u2019s Hub for Ethical & Sustainable Growth',
   631	    description:
   632	      'Discover how the Bangsamoro Investment Roadmap (BIRD) 2026‑2035 positions BARMM as Southeast Asia\u2019s hub for resilient, ethical, and sustainable investments — highlighting its growth momentum, the risks ahead, and the frameworks driving transformation.',
   633	    embedUrl: 'https://www.youtube.com/embed/UCi2dVUmSbE',
   634	    duration: '4 min',
   635	  },
   636	
   637	  // ── BEIE Ecosystem Overview (existing) ────────────────────────────────────
   638	  beieEcosystem: {
   639	    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
   640	    title: 'BEIE Ecosystem Overview',
   641	    description: 'An overview of the Bangsamoro Economic and Investment Ecosystem.',
   642	    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
   643	    duration: '3 min',
   644	  },
   645	};
   646	
   647	// ─────────────────────────────────────────────────────────────────────────────
   648	// VIDEO EMBED HELPER
   649	// ─────────────────────────────────────────────────────────────────────────────
   650	
   651	export const getVideoEmbedUrl = (videoKey: keyof typeof BIRD_VIDEOS): string =>
   652	  BIRD_VIDEOS[videoKey]?.embedUrl || '';
   653	
   654	export const getVideoByKey = (videoKey: keyof typeof BIRD_VIDEOS) =>
   655	  BIRD_VIDEOS[videoKey];
   656	
   657	// ─────────────────────────────────────────────────────────────────────────────
   658	// IMAGE HELPER
   659	// ─────────────────────────────────────────────────────────────────────────────
   660	
   661	export const getImageByKey = (imageKey: keyof typeof BIRD_IMAGES) =>
   662	  BIRD_IMAGES[imageKey];
   663	