import { Link } from "@tanstack/react-router";
import {
  Bot,
  Calendar,
  ChevronRight,
  CornerDownLeft,
  MessageCircle,
  RotateCcw,
  Send,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type Message = {
  role: "assistant" | "user";
  text: string;
  action?: { label: string; to: string } | undefined;
};

const INITIAL_GREETING =
  "Hi! I'm your kitchen renovation assistant. I can help you explore renovation options, understand our process, and prepare for a consultation.";

const SUGGESTED_QUESTIONS = [
  "How much does a kitchen renovation cost?",
  "How long does a renovation take?",
  "What services do you offer?",
  "Can you help design my kitchen?",
  "How do I book a consultation?",
];

function getAssistantResponse(input: string): {
  text: string;
  action?: { label: string; to: string };
} {
  const query = input.toLowerCase();

  if (
    query.includes("cost") ||
    query.includes("budget") ||
    query.includes("price") ||
    query.includes("estimate")
  ) {
    return {
      text: "Kitchen renovations typically range depending on layout modifications, cabinetry craftsmanship, and surface selections. Most comprehensive transformations begin around $30,000, while larger architectural overhauls with custom marble and bespoke joinery range from $50,000+. We provide transparent, itemized fixed-price proposals during your free consultation.",
      action: { label: "Schedule Budget Consultation", to: "/contact" },
    };
  }

  if (
    query.includes("long") ||
    query.includes("time") ||
    query.includes("schedule") ||
    query.includes("duration") ||
    query.includes("weeks")
  ) {
    return {
      text: "On average, a full kitchen renovation takes 8 to 12 weeks of active on-site work following design sign-off and material procurement. Because we manufacture custom millwork and pre-order all slabs and fixtures before demolition, site disruption is minimized.",
      action: { label: "Review Our 4-Step Process", to: "/#process" },
    };
  }

  if (
    query.includes("service") ||
    query.includes("offer") ||
    query.includes("cabinet") ||
    query.includes("countertop")
  ) {
    return {
      text: "FORMA provides end-to-end service: Architectural Kitchen Design, Custom Dovetail Cabinetry, Natural Stone & Quartz Slabs, Lighting & Electrical Layouts, Flooring & Tile, and Full On-Site Project Management. You have one accountable team throughout.",
      action: { label: "Explore Our Full Services", to: "/#services" },
    };
  }

  if (
    query.includes("design") ||
    query.includes("architect") ||
    query.includes("layout") ||
    query.includes("style")
  ) {
    return {
      text: "Yes, absolutely. Our design team starts by studying how your family lives, cooks, and gathers. We generate 3D architectural renders, elevation drawings, and physical material palettes before any construction begins.",
      action: { label: "Explore Our Design Philosophy", to: "/about" },
    };
  }

  if (
    query.includes("book") ||
    query.includes("consult") ||
    query.includes("contact") ||
    query.includes("meeting")
  ) {
    return {
      text: "Booking a consultation is free and straightforward! Simply share a few details about your home and goals on our contact page, and our senior design director will contact you to schedule an on-site walkthrough.",
      action: { label: "Book Free Consultation", to: "/contact" },
    };
  }

  if (query.includes("material") || query.includes("stone") || query.includes("wood")) {
    return {
      text: "We work with rift-cut and quarter-sawn white oak, walnut, Calacatta and Carrara marble, resilient quartzite, and hand-forged solid brass hardware. All finishes are selected for both timeless aesthetics and enduring durability.",
    };
  }

  return {
    text: "Thank you for reaching out! Every kitchen project is unique. Our studio team would be glad to discuss your specific home layout, materials, and vision during a complimentary consultation.",
    action: { label: "Request Free Consultation", to: "/contact" },
  };
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: INITIAL_GREETING },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isTyping) return;

    setMessages((prev) => [...prev, { role: "user", text: query }]);
    setInputValue("");
    setIsTyping(true);

    // Simulate intelligent assistant response delay
    window.setTimeout(() => {
      const response = getAssistantResponse(query);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: response.text,
          action: response.action,
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  const handleResetChat = () => {
    setMessages([{ role: "assistant", text: INITIAL_GREETING }]);
    setInputValue("");
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-8 sm:right-8">
      {/* Expanded Chat Panel */}
      {isOpen && (
        <section
          className="chat-window border border-border bg-card shadow-2xl rounded-xs flex flex-col"
          aria-label="FORMA Kitchen Renovation Assistant"
          aria-live="polite"
        >
          {/* Header */}
          <header className="flex items-center justify-between border-b border-border bg-surface px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Bot size={18} className="text-accent" />
              </span>
              <div>
                <p className="text-sm font-semibold tracking-wide text-foreground">
                  Kitchen Assistant
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                    FORMA Studio Online
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-xs hover:bg-background/80"
                title="Restart conversation"
                aria-label="Restart conversation"
              >
                <RotateCcw size={15} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-xs hover:bg-background/80"
                aria-label="Close assistant"
              >
                <X size={18} />
              </button>
            </div>
          </header>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[380px] sm:max-h-[420px] bg-background">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="flex h-7 w-7 shrink-0 select-none items-center justify-center rounded-full bg-surface border border-border text-accent text-xs">
                    <Bot size={13} />
                  </div>
                )}
                <div
                  className={`rounded-xs p-3.5 text-xs sm:text-sm leading-relaxed max-w-[85%] ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground border border-primary"
                      : "bg-surface text-foreground border border-border"
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.action && (
                    <div className="mt-3 pt-2.5 border-t border-border/70">
                      <Link
                        to={msg.action.to}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent hover:underline"
                      >
                        <span>{msg.action.label}</span>
                        <ChevronRight size={13} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 justify-start">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface border border-border text-accent text-xs">
                  <Bot size={13} />
                </div>
                <div className="rounded-xs p-3.5 bg-surface text-muted-foreground border border-border flex items-center gap-1.5">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-accent animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-accent animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-accent animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            )}

            {/* Quick Suggestion Chips (when only greeting is present) */}
            {messages.length === 1 && !isTyping && (
              <div className="pt-2">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                  Suggested Questions:
                </p>
                <div className="flex flex-col gap-1.5">
                  {SUGGESTED_QUESTIONS.map((question) => (
                    <button
                      key={question}
                      onClick={() => handleSendMessage(question)}
                      className="text-left text-xs text-foreground bg-surface hover:bg-stone/50 border border-border px-3 py-2 rounded-xs transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="border-t border-border bg-surface p-3 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about design, pricing, timing..."
              className="flex-1 bg-background border border-border px-3.5 py-2 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent rounded-xs"
              maxLength={400}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send message"
              className="h-9 w-9 shrink-0 flex items-center justify-center rounded-xs bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition-opacity"
            >
              <Send size={15} />
            </button>
          </form>
        </section>
      )}

      {/* Floating Launcher Trigger */}
      <div className="group relative">
        <span className="chat-tooltip">Ask our Kitchen Assistant</span>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-13 w-13 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl border border-accent/40 hover:scale-105 active:scale-95 transition-all duration-200"
          aria-label={isOpen ? "Close Kitchen Assistant" : "Open Kitchen Assistant"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <MessageCircle size={22} className="text-accent" />}
        </button>
      </div>
    </div>
  );
}
