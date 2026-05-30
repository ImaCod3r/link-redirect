import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

import { Link as LinkIcon, Loader2, SearchX, AlertCircle } from "lucide-react";
import TextType from "../components/TextType";

type LoadState = "loading" | "ready" | "not-found" | "error";

function OpenLink() {
  const { id } = useParams();
  const [url, setUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<LoadState>("loading");

  useEffect(() => {
    let isActive = true;

    const getUrl = async () => {
      if (!id) {
        if (isActive) setStatus("not-found");
        return;
      }

      if (isActive) setStatus("loading");

      const { error, data } = await supabase
        .from("links")
        .select("url")
        .eq("id", id)
        .maybeSingle();

      if (!isActive) return;

      if (error) {
        setStatus("error");
        return;
      }

      if (!data?.url) {
        setStatus("not-found");
        return;
      }

      setUrl(data.url);
      setStatus("ready");
    };

    getUrl();

    return () => {
      isActive = false;
    };
  }, [id]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="flex flex-col items-center gap-4 text-center w-full max-w-sm">
          <Loader2 className="w-12 h-12 text-white animate-spin" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Buscando destino...
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Estamos preparando o seu link, só um instante.
          </p>
        </div>
      </div>
    );
  }

  if (status === "not-found") {
    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="flex flex-col items-center gap-4 text-center w-full max-w-sm bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
          <div className="bg-zinc-800 p-4 rounded-full mb-2">
            <SearchX className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Link não encontrado
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            O link que você tentou acessar não existe ou já foi desativado.
          </p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="flex flex-col items-center gap-4 text-center w-full max-w-sm bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
          <div className="bg-red-500/10 p-4 rounded-full mb-2">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Ops, erro inesperado
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Tivemos um problema ao carregar este link. Tente novamente mais
            tarde.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="flex flex-col items-center gap-8 w-full max-w-md">
        <div className="relative">
          <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full" />
          <img
            className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full object-cover border-4 border-white shadow-xl"
            src={new URL("../assets/edson.jpg", import.meta.url).href}
            alt="Edson Rodrigues"
          />
        </div>

        <div className="text-center space-y-6">
          <TextType
            className="text-white text-xl sm:text-2xl font-semibold tracking-tight"
            text={["Edson Rodrigues compartilhou um link com você!"]}
            typingSpeed={50}
            pauseDuration={1500}
            showCursor
            cursorCharacter="|"
            deletingSpeed={40}
            cursorBlinkDuration={0.6}
            loop={false}
          />
          <p className="text-gray-300 text-sm sm:text-base font-medium">
            Clique no link abaixo para continuar
          </p>

          <div className="pt-2">
            <a
              href={url ?? "#"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full transition-all duration-300 group"
            >
              <LinkIcon
                size={18}
                className="text-white group-hover:scale-110 transition-transform"
              />
              <span className="font-semibold text-base sm:text-lg text-white truncate max-w-50 sm:max-w-62.5">
                {url?.replace(/^https?:\/\//, "")}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpenLink;
