import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Link as LinkIcon } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { useState } from 'react'
import type { ApplicationStatus } from '@/types'
import { cn } from '@/utils/cn'

export default function ApplicationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { applications, updateApplication } = useStore()
  const [newNote, setNewNote] = useState('')

  const application = applications.find((app) => app.id === id)

  if (!application) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Application not found</p>
        <button onClick={() => navigate('/applications')} className="btn-gradient">
          Back to Applications
        </button>
      </div>
    )
  }

  const handleStatusChange = (newStatus: ApplicationStatus) => {
    updateApplication(application.id, {
      status: newStatus,
      applicationDate: newStatus === 'applied' && !application.applicationDate
        ? new Date()
        : application.applicationDate,
      timeline: [
        ...application.timeline,
        {
          id: Date.now().toString(),
          type: 'status_change',
          title: `Status changed to ${newStatus.replace('_', ' ')}`,
          description: `Application status updated`,
          date: new Date(),
        },
      ],
    })
  }

  const handleAddNote = () => {
    if (!newNote.trim()) return

    const note = {
      id: Date.now().toString(),
      content: newNote,
      createdAt: new Date(),
    }

    updateApplication(application.id, {
      notes: [...application.notes, note],
      timeline: [
        ...application.timeline,
        {
          id: (Date.now() + 1).toString(),
          type: 'note',
          title: 'Note added',
          description: newNote,
          date: new Date(),
        },
      ],
    })

    setNewNote('')
  }

  const statusOptions: ApplicationStatus[] = [
    'not_applied',
    'applied',
    'interview',
    'offer',
    'rejected',
  ]

  return (
    <div className="space-y-8">
      <button
        onClick={() => navigate('/applications')}
        className="flex items-center gap-2 text-gray-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Applications
      </button>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{application.role}</h1>
          <p className="text-xl text-gray-600">{application.company}</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'px-3 py-1 rounded-md text-sm font-medium',
              application.status === 'offer'
                ? 'bg-green-100'
                : application.status === 'interview'
                ? 'bg-yellow-100'
                : application.status === 'rejected'
                ? 'bg-red-100'
                : application.status === 'applied'
                ? 'bg-blue-100'
                : 'bg-gray-100'
            )}
          >
            {application.status.replace('_', ' ')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Details</h2>
            <div className="space-y-4">
              {application.jobLink && (
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4 text-gray-400" />
                  <a
                    href={application.jobLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    View Job Posting
                  </a>
                </div>
              )}
              {application.applicationDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">
                    Applied: {new Date(application.applicationDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Timeline</h2>
            </div>
            <div className="space-y-4">
              {application.timeline.map((event) => (
                <div key={event.id} className="flex gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary-600 mt-2" />
                  <div className="flex-1">
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-gray-600">
                      {event.description}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(event.date).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Notes</h2>
            <div className="space-y-4">
              {application.notes.map((note) => (
                <div key={note.id} className="p-3 bg-gray-50">
                  <p className="text-gray-700">{note.content}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(note.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
                  placeholder="Add a note..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-black"
                />
                <button onClick={handleAddNote} className="btn-gradient-green">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Update Status</h2>
            <div className="space-y-2">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={cn(
                    'w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    application.status === status
                      ? 'bg-primary-100'
                      : 'bg-gray-100'
                  )}
                >
                  {status.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

