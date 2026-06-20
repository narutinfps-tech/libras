import React, { useState } from "react";
import { Check, ArrowRight, Printer, RefreshCw, Star, Info, Sparkles, BookOpen } from "lucide-react";

export function WorksheetPreview() {
  const [activeTab, setActiveTab] = useState<number>(0);
  
  // Worksheet 1: Tracing State
  const [tracedText, setTracedText] = useState<string>("");
  const [isCompleted1, setIsCompleted1] = useState(false);
  
  // Worksheet 2: Matching State
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedHand, setSelectedHand] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [matchMessage, setMatchMessage] = useState<string>("");

  // Worksheet 3: Multiple Choice State
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const resetExercises = () => {
    setTracedText("");
    setIsCompleted1(false);
    setSelectedLetter(null);
    setSelectedHand(null);
    setMatches({});
    setMatchMessage("");
    setSelectedAnswer(null);
  };

  const handleMatch = (letter: string, hand: string) => {
    const isCorrect = 
      (letter === "A" && hand === "✊") ||
      (letter === "B" && hand === "✋") ||
      (letter === "C" && hand === "👌") ||
      (letter === "V" && hand === "✌");

    if (isCorrect) {
      const newMatches = { ...matches, [letter]: hand };
      setMatches(newMatches);
      setMatchMessage(`Excelente! Você ligou a Letra ${letter} com o sinal correto! 🎉`);
      if (Object.keys(newMatches).length === 4) {
        setMatchMessage("Parabéns! Você relacionou todas as letras perfeitamente! 🏆");
      }
    } else {
      setMatchMessage("Hum, esse sinal não corresponde a esta letra. Tente de novo! 😊");
    }
    
    setSelectedLetter(null);
    setSelectedHand(null);
  };

  const selectLetterItem = (letter: string) => {
    if (matches[letter]) return; // Already matched
    if (selectedHand) {
      handleMatch(letter, selectedHand);
    } else {
      setSelectedLetter(letter);
    }
  };

  const selectHandItem = (hand: string) => {
    // Check if hand already matched
    if (Object.values(matches).includes(hand)) return;
    if (selectedLetter) {
      handleMatch(selectedLetter, hand);
    } else {
      setSelectedHand(hand);
    }
  };

  return (
    <div id="interactive-preview" className="bg-gradient-to-br from-violet-50 via-sky-50 to-emerald-50 rounded-3xl p-6 md:p-8 border-2 border-sky-100 shadow-xl max-w-4xl mx-auto my-12 relative overflow-hidden">
      {/* Decorative school elements */}
      <div className="absolute top-4 right-4 text-amber-300 opacity-75 animate-bounce">
        <Star className="w-8 h-8 fill-amber-300" />
      </div>
      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-purple-200 rounded-full opacity-40 blur-xl"></div>
      
      {/* Header */}
      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold mb-3 tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" /> Teste interativo online
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-sky-950">
          Experimente Amostras do Material
        </h3>
        <p className="text-gray-600 text-sm md:text-base mt-2 max-w-xl mx-auto">
          Veja como nossas atividades são visualmente ricas e estruturadas de forma lúdica. Resolva as amostras diretamente abaixo!
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 relative z-10">
        {[
          { id: 0, label: "✍️ Escrita e Sinal (A)" },
          { id: 1, label: "🔗 Ligue as Letras" },
          { id: 2, label: "🎯 Identificar Sinal" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs md:text-sm font-bold border-2 transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-sky-600 text-white border-sky-600 shadow-md scale-102"
                : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Interactive Sheet Container (Styled like standard school clipboards / worksheets) */}
      <div className="bg-white rounded-2xl border-4 border-amber-300 shadow-md p-4 sm:p-6 md:p-8 max-w-2xl mx-auto min-h-[440px] flex flex-col justify-between relative bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]">
        {/* Header Ribbon of School Sheet */}
        <div className="flex justify-between items-center pb-4 border-b-2 border-dashed border-gray-200 mb-6 text-xs text-gray-400 font-mono">
          <div className="flex items-center gap-1.5 text-sky-700 font-semibold">
            <BookOpen className="w-4 h-4 shrink-0" /> MEU ALFABETO DE LIBRAS
          </div>
          <div className="text-right">FOLHA: {activeTab + 1}/3</div>
        </div>

        {/* --- SHEET CONTENT --- */}
        {activeTab === 0 && (
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 mb-4 text-center sm:text-left">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-800">1. Traçando a Letra A e seu Sinal</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-1">
                    Instrução: Observe a configuração de mãos do sinal da letra <strong>A</strong> em Libras, escreva o nome da letra abaixo para completar a linha pontilhada.
                  </p>
                </div>
                <div className="p-2 sm:p-2.5 bg-purple-50 rounded-xl border border-purple-100 flex flex-col items-center shadow-inner shrink-0 w-24 sm:w-auto">
                  <span className="text-3xl sm:text-4xl text-center">✊</span>
                  <span className="text-[9px] font-bold text-purple-700 mt-1 uppercase text-center block">Letra A</span>
                </div>
              </div>

              {/* Graphical Work space */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col items-center justify-center my-4 py-8">
                <span className="text-6xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-sky-600 text-center tracking-normal animate-pulse select-none">
                  A a
                </span>
                <p className="text-[11.5px] text-slate-400 mt-2 font-mono">Letra de forma e cursiva</p>

                {/* Simulated Tracing Sandbox */}
                <div className="w-full max-w-xs mt-6">
                  <label className="block text-center text-xs font-semibold text-slate-600 mb-2">
                    Digite &ldquo;A&rdquo; repetidamente para completar o treino:
                  </label>
                  <input
                    type="text"
                    value={tracedText}
                    onChange={(e) => {
                      const val = e.target.value;
                      setTracedText(val);
                      if (val.toUpperCase() === "AAAA" || val.toUpperCase() === "A A A A") {
                        setIsCompleted1(true);
                      }
                    }}
                    placeholder="Digite aqui: A A A A"
                    className="w-full text-center tracking-widest font-mono text-base sm:text-lg py-2 rounded-lg border-2 border-dashed border-purple-300 focus:border-purple-500 focus:outline-none bg-white text-purple-700"
                  />
                  <div className="flex justify-between px-1 text-[10px] text-gray-400 font-mono mt-1">
                    <span>A...</span>
                    <span>A...</span>
                    <span>A...</span>
                    <span>A...</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Validation Feedback */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
              <span className="text-[11px] sm:text-xs text-purple-600 font-medium">
                {isCompleted1 ? "⭐ Excelente! Atividade concluída com sucesso!" : "👉 Complete digitando 'AAAA' de forma livre para marcar como feita!"}
              </span>
              <button 
                onClick={() => { setTracedText("AAAA"); setIsCompleted1(true); }}
                className="text-[10px] sm:text-[11px] font-bold text-sky-600 hover:underline cursor-pointer bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100 uppercase"
              >
                Auto-completar
              </button>
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-800 text-center sm:text-left">2. Associe Conectando os Pares</h4>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-1 text-center sm:text-left">
                Instrução: Selecione uma <strong>Letra em azul</strong> e depois clique no <strong>Sinal de Mão correspondente em lilás</strong> para criar a associação.
              </p>

              {matchMessage && (
                <div className="my-3 px-3 py-2 rounded-lg bg-sky-50 border border-sky-100 text-xs text-sky-800 text-center font-medium">
                  {matchMessage}
                </div>
              )}

              {/* Game Layout Grid */}
              <div className="grid grid-cols-2 gap-4 my-4 max-w-sm mx-auto">
                {/* Left: Letters */}
                <div className="flex flex-col gap-2.5">
                  <div className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider text-center">Letra Caixa</div>
                  {["A", "B", "C", "V"].map((letter) => {
                    const isMatched = !!matches[letter];
                    const isSelected = selectedLetter === letter;
                    return (
                      <button
                        key={letter}
                        onClick={() => selectLetterItem(letter)}
                        disabled={isMatched}
                        className={`py-2 px-2.5 text-xs sm:text-sm font-extrabold rounded-xl border-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer h-10 ${
                          isMatched
                            ? "bg-emerald-50 border-emerald-200 text-emerald-600 opacity-60"
                            : isSelected
                            ? "bg-blue-600 text-white border-blue-600 scale-102 shadow-sm"
                            : "bg-white hover:bg-blue-50 text-blue-700 border-blue-200 shadow-xs"
                        }`}
                      >
                        <span>Letra {letter}</span>
                        {isMatched && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Right: Hand Signs */}
                <div className="flex flex-col gap-2.5">
                  <div className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider text-center">Config. de Mão</div>
                  {[
                    { sigil: "✋", label: "Sinal B" },
                    { sigil: "👌", label: "Sinal C" },
                    { sigil: "✊", label: "Sinal A" },
                    { sigil: "✌", label: "Sinal V" }
                  ].map((hand) => {
                    const isMatched = Object.values(matches).includes(hand.sigil);
                    const isSelected = selectedHand === hand.sigil;
                    return (
                      <button
                        key={hand.sigil}
                        onClick={() => selectHandItem(hand.sigil)}
                        disabled={isMatched}
                        className={`py-2 px-2.5 text-xs sm:text-sm rounded-xl border-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer h-10 ${
                          isMatched
                            ? "bg-emerald-50 border-emerald-200 text-emerald-600 opacity-60"
                            : isSelected
                            ? "bg-purple-600 text-white border-purple-600 scale-102 shadow-sm"
                            : "bg-white hover:bg-purple-50 text-purple-700 border-purple-200 shadow-xs"
                        }`}
                      >
                        <span className="text-base leading-none shrink-0">{hand.sigil}</span>
                        <span className="text-[11px] sm:text-xs font-semibold leading-none">{hand.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-2 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] text-slate-500 text-center">
              <span>Progresso: {Object.keys(matches).length}/4 resolvidos</span>
              <button 
                onClick={() => {
                  setMatches({ "A": "✊", "B": "✋", "C": "👌", "V": "✌" });
                  setMatchMessage("Sinais autocompletados! 🏆");
                }}
                className="text-sky-600 hover:underline cursor-pointer bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100 uppercase font-bold"
              >
                Auto-associar
              </button>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-800 text-center sm:text-left">3. Qual palavra começa com este sinal?</h4>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-1 text-center sm:text-left">
                Instrução: Observe atentamente o sinal abaixo. Ele representa a letra inicial de um brinquedo ou animal. Escolha a alternativa correta!
              </p>

              {/* Graphic container */}
              <div className="my-5 p-5 bg-amber-50 rounded-2xl border border-amber-200 max-w-sm mx-auto flex flex-col items-center justify-center shadow-inner">
                <span className="text-5xl sm:text-6xl animate-bounce">✌</span>
                <span className="text-[10px] font-bold text-amber-700 mt-2 bg-white px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  Letra V de...
                </span>
              </div>

              {/* Multiple Choice Options - Centered text and responsive layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-md mx-auto">
                {[
                  { id: "opt-1", text: "🛩️ Avião", correct: false },
                  { id: "opt-2", text: "🧸 Boneca", correct: false },
                  { id: "opt-3", text: "🧸 Ursinho", correct: false },
                  { id: "opt-4", text: "🪁 Vassoura / Vaca", correct: true }
                ].map((option) => {
                  const isSelected = selectedAnswer === option.id;
                  const isCorrect = option.correct;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setSelectedAnswer(option.id)}
                      className={`p-3 text-center sm:text-left rounded-xl border-2 transition-all cursor-pointer text-xs sm:text-sm font-semibold flex items-center justify-between gap-1.5 ${
                        isSelected
                          ? isCorrect
                            ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                            : "bg-rose-50 border-rose-500 text-rose-800"
                          : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-xs"
                      }`}
                    >
                      <span className="w-full text-center sm:text-left">{option.text}</span>
                      {isSelected && (
                        <span className="text-[10px] font-bold shrink-0 block sm:inline">
                          {isCorrect ? "✅ Correto!" : "❌ Tente outra"}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-slate-500 text-center">
              <span>{selectedAnswer ? "Respondido!" : "Escolha uma alternativa acima"}</span>
              <button 
                onClick={() => setSelectedAnswer("opt-4")}
                className="text-sky-600 hover:underline cursor-pointer bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100 uppercase font-bold text-[10px]"
              >
                Ver resposta
              </button>
            </div>
          </div>
        )}

        {/* Footer of Sheet inside visual mock */}
        <div className="mt-6 pt-3 border-t-2 border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
          <span>&copy; Atividades Prontas Libras PDF</span>
          <div className="flex gap-2">
            <button
              onClick={resetExercises}
              className="px-2 py-1 bg-gray-50 border border-gray-200 rounded text-slate-600 hover:bg-gray-100 flex items-center gap-1 cursor-pointer"
              title="Limpar respostas"
            >
              <RefreshCw className="w-3 h-3" /> Limpar
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-sky-950 font-semibold flex items-center justify-center gap-2">
        <Printer className="w-4 h-4 text-sky-600" />
        No material original em PDF, cada página é formatada em alta definição no padrão A4 pronto para imprimir.
      </div>
    </div>
  );
}
