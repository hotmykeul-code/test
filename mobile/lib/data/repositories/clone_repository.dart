import 'package:flutter/foundation.dart';
import '../models/clone_profile_model.dart';
import '../services/mock_data_service.dart';

class CloneRepository extends ChangeNotifier {
  List<HumanCloneProfile> _profiles = List.from(MockDataService.sampleProfiles);
  int _activeProfileIndex = 0;

  List<HumanCloneProfile> get profiles => List.unmodifiable(_profiles);
  HumanCloneProfile get activeProfile => _profiles[_activeProfileIndex];
  int get activeIndex => _activeProfileIndex;

  void selectProfile(int index) {
    if (index >= 0 && index < _profiles.length) {
      _activeProfileIndex = index;
      notifyListeners();
    }
  }

  void updateToneRadar(ToneRadar newTone) {
    final updated = activeProfile.copyWith(toneRadar: newTone);
    _profiles[_activeProfileIndex] = updated;
    notifyListeners();
  }

  void updateArchetype(Archetype archetype) {
    final updated = activeProfile.copyWith(archetype: archetype);
    _profiles[_activeProfileIndex] = updated;
    notifyListeners();
  }

  void addSignatureWord(String word) {
    if (word.trim().isEmpty) return;
    final words = List<String>.from(activeProfile.signatureWords);
    if (!words.contains(word.trim())) {
      words.add(word.trim());
      _profiles[_activeProfileIndex] = activeProfile.copyWith(signatureWords: words);
      notifyListeners();
    }
  }

  void removeSignatureWord(String word) {
    final words = List<String>.from(activeProfile.signatureWords)..remove(word);
    _profiles[_activeProfileIndex] = activeProfile.copyWith(signatureWords: words);
    notifyListeners();
  }

  void addForbiddenWord(String word) {
    if (word.trim().isEmpty) return;
    final words = List<String>.from(activeProfile.forbiddenWords);
    if (!words.contains(word.trim())) {
      words.add(word.trim());
      _profiles[_activeProfileIndex] = activeProfile.copyWith(forbiddenWords: words);
      notifyListeners();
    }
  }

  void removeForbiddenWord(String word) {
    final words = List<String>.from(activeProfile.forbiddenWords)..remove(word);
    _profiles[_activeProfileIndex] = activeProfile.copyWith(forbiddenWords: words);
    notifyListeners();
  }
}
