import { useState } from 'react'
import { Link as LinkIcon, FileText, Loader2 } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { jobService } from '@/services/jobService'

export default function JobInput() {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [inputType, setInputType] = useState<'url' | 'text'>('url')
  const { setCurrentJobDescription, addJobDescription } = useStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)
    try {
      const jobDescription = await jobService.analyzeJobDescription(input, inputType === 'url')
      setCurrentJobDescription(jobDescription)
      addJobDescription(jobDescription)
    } catch (error) {
      console.error('Error extracting job data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Job Description Input</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setInputType('url')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              inputType === 'url'
                ? 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 font-semibold'
                : 'bg-gray-100 text-black'
            }`}
          >
            <LinkIcon className="h-4 w-4 inline mr-1" />
            Link
          </button>
          <button
            onClick={() => setInputType('text')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              inputType === 'text'
                ? 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 font-semibold'
                : 'bg-gray-100 text-black'
            }`}
          >
            <FileText className="h-4 w-4 inline mr-1" />
            Paste Text
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {inputType === 'url' ? (
          <div>
            <label htmlFor="job-url" className="block text-sm font-medium mb-2">
              Job Posting URL
            </label>
            <input
              id="job-url"
              type="url"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="https://example.com/job-posting"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-black"
              disabled={isLoading}
            />
          </div>
        ) : (
          <div>
            <label htmlFor="job-text" className="block text-sm font-medium mb-2">
              Job Description Text
            </label>
            <textarea
              id="job-text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste the job description here..."
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-black"
              disabled={isLoading}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="btn-gradient w-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Analyze Job Description'
          )}
        </button>
      </form>
    </div>
  )
}

