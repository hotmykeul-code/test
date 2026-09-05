import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import '../../../../core/theme/app_theme.dart';
import '../../../../core/theme/ios_liquid_glass_theme.dart';
import '../../../../core/widgets/liquid_glass_container.dart';
import '../../../../core/widgets/platform_adaptive_button.dart';
import '../../../../core/widgets/platform_adaptive_card.dart';
import '../../../../data/models/scheduled_post_model.dart';
import '../../../../data/repositories/scheduler_repository.dart';
import '../../../../data/services/mock_data_service.dart';

class SchedulerScreen extends StatelessWidget {
  const SchedulerScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final schedulerRepo = Provider.of<SchedulerRepository>(context);
    final themeProvider = Provider.of<AppThemeProvider>(context);
    final isGlass = themeProvider.isLiquidGlass(context);

    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 1. HEATMAP D'ENGAGEMENT 7x4
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                '🔥 Heatmap d\'Engagement 7x4',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: const Color(0xFF10B981).withOpacity(0.2),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: const Text(
                  'Prédictif IA',
                  style: TextStyle(color: Color(0xFF10B981), fontSize: 10, fontWeight: FontWeight.bold),
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          const Text(
            'Chaque case représente le taux d\'attention prédictif de votre communauté cible.',
            style: TextStyle(fontSize: 13, color: Colors.white70),
          ),
          const SizedBox(height: 14),

          PlatformAdaptiveCard(
            child: Column(
              children: [
                // En-tête des créneaux horaires
                Row(
                  children: [
                    const SizedBox(width: 36), // Espace pour le nom du jour
                    ...MockDataService.heatmapSlots.map((slot) {
                      return Expanded(
                        child: Text(
                          slot,
                          textAlign: TextAlign.center,
                          style: const TextStyle(fontSize: 11, color: Colors.white70, fontWeight: FontWeight.bold),
                        ),
                      );
                    }),
                  ],
                ),
                const SizedBox(height: 8),

                // Lignes de la matrice 7 jours x 4 créneaux
                ...List.generate(7, (dayIdx) {
                  final dayLabel = MockDataService.heatmapDays[dayIdx];
                  final rowScores = schedulerRepo.heatmap[dayIdx];

                  return Padding(
                    padding: const EdgeInsets.symmetric(vertical: 3.0),
                    child: Row(
                      children: [
                        SizedBox(
                          width: 36,
                          child: Text(
                            dayLabel,
                            style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold),
                          ),
                        ),
                        ...List.generate(4, (slotIdx) {
                          final score = rowScores[slotIdx];
                          final opacity = ((score - 50) / 50.0).clamp(0.2, 1.0);
                          final isTopPeak = score >= 96;

                          return Expanded(
                            child: GestureDetector(
                              onTap: () {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Text(
                                      '$dayLabel à ${MockDataService.heatmapSlots[slotIdx]} : Score prédictif de $score% !',
                                    ),
                                    duration: const Duration(seconds: 2),
                                  ),
                                );
                              },
                              child: Container(
                                height: 32,
                                margin: const EdgeInsets.symmetric(horizontal: 2.0),
                                decoration: BoxDecoration(
                                  color: isTopPeak
                                      ? const Color(0xFF10B981).withOpacity(0.85)
                                      : IOSLiquidGlassTheme.accentCyan.withOpacity(opacity * 0.7),
                                  borderRadius: BorderRadius.circular(6),
                                  border: isTopPeak ? Border.all(color: Colors.white, width: 1.2) : null,
                                ),
                                alignment: Alignment.center,
                                child: Text(
                                  '$score%',
                                  style: TextStyle(
                                    fontSize: 10,
                                    fontWeight: FontWeight.bold,
                                    color: isTopPeak ? Colors.black : Colors.white,
                                  ),
                                ),
                              ),
                            ),
                          );
                        }),
                      ],
                    ),
                  );
                }),
              ],
            ),
          ),

          const SizedBox(height: 16),

          // 2. BOUTON 1-CLIC AUTO-PLACER
          PlatformAdaptiveCard(
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: Colors.amberAccent.withOpacity(0.2),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(Icons.bolt, color: Colors.amberAccent, size: 24),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        '1-Clic "Auto-Placer" Intelligent',
                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: Colors.white),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        schedulerRepo.isAutoPlacerActive
                            ? 'Tous vos posts sont placés sur les créneaux 95%+'
                            : 'Optimise l\'ordre des posts selon le pic d\'audience.',
                        style: const TextStyle(fontSize: 12, color: Colors.white70),
                      ),
                    ],
                  ),
                ),
                PlatformAdaptiveButton(
                  text: schedulerRepo.isAutoPlacerActive ? 'Activé' : 'Optimiser',
                  variant: ButtonVariant.primary,
                  onPressed: schedulerRepo.isAutoPlacerActive ? null : () => schedulerRepo.triggerAutoPlacer(),
                ),
              ],
            ),
          ),

          const SizedBox(height: 20),

          // 3. FILE DE PUBLICATION & RÉSILIENCE TIER 2
          const Text(
            '📑 File de publication active',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
          ),
          const SizedBox(height: 10),

          ...schedulerRepo.posts.map((post) {
            return PlatformAdaptiveCard(
              margin: const EdgeInsets.only(bottom: 12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: Color(post.platform.colorHex).withOpacity(0.2),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: Text(
                          post.platform.label,
                          style: TextStyle(
                            color: Color(post.platform.colorHex),
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                      const Spacer(),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: post.resilienceTier == 2
                              ? Colors.amberAccent.withOpacity(0.2)
                              : const Color(0xFF10B981).withOpacity(0.2),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: Text(
                          post.resilienceTier == 2 ? 'Tier 2 : Mobile Fallback' : 'Tier 1 : API Directe',
                          style: TextStyle(
                            color: post.resilienceTier == 2 ? Colors.amberAccent : const Color(0xFF10B981),
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      ClipRRect(
                        borderRadius: BorderRadius.circular(10),
                        child: Image.network(post.mediaUrl, width: 64, height: 64, fit: BoxFit.cover),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              post.caption,
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(color: Colors.white, fontSize: 13),
                            ),
                            const SizedBox(height: 6),
                            Text(
                              '📅 ${post.scheduledAt} • Score rétention ${post.predictedEngagementScore}%',
                              style: const TextStyle(color: IOSLiquidGlassTheme.accentCyan, fontSize: 11, fontWeight: FontWeight.w600),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),

                  // Si Tier 2 : Option de fallback manuel (Presse-papier)
                  if (post.resilienceTier == 2) ...[
                    const SizedBox(height: 12),
                    LiquidGlassContainer(
                      padding: const EdgeInsets.all(10),
                      child: Row(
                        children: [
                          const Icon(Icons.touch_app, color: Colors.amberAccent, size: 18),
                          const SizedBox(width: 8),
                          const Expanded(
                            child: Text(
                              'API indisponible : Copiez le média et ouvrez l\'app.',
                              style: TextStyle(fontSize: 11, color: Colors.white70),
                            ),
                          ),
                          PlatformAdaptiveButton(
                            text: 'Copier & Publier',
                            variant: ButtonVariant.secondary,
                            onPressed: () {
                              Clipboard.setData(ClipboardData(text: post.caption));
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(content: Text('Légende copiée ! Prêt pour publication manuelle.')),
                              );
                            },
                          ),
                        ],
                      ),
                    ),
                  ],
                ],
              ),
            );
          }),

          const SizedBox(height: 30),
        ],
      ),
    );
  }
}
