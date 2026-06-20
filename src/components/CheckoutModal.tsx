import React, { useState } from "react";
import { X, CheckCircle, ShieldCheck, Mail, ArrowRight, CreditCard, QrCode, ClipboardCheck, Phone, User, Download, FileText, Check } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: number;
}

export function CheckoutModal({ isOpen, onClose, price }: CheckoutModalProps) {
  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");
  
  // Card states
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const [copiedPix, setCopiedPix] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Insira o nome completo";
    if (!email.trim() || !email.includes("@")) errs.email = "Insira um e-mail válido";
    if (!phone.trim() || phone.length < 10) errs.phone = "Insira um número de telefone com DDD";
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2Card = () => {
    const errs: Record<string, string> = {};
    if (!cardNumber.trim() || cardNumber.replace(/\s+/g, "").length < 16) errs.cardNumber = "Número de cartão inválido";
    if (!cardName.trim()) errs.cardName = "Nome do titular é obrigatório";
    if (!cardExpiry.trim()) errs.cardExpiry = "Validade expirada ou incorreta";
    if (cardCvv.length < 3) errs.cardCvv = "CVV incorreto";
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
        setErrors({});
      }
    } else if (step === 2) {
      if (paymentMethod === "card") {
        if (validateStep2Card()) {
          setStep(3); // Success page
          setErrors({});
        }
      } else {
        // Pix simulation
        setStep(3); // Direct access
      }
    }
  };

  const handleCopyPix = () => {
    const randomPixKey = `00020101021226840014br.gov.bcb.pix25620015atividadeslibras${price.toFixed(2).replace(".", "")}5204000053039865405${price.toFixed(2)}5802BR5925AtividadesLibras6009SaoPaulo62070503***6304CA3B`;
    navigator.clipboard.writeText(randomPixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const downloadMockSample = () => {
    // Generate simple mock content for user
    const content = `=== ATIVIDADES DE LIBRAS - AMOSTRA DO MATERIAL ===\n\n` +
      `Estilo de Atividade: Alfabeto Manual em PDF\n` +
      `Layout: Formato A4 pronto para imprimir\n\n` +
      `LICENÇA PEDAGÓGICA LIBERADA PARA: ${name || "Educador(a) Convidado(a)"}\n` +
      `E-mail registrado: ${email || "suporte@atividadeslibras.com"}\n\n` +
      `Aqui estão algumas ideias práticas para aplicar em sala de aula hoje:\n` +
      `1. Recorte dos Cards: Imprima os cartões de sinais, cole em cartolina e crie um jogo da memória.\n` +
      `2. Trilha Manual: Estimule cada criança a fazer o sinal correspondente à letra do seu próprio nome.\n\n` +
      `Muito obrigado por adquirir nosso material. Acesse seu portal completo para o download integral!`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `amostra-completa-libras-pdf-${name.replace(/\s+/g, "-") || "educador"}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-poppins">
      <div 
        className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border-4 border-sky-100 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-sky-950 text-white p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Compra Segura Protegida
            </div>
            <h4 className="text-lg font-bold text-white mt-1">
              {step === 3 ? "Acesso Liberado! 🎉" : "Garantir Material Completo"}
            </h4>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {step < 3 && (
          <div className="grid grid-cols-2 h-1.5 bg-slate-100">
            <div className={`h-full transition-all duration-300 ${step >= 1 ? "bg-sky-500" : "bg-slate-200"}`}></div>
            <div className={`h-full transition-all duration-300 ${step >= 2 ? "bg-sky-500" : "bg-slate-200"}`}></div>
          </div>
        )}

        {/* Scrollable Container */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Resumo do pedido</p>
                <div className="flex justify-between items-center bg-slate-50 rounded-xl p-3 border border-slate-100 mt-1.5">
                  <span className="text-xs font-semibold text-slate-700">Atividades de Libras em PDF</span>
                  <span className="text-sm font-extrabold text-emerald-600">R$ {price.toFixed(2).replace(".", ",")}</span>
                </div>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-sky-600" /> Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Maria de Souza Oliveira"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 bg-slate-50/50"
                  />
                  {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-sky-600" /> E-mail (Importante: O PDF é enviado aqui)
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ex: maria.pedagoga@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 bg-slate-50/50"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Por favor, digite com cuidado para agilizar a entrega imediata.</p>
                  {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-sky-600" /> Telefone / WhatsApp com DDD
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ex: 11 99999-8888"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 bg-slate-50/50"
                  />
                  {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm md:text-base cursor-pointer"
              >
                Prosseguir para o Pagamento <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-slate-400 text-[10px] text-center pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" /> Seus dados pessoais estão 100% seguros de acordo com a LGPD.
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              {/* Payment Methods toggle */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("pix")}
                  className={`p-3 rounded-xl border-2 font-bold text-xs md:text-sm flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === "pix"
                      ? "bg-sky-50 border-sky-500 text-sky-900"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <QrCode className="w-5 h-5 text-sky-600" />
                  Pix (Liberação na hora)
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-3 rounded-xl border-2 font-bold text-xs md:text-sm flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === "card"
                      ? "bg-sky-50 border-sky-500 text-sky-900"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-sky-600" />
                  Cartão de Crédito
                </button>
              </div>

              {paymentMethod === "pix" ? (
                <div className="space-y-4 text-center">
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col items-center justify-center">
                    <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider mb-2">Código Pix Gerado</span>
                    
                    {/* Simulated elegant static QR Code visually styled */}
                    <div className="w-32 h-32 bg-white rounded-lg p-2 border border-slate-200 shadow-inner flex items-center justify-center bg-[radial-gradient(#002f5d_2px,transparent_2px)] [background-size:12px_12px]">
                      <div className="w-24 h-24 bg-sky-950 rounded relative flex items-center justify-center text-white text-xs font-bold select-none p-1 text-center">
                        PIX R$ {price.toFixed(2).replace(".", ",")}
                        <div className="absolute top-1 left-1 w-2 h-2 bg-emerald-400 rounded-sm"></div>
                        <div className="absolute bottom-1 right-1 w-2 h-2 bg-emerald-400 rounded-sm"></div>
                      </div>
                    </div>

                    <span className="text-[11px] text-slate-500 mt-2">Valor original: <strong>R$ {price.toFixed(2).replace(".", ",")}</strong></span>
                  </div>

                  <div className="space-y-2 max-w-xs mx-auto">
                    <button
                      type="button"
                      onClick={handleCopyPix}
                      className="w-full bg-slate-900 text-white font-bold py-2.5 px-4 rounded-xl hover:bg-slate-800 transition-all text-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {copiedPix ? (
                        <>
                          <ClipboardCheck className="w-4 h-4 text-emerald-400" /> Código Copiado!
                        </>
                      ) : (
                        <>
                          Copiar Código Copia e Cola 📋
                        </>
                      )}
                    </button>
                    
                    {/* Immediate simulated approval helper */}
                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 px-4 rounded-xl shadow-md transition-all text-xs md:text-sm flex flex-col items-center justify-center gap-0.5 cursor-pointer"
                    >
                      <span>Simular Aprovação do Pix</span>
                      <span className="text-[9px] font-normal text-white/90">(Clique para testar liberação instantânea)</span>
                    </button>
                  </div>

                  <p className="text-[10px] text-slate-400">
                    O Pix é o método mais recomendado pela rapidez. Após simular o pagamento, você terá o botão para baixar a amostra de simulação.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 text-left">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Dados do Cartão</p>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Número do Cartão</label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4000 1234 5678 9010"
                      maxLength={19}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-sky-500 bg-slate-50/50"
                    />
                    {errors.cardNumber && <p className="text-[10px] text-rose-500">{errors.cardNumber}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Nome impresso no Cartão</label>
                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Ex: MARIA S OLIVEIRA"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-sky-500 bg-slate-50/50"
                    />
                    {errors.cardName && <p className="text-[10px] text-rose-500">{errors.cardName}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Validade (MM/AA)</label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="11/30"
                        maxLength={5}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-sky-500 bg-slate-50/50 text-center"
                      />
                      {errors.cardExpiry && <p className="text-[10px] text-rose-500">{errors.cardExpiry}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-0.5">CVV / Seg.</label>
                      <input
                        type="text"
                        required
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-sky-500 bg-slate-50/50 text-center"
                      />
                      {errors.cardCvv && <p className="text-[10px] text-rose-500">{errors.cardCvv}</p>}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition-all text-xs md:text-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Finalizar Pagamento de R$ {price.toFixed(2).replace(".", ",")} 💳
                    </button>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded-xl text-[10px] text-slate-500 mt-4">
                <span className="flex items-center gap-1 font-semibold"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600 animate-pulse" /> Certificado SSL Seguro</span>
                <span>Provedor de Pagamento Integrado</span>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-4 space-y-5">
              <div className="inline-flex items-center justify-center p-3.5 bg-emerald-100 rounded-full text-emerald-600 mb-2">
                <CheckCircle className="w-12 h-12" />
              </div>

              <div>
                <h5 className="text-xl font-bold text-slate-800">Parabéns, {name || "Educador(a)"}!</h5>
                <p className="text-xs text-slate-500 mt-1"> Seu pagamento de R$ {price.toFixed(2).replace(".", ",")} foi compensado com sucesso.</p>
              </div>

              <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100 text-left space-y-2">
                <h6 className="text-xs font-bold text-sky-900 flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-sky-600" /> Enviamos para o e-mail:</h6>
                <p className="text-xs font-mono text-slate-700 font-bold break-all bg-white p-2 rounded border border-sky-100">{email || "suporte@atividadeslibras.com"}</p>
                <p className="text-[11px] text-slate-500">
                  Verifique sua aba de Entrada ou Lixo Eletrônico (Spam). O e-mail contém o PDF com todas as folhas prontas do alfabeto, cards de relacionar, exercícios de ligar, circular, recorte, colagem e revisões.
                </p>
              </div>

              {/* Instant dynamic file generation downloads for client prototype */}
              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-left space-y-3.5">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                  <FileText className="w-4 h-4 text-amber-600" /> Guia de Boas-Vindas Liberado!
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Geramos um arquivo exclusivo de boas-vindas assinado em seu nome com insights e orientações essenciais sobre como imprimir e aplicar as fichas em Libras. Clique para recebê-lo de imediato:
                </p>
                <button
                  onClick={downloadMockSample}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 px-3 rounded-xl shadow-sm transition-all text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Baixar Meu Guia + Fichas Iniciais
                </button>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl transition-all text-xs cursor-pointer"
              >
                Voltar para a Página de Vendas
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
