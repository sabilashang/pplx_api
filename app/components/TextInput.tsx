'use client'

import { useState, useRef } from 'react'

/**
 * TextInput Component
 * 
 * Provides a text area for user input with submission controls.
 * Includes character count, validation, and loading states.
 */

interface TextInputProps {
    onSubmit: (text: string) => void
    isLoading: boolean
}

const MAX_CHARACTERS = 2000

export default function TextInput({ onSubmit, isLoading }: TextInputProps) {
    const [text, setText] = useState('')
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleSubmit = () => {
        if (text.trim() && !isLoading) {
            onSubmit(text)
        }
    }

    const handleClear = () => {
        setText('')
        textareaRef.current?.focus()
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // Submit on Ctrl+Enter or Cmd+Enter
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault()
            handleSubmit()
        }
    }

    const characterCount = text.length
    const isOverLimit = characterCount > MAX_CHARACTERS
    const isNearLimit = characterCount > MAX_CHARACTERS * 0.9

    return (
        <div className="space-y-3">
            {/* Label */}
            <label htmlFor="text-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Enter text to summarize
            </label>

            {/* Textarea */}
            <div className="relative">
                <textarea
                    ref={textareaRef}
                    id="text-input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Paste or type the text you want to summarize in 1-2 sentences..."
                    disabled={isLoading}
                    className={`
            w-full px-4 py-3 rounded-lg border resize-none
            focus:outline-none focus:ring-2 transition-all
            disabled:opacity-50 disabled:cursor-not-allowed
            ${isOverLimit
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                            : 'border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-200'
                        }
            bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100
            placeholder:text-slate-400 dark:placeholder:text-slate-500
          `}
                    rows={6}
                />

                {/* Character Count */}
                <div className="absolute bottom-3 right-3 text-xs">
                    <span
                        className={`
              ${isOverLimit ? 'text-red-600 font-semibold' : isNearLimit ? 'text-amber-600' : 'text-slate-400'}
            `}
                    >
                        {characterCount} / {MAX_CHARACTERS}
                    </span>
                </div>
            </div>

            {/* Helper Text */}
            <p className="text-xs text-slate-500 dark:text-slate-400">
                Tip: Press <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-xs">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-xs">Enter</kbd> to submit
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3">
                <button
                    onClick={handleSubmit}
                    disabled={!text.trim() || isLoading || isOverLimit}
                    className={`
            flex-1 px-6 py-3 rounded-lg font-medium transition-all
            disabled:opacity-50 disabled:cursor-not-allowed
            ${isLoading
                            ? 'bg-blue-400 dark:bg-blue-600 cursor-wait'
                            : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                        }
            text-white shadow-lg hover:shadow-xl
            flex items-center justify-center gap-2
          `}
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                            <span>Processing...</span>
                        </>
                    ) : (
                        <>
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                            </svg>
                            <span>Summarize</span>
                        </>
                    )}
                </button>

                <button
                    onClick={handleClear}
                    disabled={!text || isLoading}
                    className="px-6 py-3 rounded-lg font-medium border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Clear
                </button>
            </div>
        </div>
    )
}

