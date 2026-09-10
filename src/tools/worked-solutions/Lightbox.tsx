// Click-to-enlarge viewer for worked-solution diagrams (chosen UI: gallery lightbox +
// zoom-from-click-origin morph — see the design options presented and picked in chat).
//
// Usage: wrap a region in <DiagramScope> (MCQShell does this once around its whole
// rendered content) and every <img> inside becomes clickable — no individual question
// file needs to change. Clicking one image "morphs" it from its on-page position into a
// centred box over a blurred, darkened backdrop (a FLIP transition, no library). Every
// other <img> that was inside the same scope at click time becomes a gallery you can page
// through with the prev/next buttons, the filmstrip, or the ←/→ keys — this is what makes
// a stem diagram plus a per-option A–E crop (e.g. Methods 2021 MCQ8, 2025 MCQ13/17)
// browsable without closing and reopening. Click the backdrop, press Esc, or use the ✕ to
// close — closing reverses the morph back to whichever image was originally clicked.
//
// One <LightboxProvider> is mounted once at the top of the worked-solutions tool
// (index.tsx); its overlay/clone are portaled to document.body so they sit above
// everything regardless of where in the tree a click originated.

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface GalleryImage {
  src: string
  alt: string
  naturalWidth: number
  naturalHeight: number
}

interface OpenArgs {
  images: GalleryImage[]
  index: number
  originEl: HTMLImageElement
}

type Phase = 'closed' | 'opening' | 'open' | 'closing'

const LightboxCtx = createContext<((args: OpenArgs) => void) | null>(null)

/** Wrap a region so every <img> inside it becomes a lightbox trigger, grouped into one
 *  gallery per click (every <img> present in the DOM under this scope at click time). */
export function DiagramScope({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const openLightbox = useContext(LightboxCtx)

  useEffect(() => {
    const el = ref.current
    if (!el || !openLightbox) return
    function onClick(e: MouseEvent) {
      if (!openLightbox) return
      const target = (e.target as HTMLElement)?.closest?.('img') as HTMLImageElement | null
      if (!target || !el!.contains(target)) return
      // Several question files reuse the same diagram picture in more than one place at
      // once (e.g. a `const STEM = <img .../>` element used for both the `diagram` prop
      // and again inline in the first solution row) — MCQShell also keeps the Worked
      // Solution tab mounted by default alongside the question, so those duplicates are
      // all genuinely in the DOM simultaneously. Dedupe by resolved src so the gallery
      // reflects distinct pictures, not how many times each one happens to be rendered.
      const seen = new Set<string>()
      const images: GalleryImage[] = []
      for (const img of Array.from(el!.querySelectorAll('img'))) {
        const src = img.currentSrc || img.src
        if (seen.has(src)) continue
        seen.add(src)
        images.push({ src, alt: img.alt, naturalWidth: img.naturalWidth || 800, naturalHeight: img.naturalHeight || 600 })
      }
      const targetSrc = target.currentSrc || target.src
      const index = images.findIndex(g => g.src === targetSrc)
      if (index === -1) return
      openLightbox({ images, index, originEl: target })
    }
    el.addEventListener('click', onClick)
    return () => el.removeEventListener('click', onClick)
  }, [openLightbox])

  // cursor-zoom-in + a faint hover lift signal that these images are clickable.
  return (
    <div ref={ref} className="contents [&_img]:cursor-zoom-in [&_img]:transition-transform [&_img]:duration-150 [&_img]:hover:scale-[1.015]">
      {children}
    </div>
  )
}

function computeTargetRect(natW: number, natH: number) {
  const maxW = Math.min(window.innerWidth * 0.88, 880)
  const maxH = window.innerHeight * 0.8
  const scale = Math.min(maxW / natW, maxH / natH, 1.8)
  let width = natW * scale
  let height = natH * scale
  const minW = Math.min(280, maxW)
  if (width < minW) {
    const s2 = minW / width
    width *= s2
    height *= s2
  }
  return {
    top: (window.innerHeight - height) / 2,
    left: (window.innerWidth - width) / 2,
    width,
    height,
  }
}

const MORPH_TRANSITION =
  'top .32s cubic-bezier(.2,.8,.2,1), left .32s cubic-bezier(.2,.8,.2,1), ' +
  'width .32s cubic-bezier(.2,.8,.2,1), height .32s cubic-bezier(.2,.8,.2,1), border-radius .32s ease'

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [gallery, setGallery] = useState<GalleryImage[] | null>(null)
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('closed')

  const originRectRef = useRef<{ top: number; left: number; width: number; height: number } | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const cloneRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  const open = useCallback(({ images, index: i, originEl }: OpenArgs) => {
    const r = originEl.getBoundingClientRect()
    originRectRef.current = { top: r.top, left: r.left, width: r.width, height: r.height }
    setGallery(images)
    setIndex(i)
    setPhase('opening')
  }, [])

  const close = useCallback(() => setPhase(p => (p === 'open' ? 'closing' : p)), [])
  const goTo = useCallback((i: number) => {
    setGallery(g => {
      if (!g) return g
      setIndex(((i % g.length) + g.length) % g.length)
      return g
    })
  }, [])
  const next = useCallback(() => setIndex(i => (gallery ? (i + 1) % gallery.length : i)), [gallery])
  const prev = useCallback(() => setIndex(i => (gallery ? (i - 1 + gallery.length) % gallery.length : i)), [gallery])

  // Drive the FLIP (morph) animation imperatively — React state only gates mount/unmount
  // and which image is current; the actual box motion is plain DOM style mutation so it
  // can't be interrupted or jank on a re-render.
  useEffect(() => {
    const clone = cloneRef.current
    const overlay = overlayRef.current
    if (!clone || !overlay || !gallery) return

    if (phase === 'opening') {
      const r = originRectRef.current!
      clone.style.transition = 'none'
      overlay.style.transition = 'none'
      overlay.style.opacity = '0'
      Object.assign(clone.style, {
        top: r.top + 'px', left: r.left + 'px', width: r.width + 'px', height: r.height + 'px', borderRadius: '10px',
      })
      void clone.offsetHeight // force reflow so the transition below actually animates
      requestAnimationFrame(() => {
        clone.style.transition = MORPH_TRANSITION
        overlay.style.transition = 'opacity .22s ease'
        overlay.style.opacity = '1'
        const target = computeTargetRect(gallery[index].naturalWidth, gallery[index].naturalHeight)
        Object.assign(clone.style, {
          top: target.top + 'px', left: target.left + 'px', width: target.width + 'px', height: target.height + 'px', borderRadius: '14px',
        })
        const onEnd = (e: TransitionEvent) => {
          if (e.propertyName !== 'width') return
          clone.removeEventListener('transitionend', onEnd)
          setPhase('open')
        }
        clone.addEventListener('transitionend', onEnd)
      })
    } else if (phase === 'closing') {
      const r = originRectRef.current!
      overlay.style.transition = 'opacity .22s ease'
      overlay.style.opacity = '0'
      clone.style.transition = MORPH_TRANSITION
      Object.assign(clone.style, {
        top: r.top + 'px', left: r.left + 'px', width: r.width + 'px', height: r.height + 'px', borderRadius: '10px',
      })
      const onEnd = (e: TransitionEvent) => {
        if (e.propertyName !== 'width') return
        clone.removeEventListener('transitionend', onEnd)
        setPhase('closed')
        setGallery(null)
      }
      clone.addEventListener('transitionend', onEnd)
    }
  }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps

  // While fully open, reposition (no morph) when the current image changes or the window resizes.
  useEffect(() => {
    if (phase !== 'open' || !gallery) return
    const clone = cloneRef.current
    if (!clone) return
    const reposition = () => {
      const target = computeTargetRect(gallery[index].naturalWidth, gallery[index].naturalHeight)
      clone.style.transition = 'top .22s ease, left .22s ease, width .22s ease, height .22s ease'
      Object.assign(clone.style, {
        top: target.top + 'px', left: target.left + 'px', width: target.width + 'px', height: target.height + 'px',
      })
    }
    reposition()
    window.addEventListener('resize', reposition)
    return () => window.removeEventListener('resize', reposition)
  }, [phase, index, gallery])

  // Keyboard controls while open.
  useEffect(() => {
    if (phase === 'closed') return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [phase, close, prev, next])

  const mounted = phase !== 'closed' && gallery !== null

  return (
    <LightboxCtx.Provider value={open}>
      {children}
      {mounted &&
        createPortal(
          <>
            <div
              ref={overlayRef}
              onClick={e => { if (e.target === e.currentTarget) close() }}
              className="fixed inset-0 z-[1000]"
              style={{ background: 'rgba(6,10,22,.72)', backdropFilter: 'blur(10px) saturate(120%)', WebkitBackdropFilter: 'blur(10px) saturate(120%)' }}
            >
              <button
                onClick={close}
                aria-label="Close"
                className="absolute top-5 right-5 sm:top-6 sm:right-6 w-10 h-10 rounded-full flex items-center justify-center text-white text-lg transition-colors z-10"
                style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.18)' }}
              >
                ✕
              </button>

              {gallery.length > 1 && (
                <>
                  <button
                    onClick={e => { e.stopPropagation(); prev() }}
                    aria-label="Previous image"
                    className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white text-xl transition-colors z-10"
                    style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.18)' }}
                  >
                    ‹
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); next() }}
                    aria-label="Next image"
                    className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white text-xl transition-colors z-10"
                    style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.18)' }}
                  >
                    ›
                  </button>
                  <div className="absolute top-5 left-5 sm:top-6 sm:left-6 text-[12px] font-semibold text-white/60 tracking-wide">
                    {index + 1} / {gallery.length}
                  </div>
                  <div
                    className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 p-1.5 rounded-xl max-w-[90vw] overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.14)' }}
                  >
                    {gallery.map((g, i) => (
                      <button
                        key={i}
                        onClick={e => { e.stopPropagation(); goTo(i) }}
                        aria-label={g.alt || `Image ${i + 1}`}
                        className="w-11 h-9 flex-none rounded-md overflow-hidden transition-opacity"
                        style={{ opacity: i === index ? 1 : 0.5, border: i === index ? '2px solid #38bdf8' : '2px solid transparent' }}
                      >
                        <img src={g.src} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </>
              )}

              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[11.5px] text-white/45" style={{ display: gallery.length > 1 ? 'none' : 'block' }}>
                Click outside, press Esc, or use ✕ to close
              </div>
            </div>

            <div
              ref={cloneRef}
              className="fixed z-[1001] bg-white overflow-hidden shadow-2xl"
              style={{ boxShadow: '0 30px 70px -20px rgba(0,0,0,.6)' }}
            >
              <img
                ref={imgRef}
                key={index}
                src={gallery[index].src}
                alt={gallery[index].alt}
                className="w-full h-full object-contain"
                draggable={false}
              />
            </div>
          </>,
          document.body,
        )}
    </LightboxCtx.Provider>
  )
}
