# X-Ray Components Sync Script
# This script automatically copies the latest X-Ray components from stickyxrayeffect to Website rebuild

Write-Host "🔄 Syncing X-Ray components from stickyxrayeffect to Website rebuild..." -ForegroundColor Green

# Define source and destination paths
$sourceDir = "..\stickyxrayeffect\src"
$destDir = "src"

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
$svgSourceDir = "..\stickyxrayeffect\public\img\marine"
$svgDestDir = "public\img\marine"

if (Test-Path $svgSourceDir) {
    if (!(Test-Path $svgDestDir)) {
        New-Item -ItemType Directory -Path $svgDestDir -Force
    }
    
    Copy-Item "$svgSourceDir\*.svg" $svgDestDir -Force
    Write-Host "✅ Copied SVG assets" -ForegroundColor Green
} else {
    Write-Host "❌ SVG source directory not found: $svgSourceDir" -ForegroundColor Red
}

Write-Host "🎉 Sync complete! X-Ray components are now up to date." -ForegroundColor Green
Write-Host "💡 Run this script whenever you make changes to stickyxrayeffect" -ForegroundColor Yellow 