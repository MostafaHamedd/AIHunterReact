import { useState } from 'react'
import { Send, Bot, User } from 'lucide-react'
import { useStore } from '@/store/useStore'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export default function AIEditor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! I can help you optimize your resume. Try asking me to "Optimize for backend roles" or "Rewrite this for a junior position".',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { currentResume, setCurrentResume } = useStore()

  const handleSend = async () => {
    if (!input.trim() || !currentResume) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Mock AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I've updated your resume based on your request. The changes have been applied to the optimized version. You can see them in the preview panel.`,
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)

      // Mock updating resume (in real app, this would call an API)
      if (currentResume) {
        const updatedResume = {
          ...currentResume,
          optimizedContent: {
            ...currentResume.optimizedContent,
            summary: (currentResume.optimizedContent?.summary || currentResume.originalContent?.summary || '') + ' [Updated by AI]',
            experience: currentResume.optimizedContent?.experience || currentResume.originalContent?.experience || [],
            skills: currentResume.optimizedContent?.skills || currentResume.originalContent?.skills || [],
            projects: currentResume.optimizedContent?.projects || currentResume.originalContent?.projects || [],
          },
        }
        setCurrentResume(updatedResume)
      }
    }, 1500)
  }

  if (!currentResume) {
    return (
      <div className="card">
        <p className="text-gray-500">
          Upload a resume to use the AI editor
        </p>
      </div>
    )
  }

  return (
    <div className="card flex flex-col h-[600px]">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500">
          <Bot className="h-4 w-4 text-white" />
        </div>
        <h2 className="text-xl font-semibold">AI Resume Editor</h2>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.role === 'assistant' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl p-3 ${
                message.role === 'user'
                  ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white'
                  : 'bg-gray-100 text-black'
              }`}
            >
              {message.content}
            </div>
            {message.role === 'user' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200">
                <User className="h-4 w-4 text-gray-600" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="bg-gray-100 rounded-2xl p-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isLoading && input.trim() && handleSend()}
          placeholder="Ask me to optimize your resume..."
          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black shadow-sm"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className={`absolute right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            input.trim() && !isLoading
              ? 'bg-gradient-to-br from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg cursor-pointer'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  )
}

