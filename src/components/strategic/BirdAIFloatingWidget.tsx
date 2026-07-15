/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║  BIRD AI Floating Widget — Unified AI Assistant Component                  ║
 * ║  BIRD 2026-2035 Strategic Planning Platform                                ║
 * ║                                                                              ║
 * ║  This is the SINGLE, unified floating AI assistant for the entire platform.  ║
 * ║  No other floating AI buttons or widgets should be used on any page.        ║
 * ║                                                                              ║
 * ║  Usage:                                                                      ║
 * ║    <BirdAIFloatingWidget viewContext="swot" position="bottom-right" />       ║
 * ║                                                                              ║
 * ║  Colors: Deep Green (#022c22, #011a12, #064e3b, #065f46)                   ║
 * ║          Metallic Gold (#C9A84C, #E8C560, #B8942E, #A08028)                ║
 * ║          Cream (#ecfdf5)  Muted (#64748b)                                   ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  AlertTriangle,
  BookOpen,
  ChevronRight,
  Lightbulb,
  Loader2,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  Wand2,
  X,
  Zap,
  User,
} from "lucide-react";

/* ────────────────────────────── Types ────────────────────────────── */

export type BirdAIViewContext =
  | "dashboard"
  | "swot"
  | "systems"
  | "strategy"
  | "bsc"
  | "paps"
  | "team"
  | "export"
  | "templates"
  | "admin"
  | "settings"
  | "survey";

export interface BirdAIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  isError?: boolean;
}

export interface BirdAISuggestion {
  label: string;
  prompt: string;
  icon: "sparkles" | "wand" | "target" | "lightbulb" | "zap" | "trending" | "book" | "alert";
}

export interface BirdAIFloatingWidgetProps {
  /** Which module page this widget appears on — determines contextual suggestions */
  viewContext?: BirdAIViewContext;
  /** Position on screen */
  position?: "bottom-right" | "bottom-left";
  /** Additional className */
  className?: string;
}

/* ────────────────────────── Constants ────────────────────────── */

const BIRD_LOGO_URL =
  "https://appimize.app/assets/apps/user_1097/images/2c7d825bf937_232_1097.png";

const EDGE_FUNCTION_URL =
  "https://lydsisparsmvextskevw.supabase.co/functions/v1/ai-strategy-assistant";

const SYSTEM_CONTEXT = `You are BIRD AI — the strategic planning assistant for the Bangsamoro Investment Roadmap Development (BIRD) 2026-2035. You help users with SWOT analysis, Systems Thinking (Causal Loop Diagrams), Strategy Matrix (TOWS), Balanced Scorecard (4 perspectives as Strategy Map: Learning & Growth → Internal Process → Stakeholder → Financial → Mission & Vision), and Priority Action Plans (PAPs). You understand the BEIE Framework (Bangsamoro Economic and Investment Ecosystem), the 4 Strategic Pillars, and the 5 Critical Leverage Points (LP1-LP5). Always provide actionable, BARMM-specific guidance grounded in the strategic framework. Respond in the same language as the user (English or Filipino/Bahasa Sug).`;

const MAX_INPUT_LENGTH = 2000;

/* ──────────────────────── Suggestion Maps ──────────────────────── */

const CONTEXTUAL_SUGGESTIONS: Record<BirdAIViewContext, BirdAISuggestion[]> = {
  swot: [
    {
      label: "Analyze my SWOT scores",
      prompt:
        "Please analyze my current SWOT analysis scores. What patterns do you see across the Strengths, Weaknesses, Opportunities, and Threats?",
      icon: "target",
    },
    {
      label: "Identify blind spots",
      prompt:
        "Based on my SWOT analysis, what blind spots or gaps might I be missing? Are there any hidden interconnections between my Weaknesses and Threats?",
      icon: "lightbulb",
    },
    {
      label: "Generate RI scores",
      prompt:
        "Help me calculate Relative Importance (RI) scores for my SWOT factors. What formula should I use and how do I interpret the results?",
      icon: "zap",
    },
    {
      label: "Create TOWS strategies",
      prompt:
        "Generate TOWS strategies from my SWOT analysis — SO (maxi-maxi), WO (mini-maxi), ST (maxi-mini), and WT (mini-mini) strategies.",
      icon: "wand",
    },
  ],
  systems: [
    {
      label: "Detect loops in my CLD",
      prompt:
        "Analyze my Causal Loop Diagram and identify all reinforcing (R) and balancing (B) feedback loops. What systemic patterns do you see?",
      icon: "zap",
    },
    {
      label: "Apply archetype template",
      prompt:
        "What systems archetypes apply to my Causal Loop Diagram? Suggest which archetype templates (e.g., Limits to Growth, Shifting the Burden) might be relevant.",
      icon: "book",
    },
    {
      label: "Generate leverage points",
      prompt:
        "Based on my CLD, identify the highest-leverage intervention points using Donella Meadows' leverage points framework.",
      icon: "target",
    },
    {
      label: "Map to 5 CLPs",
      prompt:
        "How do the feedback loops in my CLD relate to the 5 Critical Leverage Points (CLP1-CLP5) of the BIRD framework?",
      icon: "trending",
    },
  ],
  strategy: [
    {
      label: "Generate TOWS strategies",
      prompt:
        "Generate comprehensive TOWS strategies from my SWOT analysis with prioritization criteria.",
      icon: "wand",
    },
    {
      label: "Score my options",
      prompt:
        "Help me apply the Strategy Scoring Matrix to evaluate and rank my strategic options. What scoring criteria should I use?",
      icon: "target",
    },
    {
      label: "Map to BEIE clusters",
      prompt:
        "How do my strategic options map to the BEIE Framework clusters and the 4 Strategic Pillars of BIRD 2026-2035?",
      icon: "trending",
    },
    {
      label: "Prioritize initiatives",
      prompt:
        "Help me prioritize my strategic initiatives using the Impact-Ease matrix approach.",
      icon: "sparkles",
    },
  ],
  bsc: [
    {
      label: "Review KPI alignment",
      prompt:
        "Review my Balanced Scorecard KPIs. Are they SMART? Do they cascade properly from Mission & Vision through the four perspectives?",
      icon: "target",
    },
    {
      label: "Map causal pathways",
      prompt:
        "Help me map the causal pathways in my Strategy Map — how do Learning & Growth drivers flow through to Financial outcomes?",
      icon: "trending",
    },
    {
      label: "Check perspective balance",
      prompt:
        "Analyze the balance across my four BSC perspectives. Are any perspectives over-weighted or under-represented?",
      icon: "lightbulb",
    },
    {
      label: "Suggest leading indicators",
      prompt:
        "Suggest leading indicators for each of my BSC perspectives that can predict lagging outcome performance.",
      icon: "zap",
    },
  ],
  paps: [
    {
      label: "Track action progress",
      prompt:
        "Help me review my Priority Action Plans. What progress indicators should I track and how do I set up a monitoring framework?",
      icon: "trending",
    },
    {
      label: "Align to BSC",
      prompt:
        "How should I align my PAPs with the Balanced Scorecard perspectives and strategy map objectives?",
      icon: "target",
    },
    {
      label: "Check budget utilization",
      prompt:
        "Review my PAP budget allocations. Are they aligned with strategic priorities and the BEIE Framework pillars?",
      icon: "alert",
    },
    {
      label: "Set milestones",
      prompt:
        "Help me define key milestones and deliverables for my Priority Action Plans with realistic timelines.",
      icon: "sparkles",
    },
  ],
  dashboard: [
    {
      label: "Summarize plan health",
      prompt:
        "Provide a summary assessment of my overall BIRD 2026-2035 strategic plan health based on the dashboard indicators.",
      icon: "trending",
    },
    {
      label: "Identify risks",
      prompt:
        "What are the top strategic risks I should be monitoring based on my current plan data and BARMM context?",
      icon: "alert",
    },
    {
      label: "Export summary",
      prompt:
        "Help me prepare an executive summary of my strategic plan for stakeholders. What key sections should I include?",
      icon: "book",
    },
    {
      label: "Suggest next steps",
      prompt:
        "Based on my current progress, what are the recommended next steps to advance my BIRD 2026-2035 strategic plan?",
      icon: "lightbulb",
    },
  ],
  team: [
    {
      label: "Assign roles",
      prompt:
        "Help me define team roles and responsibilities for the BIRD strategic planning process.",
      icon: "target",
    },
    {
      label: "Set accountability",
      prompt:
        "Suggest an accountability framework for tracking team contributions to the BIRD plan.",
      icon: "sparkles",
    },
    {
      label: "Collaboration tips",
      prompt:
        "What are best practices for cross-functional collaboration in developing the BIRD 2026-2035 strategic plan?",
      icon: "lightbulb",
    },
    {
      label: "Stakeholder mapping",
      prompt:
        "Help me create a stakeholder mapping for the BIRD strategic planning process.",
      icon: "wand",
    },
  ],
  export: [
    {
      label: "Format my report",
      prompt:
        "What is the recommended format and structure for exporting my BIRD strategic plan report?",
      icon: "book",
    },
    {
      label: "Include sections",
      prompt:
        "Which sections should be included in a comprehensive BIRD strategic plan export?",
      icon: "target",
    },
    {
      label: "Quality checklist",
      prompt:
        "Provide a quality checklist for reviewing my strategic plan before final export and submission.",
      icon: "alert",
    },
    {
      label: "Presentation tips",
      prompt:
        "How should I present my BIRD strategic plan to stakeholders? Any tips for effective communication?",
      icon: "sparkles",
    },
  ],
  templates: [
    {
      label: "Choose template",
      prompt:
        "Help me choose the right strategic planning template for my current needs.",
      icon: "target",
    },
    {
      label: "Customize framework",
      prompt:
        "How can I customize the BIRD framework templates to fit my organization\'s specific context?",
      icon: "wand",
    },
    {
      label: "Template guide",
      prompt:
        "Walk me through how to use the strategic planning templates effectively.",
      icon: "book",
    },
    {
      label: "Best practices",
      prompt:
        "What are the best practices for using strategic planning templates in the BARMM context?",
      icon: "lightbulb",
    },
  ],
  admin: [
    {
      label: "Manage users",
      prompt:
        "What are the recommended user roles and permissions for the BIRD strategic planning platform?",
      icon: "target",
    },
    {
      label: "Data governance",
      prompt:
        "Help me set up data governance policies for the BIRD strategic planning data.",
      icon: "alert",
    },
    {
      label: "Platform settings",
      prompt:
        "What are the key platform configuration settings I should review as an admin?",
      icon: "sparkles",
    },
    {
      label: "Audit & compliance",
      prompt:
        "How do I ensure audit trails and compliance for the BIRD strategic planning process?",
      icon: "book",
    },
  ],
  settings: [
    {
      label: "Configure plan",
      prompt:
        "Help me configure my BIRD strategic plan settings, including timeline, pillars, and scope.",
      icon: "target",
    },
    {
      label: "Set preferences",
      prompt:
        "What are the recommended user preferences for the BIRD strategic planning experience?",
      icon: "sparkles",
    },
    {
      label: "Integration guide",
      prompt:
        "How do I integrate the BIRD platform with other tools and systems?",
      icon: "wand",
    },
    {
      label: "Account help",
      prompt:
        "Help me with account-related questions for the BIRD strategic planning platform.",
      icon: "lightbulb",
    },
  ],
  survey: [
    {
      label: "Survey guidance",
      prompt:
        "Help me understand how to complete the BIRD strategic planning survey effectively.",
      icon: "book",
    },
    {
      label: "Answer analysis",
      prompt:
        "Analyze my survey responses and suggest areas for deeper exploration in my strategic plan.",
      icon: "target",
    },
    {
      label: "Improve responses",
      prompt:
        "How can I improve the quality and completeness of my strategic planning survey responses?",
      icon: "lightbulb",
    },
    {
      label: "Survey results",
      prompt:
        "Help me interpret my survey results and translate them into strategic plan components.",
      icon: "trending",
    },
  ],
};

const GENERIC_SUGGESTIONS: BirdAISuggestion[] = [
  {
    label: "Explain the BEIE Framework",
    prompt:
      "Explain the BEIE Framework (Bangsamoro Economic and Investment Ecosystem) and how it guides the BIRD 2026-2035 strategic planning process.",
    icon: "book",
  },
  {
    label: "Help me get started",
    prompt:
      "I'm new to the BIRD strategic planning platform. Walk me through how to get started with creating my strategic plan.",
    icon: "sparkles",
  },
  {
    label: "What are Critical Leverage Points?",
    prompt:
      "Explain the 5 Critical Leverage Points (CLP1-CLP5) in the BIRD framework and how they drive strategic transformation.",
    icon: "zap",
  },
  {
    label: "4 Strategic Pillars overview",
    prompt:
      "Provide an overview of the 4 Strategic Pillars of the BIRD 2026-2035 framework and how they interconnect.",
    icon: "target",
  },
];

/* ──────────────────────── Helper Utilities ──────────────────────── */

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getSuggestionsForContext(
  context: BirdAIViewContext | undefined
): BirdAISuggestion[] {
  if (!context) return GENERIC_SUGGESTIONS;
  const specific = CONTEXTUAL_SUGGESTIONS[context] ?? [];
  return specific.length > 0 ? specific : GENERIC_SUGGESTIONS;
}

/* ──────────────────────── Sub-Components ──────────────────────── */

/**
 * TypingIndicator — Three gold dots that animate in sequence
 */
function TypingIndicator(): React.ReactElement {
  return (
    <div
      className="flex items-center gap-1.5 px-4 py-3"
      aria-label="BIRD AI is typing"
    >
      <div className="flex gap-1">
        <span
          className="inline-block h-2 w-2 rounded-full bg-[#C9A84C]"
          style={{ animation: "birdTypingBounce 1.2s infinite 0s" }}
        />
        <span
          className="inline-block h-2 w-2 rounded-full bg-[#C9A84C]"
          style={{ animation: "birdTypingBounce 1.2s infinite 0.2s" }}
        />
        <span
          className="inline-block h-2 w-2 rounded-full bg-[#C9A84C]"
          style={{ animation: "birdTypingBounce 1.2s infinite 0.4s" }}
        />
      </div>
      <span className="text-xs text-[#64748b] ml-1">BIRD AI is thinking…</span>
    </div>
  );
}

/**
 * SuggestionChip — Clickable contextual suggestion pill
 */
function SuggestionChip({
  suggestion,
  onClick,
  delay,
}: {
  suggestion: BirdAISuggestion;
  onClick: () => void;
  delay: number;
}): React.ReactElement {
  const iconMap: Record<string, React.ReactNode> = {
    sparkles: <Sparkles size={14} className="text-[#E8C560] shrink-0" />,
    wand: <Wand2 size={14} className="text-[#E8C560] shrink-0" />,
    target: <Target size={14} className="text-[#E8C560] shrink-0" />,
    lightbulb: <Lightbulb size={14} className="text-[#E8C560] shrink-0" />,
    zap: <Zap size={14} className="text-[#E8C560] shrink-0" />,
    trending: <TrendingUp size={14} className="text-[#E8C560] shrink-0" />,
    book: <BookOpen size={14} className="text-[#E8C560] shrink-0" />,
    alert: <AlertTriangle size={14} className="text-[#E8C560] shrink-0" />,
  };

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-full border border-[#C9A84C]/25 bg-[#022c22]/60 px-3.5 py-2 text-xs text-[#ecfdf5] transition-all duration-200 hover:border-[#C9A84C]/60 hover:bg-[#064e3b]/50 hover:translate-x-0.5 cursor-pointer text-left"
      style={{
        animation: `birdFadeSlideUp 0.4s ease-out ${delay}s both`,
      }}
    >
      {iconMap[suggestion.icon] ?? (
        <Sparkles size={14} className="text-[#E8C560] shrink-0" />
      )}
      <span className="truncate">{suggestion.label}</span>
      <ChevronRight size={12} className="text-[#64748b] shrink-0" />
    </button>
  );
}

/* ──────────────────────── Main Component ──────────────────────── */

/**
 * BirdAIFloatingWidget — The unified AI assistant for the BIRD 2026-2035 platform.
 *
 * This is the ONLY floating AI widget that should appear on any page.
 * It provides contextual AI assistance based on the current module view.
 */
const BirdAIFloatingWidget: React.FC<BirdAIFloatingWidgetProps> = ({
  viewContext = "dashboard",
  position = "bottom-right",
  className = "",
}) => {
  /* State */
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<BirdAIMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNewSuggestions, setHasNewSuggestions] = useState(true);
  const [isFirstOpen, setIsFirstOpen] = useState(true);

  /* Refs */
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const resizeRef = useRef<number | null>(null);

  /* Derived */
  const suggestions = useMemo(
    () => getSuggestionsForContext(viewContext),
    [viewContext]
  );

  const positionClasses =
    position === "bottom-left"
      ? "left-6 right-auto"
      : "right-6 left-auto";

  /* ─── Auto-scroll to bottom ─── */
  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  /* ─── Auto-resize textarea ─── */
  useEffect(() => {
    const ta = inputRef.current;
    if (!ta) return;
    if (resizeRef.current) cancelAnimationFrame(resizeRef.current);
    resizeRef.current = requestAnimationFrame(() => {
      ta.style.height = "auto";
      const newHeight = Math.min(ta.scrollHeight, 120); // max ~4 rows
      ta.style.height = `${newHeight}px`;
    });
    return () => {
      if (resizeRef.current) cancelAnimationFrame(resizeRef.current);
    };
  }, [input]);

  /* ─── Keyboard shortcuts ─── */
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // `/` focuses input when panel is open
      if (
        isOpen &&
        e.key === "/" &&
        document.activeElement !== inputRef.current &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }

      // Escape closes panel
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  /* ─── Focus trap ─── */
  useEffect(() => {
    if (!isOpen) return;

    // Store last focused element
    lastFocusRef.current = document.activeElement as HTMLElement;

    // Focus input after transition
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 350);

    // Trap focus
    function handleTab(e: KeyboardEvent) {
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleTab);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", handleTab);
    };
  }, [isOpen]);

  /* ─── Restore focus on close ─── */
  useEffect(() => {
    if (!isOpen && lastFocusRef.current) {
      lastFocusRef.current.focus();
    }
  }, [isOpen]);

  /* ─── Send message ─── */
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      const userMsg: BirdAIMessage = {
        id: generateId(),
        role: "user",
        content: content.trim(),
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsLoading(true);
      setError(null);

      try {
        // Build conversation history for context
        const conversationHistory = messages.map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const response = await fetch(EDGE_FUNCTION_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [
              { role: "system", content: SYSTEM_CONTEXT },
              ...conversationHistory,
              { role: "user", content: content.trim() },
            ],
            viewContext,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error || `Request failed: ${response.status}`
          );
        }

        const data = await response.json();

        const aiMsg: BirdAIMessage = {
          id: generateId(),
          role: "assistant",
          content:
            data.response ??
            data.message ??
            data.content ??
            "I apologize, but I couldn't generate a response. Please try again.",
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, aiMsg]);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unexpected error occurred";

        const errorMsg: BirdAIMessage = {
          id: generateId(),
          role: "assistant",
          content: `I encountered an error: ${errorMessage}. Please check your connection and try again.`,
          timestamp: Date.now(),
          isError: true,
        };

        setMessages((prev) => [...prev, errorMsg]);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages, viewContext]
  );

  /* ─── Handle send ─── */
  const handleSend = useCallback(() => {
    if (!input.trim()) return;
    sendMessage(input);
  }, [input, sendMessage]);

  /* ─── Handle textarea keydown (Enter to send, Shift+Enter for newline) ─── */
  const handleTextareaKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  /* ─── Handle suggestion click ─── */
  const handleSuggestionClick = useCallback(
    (prompt: string) => {
      sendMessage(prompt);
      setIsFirstOpen(false);
    },
    [sendMessage]
  );

  /* ─── Toggle panel ─── */
  const togglePanel = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        setHasNewSuggestions(false);
      }
      return next;
    });
  }, []);

  /* ─── Close panel ─── */
  const closePanel = useCallback(() => {
    setIsOpen(false);
  }, []);

  /* ─── Clear chat ─── */
  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
    setIsFirstOpen(true);
  }, []);

  /* ─── Inline styles for keyframe animations ─── */
  useEffect(() => {
    const styleId = "bird-ai-widget-styles";
    if (document.getElementById(styleId)) return;

    const styleEl = document.createElement("style");
    styleEl.id = styleId;
    styleEl.textContent = `
      @keyframes birdFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-6px); }
      }
      @keyframes birdPulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(201, 168, 76, 0.5); }
        50% { box-shadow: 0 0 0 12px rgba(201, 168, 76, 0); }
      }
      @keyframes birdPanelSlideUp {
        from { opacity: 0; transform: translateY(20px) scale(0.96); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes birdPanelSlideDown {
        from { opacity: 1; transform: translateY(0) scale(1); }
        to { opacity: 0; transform: translateY(20px) scale(0.96); }
      }
      @keyframes birdMsgFadeSlideUp {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes birdFadeSlideUp {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes birdTypingBounce {
        0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
        40% { transform: translateY(-4px); opacity: 1; }
      }
      @keyframes birdSpin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      const existing = document.getElementById(styleId);
      if (existing) document.head.removeChild(existing);
    };
  }, []);

  /* ──────────────────────────── Render ──────────────────────────── */

  return (
    <div className={`fixed z-50 ${positionClasses} bottom-6 ${className}`}>
      {/* ─── CSS keyframe styles ─── */}

      {/* ─── Floating Button ─── */}
      <button
        ref={buttonRef}
        onClick={togglePanel}
        aria-label={isOpen ? "Close BIRD AI assistant" : "Open BIRD AI assistant"}
        aria-expanded={isOpen}
        aria-controls="bird-ai-panel"
        className={`
          group relative flex h-14 w-14 items-center justify-center rounded-full
          border-2 border-[#C9A84C]/40
          bg-[#011a12] shadow-lg shadow-[#C9A84C]/20
          transition-all duration-300 ease-out
          hover:border-[#E8C560] hover:shadow-xl hover:shadow-[#C9A84C]/30
          hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2 focus:ring-offset-[#011a12]
          cursor-pointer
          ${!isOpen ? "animate-[birdFloat_3s_ease-in-out_infinite]" : ""}
        `}
        style={
          hasNewSuggestions && !isOpen
            ? { animation: "birdFloat 3s ease-in-out infinite, birdPulse 2s ease-in-out infinite" }
            : undefined
        }
      >
        {/* Gold gradient ring on hover */}
        <span className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: "linear-gradient(135deg, #C9A84C, #E8C560, #C9A84C)",
            padding: "2px",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Logo image */}
        <img
          src={BIRD_LOGO_URL}
          alt="BIRD AI"
          className="h-10 w-10 rounded-full object-cover"
          loading="eager"
        />

        {/* New suggestion dot */}
        {hasNewSuggestions && !isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E8C560] opacity-60" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-[#E8C560] border-2 border-[#011a12]" />
          </span>
        )}
      </button>

      {/* ─── Chat Panel ─── */}
      {isOpen && (
        <div
          id="bird-ai-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="BIRD AI Assistant"
          className={`
            absolute bottom-20 ${position === "bottom-left" ? "left-0" : "right-0"}
            flex flex-col overflow-hidden rounded-2xl border border-[#C9A84C]/20
            bg-[#011a12] shadow-2xl shadow-black/50
            animate-[birdPanelSlideUp_0.3s_ease-out]
          `}
          style={{
            width: "min(420px, calc(100vw - 3rem))",
            maxHeight: "min(70vh, 600px)",
          }}
        >
          {/* ─── Header ─── */}
          <div className="flex items-center justify-between border-b border-[#C9A84C]/15 bg-[#022c22] px-4 py-3">
            <div className="flex items-center gap-3">
              <img
                src={BIRD_LOGO_URL}
                alt=""
                className="h-9 w-9 rounded-full object-cover border border-[#C9A84C]/30"
              />
              <div>
                <h3 className="text-sm font-semibold text-[#E8C560]">
                  BIRD AI
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] text-[#64748b] uppercase tracking-wider">
                    Strategic Assistant
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {/* Clear chat button */}
              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  aria-label="Clear conversation"
                  className="rounded-lg p-1.5 text-[#64748b] transition-colors hover:bg-[#064e3b]/40 hover:text-[#ecfdf5] cursor-pointer"
                  title="Clear conversation"
                >
                  <BookOpen size={16} />
                </button>
              )}
              {/* Close button */}
              <button
                onClick={closePanel}
                aria-label="Close BIRD AI assistant"
                className="rounded-lg p-1.5 text-[#64748b] transition-colors hover:bg-[#064e3b]/40 hover:text-[#ecfdf5] cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* ─── Messages Area ─── */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth"
            style={{ maxHeight: "calc(70vh - 140px)" }}
          >
            {/* Welcome message */}
            {messages.length === 0 && (
              <div
                className="flex gap-3"
                style={{
                  animation: "birdMsgFadeSlideUp 0.4s ease-out both",
                }}
              >
                <div className="shrink-0">
                  <img
                    src={BIRD_LOGO_URL}
                    alt="BIRD AI"
                    className="h-8 w-8 rounded-full object-cover border border-[#C9A84C]/25"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="rounded-xl rounded-tl-sm bg-[#022c22]/60 border border-[#C9A84C]/10 px-4 py-3">
                    <p className="text-sm leading-relaxed text-[#ecfdf5]">
                      Welcome to the BIRD 2026-2035 Strategic Planning Platform!
                      I&apos;m here to help you with SWOT analysis, Systems
                      Thinking, Strategy formulation, Balanced Scorecard design,
                      and Priority Action Planning.
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#ecfdf5]">
                      Select a suggestion below or type your question to get
                      started.
                    </p>
                  </div>
                  <span className="text-[10px] text-[#64748b] ml-1">
                    {formatTime(Date.now())}
                  </span>
                </div>
              </div>
            )}

            {/* Contextual suggestions */}
            {messages.length === 0 && isFirstOpen && (
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestions.map((s, i) => (
                  <SuggestionChip
                    key={`${s.label}-${i}`}
                    suggestion={s}
                    onClick={() => handleSuggestionClick(s.prompt)}
                    delay={i * 0.08}
                  />
                ))}
              </div>
            )}

            {/* Message list */}
            {messages.map((msg, idx) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.role === "user" ? "flex-row-reverse" : ""
                }`}
                style={{
                  animation: `birdMsgFadeSlideUp 0.35s ease-out both`,
                  animationDelay: `${idx * 0.02}s`,
                }}
              >
                {/* Avatar */}
                <div className="shrink-0 self-start">
                  {msg.role === "assistant" ? (
                    <img
                      src={BIRD_LOGO_URL}
                      alt="BIRD AI"
                      className="h-8 w-8 rounded-full object-cover border border-[#C9A84C]/25"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#C9A84C] to-[#B8942E] text-[#011a12] text-xs font-bold">
                      <User size={14} />
                    </div>
                  )}
                </div>

                {/* Message bubble */}
                <div
                  className={`flex-1 space-y-1 max-w-[85%] ${
                    msg.role === "user" ? "text-right" : ""
                  }`}
                >
                  <div
                    className={`inline-block rounded-xl px-4 py-2.5 text-left ${
                      msg.role === "user"
                        ? "rounded-tr-sm bg-gradient-to-br from-[#064e3b] to-[#065f46] text-[#ecfdf5]"
                        : msg.isError
                        ? "rounded-tl-sm bg-[#022c22]/60 border-l-2 border-red-500/50 text-[#ecfdf5]"
                        : "rounded-tl-sm bg-[#022c22]/60 border-l-2 border-[#C9A84C]/40 text-[#ecfdf5]"
                    }`}
                  >
                    {msg.role === "assistant" && !msg.isError && (
                      <div className="mb-1 flex items-center gap-1.5">
                        <Sparkles size={11} className="text-[#C9A84C]" />
                        <span className="text-[10px] font-medium text-[#C9A84C] uppercase tracking-wider">
                          BIRD AI
                        </span>
                      </div>
                    )}
                    {msg.isError && (
                      <div className="mb-1 flex items-center gap-1.5">
                        <AlertTriangle size={11} className="text-red-400" />
                        <span className="text-[10px] font-medium text-red-400 uppercase tracking-wider">
                          Error
                        </span>
                      </div>
                    )}
                    <div className="whitespace-pre-wrap text-sm leading-relaxed text-[#ecfdf5]">
                      {msg.content}
                    </div>
                  </div>
                  <span
                    className={`text-[10px] text-[#64748b] ${
                      msg.role === "user" ? "mr-1" : "ml-1"
                    }`}
                  >
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div
                className="flex gap-3"
                style={{
                  animation: "birdMsgFadeSlideUp 0.3s ease-out both",
                }}
              >
                <div className="shrink-0">
                  <img
                    src={BIRD_LOGO_URL}
                    alt="BIRD AI"
                    className="h-8 w-8 rounded-full object-cover border border-[#C9A84C]/25"
                  />
                </div>
                <div className="flex-1">
                  <div className="inline-block rounded-xl rounded-tl-sm bg-[#022c22]/60 border border-[#C9A84C]/10">
                    <TypingIndicator />
                  </div>
                </div>
              </div>
            )}

            {/* Suggestions after AI response */}
            {!isLoading && messages.length > 0 && messages[messages.length - 1].role === "assistant" && (
              <div
                className="flex flex-wrap gap-2 pt-1 pl-11"
                style={{
                  animation: "birdFadeSlideUp 0.4s ease-out 0.2s both",
                }}
              >
                {suggestions.slice(0, 3).map((s, i) => (
                  <SuggestionChip
                    key={`followup-${s.label}-${i}`}
                    suggestion={s}
                    onClick={() => handleSuggestionClick(s.prompt)}
                    delay={i * 0.06}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ─── Error Banner ─── */}
          {error && (
            <div className="mx-4 mb-2 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2">
              <AlertTriangle size={14} className="shrink-0 text-red-400" />
              <p className="flex-1 text-xs text-red-300">{error}</p>
              <button
                onClick={() => setError(null)}
                className="shrink-0 rounded p-0.5 text-red-400 transition-colors hover:bg-red-500/20 cursor-pointer"
                aria-label="Dismiss error"
              >
                <X size={12} />
              </button>
            </div>
          )}

          {/* ─── Input Area ─── */}
          <div className="border-t border-[#C9A84C]/15 bg-[#022c22] px-4 py-3">
            <div className="flex items-end gap-2">
              <div className="relative flex-1">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => {
                    if (e.target.value.length <= MAX_INPUT_LENGTH) {
                      setInput(e.target.value);
                    }
                  }}
                  onKeyDown={handleTextareaKeyDown}
                  placeholder="Ask BIRD AI anything…"
                  rows={1}
                  maxLength={MAX_INPUT_LENGTH}
                  className={`
                    w-full resize-none rounded-xl border border-[#C9A84C]/20
                    bg-[#011a12] px-3.5 py-2.5
                    text-sm text-[#ecfdf5] placeholder-[#64748b]
                    transition-all duration-200
                    focus:border-[#C9A84C]/60 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20
                    disabled:opacity-50 disabled:cursor-not-allowed
                    leading-relaxed
                  `}
                  style={{ minHeight: "40px", maxHeight: "120px" }}
                  disabled={isLoading}
                  aria-label="Message input"
                />
                {/* Character counter */}
                <div className="absolute bottom-1 right-2 text-[10px] text-[#64748b] tabular-nums pointer-events-none">
                  {input.length}/{MAX_INPUT_LENGTH}
                </div>
              </div>

              {/* Send button */}
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className={`
                  flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
                  bg-gradient-to-br from-[#C9A84C] to-[#B8942E]
                  text-[#011a12] shadow-md shadow-[#C9A84C]/20
                  transition-all duration-200
                  hover:from-[#E8C560] hover:to-[#C9A84C] hover:shadow-lg hover:shadow-[#C9A84C]/30 hover:scale-105
                  active:scale-95
                  disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
                  cursor-pointer
                `}
              >
                {isLoading ? (
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>

            {/* Keyboard hint */}
            <div className="mt-1.5 flex items-center justify-between">
              <p className="text-[10px] text-[#64748b]">
                <kbd className="rounded border border-[#C9A84C]/20 bg-[#011a12] px-1 py-0.5 font-mono text-[9px text-[#64748b]">
                  Enter
                </kbd>{" "}
                to send{" "}
                <kbd className="rounded border border-[#C9A84C]/20 bg-[#011a12] px-1 py-0.5 font-mono text-[9px text-[#64748b]">
                  Shift + Enter
                </kbd>{" "}
                for new line
              </p>
              <p className="text-[10px] text-[#64748b]">
                <kbd className="rounded border border-[#C9A84C]/20 bg-[#011a12] px-1 py-0.5 font-mono text-[9px text-[#64748b]">
                  /
                </kbd>{" "}
                focus{" "}
                <kbd className="rounded border border-[#C9A84C]/20 bg-[#011a12] px-1 py-0.5 font-mono text-[9px text-[#64748b]">
                  Esc
                </kbd>{" "}
                close
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BirdAIFloatingWidget;
