import 'package:flutter/material.dart';
import '../../../../core/widgets/platform_adaptive_button.dart';
import '../../../../core/widgets/platform_adaptive_card.dart';

class AccountsScreen extends StatelessWidget {
  const AccountsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final accounts = [
      {
        'name': 'Instagram',
        'handle': '@alex.growth',
        'icon': Icons.camera_alt,
        'color': 0xFFE1306C,
        'status': 'Synchronisé',
        'lastSync': 'Il y a 12 min',
        'isHealthy': true,
      },
      {
        'name': 'TikTok',
        'handle': '@alex.ai_tok',
        'icon': Icons.music_note,
        'color': 0xFF00F2FE,
        'status': 'Synchronisé',
        'lastSync': 'Il y a 25 min',
        'isHealthy': true,
      },
      {
        'name': 'YouTube Shorts',
        'handle': 'Alex V. Shorts',
        'icon': Icons.play_arrow,
        'color': 0xFFFF0000,
        'status': 'Synchronisé',
        'lastSync': 'Il y a 1 h',
        'isHealthy': true,
      },
      {
        'name': 'Threads',
        'handle': '@alex.growth',
        'icon': Icons.alternate_email,
        'color': 0xFFFFFFFF,
        'status': 'Synchronisé',
        'lastSync': 'Il y a 45 min',
        'isHealthy': true,
      },
      {
        'name': 'LinkedIn',
        'handle': 'Non connecté',
        'icon': Icons.business,
        'color': 0xFF0A66C2,
        'status': 'Déconnecté',
        'lastSync': 'Jamais',
        'isHealthy': false,
      },
      {
        'name': 'X (Twitter)',
        'handle': 'Non connecté',
        'icon': Icons.tag,
        'color': 0xFF1DA1F2,
        'status': 'Déconnecté',
        'lastSync': 'Jamais',
        'isHealthy': false,
      },
    ];

    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            '🔗 Canaux & Comptes Réseaux Sociaux',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white),
          ),
          const SizedBox(height: 6),
          const Text(
            'Gérez les jetons d\'accès officiels OAuth et l\'état de la synchronisation 24/7.',
            style: TextStyle(fontSize: 13, color: Colors.white70),
          ),
          const SizedBox(height: 16),

          ...accounts.map((acc) {
            final isHealthy = acc['isHealthy'] as bool;
            return PlatformAdaptiveCard(
              margin: const EdgeInsets.only(bottom: 12),
              child: Row(
                children: [
                  CircleAvatar(
                    backgroundColor: Color(acc['color'] as int).withOpacity(0.2),
                    child: Icon(acc['icon'] as IconData, color: Color(acc['color'] as int), size: 20),
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Text(
                              acc['name'] as String,
                              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: Colors.white),
                            ),
                            const SizedBox(width: 6),
                            Container(
                              width: 8,
                              height: 8,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: isHealthy ? const Color(0xFF10B981) : Colors.grey,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 2),
                        Text(
                          acc['handle'] as String,
                          style: const TextStyle(fontSize: 12, color: Colors.white70),
                        ),
                        Text(
                          'Dernière sync : ${acc['lastSync']}',
                          style: const TextStyle(fontSize: 10, color: Colors.white38),
                        ),
                      ],
                    ),
                  ),
                  PlatformAdaptiveButton(
                    text: isHealthy ? 'Actualiser' : 'Connecter',
                    variant: isHealthy ? ButtonVariant.ghost : ButtonVariant.secondary,
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Synchronisation du canal ${acc['name']} effectuée.')),
                      );
                    },
                  ),
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
