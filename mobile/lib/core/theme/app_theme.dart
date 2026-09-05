import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

enum AppThemeMode {
  systemAdaptive('Automatique (OS)', 'Adapte selon iOS (Liquid Glass) ou Android (Material 3)'),
  liquidGlassIOS('iOS Liquid Glass', 'Verre dépoli, reflets spéculaires et composants Cupertino'),
  material3Android('Android Material 3', 'Material You Expressive, surfaces tonales et navigation M3');

  final String title;
  final String subtitle;
  const AppThemeMode(this.title, this.subtitle);
}

class AppThemeProvider extends ChangeNotifier {
  AppThemeMode _currentMode = AppThemeMode.liquidGlassIOS; // Default to showcase liquid glass, can be toggled

  AppThemeMode get currentMode => _currentMode;

  bool isLiquidGlass(BuildContext context) {
    if (_currentMode == AppThemeMode.liquidGlassIOS) return true;
    if (_currentMode == AppThemeMode.material3Android) return false;
    // System adaptive
    final platform = Theme.of(context).platform;
    return platform == TargetPlatform.iOS || platform == TargetPlatform.macOS;
  }

  void setThemeMode(AppThemeMode mode) {
    _currentMode = mode;
    notifyListeners();
  }

  void toggleTheme() {
    if (_currentMode == AppThemeMode.liquidGlassIOS) {
      _currentMode = AppThemeMode.material3Android;
    } else if (_currentMode == AppThemeMode.material3Android) {
      _currentMode = AppThemeMode.systemAdaptive;
    } else {
      _currentMode = AppThemeMode.liquidGlassIOS;
    }
    notifyListeners();
  }
}
