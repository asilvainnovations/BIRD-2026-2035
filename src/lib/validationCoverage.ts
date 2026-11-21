/**
 * How BIRD 2026–2035 was validated, by province — one wording for every module.
 *
 * The online Validation Survey (n = 76, 3–20 August 2026) is closed. It drew no
 * respondents from Basilan or Tawi-Tawi; both provinces were validated in person.
 * Sources: Report Ch 1, Stages 2–3; docs/DATA_REGISTER.md; tawi-tawi-validation-workshop.html.
 */
export const PROVINCIAL_VALIDATION = [
  { province: 'Maguindanao del Norte, Maguindanao del Sur, SGA', date: '24 March 2026', place: 'Cotabato City' },
  { province: 'Lanao del Sur', date: '12 May 2026', place: 'Marawi City' },
  { province: 'Basilan', date: '20 June 2026', place: 'Isabela City (outside BARMM); MTIT Basilan Provincial Office consultative workshop' },
  { province: 'Tawi-Tawi', date: '28 October 2026', place: 'Bongao' },
] as const;

/** Mainland share of the online sample: Cotabato City 27 + Maguindanao del Norte 22 = 49 of 76. */
export const MAINLAND_SHARE = '64%';

export const ISLAND_COVERAGE =
  'The online survey drew no respondents from Basilan or Tawi-Tawi; both provinces were validated in person ' +
  'at provincial workshops: Basilan at a consultative workshop in Isabela City (20 June 2026), which accepted all data and insights in its outlook, ' +
  'and Tawi-Tawi at a provincial validation in Bongao (28 October 2026).';
