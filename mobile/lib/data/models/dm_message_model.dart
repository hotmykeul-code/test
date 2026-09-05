enum DmMode {
  auto('100% Automatique', 'L\'IA répond instantanément selon le ton calibré de votre clone.'),
  copilot('Semi-Automatique', 'L\'IA génère 3 propositions de réponse à valider en 1 tap.'),
  hybrid('Hybride Déclencheur', 'Réponse auto uniquement sur mots-clés spécifiques (ex: GUIDE).');

  final String title;
  final String description;
  const DmMode(this.title, this.description);
}

enum DmIntent {
  prospectQualifie('PROSPECT QUALIFIÉ', 0xFF10B981),
  questionTechnique('QUESTION TECHNIQUE', 0xFF3B82F6),
  collaboration('COLLABORATION', 0xFF8B5CF6),
  remerciement('REMERCIEMENT', 0xFF06B6D4),
  reclamation('RÉCLAMATION', 0xFFF59E0B);

  final String label;
  final int colorValue;
  const DmIntent(this.label, this.colorValue);
}

enum DmUrgency {
  basse('Basse', 0xFF6B7280),
  moyenne('Moyenne', 0xFFF59E0B),
  haute('Haute', 0xFFEF4444);

  final String label;
  final int colorValue;
  const DmUrgency(this.label, this.colorValue);
}

class SuggestedReplies {
  final String directe;
  final String pedagogique;
  final String conversion;

  const SuggestedReplies({
    required this.directe,
    required this.pedagogique,
    required this.conversion,
  });

  factory SuggestedReplies.fromMap(Map<String, String> map) {
    return SuggestedReplies(
      directe: map['directe'] ?? '',
      pedagogique: map['pedagogique'] ?? '',
      conversion: map['conversion'] ?? '',
    );
  }
}

class DmMessageSimulation {
  final String id;
  final String sender;
  final String avatar;
  final String content;
  final String timestamp;
  final bool within24h;
  final DmIntent intent;
  final DmUrgency urgency;
  final SuggestedReplies suggestedReplies;
  final bool autoReplyTriggered;

  const DmMessageSimulation({
    required this.id,
    required this.sender,
    required this.avatar,
    required this.content,
    required this.timestamp,
    required this.within24h,
    required this.intent,
    required this.urgency,
    required this.suggestedReplies,
    this.autoReplyTriggered = false,
  });

  DmMessageSimulation copyWith({
    String? id,
    String? sender,
    String? avatar,
    String? content,
    String? timestamp,
    bool? within24h,
    DmIntent? intent,
    DmUrgency? urgency,
    SuggestedReplies? suggestedReplies,
    bool? autoReplyTriggered,
  }) {
    return DmMessageSimulation(
      id: id ?? this.id,
      sender: sender ?? this.sender,
      avatar: avatar ?? this.avatar,
      content: content ?? this.content,
      timestamp: timestamp ?? this.timestamp,
      within24h: within24h ?? this.within24h,
      intent: intent ?? this.intent,
      urgency: urgency ?? this.urgency,
      suggestedReplies: suggestedReplies ?? this.suggestedReplies,
      autoReplyTriggered: autoReplyTriggered ?? this.autoReplyTriggered,
    );
  }
}
