import 'dart:ui';
import 'package:flutter/material.dart';
import '../theme/ios_liquid_glass_theme.dart';

/// Conteneur "Liquid Glass" reproduisant l'effet de verre dépoli haute fidélité
/// avec réfraction de la lumière (BackdropFilter), bordure spéculaire biseautée
/// et lueur diffuse d'ambiance.
class LiquidGlassContainer extends StatelessWidget {
  final Widget child;
  final double borderRadius;
  final EdgeInsetsGeometry? padding;
  final EdgeInsetsGeometry? margin;
  final double blurSigma;
  final Color? tintColor;
  final double opacity;
  final bool hasSpecularBorder;
  final List<BoxShadow>? customShadows;
  final VoidCallback? onTap;

  const LiquidGlassContainer({
    super.key,
    required this.child,
    this.borderRadius = 24.0,
    this.padding,
    this.margin,
    this.blurSigma = 18.0,
    this.tintColor,
    this.opacity = 0.12,
    this.hasSpecularBorder = true,
    this.customShadows,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final effectiveColor = tintColor ?? Colors.white;
    final topOpacity = (opacity * 1.5).clamp(0.0, 1.0);
    final bottomOpacity = (opacity * 0.4).clamp(0.0, 1.0);

    Widget content = Container(
      padding: padding ?? const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(borderRadius),
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            effectiveColor.withOpacity(topOpacity),
            effectiveColor.withOpacity(bottomOpacity),
          ],
        ),
      ),
      child: child,
    );

    // Encadrement spéculaire
    if (hasSpecularBorder) {
      content = Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(borderRadius),
          gradient: IOSLiquidGlassTheme.specularBorderGradient,
        ),
        padding: const EdgeInsets.all(1.0), // Épaisseur du liseré spéculaire
        child: ClipRRect(
          borderRadius: BorderRadius.circular(borderRadius - 1.0),
          child: content,
        ),
      );
    }

    Widget glass = ClipRRect(
      borderRadius: BorderRadius.circular(borderRadius),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: blurSigma, sigmaY: blurSigma),
        child: content,
      ),
    );

    if (customShadows != null || hasSpecularBorder) {
      glass = Container(
        margin: margin,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(borderRadius),
          boxShadow: customShadows ?? IOSLiquidGlassTheme.glassShadow,
        ),
        child: glass,
      );
    } else if (margin != null) {
      glass = Container(margin: margin, child: glass);
    }

    if (onTap != null) {
      return GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTap: onTap,
        child: glass,
      );
    }

    return glass;
  }
}
