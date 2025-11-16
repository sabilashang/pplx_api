'use client'

import { useState } from 'react'

/**
 * ResponseDisplay Component
 * 
 * Displays the API response in a formatted, readable way.
 * Shows both the summary content and the full JSON response.
 */

interface ResponseDisplayProps {
    response: any
    error: string | null
    isLoading: boolean
    duration: number | null
}

export default function ResponseDisplay({ response, error, isLoading, duration }: ResponseDisplayProps) {
    const [showFullResponse, setShowFullResponse] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        if (response) {
            await navigator.clipboard.writeText(JSON.stringify(response, null, 2))
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    // Extract summary from response
    const summary = response?.choices?.[0]?.message?.content || ''

    // Format duration
    const formatDuration = (ms: number) => {
        if (ms < 1000) return `${Math.round(ms)}ms`
        return `${(ms / 1000).toFixed(2)}s`
    }

    // Don't render anything if there's no response, error, or loading state
    if (!response && !error && !isLoading) {
        return (
            <div className="text-center py-12 text-slate-400 dark:text-slate-500">
                <svg
                    className="w-16 h-16 mx-auto mb-4 opacity-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
                <p className="text-sm">Enter some text above and click "Summarize" to see the results</p>
            </div>
        )
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <svg
                        className="animate-spin h-12 w-12 mx-auto mb-4 text-blue-600 dark:text-blue-400"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    <p className="text-slate-600 dark:text-slate-400">Generating summary...</p>
                </div>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <svg
                        className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <div className="flex-1">
                        <h3 className="font-semibold text-red-800 dark:text-red-200 mb-1">Error</h3>
                        <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                        {duration && (
                            <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                                <span className="font-medium">Failed after:</span> {formatDuration(duration)}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    // Success state with response
    return (
        <div className="space-y-4">
            {/* Summary Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                    <svg
                        className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <div className="flex-1">
                        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Summary</h3>
                        <p className="text-slate-800 dark:text-slate-200 leading-relaxed">{summary}</p>
                    </div>
                </div>

                {/* Model Info */}
                {response.model && (
                    <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800 text-xs text-slate-600 dark:text-slate-400">
                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                            <div>
                                <span className="font-medium">Model:</span> {response.model}
                            </div>
                            {response.usage && (
                                <div>
                                    <span className="font-medium">Tokens:</span> {response.usage.total_tokens} ({response.usage.prompt_tokens} prompt + {response.usage.completion_tokens} completion)
                                </div>
                            )}
                            {duration && (
                                <div className="flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="font-medium">Duration:</span> <span className="text-blue-600 dark:text-blue-400 font-semibold">{formatDuration(duration)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Full Response Toggle */}
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                <button
                    onClick={() => setShowFullResponse(!showFullResponse)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors flex items-center justify-between text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                    <span>Full JSON Response</span>
                    <svg
                        className={`w-5 h-5 transition-transform ${showFullResponse ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {showFullResponse && (
                    <div className="relative">
                        <button
                            onClick={handleCopy}
                            className="absolute top-3 right-3 px-3 py-1.5 bg-slate-700 dark:bg-slate-600 hover:bg-slate-600 dark:hover:bg-slate-500 text-white text-xs rounded transition-colors flex items-center gap-1.5"
                        >
                            {copied ? (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                        />
                                    </svg>
                                    Copy
                                </>
                            )}
                        </button>
                        <pre className="p-4 pt-12 bg-slate-900 dark:bg-slate-950 text-slate-100 text-xs overflow-x-auto">
                            {JSON.stringify(response, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    )
}

