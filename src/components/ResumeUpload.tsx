import { useState, useRef } from 'react'
import { Upload, AlertCircle } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { resumeService } from '@/services/resumeService'

export default function ResumeUpload() {
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { setCurrentResume, addResume } = useStore()

  const handleFile = async (file: File) => {
    if (!file.type.includes('pdf') && !file.name.endsWith('.docx')) {
      alert('Please upload a PDF or DOCX file')
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      console.log('Uploading resume to backend...', file.name, file.size, 'bytes')
      const resume = await resumeService.uploadResume(file)
      console.log('Resume uploaded successfully:', resume)
      
      // Validate resume data
      if (!resume.originalContent) {
        throw new Error('Resume data is missing original content')
      }
      
      setCurrentResume(resume)
      addResume(resume)
      console.log('Resume stored in state successfully')
    } catch (error: any) {
      console.error('Error uploading resume:', error)
      const errorMessage = error?.message || 'Unknown error'
      setError(`Failed to upload resume: ${errorMessage}. ${error?.status ? `Status: ${error.status}` : 'Please check if the backend is running on http://localhost:8080'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Upload Resume</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-red-800 font-medium">Upload Failed</p>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      )}
      
      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-indigo-50'
            : 'border-gray-300'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileInput}
          className="hidden"
        />
        
        <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <p className="text-lg font-medium mb-2">
          Drag and drop your resume here
        </p>
        <p className="text-sm text-gray-500">
          or click to browse (PDF or DOCX)
        </p>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          className="btn-gradient disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? 'Processing...' : 'Select File'}
        </button>
      </div>
    </div>
  )
}

