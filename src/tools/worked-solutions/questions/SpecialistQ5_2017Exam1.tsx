// 2017 Specialist Mathematics — Exam 1, Question 5 (4 marks). The angle at C between CB
// and CD, solved for a parameter in one of the position vectors. Question text transcribed
// from the original paper (no diagram given). Answer checked with sympy and against the
// VCAA examination report. Solution is original. No lettered parts, so this uses the plain
// card layout.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [25, 5, 45, 13, 11],
  average: 1.8,
  comment: (
    <>
      A broad spread of levels of achievement was seen for this question. Most students were
      able to make some progress but many had some difficulties. The majority knew that they
      needed to find to vectors involving <Katex tex="C" /> and attempt to use the dot product
      to find the unknown, though some algebra when finding the dot product was poor. The most
      common errors involved finding the dot product of two (or sometimes all three) of the
      given vectors, not understanding that when finding the angle between vectors they need
      to be tail to tail and therefore working with <Katex tex="\overrightarrow{BC}" /> and{' '}
      <Katex tex="\overrightarrow{CD}" />. Some used the correct application of the dot product
      or cosine rule but poor algebra led to an incorrect equation for <Katex tex="a" />,
      others correctly found <Katex tex="a=\pm2" /> from the surd equation but did not
      eliminate <Katex tex="a=2" /> or incorrectly eliminated <Katex tex="a=-2" />. Many
      students did not know their exact values. Notation was often poor, with students not
      showing the dot or using another symbol. A large number of students struggled with the
      algebra. A number of students incorrectly solved <Katex tex="x^2=4" /> to get{' '}
      <Katex tex="x=\pm\sqrt2" /> or similar.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\overrightarrow{CB} = \underset{\sim}{b}-\underset{\sim}{c} = -\underset{\sim}{i}+\underset{\sim}{k}" />,
    reason: <>The angle is <em>at</em> <Katex tex="C" />, so both vectors must start there — tail to tail. Using <Katex tex="\underset{\sim}{b}" /> and <Katex tex="\underset{\sim}{c} " /> themselves gives the angle at the origin instead, which is the report's headline error.</>,
  },
  {
    working: <Katex display tex="\overrightarrow{CD} = \underset{\sim}{d}-\underset{\sim}{c} = (a-2)\underset{\sim}{i}-\underset{\sim}{j}-\underset{\sim}{k}" />,
    reason: <>Component by component: <Katex tex="a-2" />, <Katex tex="-2-(-1)=-1" />, <Katex tex="0-1=-1" />.</>,
  },
  {
    working: <Katex display tex="\overrightarrow{CB}\cdot\overrightarrow{CD} = -(a-2)+0+(-1) = 1-a" />,
    reason: <>Dot product: multiply matching components and add.</>,
  },
  {
    working: <Katex display tex="\left|\overrightarrow{CB}\right|=\sqrt2, \qquad \left|\overrightarrow{CD}\right|=\sqrt{(a-2)^2+2}" />,
    reason: <>Magnitudes.</>,
  },
  {
    working: <Katex display tex="\cos\!\left(\frac{\pi}{3}\right)=\frac12=\frac{1-a}{\sqrt2\,\sqrt{(a-2)^2+2}}" />,
    reason: <>The dot-product formula rearranged. Note <Katex tex="\cos\tfrac{\pi}{3}=\tfrac12" /> — the report says exact values tripped several students up.</>,
  },
  {
    working: <Katex display tex="1-a>0 \implies a<1" />,
    reason: <>The right-hand side must be positive because <Katex tex="\tfrac12" /> is. Note this <em>before</em> squaring — it is what decides between the two roots at the end.</>,
  },
  {
    working: <Katex display tex="4(1-a)^2 = 2\bigl((a-2)^2+2\bigr)" />,
    reason: <>Squaring both sides of <Katex tex="2(1-a)=\sqrt2\sqrt{(a-2)^2+2}" />.</>,
  },
  {
    working: <Katex display tex="2-4a+2a^2 = a^2-4a+6" />,
    reason: <>Expanding and halving.</>,
  },
  {
    working: <Katex display tex="a^2=4 \implies a=\pm2" />,
    reason: <>The <Katex tex="-4a" /> terms cancel on both sides, which is why the quadratic collapses so neatly.</>,
  },
  {
    working: <Katex display tex="\boxed{a=-2}" />,
    reason: <>Reject <Katex tex="a=2" /> because it fails <Katex tex="a<1" /> — with <Katex tex="a=2" /> the dot product would be <Katex tex="-1" />, giving an obtuse angle, not <Katex tex="\tfrac{\pi}{3}" />. Squaring always needs this check.</>,
  },
]

export default function SpecialistQ5_2017Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 5 (4 marks)">
        <p>
          Relative to a fixed origin, the points <Katex tex="B" />, <Katex tex="C" /> and{' '}
          <Katex tex="D" /> are defined respectively by the position vectors{' '}
          <Katex tex="\underset{\sim}{b}=\underset{\sim}{i}-\underset{\sim}{j}+2\underset{\sim}{k}" />
          ,{' '}
          <Katex tex="\underset{\sim}{c}=2\underset{\sim}{i}-\underset{\sim}{j}+\underset{\sim}{k}" />{' '}
          and{' '}
          <Katex tex="\underset{\sim}{d}=a\underset{\sim}{i}-2\underset{\sim}{j}" />, where{' '}
          <Katex tex="a" /> is a real constant.
        </p>
        <p>
          Given that the magnitude of angle <Katex tex="BCD" /> is <Katex tex="\tfrac{\pi}{3}" />
          , find <Katex tex="a" />.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <SAExaminerReport stats={EXAM} maxMarks={4} />
      <div>
        <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">Video Walkthrough</p>
        <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
      </div>
    </div>
  )
}
