import { Link } from 'react-router-dom'
import { 
  FileSearch, 
  FileEdit, 
  Briefcase, 
  TrendingUp,
  CheckCircle2,
  Clock,
  XCircle
} from 'lucide-react'
import { useStore } from '@/store/useStore'

export default function Dashboard() {
  const { applications } = useStore()

  const stats = {
    total: applications.length,
    applied: applications.filter(app => app.status === 'applied').length,
    interview: applications.filter(app => app.status === 'interview').length,
    offer: applications.filter(app => app.status === 'offer').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
  }

  const responseRate = stats.total > 0 
    ? ((stats.interview + stats.offer) / stats.total * 100).toFixed(1)
    : '0'

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Track your job applications and optimize your resume
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold mt-1">{stats.total}</p>
            </div>
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Response Rate</p>
              <p className="text-2xl font-bold mt-1">{responseRate}%</p>
            </div>
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Interviews</p>
              <p className="text-2xl font-bold mt-1">{stats.interview}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Offers</p>
              <p className="text-2xl font-bold mt-1">{stats.offer}</p>
            </div>
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/analyze"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg bg-gradient-to-r from-blue-50 to-primary-50 hover:from-blue-100 hover:to-primary-100 transition-all shadow-sm hover:shadow-md"
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary-500 to-blue-500">
                <FileSearch className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-medium">Analyze Job Description</div>
                <div className="text-sm text-gray-600">
                  Extract keywords and requirements
                </div>
              </div>
            </Link>

            <Link
              to="/editor"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all shadow-sm hover:shadow-md"
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                <FileEdit className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-medium">Edit Resume</div>
                <div className="text-sm text-gray-600">
                  Optimize with AI assistance
                </div>
              </div>
            </Link>

            <Link
              to="/applications"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all shadow-sm hover:shadow-md"
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-medium">View Applications</div>
                <div className="text-sm text-gray-600">
                  Track all your applications
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Recent Applications</h2>
          {applications.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No applications yet. Start by analyzing a job description!
            </p>
          ) : (
            <div className="space-y-3">
              {applications.slice(0, 5).map((app) => (
                <Link
                  key={app.id}
                  to={`/applications/${app.id}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{app.role}</div>
                      <div className="text-sm text-gray-600">
                        {app.company}
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        app.status === 'offer'
                          ? 'bg-green-100 text-green-800'
                          : app.status === 'interview'
                          ? 'bg-yellow-100 text-yellow-800'
                          : app.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {app.status.replace('_', ' ')}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

