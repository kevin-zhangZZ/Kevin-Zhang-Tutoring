import { useRef, useState, type ReactNode } from 'react'
import wechatQr from './wechat-qr.png'

const EMAIL = 'zhizhuo.kevin.zhang@gmail.com'
const WECHAT_ID = 'zzzk617'

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

// A value shown as selectable text with a Copy button. If the clipboard is blocked, the text is
// selected instead so it can be copied by hand.
function CopyField({ value, children, boxed, button, minText = '' }: { value: string; children: ReactNode; boxed: boolean; button: string; minText?: string }) {
  const [copied, setCopied] = useState(false)
  const textRef = useRef<HTMLSpanElement>(null)

  function selectText() {
    const el = textRef.current
    if (!el) return
    const range = document.createRange()
    range.selectNodeContents(el)
    const sel = window.getSelection()
    sel?.removeAllRanges()
    sel?.addRange(range)
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      selectText()
    }
  }

  return (
    // If the value can't sit beside the button at its full width, the button wraps below it.
    <div className="flex flex-wrap items-center gap-2">
      <span
        ref={textRef}
        className={`flex-1 ${minText || 'min-w-0'} select-all [overflow-wrap:anywhere] font-medium text-[14px] text-gray-800 dark:text-gray-100 ${
          boxed ? 'px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60' : ''
        }`}
      >
        {children}
      </span>
      <button
        onClick={copy}
        className={`flex-none text-white text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors ${button}`}
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}

// Many school laptops and Chromebooks have no mail app set up, so a mailto: link alone can do
// nothing — the address comes first, with the link as a smaller option.
function EmailCopy({ boxed }: { boxed: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <CopyField value={EMAIL} boxed={boxed} button="bg-blue-600 hover:bg-blue-700" minText={boxed ? 'min-w-[240px]' : 'min-w-0'}>
        {/* If it has to wrap on a narrow phone, it wraps after the @. */}
        {EMAIL.split('@')[0]}@<wbr />{EMAIL.split('@')[1]}
      </CopyField>
      <a href={`mailto:${EMAIL}`} className="text-[13px] font-medium text-blue-700 dark:text-blue-400 hover:underline underline-offset-2 w-fit">
        Open in email app →
      </a>
    </div>
  )
}

function WeChatIdCopy({ boxed }: { boxed: boolean }) {
  return (
    <CopyField value={WECHAT_ID} boxed={boxed} button="bg-emerald-600 hover:bg-emerald-700">
      <span className="font-mono">{WECHAT_ID}</span>
    </CopyField>
  )
}

export default function ContactMe() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-6 py-10">
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">
        Contact Me
      </h1>
      <p className="text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
        Reach out any time — happy to answer questions about tutoring or these tools.
      </p>

      {/* Desktop / tablet: split panel (email left, WeChat right) */}
      <div className="hidden md:flex rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="flex-1 p-8 flex flex-col justify-center gap-3.5">
          <div className="flex items-center gap-2.5 text-gray-900 dark:text-white">
            <EmailIcon className="text-blue-600 dark:text-blue-400" />
            <span className="text-[15px] font-semibold">Email</span>
          </div>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">
            Best for detailed questions — I read every message and usually reply within a day.
          </p>
          <EmailCopy boxed />
        </div>
        <div className="w-px bg-gray-200 dark:bg-gray-800" />
        <div className="flex-1 p-8 flex flex-col items-center justify-center gap-3.5 bg-gray-50 dark:bg-gray-950/40">
          <div className="flex items-center gap-2.5 text-gray-900 dark:text-white">
            <WeChatIcon className="text-emerald-500" />
            <span className="text-[15px] font-semibold">WeChat</span>
          </div>
          <img src={wechatQr} alt="WeChat QR code" className="w-36 h-36 rounded-lg border border-gray-200 dark:border-gray-700" />
          <p className="text-xs text-gray-400 dark:text-gray-500">Scan with WeChat to add me, or search my ID:</p>
          <div className="w-full max-w-[220px]">
            <WeChatIdCopy boxed />
          </div>
        </div>
      </div>

      {/* Mobile: you can't scan a code on your own screen, so the WeChat ID comes first, and the
          QR is something to save and open from WeChat's scanner; email gets a Copy button. */}
      <div className="md:hidden flex flex-col gap-4">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <div className="flex items-center gap-2 text-gray-900 dark:text-white">
            <WeChatIcon className="text-emerald-500 w-[18px] h-[18px]" />
            <span className="text-[15px] font-semibold">WeChat</span>
          </div>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-1 mb-2">Search for my WeChat ID:</p>
          <WeChatIdCopy boxed />
          <div className="flex gap-4 items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <img src={wechatQr} alt="WeChat QR code — press and hold to save it" className="w-24 h-24 flex-none rounded-lg border border-gray-200 dark:border-gray-700" />
            <p className="text-[13px] text-gray-600 dark:text-gray-300 leading-relaxed">
              Or save this code to your photos (press and hold it, or use the button). Then in WeChat, tap
              {' '}<b className="text-gray-800 dark:text-gray-100">+ → Scan</b> and choose it from your album.
            </p>
          </div>
          <a
            href={wechatQr}
            download="kevin-zhang-wechat-qr.png"
            className="mt-3 block text-center text-[13px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 hover:bg-emerald-100 dark:hover:bg-emerald-950/70 rounded-lg py-2.5 transition-colors"
          >
            Save QR code
          </a>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <div className="flex items-center gap-2 text-gray-900 dark:text-white">
            <EmailIcon className="text-blue-600 dark:text-blue-400 w-[18px] h-[18px]" />
            <span className="text-[15px] font-semibold">Email</span>
          </div>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-1 mb-3">I usually reply within a day.</p>
          <EmailCopy boxed={false} />
        </div>
      </div>
    </div>
  )
}
