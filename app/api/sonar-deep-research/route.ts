import { NextRequest, NextResponse } from 'next/server'
import { callPerplexityAPI } from '@/lib/perplexity'

/**
 * API Route: /api/sonar-deep-research
 * 
 * Handles requests to summarize text using the Perplexity Sonar Deep Research model.
 * The Sonar Deep Research model provides exhaustive research and detailed report generation.
 * Note: This model may take longer and cost more due to multiple search queries and reasoning tokens.
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

        // Call Perplexity API with Sonar Deep Research model
        const response = await callPerplexityAPI('sonar-deep-research', text)

        // Return successful response
        return NextResponse.json(response, { status: 200 })

    } catch (error) {
        console.error('Error in /api/sonar-deep-research:', error)

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

