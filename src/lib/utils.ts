import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { generateId } from './strategicPlanStore';
import type { UserInfo, StrategicPlan, SWOTItem, StrategicOption, BSCObjective, PAP, ActionFrequency } from './strategicPlanStore';
import type { PlanTemplate } from './templateData';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ============================================================================
// BIRD FRAMEWORK MATHEMATICAL FORMULAS
// ============================================================================
export const calculateStrengthRI = (impact: number, likelihood: number): number => {
  return Number(((impact * likelihood) / 5).toFixed(2));
};

export const calculateOpportunityRI = (impact: number, likelihood: number): number => {
  return Number(Math.sqrt(impact * likelihood).toFixed(2));
};

export const calculateWeaknessRisk = (impact: number, likelihood: number): number => {
  return Number((impact * likelihood).toFixed(2));
};

export const calculateThreatVI = (impact: number, likelihood: number): number => {
  return Number(((Math.pow(impact, 2) * likelihood) / 25).toFixed(2));
};

export const calculateSWOTMetric = (
  category: 'strength' | 'weakness' | 'opportunity' | 'threat',
  impact: number,
  likelihood: number
): number => {
  switch (category) {
    case 'strength': return calculateStrengthRI(impact, likelihood);
    case 'opportunity': return calculateOpportunityRI(impact, likelihood);
    case 'weakness': return calculateWeaknessRisk(impact, likelihood);
    case 'threat': return calculateThreatVI(impact, likelihood);
    default: return 0;
  }
};

// ============================================================================
// GENERAL UTILITIES & TEMPLATE CONVERTER
// ============================================================================

/** Normalize free-form template frequency strings to the store's ActionFrequency. */
const ACTION_FREQUENCIES: readonly string[] = ['daily', 'weekly', 'monthly', 'quarterly', 'annually'];
const toActionFrequency = (frequency: string): ActionFrequency =>
  ACTION_FREQUENCIES.includes(frequency) ? (frequency as ActionFrequency) : 'quarterly';

export const convertTemplateToPlan = (template: PlanTemplate, userInfo: UserInfo): StrategicPlan => {
  const now = new Date().toISOString();
  const planData = template.plan_data;

  const swotItems: SWOTItem[] = planData.swotItems.map(item => ({
    id: generateId(),
    category: item.category,
    description: item.description,
    impactScore: item.impactScore,
    likelihoodScore: item.likelihoodScore,
    aiGenerated: false,
    createdBy: userInfo.id,
    createdByEmail: userInfo.email,
    createdByName: userInfo.name,
    createdAt: now,
  }));

  const strategicOptions: StrategicOption[] = planData.strategicOptions.map(opt => ({
    id: generateId(),
    optionType: opt.optionType,
    title: opt.title,
    description: opt.description,
    priorityScore: opt.priorityScore,
    feasibilityScore: opt.feasibilityScore,
    selected: opt.selected,
    createdBy: userInfo.id,
    createdByEmail: userInfo.email,
    createdByName: userInfo.name,
    createdAt: now,
  }));

  const objectives: BSCObjective[] = planData.objectives.map(obj => {
    const objId = generateId();
    return {
      id: objId,
      perspective: obj.perspective,
      objective: obj.objective,
      description: obj.description,
      weight: obj.weight,
      createdBy: userInfo.id,
      createdByName: userInfo.name,
      createdAt: now,
      kpis: obj.kpis.map(kpi => ({
        id: generateId(),
        objectiveId: objId, 
        name: kpi.name,
        description: kpi.description,
        baselineValue: kpi.baselineValue,
        targetValue: kpi.targetValue,
        currentValue: kpi.currentValue,
        unit: kpi.unit,
        frequency: toActionFrequency(kpi.frequency),
        owner: userInfo.id,
        ownerName: userInfo.name,
        ownerEmail: userInfo.email,
        status: kpi.status,
      }))
    };
  });

  const paps: PAP[] = (template.paps || []).map(pap => ({
    id: generateId(),
    papType: pap.papType,
    name: pap.name,
    description: pap.description,
    owner: userInfo.id,
    ownerName: userInfo.name,
    ownerEmail: userInfo.email,
    budget: pap.budget,
    spent: 0,
    startDate: pap.startDate,
    endDate: pap.endDate,
    progress: 0,
    status: 'planned' as const,
    createdBy: userInfo.id,
    createdByName: userInfo.name,
    createdAt: now,
  }));

  return {
    id: generateId(),
    name: planData.name,
    organization: planData.organization,
    vision: planData.vision,
    mission: planData.mission,
    strategicIntent: planData.strategicIntent,
    planningPeriodStart: template.planningPeriodStart || '2026-01-01',
    planningPeriodEnd: template.planningPeriodEnd || '2035-12-31',
    status: 'draft' as const,
    swotItems,
    strategicOptions,
    objectives,
    paps,
    createdBy: userInfo.id,
    createdByEmail: userInfo.email,
    createdByName: userInfo.name,
    createdAt: now,
    updatedBy: userInfo.id,
    updatedByEmail: userInfo.email,
    updatedByName: userInfo.name,
    updatedAt: now,
    contributors: [userInfo.id],
    version: 1,
    custom_share_url: undefined,
    public_access: 'none' as const,
    cldSnapshots: [],
    appliedArchetypes: [],
  };
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'on-track':
    case 'completed':
      return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    case 'at-risk':
    case 'in-progress':
      return 'text-amber-600 bg-amber-50 border-amber-200';
    case 'delayed':
      return 'text-rose-600 bg-rose-50 border-rose-200';
    default:
      return 'text-slate-600 bg-slate-50 border-slate-200';
  }
};