import fetch from 'node-fetch';

async function testLocalAPI() {
    const url = 'http://localhost:8003/api/contact';
    const data = {
        name: 'Local Debugger',
        email: 'debug@local.test',
        message: 'Testing from local script to see console errors.'
    };

    console.log(`Testing API at: ${url}`);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        console.log(`Status Code: ${response.status}`);
        const body = await response.json();
        console.log('Response:', body);
    } catch (error) {
        console.error('❌ Network error:', error);
    }
}

testLocalAPI();
