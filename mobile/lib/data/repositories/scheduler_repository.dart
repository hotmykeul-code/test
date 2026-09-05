import 'package:flutter/foundation.dart';
import '../models/scheduled_post_model.dart';
import '../services/mock_data_service.dart';

class SchedulerRepository extends ChangeNotifier {
  List<ScheduledPost> _posts = List.from(MockDataService.sampleScheduledPosts);
  final List<List<int>> _heatmap = List.from(MockDataService.weeklyEngagementHeatmap);
  bool _isAutoPlacerActive = false;

  List<ScheduledPost> get posts => List.unmodifiable(_posts);
  List<List<int>> get heatmap => List.unmodifiable(_heatmap);
  bool get isAutoPlacerActive => _isAutoPlacerActive;

  int get optimalEngagementSlotScore => 98; // Dimanche 18h / 21h

  void addPost(ScheduledPost post) {
    _posts.insert(0, post);
    notifyListeners();
  }

  void triggerAutoPlacer() {
    _isAutoPlacerActive = true;
    // Optimize slots for all scheduled posts
    _posts = _posts.map((post) {
      if (post.status == PostStatus.scheduled) {
        return post.copyWith(
          predictedEngagementScore: 97,
          bestTimeSlot: '⚡ Optimisé par l\'IA (Créneau 97%+)',
        );
      }
      return post;
    }).toList();
    notifyListeners();
  }

  void fallbackPostToTier2(String id) {
    final idx = _posts.indexWhere((p) => p.id == id);
    if (idx != -1) {
      _posts[idx] = _posts[idx].copyWith(
        status: PostStatus.level2Fallback,
        resilienceTier: 2,
      );
      notifyListeners();
    }
  }
}
