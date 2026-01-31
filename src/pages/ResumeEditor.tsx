import ResumePreview from '@/components/ResumePreview'
import AIEditor from '@/components/AIEditor'
import { useStore } from '@/store/useStore'
import ResumeUpload from '@/components/ResumeUpload'

export default function ResumeEditor() {
  const { currentResume } = useStore()

  // Debug logging
  console.log('ResumeEditor - Current Resume:', currentResume)
  console.log('ResumeEditor - Has Resume:', !!currentResume)
  if (currentResume) {
    console.log('ResumeEditor - Resume ID:', currentResume.id)
    console.log('ResumeEditor - Resume Name:', currentResume.name)
    console.log('ResumeEditor - Has Original Content:', !!currentResume.originalContent)
    console.log('ResumeEditor - Has Optimized Content:', !!currentResume.optimizedContent)
  }

  // Ensure resume has proper structure
  const hasValidResume = currentResume && 
    currentResume.originalContent && 
    (currentResume.optimizedContent || currentResume.originalContent)
  
  console.log('ResumeEditor - Has Valid Resume:', hasValidResume)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Resume Editor</h1>
        <p className="text-gray-600">
          Edit and optimize your resume with AI assistance
        </p>
      </div>

      {!currentResume && (
        <div className="max-w-2xl">
          <ResumeUpload />
        </div>
      )}

      {currentResume && !hasValidResume && (
        <div className="card bg-yellow-50 border-yellow-200">
          <p className="text-yellow-800 font-medium mb-2">
            Resume data is incomplete or invalid.
          </p>
          <p className="text-sm text-yellow-700 mb-4">
            Current resume ID: {currentResume.id}, Name: {currentResume.name}
          </p>
          <details className="text-sm text-yellow-700 mb-4">
            <summary className="cursor-pointer font-medium">Debug Info</summary>
            <pre className="mt-2 text-xs bg-yellow-100 p-2 rounded overflow-auto">
              {JSON.stringify(currentResume, null, 2)}
            </pre>
          </details>
          <div className="mt-4">
            <ResumeUpload />
          </div>
        </div>
      )}

      {hasValidResume && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ResumePreview />
          </div>
          <div>
            <AIEditor />
          </div>
        </div>
      )}
    </div>
  )
}

