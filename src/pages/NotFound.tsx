import { Ghost, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="flex flex-col items-center gap-6 text-center w-full max-w-sm bg-zinc-900/50 p-8 sm:p-10 rounded-3xl border border-zinc-800 shadow-2xl">
        <div className="relative">
          <div className="absolute inset-0 bg-white/10 blur-xl rounded-full" />
          <div className="bg-zinc-800 p-5 rounded-full relative">
            <Ghost className="w-12 h-12 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Caminho vazio
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Não encontramos nada nesta página. Parece que você se perdeu por
            aqui.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-2 px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-full font-semibold transition-colors w-full justify-center"
        >
          <ArrowLeft size={18} />
          Voltar para inicio
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
