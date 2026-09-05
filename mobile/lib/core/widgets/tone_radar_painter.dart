import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../data/models/clone_profile_model.dart';
import '../theme/ios_liquid_glass_theme.dart';

class ToneRadarWidget extends StatelessWidget {
  final ToneRadar tone;
  final double size;
  final bool isInteractive;
  final ValueChanged<ToneRadar>? onToneChanged;

  const ToneRadarWidget({
    super.key,
    required this.tone,
    this.size = 280,
    this.isInteractive = false,
    this.onToneChanged,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: size,
      height: size,
      child: CustomPaint(
        painter: ToneRadarPainter(tone: tone),
      ),
    );
  }
}

class ToneRadarPainter extends CustomPainter {
  final ToneRadar tone;

  ToneRadarPainter({required this.tone});

  static const List<String> axisLabels = [
    'Humour',
    'Formalisme',
    'Énergie',
    'Empathie',
    'Storytelling',
    'Technicité',
    'Clivage',
    'Rythme',
  ];

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = (math.min(size.width, size.height) / 2) - 40;

    final gridPaint = Paint()
      ..color = Colors.white.withOpacity(0.12)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.0;

    final axisPaint = Paint()
      ..color = Colors.white.withOpacity(0.20)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.0;

    // 1. Dessiner les 5 octogones concentriques (20%, 40%, 60%, 80%, 100%)
    for (int i = 1; i <= 5; i++) {
      final r = radius * (i / 5.0);
      final path = Path();
      for (int j = 0; j < 8; j++) {
        final angle = (j * math.pi / 4) - (math.pi / 2);
        final x = center.dx + r * math.cos(angle);
        final y = center.dy + r * math.sin(angle);
        if (j == 0) {
          path.moveTo(x, y);
        } else {
          path.lineTo(x, y);
        }
      }
      path.close();
      canvas.drawPath(path, gridPaint);
    }

    // 2. Dessiner les 8 rayons et les libellés
    const textStyle = TextStyle(
      color: Color(0xFFD1D5DB),
      fontSize: 10,
      fontWeight: FontWeight.w600,
    );

    for (int i = 0; i < 8; i++) {
      final angle = (i * math.pi / 4) - (math.pi / 2);
      final x = center.dx + radius * math.cos(angle);
      final y = center.dy + radius * math.sin(angle);

      canvas.drawLine(center, Offset(x, y), axisPaint);

      // Dessiner le libellé de l'axe
      final labelRadius = radius + 22;
      final lx = center.dx + labelRadius * math.cos(angle);
      final ly = center.dy + labelRadius * math.sin(angle);

      final textSpan = TextSpan(text: axisLabels[i], style: textStyle);
      final textPainter = TextPainter(
        text: textSpan,
        textAlign: TextAlign.center,
        textDirection: TextDirection.ltr,
      )..layout();

      textPainter.paint(
        canvas,
        Offset(lx - (textPainter.width / 2), ly - (textPainter.height / 2)),
      );
      textPainter.dispose();
    }

    // 3. Dessiner la forme du clone avec lueur néon
    final values = [
      tone.humour,
      tone.formalisme,
      tone.energie,
      tone.empathie,
      tone.storytelling,
      tone.technicite,
      tone.clivage,
      tone.rythme,
    ];

    final polyPath = Path();
    final points = <Offset>[];

    for (int i = 0; i < 8; i++) {
      final angle = (i * math.pi / 4) - (math.pi / 2);
      final valPercent = (values[i].clamp(0, 100)) / 100.0;
      final r = radius * valPercent;
      final px = center.dx + r * math.cos(angle);
      final py = center.dy + r * math.sin(angle);
      final point = Offset(px, py);
      points.add(point);

      if (i == 0) {
        polyPath.moveTo(px, py);
      } else {
        polyPath.lineTo(px, py);
      }
    }
    polyPath.close();

    // Remplissage avec dégradé translucide
    final fillPaint = Paint()
      ..shader = const LinearGradient(
        colors: [
          Color(0x7300F2FE), // Cyan translucide
          Color(0x738B5CF6), // Violet translucide
        ],
      ).createShader(Rect.fromCircle(center: center, radius: radius))
      ..style = PaintingStyle.fill;
    canvas.drawPath(polyPath, fillPaint);

    // Contour néon
    final strokePaint = Paint()
      ..color = IOSLiquidGlassTheme.accentCyan
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2.5;
    canvas.drawPath(polyPath, strokePaint);

    // Lueur des sommets
    final dotPaint = Paint()..color = Colors.white;
    final glowPaint = Paint()
      ..color = IOSLiquidGlassTheme.accentCyan.withOpacity(0.6)
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 6);

    for (final p in points) {
      canvas.drawCircle(p, 6, glowPaint);
      canvas.drawCircle(p, 3.5, dotPaint);
    }
  }

  @override
  bool shouldRepaint(covariant ToneRadarPainter oldDelegate) {
    return oldDelegate.tone != tone;
  }
}
