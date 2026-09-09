# 🎨 Maquettes & Design System Figma - SocialClone AI

Ce dossier contient toutes les ressources prêtes pour concevoir, importer et synchroniser les maquettes de **SocialClone AI** dans Figma via le serveur **Figma MCP**.

---

## 🔌 1. Configuration MCP Figma (`mcp_config.json`)

Le serveur MCP officiel de Figma a été configuré dans `~/.gemini/config/mcp_config.json` :

```json
{
  "mcpServers": {
    "Figma": {
      "url": "https://mcp.figma.com/mcp",
      "serverUrl": "https://mcp.figma.com/mcp"
    }
  }
}
```

### 🔑 Connexion & Authentification à Figma :
1. Dans votre éditeur ou client MCP (Antigravity IDE / VS Code / Cursor), ouvrez la commande **Developer: Reload Window** (ou redémarrez l'IDE) pour initialiser la connexion au serveur MCP Figma.
2. Une notification ou un onglet de navigateur s'ouvrira pour autoriser la connexion OAuth avec votre compte Figma (ou vous demandera votre jeton d'accès personnel Figma : *Figma > Settings > Security > Personal Access Tokens*).
3. Dès que la connexion est établie, vous pouvez coller l'URL de votre fichier ou frame Figma (ex: `https://www.figma.com/design/...`) dans le chat pour inspecter les composants, synchroniser le design system ou générer le code correspondant.

---

## 📦 2. Fichiers et Ressources Incluses

| Fichier | Format | Description |
|---|---|---|
| [`tokens.json`](./tokens.json) | JSON (Variables) | Tokens de design complets pour les 2 thèmes : couleurs néon, gradients spéculaires, flous de verre (18px), surfaces tonales M3 et rayons de courbure. |
| [`ios_liquid_glass_screen.svg`](./ios_liquid_glass_screen.svg) | SVG Vectoriel (393x852) | Frame vectorielle prête pour Figma : Écran **Calibrage Clone** avec ToneRadar™ 8 axes, onde sonore d'empreinte vocale, conformité 24h et barre Cupertino translucide. |
| [`android_m3_screen.svg`](./android_m3_screen.svg) | SVG Vectoriel (412x892) | Frame vectorielle prête pour Figma : Écran **Dashboard Créateur** avec compteur de crédits (+50 offerts), Studio vidéo 9:16, matrice heatmap 7x4 et barre de navigation M3 Expressive. |

---

## ⚡ 3. Comment importer instantanément dans Figma

### Méthode 1 : Copier-Coller Direct (Ultra-rapide)
1. Ouvrez le fichier SVG [`ios_liquid_glass_screen.svg`](./ios_liquid_glass_screen.svg) ou [`android_m3_screen.svg`](./android_m3_screen.svg) dans votre éditeur de texte ou votre navigateur.
2. Sélectionnez tout le code XML et copiez-le (`Ctrl+C`).
3. Dans **Figma**, faites un simple coller (`Ctrl+V`) sur votre canvas.
4. Figma le convertit instantanément en un **Frame natif Figma** avec tous les calques vectoriels, textes éditables, gradients et polygones !

### Méthode 2 : Glisser-Déposer
- Glissez-déposez directement les fichiers `.svg` depuis l'explorateur de fichiers vers votre canvas Figma.
