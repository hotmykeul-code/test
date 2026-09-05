import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

// Thèmes & Widgets Adaptatifs
import 'core/theme/app_theme.dart';
import 'core/theme/ios_liquid_glass_theme.dart';
import 'core/theme/android_material3_theme.dart';
import 'core/widgets/platform_adaptive_scaffold.dart';

// Repositories
import 'data/repositories/clone_repository.dart';
import 'data/repositories/dm_repository.dart';
import 'data/repositories/scheduler_repository.dart';

// Écrans des Fonctionnalités
import 'ui/features/dashboard/views/dashboard_screen.dart';
import 'ui/features/studio/views/studio_screen.dart';
import 'ui/features/copilot/views/copilot_screen.dart';
import 'ui/features/scheduler/views/scheduler_screen.dart';
import 'ui/features/clone/views/clone_screen.dart';
import 'ui/features/pricing/views/pricing_screen.dart';
import 'ui/features/accounts/views/accounts_screen.dart';
import 'ui/features/auth/views/auth_bottom_sheet.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AppThemeProvider()),
        ChangeNotifierProvider(create: (_) => CloneRepository()),
        ChangeNotifierProvider(create: (_) => DmRepository()),
        ChangeNotifierProvider(create: (_) => SchedulerRepository()),
      ],
      child: const SocialCloneApp(),
    ),
  );
}

class SocialCloneApp extends StatelessWidget {
  const SocialCloneApp({super.key});

  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<AppThemeProvider>(context);
    final isGlass = themeProvider.isLiquidGlass(context);

    return MaterialApp(
      title: 'SocialClone AI',
      debugShowCheckedModeBanner: false,
      theme: isGlass
          ? AndroidMaterial3Theme.material3Theme.copyWith(
              scaffoldBackgroundColor: IOSLiquidGlassTheme.backgroundDark,
            )
          : AndroidMaterial3Theme.material3Theme,
      darkTheme: isGlass
          ? AndroidMaterial3Theme.material3Theme.copyWith(
              scaffoldBackgroundColor: IOSLiquidGlassTheme.backgroundDark,
            )
          : AndroidMaterial3Theme.material3Theme,
      themeMode: ThemeMode.dark,
      home: const MainNavigationScreen(),
    );
  }
}

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentIndex = 0;

  final List<AdaptiveNavigationItem> _navigationItems = const [
    AdaptiveNavigationItem(
      label: 'Dashboard',
      cupertinoIcon: CupertinoIcons.home,
      materialIcon: Icons.dashboard_outlined,
    ),
    AdaptiveNavigationItem(
      label: 'Studio',
      cupertinoIcon: CupertinoIcons.videocam,
      materialIcon: Icons.video_library_outlined,
    ),
    AdaptiveNavigationItem(
      label: 'Copilote DM',
      cupertinoIcon: CupertinoIcons.chat_bubble_2,
      materialIcon: Icons.mark_chat_unread_outlined,
    ),
    AdaptiveNavigationItem(
      label: 'Planning',
      cupertinoIcon: CupertinoIcons.calendar,
      materialIcon: Icons.calendar_month_outlined,
    ),
    AdaptiveNavigationItem(
      label: 'Mon Clone',
      cupertinoIcon: CupertinoIcons.person_crop_circle,
      materialIcon: Icons.psychology_outlined,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<AppThemeProvider>(context);
    final isGlass = themeProvider.isLiquidGlass(context);

    final screens = [
      DashboardScreen(onNavigateTab: (index) => setState(() => _currentIndex = index)),
      const StudioScreen(),
      const CopilotScreen(),
      const SchedulerScreen(),
      const CloneScreen(),
    ];

    final titles = [
      'SocialClone AI',
      'Studio 9:16 Multi-Formats',
      'Copilote DM 24h',
      'Smart Scheduler 7x4',
      'Calibrage du Clone',
    ];

    return PlatformAdaptiveScaffold(
      title: titles[_currentIndex],
      currentIndex: _currentIndex,
      onIndexChanged: (index) => setState(() => _currentIndex = index),
      navigationItems: _navigationItems,
      actions: [
        // Bouton Forfaits / Tarification
        IconButton(
          tooltip: 'Forfaits & Tarifs',
          visualDensity: VisualDensity.compact,
          padding: const EdgeInsets.all(6),
          constraints: const BoxConstraints(minWidth: 34, minHeight: 34),
          icon: const Icon(Icons.diamond_outlined, color: Colors.amberAccent, size: 20),
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (_) => Scaffold(
                  backgroundColor: isGlass ? IOSLiquidGlassTheme.backgroundDark : null,
                  appBar: AppBar(
                    title: const Text('Tarifs & Abonnements'),
                    backgroundColor: Colors.transparent,
                    elevation: 0,
                  ),
                  body: const PricingScreen(),
                ),
              ),
            );
          },
        ),
        // Bouton Canaux Connectés
        IconButton(
          tooltip: 'Réseaux Sociaux Connectés',
          visualDensity: VisualDensity.compact,
          padding: const EdgeInsets.all(6),
          constraints: const BoxConstraints(minWidth: 34, minHeight: 34),
          icon: const Icon(Icons.link, color: Colors.white70, size: 20),
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (_) => Scaffold(
                  backgroundColor: isGlass ? IOSLiquidGlassTheme.backgroundDark : null,
                  appBar: AppBar(
                    title: const Text('Comptes Connectés'),
                    backgroundColor: Colors.transparent,
                    elevation: 0,
                  ),
                  body: const AccountsScreen(),
                ),
              ),
            );
          },
        ),
        // Bouton Profil / Connexion
        IconButton(
          tooltip: 'Connexion / Profil',
          visualDensity: VisualDensity.compact,
          padding: const EdgeInsets.all(6),
          constraints: const BoxConstraints(minWidth: 34, minHeight: 34),
          icon: const Icon(CupertinoIcons.person_circle, color: Colors.white70, size: 20),
          onPressed: () {
            showModalBottomSheet(
              context: context,
              isScrollControlled: true,
              backgroundColor: Colors.transparent,
              builder: (_) => const AuthBottomSheet(),
            );
          },
        ),
      ],
      body: screens[_currentIndex],
    );
  }
}
