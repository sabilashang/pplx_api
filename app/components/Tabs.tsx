'use client'

/**
 * Tabs Component
 * 
 * Provides tab navigation for switching between different Perplexity API models.
 * Each tab represents a different endpoint/model combination.
 */

interface Tab {
    id: string
    name: string
    description: string
    model: string
}

const tabs: Tab[] = [
    {
        id: 'sonar',
        name: 'Sonar',
        description: 'Lightweight, cost-effective search model',
        model: 'sonar'
    },
    {
        id: 'sonar-pro',
        name: 'Sonar Pro',
        description: 'Advanced search with deeper content understanding',
        model: 'sonar-pro'
    },
    {
        id: 'sonar-reasoning',
        name: 'Sonar Reasoning',
        description: 'Quick problem-solving with step-by-step logic',
        model: 'sonar-reasoning'
    },
    {
        id: 'sonar-reasoning-pro',
        name: 'Sonar Reasoning Pro',
        description: 'Enhanced multi-step reasoning with web search',
        model: 'sonar-reasoning-pro'
    },
    {
        id: 'sonar-deep-research',
        name: 'Deep Research',
        description: 'Exhaustive research and detailed report generation',
        model: 'sonar-deep-research'
    },
    {
        id: 'search',
        name: 'Search API',
        description: 'Raw web search results with advanced filtering',
        model: 'search'
    }
]

interface TabsProps {
    activeTab: string
    onTabChange: (tabId: string) => void
}

export default function Tabs({ activeTab, onTabChange }: TabsProps) {
    return (
        <div className="border-b border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap -mb-px overflow-x-auto">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`
                group relative px-3 sm:px-6 py-3 sm:py-4 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap
                ${isActive
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                                }
              `}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {/* Tab Label */}
                            <div className="flex items-center gap-2">
                                <span>{tab.name}</span>
                                {isActive && (
                                    <span className="inline-flex items-center justify-center w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
                                )}
                            </div>

                            {/* Tooltip on hover */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                {tab.description}
                                <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-slate-800 rotate-45" />
                            </div>

                            {/* Active indicator */}
                            {isActive && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

