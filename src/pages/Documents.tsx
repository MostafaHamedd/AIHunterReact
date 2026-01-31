import { useState, useEffect } from 'react'
import { FileText, Upload, Save, CheckCircle2 } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { resumeService } from '@/services/resumeService'
import { coverLetterService } from '@/services/coverLetterService'

export default function Documents() {
  const { currentResume, setCurrentResume, currentCoverLetter, setCurrentCoverLetter } = useStore()
  const [isUploadingResume, setIsUploadingResume] = useState(false)
  const [isUploadingCoverLetter, setIsUploadingCoverLetter] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [savedResume, setSavedResume] = useState(false)
  const [savedCoverLetter, setSavedCoverLetter] = useState(false)
  const [coverLetterText, setCoverLetterText] = useState('')

  useEffect(() => {
    // Load cover letter text from current cover letter if available
    if (currentCoverLetter) {
      setCoverLetterText(currentCoverLetter.originalContent)
    } else {
      // Fallback to localStorage
      const savedCoverLetter = localStorage.getItem('coverLetter')
      if (savedCoverLetter) {
        setCoverLetterText(savedCoverLetter)
      }
    }
  }, [currentCoverLetter])

  const handleResumeUpload = async (file: File) => {
    setIsUploadingResume(true)
    setSavedResume(false)
    try {
      const resume = await resumeService.uploadResume(file)
      setCurrentResume(resume)
      setSavedResume(true)
      setTimeout(() => setSavedResume(false), 3000)
    } catch (error) {
      console.error('Error uploading resume:', error)
      alert('Failed to upload resume. Please try again.')
    } finally {
      setIsUploadingResume(false)
    }
  }

  const handleCoverLetterUpload = async (file: File) => {
    setIsUploadingCoverLetter(true)
    setSavedCoverLetter(false)
    try {
      const coverLetter = await coverLetterService.uploadCoverLetter(file)
      setCurrentCoverLetter(coverLetter)
      setCoverLetterText(coverLetter.originalContent)
      setSavedCoverLetter(true)
      setTimeout(() => setSavedCoverLetter(false), 3000)
    } catch (error) {
      console.error('Error uploading cover letter:', error)
      alert('Failed to upload cover letter. Please try again.')
    } finally {
      setIsUploadingCoverLetter(false)
    }
  }

  const handleSaveCoverLetterText = async () => {
    setIsSaving(true)
    try {
      // Save to localStorage as fallback
      localStorage.setItem('coverLetter', coverLetterText)
      
      // If we have a current cover letter, update it
      if (currentCoverLetter) {
        const updated = {
          ...currentCoverLetter,
          originalContent: coverLetterText,
          optimizedContent: coverLetterText,
        }
        setCurrentCoverLetter(updated)
      }
      
      setSavedCoverLetter(true)
      setTimeout(() => setSavedCoverLetter(false), 3000)
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
            {savedResume && (
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
                      if (file) handleResumeUpload(file)
                    }}
                    className="hidden"
                    id="resume-upload"
                    disabled={isUploadingResume}
                  />
                  <label
                    htmlFor="resume-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {isUploadingResume ? 'Uploading...' : 'Click to upload new resume'}
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
                    if (file) handleResumeUpload(file)
                  }}
                  className="hidden"
                  id="resume-upload-new"
                  disabled={isUploadingResume}
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
                      {isUploadingResume ? 'Uploading...' : 'Upload your resume'}
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
            {savedCoverLetter && (
              <div className="ml-auto flex items-center gap-2 text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-sm font-medium">Saved</span>
              </div>
            )}
          </div>

          {currentCoverLetter ? (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">{currentCoverLetter.name}</span>
                  <span className="text-sm text-gray-500">Version {currentCoverLetter.version}</span>
                </div>
                <p className="text-sm text-gray-600">
                  Uploaded: {new Date(currentCoverLetter.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload New Cover Letter
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleCoverLetterUpload(file)
                    }}
                    className="hidden"
                    id="cover-letter-upload"
                    disabled={isUploadingCoverLetter}
                  />
                  <label
                    htmlFor="cover-letter-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {isUploadingCoverLetter ? 'Uploading...' : 'Click to upload new cover letter'}
                    </span>
                    <span className="text-xs text-gray-500">PDF, DOCX, or TXT</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Edit Cover Letter Content
                </label>
                <textarea
                  value={coverLetterText}
                  onChange={(e) => setCoverLetterText(e.target.value)}
                  placeholder="Edit your cover letter here..."
                  className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
                <button
                  onClick={handleSaveCoverLetterText}
                  disabled={isSaving || !coverLetterText.trim()}
                  className="btn-gradient-purple w-full mt-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Cover Letter File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleCoverLetterUpload(file)
                    }}
                    className="hidden"
                    id="cover-letter-upload-new"
                    disabled={isUploadingCoverLetter}
                  />
                  <label
                    htmlFor="cover-letter-upload-new"
                    className="cursor-pointer flex flex-col items-center gap-3"
                  >
                    <div className="p-3 rounded-full bg-gradient-to-br from-indigo-100 to-pink-100">
                      <Upload className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700 block">
                        {isUploadingCoverLetter ? 'Uploading...' : 'Upload your cover letter'}
                      </span>
                      <span className="text-xs text-gray-500 mt-1 block">
                        PDF, DOCX, or TXT format
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Or Write Cover Letter
                </label>
                <textarea
                  value={coverLetterText}
                  onChange={(e) => setCoverLetterText(e.target.value)}
                  placeholder="Write or paste your cover letter here..."
                  className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
                <button
                  onClick={handleSaveCoverLetterText}
                  disabled={isSaving || !coverLetterText.trim()}
                  className="btn-gradient-purple w-full mt-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
          )}
        </div>
      </div>
    </div>
  )
}
