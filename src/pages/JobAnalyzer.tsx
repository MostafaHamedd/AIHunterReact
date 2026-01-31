import { useState, useEffect } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import JobInput from '@/components/JobInput'
import ResumeUpload from '@/components/ResumeUpload'
import ATSScorePanel from '@/components/ATSScorePanel'
import OptimizationChanges from '@/components/OptimizationChanges'
import { useStore } from '@/store/useStore'
import { atsService } from '@/services/atsService'
import { resumeService } from '@/services/resumeService'
import { applicationService } from '@/services/applicationService'

export default function JobAnalyzer() {
  const { 
    currentJobDescription, 
    currentResume, 
    setATSScore, 
    setOptimizationChanges,
    setCurrentResume,
    addApplication
  } = useStore()
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    const analyze = async () => {
      if (currentJobDescription && currentResume) {
        setIsAnalyzing(true)
        try {
          // Calculate ATS Score
          const atsScore = await atsService.calculateScore(currentResume.id, currentJobDescription.id)
          setATSScore(atsScore)

          // Optimize Resume
          const optimizedResume = await resumeService.optimizeResume(currentResume.id, currentJobDescription.id)
          setCurrentResume(optimizedResume)
          
          // TODO: Backend needs to return optimization changes
          // For now, use empty changes array
          setOptimizationChanges([])

          // Create application entry
          const application = await applicationService.createApplication(
            currentJobDescription.id,
            currentResume.id
          )
          addApplication(application)
        } catch (error) {
          console.error('Error analyzing:', error)
        } finally {
          setIsAnalyzing(false)
        }
      }
    }

    analyze()
  }, [currentJobDescription, currentResume])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Job Analyzer</h1>
        <p className="text-gray-600">
          Analyze job descriptions and optimize your resume for better ATS scores
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <JobInput />
          <ResumeUpload />
          
          {isAnalyzing && (
            <div className="card">
              <div className="flex items-center justify-center gap-3 py-8">
                <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
                <span className="text-gray-600">
                  Analyzing job description and optimizing resume...
                </span>
              </div>
            </div>
          )}

          {currentJobDescription && currentResume && !isAnalyzing && (
            <OptimizationChanges />
          )}
        </div>

        <div>
          <ATSScorePanel />
        </div>
      </div>

      {currentJobDescription && (
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold">Extracted Job Data</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {currentJobDescription.extractedData.requiredSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 rounded text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {currentJobDescription.extractedData.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gradient-to-r from-purple-200 to-indigo-200 text-purple-800 rounded text-sm font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {currentJobDescription.extractedData.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded text-sm font-medium"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {currentJobDescription.extractedData.softSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

