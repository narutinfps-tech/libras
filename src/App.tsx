import React, { useState, useEffect } from "react";
import { 
  Check, 
  HelpCircle, 
  BookOpen, 
  Sparkles, 
  Printer, 
  Award, 
  ChevronDown, 
  AlertTriangle, 
  Clock, 
  ArrowRight, 
  Flame, 
  CheckCircle2, 
  Info, 
  Download, 
  Heart,
  FileDown,
  Star
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PAIN_CARDS, BENEFITS, MATERIAL_BLOCKS, TESTIMONIALS, FAQ_ITEMS } from "./data";
import { CheckoutModal } from "./components/CheckoutModal";

// Import the generated high-quality asset
// @ts-ignore
import mockupUrl from "./assets/images/libras_worksheets_mockup_1781975432427.jpg";

interface NotificationItem {
  id: number;
  message: string;
  sub: string;
  time: string;
}

const PURCHASE_NOTIFICATIONS: NotificationItem[] = [
  { id: 1, message: "Juliana S. (São Paulo)", sub: "Adquiriu o Kit Completo + 3 Bônus 🏆", time: "agora mesmo" },
  { id: 2, message: "Profa. Cláudia M.", sub: "Adquiriu o Kit Essencial para sua turma! 🎒", time: "há 2 min" },
  { id: 3, message: "Ana Beatriz (Porto Alegre)", sub: "Garantiu o Kit Premium com desconto! ✨", time: "há 1 min" },
  { id: 4, message: "Lucas Rodrigues", sub: "Adquiriu o Kit Completo + 3 Bônus 🏆", time: "há 3 min" },
  { id: 5, message: "Profa. Sandra S. (Rio de Janeiro)", sub: "Adquiriu o Kit Completo + 3 Bônus! 🌟", time: "há 5 min" },
  { id: 6, message: "Mariana F. (Salvador)", sub: "Adquiriu o Kit Essencial 🎒", time: "há 4 min" },
  { id: 7, message: "Profa. Patrícia (Belo Horizonte)", sub: "Adquiriu o Kit Completo + 3 Bônus! 🏆", time: "há 1 min" },
  { id: 8, message: "Renata A. (Curitiba)", sub: "Garantiu o Kit Premium com desconto! ✨", time: "agora mesmo" },
  { id: 9, message: "Gisela O. (Florianópolis)", sub: "Baixou o material e amou a didática! ❤️", time: "há 6 min" }
];

const CAROUSEL_ROW_1 = [
  "https://i.ibb.co/RTmdq25z/Chat-GPT-Image-20-de-jun-de-2026-15-11-48-9.png",
  "https://i.ibb.co/cj2MbFn/Chat-GPT-Image-20-de-jun-de-2026-15-11-47-7.png",
  "https://i.ibb.co/PsJQSj8t/Chat-GPT-Image-20-de-jun-de-2026-15-11-45-5.png",
  "https://i.ibb.co/5X3zJv1L/Chat-GPT-Image-20-de-jun-de-2026-15-11-45-4.png",
  "https://i.ibb.co/XfPP33fN/Chat-GPT-Image-20-de-jun-de-2026-15-11-44-3.png",
  "https://i.ibb.co/67B6THDP/Chat-GPT-Image-20-de-jun-de-2026-15-11-41-10.png",
  "https://i.ibb.co/35J6cKhj/Chat-GPT-Image-20-de-jun-de-2026-15-11-40-8.png"
];

const CAROUSEL_ROW_2 = [
  "https://i.ibb.co/r2PtcFDc/Chat-GPT-Image-20-de-jun-de-2026-15-11-48-10.png",
  "https://i.ibb.co/MkhktJwN/Chat-GPT-Image-20-de-jun-de-2026-15-11-47-8.png",
  "https://i.ibb.co/Cs1WmMvN/Chat-GPT-Image-20-de-jun-de-2026-15-11-46-6.png",
  "https://i.ibb.co/q3XbqT3r/Chat-GPT-Image-20-de-jun-de-2026-15-11-44-2.png",
  "https://i.ibb.co/S7c41TL9/Chat-GPT-Image-20-de-jun-de-2026-15-11-44-1.png",
  "https://i.ibb.co/1GSZWr9S/Chat-GPT-Image-20-de-jun-de-2026-15-11-41-9.png"
];

const CAROUSEL_ROW_3 = [
  "https://i.ibb.co/67B6THDP/Chat-GPT-Image-20-de-jun-de-2026-15-11-41-10.png",
  "https://i.ibb.co/1GSZWr9S/Chat-GPT-Image-20-de-jun-de-2026-15-11-41-9.png",
  "https://i.ibb.co/35J6cKhj/Chat-GPT-Image-20-de-jun-de-2026-15-11-40-8.png",
  "https://i.ibb.co/R4NJ87Fc/Chat-GPT-Image-20-de-jun-de-2026-15-11-38-5.png",
  "https://i.ibb.co/KcRQ0LzW/Chat-GPT-Image-20-de-jun-de-2026-15-11-39-6.png",
  "https://i.ibb.co/gM97j0gN/Chat-GPT-Image-20-de-jun-de-2026-15-11-40-7.png",
  "https://i.ibb.co/WWMGXbhB/Chat-GPT-Image-20-de-jun-de-2026-15-11-38-4.png",
  "https://i.ibb.co/KzQQLsXJ/Chat-GPT-Image-20-de-jun-de-2026-15-11-37-3.png",
  "https://i.ibb.co/B22d4SrZ/Chat-GPT-Image-20-de-jun-de-2026-15-11-36-2.png",
  "https://i.ibb.co/DPkCLdTc/Chat-GPT-Image-20-de-jun-de-2026-15-11-36-1.png"
];

export default function App() {
  const [checkoutPrice, setCheckoutPrice] = useState<number>(37.90);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [activeNotification, setActiveNotification] = useState<NotificationItem | null>(null);

  // Monitor scroll state for floating badge
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 550) {
        setScrolledPastHero(true);
      } else {
        setScrolledPastHero(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set interval to trigger notification loops
  useEffect(() => {
    // Show first after 5s
    const firstTimeout = setTimeout(() => {
      setActiveNotification(PURCHASE_NOTIFICATIONS[0]);
    }, 5000);

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * PURCHASE_NOTIFICATIONS.length);
      setActiveNotification(PURCHASE_NOTIFICATIONS[randomIndex]);
    }, 16000);

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, []);

  // Dismiss current notification after 5.5s
  useEffect(() => {
    if (activeNotification) {
      const dismissTimeout = setTimeout(() => {
        setActiveNotification(null);
      }, 5500);
      return () => clearTimeout(dismissTimeout);
    }
  }, [activeNotification]);

  const openCheckout = (price: number = 37.90) => {
    setCheckoutPrice(price);
    setIsCheckoutOpen(true);
    // Disparar evento de Pixel do Facebook (InitiateCheckout)
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        value: price,
        currency: 'BRL',
        content_name: 'Kit Atividades Libras',
        content_category: 'Educacional'
      });
    }
  };

  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleFaq = (id: string) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-purple-200 selection:text-purple-900 scroll-smooth relative">
      
      {/* Top Right Floating Live Purchase Alerts */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-[230px] sm:max-w-[250px] w-full">
        <AnimatePresence>
          {activeNotification && (
            <motion.div
              layout
              initial={{ opacity: 0, x: 80, y: -20, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.92, transition: { duration: 0.25 } }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              onClick={scrollToPricing}
              className="bg-white/95 backdrop-blur-md rounded-xl p-2 border border-amber-300 shadow-lg pointer-events-auto cursor-pointer hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              <div className="p-1 bg-amber-50 rounded-lg text-amber-600 shrink-0 animate-pulse">
                <Sparkles className="w-3.5 h-3.5 fill-amber-500" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-[10px] font-extrabold text-slate-900 leading-none truncate">
                  {activeNotification.message}
                </p>
                <p className="text-[9.5px] text-slate-600 leading-tight mt-0.5 break-words">
                  {activeNotification.sub}
                  <span className="text-[8.5px] text-slate-400 font-mono ml-1.5 whitespace-nowrap">• {activeNotification.time}</span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Top School Ribbon with Urgency Banner */}
      <div className="bg-gradient-to-r from-rose-600 via-purple-600 to-blue-600 text-white py-2.5 px-4 text-center text-[11px] sm:text-xs font-black tracking-wide relative z-50 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap shadow-sm">
        <span className="bg-white text-rose-700 text-[9px] px-2 py-0.5 rounded-full uppercase font-black tracking-widest leading-none shrink-0 animate-pulse">
          ATENÇÃO
        </span>
        <span>PROMOÇÃO ATIVA: Garanta seu kit pedagógico com desconto antes da virada de lote! ⏳</span>
      </div>



      {/* SECTION 1: HERO */}
      <header className="relative bg-white pt-6 pb-16 md:py-24 overflow-hidden border-b border-sky-100">
        {/* Subtle colorful geometric glow filters */}
        <div className="absolute top-1/4 -left-12 w-64 h-64 bg-yellow-200/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 -right-12 w-64 h-64 bg-purple-200/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-10 right-1/4 w-32 h-32 bg-emerald-100/50 rounded-full blur-2xl pointer-events-none"></div>
        
        {/* Header navigation element */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎒</span>
            <div className="text-left">
              <h1 className="text-sm font-black text-sky-950 uppercase tracking-widest">Atividades Libras</h1>
              <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider block">Material Pedagógico</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4 bg-sky-50 px-4 py-2 rounded-full border border-sky-100">
            <span className="text-xs text-sky-950 font-bold flex items-center gap-1.5">
              <Printer className="w-3.5 h-3.5 text-sky-600" /> Formato A4 pronto para imprimir
            </span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center flex flex-col items-center">
            
            {/* Hero Content */}
            <div className="space-y-6 text-center flex flex-col items-center">
              {/* Highlight ribbon */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100/60 border border-amber-200 text-amber-950 text-xs font-bold mx-auto">
                <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500" />
                Alfabeto Datilológico Completo em PDF
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold text-sky-950 tracking-tight leading-tight select-none">
                Atividades Prontas para Ensinar Libras de Forma <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-rose-600">Visual, Simples e Divertida</span>
              </h2>

              <p className="text-lg font-semibold text-slate-800 leading-relaxed max-w-2xl mx-auto">
                Um material pedagógico em PDF com atividades do alfabeto manual em Libras, pronto para imprimir e aplicar em sala de aula.
              </p>

              <div className="w-full max-w-3xl mx-auto my-4 hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden">
                <img 
                  src="https://i.ibb.co/GQCT5C70/Chat-GPT-Image-20-de-jun-de-2026-15-07-29.png" 
                  alt="Amostra das Atividades de Libras" 
                  className="w-full h-auto select-none rounded-2xl"
                  referrerPolicy="no-referrer"
                  decoding="async"
                  // @ts-ignore
                  fetchPriority="high"
                />
              </div>

              <div className="p-4 bg-sky-50/70 border-b-4 lg:border-l-4 lg:border-b-0 border-blue-500 rounded-xl text-center w-full max-w-2xl mx-auto">
                <p className="text-sm text-slate-700 font-medium">
                  Ideal para professores, pedagogas, profissionais do AEE e educadores que desejam trabalhar Libras com os alunos de maneira prática, organizada e visual.
                </p>
              </div>

              {/* Call to action components */}
              <div className="space-y-4 pt-2 w-full flex flex-col items-center">
                <button
                  onClick={scrollToPricing}
                  className="px-8 py-4.5 bg-rose-600 hover:bg-rose-700 text-white font-black text-base md:text-lg rounded-2xl shadow-xl hover:shadow-rose-300 hover:scale-101 transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                >
                  Quero acessar agora
                </button>
                <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 flex-wrap justify-center">
                  <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-500" /> Acesso imediato</span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-500" /> Material em PDF</span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-500" /> Pronto para imprimir</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* INFINITE CAROUSEL SECTION */}
      <section id="preview-samples-carousel" className="py-12 bg-white border-b border-sky-100 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 text-center">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest flex items-center justify-center gap-1 mb-2">
            <BookOpen className="w-4 h-4 text-blue-500" /> Material por Dentro
          </span>
          <h3 id="carousel-title" className="text-2xl md:text-3xl font-extrabold text-sky-950 tracking-tight">
            Veja uma Amostra das Nossas Atividades
          </h3>
          <p id="carousel-subtitle" className="text-sm text-slate-500 mt-2 max-w-2xl mx-auto">
            Mais de 100 páginas ilustradas com o alfabeto manual em Libras, prontas para imprimir e trabalhar de forma super divertida!
          </p>
        </div>

        {/* Carousel Tracks */}
        <div className="flex flex-col gap-6 md:gap-8 overflow-hidden py-2 relative select-none">
          {/* Track 1: Moving Left */}
          <div className="overflow-hidden w-full relative">
            <div className="animate-marquee-left gap-4 md:gap-6">
              {[...CAROUSEL_ROW_1, ...CAROUSEL_ROW_1].map((src, index) => (
                <img
                  key={`row1-${index}`}
                  src={src}
                  alt="Atividade Pedagógica de Libras"
                  className="h-44 sm:h-56 md:h-64 lg:h-72 w-auto object-contain rounded-2xl shadow-md pointer-events-none hover:shadow-lg transition-all duration-300 transform-gpu"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          </div>

          {/* Track 2: Moving Right */}
          <div className="overflow-hidden w-full relative">
            <div className="animate-marquee-right gap-4 md:gap-6">
              {[...CAROUSEL_ROW_2, ...CAROUSEL_ROW_2].map((src, index) => (
                <img
                  key={`row2-${index}`}
                  src={src}
                  alt="Atividade Pedagógica de Libras"
                  className="h-44 sm:h-56 md:h-64 lg:h-72 w-auto object-contain rounded-2xl shadow-md pointer-events-none hover:shadow-lg transition-all duration-300 transform-gpu"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: DORES (PAIN POINTS) */}
      <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
        {/* Creative pencil indicators in borders */}
        <div className="absolute -top-6 left-1/3 opacity-25">✏️</div>
        <div className="absolute -bottom-6 right-1/4 opacity-25">🎨</div>

        <div className="max-w-5xl mx-auto px-4 md:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-widest flex items-center justify-center gap-1">
              <AlertTriangle className="w-4 h-4 text-rose-500" /> A realidade de muitos educadores
            </span>
            <h3 className="text-2xl md:text-4xl font-extrabold text-sky-950 tracking-tight">
              Você quer trabalhar Libras com seus alunos, mas não tem tempo para criar atividades do zero?
            </h3>
            <div className="bg-amber-100 h-1.5 w-24 mx-auto rounded-full mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-16">
            <div className="text-left space-y-4">
              <p className="text-base text-slate-700 leading-relaxed font-normal">
                Muitos professores sabem da importância de incluir Libras na rotina escolar, mas na prática acabam enfrentando dificuldades como <strong>falta de tempo, falta de material visual, insegurança para montar atividades</strong> e pouca variedade de recursos prontos para aplicar.
              </p>
              <p className="text-base text-slate-700 leading-relaxed font-normal">
                Criar tudo do zero pode tomar horas. Pensar nas atividades, organizar o layout, preparar o PDF, deixar tudo bonito e pronto para impressão exige tempo que o professor muitas vezes não tem.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border-2 border-red-100 shadow-md flex items-start gap-4">
              <div className="p-3 bg-rose-50 rounded-xl text-rose-600 shrink-0">
                <Clock className="w-6 h-6 animate-pulse" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-rose-950">Mais de 4 horas por semana...</p>
                <p className="text-xs text-slate-600 mt-1">
                  É o tempo estimado que professores gastam apenas procurando na internet, adaptando, cortando e tentando diagramar materiais de Libras que fiquem nítidos adicionando hand signs manuais.
                </p>
              </div>
            </div>
          </div>

          {/* Cards of pain */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PAIN_CARDS.map((card, i) => (
              <div 
                key={card.id}
                className="bg-white p-6 rounded-2xl border-t-4 border-t-rose-500 border-2 border-slate-100 shadow-sm text-center flex flex-col items-center hover:shadow-md transition-all group hover:-translate-y-1 duration-200"
              >
                <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 font-bold text-xs flex items-center justify-center mb-4 group-hover:bg-rose-500 group-hover:text-white transition-all">
                  {i + 1}
                </div>
                <h4 className="text-sm font-extrabold text-slate-800 leading-tight mb-2 group-hover:text-rose-600 transition-colors">
                  {card.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 3: SOLUÇÃO (THE SOLUTION) */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden border-t border-b border-sky-100">
        <div className="absolute top-10 right-10 opacity-30 text-sky-300">
          <Printer className="w-20 h-20" />
        </div>
        
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Solution Left graphic */}
            <div className="lg:col-span-5 text-left order-last lg:order-first">
              <div className="bg-gradient-to-tr from-sky-400 to-emerald-300 p-1.5 rounded-3xl shadow-xl max-w-sm mx-auto">
                <div className="bg-white p-6 rounded-2xl text-slate-800 space-y-6">
                  
                  {/* Visual list of guarantees */}
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🖨️</span>
                    <div>
                      <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">Apenas Imprimir</h4>
                      <p className="text-xs text-slate-500">Material pronto formatado em A4.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-3xl">💡</span>
                    <div>
                      <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">Metodologia Visual</h4>
                      <p className="text-xs text-slate-500">Imagens limpas de alta qualidade.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-3xl">⏳</span>
                    <div>
                      <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">Economia de Tempo</h4>
                      <p className="text-xs text-slate-500">Fichas prontas em 1 clique.</p>
                    </div>
                  </div>

                  {/* Micro simulated preview block */}
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between text-xs text-emerald-800 font-bold">
                    <span>Liberação Imediata</span>
                    <span className="bg-emerald-600 text-white font-black text-[9px] uppercase px-2 py-0.5 rounded-full">PDF 100% Organizado</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution Right details */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
              <span className="text-xs font-bold text-sky-600 uppercase tracking-widest flex items-center gap-1 justify-center lg:justify-start">
                <Award className="w-4 h-4 text-sky-500" /> Pedagogia Inclusiva Prática
              </span>
              <h3 className="text-3xl md:text-4xl font-extrabold text-sky-950 tracking-tight leading-tight text-center lg:text-left">
                Um kit pronto para facilitar suas aulas de Libras
              </h3>
              
              <div className="space-y-4 text-center lg:text-left">
                <p className="text-base text-slate-600 leading-relaxed font-normal">
                  O material <strong>Atividades Prontas para Ensinar Libras</strong> foi criado para ajudar professores a trabalharem o alfabeto manual em Libras com atividades visuais, organizadas e prontas para impressão.
                </p>
                <p className="text-base text-slate-600 leading-relaxed font-normal">
                  Você recebe páginas em formato A4, com propostas variadas para observar, ligar, circular, completar, recortar, colar, revisar e praticar as letras do alfabeto manual.
                </p>
              </div>

              {/* Benefits checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 w-full text-center lg:text-left">
                {BENEFITS.map((benefit) => (
                  <div key={benefit.id} className="flex flex-col items-center lg:items-start lg:flex-row gap-3">
                    <div className="p-1 bg-emerald-100 rounded-full text-emerald-600 shrink-0 h-fit">
                      <Check className="w-4 h-4" />
                    </div>
                    <div className="text-center lg:text-left">
                      <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">{benefit.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECOND CAROUSEL: SINGLE ROW (INFINITE) WITHOUT A TITLE */}
      <section className="py-8 bg-white border-b border-sky-100 overflow-hidden relative select-none">
        <div className="flex overflow-hidden py-2 relative">
          <div className="overflow-hidden w-full relative">
            <div className="animate-marquee-left gap-4 md:gap-6">
              {[...CAROUSEL_ROW_3, ...CAROUSEL_ROW_3].map((src, index) => (
                <img
                  key={`row3-${index}`}
                  src={src}
                  alt="Mais Atividades de Libras"
                  className="h-44 sm:h-56 md:h-64 lg:h-72 w-auto object-contain rounded-2xl shadow-md pointer-events-none hover:shadow-lg transition-all duration-300 transform-gpu"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: O QUE VEM NO MATERIAL (WHAT IS INCLUDED) */}
      <section className="py-16 md:py-24 bg-slate-50 relative">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest bg-white py-1 px-3.5 rounded-full shadow-sm inline-block">
              Por Dentro do Kit Pedagógico
            </span>
            <h3 className="text-2xl md:text-4xl font-extrabold text-sky-950 tracking-tight">
              O que você vai receber ao garantir sua cópia hoje
            </h3>
            <p className="text-sm text-slate-500">
              Cada seção do PDF foi planejada obedecendo uma ordem pedagógica de retenção e assimilação cognitiva.
            </p>
          </div>

          {/* Grid layout for blocks of content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MATERIAL_BLOCKS.map((block, i) => {
              // Custom pastel colors to create colorful playful design
              const colors = [
                "border-sky-200 bg-sky-50 text-sky-900 group-hover:bg-sky-600",
                "border-purple-200 bg-purple-50 text-purple-900 group-hover:bg-purple-600",
                "border-emerald-200 bg-emerald-50 text-emerald-900 group-hover:bg-emerald-600",
                "border-amber-200 bg-amber-50 text-amber-900 group-hover:bg-amber-600",
                "border-rose-200 bg-rose-50 text-rose-900 group-hover:bg-rose-600",
                "border-indigo-200 bg-indigo-50 text-indigo-900 group-hover:bg-indigo-600",
              ];
              const borderTheme = colors[i % colors.length];

              return (
                <div 
                  key={block.id}
                  className="bg-white rounded-2xl border-2 border-slate-100 p-6 text-left relative group hover:border-slate-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Badge header */}
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-xs font-extrabold text-slate-400 font-mono">0{i + 1}.</span>
                      <span className="text-[10px] font-bold text-gray-500 bg-slate-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {block.badge}
                      </span>
                    </div>

                    <h4 className="text-sm font-extrabold text-sky-950 leading-snug">
                      {block.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {block.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-50 flex items-center justify-between text-[11px] text-gray-400">
                    <span className="flex items-center gap-1 font-semibold"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Pronta para uso</span>
                    <span className="font-mono text-[10px]">A4 Premium Layout</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION: EXCLUSIVE BONUSES (BÔNUS EXCLUSIVOS) */}
      <section className="py-20 bg-slate-100 border-b border-sky-100 relative overflow-hidden">
        {/* Playful background detail */}
        <div className="absolute top-10 left-10 w-48 h-48 bg-sky-200/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black text-rose-600 uppercase tracking-widest bg-rose-50 border border-rose-100 py-1.5 px-4 rounded-full inline-flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" /> Presentes Especiais Para Você
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-sky-950 tracking-tight leading-tight">
              Bônus Exclusivos Inteiramente Gratuitos
            </h3>
            <p className="text-sm text-slate-600">
              Garantindo sua cópia do material principal hoje, você também recebe acesso imediato a estes três complementos lúdicos imperdíveis:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* BONUS CARD 1: Alfabeto em Libras Ilustrado */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="p-5 bg-slate-50 border-b border-slate-100 flex justify-center items-center overflow-hidden">
                <div className="w-full h-full flex justify-center items-center rounded-[24px] bg-white shadow-md border border-slate-200/60 overflow-hidden">
                  <img 
                    src="https://i.ibb.co/MkTvcg9r/Chat-GPT-Image-20-de-jun-de-2026-15-33-13.png" 
                    alt="Bonus 1 - Alfabeto em Libras Ilustrado" 
                    className="h-52 sm:h-56 md:h-64 lg:h-72 w-full object-contain transform group-hover:scale-[1.04] transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              <div className="p-5 md:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[10px] font-extrabold text-white bg-gradient-to-r from-rose-500 to-amber-500 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                    SUPER BÔNUS 1 • GRÁTIS
                  </span>
                  <h4 className="text-base md:text-lg font-extrabold text-sky-950 leading-tight">
                    Alfabeto em Libras Ilustrado
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Um caderno visual exclusivo contendo as letras de A a Z ilustradas de forma lúdica e estimulante. Cada sinal em Libras vem acompanhado de um objeto associado e colorido para facilitar a retenção cognitiva da criança de maneira divertida. Perfeito para preencher murais da sala, preparar flashcards interativos de mesa ou fixação complementar!
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 font-bold text-rose-500"><Check className="w-4 h-4" /> Incluso no PDF</span>
                  <span className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded">Formato A4</span>
                </div>
              </div>
            </div>

            {/* BONUS CARD 2: Caça-Palavras em Libras */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="p-5 bg-slate-50 border-b border-slate-100 flex justify-center items-center overflow-hidden">
                <div className="w-full h-full flex justify-center items-center rounded-[24px] bg-white shadow-md border border-slate-200/60 overflow-hidden">
                  <img 
                    src="https://i.ibb.co/Q3m9YBVM/Chat-GPT-Image-20-de-jun-de-2026-15-26-56.png" 
                    alt="Bonus 2 - Caça-Palavras em Libras" 
                    className="h-52 sm:h-56 md:h-64 lg:h-72 w-full object-contain transform group-hover:scale-[1.04] transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              <div className="p-5 md:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[10px] font-extrabold text-white bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                    SUPER BÔNUS 2 • GRÁTIS
                  </span>
                  <h4 className="text-base md:text-lg font-extrabold text-sky-950 leading-tight">
                    Caça-Palavras Lúdico em Libras
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Fascinantes jogos de caça-palavras focados em desenvolver a percepção espacial, decodificação ágil do alfabeto manual e fixação de vocabulário básico. Uma dinâmica fantástica para preencher o fim das aulas, aplicar como tarefa de casa alegre, ou desafiar a memória de forma prazerosa sem as pressões de testes tradicionais.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 font-bold text-sky-500"><Check className="w-4 h-4" /> Incluso no PDF</span>
                  <span className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded">Pronto p/ Imprimir</span>
                </div>
              </div>
            </div>

            {/* BONUS CARD 3: Certificados de Amigo da Libras */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="p-5 bg-slate-50 border-b border-slate-100 flex justify-center items-center overflow-hidden">
                <div className="w-full h-full flex justify-center items-center rounded-[24px] bg-white shadow-md border border-slate-200/60 overflow-hidden">
                  <img 
                    src="https://i.ibb.co/n836WCdJ/Chat-GPT-Image-20-de-jun-de-2026-15-36-32.png" 
                    alt="Bonus 3 - Certificados de Incentivo" 
                    className="h-52 sm:h-56 md:h-64 lg:h-72 w-full object-contain transform group-hover:scale-[1.04] transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              <div className="p-5 md:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[10px] font-extrabold text-white bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                    SUPER BÔNUS 3 • GRÁTIS
                  </span>
                  <h4 className="text-base md:text-lg font-extrabold text-sky-950 leading-tight">
                    Certificados de Incentivo & Progresso
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Lindo conjunto de certificados coloridos e colecionáveis prontos para preencher e premiar as crianças pelo aprendizado e domínio do alfabeto manual em Libras! Uma maravilhosa ferramenta pedagógica para gerar orgulho, elevar o senso de conquista mútua de forma afetuosa e motivar os alunos a continuarem se dedicando.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 font-bold text-emerald-600"><Check className="w-4 h-4" /> Incluso no PDF</span>
                  <span className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded">Preenchível</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CARD DE OFERTA (PRICING & OFFERS) */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-indigo-950 via-sky-950 to-emerald-950 text-white relative overflow-hidden">
        
        {/* Colorful spheres under dark bg for premium glow */}
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">Escolha a Melhor Opção</span>
            <h3 className="text-2xl md:text-4xl font-extrabold text-white">Garante Hoje Seu Kit com Desconto Especial</h3>
            <p className="text-xs md:text-sm text-slate-300">Escolha o plano ideal para suas necessidades. Acesso imediato em PDF protegido e de alta qualidade!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
            
            {/* PLAN 1: KIT ESSENCIAL R$ 27,90 */}
            <div className="bg-white text-slate-800 rounded-3xl shadow-xl overflow-hidden border border-slate-200 relative flex flex-col justify-between transform hover:scale-[1.01] transition-all">
              <div>
                <div className="bg-slate-100 py-3 px-4 text-center font-bold text-xs uppercase tracking-wider text-slate-700">
                  Kit Essencial 🎒
                </div>
                
                <div className="p-6 md:p-8 space-y-6">
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-sky-950">Caderno de Atividades</h4>
                    <p className="text-xs text-slate-500 mt-1 font-medium">O caderno base do alfabeto manual e sinais.</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2.5">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">O que está incluído:</p>
                    <div className="space-y-2 text-xs">
                      {[
                        "Caderno completo com todas as letras A-Z",
                        "Exercícios com alfabeto manual em Libras",
                        "Recursos para escrita, traçado e pontilhado",
                        "Atividades divertidas de correspondência e ligar",
                        "Formato A4 em alta qualidade pronto para impressão",
                        "Download 100% imediato por e-mail"
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-2 font-medium text-slate-700">
                          <div className="p-0.5 bg-sky-100 rounded text-sky-700 shrink-0 mt-0.5">
                            <Check className="w-3 h-3" />
                          </div>
                          <span className="text-[11px] text-left leading-tight">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 pt-0 space-y-5">
                {/* Price block */}
                <div className="text-center py-2 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-400 line-through">Por R$ 47,00</span>
                  <div className="flex items-center justify-center gap-1 mt-0.5">
                    <span className="text-xl font-black text-slate-800">R$</span>
                    <span className="text-4xl font-black text-slate-800 tracking-tight">27,90</span>
                  </div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mt-1">Acesso único sem mensalidades</span>
                </div>

                <a
                  href="https://pay.wiapy.com/RUEhLkqCro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm py-3 px-6 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer leading-none text-center"
                >
                  Quero o Kit Essencial
                </a>
              </div>
            </div>

            {/* PLAN 2: KIT PREMIUM R$ 37,90 */}
            <div className="bg-white text-slate-800 rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-300 relative flex flex-col justify-between transform hover:scale-[1.01] transition-all">
              
              {/* Highlight ribbon */}
              <div className="absolute top-12 right-0 bg-rose-600 text-white font-black text-[9px] uppercase tracking-widest px-3 py-1 shadow-xs rounded-l-lg z-10 animate-pulse">
                🔥 Mais Vendido
              </div>

              <div>
                <div className="bg-gradient-to-r from-amber-400 to-amber-500 py-3 px-4 text-center font-bold text-xs uppercase tracking-wider text-sky-950 flex items-center justify-center gap-1">
                  <Sparkles className="w-4 h-4 fill-sky-950 animate-bounce" /> Kit Completo + 3 Bônus 🏆
                </div>
                
                <div className="p-6 md:p-8 space-y-6">
                  <div className="text-center flex flex-col items-center justify-center">
                    <img 
                      src="https://i.ibb.co/0b4pRCJ/Chat-GPT-Image-20-de-jun-de-2026-16-52-06.png" 
                      alt="Icone Premium" 
                      className="h-36 w-36 md:h-40 md:w-40 object-contain mb-3"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                    <h4 className="text-xl font-bold text-sky-950">Kit Premium Completo</h4>
                    <p className="text-xs text-slate-500 mt-1 font-medium">A experiência definitiva com suporte e material bônus.</p>
                  </div>

                  <div className="bg-amber-50/55 p-4 rounded-xl border border-amber-100 space-y-2.5">
                    <p className="text-[10px] font-black uppercase text-amber-800 tracking-wider">O que está incluído:</p>
                    <div className="space-y-2 text-xs">
                      {[
                        "Todo o Caderno Completo A-Z Essencial",
                        "BÔNUS 1: Alfabeto em Libras Ilustrado",
                        "BÔNUS 2: Caça-Palavras Lúdico em Libras",
                        "BÔNUS 3: Certificados de Incentivo & Progresso",
                        "Acesso vitalício e download ilimitado para impressão",
                        "Garantia de Satisfação de 7 dias ou seu dinheiro de volta",
                        "Suporte prioritário via WhatsApp"
                      ].map((item, index) => {
                        const isBonus = item.startsWith("BÔNUS") || item.includes("Garantia") || item.includes("vitalício") || item.includes("WhatsApp");
                        return (
                          <div key={index} className="flex items-start gap-2 font-medium text-slate-700">
                            <div className={`p-0.5 rounded shrink-0 mt-0.5 ${isBonus ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-600"}`}>
                              <Check className="w-3 h-3" />
                            </div>
                            <span className={`text-[11px] text-left leading-tight ${isBonus ? "font-bold text-slate-800" : ""}`}>{item}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 pt-0 space-y-5">
                {/* Price block */}
                <div className="text-center py-2 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-400 line-through">Por R$ 77,00</span>
                  <div className="flex items-center justify-center gap-1 mt-0.5">
                    <span className="text-2xl font-black text-slate-800">R$</span>
                    <span className="text-4xl font-black text-rose-600 tracking-tight">37,90</span>
                  </div>
                  <span className="text-[9px] text-amber-600 font-bold uppercase tracking-wider block mt-1">Melhor Custo-Benefício 💎</span>
                </div>

                <a
                  href="https://pay.wiapy.com/Kj4avUG-11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black text-sm py-3 px-6 rounded-2xl shadow-xl hover:shadow-rose-100 transition-all flex items-center justify-center gap-1.5 cursor-pointer leading-none text-center"
                >
                  Quero o Kit Premium Completo
                </a>
              </div>
            </div>

          </div>

          {/* Secure elements under cards */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400 font-semibold pt-12 max-w-xl mx-auto border-t border-sky-900/30 mt-12">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Pagamento criptografado e certificado seguro</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Garantia total de reembolso em 7 dias</span>
          </div>

        </div>
      </section>

      {/* SECTION 6: DEPOIMENTOS (TESTIMONIALS) */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1.5 rounded-full inline-block">
              Opinião de quem já comprou
            </span>
            <h3 className="text-2xl md:text-4xl font-extrabold text-sky-950 tracking-tight">
              Veja como esse material pode ajudar na rotina dos professores
            </h3>
            <p className="text-xs md:text-sm text-slate-500">Milhares de pedagogos e especialistas do Atendimento Especializado utilizam nossas fichas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((test) => (
              <div 
                key={test.id} 
                className="bg-slate-50 rounded-2xl p-6 md:p-8 text-left border border-slate-100 hover:border-slate-200 transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Floating quote indicator */}
                  <span className="text-4xl text-sky-200 font-serif leading-none">&ldquo;</span>
                  <p className="text-sm md:text-base text-slate-700 leading-relaxed font-normal -mt-2">
                    {test.quote}
                  </p>
                </div>
                
                <div className="flex items-center gap-3.5 mt-6 pt-6 border-t border-slate-200">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${test.avatarColor}`}>
                    {test.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-extrabold text-slate-800 leading-none">{test.name}</p>
                    <p className="text-[10px] text-sky-600 font-medium tracking-wide mt-1 uppercase">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 7: GARANTIA (7-DAY GUARANTEE) */}
      <section className="py-16 bg-slate-50 relative border-t border-b border-sky-100">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="bg-white rounded-3xl p-6 md:p-10 border-2 border-slate-100 shadow-xl flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 text-center md:text-left relative overflow-hidden">
            
            {/* Visual dynamic ribbon filter */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-bl-full opacity-20 pointer-events-none"></div>

            {/* 7-day Guarantee Stamp Image */}
            <div className="w-32 h-32 md:w-36 md:h-36 flex items-center justify-center shrink-0">
              <img 
                src="https://i.ibb.co/wVjVLvc/download.jpg" 
                alt="Garantia de 7 Dias" 
                className="w-full h-full object-contain mix-blend-multiply select-none"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="space-y-4 flex flex-col items-center md:items-start">
              <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full inline-block">
                COMPRA 100% SEGURA E RESPONSÁVEL
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-sky-950 tracking-tight leading-snug">
                Garantia Incondicional <span className="block sm:inline text-rose-600 whitespace-nowrap">de 7 dias</span>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Você pode acessar o material, conferir as páginas e ver se ele faz sentido para sua rotina. Caso não fique satisfeito, é possível solicitar o reembolso dentro do prazo de garantia de 7 dias.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl inline-flex items-center gap-2 border border-slate-100 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> A compra é simples, segura e totalmente sem risco.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 8: FAQ (ACCORDION INTERACTIVES) */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest bg-sky-50 px-3.5 py-1 rounded-full">
              Dúvidas frequentes
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-sky-950 tracking-tight">
              Ainda tem dúvidas? Nós respondemos:
            </h3>
            <p className="text-xs text-slate-500">Abra cada uma das guias abaixo para conferir as informações de entrega.</p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => {
              const isOpen = activeFaq === item.id;
              return (
                <div 
                  key={item.id}
                  className="bg-slate-50 rounded-2xl border-2 border-slate-100 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(item.id)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm md:text-base text-slate-800 hover:bg-slate-100/50 cursor-pointer"
                  >
                    <span>{item.question}</span>
                    <div className={`p-1 bg-white rounded-lg border border-slate-200 text-slate-500 transform transition-transform duration-200 ${isOpen ? "rotate-180 text-sky-600" : ""}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-5 pt-0 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-200/50 text-left bg-white font-normal">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 9: CHAMADA FINAL (FINAL CTA) */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-sky-50 to-emerald-50 relative border-t-2 border-dashed border-sky-200 overflow-hidden">
        
        {/* Floating pencil and shapes designs */}
        <div className="absolute top-10 left-10 text-3xl opacity-40">⭐</div>
        <div className="absolute bottom-10 right-10 text-3xl opacity-40">✏️</div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10 space-y-8">
          
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="bg-sky-200/60 text-sky-950 font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full inline-block">
              FACILITE HOJE SUAS AULAS
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-sky-950 tracking-tight leading-tight">
              Tenha atividades prontas para trabalhar Libras sem perder tempo criando tudo do zero
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed font-normal">
              Com esse material, você ganha praticidade, organização e páginas visuais para tornar suas aulas mais dinâmicas e acessíveis para todos os alunos.
            </p>
          </div>

          <div className="max-w-md mx-auto space-y-4 pt-2">
            <button
              onClick={scrollToPricing}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black text-lg py-4.5 px-6 rounded-2xl shadow-xl hover:shadow-rose-100 hover:scale-101 transition-all flex items-center justify-center gap-2 cursor-pointer leading-none"
            >
              Escolher Meu Plano com Desconto
            </button>
            
            <p className="text-xs text-slate-500 font-medium flex items-center justify-center gap-1.5 flex-wrap">
              <span>Opções a partir de R$ 27,90</span>
              <span>•</span>
              <span>Pronto para impressão</span>
              <span>•</span>
              <span>Acesso imediato</span>
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 10: RODAPÉ (FOOTER) */}
      <footer className="bg-sky-950 text-white pt-16 pb-12 relative overflow-hidden border-t-4 border-amber-300">
        <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left items-start">
            
            {/* Footer Left copy */}
            <div className="md:col-span-6 space-y-3.5">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎒</span>
                <span className="text-md font-black tracking-widest uppercase">Atividades Libras PDF</span>
              </div>
              <p className="text-xs text-slate-300 max-w-sm font-normal">
                Atividades Prontas para Ensinar Libras - Material pedagógico digital em PDF para apoio ao ensino inicial do alfabeto manual em Libras.
              </p>
              <div className="pt-2">
                <span className="text-[10px] bg-sky-900 px-3.5 py-1.5 rounded-full font-bold text-sky-400 border border-sky-800 uppercase tracking-widest">
                  Suporte: suporte@atividadeslibras.com
                </span>
              </div>
            </div>

            {/* Footer Right links list */}
            <div className="md:col-span-6 grid grid-cols-2 lg:grid-cols-4 gap-4 md:text-right">
              {[
                { name: "Termos de uso", href: "#interactive-preview" },
                { name: "Política de privacidade", href: "#interactive-preview" },
                { name: "Suporte", href: "#interactive-preview" },
                { name: "Reembolso", href: "#interactive-preview" }
              ].map((link, i) => (
                <button
                  key={i}
                  onClick={openCheckout}
                  className="text-xs text-slate-300 hover:text-white transition-colors cursor-pointer block hover:underline w-fit md:ml-auto"
                >
                  {link.name}
                </button>
              ))}
            </div>

          </div>

          {/* Social Warning & Responsible usage notices */}
          <div className="pt-8 border-t border-sky-900 text-left space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-400 pt-2">
              <p>&copy; 2026 Atividades Prontas LIBRAS. Todos os direitos reservados.</p>
              <p className="flex items-center gap-1">Feito com <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> para apoiar a educação inclusiva nacional.</p>
            </div>
          </div>

        </div>
      </footer>

      {/* Renders the payment step screen overlay popup is called */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        price={checkoutPrice} 
      />

    </div>
  );
}
