import 'package:flutter/foundation.dart';
import '../models/dm_message_model.dart';
import '../services/mock_data_service.dart';

class DmRepository extends ChangeNotifier {
  List<DmMessageSimulation> _messages = List.from(MockDataService.sampleDms);
  DmMode _currentMode = DmMode.copilot;
  bool _isEmergencyPaused = false;
  String _activeConversationId = 'dm-1';

  List<DmMessageSimulation> get messages => List.unmodifiable(_messages);
  DmMode get currentMode => _currentMode;
  bool get isEmergencyPaused => _isEmergencyPaused;
  String get activeConversationId => _activeConversationId;

  DmMessageSimulation get activeMessage => _messages.firstWhere(
    (m) => m.id == _activeConversationId,
    orElse: () => _messages.first,
  );

  int get complianceCount => _messages.where((m) => m.within24h).length;
  double get complianceRate => _messages.isEmpty ? 100 : (complianceCount / _messages.length) * 100;

  void selectConversation(String id) {
    _activeConversationId = id;
    notifyListeners();
  }

  void setMode(DmMode mode) {
    _currentMode = mode;
    notifyListeners();
  }

  void toggleEmergencyPause() {
    _isEmergencyPaused = !_isEmergencyPaused;
    notifyListeners();
  }

  void sendReply(String replyText) {
    // Simulates an immediate sent reply
    final idx = _messages.indexWhere((m) => m.id == _activeConversationId);
    if (idx != -1) {
      final updated = _messages[idx].copyWith(
        autoReplyTriggered: true,
      );
      _messages[idx] = updated;
      notifyListeners();
    }
  }
}
