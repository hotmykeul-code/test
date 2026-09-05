import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../../core/theme/app_theme.dart';
import '../../../../core/theme/ios_liquid_glass_theme.dart';
import '../../../../core/widgets/liquid_glass_container.dart';
import '../../../../core/widgets/platform_adaptive_card.dart';
import '../../../../core/widgets/tone_radar_painter.dart';
import '../../../../data/models/clone_profile_model.dart';
import '../../../../data/repositories/clone_repository.dart';

class CloneScreen extends StatefulWidget {
  const CloneScreen({super.key});

  @override
  State<CloneScreen> createState() => _CloneScreenState();
}

class _CloneScreenState extends State<CloneScreen> {
  final TextEditingController _signatureWordController = TextEditingController();
  final TextEditingController _forbiddenWordController = TextEditingController();

  @override
  void dispose() {
    _signatureWordController.dispose();
    _forbiddenWordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final cloneRepo = Provider.of<CloneRepository>(context);
    final themeProvider = Provider.of<AppThemeProvider>(context);
    final isGlass = themeProvider.isLiquidGlass(context);

    final profile = cloneRepo.activeProfile;

    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 1. SÉLECTEUR DE CLONE
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: List.generate(cloneRepo.profiles.length, (idx) {
                final p = cloneRepo.profiles[idx];
                final isSelected = cloneRepo.activeIndex == idx;
                return Padding(
                  padding: const EdgeInsets.only(right: 10.0),
                  child: GestureDetector(
                    onTap: () => cloneRepo.selectProfile(idx),
                    child: Container(
                      constraints: const BoxConstraints(minWidth: 95),
                      padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
                      decoration: BoxDecoration(
                        color: isSelected
                            ? IOSLiquidGlassTheme.accentCyan.withOpacity(0.25)
                            : Colors.white.withOpacity(0.06),
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(
                          color: isSelected ? IOSLiquidGlassTheme.accentCyan : Colors.white12,
                          width: isSelected ? 1.5 : 1.0,
                        ),
                      ),
                      child: Column(
                        children: [
                          CircleAvatar(radius: 18, backgroundImage: NetworkImage(p.avatarUrl)),
                          const SizedBox(height: 4),
                          Text(
                            p.name,
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                              color: Colors.white,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              }),
            ),
          ),

          const SizedBox(height: 16),

          // 2. VERROU DE RECALIBRAGE 30 JOURS (ANTI-ABUS GPU)
          LiquidGlassContainer(
            child: Row(
              children: [
                const Icon(Icons.lock_clock, color: Colors.amberAccent, size: 28),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Verrou de Recalibrage (30 Jours)',
                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: Colors.white),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        'Prochain recalibrage complet dans ${profile.calibrationsRemainingDays} jours (${profile.nextCalibrationDate}).',
                        style: const TextStyle(fontSize: 12, color: Colors.white70),
                      ),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.amberAccent.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    '${profile.calibrationsRemainingDays}j restants',
                    style: const TextStyle(color: Colors.amberAccent, fontSize: 11, fontWeight: FontWeight.bold),
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 20),

          // 3. RADAR STYLISTIQUE 8 AXES
          const Text(
            '📊 Radar Stylistique 8 Axes (Empreinte Personnelle)',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
          ),
          const SizedBox(height: 6),
          const Text(
            'Visualisez les 8 composantes comportementales injectées dans chaque prompt de génération.',
            style: TextStyle(fontSize: 13, color: Colors.white70),
          ),
          const SizedBox(height: 16),

          PlatformAdaptiveCard(
            child: Column(
              children: [
                Center(
                  child: ToneRadarWidget(tone: profile.toneRadar, size: 280),
                ),
                const SizedBox(height: 16),
                _buildSlider(
                  'Humour',
                  profile.toneRadar.humour,
                  (val) => cloneRepo.updateToneRadar(profile.toneRadar.copyWith(humour: val)),
                ),
                _buildSlider(
                  'Formalisme',
                  profile.toneRadar.formalisme,
                  (val) => cloneRepo.updateToneRadar(profile.toneRadar.copyWith(formalisme: val)),
                ),
                _buildSlider(
                  'Énergie',
                  profile.toneRadar.energie,
                  (val) => cloneRepo.updateToneRadar(profile.toneRadar.copyWith(energie: val)),
                ),
                _buildSlider(
                  'Empathie',
                  profile.toneRadar.empathie,
                  (val) => cloneRepo.updateToneRadar(profile.toneRadar.copyWith(empathie: val)),
                ),
                _buildSlider(
                  'Storytelling',
                  profile.toneRadar.storytelling,
                  (val) => cloneRepo.updateToneRadar(profile.toneRadar.copyWith(storytelling: val)),
                ),
                _buildSlider(
                  'Technicité',
                  profile.toneRadar.technicite,
                  (val) => cloneRepo.updateToneRadar(profile.toneRadar.copyWith(technicite: val)),
                ),
                _buildSlider(
                  'Clivage',
                  profile.toneRadar.clivage,
                  (val) => cloneRepo.updateToneRadar(profile.toneRadar.copyWith(clivage: val)),
                ),
                _buildSlider(
                  'Rythme',
                  profile.toneRadar.rythme,
                  (val) => cloneRepo.updateToneRadar(profile.toneRadar.copyWith(rythme: val)),
                ),
              ],
            ),
          ),

          const SizedBox(height: 20),

          // 4. ARCHÉTYPE CRÉATEUR
          const Text(
            '🎭 Archétype Dominant',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
          ),
          const SizedBox(height: 10),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: Archetype.values.map((arch) {
                final isSelected = profile.archetype == arch;
                return Padding(
                  padding: const EdgeInsets.only(right: 8.0),
                  child: ChoiceChip(
                    label: Text(arch.label),
                    selected: isSelected,
                    onSelected: (selected) {
                      if (selected) cloneRepo.updateArchetype(arch);
                    },
                  ),
                );
              }).toList(),
            ),
          ),

          const SizedBox(height: 20),

          // 5. MOTS SIGNATURES & MOTS INTERDITS
          const Text(
            '✨ Mots Signatures & Mots Interdits',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
          ),
          const SizedBox(height: 10),

          PlatformAdaptiveCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Expressions favorites (injectées naturellement) :',
                  style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white70),
                ),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 6,
                  runSpacing: 6,
                  children: profile.signatureWords.map((word) {
                    return Chip(
                      label: Text(word, style: const TextStyle(fontSize: 12, color: Colors.white)),
                      backgroundColor: IOSLiquidGlassTheme.accentCyan.withOpacity(0.15),
                      deleteIcon: const Icon(Icons.close, size: 14, color: Colors.white70),
                      onDeleted: () => cloneRepo.removeSignatureWord(word),
                    );
                  }).toList(),
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: _signatureWordController,
                        style: const TextStyle(color: Colors.white, fontSize: 13),
                        onSubmitted: (val) {
                          cloneRepo.addSignatureWord(val);
                          _signatureWordController.clear();
                        },
                        decoration: InputDecoration(
                          hintText: 'Ajouter une expression...',
                          hintStyle: const TextStyle(color: Colors.white30),
                          isDense: true,
                          contentPadding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                          filled: true,
                          fillColor: Colors.white.withOpacity(0.05),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8),
                            borderSide: BorderSide.none,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    IconButton(
                      icon: const Icon(Icons.add_circle, color: IOSLiquidGlassTheme.accentCyan),
                      onPressed: () {
                        cloneRepo.addSignatureWord(_signatureWordController.text);
                        _signatureWordController.clear();
                      },
                    ),
                  ],
                ),
                const Divider(color: Colors.white12, height: 24),
                const Text(
                  'Mots strictement bannis (filtre négatif) :',
                  style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white70),
                ),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 6,
                  runSpacing: 6,
                  children: profile.forbiddenWords.map((word) {
                    return Chip(
                      label: Text(word, style: const TextStyle(fontSize: 12, color: Colors.white)),
                      backgroundColor: Colors.redAccent.withOpacity(0.15),
                      deleteIcon: const Icon(Icons.close, size: 14, color: Colors.white70),
                      onDeleted: () => cloneRepo.removeForbiddenWord(word),
                    );
                  }).toList(),
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: _forbiddenWordController,
                        style: const TextStyle(color: Colors.white, fontSize: 13),
                        onSubmitted: (val) {
                          cloneRepo.addForbiddenWord(val);
                          _forbiddenWordController.clear();
                        },
                        decoration: InputDecoration(
                          hintText: 'Bannir un mot...',
                          hintStyle: const TextStyle(color: Colors.white30),
                          isDense: true,
                          contentPadding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                          filled: true,
                          fillColor: Colors.white.withOpacity(0.05),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8),
                            borderSide: BorderSide.none,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    IconButton(
                      icon: const Icon(Icons.add_circle, color: Colors.redAccent),
                      onPressed: () {
                        cloneRepo.addForbiddenWord(_forbiddenWordController.text);
                        _forbiddenWordController.clear();
                      },
                    ),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 30),
        ],
      ),
    );
  }

  Widget _buildSlider(String label, double value, ValueChanged<double> onChanged) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: Row(
        children: [
          SizedBox(
            width: 80,
            child: Text(label, style: const TextStyle(color: Colors.white70, fontSize: 13)),
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
              style: const TextStyle(color: IOSLiquidGlassTheme.accentCyan, fontWeight: FontWeight.bold, fontSize: 12),
            ),
          ),
        ],
      ),
    );
  }
}
