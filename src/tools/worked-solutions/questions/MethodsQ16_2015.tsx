// 2015 Mathematical Methods (CAS) — Exam 2, MCQ 16. VCAA examination report: 22% correct.
// f(x) = ax^m, g(x) = bx^n; f'(x) is an antiderivative of g(x) — what must be true?
// Question text transcribed from the original paper; solution is original.
// Checked in sympy: f''(x) = am(m−1)x^{m−2} = bx^n gives n = m − 2, b/a = m(m−1) (D), agreeing with
// the report. Counterexamples (a = 1): m = 3 → b = 6, n = 1 (A and D hold); m = 5 → b = 20, n = 3 (A fails).
// Interactive: none — qualifies (22%), but the trap is reading the sentence and the meaning of "must be
// true"; there is no graph to manipulate, and the two counterexamples in the last row's `more` do the job.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

// Dropbox share link for the tutor's video walkthrough, converted to `raw=1` so the browser
// can stream it directly. Already H.264/AAC — just remuxed (`ffmpeg -c copy -movflags
// +faststart`) from the tutor's original .mov, no re-encoding needed. The source is a
// portrait phone recording with QuickTime rotation metadata, which the remux preserves and
// browsers render correctly.
const VIDEO_SRC =
  'https://www.dropbox.com/scl/fo/nj8fctdfyn1hpwbiqjktw/AJHdgWbSWqdR_tZlFbYrNCg/MM%202015/Converted/MCQ/MCQ16-h264.mp4?rlkey=9vak8i9afmguex76hqb71mfv8&raw=1'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 24, B: 19, C: 26, D: 22, E: 8 },
  answer: 'D',
  noAnswer: 2,
  comment: (
    <>
      <Katex tex="f'(x)=\int(bx^n)\,dx=\dfrac{bx^{n+1}}{n+1}+c" />, and <Katex tex="f'(x)=amx^{m-1}" />.
      Hence <Katex tex="n+1=m-1" />, <Katex tex="n=m-2" />, <Katex tex="\dfrac{b}{n+1}=am" />,{' '}
      <Katex tex="\dfrac{b}{a}=m(n+1)=m(m-1)" />. Hence <Katex tex="\dfrac{b}{a}" /> is an integer as{' '}
      <Katex tex="m" /> is an integer; for example, if <Katex tex="m=3" />, <Katex tex="\dfrac{b}{a}=3\times2=6" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f''(x) = g(x)" />,
    reason: (
      <>
        "<Katex tex="f'(x)" /> is an antiderivative of <Katex tex="g(x)" />" means differentiating <Katex tex="f'(x)" /> gives{' '}
        <Katex tex="g(x)" />.
      </>
    ),
    more: (
      <>
        Read the sentence carefully: it is <Katex tex="f'" />, not <Katex tex="f" />, whose derivative is <Katex tex="g" />. Taking it
        as <Katex tex="f'(x)=g(x)" /> gives <Katex tex="m-1=n" /> and <Katex tex="\tfrac ba=m" /> instead — still option D, but by
        luck. The report goes the other way, integrating <Katex tex="g" />:{' '}
        <Katex tex="f'(x)=\tfrac{b}{n+1}x^{n+1}+c" />. Since <Katex tex="f'(x)=amx^{m-1}" /> has no constant term,{' '}
        <Katex tex="c=0" />, and matching gives the same results as below.
      </>
    ),
  },
  {
    working: <Katex display tex="am(m-1)\,x^{m-2} = bx^n" />,
    reason: <>Differentiate <Katex tex="f(x)=ax^m" /> twice, using the power rule each time.</>,
  },
  {
    working: (
      <>
        <Katex display tex="m-2=n" />
        <Katex display tex="\implies\; m=n+2" />
      </>
    ),
    reason: <>Both sides are a single power of <Katex tex="x" />, equal for every real <Katex tex="x" />, so the powers must match. As <Katex tex="n\ge1" />, <Katex tex="m\ge3" />.</>,
  },
  {
    working: <Katex display tex="b = am(m-1)" />,
    reason: 'With the powers equal, the coefficients must match too.',
  },
  {
    working: <Katex display tex="\boxed{\dfrac{b}{a} = m(m-1)}" />,
    reason: (
      <>
        Matches option <b>D</b>: <Katex tex="m(m-1)" /> is a product of positive integers, so <Katex tex="\tfrac ba" /> is always an
        integer.
      </>
    ),
    more: (
      <>
        Only 22% chose D. "Must be true" means true in <em>every</em> case, so one counterexample rules an option out. Try{' '}
        <Katex tex="a=1" />, <Katex tex="m=3" />: <Katex tex="f''(x)=6x" />, so <Katex tex="b=6" />, <Katex tex="n=1" />. This kills B
        (<Katex tex="\tfrac13" />), C (<Katex tex="\tfrac16" />) and E (<Katex tex="n-m=-2" />), but A (<Katex tex="\tfrac31=3" />) and
        D (<Katex tex="6" />) survive. A second case, <Katex tex="a=1" />, <Katex tex="m=5" />: <Katex tex="b=20" />,{' '}
        <Katex tex="n=3" />, and now <Katex tex="\tfrac mn=\tfrac53" />, so A (24%) is out — it only holds when{' '}
        <Katex tex="n=1" /> or <Katex tex="n=2" />. C (26%), the most popular wrong answer, has the ratio upside down:{' '}
        <Katex tex="\tfrac ab=\tfrac{1}{m(m-1)}" /> is never an integer, since <Katex tex="m(m-1)\ge6" />. B is never an integer
        either (<Katex tex="\tfrac{n}{n+2}" /> is less than 1), and E has the sign wrong: it is <Katex tex="m-n" /> that equals 2.
      </>
    ),
  },
]

export default function MethodsQ16_2015() {
  return (
    <MCQShell
      question={
        <>
          <p>
            Let <Katex tex="f(x) = ax^m" /> and <Katex tex="g(x) = bx^n" />, where <Katex tex="a, b, m" /> and{' '}
            <Katex tex="n" /> are positive integers. The domain of <Katex tex="f" /> = domain of{' '}
            <Katex tex="g" /> = <Katex tex="R" />.
          </p>
          <p className="mt-2">
            If <Katex tex="f'(x)" /> is an antiderivative of <Katex tex="g(x)" />, then which one of the
            following must be true?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <><Katex tex="\dfrac{m}{n}" /> is an integer</> },
        { letter: 'B', content: <><Katex tex="\dfrac{n}{m}" /> is an integer</> },
        { letter: 'C', content: <><Katex tex="\dfrac{a}{b}" /> is an integer</> },
        { letter: 'D', content: <><Katex tex="\dfrac{b}{a}" /> is an integer</>, isAnswer: true },
        { letter: 'E', content: <Katex tex="n-m=2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      videoSrc={VIDEO_SRC}
    />
  )
}
