import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import '../../../../core/theme/app_theme.dart';
import '../../../../core/theme/ios_liquid_glass_theme.dart';
import '../../../../core/widgets/phone_safe_zone_preview.dart';
import '../../../../core/widgets/platform_adaptive_button.dart';
import '../../../../core/widgets/platform_adaptive_card.dart';
import '../../../../data/models/carousel_slide_model.dart';
import '../../../../data/services/mock_data_service.dart';

class StudioScreen extends StatefulWidget {
  const StudioScreen({super.key});

  @override
  State<StudioScreen> createState() => _StudioScreenState();
}

class _StudioScreenState extends State<StudioScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  int _activeSlideIndex = 0;
  final TextEditingController _promptController = TextEditingController(
    text: 'Expliquer les 3 secrets pour doubler sa rétention vidéo dès la première seconde sans matériel coûteux.',
  );
  bool _isGenerating = false;
  String? _generatedHookResult;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    _promptController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<AppThemeProvider>(context);
    final isGlass = themeProvider.isLiquidGlass(context);

    return Column(
      children: [
        // En-tête des sous-onglets Studio
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
          child: TabBar(
            controller: _tabController,
            isScrollable: true,
            indicatorColor: isGlass ? IOSLiquidGlassTheme.accentCyan : Theme.of(context).colorScheme.primary,
            labelColor: isGlass ? IOSLiquidGlassTheme.accentCyan : Theme.of(context).colorScheme.primary,
            unselectedLabelColor: Colors.white60,
            tabs: const [
              Tab(text: '📱 Vidéo 9:16 & Safe Zones'),
              Tab(text: '🖼️ Carrousels 3-Slides'),
              Tab(text: '💡 Idéation en Lot (Scorer)'),
            ],
          ),
        ),

        Expanded(
          child: TabBarView(
            controller: _tabController,
            children: [
              _buildVideoTab(isGlass),
              _buildCarouselTab(isGlass),
              _buildBatchTab(isGlass),
            ],
          ),
        ),
      ],
    );
  }

  // 1. ONGLET VIDÉO 9:16 & SAFE ZONES
  Widget _buildVideoTab(bool isGlass) {
    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            '🎬 Générateur Prompt-to-Video 9:16',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
          ),
          const SizedBox(height: 6),
          const Text(
            'SocialClone synthétise les expressions faciales, les sous-titres animés et le cadrage optimal.',
            style: TextStyle(fontSize: 13, color: Colors.white70),
          ),
          const SizedBox(height: 14),

          // Champ de prompt
          PlatformAdaptiveCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Votre sujet ou script brut :', style: TextStyle(color: Colors.white70, fontSize: 12)),
                const SizedBox(height: 8),
                TextField(
                  controller: _promptController,
                  maxLines: 3,
                  style: const TextStyle(color: Colors.white, fontSize: 14),
                  decoration: InputDecoration(
                    hintText: 'Décrivez le sujet de votre vidéo...',
                    hintStyle: const TextStyle(color: Colors.white30),
                    filled: true,
                    fillColor: Colors.white.withOpacity(0.05),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: BorderSide.none,
                    ),
                  ),
                ),
                const SizedBox(height: 12),
                PlatformAdaptiveButton(
                  text: _isGenerating ? 'Génération IA en cours...' : 'Générer Vidéo 9:16 & Hook',
                  icon: Icons.auto_awesome,
                  variant: ButtonVariant.primary,
                  isLoading: _isGenerating,
                  width: double.infinity,
                  onPressed: () {
                    setState(() => _isGenerating = true);
                    Future.delayed(const Duration(milliseconds: 900), () {
                      if (mounted) {
                        setState(() {
                          _isGenerating = false;
                          _generatedHookResult = '« 90% des créateurs font cette erreur fatale... »';
                        });
                      }
                    });
                  },
                ),
              ],
            ),
          ),

          const SizedBox(height: 20),

          // Safe-Zones Phone Simulator
          const Text(
            '📐 Simulateur Safe-Zones (Vérification de Cadrage)',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
          ),
          const SizedBox(height: 6),
          const Text(
            'Basculez entre TikTok, Reels et Shorts pour vous assurer qu\'aucun texte n\'est masqué par les boutons natifs.',
            style: TextStyle(fontSize: 13, color: Colors.white70),
          ),
          const SizedBox(height: 14),

          PhoneSafeZonePreview(
            title: 'Prévisualisation Réelle',
            hookText: _generatedHookResult,
          ),
          const SizedBox(height: 30),
        ],
      ),
    );
  }

  // 2. ONGLET CARROUSEL 3-SLIDES
  Widget _buildCarouselTab(bool isGlass) {
    final slides = MockDataService.sampleCarousel;
    final activeSlide = slides[_activeSlideIndex];

    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            '🖼️ Structure Narrative 3-Slides (Hook, Valeur, Action)',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
          ),
          const SizedBox(height: 6),
          const Text(
            'Format haute rétention pensé pour maximiser le temps de lecture et le taux de sauvegarde.',
            style: TextStyle(fontSize: 13, color: Colors.white70),
          ),
          const SizedBox(height: 14),

          // Sélecteur de slide (1, 2, 3)
          Row(
            children: List.generate(slides.length, (idx) {
              final isSelected = _activeSlideIndex == idx;
              final labels = ['Slide 1: Hook', 'Slide 2: Valeur', 'Slide 3: Action'];
              final label = idx < labels.length ? labels[idx] : 'Slide ${idx + 1}';
              return Expanded(
                child: Padding(
                  padding: EdgeInsets.only(right: idx < slides.length - 1 ? 8.0 : 0.0),
                  child: PlatformAdaptiveButton(
                    text: label,
                    variant: isSelected ? ButtonVariant.primary : ButtonVariant.secondary,
                    onPressed: () => setState(() => _activeSlideIndex = idx),
                  ),
                ),
              );
            }),
          ),
          const SizedBox(height: 16),

          // Carte de la Diapositive active
          PlatformAdaptiveCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: IOSLiquidGlassTheme.accentCyan.withOpacity(0.2),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        activeSlide.step.title,
                        style: const TextStyle(
                          color: IOSLiquidGlassTheme.accentCyan,
                          fontWeight: FontWeight.bold,
                          fontSize: 11,
                        ),
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.copy, size: 18, color: Colors.white70),
                      tooltip: 'Copier le texte',
                      onPressed: () {
                        Clipboard.setData(ClipboardData(text: activeSlide.content));
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Texte de la slide copié dans le presse-papier !')),
                        );
                      },
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Text(
                  activeSlide.title,
                  style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                ),
                const SizedBox(height: 10),
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.06),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: Colors.white12),
                  ),
                  child: Text(
                    activeSlide.content,
                    style: const TextStyle(fontSize: 14, color: Colors.white, height: 1.4),
                  ),
                ),
                const SizedBox(height: 14),
                Row(
                  children: [
                    const Icon(Icons.tips_and_updates, size: 16, color: Colors.amberAccent),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        'Note visuelle : ${activeSlide.visualNote}',
                        style: const TextStyle(fontSize: 12, color: Colors.white70),
                      ),
                    ),
                  ],
                ),
                if (activeSlide.ctaText != null) ...[
                  const SizedBox(height: 12),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: IOSLiquidGlassTheme.accentIndigo.withOpacity(0.3),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      'Bouton CTA : ${activeSlide.ctaText}',
                      style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white),
                    ),
                  ),
                ],
              ],
            ),
          ),
          const SizedBox(height: 30),
        ],
      ),
    );
  }

  // 3. ONGLET IDÉATION EN LOT (SCORER)
  Widget _buildBatchTab(bool isGlass) {
    final ideas = MockDataService.sampleBatchIdeas;

    return ListView.builder(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.all(16.0),
      itemCount: ideas.length,
      itemBuilder: (context, index) {
        final idea = ideas[index];
        return PlatformAdaptiveCard(
          margin: const EdgeInsets.only(bottom: 12.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.08),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Text(
                      idea.angle,
                      style: const TextStyle(fontSize: 11, color: Colors.white70, fontWeight: FontWeight.w600),
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: const Color(0xFF10B981).withOpacity(0.2),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Icon(Icons.flash_on, color: Color(0xFF10B981), size: 14),
                        const SizedBox(width: 4),
                        Text(
                          '${idea.score}% Rétention',
                          style: const TextStyle(
                            color: Color(0xFF10B981),
                            fontWeight: FontWeight.bold,
                            fontSize: 11,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10),
              Text(
                idea.title,
                style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Colors.white),
              ),
              const SizedBox(height: 6),
              Text(
                'Hook : « ${idea.hook} »',
                style: const TextStyle(fontSize: 13, fontStyle: FontStyle.italic, color: IOSLiquidGlassTheme.accentCyan),
              ),
              const SizedBox(height: 12),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Format : ${idea.format}',
                    style: const TextStyle(fontSize: 11, color: Colors.white54),
                  ),
                  PlatformAdaptiveButton(
                    text: 'Utiliser cet Angle',
                    icon: Icons.arrow_forward,
                    variant: ButtonVariant.secondary,
                    onPressed: () {
                      _promptController.text = idea.title;
                      _tabController.animateTo(0); // Basculer vers l'onglet Vidéo
                    },
                  ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }
}
