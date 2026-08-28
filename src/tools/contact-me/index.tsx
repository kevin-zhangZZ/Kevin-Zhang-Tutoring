import wechatQr from './wechat-qr.png'

const EMAIL = 'zhizhuo.kevin.zhang@gmail.com'

function EmailIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  )
}

function WeChatIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 12.5c-3.3 0-6-2.2-6-5S4.7 2.5 8 2.5s6 2.2 6 5c0 .9-.3 1.7-.8 2.5" />
      <circle cx="5.7" cy="6.7" r=".2" fill="currentColor" stroke="none" />
      <circle cx="10.3" cy="6.7" r=".2" fill="currentColor" stroke="none" />
      <path d="M13 21.5c3 0 5.5-2 5.5-4.5s-2.5-4.5-5.5-4.5-5.5 2-5.5 4.5c0 .8.25 1.55.7 2.2L7.5 21l2.1-1a6.3 6.3 0 0 0 3.4 1" />
      <circle cx="11" cy="16.7" r=".2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="16.7" r=".2" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function ContactMe() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">
        Contact Me
      </h1>
      <p className="text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
        Reach out any time — happy to answer questions about tutoring or these tools.
      </p>

      {/* Desktop / tablet: split panel (email left, WeChat QR right) */}
      <div className="hidden md:flex rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="flex-1 p-8 flex flex-col justify-center gap-3.5">
          <div className="flex items-center gap-2.5 text-gray-900 dark:text-white">
            <EmailIcon className="text-blue-600 dark:text-blue-400" />
            <span className="text-[15px] font-semibold">Email</span>
          </div>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">
            Best for detailed questions — I read every message and usually reply within a day.
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-1 inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold px-4 py-2.5 rounded-lg transition-colors w-fit"
          >
            {EMAIL}
          </a>
        </div>
        <div className="w-px bg-gray-200 dark:bg-gray-800" />
        <div className="flex-1 p-8 flex flex-col items-center justify-center gap-3.5 bg-gray-50 dark:bg-gray-950/40">
          <div className="flex items-center gap-2.5 text-gray-900 dark:text-white">
            <WeChatIcon className="text-emerald-500" />
            <span className="text-[15px] font-semibold">WeChat</span>
          </div>
          <img src={wechatQr} alt="WeChat QR code" className="w-36 h-36 rounded-lg border border-gray-200 dark:border-gray-700" />
          <p className="text-xs text-gray-400 dark:text-gray-500">Scan to add me</p>
        </div>
      </div>

      {/* Mobile: QR hero, email as secondary link below */}
      <div className="md:hidden flex flex-col items-center text-center">
        <div className="w-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-7 flex flex-col items-center">
          <img src={wechatQr} alt="WeChat QR code" className="w-48 h-48 rounded-xl border border-gray-200 dark:border-gray-700" />
          <div className="flex items-center gap-1.5 mt-4 text-emerald-500">
            <WeChatIcon className="w-[18px] h-[18px]" />
            <span className="text-[13px] font-semibold">Scan to add me on WeChat</span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full my-6">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
          <span className="text-xs text-gray-400 dark:text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
        </div>

        <a
          href={`mailto:${EMAIL}`}
          className="inline-flex items-center gap-2 text-[14px] font-medium text-gray-700 dark:text-gray-200"
        >
          <EmailIcon className="text-gray-400 dark:text-gray-500" />
          {EMAIL}
        </a>
      </div>
    </div>
  )
}
