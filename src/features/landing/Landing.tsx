import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Building2, Calendar, ClipboardList, ShieldCheck, HeartPulse, Clock, FileText, Smartphone, Lock, ChevronDown } from "lucide-react";
import { BaluBear } from "../../components/ui/ClinicPrimitives";
import { N } from "../../shared/tokens";

const AppleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 384 512" className={className} fill="currentColor">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
);

const GooglePlayIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 512 512" className={className} fill="currentColor">
    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
  </svg>
);

// Componente simples para o FAQ (Sanfona)
function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b" style={{ borderColor: N.border }}>
      <button 
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-lg" style={{ color: N.navy }}>{question}</span>
        <ChevronDown 
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          style={{ color: N.navyLight }} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 leading-relaxed" style={{ color: N.textSec }}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Landing({ defaultView = "tutor" }: { defaultView?: "tutor" | "clinica" } = {}) {
  const [view, setView] = useState<"tutor" | "clinica">(defaultView);

  const toggleView = (selected: "tutor" | "clinica") => {
    setView(selected);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 flex flex-col font-sans`} style={{ backgroundColor: N.canvas }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b" style={{ borderColor: N.border }}>
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BaluBear size={36} />
            <span className="text-2xl font-extrabold tracking-tight" style={{ color: N.navy }}>
              Balu
            </span>
          </div>

          {/* Toggle */}
          <div className="p-1.5 rounded-full flex relative shadow-inner hidden md:flex" style={{ backgroundColor: "#EDF2F7" }}>
            <div
              className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-full shadow-sm transition-all duration-500 ease-spring`}
              style={{
                backgroundColor: N.white,
                left: view === "tutor" ? "6px" : "calc(50% + 6px)"
              }}
            />
            <button
              onClick={() => toggleView("tutor")}
              className={`relative z-10 px-6 py-2 rounded-full font-bold text-sm transition-colors duration-300 ${
                view === "tutor" ? "" : "hover:text-gray-900"
              }`}
              style={{ color: view === "tutor" ? N.navy : N.textSec }}
            >
              Sou Tutor
            </button>
            <button
              onClick={() => toggleView("clinica")}
              className={`relative z-10 px-6 py-2 rounded-full font-bold text-sm transition-colors duration-300 ${
                view === "clinica" ? "" : "hover:text-gray-900"
              }`}
              style={{ color: view === "clinica" ? N.navy : N.textSec }}
            >
              Sou Clínica
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="md:hidden flex">
              <button 
                onClick={() => toggleView(view === "tutor" ? "clinica" : "tutor")}
                className="text-sm font-bold px-4 py-2" 
                style={{ color: N.navy }}
              >
                Mudar para {view === "tutor" ? "Clínica" : "Tutor"}
              </button>
            </div>
            
            <button 
              className="px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-md hover:-translate-y-0.5"
              style={{ 
                backgroundColor: view === "tutor" ? N.navy : N.mintMedium, 
                color: view === "tutor" ? N.white : N.navy 
              }}
              onClick={() => window.location.href = view === "tutor" ? "https://balu-tutor.vercel.app/" : "/login"}
            >
              {view === "tutor" ? "Baixar App" : "Criar Conta"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center pb-24">
        <AnimatePresence mode="wait">
          {view === "tutor" && (
            <motion.div
              key="tutor"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col items-center"
            >
              {/* Hero Section */}
              <div className="container mx-auto px-6 pt-12 pb-24 max-w-6xl flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 space-y-8 text-center lg:text-left">
                  <div 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm"
                    style={{ backgroundColor: N.mintSoft, color: N.navy }}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    100% Grátis para Tutores
                  </div>
                  <h1 className="text-5xl lg:text-6xl font-black leading-tight tracking-tight" style={{ color: N.navy }}>
                    A saúde do seu pet na <span style={{ color: N.mintMedium }}>palma da mão.</span>
                  </h1>
                  <p className="text-xl max-w-2xl leading-relaxed mx-auto lg:mx-0" style={{ color: N.textSec }}>
                    Acompanhe vacinas, medicamentos e a rotina do seu melhor amigo sem precisar estar vinculado a nenhuma clínica. Simples, rápido e no seu celular.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                    <button 
                      onClick={() => window.open('https://balu-tutor.vercel.app/', '_blank')}
                      className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl w-full sm:w-auto transition-transform hover:-translate-y-1" style={{ backgroundColor: N.navy, color: N.white }}
                    >
                      <GooglePlayIcon className="w-8 h-8" />
                      <div className="text-left">
                        <div className="text-xs" style={{ color: N.mintSoft }}>Disponível no</div>
                        <div className="text-lg font-bold">Google Play</div>
                      </div>
                    </button>
                    <button 
                      onClick={() => window.open('https://balu-tutor.vercel.app/', '_blank')}
                      className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl w-full sm:w-auto transition-transform hover:-translate-y-1" style={{ backgroundColor: N.navy, color: N.white }}
                    >
                      <AppleIcon className="w-8 h-8 pb-1" />
                      <div className="text-left">
                        <div className="text-xs" style={{ color: N.mintSoft }}>Baixar na</div>
                        <div className="text-lg font-bold">App Store</div>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="flex-1 relative w-full flex justify-center">
                  <div className="absolute inset-0 rounded-[3rem] transform rotate-3 scale-105 -z-10" style={{ backgroundColor: N.mint }}></div>
                  <div className="w-full max-w-[280px] lg:max-w-xs rounded-[2.5rem] shadow-2xl overflow-hidden border-8 relative flex items-center justify-center bg-gray-50" style={{ borderColor: N.white }}>
                    <img src="/images/app-perfil-pet.png" alt="Perfil do Pet" className="w-full h-auto block" />
                  </div>
                </div>
              </div>

              {/* Zig-Zag Features */}
              <div className="w-full py-24" style={{ backgroundColor: N.white }}>
                <div className="container mx-auto px-6 max-w-6xl space-y-32">
                  
                  {/* Feature 1 */}
                  <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 space-y-6">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: N.mintSoft }}>
                        <Lock className="w-8 h-8" style={{ color: N.navy }} />
                      </div>
                      <h2 className="text-4xl font-black" style={{ color: N.navy }}>Seu pet, seus dados. Livres de amarras.</h2>
                      <p className="text-lg leading-relaxed" style={{ color: N.textSec }}>
                        Você não precisa depender de uma clínica veterinária para usar o Balu. O aplicativo foi feito para você, dono do pet. Todos os dados, histórico e fotos ficam no seu celular, sempre sob seu controle.
                      </p>
                    </div>
                    <div className="flex-1 w-full max-w-sm">
                      <div className="w-full max-w-[280px] mx-auto rounded-[2.5rem] shadow-xl border-8 relative flex items-center justify-center bg-gray-50 overflow-hidden" style={{ borderColor: N.canvas }}>
                        <img src="/images/app-perfil-pet.png" alt="App Perfil do Pet" className="w-full h-auto block" />
                      </div>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
                    <div className="flex-1 space-y-6">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: N.adminAccent }}>
                        <FileText className="w-8 h-8" style={{ color: N.navyLight }} />
                      </div>
                      <h2 className="text-4xl font-black" style={{ color: N.navy }}>Carteirinha de vacinação sempre com você.</h2>
                      <p className="text-lg leading-relaxed" style={{ color: N.textSec }}>
                        Esqueceu o caderninho de papel em casa? Com o Balu, a carteirinha de vacinação digital do seu pet está sempre no seu bolso, válida e acessível em qualquer consulta de emergência.
                      </p>
                    </div>
                    <div className="flex-1 w-full flex justify-center lg:justify-end">
                      <div className="w-full max-w-[280px] mx-auto lg:mx-0 rounded-[2.5rem] shadow-xl border-8 relative flex items-center justify-center bg-gray-50 overflow-hidden" style={{ borderColor: N.canvas }}>
                        <img src="/images/app-carteirinha.png" alt="Carteirinha de Vacinação" className="w-full h-auto block" />
                      </div>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 space-y-6">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: N.alertSoft }}>
                        <Clock className="w-8 h-8" style={{ color: "#9B2C2C" }} />
                      </div>
                      <h2 className="text-4xl font-black" style={{ color: N.navy }}>Lembretes que salvam vidas.</h2>
                      <p className="text-lg leading-relaxed" style={{ color: N.textSec }}>
                        Configure avisos automáticos para vacinas anuais, antipulgas mensais e medicamentos diários. O Balu te notifica na hora certa para você nunca mais esquecer o que importa.
                      </p>
                    </div>
                    <div className="flex-1 w-full max-w-sm">
                      <div className="w-full max-w-[280px] mx-auto rounded-[2.5rem] shadow-xl border-8 relative flex items-center justify-center bg-gray-50 overflow-hidden" style={{ borderColor: N.canvas }}>
                        <img src="/images/app-lembretes.png" alt="Lembretes do App" className="w-full h-auto block" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* FAQ Section */}
              <div className="container mx-auto px-6 max-w-3xl pt-24">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-black mb-4" style={{ color: N.navy }}>Dúvidas Comuns</h2>
                  <p className="text-lg" style={{ color: N.textSec }}>Tudo o que você precisa saber sobre o Balu App.</p>
                </div>
                <div className="space-y-2">
                  <FaqItem 
                    question="O aplicativo é realmente gratuito?" 
                    answer="Sim! O aplicativo Balu para tutores é 100% gratuito e sempre será. Nós monetizamos cobrando apenas das clínicas veterinárias pelo sistema de gestão avançado delas."
                  />
                  <FaqItem 
                    question="Preciso que minha clínica ou veterinário use o Balu?" 
                    answer="Não. O Balu foi feito pensando primeiro no dono do pet. Você pode cadastrar todas as informações, vacinas e lembretes manualmente. Caso sua clínica use o Balu, a vantagem é que tudo isso será preenchido automaticamente para você."
                  />
                  <FaqItem 
                    question="Meus dados estão seguros?" 
                    answer="Com certeza. Utilizamos segurança de nível bancário e seus dados estão criptografados na nuvem. Suas informações e as fotos do seu pet estão totalmente protegidas."
                  />
                </div>
              </div>
            </motion.div>
          )}

          {view === "clinica" && (
            <motion.div
              key="clinica"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col items-center"
            >
              {/* Hero Section */}
              <div className="container mx-auto px-6 pt-12 pb-24 max-w-6xl flex flex-col lg:flex-row-reverse items-center gap-16">
                <div className="flex-1 space-y-8 text-center lg:text-left">
                  <div 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm"
                    style={{ backgroundColor: N.adminAccent, color: N.navyLight }}
                  >
                    <Building2 className="w-4 h-4" />
                    Para Clínicas e Consultórios
                  </div>
                  <h1 className="text-5xl lg:text-6xl font-black leading-tight tracking-tight" style={{ color: N.navy }}>
                    Fidelize clientes e modernize a <span style={{ color: N.mintMedium }}>sua gestão.</span>
                  </h1>
                  <p className="text-xl max-w-2xl leading-relaxed mx-auto lg:mx-0" style={{ color: N.textSec }}>
                    Um sistema veterinário completo e ágil. Acabe com o papel, encante seus clientes com o app Balu e foque no que importa: salvar vidas.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                    <button 
                      onClick={() => window.location.href = '/login'} 
                      className="px-8 py-4 rounded-xl font-bold text-lg w-full sm:w-auto transition-all shadow-lg hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-2"
                      style={{ backgroundColor: N.navy, color: N.white, boxShadow: `0 10px 25px -5px ${N.navyLight}55` }}
                    >
                      Acessar Sistema <ChevronRight className="w-5 h-5" />
                    </button>
                    <button 
                      className="px-8 py-4 rounded-xl font-bold text-lg w-full sm:w-auto transition-all"
                      style={{ backgroundColor: N.white, color: N.navy, border: `2px solid ${N.border}` }}
                    >
                      Falar com Consultor
                    </button>
                  </div>
                </div>
                <div className="flex-1 relative w-full flex justify-center">
                  <div className="absolute inset-0 rounded-[3rem] transform -rotate-3 scale-105 -z-10" style={{ backgroundColor: N.adminAccent }}></div>
                  <div className="w-full rounded-[2rem] shadow-2xl overflow-hidden border-8 relative flex items-center justify-center bg-gray-50" style={{ borderColor: N.white }}>
                    <img src="/images/clinica-dashboard.png" alt="Dashboard da Clínica" className="w-full h-auto block" />
                  </div>
                </div>
              </div>

              {/* Competitor Cards */}
              <div className="container mx-auto px-6 max-w-6xl -mt-8 mb-24 relative z-10">
                <h2 className="text-3xl font-black text-center mb-10" style={{ color: N.navy }}>Por que as clínicas estão trocando de sistema?</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Card 1 */}
                  <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: N.mintSoft, color: N.mintMedium }}>
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <h3 className="text-xl font-bold mb-4" style={{ color: N.navy }}>Curva de Aprendizado</h3>
                    <div className="mb-4">
                      <span className="text-sm font-bold text-red-500 uppercase tracking-wider">Outros Sistemas</span>
                      <p className="text-sm text-gray-500 mt-1">Interface sobrecarregada, cadastro complexo e treinamentos longos para a equipe.</p>
                    </div>
                    <div className="mt-auto">
                      <span className="text-sm font-bold uppercase tracking-wider" style={{ color: N.mintMedium }}>No Balu</span>
                      <p className="text-sm mt-1 font-medium" style={{ color: N.textMain }}>Limpo, intuitivo e com foco na agilidade. A equipe aprende no primeiro dia.</p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: N.successSoft, color: "#276749" }}>
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    </div>
                    <h3 className="text-xl font-bold mb-4" style={{ color: N.navy }}>Comunicação Segura</h3>
                    <div className="mb-4">
                      <span className="text-sm font-bold text-red-500 uppercase tracking-wider">Outros Sistemas</span>
                      <p className="text-sm text-gray-500 mt-1">Lembretes pelo WhatsApp correm risco de bloqueio por spam e não engajam.</p>
                    </div>
                    <div className="mt-auto">
                      <span className="text-sm font-bold uppercase tracking-wider" style={{ color: "#276749" }}>No Balu</span>
                      <p className="text-sm mt-1 font-medium" style={{ color: N.textMain }}>O tutor tem um app próprio. Lembretes via push garantem retornos sem bloqueios.</p>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: N.adminAccent, color: N.navyLight }}>
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </div>
                    <h3 className="text-xl font-bold mb-4" style={{ color: N.navy }}>Foco na Saúde</h3>
                    <div className="mb-4">
                      <span className="text-sm font-bold text-red-500 uppercase tracking-wider">Outros Sistemas</span>
                      <p className="text-sm text-gray-500 mt-1">Excesso de funções que ninguém usa (como blogs e marketplaces inúteis).</p>
                    </div>
                    <div className="mt-auto">
                      <span className="text-sm font-bold uppercase tracking-wider" style={{ color: N.navyLight }}>No Balu</span>
                      <p className="text-sm mt-1 font-medium" style={{ color: N.textMain }}>Integração clínica-tutor 100% focada na saúde e rotina do pet.</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Zig-Zag Features - Vendas Tríade */}
              <div className="w-full py-24" style={{ backgroundColor: N.white }}>
                <div className="container mx-auto px-6 max-w-6xl space-y-32">
                  
                  {/* Pillar 1: Agenda */}
                  <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 space-y-6">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: N.successSoft }}>
                        <HeartPulse className="w-8 h-8" style={{ color: "#276749" }} />
                      </div>
                      <h2 className="text-4xl font-black" style={{ color: N.navy }}>Fim dos buracos na agenda.</h2>
                      <p className="text-lg leading-relaxed" style={{ color: N.textSec }}>
                        Lembretes automáticos enviados direto para o celular do tutor reduzem drasticamente as faltas (no-shows). Sua equipe para de perder tempo cobrando clientes no WhatsApp, e a clínica não perde o faturamento de consultas esquecidas.
                      </p>
                    </div>
                    <div className="flex-1 w-full">
                      <div className="w-full rounded-[1.5rem] shadow-xl border-8 relative flex items-center justify-center bg-gray-50 overflow-hidden" style={{ borderColor: N.canvas }}>
                        <img src="/images/clinica-dashboard.png" alt="Dashboard Retenção" className="w-full h-auto block" />
                      </div>
                    </div>
                  </div>

                  {/* Pillar 2: Dashboard */}
                  <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
                    <div className="flex-1 space-y-6">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: N.mintSoft }}>
                        <ClipboardList className="w-8 h-8" style={{ color: N.navy }} />
                      </div>
                      <h2 className="text-4xl font-black" style={{ color: N.navy }}>Um cliente lembrado é um cliente que volta.</h2>
                      <p className="text-lg leading-relaxed" style={{ color: N.textSec }}>
                        O Balu avisa o tutor automaticamente quando uma vacina está vencendo ou um reforço precisa ser dado. Você aumenta a recorrência da sua base atual sem gastar um centavo em marketing para atrair clientes novos.
                      </p>
                    </div>
                    <div className="flex-1 w-full">
                      <div className="w-full rounded-[1.5rem] shadow-xl border-8 relative flex items-center justify-center bg-gray-50 overflow-hidden" style={{ borderColor: N.canvas }}>
                        <img src="/images/clinica-prontuario.png" alt="Prontuário Eletrônico" className="w-full h-auto block" />
                      </div>
                    </div>
                  </div>

                  {/* Pillar 3: Prontuário */}
                  <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 space-y-6">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: N.adminAccent }}>
                        <Building2 className="w-8 h-8" style={{ color: N.navyLight }} />
                      </div>
                      <h2 className="text-4xl font-black" style={{ color: N.navy }}>Produtividade que vira lucro.</h2>
                      <p className="text-lg leading-relaxed" style={{ color: N.textSec }}>
                        Um prontuário eletrônico rápido e sem burocracia significa menos tempo digitando e mais tempo atendendo. Aumente o volume de consultas diárias da sua equipe sem precisar contratar mais profissionais ou pagar horas extras.
                      </p>
                    </div>
                    <div className="flex-1 w-full">
                      <div className="w-full rounded-[1.5rem] shadow-xl border-8 relative flex items-center justify-center bg-gray-50 overflow-hidden" style={{ borderColor: N.canvas }}>
                        <img src="/images/clinica-agenda.png" alt="Agenda da Clínica" className="w-full h-auto block" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Atores do Sistema */}
              <div className="container mx-auto px-6 max-w-4xl pt-8 pb-24 text-center">
                <h2 className="text-3xl font-black mb-10" style={{ color: N.navy }}>A ferramenta perfeita para cada profissional da sua clínica</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-8 rounded-3xl border" style={{ borderColor: N.border, backgroundColor: N.white }}>
                    <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: N.adminAccent }}>
                      <ClipboardList className="w-8 h-8" style={{ color: N.navyLight }} />
                    </div>
                    <h3 className="font-bold text-xl mb-2" style={{ color: N.textMain }}>Recepção Ágil</h3>
                    <p className="text-sm" style={{ color: N.textSec }}>Fim das filas e das confusões no balcão. Agendamentos rápidos, check-in em um clique e controle total da sala de espera.</p>
                  </div>
                  <div className="p-8 rounded-3xl border" style={{ borderColor: N.border, backgroundColor: N.white }}>
                    <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: N.mintSoft }}>
                      <ShieldCheck className="w-8 h-8" style={{ color: N.navy }} />
                    </div>
                    <h3 className="font-bold text-xl mb-2" style={{ color: N.textMain }}>Foco no Paciente</h3>
                    <p className="text-sm" style={{ color: N.textSec }}>Prontuário focado e limpo. Menos cliques preenchendo formulários e mais tempo olhando no olho do tutor.</p>
                  </div>
                  <div className="p-8 rounded-3xl border" style={{ borderColor: N.border, backgroundColor: N.white }}>
                    <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: N.successSoft }}>
                      <Building2 className="w-8 h-8" style={{ color: "#276749" }} />
                    </div>
                    <h3 className="font-bold text-xl mb-2" style={{ color: N.textMain }}>Controle Total</h3>
                    <p className="text-sm" style={{ color: N.textSec }}>Visão em tempo real do faturamento e produtividade. Tome decisões baseadas em dados seguros, de qualquer lugar.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t mt-auto" style={{ borderColor: N.border, backgroundColor: N.white }}>
        <div className="container mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BaluBear size={24} />
            <span className="font-bold" style={{ color: N.textSec }}>Balu © 2026</span>
          </div>
          <div className="flex gap-6 text-sm font-bold" style={{ color: N.textSec }}>
            <a href="#" className="hover:opacity-80 transition-opacity">Termos</a>
            <a href="#" className="hover:opacity-80 transition-opacity">Privacidade</a>
            <a href="#" className="hover:opacity-80 transition-opacity">Suporte</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
