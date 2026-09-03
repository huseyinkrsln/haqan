Add-Type -AssemblyName System.Drawing

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$publicDir = Join-Path (Split-Path -Parent $scriptDir) "public"
$destDir = Join-Path $publicDir "icons"

if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Force -Path $destDir | Out-Null
}

$sourceImage = "C:\Users\hsyn_\.gemini\antigravity-ide\brain\42e9fc5d-cc91-49fe-874a-7b1e702aa390\haqan_pwa_icon_1788448563145.jpg"
$img = [System.Drawing.Image]::FromFile($sourceImage)

function Export-Icon($w, $h, $name) {
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.DrawImage($img, 0, 0, $w, $h)
    $outPath = Join-Path $destDir $name
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Created: $name"
}

Export-Icon 512 512 "icon-512x512.png"
Export-Icon 192 192 "icon-192x192.png"
Export-Icon 180 180 "apple-touch-icon.png"
Export-Icon 512 512 "icon-maskable-512x512.png"
Export-Icon 192 192 "icon-maskable-192x192.png"
Export-Icon 32 32 "favicon-32x32.png"
Export-Icon 16 16 "favicon-16x16.png"

Copy-Item (Join-Path $destDir "apple-touch-icon.png") (Join-Path $publicDir "apple-touch-icon.png") -Force
Copy-Item (Join-Path $destDir "icon-192x192.png") (Join-Path $publicDir "icon-192x192.png") -Force
Copy-Item (Join-Path $destDir "icon-512x512.png") (Join-Path $publicDir "icon-512x512.png") -Force
Copy-Item (Join-Path $destDir "favicon-32x32.png") (Join-Path $publicDir "favicon.ico") -Force

$img.Dispose()
Write-Host "All icons generated in $destDir"
