// Figma Plugin Script : Générateur automatique des maquettes SocialClone AI
// Pour l'exécuter dans Figma :
// Option A : Figma Desktop > Menu > Plugins > Development > Open Console (Ctrl+Alt+I) > Coller ce code et Entrée.
// Option B : Créer un plugin vide (Plugins > Development > New Plugin...) et remplacer code.js par ce fichier.

(async () => {
  // 1. Charger les polices nécessaires
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });

  const page = figma.currentPage;

  // ==========================================
  // ÉCRAN 1 : iOS LIQUID GLASS (393 x 852)
  // ==========================================
  const iosFrame = figma.createFrame();
  iosFrame.name = "iPhone 16 Pro — iOS Liquid Glass (SocialClone AI)";
  iosFrame.resize(393, 852);
  iosFrame.x = 0;
  iosFrame.y = 0;
  iosFrame.cornerRadius = 48;
  iosFrame.clipsContent = true;
  iosFrame.fills = [{
    type: 'SOLID',
    color: { r: 7/255, g: 9/255, b: 14/255 } // #07090E
  }];

  // Orbes d'ambiance néon
  const orb1 = figma.createEllipse();
  orb1.name = "Orbe Ambiance Indigo";
  orb1.resize(320, 320);
  orb1.x = -60;
  orb1.y = 40;
  orb1.fills = [{
    type: 'SOLID',
    color: { r: 79/255, g: 70/255, b: 229/255 }, // #4F46E5
    opacity: 0.35
  }];
  orb1.effects = [{
    type: 'LAYER_BLUR',
    radius: 90,
    visible: true
  }];
  iosFrame.appendChild(orb1);

  const orb2 = figma.createEllipse();
  orb2.name = "Orbe Ambiance Cyan";
  orb2.resize(280, 280);
  orb2.x = 180;
  orb2.y = 460;
  orb2.fills = [{
    type: 'SOLID',
    color: { r: 6/255, g: 182/255, b: 212/255 }, // #06B6D4
    opacity: 0.25
  }];
  orb2.effects = [{
    type: 'LAYER_BLUR',
    radius: 80,
    visible: true
  }];
  iosFrame.appendChild(orb2);

  // Dynamic Island
  const island = figma.createFrame();
  island.name = "Dynamic Island";
  island.resize(125, 35);
  island.x = (393 - 125) / 2;
  island.y = 11;
  island.cornerRadius = 17.5;
  island.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
  iosFrame.appendChild(island);

  // Titre AppBar
  const title = figma.createText();
  title.characters = "Calibrage du Clone";
  title.fontName = { family: "Inter", style: "Bold" };
  title.fontSize = 24;
  title.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  title.x = 24;
  title.y = 68;
  iosFrame.appendChild(title);

  // CARTE 1 : ToneRadar 8 axes Glass Card
  const radarCard = figma.createFrame();
  radarCard.name = "Card — ToneRadar 8 Axes (Liquid Glass)";
  radarCard.resize(345, 290);
  radarCard.x = 24;
  radarCard.y = 114;
  radarCard.cornerRadius = 24;
  radarCard.fills = [{
    type: 'SOLID',
    color: { r: 1, g: 1, b: 1 },
    opacity: 0.08
  }];
  radarCard.strokes = [{
    type: 'SOLID',
    color: { r: 1, g: 1, b: 1 },
    opacity: 0.25
  }];
  radarCard.strokeWeight = 1;
  radarCard.effects = [{
    type: 'BACKGROUND_BLUR',
    radius: 18,
    visible: true
  }];

  const radarTitle = figma.createText();
  radarTitle.characters = "ToneRadar™ 8 Axes";
  radarTitle.fontName = { family: "Inter", style: "Bold" };
  radarTitle.fontSize = 16;
  radarTitle.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  radarTitle.x = 20;
  radarTitle.y = 20;
  radarCard.appendChild(radarTitle);

  // Badge Verrou 30j
  const lockBadge = figma.createFrame();
  lockBadge.name = "Badge Verrou 30j";
  lockBadge.resize(100, 24);
  lockBadge.x = 225;
  lockBadge.y = 18;
  lockBadge.cornerRadius = 12;
  lockBadge.fills = [{
    type: 'SOLID',
    color: { r: 16/255, g: 185/255, b: 129/255 },
    opacity: 0.18
  }];
  const lockText = figma.createText();
  lockText.characters = "● Verrouillé 30j";
  lockText.fontName = { family: "Inter", style: "Medium" };
  lockText.fontSize = 11;
  lockText.fills = [{ type: 'SOLID', color: { r: 52/255, g: 211/255, b: 153/255 } }];
  lockText.x = 10;
  lockText.y = 5;
  lockBadge.appendChild(lockText);
  radarCard.appendChild(lockBadge);

  // Radar Polygon Shape
  const radarPoly = figma.createPolygon();
  radarPoly.name = "Tone Polygon";
  radarPoly.resize(180, 180);
  radarPoly.x = (345 - 180) / 2;
  radarPoly.y = 65;
  radarPoly.fills = [{
    type: 'SOLID',
    color: { r: 34/255, g: 211/255, b: 238/255 },
    opacity: 0.25
  }];
  radarPoly.strokes = [{
    type: 'SOLID',
    color: { r: 34/255, g: 211/255, b: 238/255 }
  }];
  radarPoly.strokeWeight = 2;
  radarCard.appendChild(radarPoly);

  iosFrame.appendChild(radarCard);

  // CARTE 2 : Voice Sample Card
  const voiceCard = figma.createFrame();
  voiceCard.name = "Card — Empreinte Vocale (AI Act)";
  voiceCard.resize(345, 140);
  voiceCard.x = 24;
  voiceCard.y = 420;
  voiceCard.cornerRadius = 24;
  voiceCard.fills = [{
    type: 'SOLID',
    color: { r: 1, g: 1, b: 1 },
    opacity: 0.08
  }];
  voiceCard.strokes = [{
    type: 'SOLID',
    color: { r: 1, g: 1, b: 1 },
    opacity: 0.2
  }];
  voiceCard.strokeWeight = 1;

  const voiceTitle = figma.createText();
  voiceTitle.characters = "Empreinte Vocale (20s enregistrés)";
  voiceTitle.fontName = { family: "Inter", style: "Bold" };
  voiceTitle.fontSize = 15;
  voiceTitle.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  voiceTitle.x = 20;
  voiceTitle.y = 18;
  voiceCard.appendChild(voiceTitle);

  // Waveform bars
  for (let i = 0; i < 24; i++) {
    const bar = figma.createRectangle();
    const h = 10 + Math.sin(i * 0.7) * 20 + (i % 3) * 6;
    bar.resize(3.5, Math.max(6, h));
    bar.cornerRadius = 2;
    bar.x = 20 + i * 8;
    bar.y = 70 - Math.max(6, h) / 2;
    bar.fills = [{
      type: 'SOLID',
      color: i < 14 ? { r: 34/255, g: 211/255, b: 238/255 } : { r: 1, g: 1, b: 1 },
      opacity: i < 14 ? 1 : 0.25
    }];
    voiceCard.appendChild(bar);
  }

  // Audio Play Button
  const playBtn = figma.createFrame();
  playBtn.name = "Bouton Audio";
  playBtn.resize(110, 32);
  playBtn.x = 215;
  playBtn.y = 54;
  playBtn.cornerRadius = 16;
  playBtn.fills = [{
    type: 'SOLID',
    color: { r: 99/255, g: 102/255, b: 241/255 },
    opacity: 0.3
  }];
  const playText = figma.createText();
  playText.characters = "▶ Écouter IA";
  playText.fontName = { family: "Inter", style: "Medium" };
  playText.fontSize = 12;
  playText.fills = [{ type: 'SOLID', color: { r: 199/255, g: 210/255, b: 254/255 } }];
  playText.x = 18;
  playText.y = 8;
  playBtn.appendChild(playText);
  voiceCard.appendChild(playBtn);

  iosFrame.appendChild(voiceCard);

  // CARTE 3 : Copilot 24h Meta
  const copilotCard = figma.createFrame();
  copilotCard.name = "Card — Copilote DM 24h";
  copilotCard.resize(345, 120);
  copilotCard.x = 24;
  copilotCard.y = 576;
  copilotCard.cornerRadius = 24;
  copilotCard.fills = [{
    type: 'SOLID',
    color: { r: 1, g: 1, b: 1 },
    opacity: 0.08
  }];
  copilotCard.strokes = [{
    type: 'SOLID',
    color: { r: 1, g: 1, b: 1 },
    opacity: 0.2
  }];
  copilotCard.strokeWeight = 1;

  const copilotTitle = figma.createText();
  copilotTitle.characters = "Copilote DM — Meta & TikTok";
  copilotTitle.fontName = { family: "Inter", style: "Bold" };
  copilotTitle.fontSize = 15;
  copilotTitle.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  copilotTitle.x = 20;
  copilotTitle.y = 18;
  copilotCard.appendChild(copilotTitle);

  const copilotMode = figma.createText();
  copilotMode.characters = "Mode Actif : Semi-Automatique (3 choix)";
  copilotMode.fontName = { family: "Inter", style: "Regular" };
  copilotMode.fontSize = 13;
  copilotMode.fills = [{ type: 'SOLID', color: { r: 148/255, g: 163/255, b: 184/255 } }];
  copilotMode.x = 20;
  copilotMode.y = 44;
  copilotCard.appendChild(copilotMode);

  // Badge 24h
  const badge24 = figma.createFrame();
  badge24.resize(120, 26);
  badge24.x = 20;
  badge24.y = 74;
  badge24.cornerRadius = 13;
  badge24.fills = [{
    type: 'SOLID',
    color: { r: 59/255, g: 130/255, b: 246/255 },
    opacity: 0.2
  }];
  const text24 = figma.createText();
  text24.characters = "⏱ Fenêtre : 23h 48m";
  text24.fontName = { family: "Inter", style: "Medium" };
  text24.fontSize = 11;
  text24.fills = [{ type: 'SOLID', color: { r: 96/255, g: 165/255, b: 250/255 } }];
  text24.x = 10;
  text24.y = 6;
  badge24.appendChild(text24);
  copilotCard.appendChild(badge24);

  iosFrame.appendChild(copilotCard);

  // Floating Glass Bottom Bar
  const tabbar = figma.createFrame();
  tabbar.name = "Cupertino Glass TabBar";
  tabbar.resize(345, 64);
  tabbar.x = 24;
  tabbar.y = 750;
  tabbar.cornerRadius = 32;
  tabbar.fills = [{
    type: 'SOLID',
    color: { r: 1, g: 1, b: 1 },
    opacity: 0.12
  }];
  tabbar.strokes = [{
    type: 'SOLID',
    color: { r: 1, g: 1, b: 1 },
    opacity: 0.3
  }];
  tabbar.strokeWeight = 1;
  tabbar.effects = [{
    type: 'BACKGROUND_BLUR',
    radius: 20,
    visible: true
  }];
  iosFrame.appendChild(tabbar);

  // ==========================================
  // ÉCRAN 2 : ANDROID MATERIAL 3 (412 x 892)
  // ==========================================
  const androidFrame = figma.createFrame();
  androidFrame.name = "Pixel 8 — Android Material 3 (SocialClone AI)";
  androidFrame.resize(412, 892);
  androidFrame.x = 440;
  androidFrame.y = 0;
  androidFrame.cornerRadius = 36;
  androidFrame.clipsContent = true;
  androidFrame.fills = [{
    type: 'SOLID',
    color: { r: 18/255, g: 19/255, b: 22/255 } // #121316
  }];

  // M3 Title
  const m3Title = figma.createText();
  m3Title.characters = "Tableau de Bord Créateur";
  m3Title.fontName = { family: "Inter", style: "Bold" };
  m3Title.fontSize = 22;
  m3Title.fills = [{ type: 'SOLID', color: { r: 248/255, g: 250/255, b: 252/255 } }];
  m3Title.x = 24;
  m3Title.y = 60;
  androidFrame.appendChild(m3Title);

  // M3 Card 1 : AI Credits
  const creditsCard = figma.createFrame();
  creditsCard.name = "SurfaceContainer — Crédits IA";
  creditsCard.resize(364, 110);
  creditsCard.x = 24;
  creditsCard.y = 105;
  creditsCard.cornerRadius = 28;
  creditsCard.fills = [{
    type: 'SOLID',
    color: { r: 30/255, g: 31/255, b: 37/255 } // #1E1F25
  }];

  const credLabel = figma.createText();
  credLabel.characters = "Crédits IA Disponibles";
  credLabel.fontName = { family: "Inter", style: "Medium" };
  credLabel.fontSize = 13;
  credLabel.fills = [{ type: 'SOLID', color: { r: 148/255, g: 163/255, b: 184/255 } }];
  credLabel.x = 24;
  credLabel.y = 20;
  creditsCard.appendChild(credLabel);

  const credValue = figma.createText();
  credValue.characters = "650";
  credValue.fontName = { family: "Inter", style: "Bold" };
  credValue.fontSize = 36;
  credValue.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  credValue.x = 24;
  credValue.y = 48;
  creditsCard.appendChild(credValue);

  // Badge +50
  const plus50 = figma.createFrame();
  plus50.resize(100, 28);
  plus50.x = 100;
  plus50.y = 54;
  plus50.cornerRadius = 14;
  plus50.fills = [{
    type: 'SOLID',
    color: { r: 16/255, g: 185/255, b: 129/255 },
    opacity: 0.18
  }];
  const plus50Text = figma.createText();
  plus50Text.characters = "+50 Offerts";
  plus50Text.fontName = { family: "Inter", style: "Bold" };
  plus50Text.fontSize = 12;
  plus50Text.fills = [{ type: 'SOLID', color: { r: 52/255, g: 211/255, b: 153/255 } }];
  plus50Text.x = 12;
  plus50Text.y = 6;
  plus50.appendChild(plus50Text);
  creditsCard.appendChild(plus50);

  // Button Recharger
  const topUpBtn = figma.createFrame();
  topUpBtn.resize(100, 38);
  topUpBtn.x = 240;
  topUpBtn.y = 48;
  topUpBtn.cornerRadius = 19;
  topUpBtn.fills = [{
    type: 'SOLID',
    color: { r: 99/255, g: 102/255, b: 241/255 }
  }];
  const topUpText = figma.createText();
  topUpText.characters = "Recharger";
  topUpText.fontName = { family: "Inter", style: "Bold" };
  topUpText.fontSize = 13;
  topUpText.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  topUpText.x = 18;
  topUpText.y = 11;
  topUpBtn.appendChild(topUpText);
  creditsCard.appendChild(topUpBtn);

  androidFrame.appendChild(creditsCard);

  // Studio 9:16 Card
  const studioCard = figma.createFrame();
  studioCard.name = "Studio 9:16 Preview";
  studioCard.resize(176, 260);
  studioCard.x = 24;
  studioCard.y = 230;
  studioCard.cornerRadius = 24;
  studioCard.fills = [{
    type: 'SOLID',
    color: { r: 30/255, g: 31/255, b: 37/255 }
  }];
  const studioLabel = figma.createText();
  studioLabel.characters = "Studio 9:16";
  studioLabel.fontName = { family: "Inter", style: "Bold" };
  studioLabel.fontSize = 15;
  studioLabel.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  studioLabel.x = 16;
  studioLabel.y = 18;
  studioCard.appendChild(studioLabel);
  androidFrame.appendChild(studioCard);

  // Scheduler 7x4 Card
  const schedulerCard = figma.createFrame();
  schedulerCard.name = "Smart Scheduler Heatmap";
  schedulerCard.resize(176, 260);
  schedulerCard.x = 212;
  schedulerCard.y = 230;
  schedulerCard.cornerRadius = 24;
  schedulerCard.fills = [{
    type: 'SOLID',
    color: { r: 30/255, g: 31/255, b: 37/255 }
  }];
  const schedLabel = figma.createText();
  schedLabel.characters = "Heatmap 7x4";
  schedLabel.fontName = { family: "Inter", style: "Bold" };
  schedLabel.fontSize = 15;
  schedLabel.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  schedLabel.x = 16;
  schedLabel.y = 18;
  schedulerCard.appendChild(schedLabel);

  // Mini Heatmap matrix
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 6; c++) {
      const cell = figma.createRectangle();
      cell.resize(18, 18);
      cell.cornerRadius = 4;
      cell.x = 16 + c * 24;
      cell.y = 52 + r * 24;
      const alpha = 0.2 + ((r + c) % 4) * 0.25;
      cell.fills = [{
        type: 'SOLID',
        color: { r: 99/255, g: 102/255, b: 241/255 },
        opacity: alpha
      }];
      schedulerCard.appendChild(cell);
    }
  }

  // Auto-Placer Button
  const autoBtn = figma.createFrame();
  autoBtn.resize(144, 34);
  autoBtn.x = 16;
  autoBtn.y = 208;
  autoBtn.cornerRadius = 17;
  autoBtn.fills = [{
    type: 'SOLID',
    color: { r: 99/255, g: 102/255, b: 241/255 }
  }];
  const autoText = figma.createText();
  autoText.characters = "⚡ Auto-Placer";
  autoText.fontName = { family: "Inter", style: "Bold" };
  autoText.fontSize = 12;
  autoText.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  autoText.x = 28;
  autoText.y = 9;
  autoBtn.appendChild(autoText);
  schedulerCard.appendChild(autoBtn);

  androidFrame.appendChild(schedulerCard);

  // M3 Navigation Bar
  const navBar = figma.createFrame();
  navBar.name = "Material 3 Navigation Bar";
  navBar.resize(412, 80);
  navBar.x = 0;
  navBar.y = 812;
  navBar.fills = [{
    type: 'SOLID',
    color: { r: 26/255, g: 27/255, b: 32/255 } // #1A1B20
  }];
  androidFrame.appendChild(navBar);

  // Zoomer sur les 2 frames créés
  figma.viewport.scrollAndZoomIntoView([iosFrame, androidFrame]);
  figma.notify("✅ Maquettes SocialClone AI générées avec succès !");
})();
