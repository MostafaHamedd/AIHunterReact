import { useState, useEffect } from 'react'
import { Sparkles, Loader2, FileText } from 'lucide-react'
import JobInput from '@/components/JobInput'
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
    currentCoverLetter,
    setATSScore, 
    setOptimizationChanges,
    setCurrentResume,
    addApplication
  } = useStore()
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [optimizedResume, setOptimizedResume] = useState<any>(null)

  useEffect(() => {
    const analyze = async () => {
      if (currentJobDescription && currentResume) {
        setIsAnalyzing(true)
        try {
          // Calculate ATS Score
          const atsScore = await atsService.calculateScore(currentResume.id, currentJobDescription.id)
          setATSScore(atsScore)

          // Optimize Resume
          const optimized = await resumeService.optimizeResume(currentResume.id, currentJobDescription.id)
          setOptimizedResume(optimized)
          setCurrentResume(optimized)
          
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

  const renderResumeSection = (content: any) => {
    if (!content) {
      return (
        <div className="text-gray-500 text-sm">No content available</div>
      )
    }

    return (
      <div className="space-y-4">
        {content.summary && (
          <div>
            <h4 className="font-semibold text-sm mb-2 text-gray-700">Summary</h4>
            <p className="text-sm text-gray-600">{content.summary}</p>
          </div>
        )}

        {content.experience && content.experience.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm mb-2 text-gray-700">Experience</h4>
            <div className="space-y-3">
              {content.experience.map((exp: any, idx: number) => (
                <div key={idx} className="border-l-2 border-purple-300 pl-3">
                  <div className="font-medium text-sm">{exp.role} at {exp.company}</div>
                  {exp.duration && (
                    <div className="text-xs text-gray-500">{exp.duration}</div>
                  )}
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="mt-1 space-y-1">
                      {exp.bullets.map((bullet: string, bIdx: number) => (
                        <li key={bIdx} className="text-xs text-gray-600 list-disc list-inside">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {content.skills && content.skills.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm mb-2 text-gray-700">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {content.skills.map((skill: string, idx: number) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {content.projects && content.projects.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm mb-2 text-gray-700">Projects</h4>
            <div className="space-y-2">
              {content.projects.map((proj: any, idx: number) => (
                <div key={idx} className="border rounded p-2">
                  <div className="font-medium text-sm">{proj.name}</div>
                  {proj.description && (
                    <div className="text-xs text-gray-600 mt-1">{proj.description}</div>
                  )}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {proj.technologies.map((tech: string, tIdx: number) => (
                        <span
                          key={tIdx}
                          className="px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Job Analyzer</h1>
        <p className="text-gray-600">
          Paste a job posting link, analyze it, and see your optimized resume
        </p>
      </div>

      <div className="space-y-6">
        <JobInput />
        
        {!currentResume && (
          <div className="card bg-yellow-50 border-yellow-200">
            <p className="text-yellow-800">
              ⚠️ Please upload your resume in the <strong>Documents</strong> page first.
            </p>
          </div>
        )}

        {currentResume && !currentCoverLetter && (
          <div className="card bg-blue-50 border-blue-200">
            <p className="text-blue-800">
              💡 Tip: Upload a cover letter in the <strong>Documents</strong> page to optimize it for this job too.
            </p>
          </div>
        )}

        {isAnalyzing && (
          <div className="card">
            <div className="flex items-center justify-center gap-3 py-8">
              <Loader2 className="h-5 w-5 animate-spin text-purple-600" />
              <span className="text-gray-600">
                Analyzing job description and optimizing resume...
              </span>
            </div>
          </div>
        )}

        {currentJobDescription && currentResume && !isAnalyzing && (
          <div className="space-y-6">
            <ATSScorePanel />

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

            {/* Optimized vs Original Resume Comparison */}
            <div className="card">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500">
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-xl font-semibold">Resume Comparison</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Original Resume */}
                <div className="border-r border-gray-200 pr-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">Original Resume</h3>
                    <p className="text-sm text-gray-500">Your current resume</p>
                  </div>
                  <div className="max-h-[600px] overflow-y-auto">
                    {renderResumeSection(currentResume.originalContent)}
                  </div>
                </div>

                {/* Optimized Resume */}
                <div className="pl-6">
                  <div className="mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-purple-700">Optimized Resume</h3>
                      <span className="px-2 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 rounded text-xs font-semibold">
                        For This Job
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">Optimized for this job description</p>
                  </div>
                  <div className="max-h-[600px] overflow-y-auto">
                    {optimizedResume ? (
                      renderResumeSection(optimizedResume.optimizedContent || optimizedResume.originalContent)
                    ) : (
                      renderResumeSection(currentResume.optimizedContent || currentResume.originalContent)
                    )}
                  </div>
                </div>
              </div>
            </div>

            <OptimizationChanges />
          </div>
        )}
      </div>
    </div>
  )
}
