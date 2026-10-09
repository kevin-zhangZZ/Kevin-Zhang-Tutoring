// Small shared accessibility helpers: roving arrow-key focus for tab sets, and focus
// management (move in, trap Tab, return to the trigger) for modal dialogs.

import { useLayoutEffect, useRef, type KeyboardEvent, type RefObject } from 'react'

/**
 * onKeyDown for a `role="tab"` button. Left/Right (and Up/Down) move to the previous/next tab
 * in the same `role="tablist"`, Home/End to the first/last, wrapping at the ends; the new tab
 * is focused and activated (automatic activation). Pair with `tabIndex={active ? 0 : -1}`.
 */
export function onTabKeyDown(e: KeyboardEvent<HTMLElement>) {
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End']
  if (!keys.includes(e.key)) return
  const list = e.currentTarget.closest('[role="tablist"]')
  if (!list) return
  const tabs = Array.from(list.querySelectorAll<HTMLElement>('[role="tab"]')).filter(
    t => !t.hasAttribute('disabled') && t.getAttribute('aria-disabled') !== 'true',
  )
  const i = tabs.indexOf(e.currentTarget)
  if (i < 0 || tabs.length < 2) return
  const n = tabs.length
  const next =
    e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? (i - 1 + n) % n : (i + 1) % n
  e.preventDefault()
  tabs[next].focus()
  tabs[next].click()
}

const FOCUSABLE =
  'a[href], area[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), iframe, audio[controls], video[controls], [contenteditable="true"], [tabindex]:not([tabindex="-1"])'

function focusables(root: HTMLElement) {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    el => el.getClientRects().length > 0 || el === document.activeElement,
  )
}

/**
 * Focus management for a modal dialog while `open`: remembers the element that had focus,
 * moves focus to `initialFocus` (or the first focusable inside `containerRef`), keeps Tab /
 * Shift+Tab inside the container, and on close returns focus to the remembered element (or
 * `returnFocus` if given), and marks everything outside the container `inert` so screen
 * readers and pointer/keyboard can't reach the page behind. Escape handling stays with the
 * caller. Call it before any other layout effect of the dialog that moves focus, so the
 * trigger is captured first.
 */
export function useDialogFocus(
  open: boolean,
  containerRef: RefObject<HTMLElement | null>,
  opts: { initialFocus?: RefObject<HTMLElement | null>; returnFocus?: RefObject<HTMLElement | null> } = {},
) {
  const optsRef = useRef(opts)
  optsRef.current = opts

  useLayoutEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null

    // Make the rest of the page inert: every sibling of the container and of each ancestor.
    const inerted: HTMLElement[] = []
    for (let node = containerRef.current; node && node !== document.body; node = node.parentElement) {
      const parent = node.parentElement
      if (!parent) break
      for (const sib of Array.from(parent.children)) {
        if (sib === node || !(sib instanceof HTMLElement) || sib.inert || sib.tagName === 'SCRIPT') continue
        sib.inert = true
        inerted.push(sib)
      }
    }

    const raf = requestAnimationFrame(() => {
      const root = containerRef.current
      if (!root) return
      const target = optsRef.current.initialFocus?.current ?? focusables(root)[0] ?? root
      target.focus({ preventScroll: true })
    })

    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const root = containerRef.current
      if (!root) return
      const items = focusables(root)
      if (items.length === 0) {
        e.preventDefault()
        root.focus()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement as HTMLElement | null
      const inside = !!active && root.contains(active)
      if (e.shiftKey && (active === first || !inside)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (active === last || !inside)) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', onKey)
      for (const el of inerted) el.inert = false
      const back = optsRef.current.returnFocus?.current ?? previous
      if (back && document.contains(back)) back.focus({ preventScroll: true })
    }
  }, [open, containerRef])
}
