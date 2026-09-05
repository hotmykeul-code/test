import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:socialclone_mobile/core/theme/app_theme.dart';
import 'package:socialclone_mobile/core/widgets/liquid_glass_container.dart';
import 'package:socialclone_mobile/core/widgets/platform_adaptive_button.dart';
import 'package:socialclone_mobile/data/models/clone_profile_model.dart';
import 'package:socialclone_mobile/data/models/dm_message_model.dart';
import 'package:socialclone_mobile/data/models/scheduled_post_model.dart';
import 'package:socialclone_mobile/data/repositories/clone_repository.dart';
import 'package:socialclone_mobile/data/repositories/dm_repository.dart';
import 'package:socialclone_mobile/data/repositories/scheduler_repository.dart';

void main() {
  group('SocialClone AI Model & Theme Tests', () {
    test('ToneRadar should correctly hold 8-axis values and support equality', () {
      const tone1 = ToneRadar(
        humour: 45,
        formalisme: 20,
        energie: 88,
        empathie: 92,
        storytelling: 85,
        technicite: 60,
        clivage: 35,
        rythme: 90,
      );

      const tone2 = ToneRadar(
        humour: 45,
        formalisme: 20,
        energie: 88,
        empathie: 92,
        storytelling: 85,
        technicite: 60,
        clivage: 35,
        rythme: 90,
      );

      expect(tone1, equals(tone2));
      expect(tone1.hashCode, equals(tone2.hashCode));

      final updated = tone1.copyWith(humour: 60);
      expect(updated.humour, 60);
      expect(updated.rythme, 90);
      expect(updated, isNot(equals(tone1)));

      final map = tone1.toMap();
      expect(map['Humour'], 45);
      expect(map['Rythme'], 90);
    });

    test('Archetype parsing and descriptions', () {
      final mentor = Archetype.fromString('Mentor');
      expect(mentor, Archetype.mentor);
      expect(mentor.label, 'Mentor');

      final rebel = Archetype.fromString('Rebelle');
      expect(rebel, Archetype.rebelle);
    });

    test('30-day Recalibration lock calculation', () {
      const profile = HumanCloneProfile(
        id: 'test',
        name: 'Test Creator',
        handle: '@test',
        platform: 'INSTAGRAM',
        avatarUrl: '',
        videoLoopUrl: '',
        archetype: Archetype.mentor,
        toneRadar: ToneRadar(
          humour: 50,
          formalisme: 50,
          energie: 50,
          empathie: 50,
          storytelling: 50,
          technicite: 50,
          clivage: 50,
          rythme: 50,
        ),
        signatureWords: ['Franchement'],
        forbiddenWords: ['Jargon'],
        favouriteEmojis: ['🔥'],
        lastCalibrationDate: '2026-08-15',
        nextCalibrationDate: '2026-09-14',
        calibrationsRemainingDays: 16,
      );

      expect(profile.isRecalibrationLocked, true);
      expect(profile.calibrationsRemainingDays, 16);
    });

    test('DmRepository 24h compliance and reply simulation', () {
      final dmRepo = DmRepository();
      expect(dmRepo.messages.isNotEmpty, true);
      expect(dmRepo.complianceRate, greaterThan(50));
      expect(dmRepo.currentMode, DmMode.copilot);

      dmRepo.toggleEmergencyPause();
      expect(dmRepo.isEmergencyPaused, true);

      final firstMsg = dmRepo.messages.first;
      dmRepo.selectConversation(firstMsg.id);
      expect(dmRepo.activeConversationId, firstMsg.id);

      dmRepo.sendReply('Test direct reply');
      expect(dmRepo.activeMessage.autoReplyTriggered, true);
    });

    test('SchedulerRepository Auto-Placer and Tier 2 fallback', () {
      final schedulerRepo = SchedulerRepository();
      expect(schedulerRepo.isAutoPlacerActive, false);

      schedulerRepo.triggerAutoPlacer();
      expect(schedulerRepo.isAutoPlacerActive, true);
      expect(schedulerRepo.posts.first.predictedEngagementScore, 97);

      final firstPostId = schedulerRepo.posts.first.id;
      schedulerRepo.fallbackPostToTier2(firstPostId);
      final updatedPost = schedulerRepo.posts.firstWhere((p) => p.id == firstPostId);
      expect(updatedPost.status, PostStatus.level2Fallback);
      expect(updatedPost.resilienceTier, 2);
    });

    test('CloneRepository signature and forbidden words management', () {
      final cloneRepo = CloneRepository();
      final initialSigCount = cloneRepo.activeProfile.signatureWords.length;
      cloneRepo.addSignatureWord('Pépite');
      expect(cloneRepo.activeProfile.signatureWords.length, initialSigCount + 1);
      expect(cloneRepo.activeProfile.signatureWords.contains('Pépite'), true);

      cloneRepo.removeSignatureWord('Pépite');
      expect(cloneRepo.activeProfile.signatureWords.length, initialSigCount);

      final initialForbCount = cloneRepo.activeProfile.forbiddenWords.length;
      cloneRepo.addForbiddenWord('Spammy');
      expect(cloneRepo.activeProfile.forbiddenWords.length, initialForbCount + 1);

      cloneRepo.removeForbiddenWord('Spammy');
      expect(cloneRepo.activeProfile.forbiddenWords.length, initialForbCount);
    });

    test('AppThemeProvider toggle between Liquid Glass and Material 3', () {
      final themeProvider = AppThemeProvider();
      expect(themeProvider.currentMode, AppThemeMode.liquidGlassIOS);

      themeProvider.toggleTheme();
      expect(themeProvider.currentMode, AppThemeMode.material3Android);

      themeProvider.toggleTheme();
      expect(themeProvider.currentMode, AppThemeMode.systemAdaptive);
    });

    testWidgets('LiquidGlassContainer should build without BoxDecoration assertion failure', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: LiquidGlassContainer(
              borderRadius: 20,
              opacity: 0.2,
              child: Text('Test Glass Content'),
            ),
          ),
        ),
      );

      expect(find.text('Test Glass Content'), findsOneWidget);
    });

    testWidgets('PlatformAdaptiveButton renders properly in ThemeProvider context', (tester) async {
      await tester.pumpWidget(
        MultiProvider(
          providers: [
            ChangeNotifierProvider(create: (_) => AppThemeProvider()),
          ],
          child: MaterialApp(
            home: Scaffold(
              body: PlatformAdaptiveButton(
                text: 'Tester Bouton',
                onPressed: () {},
              ),
            ),
          ),
        ),
      );

      expect(find.text('Tester Bouton'), findsOneWidget);
    });
  });
}
