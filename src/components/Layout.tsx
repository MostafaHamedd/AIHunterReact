import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FileSearch, 
  FileEdit, 
  Briefcase,
  Sparkles
} from 'lucide-react'
import { cn } from '@/utils/cn'

interface LayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Analyze Job', href: '/analyze', icon: FileSearch },
  { name: 'Resume Editor', href: '/editor', icon: FileEdit },
  { name: 'Applications', href: '/applications', icon: Briefcase },
]

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  HunterAI
                </span>
              </Link>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        'inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 font-semibold'
                          : 'text-black hover:bg-purple-50'
                      )}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}

