import { FileText, Eye } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { useState } from 'react'
import { cn } from '@/utils/cn'

export default function ResumePreview() {
  const { currentResume } = useStore()
  const [viewMode, setViewMode] = useState<'original' | 'optimized' | 'side-by-side'>('side-by-side')

  // Debug logging
  if (currentResume) {
    console.log('ResumePreview - Current Resume:', currentResume)
    console.log('ResumePreview - Original Content:', currentResume.originalContent)
    console.log('ResumePreview - Optimized Content:', currentResume.optimizedContent)
  }

  if (!currentResume) {
    return (
      <div className="card">
        <p className="text-gray-500">
          Upload a resume to see preview
        </p>
      </div>
    )
  }

  const renderResumeSection = (content: typeof currentResume.originalContent, label: string) => {
    console.log(`Rendering ${label} section:`, content)
    
    if (!content) {
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold">{label}</h3>
          </div>
          <p className="text-gray-500">No content available</p>
        </div>
      )
    }
    
    // Log detailed content
    console.log(`${label} - Summary:`, content.summary)
    console.log(`${label} - Experience count:`, content.experience?.length)
    console.log(`${label} - Skills count:`, content.skills?.length)
    console.log(`${label} - Projects count:`, content.projects?.length)

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500">
            <FileText className="h-4 w-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold">{label}</h3>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">Summary</h4>
            <p className="text-gray-700">{content.summary || 'No summary available'}</p>
          </div>

        <div>
          <h4 className="font-medium mb-2">Experience</h4>
          {content.experience && content.experience.length > 0 ? (
            content.experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="font-semibold">{exp.role || 'N/A'}</div>
                <div className="text-sm text-gray-600">
                  {exp.company || 'N/A'} • {exp.duration || 'N/A'}
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="text-gray-700">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No experience listed</p>
          )}
        </div>

        <div>
          <h4 className="font-medium mb-2">Skills</h4>
          {content.skills && content.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {content.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-100 rounded text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No skills listed</p>
          )}
        </div>

        <div>
          <h4 className="font-medium mb-2">Projects</h4>
          {content.projects && content.projects.length > 0 ? (
            content.projects.map((project) => (
              <div key={project.id} className="mb-4">
                <div className="font-semibold">{project.name || 'Unnamed Project'}</div>
                <p className="text-gray-700">{project.description || 'No description'}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No projects listed</p>
          )}
        </div>
      </div>
    </div>
  )
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500">
            <Eye className="h-4 w-4 text-white" />
          </div>
          <h2 className="text-xl font-semibold">Resume Preview</h2>
          {currentResume && (
            <span className="text-sm text-gray-500">({currentResume.name})</span>
          )}
        </div>
        <div className="flex gap-2">
          {['original', 'optimized', 'side-by-side'].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode as typeof viewMode)}
              className={cn(
                'px-3 py-1 rounded-md text-sm font-medium transition-colors',
                viewMode === mode
                  ? 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 font-semibold'
                  : 'bg-gray-100 text-black'
              )}
            >
              {mode.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div
        className={cn(
          'grid gap-6',
          viewMode === 'side-by-side' ? 'grid-cols-2' : 'grid-cols-1'
        )}
      >
        {viewMode === 'original' || viewMode === 'side-by-side' ? (
          <div className="bg-gray-50 p-6 rounded-lg">
            {renderResumeSection(currentResume.originalContent || {
              summary: '',
              experience: [],
              skills: [],
              projects: []
            }, 'Original')}
          </div>
        ) : null}
        {viewMode === 'optimized' || viewMode === 'side-by-side' ? (
          <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 p-6 rounded-lg">
            {renderResumeSection(currentResume.optimizedContent || currentResume.originalContent || {
              summary: '',
              experience: [],
              skills: [],
              projects: []
            }, 'Optimized')}
          </div>
        ) : null}
      </div>
    </div>
  )
}

