import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../../core/theme/app_theme.dart';
import '../../../../core/theme/ios_liquid_glass_theme.dart';
import '../../../../core/widgets/liquid_glass_container.dart';
import '../../../../core/widgets/platform_adaptive_button.dart';
import '../../../../core/widgets/platform_adaptive_card.dart';
import '../../../../core/widgets/tone_radar_painter.dart';
import '../../../../data/models/clone_profile_model.dart';
import '../../../../data/repositories/clone_repository.dart';

class OnboardingWizardScreen extends StatefulWidget {
  const OnboardingWizardScreen({super.key});

  @override
  State<OnboardingWizardScreen> createState() => _OnboardingWizardScreenState();
}

class _OnboardingWizardScreenState extends State<OnboardingWizardScreen> {
  int _currentStep = 0;
  final int _totalSteps = 7;

  // Étape 1 : Objectif
  String _selectedGoal = 'viral_growth';

  // Étape 2 : Consentement légal double
  bool _consentRgpd = false;
  bool _consentBiometrics = false;

  // Étape 3 : Réseaux sociaux
  final Set<String> _connectedNetworks = {'Instagram'};

  // Étape 4 : ToneRadar modifiable
  ToneRadar _workingTone = const ToneRadar(
    humour: 50,
    formalisme: 20,
    energie: 85,
    empathie: 90,
    storytelling: 80,
    technicite: 65,
    clivage: 40,
    rythme: 88,
  );

  // Étape 5 : Archétype
  Archetype _selectedArchetype = Archetype.mentor;

  // Étape 6 : Voix
  bool _isRecording = false;
  bool _hasVoiceSample = false;

  void _nextStep() {
    if (_currentStep < _totalSteps - 1) {
      setState(() => _currentStep++);
    } else {
      // Sauvegarder dans le clone repository et quitter
      final repo = Provider.of<CloneRepository>(context, listen: false);
      repo.updateToneRadar(_workingTone);
      repo.updateArchetype(_selectedArchetype);
      Navigator.of(context).pop();
    }
  }

  void _prevStep() {
    if (_currentStep > 0) {
      setState(() => _currentStep--);
    }
  }

  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<AppThemeProvider>(context);
    final isGlass = themeProvider.isLiquidGlass(context);

    return Scaffold(
      backgroundColor: isGlass ? IOSLiquidGlassTheme.backgroundDark : null,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.close),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: Text(
          'Étape ${_currentStep + 1} sur $_totalSteps',
          style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w600),
        ),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(4),
          child: LinearProgressIndicator(
            value: (_currentStep + 1) / _totalSteps,
            backgroundColor: Colors.white10,
            valueColor: AlwaysStoppedAnimation<Color>(
              isGlass ? IOSLiquidGlassTheme.accentCyan : Theme.of(context).colorScheme.primary,
            ),
          ),
        ),
      ),
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(20.0),
                child: _buildStepContent(isGlass),
              ),
            ),
            _buildBottomControls(isGlass),
          ],
        ),
      ),
    );
  }

  Widget _buildStepContent(bool isGlass) {
    switch (_currentStep) {
      case 0:
        return _buildStep1Goal();
      case 1:
        return _buildStep2DoubleConsent();
      case 2:
        return _buildStep3SocialConnect();
      case 3:
        return _buildStep4ToneRadar();
      case 4:
        return _buildStep5Archetype();
      case 5:
        return _buildStep6VoiceRecorder();
      case 6:
        return _buildStep7Celebration();
      default:
        return const SizedBox();
    }
  }

  // 1. OBJECTIF
  Widget _buildStep1Goal() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          '🎯 Quel est votre objectif créateur ?',
          style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
        ),
        const SizedBox(height: 8),
        const Text(
          'SocialClone AI adaptera le ton de votre jumeau numérique selon vos ambitions de conversion.',
          style: TextStyle(fontSize: 14, color: Colors.white70),
        ),
        const SizedBox(height: 24),
        _buildGoalOption(
          id: 'viral_growth',
          icon: Icons.rocket_launch,
          title: 'Croissance Virale Maximale',
          description: 'Générer du flux continu 9:16 avec des hooks stop-scroll et convertir les abonnés en leads.',
        ),
        _buildGoalOption(
          id: 'agency_delegation',
          icon: Icons.hub,
          title: 'Délégation Totale Agence',
          description: 'Déléguer la publication multi-réseaux et la gestion des DMs 24h avec conformité absolue.',
        ),
        _buildGoalOption(
          id: 'monetization',
          icon: Icons.monetization_on,
          title: 'Conversion DMs & Vente',
          description: 'Automatiser la qualification des prospects et l\'envoi de ressources payantes par message privé.',
        ),
      ],
    );
  }

  Widget _buildGoalOption({
    required String id,
    required IconData icon,
    required String title,
    required String description,
  }) {
    final isSelected = _selectedGoal == id;
    return PlatformAdaptiveCard(
      onTap: () => setState(() => _selectedGoal = id),
      color: isSelected ? IOSLiquidGlassTheme.accentIndigo.withOpacity(0.25) : null,
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: isSelected ? IOSLiquidGlassTheme.accentCyan : Colors.white10,
              shape: BoxShape.circle,
            ),
            child: Icon(icon, color: isSelected ? Colors.black : Colors.white, size: 24),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Colors.white)),
                const SizedBox(height: 4),
                Text(description, style: const TextStyle(fontSize: 12, color: Colors.white70)),
              ],
            ),
          ),
          if (isSelected)
            const Icon(Icons.check_circle, color: IOSLiquidGlassTheme.accentCyan, size: 22),
        ],
      ),
    );
  }

  // 2. DOUBLE CONSENTEMENT
  Widget _buildStep2DoubleConsent() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          '⚖️ Double Consentement Réglementaire',
          style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
        ),
        const SizedBox(height: 8),
        const Text(
          'En application stricte du RGPD et du Règlement Européen sur l\'IA (EU AI Act 2026), votre consentement explicite est obligatoire.',
          style: TextStyle(fontSize: 14, color: Colors.white70),
        ),
        const SizedBox(height: 24),
        PlatformAdaptiveCard(
          child: Column(
            children: [
              CheckboxListTile(
                value: _consentRgpd,
                activeColor: IOSLiquidGlassTheme.accentCyan,
                onChanged: (val) => setState(() => _consentRgpd = val ?? false),
                title: const Text(
                  'Consentement CGU & RGPD',
                  style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14),
                ),
                subtitle: const Text(
                  'J\'accepte les Conditions Générales et autorise le traitement sécurisé de mes données éditoriales.',
                  style: TextStyle(color: Colors.white70, fontSize: 12),
                ),
              ),
              const Divider(color: Colors.white12),
              CheckboxListTile(
                value: _consentBiometrics,
                activeColor: IOSLiquidGlassTheme.accentCyan,
                onChanged: (val) => setState(() => _consentBiometrics = val ?? false),
                title: const Text(
                  'Consentement Biométrique & Clone Vocal (AI Act)',
                  style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14),
                ),
                subtitle: const Text(
                  'J\'atteste être l\'unique propriétaire de ma voix et de mon image, et j\'autorise SocialClone AI à calibrer mon clone numérique.',
                  style: TextStyle(color: Colors.white70, fontSize: 12),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  // 3. RÉSEAUX SOCIAUX
  Widget _buildStep3SocialConnect() {
    final networks = [
      {'name': 'Instagram', 'icon': Icons.camera_alt, 'color': 0xFFE1306C},
      {'name': 'TikTok', 'icon': Icons.music_note, 'color': 0xFF00F2FE},
      {'name': 'YouTube Shorts', 'icon': Icons.play_arrow, 'color': 0xFFFF0000},
      {'name': 'Threads', 'icon': Icons.alternate_email, 'color': 0xFFFFFFFF},
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          '🔗 Connectez vos chaînes de diffusion',
          style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
        ),
        const SizedBox(height: 8),
        const Text(
          'Synchronisation sécurisée par OAuth officiel pour activer le Copilote DM et la planification automatique.',
          style: TextStyle(fontSize: 14, color: Colors.white70),
        ),
        const SizedBox(height: 24),
        ...networks.map((net) {
          final isConnected = _connectedNetworks.contains(net['name']);
          return PlatformAdaptiveCard(
            child: Row(
              children: [
                CircleAvatar(
                  backgroundColor: Color(net['color'] as int).withOpacity(0.2),
                  child: Icon(net['icon'] as IconData, color: Color(net['color'] as int), size: 20),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Text(
                    net['name'] as String,
                    style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 15),
                  ),
                ),
                OutlinedButton(
                  onPressed: () {
                    setState(() {
                      if (isConnected) {
                        _connectedNetworks.remove(net['name']);
                      } else {
                        _connectedNetworks.add(net['name'] as String);
                      }
                    });
                  },
                  style: OutlinedButton.styleFrom(
                    foregroundColor: isConnected ? Colors.redAccent : IOSLiquidGlassTheme.accentCyan,
                    side: BorderSide(
                      color: isConnected ? Colors.redAccent.withOpacity(0.5) : IOSLiquidGlassTheme.accentCyan,
                    ),
                  ),
                  child: Text(isConnected ? 'Déconnecter' : 'Connecter'),
                ),
              ],
            ),
          );
        }),
      ],
    );
  }

  // 4. TONERADAR 8 AXES
  Widget _buildStep4ToneRadar() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          '📊 Calibrez votre ToneRadar (8 axes)',
          style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
        ),
        const SizedBox(height: 8),
        const Text(
          'Ajustez la personnalité de votre clone. Le modèle ajustera vocabulaire, rythme et clivage en temps réel.',
          style: TextStyle(fontSize: 14, color: Colors.white70),
        ),
        const SizedBox(height: 16),
        Center(
          child: ToneRadarWidget(tone: _workingTone, size: 260),
        ),
        const SizedBox(height: 20),
        _buildSlider('Humour', _workingTone.humour, (v) => setState(() => _workingTone = _workingTone.copyWith(humour: v))),
        _buildSlider('Formalisme', _workingTone.formalisme, (v) => setState(() => _workingTone = _workingTone.copyWith(formalisme: v))),
        _buildSlider('Énergie', _workingTone.energie, (v) => setState(() => _workingTone = _workingTone.copyWith(energie: v))),
        _buildSlider('Empathie', _workingTone.empathie, (v) => setState(() => _workingTone = _workingTone.copyWith(empathie: v))),
        _buildSlider('Storytelling', _workingTone.storytelling, (v) => setState(() => _workingTone = _workingTone.copyWith(storytelling: v))),
        _buildSlider('Technicité', _workingTone.technicite, (v) => setState(() => _workingTone = _workingTone.copyWith(technicite: v))),
        _buildSlider('Clivage', _workingTone.clivage, (v) => setState(() => _workingTone = _workingTone.copyWith(clivage: v))),
        _buildSlider('Rythme', _workingTone.rythme, (v) => setState(() => _workingTone = _workingTone.copyWith(rythme: v))),
      ],
    );
  }

  Widget _buildSlider(String label, double value, ValueChanged<double> onChanged) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: Row(
        children: [
          SizedBox(
            width: 90,
            child: Text(label, style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.w600)),
          ),
          Expanded(
            child: Slider(
              value: value,
              min: 0,
              max: 100,
              activeColor: IOSLiquidGlassTheme.accentCyan,
              inactiveColor: Colors.white12,
              onChanged: onChanged,
            ),
          ),
          SizedBox(
            width: 40,
            child: Text(
              '${value.toInt()}%',
              textAlign: TextAlign.right,
              style: const TextStyle(color: IOSLiquidGlassTheme.accentCyan, fontWeight: FontWeight.bold, fontSize: 13),
            ),
          ),
        ],
      ),
    );
  }

  // 5. ARCHÉTYPE
  Widget _buildStep5Archetype() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          '🎭 Choisissez votre archétype créateur',
          style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
        ),
        const SizedBox(height: 8),
        const Text(
          'Définit le filtre narratif dominant dans la génération de scripts et la prise de parole en DM.',
          style: TextStyle(fontSize: 14, color: Colors.white70),
        ),
        const SizedBox(height: 20),
        ...Archetype.values.map((arch) {
          final isSelected = _selectedArchetype == arch;
          return PlatformAdaptiveCard(
            onTap: () => setState(() => _selectedArchetype = arch),
            color: isSelected ? IOSLiquidGlassTheme.accentIndigo.withOpacity(0.3) : null,
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(arch.label, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white)),
                      const SizedBox(height: 4),
                      Text(arch.description, style: const TextStyle(fontSize: 12, color: Colors.white70)),
                    ],
                  ),
                ),
                if (isSelected)
                  const Icon(Icons.check_circle, color: IOSLiquidGlassTheme.accentCyan, size: 22),
              ],
            ),
          );
        }),
      ],
    );
  }

  // 6. ENREGISTREUR VOCAL
  Widget _buildStep6VoiceRecorder() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          '🎙️ Calibrage de votre voix (20 secondes)',
          style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
        ),
        const SizedBox(height: 8),
        const Text(
          'Lisez le texte ci-dessous à voix haute pour capturer votre intonation, cadence et pauses naturelles.',
          style: TextStyle(fontSize: 14, color: Colors.white70),
        ),
        const SizedBox(height: 20),
        LiquidGlassContainer(
          padding: const EdgeInsets.all(16),
          child: const Text(
            '« Bienvenue sur mon canal. Aujourd\'hui je vous dévoile la méthode exacte que j\'utilise pour créer du contenu sans m\'épuiser. Restez bien jusqu\'à la fin car l\'astuce #3 change absolument tout. »',
            style: TextStyle(fontSize: 14, fontStyle: FontStyle.italic, color: Colors.white, height: 1.4),
          ),
        ),
        const SizedBox(height: 32),
        Center(
          child: Column(
            children: [
              GestureDetector(
                onTap: () {
                  setState(() {
                    _isRecording = !_isRecording;
                    if (!_isRecording) _hasVoiceSample = true;
                  });
                },
                child: Container(
                  width: 80,
                  height: 80,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: _isRecording ? Colors.redAccent : IOSLiquidGlassTheme.accentCyan,
                    boxShadow: [
                      BoxShadow(
                        color: (_isRecording ? Colors.redAccent : IOSLiquidGlassTheme.accentCyan).withOpacity(0.4),
                        blurRadius: 24,
                        spreadRadius: 4,
                      ),
                    ],
                  ),
                  child: Icon(
                    _isRecording ? Icons.stop : Icons.mic,
                    color: Colors.black,
                    size: 36,
                  ),
                ),
              ),
              const SizedBox(height: 12),
              Text(
                _isRecording ? 'Enregistrement en cours (14s / 20s)...' : (_hasVoiceSample ? '✅ Échantillon vocal capturé' : 'Appuyez pour enregistrer'),
                style: TextStyle(
                  color: _isRecording ? Colors.redAccent : (_hasVoiceSample ? Colors.greenAccent : Colors.white70),
                  fontWeight: FontWeight.bold,
                  fontSize: 13,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  // 7. CÉLÉBRATION & BONUS
  Widget _buildStep7Celebration() {
    return Column(
      children: [
        const SizedBox(height: 20),
        Container(
          width: 100,
          height: 100,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            gradient: const LinearGradient(
              colors: [IOSLiquidGlassTheme.accentCyan, IOSLiquidGlassTheme.accentIndigo],
            ),
            boxShadow: [
              BoxShadow(
                color: IOSLiquidGlassTheme.accentCyan.withOpacity(0.5),
                blurRadius: 32,
              ),
            ],
          ),
          child: const Icon(Icons.celebration, size: 50, color: Colors.black),
        ),
        const SizedBox(height: 24),
        const Text(
          '🎉 Félicitations ! Votre clone est prêt',
          textAlign: TextAlign.center,
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white),
        ),
        const SizedBox(height: 12),
        const Text(
          'Votre radar stylistique et vos préférences sont enregistrés avec succès. Vous bénéficiez d\'une allocation de bienvenue :',
          textAlign: TextAlign.center,
          style: TextStyle(fontSize: 14, color: Colors.white70),
        ),
        const SizedBox(height: 24),
        LiquidGlassContainer(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: const [
              Icon(Icons.bolt, color: Colors.amberAccent, size: 28),
              SizedBox(width: 12),
              Text(
                '+50 CRÉDITS VIDÉO 9:16 OFFERTS',
                style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Colors.amberAccent, letterSpacing: 0.5),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildBottomControls(bool isGlass) {
    bool canProceed = true;
    if (_currentStep == 1 && (!_consentRgpd || !_consentBiometrics)) {
      canProceed = false;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      decoration: BoxDecoration(
        color: isGlass ? Colors.black.withOpacity(0.5) : Theme.of(context).colorScheme.surfaceContainer,
        border: Border(top: BorderSide(color: Colors.white.withOpacity(0.1))),
      ),
      child: Row(
        children: [
          if (_currentStep > 0) ...[
            PlatformAdaptiveButton(
              text: 'Retour',
              variant: ButtonVariant.ghost,
              onPressed: _prevStep,
            ),
            const SizedBox(width: 12),
          ],
          Expanded(
            child: PlatformAdaptiveButton(
              text: _currentStep == _totalSteps - 1 ? 'Accéder à mon Workspace' : 'Continuer',
              variant: ButtonVariant.primary,
              onPressed: canProceed ? _nextStep : null,
            ),
          ),
        ],
      ),
    );
  }
}
