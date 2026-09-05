import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../theme/app_theme.dart';
import '../theme/ios_liquid_glass_theme.dart';

class AdaptiveNavigationItem {
  final String label;
  final IconData cupertinoIcon;
  final IconData materialIcon;

  const AdaptiveNavigationItem({
    required this.label,
    required this.cupertinoIcon,
    required this.materialIcon,
  });
}

class PlatformAdaptiveScaffold extends StatelessWidget {
  final String title;
  final Widget body;
  final int currentIndex;
  final ValueChanged<int> onIndexChanged;
  final List<AdaptiveNavigationItem> navigationItems;
  final List<Widget>? actions;
  final Widget? floatingActionButton;

  const PlatformAdaptiveScaffold({
    super.key,
    required this.title,
    required this.body,
    required this.currentIndex,
    required this.onIndexChanged,
    required this.navigationItems,
    this.actions,
    this.floatingActionButton,
  });

  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<AppThemeProvider>(context);
    final isGlass = themeProvider.isLiquidGlass(context);

    // Sélecteur de thème universel (bouton d'action dans la barre de titre)
    final themeSwitcherAction = IconButton(
      tooltip: 'Changer de thème (Liquid Glass vs Material 3)',
      icon: Icon(
        isGlass ? CupertinoIcons.sparkles : Icons.palette_outlined,
        color: isGlass ? IOSLiquidGlassTheme.accentCyan : Theme.of(context).colorScheme.primary,
      ),
      onPressed: () {
        _showThemePickerDialog(context, themeProvider);
      },
    );

    final combinedActions = [
      if (actions != null) ...actions!,
      themeSwitcherAction,
    ];

    if (isGlass) {
      // 🍏 RENDU IOS "LIQUID GLASS"
      return CupertinoTheme(
        data: IOSLiquidGlassTheme.cupertinoTheme,
        child: Container(
          decoration: const BoxDecoration(
            gradient: IOSLiquidGlassTheme.liquidBackgroundGradient,
          ),
          child: Stack(
            children: [
              // Orbe d'ambiance en dégradé radial (Glow)
              Positioned(
                top: -80,
                right: -60,
                child: Container(
                  width: 240,
                  height: 240,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    gradient: RadialGradient(
                      colors: [
                        IOSLiquidGlassTheme.accentCyan.withOpacity(0.22),
                        Colors.transparent,
                      ],
                    ),
                  ),
                ),
              ),
              Positioned(
                bottom: 120,
                left: -70,
                child: Container(
                  width: 260,
                  height: 260,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    gradient: RadialGradient(
                      colors: [
                        IOSLiquidGlassTheme.accentIndigo.withOpacity(0.18),
                        Colors.transparent,
                      ],
                    ),
                  ),
                ),
              ),

              // Scaffold Cupertino avec ancêtre Material transparent pour supporter les actions et widgets hybrides
              Material(
                type: MaterialType.transparency,
                child: CupertinoPageScaffold(
                  backgroundColor: Colors.transparent,
                  navigationBar: CupertinoNavigationBar(
                    backgroundColor: const Color(0x7307090E),
                    border: Border(
                      bottom: BorderSide(
                        color: Colors.white.withOpacity(0.12),
                        width: 0.5,
                      ),
                    ),
                    middle: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: IOSLiquidGlassTheme.accentCyan.withOpacity(0.2),
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(
                              color: IOSLiquidGlassTheme.accentCyan.withOpacity(0.4),
                              width: 0.8,
                            ),
                          ),
                          child: const Text(
                            'IOS GLASS',
                            style: TextStyle(
                              color: IOSLiquidGlassTheme.accentCyan,
                              fontSize: 9,
                              fontWeight: FontWeight.bold,
                              letterSpacing: 0.5,
                            ),
                          ),
                        ),
                        const SizedBox(width: 8),
                        Flexible(
                          child: Text(
                            title,
                            overflow: TextOverflow.ellipsis,
                            style: const TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.w600,
                              fontSize: 16,
                            ),
                          ),
                        ),
                      ],
                    ),
                    trailing: Material(
                      type: MaterialType.transparency,
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: combinedActions,
                      ),
                    ),
                  ),
                  child: SafeArea(
                    bottom: false,
                    child: Stack(
                      children: [
                        Column(
                          children: [
                            Expanded(child: body),

                            // Barre de navigation inférieure Liquid Glass
                            ClipRRect(
                              child: BackdropFilter(
                                filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
                                child: Container(
                                  decoration: BoxDecoration(
                                    color: const Color(0x990A0E17),
                                    border: Border(
                                      top: BorderSide(
                                        color: Colors.white.withOpacity(0.15),
                                        width: 0.8,
                                      ),
                                    ),
                                  ),
                                  child: SafeArea(
                                    top: false,
                                    child: CupertinoTabBar(
                                      backgroundColor: Colors.transparent,
                                      currentIndex: currentIndex,
                                      activeColor: IOSLiquidGlassTheme.accentCyan,
                                      inactiveColor: Colors.white54,
                                      onTap: onIndexChanged,
                                      items: navigationItems.map((item) {
                                        return BottomNavigationBarItem(
                                          icon: Icon(item.cupertinoIcon),
                                          label: item.label,
                                        );
                                      }).toList(),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                        if (floatingActionButton != null)
                          Positioned(
                            bottom: 70,
                            right: 16,
                            child: floatingActionButton!,
                          ),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      );
    }

    // 🤖 RENDU ANDROID "MATERIAL 3 EXPRESSIVE"
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.primaryContainer,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                'M3 ANDROID',
                style: TextStyle(
                  color: Theme.of(context).colorScheme.onPrimaryContainer,
                  fontSize: 9,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 0.5,
                ),
              ),
            ),
            const SizedBox(width: 8),
            Text(
              title,
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
            ),
          ],
        ),
        actions: combinedActions,
      ),
      body: body,
      floatingActionButton: floatingActionButton,
      bottomNavigationBar: NavigationBar(
        selectedIndex: currentIndex,
        onDestinationSelected: onIndexChanged,
        destinations: navigationItems.map((item) {
          return NavigationDestination(
            icon: Icon(item.materialIcon),
            selectedIcon: Icon(item.materialIcon, color: Theme.of(context).colorScheme.onPrimaryContainer),
            label: item.label,
          );
        }).toList(),
      ),
    );
  }

  void _showThemePickerDialog(BuildContext context, AppThemeProvider provider) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (ctx) {
        return Container(
          decoration: BoxDecoration(
            color: const Color(0xFF131722),
            borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
            border: Border.all(color: Colors.white.withOpacity(0.15)),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
          child: SafeArea(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  '🎨 Choisir le Design System Mobile',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
                ),
                const SizedBox(height: 6),
                const Text(
                  'Basculez instantanément pour tester les deux univers graphiques :',
                  style: TextStyle(fontSize: 13, color: Colors.white70),
                ),
                const SizedBox(height: 16),
                ...AppThemeMode.values.map((mode) {
                  final isSelected = provider.currentMode == mode;
                  return ListTile(
                    contentPadding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                    leading: Icon(
                      mode == AppThemeMode.liquidGlassIOS
                          ? CupertinoIcons.sparkles
                          : mode == AppThemeMode.material3Android
                              ? Icons.android
                              : Icons.devices,
                      color: isSelected ? IOSLiquidGlassTheme.accentCyan : Colors.white60,
                    ),
                    title: Text(
                      mode.title,
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                      ),
                    ),
                    subtitle: Text(
                      mode.subtitle,
                      style: const TextStyle(fontSize: 11, color: Colors.white54),
                    ),
                    trailing: isSelected
                        ? const Icon(Icons.check_circle, color: IOSLiquidGlassTheme.accentCyan)
                        : null,
                    onTap: () {
                      provider.setThemeMode(mode);
                      Navigator.pop(ctx);
                    },
                  );
                }),
              ],
            ),
          ),
        );
      },
    );
  }
}
