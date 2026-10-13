import { useRef, useState, type ReactNode } from 'react'
import wechatQr from './wechat-qr.png'
import { stagger } from '../../components/motion/Reveal'

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

// A value in a field with its Copy button inside it, at the right. If the clipboard is blocked,
// the text is selected instead so it can be copied by hand.
function CopyField({ value, children, big = false }: { value: string; children: ReactNode; big?: boolean }) {
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
    <div className="flex items-center gap-2 rounded-xl border p-1.5 pl-4 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
      <span
        ref={textRef}
        className={`flex-1 min-w-0 select-all [overflow-wrap:anywhere] ${big ? 'font-display font-bold tracking-tight text-lg xl:text-xl py-1' : 'font-medium text-[15px]'} text-gray-800 dark:text-gray-100`}
      >
        {children}
      </span>
      <button
        onClick={copy}
        aria-label={copied ? 'Copied' : `Copy ${value}`}
        className="flex-none min-w-[5rem] rounded-lg bg-blue-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-blue-700 active:scale-[0.97] transition-[background-color,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        {copied ? <span key="done" className="pop inline-block">Copied ✓</span> : 'Copy'}
      </button>
    </div>
  )
}

// Many school laptops and Chromebooks have no mail app set up, so a mailto: link alone can do
// nothing. The address comes first, with the link as a smaller option.
function EmailCopy({ big = false }: { big?: boolean }) {
  return (
    <div className="flex flex-col gap-2.5 [@media(pointer:coarse)]:gap-3">
      <CopyField value={EMAIL} big={big}>
        {/* If it has to wrap on a narrow phone, it wraps after the @. */}
        {EMAIL.split('@')[0]}@<wbr />{EMAIL.split('@')[1]}
      </CopyField>
      <a href={`mailto:${EMAIL}`} className="relative text-[13px] font-medium text-blue-700 dark:text-blue-400 hover:underline underline-offset-2 w-fit after:absolute after:-inset-y-1 after:-inset-x-1 [@media(pointer:coarse)]:after:-inset-y-3">
        Open in email app →
      </a>
    </div>
  )
}

function WeChatIdCopy() {
  return (
    <CopyField value={WECHAT_ID}>
      <span className="font-mono">{WECHAT_ID}</span>
    </CopyField>
  )
}

// The channel's icon in a tile, then its name. WeChat's icon keeps its own green as a brand mark;
// everything clickable on the page is the site's blue.
function ChannelHeading({ icon, tile, children }: { icon: ReactNode; tile: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`grid place-items-center shrink-0 size-11 rounded-xl ${tile}`}>{icon}</span>
      <h2 className="font-display text-xl font-bold tracking-tight text-gray-900 dark:text-white">{children}</h2>
    </div>
  )
}

const emailHeading = (
  <ChannelHeading icon={<EmailIcon />} tile="bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300">Email</ChannelHeading>
)
const weChatHeading = (
  <ChannelHeading icon={<WeChatIcon />} tile="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">WeChat</ChannelHeading>
)

// Both channels share one card style.
const PAPER = 'rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800'

export default function ContactMe() {
  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 md:py-14 xl:py-16">
      <div className="lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14 xl:gap-20 lg:items-start">
        {/* The pitch: who's answering and how fast. */}
        <div className="lg:sticky lg:top-16">
          <p className="rise-in text-sm font-semibold text-blue-700 dark:text-blue-300 mb-3" style={stagger(0)}>Contact Me</p>
          <h1 className="rise-in font-display text-[2.4rem] leading-[1.05] sm:text-5xl xl:text-[3.6rem] font-bold text-gray-900 dark:text-white tracking-[-0.035em] text-balance" style={stagger(1)}>
            Ask me about tutoring.
          </h1>
          <p className="rise-in mt-5 text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-[38ch]" style={stagger(2)}>
            Send me an email or add me on WeChat. I read every message and usually reply within a day.
          </p>
        </div>

        {/* Desktop / tablet: the two ways in, as two cards. */}
        <div className="hidden md:flex flex-col gap-5 mt-10 lg:mt-0">
          <section className={`rise-in ${PAPER} p-8 xl:p-10`} style={stagger(3)}>
            {emailHeading}
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Best for detailed questions.</p>
            <div className="mt-6"><EmailCopy big /></div>
          </section>

          <section className={`rise-in ${PAPER} p-8 xl:p-10 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-8`} style={stagger(4)}>
            <div className="rounded-2xl bg-white p-3 border border-gray-200 dark:border-gray-700">
              <img src={wechatQr} alt="WeChat QR code" className="w-40 h-40 xl:w-44 xl:h-44" />
            </div>
            <div className="min-w-0">
              {weChatHeading}
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Scan the code with WeChat to add me, or search for my ID.</p>
              <div className="mt-5"><WeChatIdCopy /></div>
            </div>
          </section>
        </div>
      </div>

      {/* Mobile: you can't scan a code on your own screen, so the WeChat ID comes first, and the
          QR is something to save and open from WeChat's scanner. */}
      <div className="md:hidden flex flex-col gap-4 mt-8">
        <section className={`rise-in ${PAPER} p-5`} style={stagger(3)}>
          {weChatHeading}
          <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-3 mb-2">Search for my WeChat ID:</p>
          <WeChatIdCopy />
          <div className="flex gap-4 items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <img src={wechatQr} alt="WeChat QR code. Press and hold to save it." className="w-24 h-24 flex-none rounded-xl bg-white p-1.5 border border-gray-200 dark:border-gray-700" />
            <p className="text-[13px] text-gray-600 dark:text-gray-300 leading-relaxed">
              Or save this code to your photos (press and hold it, or use the button). Then in WeChat, tap
              {' '}<b className="text-gray-800 dark:text-gray-100">+ → Scan</b> and choose it from your album.
            </p>
          </div>
          <a
            href={wechatQr}
            download="kevin-zhang-wechat-qr.png"
            className="mt-4 block text-center text-[13px] font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-950 rounded-xl py-3 active:scale-[0.98] transition-[background-color,transform]"
          >
            Save QR code
          </a>
        </section>

        <section className={`rise-in ${PAPER} p-5`} style={stagger(4)}>
          {emailHeading}
          <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-3 mb-2">I usually reply within a day.</p>
          <EmailCopy />
        </section>
      </div>
    </div>
  )
}
