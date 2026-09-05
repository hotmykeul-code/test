enum SlideStep {
  hook('ACCROCHE (HOOK)', 'Diapositive 1 : Stop-scroll 3 secondes.'),
  valeur('VALEUR (CONTENU)', 'Diapositive 2 : Cœur de la méthode sans friction.'),
  action('ACTION (CTA)', 'Diapositive 3 : Mot-clé déclencheur DM ou sauvegarde.');

  final String title;
  final String description;
  const SlideStep(this.title, this.description);
}

class CarouselSlide {
  final SlideStep step;
  final String title;
  final String content;
  final String visualNote;
  final String? ctaText;

  const CarouselSlide({
    required this.step,
    required this.title,
    required this.content,
    required this.visualNote,
    this.ctaText,
  });

  CarouselSlide copyWith({
    SlideStep? step,
    String? title,
    String? content,
    String? visualNote,
    String? ctaText,
  }) {
    return CarouselSlide(
      step: step ?? this.step,
      title: title ?? this.title,
      content: content ?? this.content,
      visualNote: visualNote ?? this.visualNote,
      ctaText: ctaText ?? this.ctaText,
    );
  }
}

class BatchIdea {
  final String id;
  final String angle;
  final String title;
  final int score;
  final String format;
  final String hook;
  final String? coreValue;
  final String? ctaAction;

  const BatchIdea({
    required this.id,
    required this.angle,
    required this.title,
    required this.score,
    required this.format,
    required this.hook,
    this.coreValue,
    this.ctaAction,
  });
}
