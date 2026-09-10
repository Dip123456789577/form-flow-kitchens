import { Bot, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type Message = { role: "assistant" | "user"; text: string };
const greeting = "Hi! I'm your kitchen renovation assistant. I can help you explore renovation options, understand our process, and prepare for a consultation.";
const suggestions = ["How much does a kitchen renovation cost?", "How long does a renovation take?", "What services do you offer?", "Can you help design my kitchen?", "How do I book a consultation?"];

function getResponse(input: string) {
  const text = input.toLowerCase();
  if (text.includes("cost") || text.includes("budget")) return "Kitchen costs vary with size, layout changes, cabinetry and materials. As a planning guide, full renovations often begin around $30,000, while highly custom projects can be considerably more. A consultation helps us give you a realistic range.";
  if (text.includes("long") || text.includes("time")) return "Most complete kitchen renovations take 8–14 weeks on site after design and ordering. Custom cabinetry and permitting affect the schedule, so we build a clear project plan before work begins.";
  if (text.includes("service")) return "We handle complete renovations, design, custom cabinetry, surfaces, lighting, flooring, fixtures and full project management—all coordinated by one dedicated team.";
  if (text.includes("design")) return "Yes. We begin with how you use the room, then develop the layout, storage, lighting, materials and details into one cohesive design.";
  if (text.includes("book") || text.includes("consult")) return "You can book a free consultation from any page. Share a few project details and our studio will follow up to arrange a convenient conversation.";
  return "That’s a helpful place to start. Our team can talk through your priorities, layout and likely investment during a free consultation. Would you like to know about timing, services or the first design meeting?";
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", text: greeting }]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (open) inputRef.current?.focus(); }, [open, typing]);
  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, typing]);

  const send = (text: string) => {
    const clean = text.trim().slice(0, 500);
    if (!clean || typing) return;
    setMessages((current) => [...current, { role: "user", text: clean }]);
    setInput(""); setTyping(true);
    window.setTimeout(() => { setMessages((current) => [...current, { role: "assistant", text: getResponse(clean) }]); setTyping(false); }, 650);
  };

  return <div className="fixed bottom-5 right-5 z-[70] sm:bottom-7 sm:right-7">
    {open && <section className="chat-window" aria-label="Kitchen assistant" aria-live="polite">
      <header className="flex items-center justify-between border-b border-border px-5 py-4"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center bg-primary text-primary-foreground"><Bot size={18} /></span><div><p className="text-sm font-semibold">Kitchen Assistant</p><p className="text-xs text-muted-foreground">FORMA Studio</p></div></div><Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close kitchen assistant"><X size={18} /></Button></header>
      <div className="h-[360px] overflow-y-auto px-4 py-5 sm:h-[390px]">
        <div className="space-y-4">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={message.role === "user" ? "ml-auto max-w-[86%] bg-primary px-4 py-3 text-sm leading-6 text-primary-foreground" : "max-w-[92%] text-sm leading-6 text-foreground"}>{message.text}</div>)}{typing && <p className="text-sm italic text-muted-foreground">Thinking…</p>}<div ref={bottomRef} /></div>
        {messages.length === 1 && <div className="mt-6 flex flex-wrap gap-2">{suggestions.map((question) => <button key={question} className="border border-border bg-muted/50 px-3 py-2 text-left text-xs leading-5 transition-colors hover:border-accent" onClick={() => send(question)}>{question}</button>)}</div>}
      </div>
      <form className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 border-t border-border p-3" onSubmit={(event) => { event.preventDefault(); send(input); }}><input ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} maxLength={500} placeholder="Ask about your renovation…" className="min-w-0 border border-input bg-background px-3 text-sm outline-none focus:border-ring" aria-label="Message" /><Button size="icon" disabled={!input.trim() || typing} aria-label="Send message"><Send size={17} /></Button></form>
    </section>}
    <div className="group relative ml-auto mt-3 w-fit"><span className="chat-tooltip">Ask our Kitchen Assistant</span><Button size="icon" className="h-14 w-14 rounded-full shadow-xl" onClick={() => setOpen((value) => !value)} aria-label="Ask our Kitchen Assistant">{open ? <X /> : <MessageCircle />}</Button></div>
  </div>;
}