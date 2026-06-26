import React, { useMemo, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from '@/lib/motion-shim';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Target,
  DollarSign,
  Users,
  Cog,
  GraduationCap,
  ArrowUpRight,
  ArrowDownRight,
  FolderKanban,
  Info,
  Bot,
  X,
  Send,
  Sparkles,
  Globe,
  ChevronDown,
  MessageSquare,
  Loader2,
  ExternalLink,
  BookOpen,
  GitBranch,
  BrainCircuit,
  Layers,
} from 'lucide-react';
import { StrategicPlan } from '@/lib/strategicPlanStore';

// ─── Constants ────────────────────────────────────────────────────────────────
const PLATFORM_LOGO =
  'https://paibpwwszlfpsyytdnal.databasepad.com/storage/v1/object/public/pending-tasks/public/ASilva%20Innovations%20Logo.png';

const SYNC_API_URL =
  'https://paibpwwszlfpsyytdnal.databasepad.com/functions/v1/strategic-planner-sync';

// ─── BIRD 2026-2035 Data (Single source of truth: src/data/bird/*) ────────────
import { PARETO_KPIS } from '@/data/bird/kpis';
import { BSC_LEVERAGE_POINTS as BSC_POINTS } from '@/data/bird/kpis';
import { ACTION_PLAN_2026 as PRIORITY_ACTIONS, ACTION_SUMMARY } from '@/data/bird/actions';
import { CAUSAL_LOOPS as FEEDBACK_LOOPS } from '@/data/bird/clds';
import { PHASES } from '@/data/bird/phases';


// ─── Types ────────────────────────────────────────────────────────────────────
interface MELDashboardProps {
  plan: StrategicPlan;
  onNavigate?: (view: string) => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// ─── Utility Components ───────────────────────────────────────────────────────
const Tooltip: React.FC<{ children: React.ReactNode; content: string }> = ({ children, content }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  return (
    <div className="relative inline-flex">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help"
      >
        {children}
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-max max-w-xs px-3 py-2 bg-slate-900 text-white text-xs rounded-lg shadow-xl"
          >
            {content}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CircularProgress = ({ progress, color }: { progress: number, color: string }) => {
  const radius = 31;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circumference * progress) / 100;
  const strokeColor = color === 'gold' ? '#C9A84C' : color === 'blue' ? '#3b82f6' : '#10b981';
  
  return (
    <div className="relative w-[76px] h-[76px] mx-auto mb-3">
      <svg className="transform -rotate-90" width="76" height="76" viewBox="0 0 76 76">
        <circle cx="38" cy="38" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
        <motion.circle 
          cx="38" cy="38" r={radius} fill="none" stroke={strokeColor} strokeWidth="5" strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[#C9A84C] font-bold text-sm" style={{ fontFamily: "'Cinzel', serif" }}>{progress}%</span>
        <span className="text-[0.6rem] text-[rgba(167,243,208,0.6)]">of target</span>
      </div>
    </div>
  );
};

const PriorityBadge = ({ priority }: { priority: string }) => {
  const colors: Record<string, string> = {
    critical: 'bg-[rgba(239,68,68,0.12)] text-[#ef4444] border-[rgba(239,68,68,0.3)]',
    high: 'bg-[rgba(245,158,11,0.12)] text-[#f59e0b] border-[rgba(245,158,11,0.3)]',
    medium: 'bg-[rgba(59,130,246,0.12)] text-[#93c5fd] border-[rgba(59,130,246,0.3)]',
  };
  return (
    <span className={`inline-flex items-center gap-1 text-[0.68rem] font-bold px-2 py-0.5 rounded border ${colors[priority]}`}>
      ● {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    'In Progress': 'bg-[rgba(59,130,246,0.12)] text-[#93c5fd] border-[rgba(59,130,246,0.3)]',
    'Drafting': 'bg-[rgba(59,130,246,0.12)] text-[#93c5fd] border-[rgba(59,130,246,0.3)]',
    'Development': 'bg-[rgba(59,130,246,0.12)] text-[#93c5fd] border-[rgba(59,130,246,0.3)]',
    'Pre-Dev': 'bg-[rgba(59,130,246,0.12)] text-[#93c5fd] border-[rgba(59,130,246,0.3)]',
    'Scoping': 'bg-[rgba(59,130,246,0.12)] text-[#93c5fd] border-[rgba(59,130,246,0.3)]',
    'Planned': 'bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.5)] border-[rgba(255,255,255,0.1)]',
  };
  const colorClass = colors[status] || colors['Planned'];
  return (
    <span className={`inline-flex items-center gap-1.5 text-[0.68rem] font-semibold px-2 py-0.5 rounded border ${colorClass}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
      {status}
    </span>
  );
};

const CircularAIIcon: React.FC<{ size?: number; className?: string }> = ({ 
  size = 36, 
  className = '' 
}) => (
  <div
    className={`relative inline-flex items-center justify-center rounded-full overflow-hidden shadow-lg ${className}`}
    style={{ width: size, height: size }}
  >
    <img
      src={PLATFORM_LOGO}
      alt="AI Strategist"
      className="w-full h-full object-cover"
      onError={(e) => {
        const target = e.currentTarget;
        target.style.display = 'none';
        const parent = target.parentElement;
        if (parent) {
          parent.innerHTML = `<div class="text-xs font-bold flex items-center justify-center" style="width: ${size}px; height: ${size}px;">AI</div>`;
        }
      }}
      style={{ borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)' }}
    />
  </div>
);

// ─── AI Strategist System Prompt ──────────────────────────────────────────────
const buildSystemPrompt = () => `
You are an elite AI Investment Strategist embedded in the BARMM BIRD 2026–2035 Strategic MEL Dashboard. 
You have deep expertise in Systems Thinking, the Bangsamoro Economic and Investment Ecosystem (BEIE), and the Integrated Ecosystem Development Strategy (IEDS).

**CURRENT DASHBOARD CONTEXT:**
- Vision: The Emerging Bangsamoro: A Hub for Resilient and Ethical Growth
- Total Roadmap Budget: ₱55B (Phase 1: ₱15B, Phase 2: ₱20B, Phase 3: ₱20B)
- Pareto KPIs: 6 Critical Targets (Investment Approvals, Exports, Halal Firms, Islamic Finance, Electrification, Broadband)
- Feedback Loops: R1 (Investment-Development), R2 (Governance-Confidence), B1 (Growth-Constraints), B2 (Security-Tensions)
- Key Archetypes: Limits to Growth, Fixes that Fail, Tragedy of the Commons

**RESPONSE STANDARDS:**
- Professional strategist tone grounded in BARMM data.
- Reference specific panels (e.g., Panel A KPIs, Panel C Actions, Panel D Loops).
- Use structured formatting: bold headers, bullet lists.
`;

// ─── AI Strategist Chat Panel ─────────────────────────────────────────────────
const AIStrategistChat: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'assistant',
      content: `Hello! I'm your **AI Strategist** for the **BARMM BIRD 2026–2035 Roadmap**.\n\nI bring expertise in:\n\n🔍 **Systems Thinking**\n• Feedback loop detection (R1/R2/B1/B2)\n• Meadows Leverage Points (LP1-LP5)\n• System Archetypes (Limits to Growth, Fixes that Fail)\n\n💼 **Strategic Execution**\n• Panel A: 6 Pareto KPIs monitoring\n• Panel C: Priority Action Board tracking\n• Panel E: Phase Progress (₱55B Roadmap)\n\n**Current Phase:** Foundation Building (2026–2028)\n**Active Focus:** BHB Operationalisation & Forestry Code\n\nWhat would you like to explore?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'Analyze the B1 Growth-Resource Constraints loop',
    'How does LP1 address the "Fixes that Fail" archetype?',
    'What is the status of the ₱55B budget execution?',
    'Explain the R2 Governance-Investor Confidence cycle',
    'What are the critical actions for Q2 2026?',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const conversationHistory = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch(SYNC_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'ai_strategist_chat',
          systemPrompt: buildSystemPrompt(),
          messages: conversationHistory,
        }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();

      const assistantContent = data?.reply || data?.message || data?.content || 'I received your message but could not parse the response.';

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: assistantContent,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '**Connection Issue Detected**\n\nI encountered a temporary issue connecting to the strategy engine. Please verify your connection and try again.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, i) => {
      if (line.startsWith('• ') || line.startsWith('- ')) return <li key={i} className="ml-4 list-disc text-sm">{line.slice(2)}</li>;
      if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-bold text-sm mt-2">{line.slice(2, -2)}</p>;
      if (line === '') return <div key={i} className="h-2" />;
      return <p key={i} className="text-sm leading-relaxed">{line}</p>;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.95 }}
      transition={{ type: 'spring', damping: 24, stiffness: 260 }}
      className="fixed right-0 top-0 h-full w-full max-w-md z-50 flex flex-col shadow-2xl bg-[#022c22] border-l border-[rgba(201,168,76,0.32)]"
    >
      <div className="flex items-center gap-3 px-5 py-4 border-b border-[rgba(201,168,76,0.32)] bg-[rgba(6,78,59,0.4)]">
        <CircularAIIcon size={36} className="shadow-lg shadow-[#C9A84C]/30" />
        <div className="flex-1 min-w-0">
          <p className="font-bold text-[#ecfdf5] text-sm truncate" style={{ fontFamily: "'Cinzel', serif" }}>AI Investment Strategist</p>
          <p className="text-xs text-[#C9A84C] flex items-center gap-1 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse inline-block" />
            BIRD 2026–2035 · Live Data
          </p>
        </div>
        <button onClick={onClose} className="ml-auto p-1.5 rounded-lg hover:bg-white/10 text-[#ecfdf5]/60 hover:text-white transition">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[rgba(2,44,34,0.5)]" style={{ scrollbarWidth: 'thin' }}>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && <div className="mr-2 flex-shrink-0 mt-1"><CircularAIIcon size={28} /></div>}
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
              msg.role === 'user'
                ? 'bg-gradient-to-br from-[#C9A84C] to-[#8B6C28] text-[#022c22] rounded-br-sm'
                : 'bg-[rgba(6,78,59,0.6)] text-[#ecfdf5] border border-[rgba(201,168,76,0.32)] rounded-bl-sm'
            }`}>
              {msg.role === 'assistant' ? <div className="space-y-0.5">{renderContent(msg.content)}</div> : <p className="text-sm">{msg.content}</p>}
              <p className={`text-xs mt-2 ${msg.role === 'user' ? 'text-[#022c22]/60' : 'text-[#ecfdf5]/40'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2">
            <CircularAIIcon size={28} />
            <div className="bg-[rgba(6,78,59,0.6)] border border-[rgba(201,168,76,0.32)] rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 text-[#C9A84C] animate-spin" />
              <span className="text-xs text-[#ecfdf5]/60">Analyzing strategy data…</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && (
        <div className="px-4 pb-3 bg-[rgba(2,44,34,0.5)]">
          <p className="text-xs text-[#C9A84C] mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {suggestedPrompts.map((p, i) => (
              <button key={i} onClick={() => sendMessage(p)} className="text-xs px-3 py-1.5 rounded-full bg-[rgba(6,78,59,0.6)] border border-[rgba(201,168,76,0.32)] text-[#ecfdf5]/80 hover:bg-[rgba(201,168,76,0.15)] hover:text-[#C9A84C] transition">
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="px-4 pb-4 pt-2 border-t border-[rgba(201,168,76,0.32)] bg-[#022c22]">
        <div className="flex gap-2 items-end bg-[rgba(6,78,59,0.4)] border border-[rgba(201,168,76,0.32)] rounded-2xl px-4 py-3 focus-within:border-[#C9A84C] transition">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about systems thinking, BARMM strategy…"
            rows={1}
            className="flex-1 bg-transparent text-sm text-[#ecfdf5] placeholder-[#ecfdf5]/40 resize-none focus:outline-none leading-relaxed"
            style={{ maxHeight: '100px' }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            className="p-1.5 rounded-xl bg-gradient-to-br from-[#C9A84C] to-[#8B6C28] text-[#022c22] disabled:opacity-40 hover:shadow-lg hover:shadow-[#C9A84C]/30 transition flex-shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main MEL Dashboard ──────────────────────────────────────────────────────
const MELDashboard: React.FC<MELDashboardProps> = ({ onNavigate }) => {
  const [showAIChat, setShowAIChat] = useState(false);
  const [actionFilter, setActionFilter] = useState('all');

  const filteredActions = useMemo(() => {
    return PRIORITY_ACTIONS.filter(a => {
      if (actionFilter === 'all') return true;
      if (actionFilter === 'q2') return a.due.includes('Q2');
      if (actionFilter === 'q4') return a.due.includes('Q4');
      return a.priority === actionFilter;
    });
  }, [actionFilter]);

  const summaryCounts = useMemo(() => {
    return {
      critical: PRIORITY_ACTIONS.filter(a => a.priority === 'critical').length,
      high: PRIORITY_ACTIONS.filter(a => a.priority === 'high').length,
      q2: PRIORITY_ACTIONS.filter(a => a.due.includes('Q2')).length,
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#011a12] via-[#022c22] to-[#0a1628] text-[#ecfdf5]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <header className="max-w-[1400px] mx-auto px-4 pt-12 pb-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent rounded-full" />
        <div className="inline-block bg-[rgba(201,168,76,0.10)] border border-[rgba(201,168,76,0.55)] text-[#C9A84C] px-4 py-1 rounded-full text-[0.68rem] font-bold tracking-widest uppercase mb-4">
          Strategic MEL Dashboard · Phase 1: Foundation Building
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#7a5c1e] via-[#E8C560] to-[#7a5c1e] bg-clip-text text-transparent leading-tight mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
          The Emerging Bangsamoro
        </h1>
        <p className="text-[#ecfdf5]/60 max-w-2xl leading-relaxed text-sm md:text-base">
          Monitoring, Evaluation & Learning — 2026 Priority Actions & 2035 Investment Targets. Applying the <strong className="text-[#C9A84C]">Pareto Principle</strong> to surface the vital few metrics that drive 80% of strategic impact, aligned with the BIRD 2026–2035 Roadmap.
        </p>
        <div className="flex flex-wrap items-center gap-4 mt-6">
          <div className="text-xs text-[#ecfdf5]/45 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Live MEL · {new Date().toLocaleDateString('en-PH', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="text-xs bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.32)] rounded px-3 py-1.5 text-[#C9A84C] flex items-center gap-1.5">
            <Target className="w-3 h-3" />
            Pareto Focus: 6 Critical KPIs · 6 Priority Actions · ₱55B Total Roadmap Budget
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 pb-20 flex flex-col gap-10">
        
        {/* MEL Legend */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex flex-wrap gap-4 p-4 bg-[rgba(2,44,34,0.4)] border border-[rgba(201,168,76,0.32)] rounded-lg"
        >
          <div className="flex items-center gap-2 text-xs text-[#d1fae5]/70">
            <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]" /> On Track
          </div>
          <div className="flex items-center gap-2 text-xs text-[#d1fae5]/70">
            <div className="w-2.5 h-2.5 rounded-full bg-[#C9A84C]" /> Building / In Progress
          </div>
          <div className="flex items-center gap-2 text-xs text-[#d1fae5]/70">
            <div className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" /> Watch / Early Stage
          </div>
          <div className="flex items-center gap-2 text-xs text-[#d1fae5]/70">
            <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" /> At Risk
          </div>
          <div className="flex items-center gap-2 text-xs text-[#d1fae5]/70">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" /> Critical / Behind
          </div>
          <div className="ml-auto text-[0.7rem] text-[#ecfdf5]/35">
            Baselines: 2024 PSA / BBOI / MTIT. Targets: BIRD 2026-2035 Roadmap.
          </div>
        </motion.div>

        {/* Panel A: Key Investment Targets */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="bg-[rgba(6,78,59,0.15)] border border-[rgba(201,168,76,0.32)] rounded-2xl p-6 md:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7a5c1e] via-[#E8C560] to-[#7a5c1e]" />
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div>
              <span className="text-[0.68rem] font-bold tracking-widest uppercase text-[#C9A84C] block mb-1">Panel A · Pareto Vital Few</span>
              <h2 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>Key Investment Targets — 2035 Vision</h2>
              <div className="w-10 h-1 bg-gradient-to-r from-[#7a5c1e] via-[#E8C560] to-[#7a5c1e] rounded-full mt-2" />
            </div>
            <span className="text-xs text-[#a7f3d0]/70 bg-[rgba(6,78,59,0.4)] border border-[rgba(201,168,76,0.32)] rounded-full px-3 py-1">6 headline KPIs · Phase 1 progress</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {PARETO_KPIS.map((kpi, i) => (
              <motion.div 
                key={kpi.id} 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[rgba(2,44,34,0.6)] border border-[rgba(201,168,76,0.32)] rounded-xl p-5 text-center hover:-translate-y-1 hover:border-[rgba(201,168,76,0.55)] transition-all duration-300 relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-0.5 ${kpi.status === 'on-track' ? 'bg-gradient-to-r from-[#10b981] to-[#6ee7b7]' : 'bg-gradient-to-r from-[#3b82f6] to-[#93c5fd]'}`} />
                <CircularProgress progress={kpi.progress} color={kpi.ringColor} />
                <div className="text-xs font-bold text-white mb-1 leading-tight" style={{ fontFamily: "'Cinzel', serif" }}>{kpi.label}</div>
                <div className="text-xs text-[#6ee7b7] font-semibold mb-0.5">{kpi.current} <span className="text-[0.65rem] opacity-60">{kpi.currentSub}</span></div>
                <div className="text-[0.68rem] text-[#ecfdf5]/40 leading-tight">Target: {kpi.target}</div>
                <span className={`inline-flex items-center gap-1 text-[0.65rem] font-bold px-2 py-0.5 rounded-full mt-2 ${kpi.delta.includes('▲') ? 'bg-[rgba(16,185,129,0.15)] text-[#10b981]' : 'bg-[rgba(245,158,11,0.15)] text-[#f59e0b]'}`}>
                  {kpi.delta}
                </span>
                <div className="text-[0.6rem] text-[#ecfdf5]/28 mt-2">{kpi.source}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Panel B: BSC Critical Leverage Points */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="bg-[rgba(6,78,59,0.15)] border border-[rgba(201,168,76,0.32)] rounded-2xl p-6 md:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7a5c1e] via-[#E8C560] to-[#7a5c1e]" />
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div>
              <span className="text-[0.68rem] font-bold tracking-widest uppercase text-[#C9A84C] block mb-1">Panel B · Balanced Scorecard</span>
              <h2 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>Critical Leverage Points — BSC View</h2>
              <div className="w-10 h-1 bg-gradient-to-r from-[#7a5c1e] via-[#E8C560] to-[#7a5c1e] rounded-full mt-2" />
            </div>
            <span className="text-xs text-[#a7f3d0]/70 bg-[rgba(6,78,59,0.4)] border border-[rgba(201,168,76,0.32)] rounded-full px-3 py-1">5 ⭐ KPIs · All 4 perspectives</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {BSC_POINTS.map((point, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[rgba(2,44,34,0.55)] border border-[rgba(201,168,76,0.32)] rounded-xl p-5 relative overflow-hidden flex flex-col gap-3 hover:-translate-y-1 hover:border-[rgba(201,168,76,0.55)] transition-all"
              >
                <div className={`absolute top-0 bottom-0 left-0 w-1 ${
                  point.color === 'gold' ? 'bg-gradient-to-b from-[#10b981] to-[#065f46]' : 
                  point.color === 'blue' ? 'bg-gradient-to-b from-[#3b82f6] to-[#1e3a8a]' : 
                  'bg-gradient-to-b from-[#6ee7b7] to-[#134e4a]'
                }`} />
                <span className="bg-gradient-to-r from-[#7a5c1e] via-[#c9a84c] to-[#7a5c1e] text-[#022c22] text-[0.62rem] font-black tracking-wider uppercase px-2 py-0.5 rounded-full w-fit">{point.lp}</span>
                <span className="text-[0.66rem] font-bold uppercase tracking-wider text-[#ecfdf5]/40">{point.perspective}</span>
                <div className="text-sm font-bold text-white leading-tight flex-1" style={{ fontFamily: "'Cinzel', serif" }}>{point.action}</div>
                <div className="text-xs text-[#6ee7b7] italic leading-tight">{point.kpi}</div>
                
                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[0.7rem] text-[#ecfdf5]/55">{point.current}</span>
                    <span className="text-[0.7rem] font-bold text-[#C9A84C]">{point.target}</span>
                  </div>
                  <div className="h-1 bg-[rgba(255,255,255,0.08)] rounded-sm overflow-hidden">
                    <motion.div 
                      className={`h-full rounded-sm ${
                        point.color === 'gold' ? 'bg-gradient-to-r from-[#10b981] to-[#6ee7b7]' : 
                        point.color === 'blue' ? 'bg-gradient-to-r from-[#3b82f6] to-[#93c5fd]' : 
                        'bg-gradient-to-r from-[#0d9488] to-[#6ee7b7]'
                      }`}
                      initial={{ width: 0 }} whileInView={{ width: `${point.progress}%` }} viewport={{ once: true }} transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-1.5">
                    <StatusBadge status={point.status} />
                    {point.statusSub && <span className="text-[0.68rem] text-[#ecfdf5]/35">{point.statusSub}</span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Panel C: Priority Action Board */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="bg-[rgba(6,78,59,0.15)] border border-[rgba(201,168,76,0.32)] rounded-2xl p-6 md:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7a5c1e] via-[#E8C560] to-[#7a5c1e]" />
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div>
              <span className="text-[0.68rem] font-bold tracking-widest uppercase text-[#C9A84C] block mb-1">Panel C · One Year Action Plan 2026</span>
              <h2 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>Urgent & Priority Actions — Foundation Phase</h2>
              <div className="w-10 h-1 bg-gradient-to-r from-[#7a5c1e] via-[#E8C560] to-[#7a5c1e] rounded-full mt-2" />
            </div>
            <span className="text-xs text-[#a7f3d0]/70 bg-[rgba(6,78,59,0.4)] border border-[rgba(201,168,76,0.32)] rounded-full px-3 py-1">2 Critical · 3 High · 1 Medium</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-[rgba(2,44,34,0.5)] border border-[rgba(201,168,76,0.32)] rounded-lg p-4 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#ef4444]" />
              <div className="text-2xl font-bold text-[#ef4444]" style={{ fontFamily: "'Cinzel', serif" }}>{summaryCounts.critical}</div>
              <div className="text-[0.7rem] text-[#a7f3d0]/70 uppercase tracking-wider">Critical Actions</div>
            </div>
            <div className="bg-[rgba(2,44,34,0.5)] border border-[rgba(201,168,76,0.32)] rounded-lg p-4 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#f59e0b]" />
              <div className="text-2xl font-bold text-[#f59e0b]" style={{ fontFamily: "'Cinzel', serif" }}>{summaryCounts.high}</div>
              <div className="text-[0.7rem] text-[#a7f3d0]/70 uppercase tracking-wider">High Priority</div>
            </div>
            <div className="bg-[rgba(2,44,34,0.5)] border border-[rgba(201,168,76,0.32)] rounded-lg p-4 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#10b981]" />
              <div className="text-2xl font-bold text-[#10b981]" style={{ fontFamily: "'Cinzel', serif" }}>{summaryCounts.q2}</div>
              <div className="text-[0.7rem] text-[#a7f3d0]/70 uppercase tracking-wider">Due Q2 2026</div>
            </div>
            <div className="bg-[rgba(2,44,34,0.5)] border border-[rgba(201,168,76,0.32)] rounded-lg p-4 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#C9A84C]" />
              <div className="text-xl font-bold text-[#C9A84C]" style={{ fontFamily: "'Cinzel', serif" }}>₱1.1B</div>
              <div className="text-[0.7rem] text-[#a7f3d0]/70 uppercase tracking-wider">2026 Total Budget</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            {['all', 'critical', 'high', 'medium', 'q2', 'q4'].map(f => (
              <button 
                key={f} 
                onClick={() => setActionFilter(f)}
                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                  actionFilter === f 
                    ? 'bg-gradient-to-r from-[#7a5c1e] via-[#c9a84c] to-[#7a5c1e] text-[#022c22] border-[#C9A84C] font-bold' 
                    : 'bg-[rgba(2,44,34,0.6)] border-[rgba(201,168,76,0.32)] text-[#a7f3d0]/80 hover:border-[rgba(201,168,76,0.55)] hover:text-[#C9A84C]'
                }`}
              >
                {f === 'all' ? 'All Actions' : f === 'q2' ? '📅 Due Q2' : f === 'q4' ? '📅 Due Q4' : `${f === 'critical' ? '🔴' : f === 'high' ? '🟡' : '🔵'} ${f.charAt(0).toUpperCase() + f.slice(1)}`}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto rounded-lg border border-[rgba(201,168,76,0.32)]">
            <table className="w-full text-sm min-w-[800px]">
              <thead>
                <tr className="bg-[rgba(201,168,76,0.1)] border-b-2 border-[rgba(201,168,76,0.32)]">
                  <th className="p-3 text-left text-[#C9A84C] font-bold text-xs tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>Strategic Objective</th>
                  <th className="p-3 text-left text-[#C9A84C] font-bold text-xs tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>Programme / Action</th>
                  <th className="p-3 text-center text-[#C9A84C] font-bold text-xs tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>Priority</th>
                  <th className="p-3 text-center text-[#C9A84C] font-bold text-xs tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>Due</th>
                  <th className="p-3 text-left text-[#C9A84C] font-bold text-xs tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>MEL Status</th>
                  <th className="p-3 text-right text-[#C9A84C] font-bold text-xs tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>Budget</th>
                  <th className="p-3 text-left text-[#C9A84C] font-bold text-xs tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>Lead Unit</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredActions.map((action) => (
                    <motion.tr 
                      key={action.id} 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="border-b border-[rgba(201,168,76,0.08)] hover:bg-[rgba(201,168,76,0.05)] transition-colors"
                    >
                      <td className="p-4 align-top">
                        <span className="inline-block bg-[rgba(201,168,76,0.12)] border border-[rgba(201,168,76,0.32)] rounded px-1.5 py-0.5 text-[0.65rem] text-[#C9A84C] font-bold" style={{ fontFamily: "'Cinzel', serif" }}>{action.lp}</span>
                        <div className="font-semibold text-white mt-1">{action.objective}</div>
                        <div className="text-xs text-[#d1fae5]/65 mt-1">{action.desc}</div>
                      </td>
                      <td className="p-4 align-top">
                        <div className="font-bold text-white">{action.action}</div>
                        <div className="text-xs text-[#d1fae5]/65 mt-1">{action.actionDesc}</div>
                      </td>
                      <td className="p-4 align-top text-center"><PriorityBadge priority={action.priority} /></td>
                      <td className="p-4 align-top text-center text-xs text-[#6ee7b7] font-semibold whitespace-nowrap">{action.due}</td>
                      <td className="p-4 align-top"><StatusBadge status={action.status} /></td>
                      <td className="p-4 align-top text-right font-bold text-[#C9A84C] whitespace-nowrap" style={{ fontFamily: "'Cinzel', serif" }}>{action.budget}</td>
                      <td className="p-4 align-top">
                        <div className="text-xs font-bold text-white">{action.lead}</div>
                        <div className="text-xs text-[#a7f3d0]/80">{action.support}</div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Panel D: Systems Loop Health Monitor */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="bg-[rgba(6,78,59,0.15)] border border-[rgba(201,168,76,0.32)] rounded-2xl p-6 md:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7a5c1e] via-[#E8C560] to-[#7a5c1e]" />
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div>
              <span className="text-[0.68rem] font-bold tracking-widest uppercase text-[#C9A84C] block mb-1">Panel D · Systems Thinking MEL</span>
              <h2 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>Feedback Loop Health Monitor</h2>
              <div className="w-10 h-1 bg-gradient-to-r from-[#7a5c1e] via-[#E8C560] to-[#7a5c1e] rounded-full mt-2" />
            </div>
            <span className="text-xs text-[#a7f3d0]/70 bg-[rgba(6,78,59,0.4)] border border-[rgba(201,168,76,0.32)] rounded-full px-3 py-1">2 reinforcing · 2 balancing</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEEDBACK_LOOPS.map((loop, i) => (
              <motion.div 
                key={loop.id} 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[rgba(2,44,34,0.55)] border border-[rgba(201,168,76,0.32)] rounded-xl p-5 relative overflow-hidden hover:-translate-y-1 transition-all"
              >
                <div className={`text-3xl font-black leading-none mb-1 ${loop.type === 'reinforcing' ? 'text-[#10b981]' : 'text-[#C9A84C]'}`} style={{ fontFamily: "'Cinzel', serif" }}>{loop.id}</div>
                <span className={`text-[0.6rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded inline-block mb-2 ${
                  loop.type === 'reinforcing' ? 'bg-[rgba(16,185,129,0.15)] text-[#10b981] border border-[rgba(16,185,129,0.3)]' : 'bg-[rgba(201,168,76,0.15)] text-[#C9A84C] border border-[rgba(201,168,76,0.32)]'
                }`}>{loop.type}</span>
                <div className="text-xs font-bold text-white mb-2 leading-tight">{loop.name}</div>
                <div className="h-1 bg-[rgba(255,255,255,0.06)] rounded-sm overflow-hidden my-2">
                  <motion.div 
                    className={`h-full rounded-sm ${
                      loop.color === 'green' ? 'bg-gradient-to-r from-[#10b981] to-[#6ee7b7]' : 
                      loop.color === 'gold' ? 'bg-gradient-to-r from-[#7a5c1e] via-[#c9a84c] to-[#7a5c1e]' : 
                      'bg-gradient-to-r from-[#3b82f6] to-[#93c5fd]'
                    }`}
                    initial={{ width: 0 }} whileInView={{ width: `${loop.progress}%` }} viewport={{ once: true }} transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
                  />
                </div>
                <div className="text-xs text-[#d1fae5]/60 leading-relaxed mt-2">{loop.desc}</div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-[#ecfdf5]/55">{loop.activation}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    loop.health === 'Building' || loop.health === 'Initialising' ? 'bg-[rgba(245,158,11,0.15)] text-[#f59e0b] border border-[rgba(245,158,11,0.25)]' :
                    'bg-[rgba(59,130,246,0.15)] text-[#93c5fd] border border-[rgba(59,130,246,0.25)]'
                  }`}>{loop.health}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Panel E: Phase Progress Tracker */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="bg-[rgba(6,78,59,0.15)] border border-[rgba(201,168,76,0.32)] rounded-2xl p-6 md:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7a5c1e] via-[#E8C560] to-[#7a5c1e]" />
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div>
              <span className="text-[0.68rem] font-bold tracking-widest uppercase text-[#C9A84C] block mb-1">Panel E · Implementation Roadmap</span>
              <h2 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>Phase Progress Tracker — 2026–2035</h2>
              <div className="w-10 h-1 bg-gradient-to-r from-[#7a5c1e] via-[#E8C560] to-[#7a5c1e] rounded-full mt-2" />
            </div>
            <span className="text-xs text-[#a7f3d0]/70 bg-[rgba(6,78,59,0.4)] border border-[rgba(201,168,76,0.32)] rounded-full px-3 py-1">₱55B total · 3 phases</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PHASES.map((phase, i) => (
              <motion.div 
                key={phase.num} 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="bg-[rgba(2,44,34,0.55)] border border-[rgba(201,168,76,0.32)] rounded-xl p-5 relative overflow-hidden"
              >
                <div className="text-4xl font-black text-[#C9A84C] opacity-25 absolute top-4 right-5" style={{ fontFamily: "'Cinzel', serif" }}>{phase.num}</div>
                <div className="text-sm font-bold text-white mb-0.5" style={{ fontFamily: "'Cinzel', serif" }}>{phase.title}</div>
                <div className="text-xs text-[#6ee7b7] font-medium mb-3">{phase.years}</div>
                <div className="text-lg font-bold text-[#C9A84C] mb-3" style={{ fontFamily: "'Cinzel', serif" }}>{phase.budget}</div>
                <StatusBadge status={phase.status === 'Current Phase' ? 'In Progress' : 'Planned'} />
                
                <div className="h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden my-3">
                  <motion.div 
                    className={`h-full rounded-full ${
                      phase.num === '01' ? 'bg-gradient-to-r from-[#10b981] to-[#6ee7b7]' :
                      phase.num === '02' ? 'bg-gradient-to-r from-[#3b82f6] to-[#93c5fd]' :
                      'bg-gradient-to-r from-[#8b5cf6] to-[#c4b5fd]'
                    }`}
                    initial={{ width: 0 }} whileInView={{ width: `${phase.progress}%` }} viewport={{ once: true }} transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
                  />
                </div>
                <div className="text-xs text-[#ecfdf5]/40 text-right">{phase.progress}% complete</div>
                
                <div className="mt-4 flex flex-col gap-1.5">
                  {phase.milestones.map((m, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#d1fae5]/75">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        m.status === 'active' ? 'bg-[#C9A84C] animate-pulse' : m.status === 'done' ? 'bg-[#10b981]' : 'bg-[#ecfdf5]/20'
                      }`} />
                      <span className={m.status === 'done' ? 'text-[#d1fae5]/50 line-through' : ''}>{m.text}</span>

                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

      </main>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-[rgba(201,168,76,0.32)] mt-8">
        <p className="text-xs text-[#ecfdf5]/30">© 2026 BARMM · Ministry of Trade, Investments and Tourism · <span className="text-[#C9A84C]">The Emerging Bangsamoro</span> · Investment Roadmap 2026–2035</p>
        <p className="text-[0.68rem] text-[#ecfdf5]/20 mt-1">Data sources: PSA, BBOI, BEZA, MTIT, MENRE (2024 baselines). Targets per BIRD 2026–2035 Roadmap & BDP 2023–2028.</p>
      </footer>

      {/* AI Chat */}
      <AnimatePresence>
        {showAIChat && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={() => setShowAIChat(false)} />
            <AIStrategistChat onClose={() => setShowAIChat(false)} />
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showAIChat && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
            onClick={() => setShowAIChat(true)}
            className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#022c22]/80 backdrop-blur shadow-xl shadow-[#C9A84C]/40 flex items-center justify-center text-white border-2 border-[#C9A84C]/50"
          >
            <CircularAIIcon size={48} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MELDashboard;