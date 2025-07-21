# Reverse X-Ray Components Sync Script
# This script copies the updated X-Ray components from Website rebuild back to stickyxrayeffect

Write-Host "🔄 Syncing updated X-Ray components from Website rebuild to stickyxrayeffect..." -ForegroundColor Green

# Define source and destination paths
$sourceDir = "src"
$destDir = "..\stickyxrayeffect\src"

# Components to sync
$components = @(
    "components\XRayExplorer.tsx",
    "components\SvgHotspotOverlay.tsx", 
    "components\ProductTooltip.tsx",
    "types\industry.ts",
    "data\industries\marine.ts"
)

# Copy each component
foreach ($component in $components) {
    $sourcePath = Join-Path $sourceDir $component
    $destPath = Join-Path $destDir $component
    
    if (Test-Path $sourcePath) {
        Copy-Item $sourcePath $destPath -Force
        Write-Host "✅ Copied: $component" -ForegroundColor Green
    } else {
        Write-Host "❌ Source not found: $sourcePath" -ForegroundColor Red
    }
}

# Copy SVG assets
$svgSourceDir = "public\img\marine"
$svgDestDir = "..\stickyxrayeffect\public\img\marine"

if (Test-Path $svgSourceDir) {
    if (!(Test-Path $svgDestDir)) {
        New-Item -ItemType Directory -Path $svgDestDir -Force
    }
    
    Copy-Item "$svgSourceDir\*.svg" $svgDestDir -Force
    Write-Host "✅ Copied SVG assets" -ForegroundColor Green
} else {
    Write-Host "❌ SVG source directory not found: $svgSourceDir" -ForegroundColor Red
}

Write-Host "🎉 Reverse sync complete! Original stickyxrayeffect is now updated." -ForegroundColor Green
Write-Host "💡 The original project now has all our improvements!" -ForegroundColor Yellow 