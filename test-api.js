
import fetch from 'node-fetch';

async function testContactAPI() {
    const url = 'https://finance-backend-p4nq.onrender.com/api/contact';
    const data = {
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test message from the debugging script.'
    };

    console.log(`Testing API at: ${url}`);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        console.log(`Status Code: ${response.status}`);
        const responseData = await response.json();
        console.log('Response Body:', responseData);

        if (response.ok) {
            console.log("✅ API call successful!");
        } else {
            console.log("❌ API call failed.");
        }

    } catch (error) {
        console.error('❌ Network error:', error);
    }
}

testContactAPI();
