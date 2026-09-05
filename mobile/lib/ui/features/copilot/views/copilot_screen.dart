import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../../core/theme/app_theme.dart';
import '../../../../core/theme/ios_liquid_glass_theme.dart';
import '../../../../core/widgets/liquid_glass_container.dart';
import '../../../../core/widgets/platform_adaptive_button.dart';
import '../../../../core/widgets/platform_adaptive_card.dart';
import '../../../../data/models/dm_message_model.dart';
import '../../../../data/repositories/dm_repository.dart';

class CopilotScreen extends StatelessWidget {
  const CopilotScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final dmRepo = Provider.of<DmRepository>(context);
    final themeProvider = Provider.of<AppThemeProvider>(context);
    final isGlass = themeProvider.isLiquidGlass(context);

    final activeMessage = dmRepo.activeMessage;

    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 1. BANNIÈRE DE CONFORMITÉ 24H & ARRÊT D'URGENCE
          LiquidGlassContainer(
            child: Row(
              children: [
                Icon(
                  activeMessage.within24h ? Icons.verified : Icons.warning_amber_rounded,
                  color: activeMessage.within24h ? const Color(0xFF10B981) : Colors.amberAccent,
                  size: 28,
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        activeMessage.within24h
                            ? 'Conformité 24h Meta Vérifiée'
                            : 'Fenêtre 24h Dépassée (Verrouillé)',
                        style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: Colors.white),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        activeMessage.within24h
                            ? 'Le clone est autorisé à répondre automatiquement.'
                            : 'Conforme aux CGU : intervention humaine requise.',
                        style: const TextStyle(fontSize: 11, color: Colors.white70),
                      ),
                    ],
                  ),
                ),
                // Kill Switch
                IconButton(
                  icon: Icon(
                    dmRepo.isEmergencyPaused ? Icons.play_arrow : Icons.stop_circle,
                    color: dmRepo.isEmergencyPaused ? Colors.greenAccent : Colors.redAccent,
                  ),
                  tooltip: dmRepo.isEmergencyPaused ? 'Reprendre l\'automatisation' : 'Arrêt d\'Urgence (Kill Switch)',
                  onPressed: () => dmRepo.toggleEmergencyPause(),
                ),
              ],
            ),
          ),

          if (dmRepo.isEmergencyPaused) ...[
            const SizedBox(height: 10),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: Colors.red.withOpacity(0.2),
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: Colors.redAccent.withOpacity(0.5)),
              ),
              child: const Text(
                '🛑 ARRÊT D\'URGENCE ACTIF : Toutes les réponses automatiques sont suspendues.',
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.redAccent, fontSize: 12, fontWeight: FontWeight.bold),
              ),
            ),
          ],

          const SizedBox(height: 16),

          // 2. SÉLECTEUR DE MODE D'AUTOMATISATION
          const Text(
            '🤖 Mode d\'automatisation Copilote',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
          ),
          const SizedBox(height: 10),
          Row(
            children: DmMode.values.map((mode) {
              final isSelected = dmRepo.currentMode == mode;
              final shortLabels = {
                DmMode.auto: '100% Auto',
                DmMode.copilot: 'Semi-Auto',
                DmMode.hybrid: 'Hybride Mot-Clé',
              };
              return Expanded(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 4.0),
                  child: PlatformAdaptiveButton(
                    text: shortLabels[mode]!,
                    variant: isSelected ? ButtonVariant.primary : ButtonVariant.secondary,
                    onPressed: () => dmRepo.setMode(mode),
                  ),
                ),
              );
            }).toList(),
          ),

          const SizedBox(height: 20),

          // 3. SÉLECTEUR DE CONVERSATION (INBOX)
          const Text(
            '📩 Messages récents en attente',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
          ),
          const SizedBox(height: 10),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: dmRepo.messages.map((m) {
                final isSelected = m.id == dmRepo.activeConversationId;
                return GestureDetector(
                  onTap: () => dmRepo.selectConversation(m.id),
                  child: Container(
                    margin: const EdgeInsets.only(right: 10),
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                    decoration: BoxDecoration(
                      color: isSelected
                          ? IOSLiquidGlassTheme.accentCyan.withOpacity(0.25)
                          : Colors.white.withOpacity(0.06),
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(
                        color: isSelected ? IOSLiquidGlassTheme.accentCyan : Colors.white12,
                        width: isSelected ? 1.5 : 1.0,
                      ),
                    ),
                    child: Row(
                      children: [
                        CircleAvatar(radius: 14, backgroundImage: NetworkImage(m.avatar)),
                        const SizedBox(width: 8),
                        Text(
                          m.sender,
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 12,
                            fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                          ),
                        ),
                        if (m.autoReplyTriggered) ...[
                          const SizedBox(width: 6),
                          const Icon(Icons.check, size: 14, color: Colors.greenAccent),
                        ],
                      ],
                    ),
                  ),
                );
              }).toList(),
            ),
          ),

          const SizedBox(height: 16),

          // 4. CONVERSATION ACTIVE & SUGGESTIONS IA
          PlatformAdaptiveCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // En-tête de la conversation
                Row(
                  children: [
                    CircleAvatar(radius: 20, backgroundImage: NetworkImage(activeMessage.avatar)),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            activeMessage.sender,
                            style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 15),
                          ),
                          Text(
                            'Reçu ${activeMessage.timestamp}',
                            style: const TextStyle(color: Colors.white54, fontSize: 11),
                          ),
                        ],
                      ),
                    ),
                    // Badge d'intention
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: Color(activeMessage.intent.colorValue).withOpacity(0.2),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        activeMessage.intent.label,
                        style: TextStyle(
                          color: Color(activeMessage.intent.colorValue),
                          fontSize: 9,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                ),

                const SizedBox(height: 14),

                // Message reçu de l'utilisateur
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.08),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    activeMessage.content,
                    style: const TextStyle(color: Colors.white, fontSize: 14),
                  ),
                ),

                const SizedBox(height: 16),

                // Statut de réponse envoyée
                if (activeMessage.autoReplyTriggered) ...[
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: const Color(0xFF10B981).withOpacity(0.2),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: const Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.check_circle, color: Color(0xFF10B981), size: 16),
                        SizedBox(width: 8),
                        Text(
                          'Réponse envoyée au prospect !',
                          style: TextStyle(color: Color(0xFF10B981), fontSize: 12, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 14),
                ],

                // 3 Variantes de réponses IA
                const Text(
                  '💡 3 Réponses calibrées selon votre clone :',
                  style: TextStyle(color: Colors.white70, fontSize: 12, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 10),

                _buildReplyVariant(
                  title: 'Option 1 : Directe & Engageante',
                  content: activeMessage.suggestedReplies.directe,
                  onSend: () => dmRepo.sendReply(activeMessage.suggestedReplies.directe),
                ),
                _buildReplyVariant(
                  title: 'Option 2 : Pédagogique & Bienveillante',
                  content: activeMessage.suggestedReplies.pedagogique,
                  onSend: () => dmRepo.sendReply(activeMessage.suggestedReplies.pedagogique),
                ),
                _buildReplyVariant(
                  title: 'Option 3 : Orientation Conversion',
                  content: activeMessage.suggestedReplies.conversion,
                  onSend: () => dmRepo.sendReply(activeMessage.suggestedReplies.conversion),
                ),

                const SizedBox(height: 14),

                // Option Note Vocale Oralisée
                LiquidGlassContainer(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                  child: Row(
                    children: const [
                      Icon(Icons.mic, color: IOSLiquidGlassTheme.accentCyan, size: 20),
                      SizedBox(width: 10),
                      Expanded(
                        child: Text(
                          'Synthétiser en Note Vocale Oralisée (timbre, hésitations naturelles)',
                          style: TextStyle(fontSize: 12, color: Colors.white, fontWeight: FontWeight.w500),
                        ),
                      ),
                      Icon(Icons.play_circle_outline, color: IOSLiquidGlassTheme.accentCyan, size: 22),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 30),
        ],
      ),
    );
  }

  Widget _buildReplyVariant({
    required String title,
    required String content,
    required VoidCallback onSend,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.04),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: Colors.white10),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                title,
                style: const TextStyle(fontSize: 11, color: IOSLiquidGlassTheme.accentCyan, fontWeight: FontWeight.bold),
              ),
              GestureDetector(
                behavior: HitTestBehavior.opaque,
                onTap: onSend,
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 4.0, horizontal: 2.0),
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: IOSLiquidGlassTheme.accentCyan.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: const Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(Icons.send, size: 13, color: IOSLiquidGlassTheme.accentCyan),
                        SizedBox(width: 4),
                        Text('Envoyer', style: TextStyle(color: IOSLiquidGlassTheme.accentCyan, fontSize: 12, fontWeight: FontWeight.bold)),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          Text(
            content,
            style: const TextStyle(color: Colors.white70, fontSize: 12, height: 1.3),
          ),
        ],
      ),
    );
  }
}
