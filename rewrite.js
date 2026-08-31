const fs = require('fs');
const content = fs.readFileSync('src/components/OnboardingModal.tsx', 'utf8');
const lines = content.split('\n');
const startIndex = lines.findIndex(l => l.includes('const theme = getPlatformTheme();'));
const keepLines = lines.slice(0, startIndex + 1);

const newReturn = `
  const getStepNumber = () => {
    switch (step) {
      case 'CONSENT': return 1;
      case 'CONNECT': return 2;
      case 'INGESTION': return 3;
      case 'CALIBRATION': return 4;
      case 'COMPLETE': return 4;
      default: return 1;
    }
  };

  const currentStepNum = getStepNumber();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-md overflow-y-auto font-sans">
      <div className="relative w-full max-w-[640px] bg-[#0c0c0c] border border-neutral-800/80 rounded-[24px] shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col">
        
        {/* Sleek Progress Header */}
        <div className="px-6 py-5 border-b border-neutral-800/60 bg-[#111] flex flex-col gap-4 shrink-0">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-semibold text-neutral-100 tracking-tight flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-neutral-400" />
              Configuration du Jumeau Numérique
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-500 hover:text-neutral-300 rounded-full hover:bg-neutral-800/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex-1 h-1 rounded-full bg-neutral-800/60 overflow-hidden">
                <div 
                  className={\`h-full rounded-full transition-all duration-700 ease-out \${
                    num < currentStepNum ? 'bg-neutral-400' : num === currentStepNum ? 'bg-white' : 'bg-transparent'
                  }\`}
                  style={{ width: num <= currentStepNum ? '100%' : '0%' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-[#0c0c0c]">
          
          {/* STEP 1: Consent */}
          {step === 'CONSENT' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="space-y-2">
                <h4 className="text-lg font-medium text-neutral-100">Confidentialité & Sécurité</h4>
                <p className="text-[13px] text-neutral-400 leading-relaxed max-w-lg">
                  Avant de procéder à l'analyse de votre profil et de générer votre jumeau numérique, veuillez valider le traitement de vos données publiques et biométriques.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-4 p-4 rounded-[16px] bg-[#141414] border border-neutral-800/60 cursor-pointer hover:bg-[#1a1a1a] hover:border-neutral-700 transition-colors group">
                  <div className={\`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-colors \${consent1 ? 'bg-white border-white' : 'border-neutral-600 group-hover:border-neutral-500'}\`}>
                    {consent1 && <Check className="w-3.5 h-3.5 text-black" />}
                  </div>
                  <input
                    type="checkbox"
                    checked={consent1}
                    onChange={(e) => setConsent1(e.target.checked)}
                    className="sr-only"
                  />
                  <div className="text-[13px] text-neutral-400 leading-relaxed">
                    <span className="font-medium text-neutral-200 block mb-1">Conditions Générales d'Utilisation</span>
                    J'accepte les <button type="button" onClick={() => onOpenLegal('terms')} className="text-white underline decoration-neutral-600 underline-offset-4 hover:decoration-white transition-colors">Conditions d'Utilisation</button> et la <button type="button" onClick={() => onOpenLegal('privacy')} className="text-white underline decoration-neutral-600 underline-offset-4 hover:decoration-white transition-colors">Politique de Confidentialité</button>.
                  </div>
                </label>

                <label className="flex items-start gap-4 p-4 rounded-[16px] bg-[#141414] border border-neutral-800/60 cursor-pointer hover:bg-[#1a1a1a] hover:border-neutral-700 transition-colors group">
                  <div className={\`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-colors \${consent2 ? 'bg-white border-white' : 'border-neutral-600 group-hover:border-neutral-500'}\`}>
                    {consent2 && <Check className="w-3.5 h-3.5 text-black" />}
                  </div>
                  <input
                    type="checkbox"
                    checked={consent2}
                    onChange={(e) => setConsent2(e.target.checked)}
                    className="sr-only"
                  />
                  <div className="text-[13px] text-neutral-400 leading-relaxed">
                    <span className="font-medium text-neutral-200 block mb-1">Consentement Biométrique (AI Act)</span>
                    J'autorise l'analyse de mes vidéos et de ma voix dans le but exclusif de générer mon clone numérique, et je certifie être le titulaire du compte.
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-end pt-4">
                <button
                  type="button"
                  disabled={!consent1 || !consent2}
                  onClick={() => setStep('CONNECT')}
                  className={\`px-6 py-3 rounded-xl text-[13px] font-medium flex items-center gap-2 transition-all \${
                    consent1 && consent2
                      ? 'bg-white text-black hover:bg-neutral-200 shadow-sm'
                      : 'bg-neutral-800/50 text-neutral-500 cursor-not-allowed'
                  }\`}
                >
                  Continuer vers la connexion
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Connect */}
          {step === 'CONNECT' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-2 text-center">
                <h4 className="text-lg font-medium text-neutral-100">Synchronisez votre profil</h4>
                <p className="text-[13px] text-neutral-400 max-w-sm mx-auto">
                  Connectez votre compte pour calibrer le style, le ton et l'audience de votre jumeau.
                </p>
              </div>

              {/* Elegant Segmented Control */}
              <div className="flex p-1 rounded-[14px] bg-[#141414] border border-neutral-800/60 max-w-[340px] mx-auto">
                {(['TIKTOK', 'INSTAGRAM', 'YOUTUBE'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setPlatform(p);
                      setConnectedProfile(null);
                      setFetchError(null);
                    }}
                    className={\`flex-1 py-2 text-[12px] font-medium rounded-[10px] transition-all flex items-center justify-center gap-1.5 \${
                      platform === p
                        ? 'bg-neutral-800/80 text-white shadow-sm'
                        : 'text-neutral-500 hover:text-neutral-300'
                    }\`}
                  >
                    {p === 'YOUTUBE' ? <GoogleIcon className="w-3.5 h-3.5 grayscale opacity-70" /> : p === 'INSTAGRAM' ? <Instagram className="w-3.5 h-3.5" /> : <TikTokIcon className="w-3.5 h-3.5" />}
                    {p === 'YOUTUBE' ? 'YouTube' : p === 'INSTAGRAM' ? 'Instagram' : 'TikTok'}
                  </button>
                ))}
              </div>

              <div className="max-w-md mx-auto space-y-5 pt-2">
                {/* Minimal OAuth Action */}
                <button
                  type="button"
                  onClick={() => handleDirectOAuthLogin(platform)}
                  disabled={isLoadingRealAccount || isAuthenticatingOAuth !== null}
                  className={\`w-full p-4 rounded-[16px] border flex items-center justify-between text-left transition-all \${
                    platform === 'INSTAGRAM' ? 'bg-pink-900/10 border-pink-500/20 hover:bg-pink-900/20 hover:border-pink-500/30' :
                    platform === 'YOUTUBE' ? 'bg-amber-900/10 border-amber-500/20 hover:bg-amber-900/20 hover:border-amber-500/30' :
                    'bg-cyan-900/10 border-cyan-500/20 hover:bg-cyan-900/20 hover:border-cyan-500/30'
                  }\`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-[10px] bg-white/5 flex items-center justify-center border border-white/5">
                      {platform === 'INSTAGRAM' ? <Instagram className="w-5 h-5 text-pink-400" /> :
                       platform === 'YOUTUBE' ? <GoogleIcon className="w-5 h-5" /> :
                       <TikTokIcon className="w-5 h-5 text-cyan-400" />}
                    </div>
                    <div>
                      <div className="text-[14px] font-medium text-neutral-100">Continuer avec {theme.tag}</div>
                      <div className="text-[12px] text-neutral-500 mt-0.5">
                        {isAuthenticatingOAuth === platform ? 'Connexion sécurisée en cours...' : 'Synchronisation en 1 clic'}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-500" />
                </button>

                <div className="relative flex items-center py-1">
                  <div className="flex-grow border-t border-neutral-800/80"></div>
                  <span className="flex-shrink-0 mx-4 text-neutral-600 text-[10px] font-medium uppercase tracking-widest">Saisie manuelle</span>
                  <div className="flex-grow border-t border-neutral-800/80"></div>
                </div>

                {/* Refined Manual Input */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={inputHandle}
                      onChange={(e) => setInputHandle(e.target.value)}
                      placeholder={platform === 'INSTAGRAM' ? "@identifiant_ig" : platform === 'YOUTUBE' ? "@chaine_youtube" : "@identifiant_tt"}
                      className="w-full px-4 py-3 rounded-[12px] bg-[#141414] border border-neutral-800/80 text-white text-[13px] placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                      onKeyDown={(e) => e.key === 'Enter' && handleFetchRealAccount()}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleFetchRealAccount()}
                    disabled={isLoadingRealAccount || (!inputHandle && !videoUrlInput)}
                    className="px-5 py-3 rounded-[12px] bg-white hover:bg-neutral-200 text-black font-medium text-[13px] transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isLoadingRealAccount ? <RotateCw className="w-4 h-4 animate-spin" /> : 'Analyser'}
                  </button>
                </div>
                
                {/* Fallback URL Input */}
                <div className="pt-2">
                  <input
                    type="url"
                    value={videoUrlInput}
                    onChange={(e) => setVideoUrlInput(e.target.value)}
                    placeholder={
                      platform === 'INSTAGRAM' ? 'URL d\\'un Reel (optionnel)' :
                      platform === 'YOUTUBE' ? 'URL d\\'un Short (optionnel)' :
                      'URL d\\'une vidéo (optionnel)'
                    }
                    className="w-full px-4 py-2.5 rounded-[12px] bg-[#141414] border border-neutral-800/60 text-white text-[12px] placeholder:text-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors"
                  />
                </div>
              </div>

              {dbSuccessMessage && (
                <div className="max-w-md mx-auto p-3 rounded-[12px] bg-emerald-950/30 border border-emerald-900/50 flex items-center justify-between text-[12px] text-emerald-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Inscrit en base de données</span>
                  </div>
                  <span className="opacity-60 text-[10px] font-mono">ID: {dbUser?.id || 'OK'}</span>
                </div>
              )}

              {fetchError && (
                <div className="max-w-md mx-auto p-3 rounded-[12px] bg-red-950/30 border border-red-900/50 flex items-center gap-2 text-[12px] text-red-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{fetchError}</span>
                </div>
              )}

              {/* REAL PROFILE FOUND DISPLAY - Sophisticated Card */}
              {connectedProfile && (
                <div className="max-w-md mx-auto p-5 rounded-[16px] bg-[#141414] border border-neutral-800 animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex items-center gap-4">
                    <img
                      src={connectedProfile.avatarUrl}
                      alt={connectedProfile.displayName}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-neutral-800"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = \`https://ui-avatars.com/api/?name=\${encodeURIComponent(connectedProfile.displayName)}&background=333&color=fff\`;
                      }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px] font-medium text-white">{connectedProfile.displayName}</span>
                        <BadgeCheck className="w-4 h-4 text-neutral-500" />
                      </div>
                      <span className="text-[12px] text-neutral-500 block mt-0.5">{connectedProfile.handle}</span>
                      <span className="inline-block mt-2 text-[10px] px-2 py-1 rounded bg-neutral-800 text-neutral-300 font-medium tracking-wide uppercase">
                        {connectedProfile.category}
                      </span>
                    </div>
                  </div>
                  
                  {connectedProfile.videoTitle && (
                    <div className="mt-4 p-3 rounded-[10px] bg-[#0c0c0c] border border-neutral-800/60 text-[12px] text-neutral-400">
                      <span className="text-neutral-500 block text-[10px] font-medium uppercase tracking-wider mb-1">Contenu détecté</span>
                      <span className="italic">« {connectedProfile.videoTitle} »</span>
                    </div>
                  )}

                  <div className="mt-5 flex justify-end">
                    <button
                      type="button"
                      onClick={handleStartIngestion}
                      className="w-full py-3 rounded-xl bg-white text-black font-medium text-[13px] flex items-center justify-center gap-2 transition-colors hover:bg-neutral-200"
                    >
                      Démarrer l'ingestion IA
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Developer Toggle */}
              <div className="pt-6 text-center">
                <button
                  type="button"
                  onClick={() => setShowOAuthGuide(!showOAuthGuide)}
                  className="text-[11px] text-neutral-600 hover:text-neutral-400 transition-colors"
                >
                  Développeurs : {showOAuthGuide ? 'Masquer la configuration' : 'Configurer les API OAuth'}
                </button>
              </div>

              {/* Developer Config Block */}
              {showOAuthGuide && (
                <div className="max-w-md mx-auto p-4 rounded-[16px] bg-[#141414] border border-neutral-800 text-[12px] space-y-3 text-neutral-400 animate-in fade-in zoom-in-95">
                  <div className="flex gap-1.5">
                    {['instagram', 'google', 'tiktok'].map(g => (
                      <button
                        key={g}
                        onClick={() => setGuideTab(g as any)}
                        className={\`px-3 py-1.5 rounded-[8px] capitalize transition-colors text-[11px] font-medium \${guideTab === g ? 'bg-neutral-800 text-white' : 'hover:bg-neutral-800/50 text-neutral-500'}\`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-2 pt-1">
                    <p>URI de redirection à autoriser :</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 p-2.5 rounded-[10px] bg-[#0c0c0c] text-neutral-300 font-mono text-[10px] border border-neutral-800 truncate">
                        {oauthProviders?.providers?.[guideTab]?.redirectUri || \`https://.../auth/\${guideTab}/callback\`}
                      </code>
                      <button
                        onClick={() => copyToClipboard(oauthProviders?.providers?.[guideTab]?.redirectUri || '', 'uri')}
                        className="p-2.5 rounded-[10px] bg-[#1a1a1a] hover:bg-[#222] transition-colors border border-neutral-800"
                      >
                        {copiedKey === 'uri' ? <Check className="w-4 h-4 text-neutral-300" /> : <Copy className="w-4 h-4 text-neutral-400" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Ingestion Progress */}
          {step === 'INGESTION' && (
            <div className="py-12 text-center space-y-8 animate-in fade-in zoom-in-95 duration-700">
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                {/* Elegant Pulse Rings */}
                <div className="absolute inset-0 rounded-full border border-neutral-700 opacity-20 animate-ping" style={{ animationDuration: '3s' }} />
                <div className="absolute inset-2 rounded-full border border-neutral-600 opacity-40 animate-ping" style={{ animationDuration: '2s' }} />
                <div className="absolute inset-0 rounded-full border-t-2 border-white animate-spin" style={{ animationDuration: '1.5s' }} />
                <div className="w-12 h-12 rounded-full bg-[#141414] border border-neutral-800 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="max-w-xs mx-auto space-y-2">
                <h4 className="text-[15px] font-medium text-neutral-100">
                  Analyse Neuronale
                </h4>
                <p className="text-[13px] text-neutral-400 h-[40px] flex items-center justify-center">
                  {ingestionStatusText}
                </p>
              </div>

              <div className="max-w-xs mx-auto pt-4">
                <div className="w-full h-1.5 rounded-full bg-neutral-900 overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-300 ease-out rounded-full"
                    style={{ width: \`\${ingestionProgress}%\` }}
                  />
                </div>
                <div className="text-[11px] text-neutral-500 mt-3 font-medium">
                  {ingestionProgress}% complété
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Radar & Calibration */}
          {step === 'CALIBRATION' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                
                {/* Sophisticated Radar Card */}
                <div className="p-5 bg-[#141414] rounded-[20px] border border-neutral-800/80 flex flex-col items-center">
                  <div className="w-full text-center mb-6">
                    <span className="text-[14px] font-medium text-neutral-100 block">Profil Stylistique</span>
                    <span className="text-[11px] text-neutral-500 mt-1 block">Calibré via {connectedProfile?.handle}</span>
                  </div>
                  <div className="opacity-90">
                    <RadarChart data={calibratedRadar} size={220} interactive={false} />
                  </div>
                </div>

                {/* Voice & Hooks Column */}
                <div className="space-y-4">
                  {/* Extracted Hooks */}
                  <div className="p-5 rounded-[20px] bg-[#141414] border border-neutral-800/80 space-y-3">
                    <span className="text-neutral-100 font-medium block text-[13px]">
                      Hooks Extraits
                    </span>
                    <div className="space-y-2">
                      {extractedHooks.map((h, i) => (
                         <div
                           key={i}
                           className="px-3 py-2.5 rounded-[10px] bg-[#0c0c0c] border border-neutral-800 text-[12px] text-neutral-400 flex items-start gap-2.5"
                         >
                           <span className="text-neutral-600 font-medium text-[10px] mt-0.5">{i + 1}</span>
                           <span className="leading-snug">{h}</span>
                         </div>
                      ))}
                    </div>
                  </div>

                  {/* Elegant Microphone Studio */}
                  <div className="p-5 rounded-[20px] bg-[#141414] border border-neutral-800/80 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-neutral-100 text-[13px]">
                        Empreinte Vocale
                      </span>
                      {recordedAudioUrl && (
                        <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          <Check className="w-3 h-3" /> Capturé
                        </span>
                      )}
                    </div>
                    
                    <p className="text-[12px] text-neutral-500 leading-relaxed">
                      Lisez ce texte pour finaliser la prosodie :<br />
                      <span className="block mt-2 p-3 rounded-[10px] bg-[#0c0c0c] border border-neutral-800 text-[12px] text-neutral-300 italic">
                        "Bienvenue sur mon clone officiel. Voici comment je transforme mon audience en opportunités."
                      </span>
                    </p>

                    {micPermissionDenied && (
                      <div className="p-2.5 rounded-[10px] bg-red-950/30 border border-red-900/50 text-[11px] text-red-400">
                        Accès au microphone requis.
                      </div>
                    )}

                    <div className="flex gap-2 pt-1">
                      {!isRecordingRealVoice ? (
                        <button
                          type="button"
                          onClick={handleStartRecording}
                          className="flex-1 py-3 rounded-[12px] bg-white hover:bg-neutral-200 text-black font-medium text-[12px] flex items-center justify-center gap-2 transition-colors"
                        >
                          <Mic className="w-4 h-4" />
                          {recordedAudioUrl ? 'Refaire' : 'Enregistrer'}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleStopRecording}
                          className="flex-1 py-3 rounded-[12px] bg-red-500 hover:bg-red-600 text-white font-medium text-[12px] flex items-center justify-center gap-2 transition-colors animate-pulse"
                        >
                          <span className="w-2 h-2 rounded-full bg-white" />
                          Arrêter ({recordingSeconds}s)
                        </button>
                      )}

                      {recordedAudioUrl && (
                        <button
                          type="button"
                          onClick={handleTogglePlayAudio}
                          className="w-12 flex items-center justify-center rounded-[12px] bg-[#222] hover:bg-[#333] transition-colors"
                        >
                          {isPlayingAudio ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 mt-4 border-t border-neutral-800/80">
                <span className="text-[12px] text-neutral-500">
                  Modèle prêt au déploiement
                </span>
                <button
                  type="button"
                  onClick={() => setStep('COMPLETE')}
                  className="px-6 py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-medium text-[13px] flex items-center gap-2 transition-colors"
                >
                  Générer le Jumeau
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Complete */}
          {step === 'COMPLETE' && (
            <div className="py-10 text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
              <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 mx-auto flex items-center justify-center">
                <Check className="w-7 h-7 text-white" />
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-medium text-neutral-100">
                  Jumeau Opérationnel
                </h4>
                <p className="text-[13px] text-neutral-400 max-w-sm mx-auto">
                  Votre modèle d'intelligence artificielle est maintenant configuré et prêt à générer du contenu.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="mt-6 w-full max-w-[280px] mx-auto py-3.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-medium text-[14px] transition-colors flex items-center justify-center gap-2"
              >
                Ouvrir le Studio
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
`;

const finalContent = keepLines.join('\n') + '\n' + newReturn;
fs.writeFileSync('src/components/OnboardingModal.tsx', finalContent);
console.log('Done rewriting file.');
