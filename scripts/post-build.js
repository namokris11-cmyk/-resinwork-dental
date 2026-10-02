const fs = require("fs");
const path = require("path");

console.log("🔧 Running post-build script...");

// Create the root index.html for redirects
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirecting...</title>
    <script>
        // Detect user's preferred language
        function getPreferredLanguage() {
            try {
                // Check if user has a saved preference
                const savedLang = localStorage.getItem('preferred-language');
                if (savedLang && ['en', 'de'].includes(savedLang)) {
                    return savedLang;
                }

                // Check browser language
                const browserLang = navigator.language || navigator.userLanguage;
                if (browserLang.startsWith('en')) {
                    return 'en';
                }
            } catch (e) {
                // Fallback if localStorage access fails
            }

            // Default to German
            return 'de';
        }
        
        // Redirect to appropriate language
        const preferredLang = getPreferredLanguage();
        const currentPath = window.location.pathname;
        
        // Check if the path already contains a locale (en or de)
        // We look for /en/ or /de/ or ending with /en or /de
        const hasLocale = /\\/(en|de)(\\/|$)/.test(currentPath);
        
        if (!hasLocale) {
             // Ensure trailing slash before appending locale
             const baseUrl = currentPath.endsWith('/') ? currentPath : currentPath + '/';
             window.location.href = baseUrl + preferredLang + '/';
        }
    </script>
    <noscript>
        <meta http-equiv="refresh" content="0; url=de/">
    </noscript>
</head>
<body>
    <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
        <h2>Redirecting...</h2>
        <p>Falls Sie nicht automatisch weitergeleitet werden, <a href="de/">hier für Deutsch klicken</a> or <a href="en/">click here for English</a>.</p>
    </div>
</body>
</html>`;

// Create .htaccess for Apache servers (GoDaddy, Hostinger, etc.)
const htaccess = `# Enable rewrite engine
RewriteEngine On

# 1. Disable MultiViews to prevent Apache from serving 'en.php' or 'en.html' automatically
Options -MultiViews

# 2. Force trailing slash for directories
DirectorySlash On

# 3. Handle specific languages - Redirect 'en' to 'en/' (Relative)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^en$ en/ [R=301,L]

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^de$ de/ [R=301,L]

# 4. Default fallbacks
DirectoryIndex index.html

# 5. Handle Next.js routing for subpaths
# If the request is for a file or directory that exists, serve it.
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# 6. Custom 404 (Relative fallback)
# ErrorDocument 404 /404.html

# 7. Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>

# 8. Caching
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>`;

// Create Netlify redirects (for Netlify testing)
const netlifyRedirects = `# Netlify redirects file
# Redirect root to /de/ by default
/    /de/    302

# Handle language-specific redirects based on Accept-Language header
/    /de/    302    Language=de
/    /en/    302    Language=en

# Fallback for any unmatched routes to 404
/*   /404.html   404`;

// Write files
const outDir = path.join(process.cwd(), "out");

try {
  fs.writeFileSync(path.join(outDir, "index.html"), indexHtml);
  console.log("✅ Created root index.html");

  fs.writeFileSync(path.join(outDir, ".htaccess"), htaccess);
  console.log("✅ Created .htaccess for Apache servers (GoDaddy)");

  fs.writeFileSync(path.join(outDir, "_redirects"), netlifyRedirects);
  console.log("✅ Created _redirects for Netlify");

  console.log("🎉 Post-build script completed successfully!");
} catch (error) {
  console.error("❌ Error in post-build script:", error);
  process.exit(1);
}
