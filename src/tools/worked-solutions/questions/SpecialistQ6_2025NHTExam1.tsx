// 2025 Specialist NHT — Exam 1, Question 6 (4 marks). The NHT report gives sample answers only,
// with no statistics. Lines r₁(t) = i − 2j + 4k + t(i + 3j − k) and r₂(s) = 3j − 3k + s(2i + j + 4k):
// show they are skew (the first two component equations give t = 11/5, s = 8/5, which fail the
// third; the direction vectors are not scalar multiples), then the shortest distance as the scalar
// resolute of AB onto the common normal d₁ × d₂ = 13i − 6j − 5k: 8/√230 = 4√230/115. Question text
// transcribed from the original paper (read from a rendered page image; the 2025 paper has no text
// layer). Answers checked with sympy and against the report's sample answers, which agree (the
// report leaves the distance as 8/√230). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow } from '../QuestionParts'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} 1+t&=2s \\ -2+3t&=3+s \\ 4-t&=-3+4s \end{aligned}" />,
    reason: <>If the lines met, some point would be on both, so for some <Katex tex="t" /> and <Katex tex="s" /> the <Katex tex="\underset{\sim}{i}" />, <Katex tex="\underset{\sim}{j}" /> and <Katex tex="\underset{\sim}{k}" /> components would all agree. Write <Katex tex="\underset{\sim}{r}_1(t)=(1+t)\underset{\sim}{i}+(-2+3t)\underset{\sim}{j}+(4-t)\underset{\sim}{k}" /> and <Katex tex="\underset{\sim}{r}_2(s)=2s\underset{\sim}{i}+(3+s)\underset{\sim}{j}+(-3+4s)\underset{\sim}{k}" /> and equate.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} t&=2s-1 \\ -2+3(2s-1)&=3+s \\ 6s-5&=3+s \\ 5s&=8\implies s=\tfrac85,\ t=\tfrac{11}{5} \end{aligned}" />,
    reason: <>Two unknowns, three equations: solve the first two, then test the third.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{LHS}&=4-\tfrac{11}{5}=\tfrac95 \\ \text{RHS}&=-3+4\left(\tfrac85\right)=\tfrac{17}{5} \\ \tfrac95&\ne\tfrac{17}{5} \end{aligned}" />,
    reason: <>The only <Katex tex="t" /> and <Katex tex="s" /> that make the <Katex tex="\underset{\sim}{i}" /> and <Katex tex="\underset{\sim}{j}" /> components match don&apos;t make the <Katex tex="\underset{\sim}{k}" /> components match, so there is no common point: the lines do not intersect.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{i}+3\underset{\sim}{j}-\underset{\sim}{k}\ne m\left(2\underset{\sim}{i}+\underset{\sim}{j}+4\underset{\sim}{k}\right)\ \text{for any } m" />,
    reason: <>Parallel lines have direction vectors that are scalar multiples. Matching the <Katex tex="\underset{\sim}{i}" /> components needs <Katex tex="m=\tfrac12" />, but then the <Katex tex="\underset{\sim}{j}" /> components would be <Katex tex="3" /> and <Katex tex="\tfrac12" />. So the lines are not parallel.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{aligned} &\text{The lines neither intersect nor are} \\ &\text{parallel, so they are skew.} \end{aligned}}" />,
    reason: <>Both conditions are needed: lines that don&apos;t meet could still be parallel. As required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} \underset{\sim}{n}&=\left(\underset{\sim}{i}+3\underset{\sim}{j}-\underset{\sim}{k}\right)\times\left(2\underset{\sim}{i}+\underset{\sim}{j}+4\underset{\sim}{k}\right) \\ &=\big(3(4)-(-1)(1)\big)\underset{\sim}{i}-\big(1(4)-(-1)(2)\big)\underset{\sim}{j} \\ &\quad+\big(1(1)-3(2)\big)\underset{\sim}{k} \\ &=13\underset{\sim}{i}-6\underset{\sim}{j}-5\underset{\sim}{k} \end{aligned}"
      />
    ),
    reason: <>The shortest segment joining two skew lines is perpendicular to <b>both</b> of them. The cross product of the two direction vectors gives a vector perpendicular to both.</>,
    more: <>Check perpendicularity with dot products: <Katex tex="13+3(-6)+(-1)(-5)=0" /> and <Katex tex="2(13)+(-6)+4(-5)=0" /> ✓.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} |\underset{\sim}{n}|&=\sqrt{13^2+(-6)^2+(-5)^2} \\ &=\sqrt{169+36+25}=\sqrt{230} \end{aligned}" />,
    reason: <>The magnitude of <Katex tex="\underset{\sim}{n}" /> is needed to turn it into the unit vector <Katex tex="\hat{\underset{\sim}{n}}=\tfrac{1}{\sqrt{230}}\underset{\sim}{n}" /> in the distance step.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &A(1,-2,4)\text{ on }L_1,\quad B(0,3,-3)\text{ on }L_2 \\ &\overrightarrow{AB}=-\underset{\sim}{i}+5\underset{\sim}{j}-7\underset{\sim}{k} \end{aligned}" />,
    reason: <>Take any point on each line: the easiest are <Katex tex="t=0" /> and <Katex tex="s=0" />. <Katex tex="\overrightarrow{AB}" /> joins the two lines, but generally not by the shortest route.</>,
  },
  {
    working: <Katex display tex="d=\frac{\left|\overrightarrow{AB}\cdot\underset{\sim}{n}\right|}{|\underset{\sim}{n}|}=\frac{|-13-30+35|}{\sqrt{230}}=\frac{8}{\sqrt{230}}" />,
    reason: <>The shortest distance is the length of the component of <Katex tex="\overrightarrow{AB}" /> along <Katex tex="\underset{\sim}{n}" /> (the direction perpendicular to both lines): the scalar resolute <Katex tex="\overrightarrow{AB}\cdot\hat{\underset{\sim}{n}}=\tfrac{\overrightarrow{AB}\cdot\underset{\sim}{n}}{|\underset{\sim}{n}|}" />, taken as a positive length.</>,
    more: <>The dot product is <Katex tex="(-1)(13)+(5)(-6)+(-7)(-5)=-13-30+35=-8" />. The sign only says which way <Katex tex="\underset{\sim}{n}" /> points relative to <Katex tex="\overrightarrow{AB}" />; a distance takes its absolute value.</>,
  },
  {
    working: <Katex display tex="\boxed{d=\frac{8}{\sqrt{230}}=\frac{4\sqrt{230}}{115}}" />,
    reason: <>VCAA gives <Katex tex="\tfrac{8}{\sqrt{230}}" />; rationalising is optional. Sanity check: <Katex tex="\sqrt{230}\approx15.2" />, so <Katex tex="d\approx0.53" />, less than <Katex tex="|\overrightarrow{AB}|=\sqrt{75}\approx8.7" />, as the shortest distance must be.</>,
  },
]

export default function SpecialistQ6_2025NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (4 marks)</p>
        <p>
          Consider the lines <Katex tex="L_1" /> and <Katex tex="L_2" /> with respective equations
        </p>
        <p>
          <Katex tex="\underset{\sim}{r}_1(t)=\underset{\sim}{i}-2\underset{\sim}{j}+4\underset{\sim}{k}+t\left(\underset{\sim}{i}+3\underset{\sim}{j}-\underset{\sim}{k}\right)" />{' '}
          and{' '}
          <Katex tex="\underset{\sim}{r}_2(s)=3\underset{\sim}{j}-3\underset{\sim}{k}+s\left(2\underset{\sim}{i}+\underset{\sim}{j}+4\underset{\sim}{k}\right)" />,
          where <Katex tex="s,t\in R" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Skew Lines"
        marks={2}
        statement={
          <>
            Show that <Katex tex="L_1" /> and <Katex tex="L_2" /> are skew, that is they do not intersect and they are not
            parallel.
          </>
        }
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Distance Between Lines"
        marks={2}
        statement={<>Find the shortest distance between <Katex tex="L_1" /> and <Katex tex="L_2" />.</>}
      >
        <Background>
          <p>
            Picture two skew lines as a pencil lying on a table and another held level above it, pointing a different way.
            The shortest gap between them is vertical: perpendicular to both pencils. So find a vector{' '}
            <Katex tex="\underset{\sim}{n}" /> perpendicular to both direction vectors (their cross product), join any point
            on one line to any point on the other, and take the part of that joining vector that lies along{' '}
            <Katex tex="\underset{\sim}{n}" />. The rest of the joining vector runs parallel to the lines and doesn&apos;t
            count towards the gap.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
