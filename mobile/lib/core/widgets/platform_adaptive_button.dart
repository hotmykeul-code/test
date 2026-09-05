import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import '../theme/app_theme.dart';
import '../theme/ios_liquid_glass_theme.dart';

enum ButtonVariant { primary, secondary, ghost }

class PlatformAdaptiveButton extends StatelessWidget {
  final String text;
  final IconData? icon;
  final VoidCallback? onPressed;
  final ButtonVariant variant;
  final bool isLoading;
  final double? width;

  const PlatformAdaptiveButton({
    super.key,
    required this.text,
    this.icon,
    required this.onPressed,
    this.variant = ButtonVariant.primary,
    this.isLoading = false,
    this.width,
  });

  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<AppThemeProvider>(context);
    final isGlass = themeProvider.isLiquidGlass(context);

    if (isGlass) {
      return SizedBox(
        width: width,
        child: CupertinoButton(
          padding: EdgeInsets.zero,
          onPressed: onPressed == null || isLoading
              ? null
              : () {
                  HapticFeedback.lightImpact();
                  onPressed!();
                },
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(16),
              gradient: variant == ButtonVariant.primary
                  ? const LinearGradient(
                      colors: [
                        IOSLiquidGlassTheme.accentCyan,
                        IOSLiquidGlassTheme.accentIndigo,
                      ],
                    )
                  : variant == ButtonVariant.secondary
                      ? LinearGradient(
                          colors: [
                            Colors.white.withOpacity(0.18),
                            Colors.white.withOpacity(0.06),
                          ],
                        )
                      : null,
              border: Border.all(
                color: variant == ButtonVariant.ghost
                    ? Colors.white.withOpacity(0.2)
                    : Colors.white.withOpacity(0.35),
                width: 1,
              ),
              boxShadow: variant == ButtonVariant.primary
                  ? [
                      BoxShadow(
                        color: IOSLiquidGlassTheme.accentCyan.withOpacity(0.3),
                        blurRadius: 16,
                        offset: const Offset(0, 4),
                      ),
                    ]
                  : null,
            ),
            child: Row(
              mainAxisSize: width != null ? MainAxisSize.max : MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                if (isLoading)
                  const CupertinoActivityIndicator(color: Colors.white)
                else ...[
                  if (icon != null) ...[
                    Icon(
                      icon,
                      size: 18,
                      color: variant == ButtonVariant.primary ? Colors.black : Colors.white,
                    ),
                    const SizedBox(width: 8),
                  ],
                  Text(
                    text,
                    style: TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w600,
                      letterSpacing: -0.2,
                      color: variant == ButtonVariant.primary ? Colors.black : Colors.white,
                    ),
                  ),
                ],
              ],
            ),
          ),
        ),
      );
    }

    // Android Material 3 Expressive
    Widget buttonContent = Row(
      mainAxisSize: width != null ? MainAxisSize.max : MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        if (isLoading)
          SizedBox(
            width: 18,
            height: 18,
            child: CircularProgressIndicator(
              strokeWidth: 2,
              color: variant == ButtonVariant.primary
                  ? Theme.of(context).colorScheme.onPrimary
                  : Theme.of(context).colorScheme.primary,
            ),
          )
        else ...[
          if (icon != null) ...[
            Icon(icon, size: 18),
            const SizedBox(width: 8),
          ],
          Text(
            text,
            style: const TextStyle(fontWeight: FontWeight.w600),
          ),
        ],
      ],
    );

    if (variant == ButtonVariant.primary) {
      return SizedBox(
        width: width,
        child: FilledButton(
          onPressed: isLoading ? null : onPressed,
          style: FilledButton.styleFrom(
            shape: const StadiumBorder(),
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          ),
          child: buttonContent,
        ),
      );
    } else if (variant == ButtonVariant.secondary) {
      return SizedBox(
        width: width,
        child: FilledButton.tonal(
          onPressed: isLoading ? null : onPressed,
          style: FilledButton.styleFrom(
            shape: const StadiumBorder(),
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          ),
          child: buttonContent,
        ),
      );
    } else {
      return SizedBox(
        width: width,
        child: OutlinedButton(
          onPressed: isLoading ? null : onPressed,
          style: OutlinedButton.styleFrom(
            shape: const StadiumBorder(),
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
            side: BorderSide(
              color: Theme.of(context).colorScheme.outlineVariant,
            ),
          ),
          child: buttonContent,
        ),
      );
    }
  }
}
