// A multiple-choice question's sections, which take the place of a short-answer question's
// lettered parts for the part rail (QuestionParts PartRail), its ladder and the sticky bar's
// chips (index.tsx): the question itself, the worked solution, the video walkthrough (if any) and
// the examiner's report (if it has a shelf). MCQShell marks each with data-part="<id>".

export const SECTIONS: Record<string, { chip: string; full: string }> = {
  q: { chip: 'Question', full: 'Question' },
  sol: { chip: 'Solution', full: 'Worked Solution' },
  vid: { chip: 'Video', full: 'Video Walkthrough' },
  rep: { chip: 'Report', full: "Examiner's Report" },
}

export const isSection = (id: string) => id in SECTIONS

// The rail label and ladder rung show an icon rather than a letter: a page for the question, a
// pen for the working, play for the video (as elsewhere on the site), bars for the report.
export function SectionIcon({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 mx-auto block" aria-hidden="true">
      {id === 'q' ? (
        <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 1.8h5L13 5.3v8.9H4.5z" />
          <path d="M9.5 1.8v3.5H13M6.8 8.3h3.9M6.8 11h3.9" />
        </g>
      ) : id === 'sol' ? (
        <path d="M11 2.5l2.5 2.5L6 12.5 3 13l.5-3z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      ) : id === 'vid' ? (
        <path d="M5 3.2v9.6c0 .5.5.8.9.5l7-4.8a.6.6 0 000-1L5.9 2.7c-.4-.3-.9 0-.9.5z" fill="currentColor" />
      ) : (
        <path d="M2.5 13.5h11M4.5 11V8M8 11V4.5M11.5 11V6.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      )}
    </svg>
  )
}
