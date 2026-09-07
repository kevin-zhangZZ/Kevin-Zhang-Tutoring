// Shared video-walkthrough player: hides the native download button, adds a visible
// playback-speed control, and always shows a working "open on Dropbox" escape hatch
// underneath (some browsers can silently fail to decode a video track — no `error`
// event fires — so the fallback can't only appear on error).

import { useRef, useState } from 'react'

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2]

export function DropboxLink({ src, label }: { src: string; label: string }) {
  return (
    <a
      href={src.replace('&raw=1', '&dl=0')}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 text-[13px] font-medium text-sky-700 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900 rounded-xl px-4 py-2.5"
    >
      Watch {label} on Dropbox
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
        <path d="M7 17 17 7M9 7h8v8" />
      </svg>
    </a>
  )
}

export default function VideoPlayer({ src, label }: { src: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)
  const [speed, setSpeed] = useState(1)

  if (failed) return <DropboxLink src={src} label={label} />

  function setRate(rate: number) {
    setSpeed(rate)
    if (videoRef.current) videoRef.current.playbackRate = rate
  }

  return (
    <div className="flex flex-col gap-2.5 max-w-xl mx-auto">
      <video
        ref={videoRef}
        controls
        controlsList="nodownload"
        onContextMenu={e => e.preventDefault()}
        preload="metadata"
        playsInline
        className="w-full rounded-xl bg-black"
        onError={() => setFailed(true)}
      >
        <source src={src} type="video/mp4" />
      </video>

      <div className="flex items-center gap-1 flex-wrap">
        <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 mr-1">Speed</span>
        {SPEEDS.map(s => (
          <button
            key={s}
            onClick={() => setRate(s)}
            className={`text-[11.5px] font-medium px-2 py-1 rounded-md transition-colors ${
              speed === s
                ? 'bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {s}×
          </button>
        ))}
      </div>

      <a
        href={src.replace('&raw=1', '&dl=0')}
        target="_blank"
        rel="noreferrer"
        className="text-[11.5px] text-gray-400 dark:text-gray-500 hover:text-sky-700 dark:hover:text-sky-400 underline underline-offset-2 w-fit"
      >
        Video not playing? Watch it on Dropbox instead ↗
      </a>
    </div>
  )
}
