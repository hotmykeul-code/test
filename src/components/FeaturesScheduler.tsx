import React, { useState } from 'react';
import { 
  CalendarCheck2, 
  Clock, 
  Smartphone, 
  Bell, 
  Copy, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface FeaturesSchedulerProps {
  onOpenOnboarding: () => void;
}

const SCHEDULE_GRID = [
  { time: '08:00', lun: 45, mar: 60, mer: 55, jeu: 70, ven: 65, sam: 40, dim: 50 },
  { time: '12:30', lun: 78, mar: 85, mer: 80, jeu: 82, ven: 88, sam: 60, dim: 70 },
  { time: '18:45', lun: 88, mar: 98, mer: 92, jeu: 90, ven: 95, sam: 75, dim: 91 },
  { time: '21:15', lun: 65, mar: 75, mer: 82, jeu: 79, ven: 85, sam: 80, dim: 86 },
];

export const FeaturesScheduler: React.FC<FeaturesSchedulerProps> = ({ onOpenOnboarding }) => {
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string; score: number }>({
    day: 'Mardi',
    time: '18:45',
    score: 98,
  });

  const [copiedState, setCopiedState] = useState(false);

  const handleSimulateCopy = () => {
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2000);
  };

  return (
    <section className="py-24 bg-neutral-900/40 border-t border-neutral-800 relative" id="smart-scheduler">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400 mb-3">
            <CalendarCheck2 className="w-3.5 h-3.5" />
            <span>Section 5 • Smart Scheduler & Planificateur Résilient</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Publiez au Moment de Portée Maximale, Zéro Échec
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Grâce à l'analyse prédictive de votre audience et à notre système résilient à 2 niveaux, vos publications sortent à la minute exacte, que l'API externe réponde ou non.
          </p>
        </div>

        {/* 2 Interactive Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left: Smart Heatmap Scheduler */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-bold text-white">
                    Matrice Horaire & Scoring Prédictif
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedSlot({ day: 'Mardi', time: '18:45', score: 98 })}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Auto-Placer au Meilleur Moment</span>
                </button>
              </div>

              {/* Heatmap Grid */}
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-xs text-neutral-300 border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-800 text-neutral-500 font-semibold">
                      <th className="pb-3 text-left">Créneau</th>
                      <th className="pb-3 text-center">Lun</th>
                      <th className="pb-3 text-center">Mar</th>
                      <th className="pb-3 text-center">Mer</th>
                      <th className="pb-3 text-center">Jeu</th>
                      <th className="pb-3 text-center">Ven</th>
                      <th className="pb-3 text-center">Sam</th>
                      <th className="pb-3 text-center">Dim</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900">
                    {SCHEDULE_GRID.map((row) => (
                      <tr key={row.time}>
                        <td className="py-2.5 font-mono text-neutral-400 font-medium">{row.time}</td>
                        {(['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim'] as const).map((dayKey) => {
                          const score = row[dayKey];
                          const isBest = score >= 95;
                          const isHigh = score >= 85 && score < 95;
                          const dayName = dayKey.toUpperCase();
                          const isSelected = selectedSlot.time === row.time && selectedSlot.day.toLowerCase().startsWith(dayKey.slice(0, 2));

                          return (
                            <td key={dayKey} className="py-2 px-1 text-center">
                              <button
                                onClick={() => setSelectedSlot({ day: dayName, time: row.time, score })}
                                className={`w-full py-1.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                                  isSelected
                                    ? 'ring-2 ring-amber-400 bg-amber-500 text-neutral-950 shadow-md'
                                    : isBest
                                    ? 'bg-amber-500/30 text-amber-300 hover:bg-amber-500/40'
                                    : isHigh
                                    ? 'bg-amber-500/15 text-amber-400/80 hover:bg-amber-500/25'
                                    : 'bg-neutral-900 text-neutral-500 hover:bg-neutral-800'
                                }`}
                              >
                                {score}%
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Selected Slot Information */}
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-neutral-400 text-[11px] block">Créneau recommandé actif :</span>
                  <span className="text-sm font-bold text-white">
                    {selectedSlot.day} à {selectedSlot.time}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-neutral-400 text-[11px] block">Portée algorithmique estimée :</span>
                  <span className="text-sm font-bold text-emerald-400">Score {selectedSlot.score}/100</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs">
              <span className="text-neutral-400">Croisement automatique historique + niche</span>
              <button
                onClick={onOpenOnboarding}
                className="text-amber-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Programmer mes posts</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Resilient 2-Tier Fallback Showcase */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Smartphone className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">
                  Publication Résiliente à 2 Niveaux
                </h3>
              </div>

              <div className="space-y-4 mb-6">
                {/* Level 1 Card */}
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Niveau 1 : Publication Directe API
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono">Automatisé</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Le post est expédié automatiquement à l'heure programmée sur Instagram, TikTok ou YouTube sans aucune action requise.
                  </p>
                </div>

                {/* Level 2 Card */}
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Bell className="w-4 h-4 text-amber-400 animate-bounce" />
                      Niveau 2 : Fallback Mobile Intelligent
                    </span>
                    <span className="text-[10px] text-amber-400 font-mono">Zéro Panne</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Si l'API du réseau social renvoie une erreur (400/500), le système déclenche immédiatement :
                  </p>

                  <ul className="text-xs text-neutral-300 space-y-1.5 pt-1">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>Push haute priorité sur votre smartphone via Expo.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>Téléchargement local du média (Reel / Carrousel).</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>Copie automatique de la légende et hashtags dans le presse-papier.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>Ouverture en 1 clic de l'application native prête à publier.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleSimulateCopy}
                className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-amber-400" />
                <span>{copiedState ? '✓ Légende et média copiés !' : 'Déployer vers TikTok'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
