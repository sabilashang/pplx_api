import { NextRequest, NextResponse } from 'next/server'
import { callPerplexityAPI } from '@/lib/perplexity'

/**
 * API Route: /api/sonar-reasoning
 * 
 * Handles requests to summarize text using the Perplexity Sonar Reasoning model.
 * The Sonar Reasoning model provides advanced reasoning capabilities.
 */

export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const body = await request.json()
        const { text } = body

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

        if (text.length > 10000) {
            return NextResponse.json(
                { error: 'Invalid request: "text" exceeds maximum length of 10,000 characters' },
                { status: 400 }
            )
        }

        // Call Perplexity API with Sonar Reasoning model
        const response = await callPerplexityAPI('sonar-reasoning', text)

        // Return successful response
        return NextResponse.json(response, { status: 200 })

    } catch (error) {
        console.error('Error in /api/sonar-reasoning:', error)

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

            if (error.message.includes('PERPLEXITY_API_KEY')) {
                return NextResponse.json(
                    { error: 'Server configuration error: API key not configured' },
                    { status: 500 }
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

