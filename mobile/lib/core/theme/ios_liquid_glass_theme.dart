import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

/// Spécifications et design tokens du Thème iOS "Liquid Glass"
/// Inspiré par les matériaux translucides, VisionOS et iOS 18/19.
class IOSLiquidGlassTheme {
  // Palette de couleurs Liquid Glass
  static const Color backgroundDark = Color(0xFF07090E);
  static const Color backgroundOverlay = Color(0xFF0F1523);
  static const Color glassSurface = Color(0x28FFFFFF);
  static const Color glassSurfaceHover = Color(0x3DFFFFFF);
  static const Color glassSurfaceActive = Color(0x52FFFFFF);

  // Accents néons et lueurs liquides
  static const Color accentCyan = Color(0xFF00F2FE);
  static const Color accentIndigo = Color(0xFF6366F1);
  static const Color accentViolet = Color(0xFF8B5CF6);
  static const Color accentAmber = Color(0xFFF59E0B);
  static const Color accentPink = Color(0xFFEC4899);

  // Bordures spéculaires biseautées
  static const Color specularBorderTop = Color(0x59FFFFFF); // 35% blanc
  static const Color specularBorderBottom = Color(0x14FFFFFF); // 8% blanc

  // Ombres diffuses douces
  static List<BoxShadow> get glassShadow => [
    BoxShadow(
      color: Colors.black.withOpacity(0.35),
      blurRadius: 24,
      spreadRadius: -4,
      offset: const Offset(0, 12),
    ),
    BoxShadow(
      color: accentCyan.withOpacity(0.08),
      blurRadius: 32,
      spreadRadius: 0,
      offset: const Offset(0, 0),
    ),
  ];

  // Dégradé de bordure spéculaire
  static Gradient get specularBorderGradient => const LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [
      Color(0x66FFFFFF), // Liseré réfléchissant
      Color(0x1FFFFFFF),
      Color(0x0AFFFFFF),
    ],
    stops: [0.0, 0.45, 1.0],
  );

  // Dégradé de fond de verre
  static Gradient get glassGradient => LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [
      Colors.white.withOpacity(0.14),
      Colors.white.withOpacity(0.05),
    ],
  );

  // Dégradé de fond d'écran liquide
  static const Gradient liquidBackgroundGradient = RadialGradient(
    center: Alignment(-0.6, -0.7),
    radius: 1.4,
    colors: [
      Color(0xFF1E1B4B), // Indigo profond
      Color(0xFF0B1120), // Nuit bleue
      Color(0xFF05070B), // Noir absolu
    ],
    stops: [0.0, 0.5, 1.0],
  );

  static CupertinoThemeData get cupertinoTheme => const CupertinoThemeData(
    brightness: Brightness.dark,
    primaryColor: accentCyan,
    primaryContrastingColor: Color(0xFF000000),
    barBackgroundColor: Color(0x7307090E), // Translucide avec flou
    scaffoldBackgroundColor: backgroundDark,
    textTheme: CupertinoTextThemeData(
      primaryColor: Colors.white,
      textStyle: TextStyle(
        fontFamily: '.SF Pro Text',
        color: Colors.white,
        letterSpacing: -0.2,
      ),
      navTitleTextStyle: TextStyle(
        fontFamily: '.SF Pro Display',
        fontSize: 17,
        fontWeight: FontWeight.w600,
        color: Colors.white,
        letterSpacing: -0.4,
      ),
      navLargeTitleTextStyle: TextStyle(
        fontFamily: '.SF Pro Display',
        fontSize: 34,
        fontWeight: FontWeight.w700,
        color: Colors.white,
        letterSpacing: 0.37,
      ),
    ),
  );
}
