import 'package:flutter/foundation.dart';

enum Archetype {
  mentor('Mentor', 'Pédagogue, bienveillant, orienté transmission et action structurée.'),
  vulgarisateur('Vulgarisateur', 'Rend les concepts complexes limpides et ultra-accessibles.'),
  rebelle('Rebelle', 'Clivant, direct, déconstruit les mythes et vérités établies.'),
  leader('Leader', 'Inspirant, visionnaire, focalisé sur la transformation et l\'impact.'),
  expert('Expert', 'Technique, analytique, précis et centré sur la donnée probante.'),
  storyteller('Storyteller', 'Émotionnel, narratif, captive par des récits immersifs.');

  final String label;
  final String description;
  const Archetype(this.label, this.description);

  static Archetype fromString(String value) {
    return Archetype.values.firstWhere(
      (e) => e.label.toLowerCase() == value.toLowerCase() || e.name.toLowerCase() == value.toLowerCase(),
      orElse: () => Archetype.mentor,
    );
  }
}

@immutable
class ToneRadar {
  final double humour;
  final double formalisme;
  final double energie;
  final double empathie;
  final double storytelling;
  final double technicite;
  final double clivage;
  final double rythme;

  const ToneRadar({
    required this.humour,
    required this.formalisme,
    required this.energie,
    required this.empathie,
    required this.storytelling,
    required this.technicite,
    required this.clivage,
    required this.rythme,
  });

  ToneRadar copyWith({
    double? humour,
    double? formalisme,
    double? energie,
    double? empathie,
    double? storytelling,
    double? technicite,
    double? clivage,
    double? rythme,
  }) {
    return ToneRadar(
      humour: humour ?? this.humour,
      formalisme: formalisme ?? this.formalisme,
      energie: energie ?? this.energie,
      empathie: empathie ?? this.empathie,
      storytelling: storytelling ?? this.storytelling,
      technicite: technicite ?? this.technicite,
      clivage: clivage ?? this.clivage,
      rythme: rythme ?? this.rythme,
    );
  }

  Map<String, double> toMap() => {
    'Humour': humour,
    'Formalisme': formalisme,
    'Énergie': energie,
    'Empathie': empathie,
    'Storytelling': storytelling,
    'Technicité': technicite,
    'Clivage': clivage,
    'Rythme': rythme,
  };

  factory ToneRadar.fromMap(Map<String, dynamic> map) {
    return ToneRadar(
      humour: (map['humour'] ?? 50).toDouble(),
      formalisme: (map['formalisme'] ?? 30).toDouble(),
      energie: (map['energie'] ?? 80).toDouble(),
      empathie: (map['empathie'] ?? 75).toDouble(),
      storytelling: (map['storytelling'] ?? 80).toDouble(),
      technicite: (map['technicite'] ?? 60).toDouble(),
      clivage: (map['clivage'] ?? 40).toDouble(),
      rythme: (map['rythme'] ?? 85).toDouble(),
    );
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is ToneRadar &&
        other.humour == humour &&
        other.formalisme == formalisme &&
        other.energie == energie &&
        other.empathie == empathie &&
        other.storytelling == storytelling &&
        other.technicite == technicite &&
        other.clivage == clivage &&
        other.rythme == rythme;
  }

  @override
  int get hashCode => Object.hash(
        humour,
        formalisme,
        energie,
        empathie,
        storytelling,
        technicite,
        clivage,
        rythme,
      );
}

@immutable
class HumanCloneProfile {
  final String id;
  final String name;
  final String handle;
  final String platform;
  final String avatarUrl;
  final String videoLoopUrl;
  final Archetype archetype;
  final ToneRadar toneRadar;
  final List<String> signatureWords;
  final List<String> forbiddenWords;
  final List<String> favouriteEmojis;
  final String? voiceSampleUrl;
  final String lastCalibrationDate;
  final String nextCalibrationDate;
  final int calibrationsRemainingDays;

  const HumanCloneProfile({
    required this.id,
    required this.name,
    required this.handle,
    required this.platform,
    required this.avatarUrl,
    required this.videoLoopUrl,
    required this.archetype,
    required this.toneRadar,
    required this.signatureWords,
    required this.forbiddenWords,
    required this.favouriteEmojis,
    this.voiceSampleUrl,
    required this.lastCalibrationDate,
    required this.nextCalibrationDate,
    required this.calibrationsRemainingDays,
  });

  bool get isRecalibrationLocked => calibrationsRemainingDays > 0;

  HumanCloneProfile copyWith({
    String? id,
    String? name,
    String? handle,
    String? platform,
    String? avatarUrl,
    String? videoLoopUrl,
    Archetype? archetype,
    ToneRadar? toneRadar,
    List<String>? signatureWords,
    List<String>? forbiddenWords,
    List<String>? favouriteEmojis,
    String? voiceSampleUrl,
    String? lastCalibrationDate,
    String? nextCalibrationDate,
    int? calibrationsRemainingDays,
  }) {
    return HumanCloneProfile(
      id: id ?? this.id,
      name: name ?? this.name,
      handle: handle ?? this.handle,
      platform: platform ?? this.platform,
      avatarUrl: avatarUrl ?? this.avatarUrl,
      videoLoopUrl: videoLoopUrl ?? this.videoLoopUrl,
      archetype: archetype ?? this.archetype,
      toneRadar: toneRadar ?? this.toneRadar,
      signatureWords: signatureWords ?? this.signatureWords,
      forbiddenWords: forbiddenWords ?? this.forbiddenWords,
      favouriteEmojis: favouriteEmojis ?? this.favouriteEmojis,
      voiceSampleUrl: voiceSampleUrl ?? this.voiceSampleUrl,
      lastCalibrationDate: lastCalibrationDate ?? this.lastCalibrationDate,
      nextCalibrationDate: nextCalibrationDate ?? this.nextCalibrationDate,
      calibrationsRemainingDays: calibrationsRemainingDays ?? this.calibrationsRemainingDays,
    );
  }
}
