import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Título */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-5xl font-bold text-white tracking-tight">Operação Rockstar</h1>
          <p className="text-xl text-slate-300">Protocolo Seguro</p>
          <p className="text-slate-400 text-sm mt-4">Escolha como você quer participar do jogo</p>
        </div>

        {/* Opções de entrada */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Botão Datashow */}
          <button
            onClick={() => navigate("/datashow")}
            className="group relative overflow-hidden rounded-lg p-8 bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            <div className="relative z-10 space-y-4">
              <div className="text-5xl">📺</div>
              <h2 className="text-2xl font-bold text-white">Datashow</h2>
              <p className="text-blue-100 text-sm leading-relaxed">
                Visualização geral do jogo. Ideal para exibir em uma tela para toda a turma.
              </p>
              <div className="pt-2 text-blue-100 text-xs font-semibold">CLIQUE PARA ENTRAR →</div>
            </div>
          </button>

          {/* Botão Líder */}
          <button
            onClick={() => navigate("/lider/lobby")}
            className="group relative overflow-hidden rounded-lg p-8 bg-gradient-to-br from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            <div className="relative z-10 space-y-4">
              <div className="text-5xl">📱</div>
              <h2 className="text-2xl font-bold text-white">Líder de Equipe</h2>
              <p className="text-green-100 text-sm leading-relaxed">
                Entre como líder de uma equipe. Responda perguntas no seu celular.
              </p>
              <div className="pt-2 text-green-100 text-xs font-semibold">CLIQUE PARA ENTRAR →</div>
            </div>
          </button>
        </div>

        {/* Informações adicionais */}
        <div className="mt-12 pt-8 border-t border-slate-700">
          <p className="text-slate-400 text-sm text-center">
            Versão 1.0 • MVP Educacional • 5 Equipes • 8 Rodadas
          </p>
        </div>
      </div>
    </div>
  );
}
