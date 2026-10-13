// 2016 Specialist Mathematics — Exam 1, Question 9 (3 marks). cos(x + y) from cos(x − y)
// and tan(x)tan(y). Question text transcribed from the original paper (no diagram given).
// Answer checked against the VCAA examination report. Solution is original. No lettered
// parts, so this uses the plain card layout.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, ReportShelf, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [15, 28, 13, 44],
  average: 1.9,
  comment: (
    <>
      This question was reasonably well answered, with most students using one or more
      trigonometric identities correctly. A large number of students had difficulty with the
      algebra but many persisted and answered correctly. Some used{' '}
      <Katex tex="\tan(x-y)" />, which was not always successful. Of great concern was the
      number of students who gave answers for sine or cosine that were either less than{' '}
      <Katex tex="-1" /> or greater than <Katex tex="1" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\cos(x-y) &= \cos(x)\cos(y)+\sin(x)\sin(y) \\ &= \frac35\end{aligned}" />,
    reason: <>The compound-angle identity (on the formula sheet). Note the plus sign for <Katex tex="\cos" /> of a <em>difference</em>.</>,
  },
  {
    working: <Katex display tex="\tan(x)\tan(y) = \frac{\sin(x)\sin(y)}{\cos(x)\cos(y)} = 2" />,
    reason: <>Writing the tangents as sine over cosine turns the second condition into a relationship between exactly the two products that appear in the first.</>,
    more: (
      <>
        The report notes that some students used <Katex tex="\tan(x-y)" /> instead, which was
        not always successful. That route does work up to a point. From{' '}
        <Katex tex="\sin^2+\cos^2=1" /> with <Katex tex="\cos(x-y)=\tfrac35" />,{' '}
        <Katex tex="\sin(x-y)=\pm\tfrac45" /> (sign unknown), so{' '}
        <Katex tex="\tan(x-y)=\pm\tfrac43" />. The <Katex tex="\tan" /> difference identity with{' '}
        <Katex tex="\tan(x)\tan(y)=2" /> gives
        <Katex display tex="\tan(x-y)=\frac{\tan(x)-\tan(y)}{1+2}=\pm\frac43," />
        so <Katex tex="\tan(x)-\tan(y)=\pm4" />. Then
        <Katex display tex="\begin{aligned}(\tan(x)+\tan(y))^2 &= (\tan(x)-\tan(y))^2 \\ &\quad+4\tan(x)\tan(y) \\ &= 16+8=24,\end{aligned}" />
        and <Katex tex="\tan(x+y)=\tfrac{\tan(x)+\tan(y)}{1-2}" /> gives{' '}
        <Katex tex="\tan^2(x+y)=24" />, so <Katex tex="\cos^2(x+y)=\tfrac{1}{1+24}=\tfrac1{25}" />.
        But that only gives <Katex tex="\cos(x+y)=\pm\tfrac15" /> — squaring has lost the sign.
        Recovering it needs <Katex tex="\cos(x)\cos(y)" /> again, and once you have that the
        cosine identity gives the answer directly, so working with it from the start is the
        efficient route.
      </>
    ),
  },
  {
    working: <Katex display tex="\sin(x)\sin(y) = 2\cos(x)\cos(y)" />,
    reason: <>Cross-multiplying. Now there are two equations in two unknowns: the products <Katex tex="\cos(x)\cos(y)" /> and <Katex tex="\sin(x)\sin(y)" />.</>,
    more: <>If it helps the algebra (which the report says many students found difficult), write <Katex tex="c=\cos(x)\cos(y)" /> and <Katex tex="s=\sin(x)\sin(y)" />: the equations are <Katex tex="c+s=\tfrac35" /> and <Katex tex="s=2c" />, and the answer is <Katex tex="c-s" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\cos(x)\cos(y)+2\cos(x)\cos(y) &= \frac35 \\ 3\cos(x)\cos(y) &= \frac35\end{aligned}" />,
    reason: <>Substituting <Katex tex="\sin(x)\sin(y)=2\cos(x)\cos(y)" /> into the first equation.</>,
  },
  {
    working: <Katex display tex="\cos(x)\cos(y) = \frac15, \qquad \sin(x)\sin(y) = \frac25" />,
    reason: <>Dividing by 3; then <Katex tex="\sin(x)\sin(y)" /> is double this. Check: <Katex tex="\tfrac15+\tfrac25=\tfrac35" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\cos(x+y) &= \cos(x)\cos(y)-\sin(x)\sin(y) \\ &= \frac15-\frac25\end{aligned}" />,
    reason: <>The compound-angle identity again, this time with the minus sign.</>,
  },
  {
    working: <Katex display tex="\boxed{\cos(x+y) = -\frac15}" />,
    reason: <>A cosine must lie between <Katex tex="-1" /> and <Katex tex="1" />, and <Katex tex="-\tfrac15" /> does. Always make this check on a sine or cosine answer.</>,
    more: <>The report singled out, as of great concern, the number of answers for sine or cosine that were less than <Katex tex="-1" /> or greater than <Katex tex="1" />. An answer like that is impossible, so it signals an algebra slip earlier on — go back and find it rather than leaving it.</>,
  },
]

export default function SpecialistQ9_2016Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 9 (3 marks)" always>
        <p>
          Given that <Katex tex="\cos(x-y)=\tfrac35" /> and{' '}
          <Katex tex="\tan(x)\tan(y)=2" />, find <Katex tex="\cos(x+y)" />.
        </p>
      </Background>
      <Background>
        <p>
          There is not enough information to find <Katex tex="x" /> and <Katex tex="y" />{' '}
          separately, and you do not need to. Both compound-angle identities are built from
          the same two products, <Katex tex="\cos(x)\cos(y)" /> and{' '}
          <Katex tex="\sin(x)\sin(y)" /> — so solve for those.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <ReportShelf stats={EXAM} maxMarks={3} />
    </div>
  )
}
