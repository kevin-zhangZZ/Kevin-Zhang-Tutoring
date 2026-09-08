// 2015 Mathematical Methods — Exam 2, MCQ 16.
// f(x) = ax^m, g(x) = bx^n; f'(x) is an antiderivative of g(x) — what must be true?
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

// Dropbox share link for the tutor's video walkthrough, converted to `raw=1` so the browser
// can stream it directly. Already H.264/AAC — just remuxed (`ffmpeg -c copy -movflags
// +faststart`) from the tutor's original .mov, no re-encoding needed. The source is a
// portrait phone recording with QuickTime rotation metadata, which the remux preserves and
// browsers render correctly.
const VIDEO_SRC =
  'https://www.dropbox.com/scl/fo/nj8fctdfyn1hpwbiqjktw/AJB8aa5AHQq059A3FOOtIEc/MM%202015/MCQ16-h264.mp4?rlkey=9vak8i9afmguex76hqb71mfv8&raw=1'

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
    working: <Katex display tex="f''(x) = am(m-1)\,x^{m-2}" />,
    reason: (
      <>
        "<Katex tex="f'(x)" /> is an antiderivative of <Katex tex="g(x)" />" means the derivative of{' '}
        <Katex tex="f'(x)" /> gives back <Katex tex="g(x)" />, i.e. <Katex tex="f''(x)=g(x)" />.
      </>
    ),
  },
  {
    working: <Katex display tex="am(m-1)\,x^{m-2} = bx^n" />,
  },
  {
    working: <Katex display tex="m-2=n \;\implies\; m=n+2" />,
    reason: 'Match the powers of x on each side.',
  },
  {
    working: <Katex display tex="b = am(m-1)" />,
    reason: 'Match the coefficients.',
  },
  {
    working: <Katex display tex="\boxed{\dfrac{b}{a} = m(m-1)}" />,
    reason: (
      <>
        A product of two consecutive positive integers (<Katex tex="m \ge 2" />) — always an integer. So{' '}
        <Katex tex="b/a" /> is an integer: <b>D</b>.
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
            <Katex tex="g" /> = <Katex tex="\mathbb{R}" />.
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
