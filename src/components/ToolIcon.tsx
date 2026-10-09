// One drawn icon per tool, on a shared 24-unit grid with one stroke weight, so the menu and
// Home read as a set. Each draws what the tool actually is (a marked exam page, the unit
// circle, a pyramid in 3D) rather than a stock emoji.
export type ToolIconName =
  | 'explanations'
  | 'analysis'
  | 'study-score'
  | 'skip-guide'
  | 'unit-circle'
  | 'speed-maths'
  | 'demonstrations'
  | 'contact'
  | 'home'

const paths: Record<ToolIconName, React.ReactNode> = {
  // An exam page with a worked line, ticked.
  explanations: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M8.5 11.5h3M8.5 15h2" />
      <path d="m13 15.5 1.6 1.6 3-3.4" />
    </>
  ),
  // Marks split across topics: stacked columns on a baseline.
  analysis: (
    <>
      <path d="M3.5 20.5h17" />
      <rect x="5" y="11" width="3.5" height="9.5" rx="0.6" />
      <rect x="10.25" y="5" width="3.5" height="15.5" rx="0.6" />
      <rect x="15.5" y="8.5" width="3.5" height="12" rx="0.6" />
      <path d="M10.25 12h3.5M15.5 14h3.5M5 15.5h3.5" />
    </>
  ),
  // A score dial out of 50, needle pointing high.
  'study-score': (
    <>
      <path d="M3.5 17a8.5 8.5 0 1 1 17 0" />
      <path d="M12 17l4.2-5.2" />
      <circle cx="12" cy="17" r="1.3" />
      <path d="M5.6 11.3l1.3.8M12 6.8v1.5M18.4 11.3l-1.3.8" />
    </>
  ),
  // A question list, with an arrow jumping the outdated (faded) one.
  'skip-guide': (
    <>
      <path d="M11 6h9M11 18h7" />
      <path d="M11 12h9" opacity="0.4" strokeDasharray="2 2.2" />
      <path d="M7.5 6C3 6 3 18 7.5 18" />
      <path d="m5.8 15.8 1.9 2.2-2.2 1.8" />
    </>
  ),
  // The circle, its axes, and a radius out to a marked angle.
  'unit-circle': (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M2.5 12h19M12 2.5v19" opacity="0.45" />
      <path d="M12 12l6-6" />
      <circle cx="18" cy="6" r="1.4" fill="currentColor" stroke="none" />
      <path d="M15 12a3 3 0 0 0-.9-2.1" />
    </>
  ),
  // A stopwatch, mid-race.
  'speed-maths': (
    <>
      <circle cx="12" cy="13.5" r="7.5" />
      <path d="M10 2.5h4M12 2.5V6M18.5 7l1.3-1.3" />
      <path d="M12 13.5V9.5M12 13.5l2.6 1.6" />
    </>
  ),
  // A square pyramid, hidden edges dashed.
  demonstrations: (
    <>
      <path d="M12 3 3.5 17.5 10 21l10.5-4.5z" />
      <path d="M12 3l-2 18" />
      <path d="M12 3l2.2 11.2M3.5 17.5l10.7-3.3 6.3 2.3" strokeDasharray="1.6 2" opacity="0.55" />
    </>
  ),
  contact: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  home: (
    <>
      <path d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 19z" />
      <path d="M9.5 20.5v-6h5v6" />
    </>
  ),
}

export default function ToolIcon({ name, size = 18, className }: { name: ToolIconName; size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`flex-shrink-0 ${className ?? ''}`}
    >
      {paths[name]}
    </svg>
  )
}
