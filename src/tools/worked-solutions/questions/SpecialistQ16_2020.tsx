// 2020 Specialist Mathematics — Exam 2, MCQ 16. VCAA examination report: 69% correct. The
// angle between two vectors, then a double-angle sine. Question text transcribed from the
// original paper. Solution is original. Interactive: spec-2020-mcq16-double-angle (where the 2 in
// sin 2θ = 2 sin θ cos θ comes from, and why sin 2θ is small at the question's θ). The report has
// no comment on this question; the WrongMethod boxes rest on its option percentages (B 10%, C 15%),
// with each slip computed to land exactly on that option. Option E is not traced to a slip.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const DoubleAngleWidget = lazyWidget(() => import('../interactives/spec-2020-mcq16-double-angle'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 10, C: 15, D: 69, E: 3 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = (1)(2)+(2)(-4)+(2)(4) = 2" />,
    reason: (
      <>
        An angle between two vectors always comes from the dot product,{' '}
        <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = |\underset{\sim}{a}||\underset{\sim}{b}|\cos\theta" />.
        Start with the dot product: multiply matching components and add.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned}\left|\underset{\sim}{a}\right| &= \sqrt{1+4+4} = 3\\ \left|\underset{\sim}{b}\right| &= \sqrt{4+16+16} = 6\end{aligned}" />,
    reason: <>Both are clean: <Katex tex="\underset{\sim}{b}" /> is twice a 1–2–2 vector.</>,
  },
  {
    working: <Katex display tex="\cos\theta = \frac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{|\underset{\sim}{a}||\underset{\sim}{b}|} = \frac{2}{3\times6} = \frac19" />,
    reason: (
      <>
        Rearrange the dot-product rule for <Katex tex="\cos\theta" />. It is positive, so <Katex tex="\theta" /> is
        already the acute angle the question describes. (A negative dot product would give the obtuse angle, and you
        would use its supplement.)
      </>
    ),
  },
  {
    working: <Katex display tex="\sin\theta = \sqrt{1-\tfrac{1}{81}} = \sqrt{\tfrac{80}{81}} = \frac{4\sqrt5}{9}" />,
    reason: (
      <>
        The double-angle formula needs <Katex tex="\sin\theta" /> as well. Picture a right triangle with adjacent 1 and
        hypotenuse 9: the opposite side is <Katex tex="\sqrt{81-1}=\sqrt{80}=4\sqrt5" />. Take the positive root
        because <Katex tex="\theta" /> is acute.
      </>
    ),
  },
  {
    working: <Katex display tex="\sin(2\theta) = 2\sin\theta\cos\theta = 2\cdot\frac{4\sqrt5}{9}\cdot\frac19" />,
    reason: (
      <>
        Reread the last line of the question: it asks for <Katex tex="\sin(2\theta)" />, not <Katex tex="\sin\theta" />.
        Keep the 2 in front.
      </>
    ),
    more: <>The interactive diagram below shows where it comes from.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{8\sqrt5}{81}}" />,
    reason: (
      <>
        Matches option <b>D</b>. Option <b>B</b> is <Katex tex="\sin\theta" />, one step short; option <b>C</b>{' '}
        is <Katex tex="\sin\theta\cos\theta" />, the formula without its 2; option <b>A</b> is <Katex tex="\cos\theta" />.
      </>
    ),
  },
]

export default function SpecialistQ16_2020() {
  return (
    <MCQShell
      question={
        <p>
          Let{' '}
          <Katex tex="\underset{\sim}{a}=\underset{\sim}{i}+2\underset{\sim}{j}+2\underset{\sim}{k}" />{' '}
          and{' '}
          <Katex tex="\underset{\sim}{b}=2\underset{\sim}{i}-4\underset{\sim}{j}+4\underset{\sim}{k}" />
          , where the acute angle between these vectors is <Katex tex="\theta" />.
          <br />
          The value of <Katex tex="\sin(2\theta)" /> is
        </p>
      }
      background={
        <Background title="Two formulas this question chains together">
          <p>
            The angle between two vectors:{' '}
            <Katex tex="\cos\theta = \dfrac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{|\underset{\sim}{a}||\underset{\sim}{b}|}" />
            , where <Katex tex="\theta" /> is between <Katex tex="0" /> and <Katex tex="\pi" />.
          </p>
          <p className="mt-2">
            The double-angle formula: <Katex tex="\sin(2\theta) = 2\sin\theta\cos\theta" />. Once you know{' '}
            <Katex tex="\cos\theta" />, you get <Katex tex="\sin\theta" /> from{' '}
            <Katex tex="\sin^2\theta+\cos^2\theta=1" /> (or a right triangle), choosing its sign from the quadrant
            of <Katex tex="\theta" />.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="\frac19" /> },
        { letter: 'B', content: <Katex tex="\frac{4\sqrt5}{9}" /> },
        { letter: 'C', content: <Katex tex="\frac{4\sqrt5}{81}" /> },
        { letter: 'D', content: <Katex tex="\frac{8\sqrt5}{81}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\frac{2\sqrt{46}}{25}" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Where the 2 in sin 2θ = 2 sin θ cos θ comes from">
            <DoubleAngleWidget />
          </Explore>
          <WrongMethod
            title="sin(2θ) is sin θ cos θ"
            source="15% chose C"
            working={<Katex display tex="\sin\theta\cos\theta = \frac{4\sqrt5}{9}\cdot\frac19 = \frac{4\sqrt5}{81}" />}
          >
            That is exactly half the answer, option C. The formula is{' '}
            <Katex tex="\sin(2\theta) = 2\sin\theta\cos\theta" />: the triangle in the diagram is made of <b>two</b>{' '}
            right triangles, each worth <Katex tex="\sin\theta\cos\theta" />. If you&apos;re unsure of a formula,
            test it on an angle you know: at <Katex tex="\theta = 45^\circ" />,{' '}
            <Katex tex="\sin 90^\circ = 1" /> but <Katex tex="\sin 45^\circ\cos 45^\circ = \tfrac12" />.
          </WrongMethod>
          <WrongMethod
            title="Found sin θ, so that's the answer"
            source="10% chose B"
            working={<Katex display tex="\sin\theta = \frac{4\sqrt5}{9}" />}
          >
            That is <Katex tex="\sin\theta" />, one step short of <Katex tex="\sin(2\theta)" />. A size check catches
            it: <Katex tex="\cos\theta = \tfrac19" /> puts <Katex tex="\theta" /> near <Katex tex="84^\circ" />, so{' '}
            <Katex tex="2\theta" /> is near <Katex tex="167^\circ" />, close to <Katex tex="180^\circ" /> where
            sine is small. The answer must be about 0.22, not about 0.99.
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
