import '../models/clone_profile_model.dart';
import '../models/dm_message_model.dart';
import '../models/scheduled_post_model.dart';
import '../models/carousel_slide_model.dart';
import '../models/pricing_plan_model.dart';

class MockDataService {
  static final List<HumanCloneProfile> sampleProfiles = [
    const HumanCloneProfile(
      id: 'alex',
      name: 'Alex V.',
      handle: '@alex.growth',
      platform: 'INSTAGRAM',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      videoLoopUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-on-a-video-call-42880-large.mp4',
      archetype: Archetype.mentor,
      toneRadar: ToneRadar(
        humour: 45,
        formalisme: 20,
        energie: 88,
        empathie: 92,
        storytelling: 85,
        technicite: 60,
        clivage: 35,
        rythme: 90,
      ),
      signatureWords: ['Franchement', 'Déclic', 'Sans détour', 'Action concrète', 'Structure'],
      forbiddenWords: ['Jargon', 'Peut-être', 'Éventuellement', 'Supercharge', 'Disruptif'],
      favouriteEmojis: ['🔥', '💡', '🎯', '⚡', '👇'],
      lastCalibrationDate: '2026-08-15',
      nextCalibrationDate: '2026-09-14',
      calibrationsRemainingDays: 16,
    ),
    const HumanCloneProfile(
      id: 'sarah',
      name: 'Sarah K.',
      handle: '@sarah.tech_ai',
      platform: 'TIKTOK',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      videoLoopUrl: 'https://assets.mixkit.co/videos/preview/mixkit-businesswoman-talking-on-a-video-call-in-an-office-42882-large.mp4',
      archetype: Archetype.vulgarisateur,
      toneRadar: ToneRadar(
        humour: 70,
        formalisme: 15,
        energie: 95,
        empathie: 75,
        storytelling: 80,
        technicite: 85,
        clivage: 50,
        rythme: 92,
      ),
      signatureWords: ['Regarde bien', 'En 30 secondes', 'Astuce secrète', 'Testé et prouvé'],
      forbiddenWords: ['Théorème', 'Prolégomènes', 'Empowerment', 'SaaS'],
      favouriteEmojis: ['🤯', '✨', '🚀', '👀', '📌'],
      lastCalibrationDate: '2026-08-20',
      nextCalibrationDate: '2026-09-19',
      calibrationsRemainingDays: 21,
    ),
    const HumanCloneProfile(
      id: 'thomas',
      name: 'Thomas R.',
      handle: '@thomas.rebel',
      platform: 'THREADS',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      videoLoopUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-looking-at-camera-in-close-up-42884-large.mp4',
      archetype: Archetype.rebelle,
      toneRadar: ToneRadar(
        humour: 65,
        formalisme: 10,
        energie: 90,
        empathie: 50,
        storytelling: 70,
        technicite: 70,
        clivage: 95,
        rythme: 85,
      ),
      signatureWords: ['Vérité qui fâche', 'Arrêtez tout', 'L\'erreur 99%', 'La réalité brute'],
      forbiddenWords: ['Veuillez agréer', 'Bienveillant', 'Politiquement correct'],
      favouriteEmojis: ['🚫', '💣', '🧠', '📉', '🤫'],
      lastCalibrationDate: '2026-08-01',
      nextCalibrationDate: '2026-08-31',
      calibrationsRemainingDays: 2,
    ),
  ];

  static final List<DmMessageSimulation> sampleDms = [
    const DmMessageSimulation(
      id: 'dm-1',
      sender: 'marc_startup',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      content: 'Salut ! J\'ai adoré ton dernier post sur le clonage vocal. Tu as un guide ou une démo pour le déployer sur notre équipe de 5 personnes ?',
      timestamp: 'Il y a 14 min',
      within24h: true,
      intent: DmIntent.prospectQualifie,
      urgency: DmUrgency.haute,
      suggestedReplies: SuggestedReplies(
        directe: 'Salut Marc ! Merci beaucoup ! Oui absolument, je t\'envoie le lien d\'accès immédiat au studio de calibrage : app.socialclone.ai/demo 🔥',
        pedagogique: 'Salut Marc ! Ravi que le post t\'ait plu. Pour une équipe de 5, vous pouvez configurer vos clones en moins de 3 minutes chacun avec notre studio guidé express. Veux-tu que je te débloque un accès d\'essai ?',
        conversion: 'Hello Marc ! Avec 5 créateurs, la formule Pro vous permet de synchroniser chaque compte en 1 clic. Voici ton invitation prioritaire : [Lien Démo]. Tu es dispo pour un onboarding rapide aujourd\'hui ?',
      ),
    ),
    const DmMessageSimulation(
      id: 'dm-2',
      sender: 'clara.design',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      content: 'GUIDE',
      timestamp: 'Il y a 32 min',
      within24h: true,
      intent: DmIntent.prospectQualifie,
      urgency: DmUrgency.haute,
      autoReplyTriggered: true,
      suggestedReplies: SuggestedReplies(
        directe: '🎉 Voici ton guide complet en accès immédiat : [Lien Guide 2026]. Dis-moi quelle partie tu vas utiliser en premier !',
        pedagogique: 'Top Clara ! Ton guide complet est ici : [Lien]. Il contient le modèle exact de calibrage 8 axes.',
        conversion: 'C\'est parti Clara ! Voici le lien de ton guide gratuit. Si tu veux l\'appliquer en 1 clic à ton profil, le studio t\'attend : [Lien Studio].',
      ),
    ),
    const DmMessageSimulation(
      id: 'dm-3',
      sender: 'julien_agency',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      content: 'Bonjour, on gère 20 comptes créateurs en agence. Est-ce que vous proposez une API ou un plan dédié ?',
      timestamp: 'Il y a 2 jours',
      within24h: false,
      intent: DmIntent.collaboration,
      urgency: DmUrgency.moyenne,
      suggestedReplies: SuggestedReplies(
        directe: 'Bonjour Julien ! Oui, notre Formule Agence offre une gestion centralisée multi-comptes avec facturation consolidée.',
        pedagogique: 'Bonjour Julien. Nous avons exactement ce format avec espaces de travail dédiés et rôles personnalisés pour vos Community Managers.',
        conversion: 'Bonjour Julien ! La Formule Agence est taillée pour votre volume avec accès anticipé à l\'API. Planifions un point rapide cette semaine.',
      ),
    ),
  ];

  static final List<CarouselSlide> sampleCarousel = [
    const CarouselSlide(
      step: SlideStep.hook,
      title: 'Diapositive 1 : Phrase de départ (Hook)',
      content: '« 90% des créateurs s\'épuisent à filmer 4h par jour. Voici comment cloner votre présence en 1 clic. »',
      visualNote: 'Visuel scroll-stopper haute rétention avec Avatar Photoréaliste Sublimé et typographie à fort contraste.',
      ctaText: 'Faites glisser pour la méthode 👉',
    ),
    const CarouselSlide(
      step: SlideStep.valeur,
      title: 'Diapositive 2 : Cœur de la méthode (Valeur)',
      content: '« 1. Synchronisez votre compte.\n2. Calibrez votre radar stylistique à 8 axes.\n3. L\'IA génère vos vidéos et carrousels dans votre voix exacte. »',
      visualNote: 'Schéma visuel épuré sans jargon technique avec les 3 étapes d\'ingestion multimodale.',
      ctaText: 'Dernière étape clé 👇',
    ),
    const CarouselSlide(
      step: SlideStep.action,
      title: 'Diapositive 3 : Phrase de fin (Action)',
      content: '« Enregistrez ce post pour votre prochaine session de création et commentez CLONE pour recevoir l\'accès anticipé. »',
      visualNote: 'Invitation claire au partage, sauvegarde et mot-clé déclencheur DM conforme.',
      ctaText: 'Enregistrez & Partagez 📌',
    ),
  ];

  static final List<BatchIdea> sampleBatchIdeas = [
    const BatchIdea(
      id: 'idea-1',
      angle: 'Angle Clivant / Vérité Brute',
      title: 'Pourquoi les influenceurs traditionnels vont disparaître en 2026',
      score: 96,
      format: 'Vidéo 9:16 (55s)',
      hook: 'Ce secret que les agences gardent sous silence depuis 6 mois...',
      coreValue: 'Démonstration de l\'automatisation des DMs et de la production de short-form sans caméra.',
      ctaAction: 'Commente \'REVOLUTION\' pour tester ton clone.',
    ),
    const BatchIdea(
      id: 'idea-2',
      angle: 'Tutoriel Express 30s',
      title: 'Comment configurer un clone vocal ultra-fidèle en 1 prise',
      score: 93,
      format: 'Vidéo 9:16 (38s)',
      hook: 'Arrête de recommencer 15 fois ta prise vidéo face caméra !',
      coreValue: '3 astuces d\'acoustique et d\'intonation capturées par le moteur neuronal.',
      ctaAction: 'Lien du studio en bio.',
    ),
    const BatchIdea(
      id: 'idea-3',
      angle: 'Étude de Cas Chiffrée',
      title: 'De 0 à 180k abonnés en 90 jours grâce au Copilote DM 24h',
      score: 91,
      format: 'Carrousel 3-slides',
      hook: 'Le vrai graphique de notre audience avant/après le respect des 24h Meta.',
      coreValue: 'La conversion des leads chauds passe de 4% à 27% en répondant sous 3 minutes.',
      ctaAction: 'Sauvegarde ce post pour ta stratégie.',
    ),
    const BatchIdea(
      id: 'idea-4',
      angle: 'Antithèse / Storytelling Vulgarisé',
      title: 'J\'ai confié mon compte Instagram à mon clone pendant 7 jours',
      score: 89,
      format: 'Reels / Shorts (45s)',
      hook: 'Mes abonnés n\'y ont vu QUE DU FEU... jusqu\'à ce message précis.',
      coreValue: 'L\'empathie algorithmique et la restitution des tics de langage.',
      ctaAction: 'Donne ton avis en commentaire.',
    ),
  ];

  static final List<ScheduledPost> sampleScheduledPosts = [
    const ScheduledPost(
      id: 'post-1',
      platform: SocialPlatform.instagram,
      mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      caption: '🚀 3 lois invisibles pour doubler sa rétention vidéo dès la 1ère seconde. Votre clone applique la règle #2 automatiquement. #IA #Créateur #Productivité',
      scheduledAt: 'Aujourd\'hui à 18:30',
      status: PostStatus.scheduled,
      resilienceTier: 1,
      predictedEngagementScore: 94,
      bestTimeSlot: 'Créneau Optimal (18h-19h)',
    ),
    const ScheduledPost(
      id: 'post-2',
      platform: SocialPlatform.tiktok,
      mediaUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      caption: 'La différence entre un script moyen et un hook viral en 2026. Regardez bien la courbe de rétention.',
      scheduledAt: 'Demain à 12:15',
      status: PostStatus.scheduled,
      resilienceTier: 1,
      predictedEngagementScore: 91,
      bestTimeSlot: 'Pause Déjeuner (12h-13h)',
    ),
    const ScheduledPost(
      id: 'post-3',
      platform: SocialPlatform.youtube,
      mediaUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
      caption: 'Pourquoi le format 9:16 détrône définitivement le paysage dans l\'attention des moins de 30 ans.',
      scheduledAt: 'Demain à 21:00',
      status: PostStatus.level2Fallback,
      resilienceTier: 2,
      predictedEngagementScore: 88,
      bestTimeSlot: 'Soirée Peak (20h30-21h30)',
    ),
  ];

  // 7 days x 4 time slots (08h, 12h, 18h, 21h) engagement scores (0 to 100)
  static final List<List<int>> weeklyEngagementHeatmap = [
    [65, 82, 94, 88], // Lundi
    [70, 78, 89, 84], // Mardi
    [68, 85, 96, 90], // Mercredi (Peak)
    [62, 79, 92, 86], // Jeudi
    [72, 88, 95, 93], // Vendredi
    [80, 92, 91, 95], // Samedi (Weekend boost)
    [85, 94, 98, 97], // Dimanche (Ultimate Peak)
  ];

  static const List<String> heatmapDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  static const List<String> heatmapSlots = ['08:00', '12:00', '18:00', '21:00'];

  static final List<PricingPlan> pricingPlans = [
    const PricingPlan(
      tier: PlanTier.free,
      annualPrice: '0 €',
      features: [
        '1 Clone IA basique',
        '3 vidéos / mois (Watermark)',
        'Réponses DMs manuelles',
        'Support communautaire',
      ],
      limitations: [
        'Pas de voix clonée réaliste',
        'Pas d\'automatisation 24h',
        'Radar 8 axes restreint',
      ],
    ),
    const PricingPlan(
      tier: PlanTier.pro,
      annualPrice: '7.20 € / mois (-20%)',
      features: [
        'Clone IA Photoréaliste illimité',
        'Vidéo 9:16 HD sans watermark',
        'Copilote DM 24h 100% Automatisé',
        'Radar stylistique 8 axes complet',
        'Smart Scheduler avec Heatmap 7x4',
        'Mode Hybride par mots-clés',
        'Support prioritaire 7j/7',
      ],
      limitations: [
        '1 compte social synchronisé par canal',
      ],
    ),
    const PricingPlan(
      tier: PlanTier.agency,
      annualPrice: '63.20 € / mois (-20%)',
      features: [
        'Jusqu\'à 20 Clones Créateurs',
        'Accès API Dédiée & Webhooks',
        'Espaces de travail multi-collaborateurs',
        'Validation semi-auto hiérarchique',
        'Audit de conformité personnalisé',
        'Account Manager dédié 24/7',
      ],
      limitations: [],
    ),
  ];
}
