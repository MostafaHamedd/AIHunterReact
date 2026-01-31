import { useState, useEffect } from 'react'
import { FileText, Upload, Save, CheckCircle2 } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { resumeService } from '@/services/resumeService'

export default function Documents() {
  const { currentResume, setCurrentResume } = useStore()
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [coverLetter, setCoverLetter] = useState('')

  useEffect(() => {
    // Load cover letter from localStorage on mount
    const savedCoverLetter = localStorage.getItem('coverLetter')
    if (savedCoverLetter) {
      setCoverLetter(savedCoverLetter)
    }
  }, [])

  const handleFileUpload = async (file: File) => {
    setIsUploading(true)
    setSaved(false)
    try {
      const resume = await resumeService.uploadResume(file)
      setCurrentResume(resume)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Error uploading resume:', error)
      alert('Failed to upload resume. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSaveCoverLetter = async () => {
    setIsSaving(true)
    try {
      // TODO: Implement cover letter save API
      // For now, just save to local state
      localStorage.setItem('coverLetter', coverLetter)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Error saving cover letter:', error)
      alert('Failed to save cover letter. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Documents</h1>
        <p className="text-gray-600">
          Manage your resume and cover letter
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resume Section */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold">Resume</h2>
            {saved && (
              <div className="ml-auto flex items-center gap-2 text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-sm font-medium">Saved</span>
              </div>
            )}
          </div>

          {currentResume ? (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">{currentResume.name}</span>
                  <span className="text-sm text-gray-500">Version {currentResume.version}</span>
                </div>
                <p className="text-sm text-gray-600">
                  Uploaded: {new Date(currentResume.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload New Resume
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload(file)
                    }}
                    className="hidden"
                    id="resume-upload"
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="resume-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {isUploading ? 'Uploading...' : 'Click to upload new resume'}
                    </span>
                    <span className="text-xs text-gray-500">PDF or DOCX</span>
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Resume
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload(file)
                  }}
                  className="hidden"
                  id="resume-upload-new"
                  disabled={isUploading}
                />
                <label
                  htmlFor="resume-upload-new"
                  className="cursor-pointer flex flex-col items-center gap-3"
                >
                  <div className="p-3 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100">
                    <Upload className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700 block">
                      {isUploading ? 'Uploading...' : 'Upload your resume'}
                    </span>
                    <span className="text-xs text-gray-500 mt-1 block">
                      PDF or DOCX format
                    </span>
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Cover Letter Section */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold">Cover Letter</h2>
            {saved && (
              <div className="ml-auto flex items-center gap-2 text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-sm font-medium">Saved</span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Letter Content
              </label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Write or paste your cover letter here..."
                className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
            </div>

            <button
              onClick={handleSaveCoverLetter}
              disabled={isSaving || !coverLetter.trim()}
              className="btn-gradient-purple w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Cover Letter
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

