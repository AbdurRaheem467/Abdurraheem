# TIMEORA - PowerShell Built-in Web Server (No Node.js or Python required)
$port = 3000
$root = Join-Path $PSScriptRoot "public"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://127.0.0.1:$port/")

try {
    $listener.Start()
    Write-Host "==========================================================" -ForegroundColor Yellow
    Write-Host "TIMEORA Haute Horlogerie Website Server Running!" -ForegroundColor Yellow
    Write-Host "Open in browser: http://localhost:$port" -ForegroundColor Cyan
    Write-Host "==========================================================" -ForegroundColor Yellow
    Write-Host "Press Ctrl+C in this terminal to stop the server."

    # Open browser automatically
    Start-Process "http://localhost:$port"

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/" -or $urlPath -eq "") {
            $urlPath = "/index.html"
        }

        $localPath = Join-Path $root ($urlPath.TrimStart('/').Replace('/', '\'))

        if (Test-Path $localPath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
            $mime = "text/plain"

            switch ($ext) {
                ".html" { $mime = "text/html; charset=utf-8" }
                ".css"  { $mime = "text/css; charset=utf-8" }
                ".js"   { $mime = "application/javascript; charset=utf-8" }
                ".json" { $mime = "application/json; charset=utf-8" }
                ".png"  { $mime = "image/png" }
                ".jpg"  { $mime = "image/jpeg" }
                ".jpeg" { $mime = "image/jpeg" }
                ".svg"  { $mime = "image/svg+xml" }
                ".ico"  { $mime = "image/x-icon" }
                ".webp" { $mime = "image/webp" }
            }

            $bytes = [System.IO.File]::ReadAllBytes($localPath)
            $response.ContentType = $mime
            $response.AddHeader("Access-Control-Allow-Origin", "*")
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            # Fallback to index.html for SPA routes
            $indexPath = Join-Path $root "index.html"
            if (Test-Path $indexPath) {
                $bytes = [System.IO.File]::ReadAllBytes($indexPath)
                $response.ContentType = "text/html; charset=utf-8"
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            } else {
                $response.StatusCode = 404
                $err = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
                $response.OutputStream.Write($err, 0, $err.Length)
            }
        }
        $response.OutputStream.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
