import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../../core/theme/app_theme.dart';
import '../../../../core/theme/ios_liquid_glass_theme.dart';
import '../../../../core/widgets/platform_adaptive_button.dart';
import '../../../../core/widgets/platform_adaptive_card.dart';
import '../../../../data/models/pricing_plan_model.dart';
import '../../../../data/services/mock_data_service.dart';

class PricingScreen extends StatefulWidget {
  const PricingScreen({super.key});

  @override
  State<PricingScreen> createState() => _PricingScreenState();
}

class _PricingScreenState extends State<PricingScreen> {
  bool _isAnnual = true;

  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<AppThemeProvider>(context);
    final isGlass = themeProvider.isLiquidGlass(context);

    final plans = MockDataService.pricingPlans;

    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            '💎 Tarification & Forfaits Créateurs',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white),
          ),
          const SizedBox(height: 6),
          const Text(
            'Débloquez le potentiel illimité de votre clone et l\'automatisation 24/7 des messages.',
            style: TextStyle(fontSize: 13, color: Colors.white70),
          ),
          const SizedBox(height: 16),

          // Commutateur Mensuel / Annuel (-20%)
          Center(
            child: Container(
              padding: const EdgeInsets.all(4),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.08),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.white12),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  GestureDetector(
                    onTap: () => setState(() => _isAnnual = false),
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                      decoration: BoxDecoration(
                        color: !_isAnnual ? IOSLiquidGlassTheme.accentCyan : Colors.transparent,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        'Facturation Mensuelle',
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          color: !_isAnnual ? Colors.black : Colors.white70,
                        ),
                      ),
                    ),
                  ),
                  GestureDetector(
                    onTap: () => setState(() => _isAnnual = true),
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                      decoration: BoxDecoration(
                        color: _isAnnual ? IOSLiquidGlassTheme.accentCyan : Colors.transparent,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Row(
                        children: [
                          Text(
                            'Annuel (-20%)',
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                              color: _isAnnual ? Colors.black : Colors.white70,
                            ),
                          ),
                          const SizedBox(width: 4),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 2),
                            decoration: BoxDecoration(
                              color: Colors.amberAccent,
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: const Text('PROMO', style: TextStyle(color: Colors.black, fontSize: 8, fontWeight: FontWeight.bold)),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),

          const SizedBox(height: 20),

          // Cartes de tarification
          ...plans.map((plan) {
            final isPopular = plan.tier.isPopular;
            final price = _isAnnual ? plan.annualPrice : '${plan.tier.monthlyPrice} / mois';

            return PlatformAdaptiveCard(
              margin: const EdgeInsets.only(bottom: 16),
              color: isPopular ? IOSLiquidGlassTheme.accentIndigo.withOpacity(0.22) : null,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        plan.tier.title,
                        style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
                      ),
                      if (isPopular)
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(
                            gradient: const LinearGradient(
                              colors: [IOSLiquidGlassTheme.accentCyan, IOSLiquidGlassTheme.accentIndigo],
                            ),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: const Text(
                            'RECOMMANDÉ',
                            style: TextStyle(color: Colors.black, fontSize: 10, fontWeight: FontWeight.bold),
                          ),
                        ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(
                    plan.tier.subtitle,
                    style: const TextStyle(fontSize: 12, color: Colors.white70),
                  ),
                  const SizedBox(height: 12),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.baseline,
                    textBaseline: TextBaseline.alphabetic,
                    children: [
                      Text(
                        price,
                        style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
                      ),
                    ],
                  ),
                  const Divider(color: Colors.white12, height: 24),
                  ...plan.features.map((f) => Padding(
                        padding: const EdgeInsets.symmetric(vertical: 3.0),
                        child: Row(
                          children: [
                            const Icon(Icons.check_circle, color: Color(0xFF10B981), size: 16),
                            const SizedBox(width: 8),
                            Expanded(child: Text(f, style: const TextStyle(color: Colors.white, fontSize: 13))),
                          ],
                        ),
                      )),
                  ...plan.limitations.map((l) => Padding(
                        padding: const EdgeInsets.symmetric(vertical: 3.0),
                        child: Row(
                          children: [
                            const Icon(Icons.remove_circle_outline, color: Colors.white38, size: 16),
                            const SizedBox(width: 8),
                            Expanded(child: Text(l, style: const TextStyle(color: Colors.white54, fontSize: 12))),
                          ],
                        ),
                      )),
                  const SizedBox(height: 16),
                  PlatformAdaptiveButton(
                    text: isPopular ? 'Souscrire Pro (In-App / Stripe)' : 'Choisir ce plan',
                    variant: isPopular ? ButtonVariant.primary : ButtonVariant.secondary,
                    width: double.infinity,
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Initialisation sécurisée du checkout pour ${plan.tier.title}...')),
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
