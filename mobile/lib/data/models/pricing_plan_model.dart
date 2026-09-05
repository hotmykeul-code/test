enum PlanTier {
  free('Gratuit', '0 €', 'Pour tester la création sans automatisation', false),
  pro('Pro Créateur', '9 €', 'L\'autonomie totale pour créateurs solos et pros', true),
  agency('Agence Multi-Comptes', '79 €', 'Pour les équipes, labels et agences de gestion', false);

  final String title;
  final String monthlyPrice;
  final String subtitle;
  final bool isPopular;
  const PlanTier(this.title, this.monthlyPrice, this.subtitle, this.isPopular);
}

class PricingPlan {
  final PlanTier tier;
  final String annualPrice;
  final List<String> features;
  final List<String> limitations;

  const PricingPlan({
    required this.tier,
    required this.annualPrice,
    required this.features,
    required this.limitations,
  });
}
