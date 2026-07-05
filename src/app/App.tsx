import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { Skull, Shuffle, RotateCcw, Shield, Swords } from "lucide-react";

interface Character {
  id: string;
  name: string;
  img: string;
  role: string;
}

const SURV_IMG = (id: string) =>
  `https://deadbydaylight.fandom.com/wiki/Special:FilePath/${id}_charSelect_portrait.png`;

const KILL_IMG = (id: string) =>
  `https://deadbydaylight.fandom.com/wiki/Special:FilePath/${id}_charSelect_portrait.png`;

const SURVIVORS: Character[] = [
  { id: "S01", name: "Dwight Fairfield", img: SURV_IMG("S01"), role: "Líder de Escritório" },
  { id: "S02", name: "Meg Thomas", img: SURV_IMG("S02"), role: "Corredora" },
  { id: "S03", name: "Claudette Morel", img: SURV_IMG("S03"), role: "Botanista" },
  { id: "S04", name: "Jake Park", img: SURV_IMG("S04"), role: "Sobrevivente Solitário" },
  { id: "S05", name: "Nea Karlsson", img: SURV_IMG("S05"), role: "Skatista" },
  { id: "S06", name: "Laurie Strode", img: SURV_IMG("S06"), role: "A Filha do Terror" },
  { id: "S07", name: "Ace Visconti", img: SURV_IMG("S07"), role: "O Sortudo" },
  { id: "S08", name: "Bill Overbeck", img: SURV_IMG("S08"), role: "O Veterano" },
  { id: "S09", name: "Feng Min", img: SURV_IMG("S09"), role: "Pro Gamer" },
  { id: "S10", name: "David King", img: SURV_IMG("S10"), role: "O Lutador" },
  { id: "S11", name: "Quentin Smith", img: SURV_IMG("S11"), role: "O Estudante" },
  { id: "S12", name: "David Tapp", img: SURV_IMG("S12"), role: "O Detetive" },
  { id: "S13", name: "Kate Denson", img: SURV_IMG("S13"), role: "A Cantora" },
  { id: "S14", name: "Adam Francis", img: SURV_IMG("S14"), role: "O Professor" },
  { id: "S15", name: "Jeff Johansen", img: SURV_IMG("S15"), role: "O Artista" },
  { id: "S16", name: "Jane Romero", img: SURV_IMG("S16"), role: "A Apresentadora" },
  { id: "S17", name: "Ash Williams", img: SURV_IMG("S17"), role: "O Guerreiro do Mal" },
  { id: "S18", name: "Nancy Wheeler", img: SURV_IMG("S18"), role: "A Investigadora" },
  { id: "S19", name: "Steve Harrington", img: SURV_IMG("S19"), role: "O Popular" },
  { id: "S20", name: "Yui Kimura", img: SURV_IMG("S20"), role: "A Piloto" },
  { id: "S21", name: "Zarina Kassir", img: SURV_IMG("S21"), role: "A Documentarista" },
  { id: "S22", name: "Cheryl Mason", img: SURV_IMG("S22"), role: "A Filha de Silent Hill" },
  { id: "S23", name: "Felix Richter", img: SURV_IMG("S23"), role: "O Arquiteto" },
  { id: "S24", name: "Élodie Rakoto", img: SURV_IMG("S24"), role: "A Exploradora" },
  { id: "S25", name: "Yun-Jin Lee", img: SURV_IMG("S25"), role: "A Produtora Musical" },
  { id: "S26", name: "Jill Valentine", img: SURV_IMG("S26"), role: "Membro da S.T.A.R.S." },
  { id: "S27", name: "Leon Kennedy", img: SURV_IMG("S27"), role: "Agente da RPD" },
  { id: "S28", name: "Mikaela Reid", img: SURV_IMG("S28"), role: "A Bruxinha" },
  { id: "S29", name: "Jonah Vasquez", img: SURV_IMG("S29"), role: "O Matemático" },
  { id: "S30", name: "Yoichi Asakawa", img: SURV_IMG("S30"), role: "O Pesquisador Paranormal" },
  { id: "S31", name: "Haddie Kaur", img: SURV_IMG("S31"), role: "A Investigadora Digital" },
  { id: "S32", name: "Ada Wong", img: SURV_IMG("S32"), role: "A Espiã" },
  { id: "S33", name: "Rebecca Chambers", img: SURV_IMG("S33"), role: "Membro da S.T.A.R.S." },
  { id: "S34", name: "Vittorio Toscano", img: SURV_IMG("S34"), role: "O Cavaleiro" },
  { id: "S35", name: "Thalita Lyra", img: SURV_IMG("S35"), role: "A Lutadora" },
  { id: "S36", name: "Renato Lyra", img: SURV_IMG("S36"), role: "O Irmão" },
  { id: "S37", name: "Nicolas Cage", img: SURV_IMG("S37"), role: "O Ator" },
  { id: "S38", name: "Ellen Ripley", img: SURV_IMG("S38"), role: "A Tenente" },
  { id: "S39", name: "Alan Wake", img: SURV_IMG("S39"), role: "O Escritor" },
  { id: "S40", name: "Sable Ward", img: SURV_IMG("S40"), role: "A Gótica" },
];

const KILLERS: Character[] = [
  { id: "K01", name: "The Trapper", img: KILL_IMG("K01"), role: "O Caçador" },
  { id: "K02", name: "The Wraith", img: KILL_IMG("K02"), role: "O Espectro" },
  { id: "K03", name: "The Hillbilly", img: KILL_IMG("K03"), role: "O Caipira" },
  { id: "K04", name: "The Nurse", img: KILL_IMG("K04"), role: "A Enfermeira" },
  { id: "K05", name: "The Hag", img: KILL_IMG("K05"), role: "A Bruxa" },
  { id: "K06", name: "The Shape", img: KILL_IMG("K06"), role: "Michael Myers" },
  { id: "K07", name: "The Doctor", img: KILL_IMG("K07"), role: "O Doutor" },
  { id: "K08", name: "The Huntress", img: KILL_IMG("K08"), role: "A Caçadora" },
  { id: "K09", name: "The Cannibal", img: KILL_IMG("K09"), role: "Leatherface" },
  { id: "K10", name: "The Nightmare", img: KILL_IMG("K10"), role: "Freddy Krueger" },
  { id: "K11", name: "The Pig", img: KILL_IMG("K11"), role: "Amanda Young" },
  { id: "K12", name: "The Clown", img: KILL_IMG("K12"), role: "O Palhaço" },
  { id: "K13", name: "The Spirit", img: KILL_IMG("K13"), role: "O Espírito" },
  { id: "K14", name: "The Legion", img: KILL_IMG("K14"), role: "A Legião" },
  { id: "K15", name: "The Plague", img: KILL_IMG("K15"), role: "A Praga" },
  { id: "K16", name: "The Ghost Face", img: KILL_IMG("K16"), role: "O Ghostface" },
  { id: "K17", name: "The Demogorgon", img: KILL_IMG("K17"), role: "O Demogorgon" },
  { id: "K18", name: "The Oni", img: KILL_IMG("K18"), role: "O Oni" },
  { id: "K19", name: "The Deathslinger", img: KILL_IMG("K19"), role: "O Atirador" },
  { id: "K20", name: "The Executioner", img: KILL_IMG("K20"), role: "Pyramid Head" },
  { id: "K21", name: "The Blight", img: KILL_IMG("K21"), role: "A Praga Luminosa" },
  { id: "K22", name: "The Twins", img: KILL_IMG("K22"), role: "Os Gêmeos" },
  { id: "K23", name: "The Trickster", img: KILL_IMG("K23"), role: "O Trambiqueiro" },
  { id: "K24", name: "The Nemesis", img: KILL_IMG("K24"), role: "Nemesis T-Type" },
  { id: "K25", name: "The Cenobite", img: KILL_IMG("K25"), role: "Pinhead" },
  { id: "K26", name: "The Artist", img: KILL_IMG("K26"), role: "A Artista" },
  { id: "K27", name: "The Onryō", img: KILL_IMG("K27"), role: "Sadako Yamamura" },
  { id: "K28", name: "The Dredge", img: KILL_IMG("K28"), role: "O Dragão" },
  { id: "K29", name: "The Mastermind", img: KILL_IMG("K29"), role: "Albert Wesker" },
  { id: "K30", name: "The Knight", img: KILL_IMG("K30"), role: "O Cavaleiro" },
  { id: "K31", name: "The Skull Merchant", img: KILL_IMG("K31"), role: "A Mercadora" },
  { id: "K32", name: "The Singularity", img: KILL_IMG("K32"), role: "HUX-A7-13" },
  { id: "K33", name: "The Xenomorph", img: KILL_IMG("K33"), role: "O Alien" },
  { id: "K34", name: "The Good Guy", img: KILL_IMG("K34"), role: "Chucky" },
  { id: "K35", name: "The Unknown", img: KILL_IMG("K35"), role: "O Desconhecido" },
  { id: "K36", name: "The Lich", img: KILL_IMG("K36"), role: "Vecna" },
  { id: "K37", name: "The Dark Lord", img: "https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/6/62/K37_TheDarkLord_Portrait.png/revision/latest?cb=20240806171117", role: "Dracula" },
  { id: "K38", name: "The Houndmaster", img: "https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/8/89/K38_charPreview_portrait.png/revision/latest?cb=20250603180827", role: "A Treinadora" },
  { id: "K39", name: "The Ghoul", img: "https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/9/93/K39_charPreview_portrait.png/revision/latest?cb=20250831233526", role: "Ken Kaneki" },
  { id: "K40", name: "The Animatronic", img: "https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/b/bb/K40_charPreview_portrait.png/revision/latest?cb=20250831234917", role: "O Animatrônico" },
  { id: "K41", name: "The Krasue", img: "https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/9/93/K41_TheKrasue_Portrait.png/revision/latest?cb=20251205012535", role: "A Krasue" },
];

const CARD_COLORS = [
  "from-red-950 to-zinc-950",
  "from-zinc-900 to-zinc-950",
  "from-slate-900 to-zinc-950",
  "from-neutral-900 to-zinc-950",
  "from-stone-900 to-zinc-950",
];

type Mode = "survivors" | "killers";

function CharacterCard({
  character,
  isEliminated,
  isDrawn,
  onClick,
  size = "sm",
  clickable = true,
}: {
  character: Character;
  isEliminated: boolean;
  isDrawn?: boolean;
  onClick: () => void;
  size?: "sm" | "lg";
  clickable?: boolean;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const colorClass = CARD_COLORS[parseInt(character.id.slice(1)) % CARD_COLORS.length];

  return (
    <motion.div
      layout
      whileHover={clickable && !isEliminated ? { scale: 1.06, y: -2 } : {}}
      whileTap={clickable ? { scale: 0.93 } : {}}
      onClick={clickable ? onClick : undefined}
      className={[
        "relative rounded overflow-hidden select-none transition-all duration-300",
        size === "lg" ? "w-44 h-60 md:w-52 md:h-72" : "w-full aspect-[3/4]",
        clickable ? "cursor-pointer" : "cursor-default",
        isDrawn
          ? "ring-2 ring-red-500 shadow-[0_0_24px_rgba(196,30,30,0.5)]"
          : isEliminated
          ? "ring-1 ring-zinc-800"
          : "ring-1 ring-white/5 hover:ring-red-900/50",
      ].join(" ")}
    >
      {imgFailed ? (
        <div className={`w-full h-full bg-gradient-to-b ${colorClass} flex items-center justify-center`}>
          <span
            className="font-cinzel font-bold text-white/20"
            style={{ fontSize: size === "lg" ? "3rem" : "1.4rem" }}
          >
            {character.name.charAt(0)}
          </span>
        </div>
      ) : (
        <img
          src={character.img}
          alt={character.name}
          onError={() => setImgFailed(true)}
          className={[
            "w-full h-full object-cover object-top transition-all duration-500",
            isEliminated ? "grayscale brightness-[0.35]" : "",
          ].join(" ")}
        />
      )}

      {isEliminated && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none">
          <svg viewBox="0 0 40 40" className="w-1/2 h-1/2 opacity-60" xmlns="http://www.w3.org/2000/svg">
            <line x1="4" y1="4" x2="36" y2="36" stroke="#7f1d1d" strokeWidth="3" strokeLinecap="round" />
            <line x1="36" y1="4" x2="4" y2="36" stroke="#7f1d1d" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 px-1.5 py-1 bg-black/75 backdrop-blur-sm">
        <p
          className={[
            "text-center font-raleway font-semibold leading-tight truncate",
            size === "lg" ? "text-sm" : "text-[10px]",
            isEliminated ? "text-zinc-600" : isDrawn ? "text-red-300" : "text-zinc-200",
          ].join(" ")}
        >
          {character.name}
        </p>
        {size === "lg" && (
          <p className="text-center text-[10px] text-zinc-500 truncate mt-0.5">{character.role}</p>
        )}
      </div>
    </motion.div>
  );
}

export default function App() {
  const [mode, setMode] = useState<Mode>("survivors");
  const [drawn, setDrawn] = useState<Character | null>(null);
  const [eliminated, setEliminated] = useState<Set<string>>(new Set());
  const [hasDrawn, setHasDrawn] = useState(false);

  const list = mode === "survivors" ? SURVIVORS : KILLERS;

  const draw = useCallback((currentList: Character[]) => {
    const pick = currentList[Math.floor(Math.random() * currentList.length)];
    setDrawn(pick);
    setEliminated(new Set());
    setHasDrawn(true);
  }, []);

  const switchMode = (next: Mode) => {
    setMode(next);
    setDrawn(null);
    setEliminated(new Set());
    setHasDrawn(false);
  };

  const toggleEliminate = useCallback(
    (id: string) => {
      if (!drawn) return;
      setEliminated((prev) => {
        const n = new Set(prev);
        if (n.has(id)) n.delete(id);
        else n.add(id);
        return n;
      });
    },
    [drawn]
  );

  const remaining = list.filter((s) => !eliminated.has(s.id)).length;
  const isSurv = mode === "survivors";

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Raleway', sans-serif" }}>
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: isSurv
            ? "radial-gradient(ellipse at 50% 0%, rgba(120,10,10,0.08) 0%, transparent 60%)"
            : "radial-gradient(ellipse at 50% 0%, rgba(60,10,80,0.1) 0%, transparent 60%)",
        }}
      />

      {/* HEADER */}
      <header className="relative z-10 flex items-center justify-between px-5 py-3.5 border-b border-red-950/40 bg-black/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Skull className="w-4 h-4 text-red-700" />
          <span
            className="text-xs font-semibold tracking-[0.25em] uppercase text-zinc-500"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Dead by Daylight
          </span>
        </div>
        <span
          className="text-xs tracking-[0.3em] uppercase text-red-800/80"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Quem Sou Eu?
        </span>
        {drawn && (
          <span className="text-[10px] text-zinc-700 tracking-wider">{remaining} restantes</span>
        )}
      </header>

      <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-8">

        {/* MODE SWITCHER */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex rounded overflow-hidden ring-1 ring-red-950/50">
            <button
              onClick={() => switchMode("survivors")}
              className={[
                "flex items-center gap-2 px-5 py-2.5 text-xs transition-all duration-200",
                isSurv
                  ? "bg-red-900 text-zinc-100"
                  : "bg-zinc-900/60 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/60",
              ].join(" ")}
              style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.15em" }}
            >
              <Shield className="w-3.5 h-3.5" />
              SOBREVIVENTES
            </button>
            <div className="w-px bg-red-950/50" />
            <button
              onClick={() => switchMode("killers")}
              className={[
                "flex items-center gap-2 px-5 py-2.5 text-xs transition-all duration-200",
                !isSurv
                  ? "bg-red-900 text-zinc-100"
                  : "bg-zinc-900/60 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/60",
              ].join(" ")}
              style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.15em" }}
            >
              <Swords className="w-3.5 h-3.5" />
              ASSASSINOS
            </button>
          </div>
        </div>

        {/* TOP AREA */}
        <div className="flex flex-col items-center mb-8 gap-5">
          <div className="flex flex-col items-center gap-3">
            <p
              className="text-[10px] tracking-[0.4em] uppercase text-zinc-700"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {drawn ? (isSurv ? "Sobrevivente Sorteado" : "Assassino Sorteado") : "Pronto para jogar?"}
            </p>

            {drawn ? (
              <motion.div
                key={drawn.id}
                initial={{ scale: 0.8, opacity: 0, y: -10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <CharacterCard
                  character={drawn}
                  isEliminated={false}
                  isDrawn
                  onClick={() => toggleEliminate(drawn.id)}
                  size="lg"
                  clickable
                />
              </motion.div>
            ) : (
              <div
                className="w-44 h-60 md:w-52 md:h-72 rounded ring-1 ring-red-950/40 flex items-center justify-center"
                style={{ background: "linear-gradient(160deg, #0d1017, #06080b)" }}
              >
                <Skull className="w-12 h-12 text-red-950" />
              </div>
            )}
          </div>

          {/* Draw button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => draw(list)}
            className="flex items-center gap-2.5 px-7 py-3 bg-red-900 hover:bg-red-800 active:bg-red-950 text-zinc-100 rounded transition-colors"
            style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.18em" }}
          >
            {hasDrawn ? (
              <>
                <RotateCcw className="w-4 h-4" />
                SORTEAR NOVAMENTE
              </>
            ) : (
              <>
                <Shuffle className="w-4 h-4" />
                SORTEAR
              </>
            )}
          </motion.button>

          {drawn && (
            <p className="text-[11px] text-zinc-700 tracking-wide">
              Clique para eliminar · clique novamente para restaurar
            </p>
          )}
        </div>

        {/* DIVIDER */}
        <div className="flex items-center gap-4 mb-5">
          <div className="flex-1 h-px bg-red-950/30" />
          <span
            className="text-[10px] tracking-[0.3em] uppercase text-zinc-800"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {list.length} {isSurv ? "Sobreviventes" : "Assassinos"}
          </span>
          <div className="flex-1 h-px bg-red-950/30" />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
          {list.map((c) => (
            <CharacterCard
              key={c.id}
              character={c}
              isEliminated={eliminated.has(c.id)}
              isDrawn={drawn?.id === c.id}
              onClick={() => toggleEliminate(c.id)}
              clickable={!!drawn}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
