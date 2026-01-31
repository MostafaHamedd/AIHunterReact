import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Plus, 
  Filter, 
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  FileText
} from 'lucide-react'
import { useStore } from '@/store/useStore'
import type { ApplicationStatus } from '@/types'
import { cn } from '@/utils/cn'

export default function Applications() {
  const { applications } = useStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>('all')

  const filteredApplications = applications.filter((app) => {
    const matchesSearch = 
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusOptions: { value: ApplicationStatus | 'all'; label: string; icon: any }[] = [
    { value: 'not_applied', label: 'Not Applied', icon: FileText },
    { value: 'applied', label: 'Applied', icon: Clock },
    { value: 'interview', label: 'Interview', icon: Clock },
    { value: 'offer', label: 'Offer', icon: CheckCircle2 },
    { value: 'rejected', label: 'Rejected', icon: XCircle },
  ]

  const getStatusBadge = (status: ApplicationStatus) => {
    const config = {
      not_applied: { bg: 'bg-gray-100', text: 'text-gray-800' },
      applied: { bg: 'bg-blue-100', text: 'text-blue-800' },
      interview: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      offer: { bg: 'bg-green-100', text: 'text-green-800' },
      rejected: { bg: 'bg-red-100', text: 'text-red-800' },
    }
    const style = config[status]
    return (
      <span className={cn('px-2 py-1 rounded-md text-xs font-medium', style.bg, style.text)}>
        {status.replace('_', ' ')}
      </span>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Applications</h1>
          <p className="text-gray-600">
            Track all your job applications in one place
          </p>
        </div>
        <Link to="/analyze" className="btn-gradient-purple flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Application
        </Link>
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by company or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-black"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-black"
            >
              <option value="all">All Status</option>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredApplications.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">
              {applications.length === 0
                ? 'No applications yet. Start by analyzing a job description!'
                : 'No applications match your filters.'}
            </p>
            {applications.length === 0 && (
              <Link to="/analyze" className="btn-gradient-purple inline-flex items-center gap-2 mt-4">
                <Plus className="h-4 w-4" />
                Analyze Job Description
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Company
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Role
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Applied Date
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b border-gray-100"
                  >
                    <td className="py-3 px-4">
                      <div className="font-medium">{app.company}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-gray-600">{app.role}</div>
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(app.status)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-600">
                        {app.applicationDate
                          ? new Date(app.applicationDate).toLocaleDateString()
                          : '-'}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        to={`/applications/${app.id}`}
                        className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

