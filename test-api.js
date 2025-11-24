const https = require('https');

function testUrl(name, hostname, path) {
    return new Promise((resolve) => {
        console.log(`\nTesting connection to ${name} (${hostname})...`);
        const options = {
            hostname: hostname,
            path: path,
            method: 'GET',
            timeout: 5000
        };

        const req = https.request(options, (res) => {
            console.log(`[${name}] STATUS: ${res.statusCode}`);
            res.resume();
            resolve(true);
        });

        req.on('error', (e) => {
            console.error(`[${name}] ERROR: ${e.message}`);
            resolve(false);
        });

        req.on('timeout', () => {
            console.error(`[${name}] TIMEOUT`);
            req.destroy();
            resolve(false);
        });

        req.end();
    });
}

async function runTests() {
    // 1. Test General Internet (Baidu)
    await testUrl('Baidu', 'www.baidu.com', '/');

    // 2. Test Moonshot API
    await testUrl('Moonshot', 'api.moonshot.cn', '/v1/models');
}

runTests();
