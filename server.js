const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const app = express();
const port = process.env.PORT || 3000;

// Security and performance middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files if any
app.use(express.static('public'));

// Main route - Your Dyad app homepage
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>🚀 Dyad App - Zero2Launch</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .container {
                text-align: center;
                background: rgba(255,255,255,0.1);
                padding: 60px 40px;
                border-radius: 20px;
                backdrop-filter: blur(15px);
                box-shadow: 0 8px 32px rgba(0,0,0,0.1);
                max-width: 600px;
                margin: 20px;
            }
            h1 { 
                font-size: 3.5em; 
                margin-bottom: 20px;
                background: linear-gradient(45deg, #fff, #f0f0f0);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            .subtitle {
                font-size: 1.3em;
                margin-bottom: 30px;
                opacity: 0.9;
            }
            .status {
                background: linear-gradient(45deg, #4CAF50, #45a049);
                padding: 15px 25px;
                border-radius: 10px;
                display: inline-block;
                margin: 20px 0;
                font-weight: bold;
                font-size: 1.1em;
            }
            .info {
                margin-top: 40px;
                padding-top: 30px;
                border-top: 1px solid rgba(255,255,255,0.2);
                opacity: 0.8;
                line-height: 1.6;
            }
            .feature-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin: 30px 0;
            }
            .feature {
                background: rgba(255,255,255,0.1);
                padding: 20px;
                border-radius: 10px;
                border: 1px solid rgba(255,255,255,0.2);
            }
            .api-links {
                margin-top: 30px;
            }
            .api-link {
                display: inline-block;
                background: rgba(255,255,255,0.2);
                padding: 10px 20px;
                margin: 5px;
                border-radius: 25px;
                text-decoration: none;
                color: white;
                transition: all 0.3s ease;
            }
            .api-link:hover {
                background: rgba(255,255,255,0.3);
                transform: translateY(-2px);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 Dyad App</h1>
            <p class="subtitle">Successfully deployed on Zero2Launch infrastructure</p>
            
            <div class="status">
                ✅ Live and Running • Deployed ${new Date().toLocaleDateString()}
            </div>

            <div class="feature-grid">
                <div class="feature">
                    <h3>🛡️ Security</h3>
                    <p>HTTPS, CORS & Helmet protection enabled</p>
                </div>
                <div class="feature">
                    <h3>⚡ Performance</h3>
                    <p>Compression & caching optimized</p>
                </div>
                <div class="feature">
                    <h3>🔧 Self-Hosted</h3>
                    <p>Running on your own VPS infrastructure</p>
                </div>
            </div>

            <div class="api-links">
                <a href="/health" class="api-link">Health Check</a>
                <a href="/api/status" class="api-link">API Status</a>
                <a href="/api/info" class="api-link">System Info</a>
            </div>

            <div class="info">
                <p><strong>Domain:</strong> dyad.zero2launch.co.uk</p>
                <p><strong>Powered by:</strong> Node.js + Express + Coolify</p>
                <p><strong>Hosted on:</strong> Your Contabo VPS</p>
                <p><strong>Auto-deployed from:</strong> GitHub repository</p>
            </div>
        </div>
    </body>
    </html>
  `);
});

// Health check endpoint (important for Coolify monitoring)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'production'
  });
});

// API status endpoint
app.get('/api/status', (req, res) => {
  res.json({ 
    message: 'Dyad API is running perfectly!',
    version: '1.0.0',
    uptime: Math.floor(process.uptime()),
    memoryUsage: process.memoryUsage(),
    timestamp: new Date().toISOString()
  });
});

// System info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    app: 'Dyad Application',
    domain: 'dyad.zero2launch.co.uk',
    nodeVersion: process.version,
    platform: process.platform,
    environment: process.env.NODE_ENV || 'production',
    deployedAt: new Date().toISOString()
  });
});

// API route for future expansion
app.get('/api/hello', (req, res) => {
  res.json({
    message: 'Hello from your Dyad app!',
    timestamp: new Date().toISOString(),
    tip: 'You can build amazing features here'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).send(`
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <a href="/">← Go back to homepage</a>
  `);
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Dyad app successfully started!`);
  console.log(`🌍 Server running on port ${port}`);
  console.log(`📡 Visit: http://localhost:${port}`);
  console.log(`🌐 Production: https://dyad.zero2launch.co.uk`);
  console.log(`⚡ Environment: ${process.env.NODE_ENV || 'production'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('📤 Received SIGTERM, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('📤 Received SIGINT, shutting down gracefully...');
  process.exit(0);
});
