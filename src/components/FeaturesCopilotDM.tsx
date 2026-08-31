import React, { useState } from 'react';
import { 
  MessageSquareText, 
  ShieldAlert, 
  Clock, 
  Zap, 
  CheckCircle2, 
  Mic2, 
  Send, 
  Bot, 
  UserCheck, 
  ArrowRight,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { SAMPLE_DM_CONVERSATIONS } from '../data/mockData';
import { DmMode, DmMessageSimulation } from '../types';

interface FeaturesCopilotDMProps {
  onOpenOnboarding: () => void;
}

export const FeaturesCopilotDM: React.FC<FeaturesCopilotDMProps> = ({ onOpenOnboarding }) => {
  const [selectedDmIndex, setSelectedDmIndex] = useState<number>(0);
  const [activeMode, setActiveMode] = useState<DmMode>('HYBRID');
  const [selectedVariant, setSelectedVariant] = useState<'directe' | 'pedagogique' | 'conversion'>('directe');
  const [customKeyword, setCustomKeyword] = useState<string>('GUIDE');

  const currentDm = SAMPLE_DM_CONVERSATIONS[selectedDmIndex];

  return (
    <section className="py-24 bg-neutral-950 border-t border-neutral-900 relative" id="copilote-dm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-3">
            <MessageSquareText className="w-3.5 h-3.5" />
            <span>Section 4 • Copilote DM & Messagerie Conforme (API Officielle)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Convertissez vos Abonnés en Clients sans Risquer vos Comptes
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Connecté exclusivement aux API officielles (*Messenger API for Instagram* et *TikTok Direct Message API*). Respect strict de la fenêtre standard des 24 heures et 3 modes d'automatisation sur mesure.
          </p>
        </div>

        {/* 3 Modes Overview Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Mode 1 */}
          <div
            onClick={() => setActiveMode('AUTO')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              activeMode === 'AUTO'
                ? 'bg-amber-500/10 border-amber-500/50 shadow-md'
                : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Mode 1</span>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">100% Automatique</span>
            </div>
            <h4 className="text-sm font-bold text-white mb-2">Réponse Instantanée Voice Twin</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              L'IA analyse le message entrant et expédie directement la réponse calibrée sur votre ton, sans intervention humaine.
            </p>
          </div>

          {/* Mode 2 */}
          <div
            onClick={() => setActiveMode('COPILOT')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              activeMode === 'COPILOT'
                ? 'bg-amber-500/10 border-amber-500/50 shadow-md'
                : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Mode 2</span>
              <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">Semi-Automatique</span>
            </div>
            <h4 className="text-sm font-bold text-white mb-2">Copilote 3 Variantes</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              L'IA prépare 3 options (Directe & Chaleureuse, Pédagogique, Conversion & Vente). Vous cliquez sur la variante désirée.
            </p>
          </div>

          {/* Mode 3 */}
          <div
            onClick={() => setActiveMode('HYBRID')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              activeMode === 'HYBRID'
                ? 'bg-amber-500/10 border-amber-500/50 shadow-md'
                : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Mode 3 (Recommandé)</span>
              <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">Hybride Intelligent</span>
            </div>
            <h4 className="text-sm font-bold text-white mb-2">Mots-Clés Auto + Escalade</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Envoi direct instantané sur les mots-clés ("GUIDE", "PROMO", "PRIX") et mise en attente copilote sur les messages complexes.
            </p>
          </div>
        </div>

        {/* Live DM Simulator Console */}
        <div className="rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden">
          <div className="p-4 sm:p-5 bg-neutral-950 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-bold text-white">Console Live Messagerie Officielle</span>
              <span className="text-xs text-neutral-500 hidden sm:inline">•</span>
              <span className="text-xs text-neutral-400 hidden sm:inline">
                Mode sélectionné : <strong className="text-amber-400">{activeMode}</strong>
              </span>
            </div>

            {/* Conversation Selector Tabs */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400">Exemples :</span>
              {SAMPLE_DM_CONVERSATIONS.map((dm, idx) => (
                <button
                  key={dm.id}
                  onClick={() => setSelectedDmIndex(idx)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${
                    selectedDmIndex === idx
                      ? 'bg-amber-500 text-neutral-950 border-amber-400'
                      : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                  }`}
                  id={`dm-tab-${idx}`}
                >
                  {dm.sender}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left: Message thread inspection */}
            <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-neutral-800 flex flex-col justify-between">
              <div>
                {/* 24h Window Badge */}
                <div className="mb-6 flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-neutral-400" />
                    <span className="text-xs font-semibold text-neutral-300">
                      Statut Fenêtre 24h :
                    </span>
                  </div>
                  {currentDm.within24h ? (
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Active ({currentDm.timestamp})
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded border border-rose-500/20 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Expirée (Bloquée)
                    </span>
                  )}
                </div>

                {/* Sender card */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={currentDm.avatar}
                    alt={currentDm.sender}
                    className="w-10 h-10 rounded-full object-cover border border-neutral-700"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{currentDm.sender}</h4>
                    <span className="text-[11px] text-neutral-400">Compte vérifié Meta</span>
                  </div>
                </div>

                {/* Message Bubble Incoming */}
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 leading-relaxed mb-4">
                  <span className="text-[10px] text-neutral-500 block mb-1">Message entrant :</span>
                  « {currentDm.content} »
                </div>

                {/* Intention Triage Tag */}
                <div className="p-3 rounded-lg bg-neutral-950/80 border border-neutral-800 text-xs flex items-center justify-between">
                  <span className="text-neutral-400 text-[11px]">Intention détectée :</span>
                  <span className="text-amber-400 font-bold text-[11px]">
                    {currentDm.intent.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* 24h compliance guarantee message */}
              <div className="mt-6 pt-4 border-t border-neutral-800 text-[11px] text-neutral-400 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verrouillage automatique si la fenêtre expire pour éviter tout blocage de compte.</span>
              </div>
            </div>

            {/* Right: AI Suggestions & Copilot Actions */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-neutral-950/40">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Variantes Générées selon votre Style Rédactionnel
                  </span>
                  <span className="text-[11px] text-amber-400 font-mono">
                    Ton : Énergie 88% • Empathie 92%
                  </span>
                </div>

                {/* 3 Variants Selector */}
                <div className="space-y-3 mb-6">
                  {/* Variant 1 */}
                  <div
                    onClick={() => setSelectedVariant('directe')}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      selectedVariant === 'directe'
                        ? 'bg-amber-500/10 border-amber-500/40 text-white'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-amber-300">
                        1. Directe & Chaleureuse
                      </span>
                      {selectedVariant === 'directe' && (
                        <span className="text-[10px] text-amber-400 font-bold">Sélectionnée</span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {currentDm.suggestedReplies.directe}
                    </p>
                  </div>

                  {/* Variant 2 */}
                  <div
                    onClick={() => setSelectedVariant('pedagogique')}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      selectedVariant === 'pedagogique'
                        ? 'bg-amber-500/10 border-amber-500/40 text-white'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-amber-300">
                        2. Pédagogique & Complète
                      </span>
                      {selectedVariant === 'pedagogique' && (
                        <span className="text-[10px] text-amber-400 font-bold">Sélectionnée</span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {currentDm.suggestedReplies.pedagogique}
                    </p>
                  </div>

                  {/* Variant 3 */}
                  <div
                    onClick={() => setSelectedVariant('conversion')}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      selectedVariant === 'conversion'
                        ? 'bg-amber-500/10 border-amber-500/40 text-white'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-amber-300">
                        3. Conversion & Vente Directe
                      </span>
                      {selectedVariant === 'conversion' && (
                        <span className="text-[10px] text-amber-400 font-bold">Sélectionnée</span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {currentDm.suggestedReplies.conversion}
                    </p>
                  </div>
                </div>

                {/* Oral Voice Note Generator */}
                <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                      <Mic2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-white block">Notes Vocales Stylisées (Oralisées)</span>
                      <span className="text-[11px] text-neutral-400">Texte adapté au rythme parlé, prêt à être dicté au micro.</span>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold shrink-0">
                    Copier le script oral
                  </button>
                </div>
              </div>

              {/* Action Button Send or Locked */}
              <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  {currentDm.within24h ? 'Prêt à être envoyé via API officielle' : 'Réponse manuelle requise hors fenêtre 24h'}
                </span>

                <button
                  disabled={!currentDm.within24h}
                  onClick={onOpenOnboarding}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    currentDm.within24h
                      ? 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-md'
                      : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{currentDm.within24h ? 'Expédier la réponse' : 'Fenêtre 24h expirée'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
