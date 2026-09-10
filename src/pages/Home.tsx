import { useNavigate } from 'react-router-dom'
import { tools } from '../tools/registry'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          VCE Tools
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl">
          Free interactive resources from Kevin Zhang Tutoring
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map(tool => (
          <button
            key={tool.id}
            onClick={() => navigate(tool.route)}
            className="group text-left p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md dark:hover:shadow-none transition-all duration-200"
          >
            <div className="text-3xl mb-4 leading-none">{tool.icon}</div>
            <h2 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {tool.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {tool.description}
            </p>
            <div className="mt-4 text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Open tool
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
