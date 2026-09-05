enum SocialPlatform {
  instagram('Instagram', 'Reels / Feed', 0xFFE1306C),
  tiktok('TikTok', 'Short-Form 9:16', 0xFF00F2FE),
  youtube('YouTube Shorts', 'Shorts 9:16', 0xFFFF0000),
  threads('Threads', 'Micro-blogging', 0xFFFFFFFF),
  linkedin('LinkedIn', 'Professionnel', 0xFF0A66C2),
  x('X (Twitter)', 'Direct feed', 0xFF1DA1F2);

  final String label;
  final String format;
  final int colorHex;
  const SocialPlatform(this.label, this.format, this.colorHex);
}

enum PostStatus {
  scheduled('Planifié', 0xFF3B82F6),
  published('Publié', 0xFF10B981),
  level2Fallback('Fallback Manuel L2', 0xFFF59E0B),
  failed('Erreur', 0xFFEF4444),
  draft('Brouillon', 0xFF6B7280);

  final String label;
  final int colorHex;
  const PostStatus(this.label, this.colorHex);
}

class ScheduledPost {
  final String id;
  final SocialPlatform platform;
  final String mediaUrl;
  final String caption;
  final String scheduledAt;
  final PostStatus status;
  final int resilienceTier;
  final int predictedEngagementScore;
  final String? bestTimeSlot;

  const ScheduledPost({
    required this.id,
    required this.platform,
    required this.mediaUrl,
    required this.caption,
    required this.scheduledAt,
    required this.status,
    required this.resilienceTier,
    required this.predictedEngagementScore,
    this.bestTimeSlot,
  });

  ScheduledPost copyWith({
    String? id,
    SocialPlatform? platform,
    String? mediaUrl,
    String? caption,
    String? scheduledAt,
    PostStatus? status,
    int? resilienceTier,
    int? predictedEngagementScore,
    String? bestTimeSlot,
  }) {
    return ScheduledPost(
      id: id ?? this.id,
      platform: platform ?? this.platform,
      mediaUrl: mediaUrl ?? this.mediaUrl,
      caption: caption ?? this.caption,
      scheduledAt: scheduledAt ?? this.scheduledAt,
      status: status ?? this.status,
      resilienceTier: resilienceTier ?? this.resilienceTier,
      predictedEngagementScore: predictedEngagementScore ?? this.predictedEngagementScore,
      bestTimeSlot: bestTimeSlot ?? this.bestTimeSlot,
    );
  }
}
