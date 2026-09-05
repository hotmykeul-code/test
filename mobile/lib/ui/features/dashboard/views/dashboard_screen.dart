import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../../core/theme/app_theme.dart';
import '../../../../core/theme/ios_liquid_glass_theme.dart';
import '../../../../core/widgets/platform_adaptive_button.dart';
import '../../../../core/widgets/platform_adaptive_card.dart';
import '../../../../data/repositories/clone_repository.dart';
import '../../../../data/repositories/dm_repository.dart';
import '../../../../data/repositories/scheduler_repository.dart';
import '../../onboarding/views/onboarding_wizard_screen.dart';

class DashboardScreen extends StatelessWidget {
  final ValueChanged<int> onNavigateTab;

  const DashboardScreen({super.key, required this.onNavigateTab});

  @override
  Widget build(BuildContext context) {
    final cloneRepo = Provider.of<CloneRepository>(context);
    final dmRepo = Provider.of<DmRepository>(context);
    final schedulerRepo = Provider.of<SchedulerRepository>(context);
    final themeProvider = Provider.of<AppThemeProvider>(context);
    final isGlass = themeProvider.isLiquidGlass(context);

    final activeProfile = cloneRepo.activeProfile;

    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 1. CARTE PROFIL DU CLONE ACTIF (HERO)
          PlatformAdaptiveCard(
            color: isGlass ? null : Theme.of(context).colorScheme.surfaceContainerHighest,
            child: Row(
              children: [
                Stack(
                  children: [
                    CircleAvatar(
                      radius: 30,
                      backgroundImage: NetworkImage(activeProfile.avatarUrl),
                    ),
                    Positioned(
                      bottom: 0,
                      right: 0,
                      child: Container(
                        padding: const EdgeInsets.all(4),
                        decoration: const BoxDecoration(
                          color: Color(0xFF10B981),
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(Icons.check, color: Colors.black, size: 10),
                      ),
                    ),
                  ],
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Text(
                            activeProfile.name,
                            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
                          ),
                          const SizedBox(width: 6),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                            decoration: BoxDecoration(
                              color: IOSLiquidGlassTheme.accentCyan.withOpacity(0.2),
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: const Text(
                              'PRO',
                              style: TextStyle(
                                color: IOSLiquidGlassTheme.accentCyan,
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 2),
                      Text(
                        '${activeProfile.handle} • Archétype ${activeProfile.archetype.label}',
                        style: const TextStyle(fontSize: 12, color: Colors.white70),
                      ),
                    ],
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.restart_alt, color: Colors.white70),
                  tooltip: 'Relancer l\'onboarding',
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (_) => const OnboardingWizardScreen()),
                    );
                  },
                ),
              ],
            ),
          ),

          const SizedBox(height: 12),

          // 2. 4 CARTES KPI CLÉS
          Row(
            children: [
              Expanded(
                child: _buildMetricCard(
                  context: context,
                  isGlass: isGlass,
                  icon: Icons.shield_outlined,
                  color: const Color(0xFF10B981),
                  label: 'Conformité 24h',
                  value: '${dmRepo.complianceRate.toInt()}%',
                  subtitle: 'Règles Meta OK',
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: _buildMetricCard(
                  context: context,
                  isGlass: isGlass,
                  icon: Icons.trending_up,
                  color: IOSLiquidGlassTheme.accentCyan,
                  label: 'Score Rétention',
                  value: '94%',
                  subtitle: '+18% vs humain',
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Row(
            children: [
              Expanded(
                child: _buildMetricCard(
                  context: context,
                  isGlass: isGlass,
                  icon: Icons.schedule,
                  color: IOSLiquidGlassTheme.accentIndigo,
                  label: 'Prochain Post',
                  value: '18:30',
                  subtitle: 'Créneau Optimal',
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: _buildMetricCard(
                  context: context,
                  isGlass: isGlass,
                  icon: Icons.bolt,
                  color: Colors.amberAccent,
                  label: 'Crédits 9:16',
                  value: '50',
                  subtitle: 'Offerts à vie',
                ),
              ),
            ],
          ),

          const SizedBox(height: 20),

          // 3. ACTIONS RAPIDES CRÉATEUR
          const Text(
            '⚡ Actions Rapides',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
          ),
          const SizedBox(height: 10),
          Row(
            children: [
              Expanded(
                child: PlatformAdaptiveButton(
                  text: 'Studio 9:16',
                  icon: Icons.video_call,
                  variant: ButtonVariant.primary,
                  onPressed: () => onNavigateTab(1), // Onglet Studio
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: PlatformAdaptiveButton(
                  text: 'Copilote DM',
                  icon: Icons.chat_bubble_outline,
                  variant: ButtonVariant.secondary,
                  onPressed: () => onNavigateTab(2), // Onglet Copilote
                ),
              ),
            ],
          ),

          const SizedBox(height: 20),

          // 4. DERNIER MESSAGE DM EN ATTENTE
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                '💬 Copilote DM (En direct)',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
              ),
              TextButton(
                onPressed: () => onNavigateTab(2),
                child: const Text('Ouvrir tout', style: TextStyle(color: IOSLiquidGlassTheme.accentCyan, fontSize: 13)),
              ),
            ],
          ),
          PlatformAdaptiveCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    CircleAvatar(
                      radius: 16,
                      backgroundImage: NetworkImage(dmRepo.activeMessage.avatar),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            dmRepo.activeMessage.sender,
                            style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white, fontSize: 14),
                          ),
                          Text(
                            dmRepo.activeMessage.timestamp,
                            style: const TextStyle(fontSize: 11, color: Colors.white60),
                          ),
                        ],
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(
                        color: Color(dmRepo.activeMessage.intent.colorValue).withOpacity(0.2),
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: Text(
                        dmRepo.activeMessage.intent.label,
                        style: TextStyle(
                          color: Color(dmRepo.activeMessage.intent.colorValue),
                          fontSize: 9,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                Text(
                  dmRepo.activeMessage.content,
                  style: const TextStyle(color: Colors.white, fontSize: 13),
                ),
                const SizedBox(height: 12),
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.06),
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: Colors.white12),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.auto_awesome, color: IOSLiquidGlassTheme.accentCyan, size: 16),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Builder(
                          builder: (context) {
                            final directText = dmRepo.activeMessage.suggestedReplies.directe;
                            final previewText = directText.length > 45 ? '${directText.substring(0, 45)}...' : directText;
                            return Text(
                              'Réponse IA prête : « $previewText »',
                              style: const TextStyle(fontSize: 12, color: Colors.white70),
                              overflow: TextOverflow.ellipsis,
                            );
                          },
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 20),

          // 5. PROCHAINE PUBLICATION PLANIFIÉE
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                '📅 File de publication active',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
              ),
              TextButton(
                onPressed: () => onNavigateTab(3), // Scheduler
                child: const Text('Heatmap 7x4', style: TextStyle(color: IOSLiquidGlassTheme.accentCyan, fontSize: 13)),
              ),
            ],
          ),
          if (schedulerRepo.posts.isNotEmpty)
            PlatformAdaptiveCard(
              child: Row(
                children: [
                  ClipRRect(
                    borderRadius: BorderRadius.circular(10),
                    child: Image.network(
                      schedulerRepo.posts.first.mediaUrl,
                      width: 60,
                      height: 60,
                      fit: BoxFit.cover,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Text(
                              schedulerRepo.posts.first.platform.label,
                              style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13),
                            ),
                            const Spacer(),
                            Text(
                              schedulerRepo.posts.first.scheduledAt,
                              style: const TextStyle(color: IOSLiquidGlassTheme.accentCyan, fontSize: 11, fontWeight: FontWeight.bold),
                            ),
                          ],
                        ),
                        const SizedBox(height: 4),
                        Text(
                          schedulerRepo.posts.first.caption,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(color: Colors.white70, fontSize: 12),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            )
          else
            const PlatformAdaptiveCard(
              child: Padding(
                padding: EdgeInsets.symmetric(vertical: 12.0),
                child: Center(
                  child: Text(
                    'Aucune publication en attente. Générez un post depuis le Studio !',
                    style: TextStyle(color: Colors.white60, fontSize: 13),
                  ),
                ),
              ),
            ),
          const SizedBox(height: 30),
        ],
      ),
    );
  }

  Widget _buildMetricCard({
    required BuildContext context,
    required bool isGlass,
    required IconData icon,
    required Color color,
    required String label,
    required String value,
    required String subtitle,
  }) {
    return PlatformAdaptiveCard(
      padding: const EdgeInsets.all(14.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Icon(icon, color: color, size: 20),
              Text(
                value,
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: color),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            label,
            style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: Colors.white),
          ),
          const SizedBox(height: 2),
          Text(
            subtitle,
            style: const TextStyle(fontSize: 11, color: Colors.white54),
          ),
        ],
      ),
    );
  }
}
