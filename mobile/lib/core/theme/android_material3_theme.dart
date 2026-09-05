import 'package:flutter/material.dart';

/// Spécifications et design tokens du Thème Android "Material 3 Expressive"
/// Inspiré par les directives Material You d'Android 14 et Android 15.
class AndroidMaterial3Theme {
  // Teinte de base dynamique M3
  static const Color seedColor = Color(0xFF6366F1); // Indigo moderne

  // Palette tonale sombre M3
  static const Color primaryDark = Color(0xFFC0C1FF);
  static const Color onPrimaryDark = Color(0xFF2825A7);
  static const Color primaryContainerDark = Color(0xFF3F41BF);
  static const Color onPrimaryContainerDark = Color(0xFFE0E0FF);

  static const Color secondaryDark = Color(0xFFC7C5DD);
  static const Color onSecondaryDark = Color(0xFF2F2F42);
  static const Color secondaryContainerDark = Color(0xFF464559);
  static const Color onSecondaryContainerDark = Color(0xFFE4E1F9);

  static const Color tertiaryDark = Color(0xFFEDB8CC);
  static const Color onTertiaryDark = Color(0xFF492535);
  static const Color tertiaryContainerDark = Color(0xFF623B4B);
  static const Color onTertiaryContainerDark = Color(0xFFFFD8E6);

  // Surfaces tonales M3
  static const Color surfaceDark = Color(0xFF131318);
  static const Color onSurfaceDark = Color(0xFFE4E1E9);
  static const Color surfaceContainerLowest = Color(0xFF0E0E13);
  static const Color surfaceContainerLow = Color(0xFF1B1B20);
  static const Color surfaceContainer = Color(0xFF1F1F25);
  static const Color surfaceContainerHigh = Color(0xFF2A2930);
  static const Color surfaceContainerHighest = Color(0xFF35343B);

  static ThemeData get material3Theme {
    final colorScheme = ColorScheme(
      brightness: Brightness.dark,
      primary: primaryDark,
      onPrimary: onPrimaryDark,
      primaryContainer: primaryContainerDark,
      onPrimaryContainer: onPrimaryContainerDark,
      secondary: secondaryDark,
      onSecondary: onSecondaryDark,
      secondaryContainer: secondaryContainerDark,
      onSecondaryContainer: onSecondaryContainerDark,
      tertiary: tertiaryDark,
      onTertiary: onTertiaryDark,
      tertiaryContainer: tertiaryContainerDark,
      onTertiaryContainer: onTertiaryContainerDark,
      error: const Color(0xFFFFB4AB),
      onError: const Color(0xFF690005),
      errorContainer: const Color(0xFF93000A),
      onErrorContainer: const Color(0xFFFFDAD6),
      surface: surfaceDark,
      onSurface: onSurfaceDark,
      surfaceContainerLowest: surfaceContainerLowest,
      surfaceContainerLow: surfaceContainerLow,
      surfaceContainer: surfaceContainer,
      surfaceContainerHigh: surfaceContainerHigh,
      surfaceContainerHighest: surfaceContainerHighest,
      outline: const Color(0xFF918F9A),
      outlineVariant: const Color(0xFF46454F),
    );

    return ThemeData(
      useMaterial3: true,
      colorScheme: colorScheme,
      scaffoldBackgroundColor: surfaceDark,
      appBarTheme: const AppBarTheme(
        backgroundColor: surfaceContainerLow,
        foregroundColor: onSurfaceDark,
        elevation: 0,
        centerTitle: false,
        scrolledUnderElevation: 2,
      ),
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: surfaceContainer,
        indicatorColor: primaryContainerDark,
        elevation: 3,
        labelBehavior: NavigationDestinationLabelBehavior.alwaysShow,
        iconTheme: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return const IconThemeData(color: onPrimaryContainerDark);
          }
          return const IconThemeData(color: onSurfaceDark);
        }),
      ),
      cardTheme: CardThemeData(
        color: surfaceContainerHigh,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: const BorderSide(color: Color(0xFF46454F), width: 0.5),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primaryDark,
          foregroundColor: onPrimaryDark,
          shape: const StadiumBorder(),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          elevation: 0,
        ),
      ),
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          backgroundColor: primaryContainerDark,
          foregroundColor: onPrimaryContainerDark,
          shape: const StadiumBorder(),
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
        ),
      ),
      chipTheme: ChipThemeData(
        backgroundColor: surfaceContainerHigh,
        selectedColor: primaryContainerDark,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        side: const BorderSide(color: Color(0xFF46454F), width: 0.5),
      ),
    );
  }
}
