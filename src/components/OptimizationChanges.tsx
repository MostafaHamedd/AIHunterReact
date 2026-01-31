import { Sparkles } from 'lucide-react'
import { useStore } from '@/store/useStore'

export default function OptimizationChanges() {
  const { optimizationChanges } = useStore()

  if (optimizationChanges.length === 0) {
    return (
      <div className="card">
        <p className="text-gray-500">
          No optimizations yet. Analyze a job and optimize your resume to see changes.
        </p>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <h2 className="text-xl font-semibold">How Your Resume Was Optimized</h2>
      </div>

      <div className="space-y-6">
        {optimizationChanges.map((change) => (
          <div
            key={change.id}
            className="border-l-4 border-purple-500 pl-4 py-2 space-y-3"
          >
            <div className="text-sm font-medium text-gray-600">
              {change.section}
            </div>
            
            <div className="space-y-2">
              <div>
                <div className="text-xs font-medium text-gray-500">
                  Original:
                </div>
                <div className="text-gray-700">
                  {change.original}
                </div>
              </div>
              
              <div>
                <div className="text-xs font-medium text-gray-500">
                  Optimized:
                </div>
                <div className="text-gray-900">
                  {change.optimized.split(' ').map((word, idx) => {
                    const isKeyword = change.keywordsAdded.some(kw =>
                      word.toLowerCase().includes(kw.toLowerCase())
                    )
                    return (
                      <span
                        key={idx}
                        className={isKeyword ? 'font-bold text-purple-700 bg-purple-50 px-1 rounded' : ''}
                      >
                        {word}{' '}
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              💡 {change.explanation}
            </div>

            {change.keywordsAdded.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {change.keywordsAdded.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 rounded text-xs font-medium"
                  >
                    +{keyword}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

