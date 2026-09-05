import 'package:flutter/material.dart';
import '../theme/ios_liquid_glass_theme.dart';

enum SafeZonePlatform {
  instagram('Instagram Reels', Colors.purpleAccent),
  tiktok('TikTok', Colors.cyanAccent),
  youtube('YouTube Shorts', Colors.redAccent);

  final String label;
  final Color highlightColor;
  const SafeZonePlatform(this.label, this.highlightColor);
}

class PhoneSafeZonePreview extends StatefulWidget {
  final String title;
  final String? videoUrl;
  final String? hookText;

  const PhoneSafeZonePreview({
    super.key,
    required this.title,
    this.videoUrl,
    this.hookText,
  });

  @override
  State<PhoneSafeZonePreview> createState() => _PhoneSafeZonePreviewState();
}

class _PhoneSafeZonePreviewState extends State<PhoneSafeZonePreview> {
  SafeZonePlatform _platform = SafeZonePlatform.tiktok;
  bool _showOverlay = true;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Sélecteur de plateforme & toggle overlay
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ...SafeZonePlatform.values.map((p) {
                final isSelected = p == _platform;
                return Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 4.0),
                  child: ChoiceChip(
                    label: Text(p.label, style: const TextStyle(fontSize: 12)),
                    selected: isSelected,
                    onSelected: (selected) {
                      if (selected) setState(() => _platform = p);
                    },
                  ),
                );
              }),
              IconButton(
                icon: Icon(
                  _showOverlay ? Icons.visibility : Icons.visibility_off,
                  size: 20,
                  color: Colors.white70,
                ),
                tooltip: 'Afficher/Masquer les calques Safe-Zone',
                onPressed: () => setState(() => _showOverlay = !_showOverlay),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),

        // Cadre de Smartphone 9:16
        Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxHeight: 460, maxWidth: 260),
            child: AspectRatio(
              aspectRatio: 9 / 16,
              child: Container(
                decoration: BoxDecoration(
                color: const Color(0xFF0F172A),
                borderRadius: BorderRadius.circular(32),
                border: Border.all(
                  color: Colors.white.withOpacity(0.25),
                  width: 2.5,
                ),
                boxShadow: [
                  BoxShadow(
                    color: _platform.highlightColor.withOpacity(0.25),
                    blurRadius: 28,
                    spreadRadius: -4,
                  ),
                ],
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(29.5),
                child: Stack(
                  children: [
                    // Simulation du média de fond
                    Positioned.fill(
                      child: Container(
                        decoration: const BoxDecoration(
                          gradient: LinearGradient(
                            begin: Alignment.topCenter,
                            end: Alignment.bottomCenter,
                            colors: [
                              Color(0xFF1E293B),
                              Color(0xFF0F172A),
                              Color(0xFF020617),
                            ],
                          ),
                        ),
                        child: Center(
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Container(
                                width: 80,
                                height: 80,
                                decoration: BoxDecoration(
                                  shape: BoxShape.circle,
                                  border: Border.all(
                                    color: IOSLiquidGlassTheme.accentCyan,
                                    width: 2,
                                  ),
                                  image: const DecorationImage(
                                    image: NetworkImage(
                                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
                                    ),
                                    fit: BoxFit.cover,
                                  ),
                                ),
                              ),
                              const SizedBox(height: 12),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                                decoration: BoxDecoration(
                                  color: Colors.black.withOpacity(0.6),
                                  borderRadius: BorderRadius.circular(12),
                                  border: Border.all(color: Colors.white24),
                                ),
                                child: Text(
                                  widget.hookText ?? '« Ce secret que les agences gardent... »',
                                  textAlign: TextAlign.center,
                                  style: const TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.white,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),

                    // Safe-Zone Overlays
                    if (_showOverlay) ...[
                      // En-tête plateforme masquant le haut
                      Positioned(
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 55,
                        child: Container(
                          color: Colors.red.withOpacity(0.18),
                          alignment: Alignment.center,
                          child: const Text(
                            '⚠️ Zone Haute Masquée (Statut / Recherche)',
                            style: TextStyle(color: Colors.white70, fontSize: 9, fontWeight: FontWeight.bold),
                          ),
                        ),
                      ),

                      // Barre droite d'actions (Likes, Commentaires, Partages, Bookmark)
                      Positioned(
                        top: 120,
                        right: 0,
                        bottom: 90,
                        width: 58,
                        child: Container(
                          color: Colors.red.withOpacity(0.18),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            children: const [
                              Icon(Icons.favorite, size: 22, color: Colors.white70),
                              Icon(Icons.comment, size: 22, color: Colors.white70),
                              Icon(Icons.bookmark, size: 22, color: Colors.white70),
                              Icon(Icons.share, size: 22, color: Colors.white70),
                            ],
                          ),
                        ),
                      ),

                      // Bas de page masquant (Description, Audio, Bouton Suivre)
                      Positioned(
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 85,
                        child: Container(
                          color: Colors.red.withOpacity(0.18),
                          padding: const EdgeInsets.all(8.0),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [
                              Text(
                                '@alex.growth • Suivre',
                                style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold),
                              ),
                              const SizedBox(height: 2),
                              Text(
                                'Hook viral généré avec SocialClone AI...',
                                style: TextStyle(color: Colors.white.withOpacity(0.7), fontSize: 10),
                              ),
                            ],
                          ),
                        ),
                      ),

                      // Cœur Zone Sûre (Safe Box)
                      Positioned(
                        top: 60,
                        left: 12,
                        right: 64,
                        bottom: 90,
                        child: Container(
                          decoration: BoxDecoration(
                            border: Border.all(
                              color: _platform.highlightColor,
                              width: 1.5,
                            ),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          alignment: Alignment.topLeft,
                          padding: const EdgeInsets.all(6),
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                            decoration: BoxDecoration(
                              color: _platform.highlightColor.withOpacity(0.2),
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: Text(
                              'ZONE SÛRE 100% VISIBLE',
                              style: TextStyle(
                                color: _platform.highlightColor,
                                fontSize: 8,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    ],
  );
  }
}
