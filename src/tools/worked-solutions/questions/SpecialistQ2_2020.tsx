// 2020 Specialist Mathematics — Exam 2, MCQ 2. VCAA examination report: 42% correct.
// Range of f(x) = |b·cos⁻¹(x) − a|. Question text transcribed from the original paper.
// Solution is original.
// Answer B checked numerically (sampled min 0 and max bπ − a for several a, b with a < bπ/2),
// against the VCAA report (comment kept verbatim: "Use transformations on g(x) = cos⁻¹(x)",
// a < bπ/2 ⇒ bπ > 2a) and itute (B). Distractors checked: A = [−a, bπ − a] is the range of
// b·cos⁻¹(x) − a before the modulus; C = [a, bπ − a] is |−a| and |bπ − a| taken as the ends;
// E = [a − bπ, a] is the range of a − b·cos⁻¹(x) (the whole graph reflected, not folded).
// Interactive diagram (§15): interactives/spec-2020-mcq2-fold.tsx builds f step by step (cos⁻¹,
// dilate by b, translate down a, fold with the modulus) with the range as a band at each step;
// sliders for a and b show what goes wrong when a ≥ bπ/2. This site's own explanatory figure;
// VCAA printed no diagram. WrongMethod boxes for options A (18%) and C (24%).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const FoldWidget = lazyWidget(() => import('../interactives/spec-2020-mcq2-fold'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 18, B: 42, C: 24, D: 10, E: 5 },
  answer: 'B',
  comment: (
    <>
      Use transformations on <Katex tex="g(x)=\cos^{-1}(x)" />.
      <br />
      <Katex tex="a<\dfrac{b\pi}{2}\Rightarrow b\pi>2a" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\cos^{-1}(x) \text{ has range } [0,\pi]" />,
    reason: <>Follow the report&apos;s advice: build <Katex tex="f" /> from the graph of <Katex tex="y=\cos^{-1}(x)" /> one transformation at a time, tracking the range at each step. <Katex tex="\cos^{-1}" /> runs from <Katex tex="0" /> (at <Katex tex="x=1" />) up to <Katex tex="\pi" /> (at <Katex tex="x=-1" />).</>,
  },
  {
    working: <Katex display tex="b\cos^{-1}(x) \text{ has range } [0,\ b\pi]" />,
    reason: <>Multiplying by <Katex tex="b" /> is a dilation by factor <Katex tex="b" /> from the <Katex tex="x" />-axis: every height is multiplied by <Katex tex="b" />. Since <Katex tex="b>0" />, the ends keep their order: <Katex tex="0\to0" /> and <Katex tex="\pi\to b\pi" />.</>,
  },
  {
    working: <Katex display tex="b\cos^{-1}(x) - a \text{ has range } [-a,\ b\pi-a]" />,
    reason: <>Subtracting <Katex tex="a" /> is a translation <Katex tex="a" /> units down, so every height, and both ends of the range, drop by <Katex tex="a" />. This is option A, but the modulus hasn&apos;t been applied yet.</>,
  },
  {
    working: <Katex display tex="-a < 0 < b\pi - a" />,
    reason: <>Since <Katex tex="a>0" /> and <Katex tex="a<\tfrac{b\pi}{2}<b\pi" />, the lower end is negative and the upper end positive: the graph crosses the <Katex tex="x" />-axis, where <Katex tex="b\cos^{-1}(x)=a" />, i.e. at <Katex tex="x=\cos\left(\tfrac ab\right)" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{heights in } [-a,0) \to (0,a]" />
        <Katex display tex="\text{heights in } [0,\ b\pi-a] \text{ unchanged}" />
      </>
    ),
    reason: <>The modulus reflects the part of the graph below the <Katex tex="x" />-axis up above it and leaves the rest alone. So the lowest point <Katex tex="(1,-a)" /> goes up to <Katex tex="(1,a)" />, and the crossing point stays at height <Katex tex="0" />, which makes it the new lowest point.</>,
    more: <>Watch the fold in the diagram below.</>,
  },
  {
    working: <Katex display tex="a < \tfrac{b\pi}{2} \;\implies\; 2a < b\pi \;\implies\; a < b\pi - a" />,
    reason: <>Which is higher now: the flipped end at height <Katex tex="a" />, or the untouched top at <Katex tex="b\pi-a" />? This is exactly what the condition <Katex tex="a<\tfrac{b\pi}{2}" /> decides (the report&apos;s <Katex tex="b\pi>2a" />): the flipped piece stays below the top, so the maximum is <Katex tex="b\pi-a" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Range} = [0,\ b\pi-a]}" />,
    reason: <>Minimum <Katex tex="0" /> at <Katex tex="x=\cos\left(\tfrac ab\right)" /> (inside <Katex tex="[-1,1]" />, since <Katex tex="0<\tfrac ab<\tfrac\pi2" />); maximum <Katex tex="b\pi-a" /> at <Katex tex="x=-1" />. Matches option <b>B</b>. Option <b>A</b> is the range before the modulus is taken; option <b>C</b> takes the modulus of the two ends only, missing that the graph passes through <Katex tex="0" /> on the way; option <b>E</b> is the range of <Katex tex="a-b\cos^{-1}(x)" />, the whole graph reflected in the <Katex tex="x" />-axis instead of only the part below it folded up.</>,
  },
]

export default function SpecialistQ2_2020() {
  return (
    <MCQShell
      question={
        <p>
          A function <Katex tex="f" /> has the rule <Katex tex="f(x) = \big|b\cos^{-1}(x) - a\big|" />, where{' '}
          <Katex tex="a>0" />, <Katex tex="b>0" /> and <Katex tex="a<\dfrac{b\pi}{2}" />.
          <br />
          The range of <Katex tex="f" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="[-a,\ b\pi-a]" /> },
        { letter: 'B', content: <Katex tex="[0,\ b\pi-a]" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="[a,\ b\pi-a]" /> },
        { letter: 'D', content: <Katex tex="[0,\ b\pi+a]" /> },
        { letter: 'E', content: <Katex tex="[a-b\pi,\ a]" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Build f by transformations, then fold: the range starts at 0, and a < bπ/2 keeps the top at bπ − a">
            <FoldWidget />
          </Explore>
          <WrongMethod
            title="Apply the dilation and the translation, and read off the range"
            source="18% chose A"
            working={
              <>
                <Katex display tex="b\cos^{-1}(x)-a \text{ has range}" />
                <Katex display tex="[-a,\ b\pi-a] \quad \text{(option A)}" />
              </>
            }
          >
            <p>
              That is the range of the expression <em>inside</em> the modulus. <Katex tex="f" /> is its absolute value, and
              an absolute value is never negative, so a range that includes <Katex tex="-a" /> can&apos;t be right. The
              modulus is the last transformation, and it has to be applied too.
            </p>
            <p>Next time, check the answer against the rule: a modulus function has no negative outputs.</p>
          </WrongMethod>
          <WrongMethod
            title="The modulus turns −a into a, so the range is [a, bπ − a]"
            source="24% chose C"
            working={
              <>
                <Katex display tex="|-a| = a,\quad |b\pi-a| = b\pi-a" />
                <Katex display tex="\implies [a,\ b\pi-a] \quad \text{(option C)}" />
              </>
            }
          >
            <p>
              Taking the modulus of the two ends only works when the whole interval is on one side of <Katex tex="0" />.
              Here the values run from <Katex tex="-a" /> up to <Katex tex="b\pi-a" />, so they pass through{' '}
              <Katex tex="0" /> on the way, at <Katex tex="x=\cos\left(\tfrac ab\right)" />, and <Katex tex="|0|=0" />. So{' '}
              <Katex tex="f" /> reaches <Katex tex="0" />, which is lower than <Katex tex="a" />. The folded graph has a
              sharp corner sitting on the <Katex tex="x" />-axis there.
            </p>
            <p>
              Next time: if the values inside the modulus run from negative to positive, the smallest value of the modulus
              is <Katex tex="0" />. A quick sketch, folding the part below the axis up, shows it at once.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
