/**
 * Perplexity API Helper
 * 
 * This module provides a centralized helper function for making requests
 * to the Perplexity API. It handles authentication, request formatting,
 * and error handling.
 */

const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

/**
 * Perplexity API response type
 */
export interface PerplexityResponse {
    id: string;
    model: string;
    object: string;
    created: number;
    choices: Array<{
        index: number;
        finish_reason: string;
        message: {
            role: string;
            content: string;
        };
        delta?: {
            role?: string;
            content?: string;
        };
    }>;
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

/**
 * Request payload for Perplexity API
 */
export interface PerplexityRequest {
    model: string;
    messages: Array<{
        role: 'system' | 'user' | 'assistant';
        content: string;
    }>;
    max_tokens?: number;
    temperature?: number;
    top_p?: number;
    stream?: boolean;
    presence_penalty?: number;
    frequency_penalty?: number;
}

/**
 * Makes a request to the Perplexity API
 * 
 * @param model - The model to use (e.g., 'sonar', 'sonar-pro', 'sonar-reasoning')
 * @param userInput - The user's input text to process
 * @returns Promise resolving to the API response
 * @throws Error if the request fails
 */
export async function callPerplexityAPI(
    model: string,
    userInput: string
): Promise<PerplexityResponse> {
    const apiKey = process.env.PERPLEXITY_API_KEY;

    if (!apiKey) {
        throw new Error('PERPLEXITY_API_KEY is not configured in environment variables');
    }

    // Construct the request payload
    const payload: PerplexityRequest = {
        model: model,
        messages: [
            {
                role: 'system',
                content: 'You are a helpful assistant that provides concise summaries. Always respond with clear, accurate summaries in 1-2 sentences.'
            },
            {
                role: 'user',
                content: `Summarize the following text in 1–2 sentences:\n\n${userInput}`
            }
        ],
        max_tokens: 150,
        temperature: 0.7,
        top_p: 0.9,
        stream: false
    };

    try {
        const response = await fetch(PERPLEXITY_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = `Perplexity API error: ${response.status} ${response.statusText}`;

            try {
                const errorJson = JSON.parse(errorText);
                if (errorJson.error) {
                    errorMessage = errorJson.error.message || errorJson.error;
                }
            } catch {
                // If error text is not JSON, use the raw text
                errorMessage += ` - ${errorText}`;
            }

            throw new Error(errorMessage);
        }

        const data: PerplexityResponse = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('An unexpected error occurred while calling Perplexity API');
    }
}

/**
 * Extracts the content from a Perplexity API response
 * 
 * @param response - The API response
 * @returns The content string from the first choice, or empty string if not found
 */
export function extractContent(response: PerplexityResponse): string {
    if (response.choices && response.choices.length > 0) {
        return response.choices[0].message.content;
    }
    return '';
}

