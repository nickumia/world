#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Build script to replace API endpoint in static files
const API_ENDPOINT = process.env.API_ENDPOINT || 'http://localhost:5000/tracker';

// Output directory for static upload
const OUTPUT_DIR = path.join(__dirname, 'src', 'offline');

console.log('🔧 Building static files with API endpoint:', API_ENDPOINT);
console.log('📁 Output directory:', OUTPUT_DIR);

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

try {
    // Process config template
    if (fs.existsSync('config.template.js')) {
        const configTemplate = fs.readFileSync('config.template.js', 'utf8');
        const configContent = configTemplate.replace('{{API_ENDPOINT}}', API_ENDPOINT);
        const configPath = path.join(OUTPUT_DIR, 'config.js');
        fs.writeFileSync(configPath, configContent);
        console.log('✅ Generated config.js ->', configPath);
    } else {
        console.log('⚠️  config.template.js not found, skipping config generation');
    }

    // Process HTML file
    if (fs.existsSync('tracker.html')) {
        const htmlTemplate = fs.readFileSync('tracker.html', 'utf8');
        const htmlContent = htmlTemplate.replace(
            'const API_ENDPOINT = \'{{API_ENDPOINT}}\';', 
            `const API_ENDPOINT = '${API_ENDPOINT}';`
        );
        const htmlPath = path.join(OUTPUT_DIR, 'tracker');
        fs.writeFileSync(htmlPath, htmlContent);
        console.log('✅ Generated tracker.html ->', htmlPath);
    }

    console.log('🎉 Build completed successfully!');
    console.log('📤 Files ready for static_upload.sh');
} catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
}
