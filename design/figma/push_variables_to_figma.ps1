param(
    [Parameter(Mandatory=$true)]
    [string]$FigmaUrlOrKey,
    [string]$Token = $env:FIGMA_TOKEN
)


# Extraire la clé du fichier si une URL complète est passée
$fileKey = $FigmaUrlOrKey
if ($FigmaUrlOrKey -match "(?:file|design)/([a-zA-Z0-9]+)") {
    $fileKey = $matches[1]
}

Write-Host "🚀 Connexion au fichier Figma : $fileKey..." -ForegroundColor Cyan

$headers = @{
    "X-Figma-Token" = $Token
    "Content-Type"  = "application/json"
}

# 1. Vérifier l'accès au fichier
try {
    $file = Invoke-RestMethod -Uri "https://api.figma.com/v1/files/$fileKey?depth=1" -Headers $headers -Method Get
    Write-Host "✅ Fichier trouvé : $($file.name)" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur d'accès au fichier : $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# 2. Définition des Variables Figma (Design Tokens)
$payload = @{
    variableCollections = @(
        @{
            action = "CREATE"
            id = "col_socialclone"
            name = "SocialClone AI Tokens"
            initialModeId = "mode_liquid_glass"
        }
    )
    variableModes = @(
        @{
            action = "CREATE"
            id = "mode_m3"
            name = "Android Material 3"
            variableCollectionId = "col_socialclone"
        }
    )
    variables = @(
        @{
            action = "CREATE"
            id = "var_bg_primary"
            name = "Color/Background"
            variableCollectionId = "col_socialclone"
            resolvedType = "COLOR"
        },
        @{
            action = "CREATE"
            id = "var_accent_primary"
            name = "Color/Accent"
            variableCollectionId = "col_socialclone"
            resolvedType = "COLOR"
        },
        @{
            action = "CREATE"
            id = "var_border_radius"
            name = "Radius/Card"
            variableCollectionId = "col_socialclone"
            resolvedType = "FLOAT"
        }
    )
    variableModeValues = @(
        @{
            variableId = "var_bg_primary"
            modeId = "mode_liquid_glass"
            value = @{ r = 0.027; g = 0.035; b = 0.055; a = 1.0 }
        },
        @{
            variableId = "var_bg_primary"
            modeId = "mode_m3"
            value = @{ r = 0.07; g = 0.074; b = 0.086; a = 1.0 }
        },
        @{
            variableId = "var_accent_primary"
            modeId = "mode_liquid_glass"
            value = @{ r = 0.133; g = 0.827; b = 0.933; a = 1.0 }
        },
        @{
            variableId = "var_accent_primary"
            modeId = "mode_m3"
            value = @{ r = 0.388; g = 0.400; b = 0.945; a = 1.0 }
        },
        @{
            variableId = "var_border_radius"
            modeId = "mode_liquid_glass"
            value = 24.0
        },
        @{
            variableId = "var_border_radius"
            modeId = "mode_m3"
            value = 28.0
        }
    )
} | ConvertTo-Json -Depth 10

try {
    Write-Host "📦 Envoi des variables au fichier Figma..." -ForegroundColor Cyan
    $res = Invoke-RestMethod -Uri "https://api.figma.com/v1/files/$fileKey/variables/local" -Headers $headers -Method Post -Body $payload
    Write-Host "🎉 Variables et tokens de design injectés avec succès dans Figma !" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Note: L'injection de variables via API nécessite un forfait Figma Enterprise ou Pro sur l'équipe : $($_.Exception.Message)" -ForegroundColor Yellow
}
