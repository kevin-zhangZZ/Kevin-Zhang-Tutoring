// 2024 Mathematical Methods — Exam 2, MCQ 17. VCAA examination report: 27% correct — the
// hardest MCQ on this paper. This year's paper used four options (A–D) rather than five.
// Tracing through an algorithm that searches for a cubic's roots, in decreasing order.
// Question text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 26, C: 32, D: 27 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="c=f(0)=18" />, <Katex tex="f(18)\ne0" />
      <br />
      <Katex tex="c=17,\ 16,\ \ldots\ 3" />
      <br />
      <Katex tex="f(3)=0" />, <Katex tex="f(-3)=0" />, <Katex tex="f(2)=0" />
      <br />
      <Katex tex="3,\ -3,\ 2" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} f(x) &= x^2(x-2)-9(x-2) \\ &= (x-2)(x^2-9) \\ &= (x-2)(x-3)(x+3) \end{aligned}"
      />
    ),
    reason: (
      <>
        Find the roots first (factorise by grouping): <Katex tex="x=2,\ 3,\ -3" />. Then you only need to trace the
        loop at the values of <Katex tex="c" /> where something prints.
      </>
    ),
    more: (
      <>
        If grouping doesn&apos;t occur to you, the factor theorem works: try factors of 18, and{' '}
        <Katex tex="f(2)=8-8-18+18=0" />, so <Katex tex="(x-2)" /> is a factor. On CAS, <Cas fn="solve" />{' '}
        <Katex tex="f(x)=0" /> gives the same three roots. Knowing them saves evaluating <Katex tex="f(17)" />,{' '}
        <Katex tex="f(-17)" /> and so on by hand.
      </>
    ),
  },
  {
    working: <Katex display tex="c \leftarrow f(0) = 18" />,
    reason: (
      <>
        <Katex tex="f(0)" /> is the constant term. As <Katex tex="18" /> is not negative, the &ldquo;if c &lt; 0&rdquo;
        block is skipped, so <Katex tex="c" /> starts at 18.
      </>
    ),
    more: (
      <>
        Why start at <Katex tex="|f(0)|" />? For a cubic like this one (leading coefficient 1, integer coefficients), any
        integer root must be a factor of the constant term 18, so every integer
        root lies between <Katex tex="-18" /> and <Katex tex="18" />. Testing <Katex tex="c" /> and <Katex tex="-c" /> for{' '}
        <Katex tex="c=18,17,\dots,1" /> therefore catches them all.
      </>
    ),
  },
  {
    working: (
      <>
        Each pass tests <Katex tex="f(c)=0" />, then <Katex tex="f(-c)=0" />, then lowers <Katex tex="c" /> by 1:{' '}
        <Katex tex="c=18,17,16,\dots,1" />.
      </>
    ),
    reason: (
      <>
        Read the loop body in order: the <Katex tex="+c" /> test comes before the <Katex tex="-c" /> test, inside the same
        pass.
      </>
    ),
    more: (
      <>
        So the roots are found in order of decreasing distance from 0 (that is, decreasing <Katex tex="|x|" />), not
        decreasing value, and when <Katex tex="c" /> and <Katex tex="-c" /> are both roots, the positive one prints first.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} c=3:\quad &f(3)=0 \implies \text{print } 3 \\ &f(-3)=0 \implies \text{print } {-3} \end{aligned}"
      />
    ),
    reason: (
      <>
        Counting down from 18, no <Katex tex="\pm c" /> is a root until <Katex tex="c=3" />, which hits two: 3 prints,
        then <Katex tex="-3" /> in the same pass.
      </>
    ),
    more: (
      <>
        This is where most students went wrong. The most common answer, <b>C</b> (32%), prints 2 before{' '}
        <Katex tex="-3" />, as if the loop checked all the positive values first and the negatives afterwards. But{' '}
        <Katex tex="-3" /> is tested at <Katex tex="c=3" />, before <Katex tex="c" /> drops to 2.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} c=2:\quad &f(2)=0 \implies \text{print } 2 \\ &f(-2)=-8-8+18+18=20\neq0 \end{aligned}"
      />
    ),
    reason: <>Next pass: only the <Katex tex="+c" /> test succeeds, so just 2 prints.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} c=1:\quad &f(1)=8\neq0,\quad f(-1)=24\neq0 \\ c=0:\quad &\text{loop stops} \end{aligned}"
      />
    ),
    reason: <>Nothing more prints, and the loop ends once <Katex tex="c" /> is no longer positive.</>,
  },
  {
    working: <Katex display tex="\boxed{3,\ -3,\ 2}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: (
      <>
        The other options are the right three roots in the wrong order. <b>B</b> (<Katex tex="-3,\ 2,\ 3" />) is just the
        roots from smallest to largest, and <b>C</b> (<Katex tex="3,\ 2,\ -3" />) is the positives-first trap explained at{' '}
        <Katex tex="c=3" />; neither follows the algorithm. <b>A</b> (<Katex tex="-3,\ 3,\ 2" />) gets the order of
        decreasing distance from 0 right but runs the{' '}
        <Katex tex="-c" /> test before the <Katex tex="+c" /> test.
      </>
    ),
  },
]

export default function MethodsQ17_2024() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Consider the algorithm below, which prints the roots of the cubic polynomial{' '}
            <Katex tex="f(x)=x^3-2x^2-9x+18" />.
          </p>
          <pre className="text-[11.5px] leading-relaxed bg-gray-100 dark:bg-gray-800 rounded-xl p-3 overflow-x-auto mb-2">{`define f(x)
    return (x^3 - 2x^2 - 9x + 18)
c ← f(0)
if c < 0 then
    c ← (-c)
end if
while c > 0
    if f(c) = 0 then
        print c
    end if
    if f(-c) = 0 then
        print -c
    end if
    c ← c - 1
end while`}</pre>
          <p>In order, the algorithm prints the values</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="-3,\ 3,\ 2" /> },
        { letter: 'B', content: <Katex tex="-3,\ 2,\ 3" /> },
        { letter: 'C', content: <Katex tex="3,\ 2,\ -3" /> },
        { letter: 'D', content: <Katex tex="3,\ -3,\ 2" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
