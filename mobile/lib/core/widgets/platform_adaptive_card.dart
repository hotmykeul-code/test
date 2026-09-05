import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../theme/app_theme.dart';
import 'liquid_glass_container.dart';

class PlatformAdaptiveCard extends StatelessWidget {
  final Widget child;
  final EdgeInsetsGeometry? padding;
  final EdgeInsetsGeometry? margin;
  final double borderRadius;
  final VoidCallback? onTap;
  final Color? color;

  const PlatformAdaptiveCard({
    super.key,
    required this.child,
    this.padding,
    this.margin,
    this.borderRadius = 20.0,
    this.onTap,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<AppThemeProvider>(context);
    final isGlass = themeProvider.isLiquidGlass(context);

    if (isGlass) {
      return LiquidGlassContainer(
        borderRadius: borderRadius,
        padding: padding ?? const EdgeInsets.all(16.0),
        margin: margin ?? const EdgeInsets.symmetric(vertical: 8.0),
        tintColor: color,
        onTap: onTap,
        child: child,
      );
    }

    final card = Card(
      margin: margin ?? const EdgeInsets.symmetric(vertical: 8.0),
      color: color ?? Theme.of(context).colorScheme.surfaceContainerHigh,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(borderRadius),
        side: BorderSide(
          color: Theme.of(context).colorScheme.outlineVariant.withOpacity(0.4),
          width: 0.8,
        ),
      ),
      child: Padding(
        padding: padding ?? const EdgeInsets.all(16.0),
        child: child,
      ),
    );

    if (onTap != null) {
      return InkWell(
        borderRadius: BorderRadius.circular(borderRadius),
        onTap: onTap,
        child: card,
      );
    }

    return card;
  }
}
