import { NextRequest, NextResponse } from 'next/server'

/**
 * API Route: /api/search
 * 
 * Handles requests to the Perplexity Search API.
 * This is a separate endpoint from the chat completions models - it returns raw web search results.
 * 
 * Search API Pricing: $5 per 1K requests (no token costs)
 * Returns: Raw search results with advanced filtering capabilities
 */

export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const body = await request.json()
        const { text, maxResults = 10 } = body

        // Validate input
        if (!text || typeof text !== 'string') {
            return NextResponse.json(
                { error: 'Invalid request: "text" field is required and must be a string' },
                { status: 400 }
            )
        }

        if (text.trim().length === 0) {
            return NextResponse.json(
                { error: 'Invalid request: "text" cannot be empty' },
                { status: 400 }
            )
        }

        // Get API key
        const apiKey = process.env.PERPLEXITY_API_KEY

        if (!apiKey) {
            return NextResponse.json(
                { error: 'Server configuration error: API key not configured' },
                { status: 500 }
            )
        }

        // Call Perplexity Search API
        // Note: The Search API endpoint and structure may differ from chat completions
        // This is a placeholder implementation based on typical search API patterns
        const searchResponse = await fetch('https://api.perplexity.ai/search', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: text,
                max_results: maxResults,
            }),
        })

        if (!searchResponse.ok) {
            const errorText = await searchResponse.text()
            let errorMessage = `Perplexity Search API error: ${searchResponse.status} ${searchResponse.statusText}`

            try {
                const errorJson = JSON.parse(errorText)
                if (errorJson.error) {
                    errorMessage = errorJson.error.message || errorJson.error
                }
            } catch {
                errorMessage += ` - ${errorText}`
            }

            throw new Error(errorMessage)
        }

        const data = await searchResponse.json()

        // Return successful response
        return NextResponse.json(data, { status: 200 })

    } catch (error) {
        console.error('Error in /api/search:', error)

        // Handle different error types
        if (error instanceof Error) {
            // Check for specific Perplexity API errors
            if (error.message.includes('401')) {
                return NextResponse.json(
                    { error: 'Authentication failed: Invalid API key' },
                    { status: 401 }
                )
            }

            if (error.message.includes('429')) {
                return NextResponse.json(
                    { error: 'Rate limit exceeded: Please try again later' },
                    { status: 429 }
                )
            }

            if (error.message.includes('404')) {
                return NextResponse.json(
                    { error: 'Search API endpoint not found. This endpoint may require a different API plan or may not be available yet.' },
                    { status: 404 }
                )
            }

            // Generic error with message
            return NextResponse.json(
                { error: `Failed to process request: ${error.message}` },
                { status: 500 }
            )
        }

        // Unknown error
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        )
    }
}

// Disable static optimization for this route
export const dynamic = 'force-dynamic'

