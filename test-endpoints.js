/**
 * Test script to verify all 6 Perplexity API endpoints
 * Run this after starting the dev server
 */

const testText = `Artificial intelligence is revolutionizing healthcare by enabling early disease detection through advanced pattern recognition in medical imaging. Machine learning algorithms can now analyze vast datasets to identify subtle anomalies that might escape human observation, potentially saving countless lives through earlier intervention.`;

const endpoints = [
    { name: 'Sonar', path: '/api/sonar' },
    { name: 'Sonar Pro', path: '/api/sonar-pro' },
    { name: 'Sonar Reasoning', path: '/api/sonar-reasoning' },
    { name: 'Sonar Reasoning Pro', path: '/api/sonar-reasoning-pro' },
    { name: 'Sonar Deep Research', path: '/api/sonar-deep-research' },
    { name: 'Search API', path: '/api/search' }
];

async function testEndpoint(endpoint) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Testing: ${endpoint.name}`);
    console.log(`Endpoint: ${endpoint.path}`);
    console.log('='.repeat(60));

    try {
        const startTime = Date.now();

        const response = await fetch(`http://localhost:3000${endpoint.path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: testText }),
        });

        const endTime = Date.now();
        const duration = endTime - startTime;

        console.log(`Status: ${response.status} ${response.statusText}`);
        console.log(`Duration: ${duration}ms`);

        const data = await response.json();

        if (!response.ok) {
            console.log('❌ ERROR:', data.error || JSON.stringify(data));
            return { success: false, endpoint: endpoint.name, error: data.error, status: response.status };
        }

        // Extract and display the summary
        if (data.choices && data.choices[0] && data.choices[0].message) {
            const summary = data.choices[0].message.content;
            console.log('✅ SUCCESS');
            console.log(`\nSummary:\n${summary}`);

            if (data.usage) {
                console.log(`\nToken Usage:`);
                console.log(`  - Prompt tokens: ${data.usage.prompt_tokens || 'N/A'}`);
                console.log(`  - Completion tokens: ${data.usage.completion_tokens || 'N/A'}`);
                console.log(`  - Total tokens: ${data.usage.total_tokens || 'N/A'}`);
            }

            return { success: true, endpoint: endpoint.name, duration, summary, usage: data.usage };
        } else if (data.results) {
            // Search API returns different format
            console.log('✅ SUCCESS (Search API format)');
            console.log(`\nResults: ${data.results.length || 'N/A'} items`);
            return { success: true, endpoint: endpoint.name, duration, type: 'search', results: data.results };
        } else {
            console.log('✅ SUCCESS (but unexpected format)');
            console.log(`\nResponse: ${JSON.stringify(data).substring(0, 200)}...`);
            return { success: true, endpoint: endpoint.name, duration, data };
        }

    } catch (error) {
        console.log(`❌ FETCH ERROR: ${error.message}`);
        return { success: false, endpoint: endpoint.name, error: error.message };
    }
}

async function runAllTests() {
    console.log('\n🚀 Starting Perplexity API Endpoint Tests');
    console.log(`Test Input: "${testText.substring(0, 100)}..."`);
    console.log(`\nTesting ${endpoints.length} endpoints...\n`);

    const results = [];

    for (const endpoint of endpoints) {
        const result = await testEndpoint(endpoint);
        results.push(result);

        // Wait a bit between requests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST SUMMARY');
    console.log('='.repeat(60));

    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    console.log(`\nTotal Endpoints: ${endpoints.length}`);
    console.log(`✅ Successful: ${successful}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📈 Success Rate: ${((successful / endpoints.length) * 100).toFixed(1)}%`);

    console.log('\n📋 Detailed Results:');
    results.forEach((result, index) => {
        const icon = result.success ? '✅' : '❌';
        const status = result.success ? 'PASS' : 'FAIL';
        const extra = result.success
            ? `(${result.duration}ms)`
            : `(${result.status || 'Error'}: ${result.error})`;

        console.log(`  ${index + 1}. ${icon} ${result.endpoint.padEnd(25)} ${status.padEnd(6)} ${extra}`);
    });

    console.log('\n' + '='.repeat(60));

    if (failed > 0) {
        console.log('\n⚠️  Some endpoints failed. Check the detailed output above.');
        console.log('Common issues:');
        console.log('  - API key not configured in .env.local');
        console.log('  - Invalid API key');
        console.log('  - Rate limit exceeded');
        console.log('  - Model not available in your plan');
    } else {
        console.log('\n🎉 All endpoints working correctly!');
    }

    process.exit(failed > 0 ? 1 : 0);
}

// Run tests
runAllTests().catch(error => {
    console.error('\n❌ Test runner error:', error);
    process.exit(1);
});

