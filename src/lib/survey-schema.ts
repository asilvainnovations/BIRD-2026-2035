import { z } from "zod";

// Helper for 1-5 Likert scales
const scale1to5 = z.enum(["1", "2", "3", "4", "5"], {
  errorMap: () => ({ message: "Please select a rating to proceed." }),
});

// Helper for 1-4 scales
const scale1to4 = z.enum(["1", "2", "3", "4"], {
  errorMap: () => ({ message: "Please select a rating to proceed." }),
});

// Helper for Checkbox arrays (requires at least 1 selection)
const checkboxArray = z.array(z.string()).min(1, "Please select at least one option.");

export const surveySchema = z.object({
  // --- SECTION 1: BEIE Framework ---
  q1_1: scale1to5, // Understanding
  q1_2: scale1to5, // Relevance

  // --- SECTION 2: Moral Governance ---
  q2_1: scale1to5, // Importance
  q2_2: scale1to5, // Implementation effectiveness

  // --- SECTION 3: Foundations ---
  q3_1: checkboxArray, // Priority areas (checkboxes)
  q3_2: scale1to5,     // Feasibility of post-harvest target

  // --- SECTION 4: Transformers ---
  q4_1: z.enum(["cert", "recognition", "infra", "skills"], {
    errorMap: () => ({ message: "Please identify the most critical barrier." }),
  }),
  q4_2: scale1to5, // Halal Park effectiveness

  // --- SECTION 5: Enablers ---
  q5_1: z.array(z.string()).min(1, "Please select at least one enabler investment."),
  q5_2: scale1to5, // Broadband realism

  // --- SECTION 6: Connectors ---
  q6_1: z.array(z.string()).min(1, "Please select at least one export market."),
  q6_2: scale1to5, // BIMP-EAGA importance

  // --- SECTION 7: Financiers ---
  q7_1: scale1to5, // Islamic finance criticality
  q7_2: checkboxArray, // Financial instruments

  // --- SECTION 8: Strategic Options ---
  q8_1: z.enum(["heds", "gems", "ifes", "ieds"], {
    errorMap: () => ({ message: "Please select a strategic option." }),
  }),
  q8_2: scale1to4, // Sequencing rating
  q8_3: z.string().optional(), // Open comments

  // --- SECTIONS 9 & 10: Budget & Targets ---
  q9_1: scale1to5,  // Budget realism
  q10_1: scale1to5, // Target ambition

  // --- SECTIONS 11 & 12: Equity & Climate ---
  q11_1: scale1to5, // Affirmative policy
  q12_1: scale1to5, // Green economy priority

  // --- SECTION 13: Policy ---
  q13_1: checkboxArray, // Priority legislation

  // --- DEMOGRAPHICS (Section 14) ---
  name: z.string().min(1, "Full name is required."),
  email: z.string().email("Please enter a valid email address."),
  organization: z.string().min(1, "Organization is required."),
  position: z.string().min(1, "Position/Title is required."),
  sector: z.string().min(1, "Please select your sector."),
  province: z.string().min(1, "Please select your province."),
});

// Export the inferred TypeScript type for use in our React components
export type SurveySchemaType = z.infer<typeof surveySchema>;
