// Small stroke-based icons for the confidence tiers. 24x24 viewBox, currentColor.

export function SkipIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <line x1="6.5" y1="17.5" x2="17.5" y2="6.5" />
    </svg>
  )
}

export function NoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3.5 L21 19.5 H3 Z" />
      <line x1="12" y1="9.5" x2="12" y2="13.5" />
      <circle cx="12" cy="16.3" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function NewIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  )
}

export function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.2" y2="16.2" />
    </svg>
  )
}

export function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M7 8c-2 0-3 1.5-3 3.5S5 15 7 15c0 2-1 3-2.5 3.5" />
      <path d="M16 8c-2 0-3 1.5-3 3.5S14 15 16 15c0 2-1 3-2.5 3.5" />
    </svg>
  )
}
