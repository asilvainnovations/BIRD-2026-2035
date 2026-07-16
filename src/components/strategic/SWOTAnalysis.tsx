import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from '@/lib/motion-shim';
import {
  Shield,
  AlertCircle,
  Lightbulb,
  Zap,
  Plus,
  Trash2,
  Sparkles,
  Loader2,
  ChevronDown,
  ChevronUp,
  Edit2,
  Check,
  X,
  Info,
  Link2,
  BrainCircuit,
  Network,
  ArrowRight,
  Target,
} from 'lucide-react';
import { SWOTItem, StrategicPlan } from '@/lib/strategicPlanStore';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

interface SWOTAnalysisProps {
  plan: StrategicPlan;
  onAddItem: (item: Omit<SWOTItem, 'id'>) => void;
  onUpdateItem: (id: string, updates: Partial<SWOTItem>) => void;
  onRemoveItem: (id: string) => void;
  onBulkAdd: (items: Omit<SWOTItem, 'id'>[]) => void;
  onNavigate?: (view: string) => void;
}

// ============================================================================
// CUSTOM TOOLTIP COMPONENT WITH FRAMER-MOTION
// ============================================================================

const Tooltip: React.FC<{ 
  children: React.ReactNode; 
  content: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}> = ({ children, content, side = 'top', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <motion.div
        onMouseEnter={() => setTimeout(() => setIsVisible(true), delay * 100)}
        onMouseLeave={() => setIsVisible(false)}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "absolute z-50 px-3 py-2.5 bg-[#022c22] text-white text-xs rounded-lg shadow-2xl backdrop-blur-sm max-w-sm",
              side === 'top' ? "bottom-full left-1/2 transform -translate-x-1/2 mb-2" : "",
              side === 'bottom' ? "top-full left-1/2 transform -translate-x-1/2 mt-2" : "",
              side === 'left' ? "right-full top-1/2 transform translate-y-1/2 mr-2" : "",
              side === 'right' ? "left-full top-1/2 transform -translate-y-1/2 ml-2" : ""
            )}
          >
            {content}
            
            {/* Tooltip arrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={`absolute ${side === 'top' ? "top-full" : side === 'bottom' ? "bottom-full" : side === 'left' ? "right-full" : "left-full"} left-1/2 transform -translate-x-1/2`}
            >
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-b-4 border-transparent"
                style={
                  side === 'top' ? { borderTopColor: '#0f172a', marginTop: '-4px' } :
                  side === 'bottom' ? { borderBottomColor: '#0f172a', marginBottom: '-4px' } :
                  side === 'left' ? { borderRightColor: '#0f172a', marginRight: '-4px' } :
                  { borderLeftColor: '#0f172a', marginLeft: '-4px' }
                }
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// SCORE DESCRIPTIONS & INSTRUCTIONS
// ============================================================================

const SCORE_DESCRIPTIONS = {
  1: {
    impact: 'Minimal effect on strategic goals',
    likelihood: 'Rarely will occur (<20% probability)',
  },
  2: {
    impact: 'Minor effect on strategic goals',
    likelihood: 'Unlikely (20-40% probability)',
  },
  3: {
    impact: 'Moderate effect on strategic goals',
    likelihood: 'Possible (40-60% probability)',
  },
  4: {
    impact: 'Significant effect on strategic goals',
    likelihood: 'Likely (60-80% probability)',
  },
  5: {
    impact: 'Major effect on strategic goals',
    likelihood: 'Almost certain (>80% probability)',
  },
};

// Impact vs Likelihood Matrix Guide
const IMPACT_LIKELIHOOD_GUIDE = {
  low: {
    label: 'Low Priority',
    description: 'Monitor but no immediate action required',
    color: 'bg-[#064e3b]/20 dark:bg-[#022c22]/60 text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b]',
  },
  medium: {
    label: 'Medium Priority',
    description: 'Track and prepare contingency plans',
    color: 'bg-amber-500/100/10 text-amber-400',
  },
  high: {
    label: 'High Priority',
    description: 'Requires active management and resource allocation',
    color: 'bg-red-500/100/10 text-red-400',
  },
};

// Rating Instructions Component
const RatingInstructions: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-4 p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border border-[#C9A84C]/20 rounded-xl"
  >
    <div className="flex items-center gap-2 mb-3">
      <Info className="w-5 h-5 text-[#C9A84C]" />
      <h3 className="font-semibold text-[#C9A84C]">How to Rate Your SWOT Variables</h3>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Impact Column */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-[#34d399]" />
          <span className="font-medium text-[#E8C560]/90 dark:text-[#ecfdf5]/90">Impact Score (1-5)</span>
        </div>
        <p className="text-sm text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b] italic">
          How much will this factor affect your organization's ability to achieve its strategic goals?
        </p>
        <ul className="text-xs space-y-1 pl-6">
          {Object.entries(SCORE_DESCRIPTIONS).map(([num, desc]) => (
            <li key={num} className="flex gap-2">
              <span className="font-bold text-[#34d399] w-4">{num}.</span>
              <span className="text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b]">{desc.impact}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Likelihood Column */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-amber-400" />
          <span className="font-medium text-[#E8C560]/90 dark:text-[#ecfdf5]/90">Likelihood Score (1-5)</span>
        </div>
        <p className="text-sm text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b] italic">
          How probable is it that this factor will occur within your planning timeframe?
        </p>
        <ul className="text-xs space-y-1 pl-6">
          {Object.entries(SCORE_DESCRIPTIONS).map(([num, desc]) => (
            <li key={num} className="flex gap-2">
              <span className="font-bold text-amber-400 w-4">{num}.</span>
              <span className="text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b]">{desc.likelihood}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Matrix Result */}
    <div className="mt-4 pt-3 border-t border-[#C9A84C]/20">
      <p className="text-sm font-medium text-[#C9A84C] mb-2">Priority Guidance:</p>
      <div className="flex flex-wrap gap-2 text-xs">
        {Object.entries(IMPACT_LIKELIHOOD_GUIDE).map(([key, value]) => (
          <span key={key} className={`px-2 py-1 rounded-full ${value.color}`}>
            {value.label}: {value.description}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

// ============================================================================
// INTERDEPENDENCY DETECTION COMPONENT
// ============================================================================

interface SWOTInterdependency {
  item1: SWOTItem;
  item2: SWOTItem;
  relationship: string;
  confidence: number;
  type: 'enables' | 'threatens' | 'mitigates' | 'exacerbates';
}

const InterdependencyPanel: React.FC<{
  swotItems: SWOTItem[];
  onSelectRelationship?: (relationship: SWOTInterdependency) => void;
  onNavigate?: (view: string) => void;
}> = ({ swotItems, onSelectRelationship, onNavigate }) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [relationships, setRelationships] = useState<SWOTInterdependency[]>([]);

  const detectInterdependencies = async () => {
    setIsDetecting(true);
    
    // Simulate AI detection (in real implementation, call API)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const detected: SWOTInterdependency[] = [];
    
    // Generate sample relationships based on categories
    strengthsForDetection(swotItems).forEach(strength => {
      opportunitiesForDetection(swotItems).forEach(opportunity => {
        if (Math.random() > 0.6) {
          detected.push({
            item1: strength,
            item2: opportunity,
            relationship: `${strength.description.substring(0, 20)}... enables...`,
            confidence: Math.floor(Math.random() * 20) + 70,
            type: 'enables',
          });
        }
      });
    });

    threatsForDetection(swotItems).forEach(threat => {
      weaknessesForDetection(swotItems).forEach(weakness => {
        if (Math.random() > 0.6) {
          detected.push({
            item1: weakness,
            item2: threat,
            relationship: `${weakness.description.substring(0, 20)}... exacerbates...`,
            confidence: Math.floor(Math.random() * 20) + 65,
            type: 'exacerbates',
          });
        }
      });
    });

    setRelationships(detected);
    setIsDetecting(false);
  };

  const clearRelationships = () => setRelationships([]);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-500/20 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Network className="w-6 h-6 text-purple-400" />
            <h3 className="font-semibold text-purple-800">SWOT Interdependency Detection</h3>
          </div>
          {relationships.length > 0 && (
            <button
              onClick={clearRelationships}
              className="text-xs text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b] hover:text-[#E8C560]/90 dark:text-[#ecfdf5]/90 underline"
            >
              Clear
            </button>
          )}
        </div>

        <p className="text-sm text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b] mb-4">
          This tool analyzes potential causal relationships between your SWOT factors to help you build a <span className="font-medium text-purple-400">Cause-Cause Diagram (CCD)</span> or identify <span className="font-medium text-purple-400">Systems Archetypes</span>.
        </p>

        <motion.button
          onClick={detectInterdependencies}
          disabled={isDetecting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all",
            isDetecting
              ? "bg-slate-300 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/30"
          )}
        >
          {isDetecting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing Relationships...
            </>
          ) : relationships.length > 0 ? (
            <>
              <BrainCircuit className="w-5 h-5" />
              Detect New Relationships
            </>
          ) : (
            <>
              <Link2 className="w-5 h-5" />
              Find Interdependencies
            </>
          )}
        </motion.button>

        {relationships.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-5 space-y-3"
          >
            <p className="text-sm font-medium text-purple-400">
              Detected {relationships.length} Relationship(s)
            </p>
            
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {relationships.map((rel, idx) => (
                <motion.div
                  key={`${rel.item1.id}-${rel.item2.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-3 bg-white dark:bg-[#022c22]/60/60 rounded-lg border border-purple-500/20 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-2">
                    <div className="flex items-center gap-1 flex-1">
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-[#059669]/10 text-[#34d399]">
                        {rel.item1.category.toUpperCase()}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#64748b]/80 dark:text-[#64748b]" />
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-[#C9A84C]/10 text-[#C9A84C]">
                        {rel.item2.category.toUpperCase()}
                      </span>
                    </div>
                    
                    <Tooltip
                      content={
                        <div className="space-y-1">
                          <p className="font-semibold text-purple-400">{rel.relationship}</p>
                          <p className="text-xs text-[#64748b]/80 dark:text-[#64748b]">Confidence: {rel.confidence}%</p>
                        </div>
                      }
                    >
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-medium cursor-help",
                        rel.type === 'enables' ? "bg-[#059669]/10 text-[#34d399]" :
                        rel.type === 'threatens' ? "bg-red-500/100/10 text-red-400" :
                        rel.type === 'mitigates' ? "bg-amber-500/100/10 text-amber-400" :
                        "bg-orange-500/10 text-orange-400"
                      )}>
                        {rel.type.charAt(0).toUpperCase() + rel.type.slice(1)}
                      </span>
                    </Tooltip>
                  </div>
                  
                  <p className="text-xs text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b] mt-2 line-clamp-2">
                    <span className="font-medium">From:</span> {rel.item1.description}
                  </p>
                  <p className="text-xs text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b] line-clamp-2">
                    <span className="font-medium">To:</span> {rel.item2.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CCD & Systems Archetype Export - WIRED TO onNavigate */}
            <div className="pt-4 border-t border-purple-500/20 flex gap-2">
              <button
                onClick={() => onNavigate?.('systems')}
                className="flex-1 px-3 py-2 bg-gradient-to-r from-[#C9A84C] to-[#B8942E] text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Network className="w-4 h-4" />
                Open CCD Builder
              </button>
              <button
                onClick={() => onNavigate?.('systems')}
                className="flex-1 px-3 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <BrainCircuit className="w-4 h-4" />
                View Archetypes
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// Helper functions for mock relationships
const strengthsForDetection = (items: SWOTItem[]): SWOTItem[] => 
  items.filter(i => i.category === 'strength');
const weaknessesForDetection = (items: SWOTItem[]): SWOTItem[] => 
  items.filter(i => i.category === 'weakness');
const opportunitiesForDetection = (items: SWOTItem[]): SWOTItem[] => 
  items.filter(i => i.category === 'opportunity');
const threatsForDetection = (items: SWOTItem[]): SWOTItem[] => 
  items.filter(i => i.category === 'threat');

// ============================================================================
// SCORE BUTTON COMPONENT
// ============================================================================

const ScoreButton: React.FC<{
  value: number;
  selectedValue: number;
  onSelect: (value: number) => void;
  type: 'impact' | 'likelihood';
}> = ({ value, selectedValue, onSelect, type }) => {
  return (
    <Tooltip
      content={
        <div className="space-y-1.5">
          <p className="font-semibold text-[#C9A84C]">
            {type === 'impact' ? 'Impact Level' : 'Likelihood Level'} {value}
          </p>
          <p className="text-xs text-[#64748b]/80 dark:text-[#64748b]">
            {type === 'impact' 
              ? SCORE_DESCRIPTIONS[value as keyof typeof SCORE_DESCRIPTIONS].impact
              : SCORE_DESCRIPTIONS[value as keyof typeof SCORE_DESCRIPTIONS].likelihood
            }
          </p>
        </div>
      }
    >
      <motion.button
        onClick={() => onSelect(value)}
        className={cn(
          "w-6 h-6 rounded-full border-2 transition-all duration-200",
          value <= selectedValue
            ? "bg-gradient-to-br from-[#C9A84C] to-[#C9A84C] border-transparent shadow-md scale-110"
            : "border-[#C9A84C]/30 dark:border-[#C9A84C]/20 hover:border-[#C9A84C]/30 hover:bg-[#064e3b]/20 dark:bg-[#022c22]/60",
          type === 'impact' ? "cursor-pointer" : "cursor-pointer"
        )}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        aria-label={`Select ${type} score of ${value}`}
      >
        {value <= selectedValue && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-xs text-white font-bold leading-none block text-center"
          >
            ✓
          </motion.span>
        )}
      </motion.button>
    </Tooltip>
  );
};

// ============================================================================
// SWOT CARD COMPONENT
// ============================================================================

const SWOTCard: React.FC<{
  item: SWOTItem;
  config: any;
  onUpdate: (updates: Partial<SWOTItem>) => void;
  onRemove: () => void;
  index: number;
}> = ({ item, config, onUpdate, onRemove, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.description);

  const priority = useMemo(() => {
    const impact = item.impactScore || 3;
    const likelihood = item.likelihoodScore || 3;
    if (impact >= 4 && likelihood >= 4) return IMPACT_LIKELIHOOD_GUIDE.high;
    if (impact >= 3 || likelihood >= 3) return IMPACT_LIKELIHOOD_GUIDE.medium;
    return IMPACT_LIKELIHOOD_GUIDE.low;
  }, [item.impactScore, item.likelihoodScore]);

  const handleSave = () => {
    onUpdate({ description: editText });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(item.description);
    setIsEditing(false);
  };

  // ✅ NEW: Resilience/Risk/Vulnerability Scoring Engine
  const calculateMetrics = () => {
    const imp = item.impactScore || 3;
    const lik = item.likelihoodScore || 3;
    
    switch (item.category) {
      case 'strength':
        return { value: (imp * lik) / 5, scale: 5, label: 'Resilience Index', type: 'resilience' as const };
      case 'opportunity':
        return { value: Math.sqrt(imp * lik), scale: 5, label: 'Resilience Index', type: 'resilience' as const };
      case 'weakness':
        return { value: imp * lik, scale: 25, label: 'Risk Score', type: 'risk' as const };
      case 'threat':
        return { value: (Math.pow(imp, 2) * lik) / 25, scale: 5, label: 'Vulnerability Index', type: 'vulnerability' as const };
      default:
        return { value: 0, scale: 5, label: 'Score', type: 'neutral' as const };
    }
  };

  const metrics = useMemo(() => calculateMetrics(), [item.impactScore, item.likelihoodScore, item.category]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}
      className={cn(
        "rounded-xl border-2 p-4 transition-all duration-300",
        config.bgColor.replace('50', '50'),
        config.borderColor.replace('-200', '-300')
      )}
    >
      {isEditing ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
        >
          <div className="flex justify-between items-start gap-2">
            <label className="text-xs font-medium text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b]">Description</label>
            <Tooltip content="Cancel editing changes">
              <motion.button
                onClick={handleCancel}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 text-[#64748b]/80 dark:text-[#64748b] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </Tooltip>
          </div>
          <motion.textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-2 text-sm border border-[#C9A84C]/30 dark:border-[#C9A84C]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C] resize-none bg-white dark:bg-[#022c22]/60/60"
            rows={3}
            autoFocus
            placeholder="Describe the SWOT factor..."
          />
          <motion.div 
            className="flex justify-end gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={handleCancel}
              className="px-3 py-1.5 text-xs font-medium text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b] bg-white dark:bg-[#022c22]/60/60 border border-[#C9A84C]/30 dark:border-[#C9A84C]/20 rounded-lg hover:bg-[#064e3b]/10 dark:bg-[#022c22] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-[#C9A84C] to-[#B8942E] rounded-lg hover:shadow-md transition-all"
            >
              Save Changes
            </button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-start justify-between gap-2 mb-3">
            <p className={cn("text-sm font-medium flex-1", config.textColor)}>
              {item.description}
            </p>
            <motion.div 
              className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <Tooltip content="Edit description">
                <motion.button
                  onClick={() => setIsEditing(true)}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1.5 text-[#64748b]/80 dark:text-[#64748b] hover:text-[#C9A84C] hover:bg-[#C9A84C]/10 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </motion.button>
              </Tooltip>
              
              <Tooltip content="Remove this item from analysis">
                <motion.button
                  onClick={onRemove}
                  whileHover={{ scale: 1.15, backgroundColor: "#fee2e2" }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1.5 text-red-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </Tooltip>
            </motion.div>
          </div>

          {/* Priority Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priority.color}`}>
              {priority.label}
            </span>
            {item.aiGenerated && (
              <Tooltip content="This item was generated by AI based on your organization context">
                <span className="ml-auto text-xs bg-purple-500/100/10 text-purple-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI Generated
                </span>
              </Tooltip>
            )}
          </div>

          <div className="flex items-center gap-4 pt-3 border-t border-[#C9A84C]/20 dark:border-[#C9A84C]/20/50">
            {/* Impact Score */}
            <Tooltip
              content={
                <div className="space-y-1">
                  <p className="font-semibold text-[#34d399]">Impact Score Guide</p>
                  <p className="text-xs text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b]">Rate how much this factor affects your strategic goals.</p>
                  <ul className="text-xs space-y-0.5">
                    {Object.entries(SCORE_DESCRIPTIONS).map(([num, desc]) => (
                      <li key={num} className="flex gap-1">
                        <span className={cn("font-bold w-3", num <= String(item.impactScore) ? "text-[#059669]" : "text-[#64748b]/80 dark:text-[#64748b]")}>
                          {num}.
                        </span>
                        <span>{desc.impact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              }
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Info className="w-3 h-3 text-[#64748b]/80 dark:text-[#64748b]" />
                  <span className="text-xs text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b] font-medium">Impact:</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <ScoreButton
                        key={n}
                        value={n}
                        selectedValue={item.impactScore || 3}
                        onSelect={(val) => onUpdate({ impactScore: val })}
                        type="impact"
                      />
                    ))}
                  </div>
                </div>
                <motion.span 
                  className={cn("text-sm font-bold w-8 text-center transition-colors", config.textColor)}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  {item.impactScore || 3}
                </motion.span>
              </div>
            </Tooltip>

            {/* Likelihood Score */}
            <Tooltip
              content={
                <div className="space-y-1">
                  <p className="font-semibold text-amber-400">Likelihood Score Guide</p>
                  <p className="text-xs text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b]">Rate the probability of this factor occurring.</p>
                  <ul className="text-xs space-y-0.5">
                    {Object.entries(SCORE_DESCRIPTIONS).map(([num, desc]) => (
                      <li key={num} className="flex gap-1">
                        <span className={cn("font-bold w-3", num <= String(item.likelihoodScore) ? "text-amber-500" : "text-[#64748b]/80 dark:text-[#64748b]")}>
                          {num}.
                        </span>
                        <span>{desc.likelihood}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              }
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Info className="w-3 h-3 text-[#64748b]/80 dark:text-[#64748b]" />
                  <span className="text-xs text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b] font-medium">Likelihood:</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <ScoreButton
                        key={n}
                        value={n}
                        selectedValue={item.likelihoodScore || 3}
                        onSelect={(val) => onUpdate({ likelihoodScore: val })}
                        type="likelihood"
                      />
                    ))}
                  </div>
                </div>
                <motion.span 
                  className={cn("text-sm font-bold w-8 text-center transition-colors", config.textColor)}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
                >
                  {item.likelihoodScore || 3}
                </motion.span>
              </div>
            </Tooltip>
          </div>

          {/* ✅ NEW: Dynamic Metric Badge (Resilience/Risk/Vulnerability) */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ delay: 0.4 }}
            className="mt-3 pt-3 border-t border-slate-100 dark:border-[#C9A84C]/20/60"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b]">{metrics.label}</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-[#064e3b]/20 dark:bg-[#022c22]/60 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((metrics.value / metrics.scale) * 100, 100)}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={cn(
                      "h-full rounded-full",
                      metrics.type === 'risk' 
                        ? metrics.value >= 16 ? "bg-red-500/100" : metrics.value >= 10 ? "bg-amber-500/100" : "bg-[#059669]"
                        : metrics.value >= 4 ? "bg-[#059669]" : metrics.value >= 2.5 ? "bg-amber-500/100" : "bg-slate-400"
                    )}
                  />
                </div>
                <span className={cn(
                  "font-bold",
                  metrics.type === 'risk' 
                    ? metrics.value >= 16 ? "text-red-400" : metrics.value >= 10 ? "text-amber-400" : "text-[#ecfdf5]/80"
                    : metrics.value >= 4 ? "text-[#34d399]" : metrics.value >= 2.5 ? "text-amber-400" : "text-[#ecfdf5]/80"
                )}>
                  {metrics.value.toFixed(1)}
                </span>
              </div>
            </div>
            <p className="text-[10px] text-[#64748b]/80 dark:text-[#64748b] mt-1">
              Scale: 1-{metrics.scale} • {metrics.type === 'risk' ? 'Higher = More Risk' : 'Higher = More Resilience'}
            </p>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

// ============================================================================
// MAIN SWOT ANALYSIS COMPONENT
// ============================================================================

const SWOTAnalysis: React.FC<SWOTAnalysisProps> = ({
  plan,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
  onBulkAdd,
  onNavigate,
}) => {
  const categoryConfig = {
    strength: {
      label: 'Strengths',
      icon: Shield,
      color: 'emerald',
      bgColor: 'bg-[#059669]/10',
      borderColor: 'border-[#059669]/20',
      textColor: 'text-[#34d399]',
      iconBg: 'bg-[#059669]',
      description: 'Internal positive attributes and resources',
    },
    weakness: {
      label: 'Weaknesses',
      icon: AlertCircle,
      color: 'red',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      textColor: 'text-red-400',
      iconBg: 'bg-red-500/100',
      description: 'Internal areas needing improvement',
    },
    opportunity: {
      label: 'Opportunities',
      icon: Lightbulb,
      color: 'blue',
      bgColor: 'bg-[#C9A84C]/10',
      borderColor: 'border-[#C9A84C]/20',
      textColor: 'text-[#C9A84C]',
      iconBg: 'bg-[#C9A84C]',
      description: 'External factors to leverage',
    },
    threat: {
      label: 'Threats',
      icon: Zap,
      color: 'amber',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      textColor: 'text-amber-400',
      iconBg: 'bg-amber-500/100',
      description: 'External risks to mitigate',
    },
  };

  const [newItems, setNewItems] = useState<Record<string, string>>({
    strength: '',
    weakness: '',
    opportunity: '',
    threat: '',
  });

  const [aiContext, setAiContext] = useState({
    organization: plan.organization,
    industry: '',
    strategicIntent: plan.strategicIntent,
    context: '',
  });

  const [showAIPanel, setShowAIPanel] = useState(false);
  const [showInterdependencyPanel, setShowInterdependencyPanel] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleAddItem = (category: SWOTItem['category']) => {
    if (!newItems[category].trim()) return;
    // ✅ FIX: Immediately add with default scores & trigger re-render
    onAddItem({
      category,
      description: newItems[category].trim(),
      impactScore: 3,
      likelihoodScore: 3,
      aiGenerated: false,
    });
    setNewItems((prev) => ({ ...prev, [category]: '' }));
  };

  // ✅ WIRED TO ai-strategy-assistant Edge Function
  const generateAISWOT = async () => {
    setIsGeneratingAI(true);
    setAiError(null);
    
    try {
      // Build SWOT context for AI prompt
      const strengths = (plan.swotItems || [])
        .filter(i => i.category === 'strength')
        .map(i => ({ description: i.description, impactScore: i.impactScore || 3, likelihoodScore: i.likelihoodScore || 3 }));
      
      const weaknesses = (plan.swotItems || [])
        .filter(i => i.category === 'weakness')
        .map(i => ({ description: i.description, impactScore: i.impactScore || 3, likelihoodScore: i.likelihoodScore || 3 }));
      
      const opportunities = (plan.swotItems || [])
        .filter(i => i.category === 'opportunity')
        .map(i => ({ description: i.description, impactScore: i.impactScore || 3, likelihoodScore: i.likelihoodScore || 3 }));
      
      const threats = (plan.swotItems || [])
        .filter(i => i.category === 'threat')
        .map(i => ({ description: i.description, impactScore: i.impactScore || 3, likelihoodScore: i.likelihoodScore || 3 }));

      // Invoke the dedicated AI Strategist Edge Function
      const { data, error } = await supabase.functions.invoke('ai-strategy-assistant', {
        body: {
          action: 'ai_generate_swot',
          data: {
            // SWOT factors with scores
            strengths,
            weaknesses,
            opportunities,
            threats,
            // Strategic context
            organization: aiContext.organization,
            industry: aiContext.industry,
            strategicIntent: aiContext.strategicIntent,
            additionalContext: aiContext.context,
            // Scoring model hint for resilience/risk calculations
            scoringModel: {
              strengths: 'RI = (Impact × Likelihood) / 5',
              opportunities: 'RI = √(Impact × Likelihood)',
              weaknesses: 'Risk = Impact × Likelihood',
              threats: 'VI = (Impact² × Likelihood) / 25'
            }
          }
        }
      });

      if (error) throw new Error(error.message || 'Failed to generate SWOT analysis');
      if (!data?.success || !data?.data) throw new Error('Invalid response from AI service');

      // Parse and add generated SWOT items
      const generatedItems: Omit<SWOTItem, 'id'>[] = [];
      
      ['strength', 'weakness', 'opportunity', 'threat'].forEach(category => {
        const items = data.data[category] || [];
        items.forEach((item: any) => {
          generatedItems.push({
            category: category as SWOTItem['category'],
            description: item.description || item.title || 'Generated item',
            impactScore: item.impactScore || 3,
            likelihoodScore: item.likelihoodScore || 3,
            aiGenerated: true
          });
        });
      });

      if (generatedItems.length > 0) {
        onBulkAdd(generatedItems);
        setShowAIPanel(false);
      } else {
        setAiError('No SWOT items were generated. Please try again with more context.');
      }

    } catch (err) {
      console.error('AI SWOT generation error:', err);
      setAiError(err instanceof Error ? err.message : 'An unexpected error occurred during AI generation');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const getItemsByCategory = (category: SWOTItem['category']) =>
    plan.swotItems.filter((item) => item.category === category);

  const allSWOTItems = useMemo(() => plan.swotItems, [plan.swotItems]);

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#E8C560] dark:text-[#ecfdf5]">SWOT Analysis</h1>
          <p className="text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b]">Structured diagnostics for comprehensive environmental analysis</p>
        </div>
        
        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => setShowInterdependencyPanel(!showInterdependencyPanel)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
              showInterdependencyPanel
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25"
                : "bg-[#064e3b]/20 dark:bg-[#022c22]/60 text-[#E8C560]/90 dark:text-[#ecfdf5]/90 hover:bg-slate-200"
            )}
          >
            <Link2 className="w-4 h-4" />
            Find Relationships
            {showInterdependencyPanel ? (
              <motion.div animate={{ rotate: 180 }}>
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </motion.button>

          <motion.button
            onClick={() => setShowAIPanel(!showAIPanel)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#065f46] to-[#4c1d95] text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            AI Generator
            {showAIPanel ? (
              <motion.div animate={{ rotate: 180 }}>
                <ChevronUp className="w-4 h-4" />
              </motion.div>
            ) : (
              <ChevronUp className="w-4 h-4" />
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* AI Generation Panel */}
      <AnimatePresence>
        {showAIPanel && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-500/20 rounded-xl p-6">
              <h3 className="font-semibold text-purple-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                AI-Powered SWOT Generation
              </h3>
              <p className="text-sm text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b] mb-4">
                Let AI analyze your organizational context and generate relevant SWOT factors automatically.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-[#E8C560]/90 dark:text-[#ecfdf5]/90 mb-1">Organization Name</label>
                  <input
                    type="text"
                    value={aiContext.organization}
                    onChange={(e) => setAiContext((prev) => ({ ...prev, organization: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#C9A84C]/30 dark:border-[#C9A84C]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., TechForward Inc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#E8C560]/90 dark:text-[#ecfdf5]/90 mb-1">Industry/Sector</label>
                  <input
                    type="text"
                    value={aiContext.industry}
                    onChange={(e) => setAiContext((prev) => ({ ...prev, industry: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#C9A84C]/30 dark:border-[#C9A84C]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., Technology Consulting"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#E8C560]/90 dark:text-[#ecfdf5]/90 mb-1">Strategic Intent</label>
                  <input
                    type="text"
                    value={aiContext.strategicIntent}
                    onChange={(e) => setAiContext((prev) => ({ ...prev, strategicIntent: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#C9A84C]/30 dark:border-[#C9A84C]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., Achieve market leadership in digital transformation"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#E8C560]/90 dark:text-[#ecfdf5]/90 mb-1">Additional Context</label>
                  <textarea
                    value={aiContext.context}
                    onChange={(e) => setAiContext((prev) => ({ ...prev, context: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#C9A84C]/30 dark:border-[#C9A84C]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    rows={3}
                    placeholder="Any additional context about your organization, market position, recent changes, etc."
                  />
                </div>
              </div>
              <motion.button
                onClick={generateAISWOT}
                disabled={isGeneratingAI}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-lg font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isGeneratingAI ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating Analysis...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate SWOT Analysis
                  </>
                )}
              </motion.button>
              {aiError && <p className="text-red-400 text-xs mt-2 text-center">{aiError}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rating Instructions */}
      <RatingInstructions />

      {/* Interdependency Panel */}
      <AnimatePresence>
        {showInterdependencyPanel && (
          <InterdependencyPanel swotItems={allSWOTItems} onNavigate={onNavigate} />
        )}
      </AnimatePresence>

      {/* SWOT Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {(Object.entries(categoryConfig) as [SWOTItem['category'], typeof categoryConfig.strength][]).map(
          ([category, config], index) => {
            const Icon = config.icon;
            const items = getItemsByCategory(category);

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className={cn(
                  "bg-white dark:bg-[#022c22]/60/60 rounded-xl border overflow-hidden",
                  config.borderColor.replace('-200', '-300')
                )}
              >
                <div className={cn(config.bgColor, "px-4 py-3 flex items-center gap-3 border-b", config.borderColor)}>
                  <div className={cn(config.iconBg, "p-2 rounded-lg")}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className={cn("font-semibold", config.textColor)}>{config.label}</h3>
                    <p className="text-xs text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b]">{config.description}</p>
                  </div>
                  <motion.span 
                    className={cn(config.bgColor, config.textColor, "px-2 py-1 rounded-full text-sm font-medium")}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    {items.length}
                  </motion.span>
                </div>

                <div className="p-4 space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto">
                  {items.map((item, itemIndex) => (
                    <SWOTCard
                      key={item.id}
                      item={item}
                      config={config}
                      onUpdate={(updates) => onUpdateItem(item.id, updates)}
                      onRemove={() => onRemoveItem(item.id)}
                      index={itemIndex}
                    />
                  ))}

                  {/* Add New Item */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={newItems[category]}
                      onChange={(e) => setNewItems((prev) => ({ ...prev, [category]: e.target.value }))}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddItem(category)}
                      placeholder={`Add ${config.label.toLowerCase().slice(0, -1)}...`}
                      className="flex-1 px-3 py-2 text-sm border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
                    />
                    <motion.button
                      onClick={() => handleAddItem(category)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      disabled={!newItems[category].trim()}
                      className={cn(
                        "p-2 rounded-lg transition-all",
                        config.iconBg,
                        "text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                      )}
                    >
                      <Plus className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            );
          }
        )}
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-[#C9A84C]/20 dark:border-[#C9A84C]/20"
      >
        <h3 className="font-semibold text-[#E8C560] dark:text-[#ecfdf5] mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b]" />
          Analysis Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(Object.entries(categoryConfig) as [SWOTItem['category'], typeof categoryConfig.strength][]).map(
            ([category, config]) => {
              const items = getItemsByCategory(category);
              const avgImpact = items.length > 0
                ? items.reduce((sum, i) => sum + (i.impactScore || 0), 0) / items.length
                : 0;
              const avgLikelihood = items.length > 0
                ? items.reduce((sum, i) => sum + (i.likelihoodScore || 0), 0) / items.length
                : 0;

              return (
                <motion.div
                  key={category}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white dark:bg-[#022c22]/60/60 rounded-lg p-4 border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={cn(config.iconBg, "p-1.5 rounded")}>
                      <config.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-[#E8C560]/90 dark:text-[#ecfdf5]/90">{config.label}</span>
                  </div>
                  <motion.p 
                    className="text-2xl font-bold text-[#E8C560] dark:text-[#ecfdf5]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                  >
                    {items.length}
                  </motion.p>
                  <p className="text-xs text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b]">
                    Avg. Impact: <span className="font-medium">{avgImpact.toFixed(1)}</span> · 
                    Likelihood: <span className="font-medium">{avgLikelihood.toFixed(1)}</span>
                  </p>
                </motion.div>
              );
            }
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SWOTAnalysis;
