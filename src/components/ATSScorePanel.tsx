import { CheckCircle2, AlertCircle, Lightbulb } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { cn } from '@/utils/cn'

export default function ATSScorePanel() {
  const { atsScore } = useStore()

  if (!atsScore) {
    return (
      <div className="card sticky top-24">
        <p className="text-gray-500 text-center py-8">
          Upload a resume and analyze a job to see ATS score
        </p>
      </div>
    )
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100'
    if (score >= 60) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  return (
    <div className="card sticky top-24 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">ATS Match Score</h3>
        <div className={cn(
          'rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-2',
          getScoreBg(atsScore.score)
        )}>
          <span className={cn('text-3xl font-bold', getScoreColor(atsScore.score))}>
            {atsScore.score}
          </span>
        </div>
        <p className="text-center text-sm text-gray-600">
          out of 100
        </p>
      </div>

      <div className="space-y-4">
        {atsScore.matchedKeywords.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <h4 className="font-medium">Matched Keywords</h4>
              <span className="text-sm text-gray-500">
                ({atsScore.matchedKeywords.length})
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {atsScore.matchedKeywords.map((match, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-sm"
                >
                  {match.keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {atsScore.missingKeywords.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <h4 className="font-medium">Missing Keywords</h4>
              <span className="text-sm text-gray-500">
                ({atsScore.missingKeywords.length})
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {atsScore.missingKeywords.map((match, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-sm"
                >
                  {match.keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {atsScore.suggestedKeywords.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="h-5 w-5 text-blue-600" />
              <h4 className="font-medium">Suggested Keywords</h4>
              <span className="text-sm text-gray-500">
                ({atsScore.suggestedKeywords.length})
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {atsScore.suggestedKeywords.map((match, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm"
                >
                  {match.keyword}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

