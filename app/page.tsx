'use client'

import { useState } from 'react'
import Tabs from './components/Tabs'
import TextInput from './components/TextInput'
import ResponseDisplay from './components/ResponseDisplay'

export default function HomePage() {
    const [activeTab, setActiveTab] = useState('sonar')
    const [response, setResponse] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [duration, setDuration] = useState<number | null>(null)

    const handleSubmit = async (text: string) => {
        // Validate input
        if (!text.trim()) {
            setError('Please enter some text to summarize')
            return
        }

        // Reset states
        setError(null)
        setResponse(null)
        setDuration(null)
        setIsLoading(true)

        // Start timer
        const startTime = performance.now()

        try {
            // Call the API route corresponding to the active tab
            const res = await fetch(`/api/${activeTab}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: text.trim() }),
            })

            const data = await res.json()

            // Calculate duration
            const endTime = performance.now()
            const requestDuration = endTime - startTime

            if (!res.ok) {
                // Handle error response
                setError(data.error || 'An error occurred while processing your request')
                setDuration(requestDuration)
            } else {
                // Set successful response
                setResponse(data)
                setDuration(requestDuration)
            }
        } catch (err) {
            console.error('Request failed:', err)
            setError('Network error: Failed to connect to the API. Please check your connection and try again.')
            const endTime = performance.now()
            setDuration(endTime - startTime)
        } finally {
            setIsLoading(false)
        }
    }

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId)
        // Clear previous response, error, and duration when switching tabs
        setResponse(null)
        setError(null)
        setDuration(null)
    }

    return (
        <main className="container mx-auto px-4 py-8 max-w-5xl">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">
                    Perplexity API Demo
                </h1>
                <p className="text-slate-600 dark:text-slate-300">
                    Test all 6 Perplexity AI endpoints by summarizing text in 1-2 sentences
                </p>
            </div>

            {/* Main Card */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden">
                {/* Tab Navigation */}
                <Tabs activeTab={activeTab} onTabChange={handleTabChange} />

                {/* Content Area */}
                <div className="p-6">
                    {/* Input Section */}
                    <TextInput onSubmit={handleSubmit} isLoading={isLoading} />

                    {/* Response Section */}
                    <div className="mt-6">
                        <ResponseDisplay response={response} error={error} isLoading={isLoading} duration={duration} />
                    </div>
                </div>
            </div>

            {/* Footer Info */}
            <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
                <p>
                    Powered by{' '}
                    <a
                        href="https://www.perplexity.ai/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
                    >
                        Perplexity AI
                    </a>
                    {' '}and{' '}
                    <a
                        href="https://nextjs.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
                    >
                        Next.js 14
                    </a>
                </p>
            </div>
        </main>
    )
}

