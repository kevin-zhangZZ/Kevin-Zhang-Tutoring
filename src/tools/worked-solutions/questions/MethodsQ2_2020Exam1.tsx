// 2020 Mathematical Methods — Exam 1, Question 2 (3 marks). Two-event probability from a Venn
// diagram or two-way table, then the same structure with algebraic probabilities. Question text
// transcribed from the original paper (no diagram given). Answers checked with sympy and against
// the VCAA examination report and itute (all give 1/10 and m = 19n − 20). Solution is original;
// the two-way tables in the working are this site's own, and the one in part b.'s examiner
// comment is the report's. Interactive diagrams (§15): part a. builds the Venn diagram and table
// from 20 cars, with a toggle showing why the report's most common wrong answer 9/400 (multiplying
// as if independent) fails (interactives/meth-2020e1-q2a-cars.tsx); part b. draws a fleet of m + n
// cars in rows of 20, so the student finds the m that makes the air-filter-only cars exactly 1 in
// 20 and sees m = 19n − 20 emerge, with the sign slip 21n − 20 failing
// (interactives/meth-2020e1-q2b-fleet.tsx).
// The report's part b. comment says students "recognised the conditional probability", but no
// conditional probability is involved: Pr(F ∩ O′) is an intersection. Kept verbatim; the working
// says so where the equation is set up.

import type { ReactNode } from 'react'
import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const CarsWidget = lazyWidget(() => import('../interactives/meth-2020e1-q2a-cars'))
const FleetWidget = lazyWidget(() => import('../interactives/meth-2020e1-q2b-fleet'))

// A two-way table: the first row and first column are headings; `hot` marks the cell asked for.
function TwoWay({ rows, hot, center }: { rows: string[][]; hot?: [number, number]; center?: boolean }) {
  return (
    <table className={`text-[13px] border-collapse my-1 ${center ? 'mx-auto' : ''}`}>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => {
              const inner = i > 0 && j > 0
              const isHot = hot !== undefined && hot[0] === i && hot[1] === j
              return (
                <td
                  key={j}
                  className={`px-2.5 py-1.5 text-center ${inner ? 'border border-gray-300 dark:border-gray-700 min-w-[3.25rem]' : ''} ${
                    isHot ? 'bg-orange-50 dark:bg-orange-950/40' : ''
                  }`}
                >
                  {cell && <Katex tex={cell} />}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function Scroll({ children }: { children: ReactNode }) {
  return <div className="overflow-x-auto">{children}</div>
}

const EXAM_A: SAExaminerStats = {
  marks: [47, 53],
  average: 0.5,
  comment: (
    <>
      Students who scored the mark for this question generally used a Venn diagram or a table. The
      most common incorrect answer was <Katex tex="\tfrac{9}{400}" />, obtained by incorrectly
      assuming that the events <Katex tex="F" /> (air filter change) and <Katex tex="O'" /> (without
      an oil change) were independent, thus using{' '}
      <Katex tex="\Pr(F\cap O')=\Pr(F)\times\Pr(O')" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [31, 39, 30],
  average: 1,
  comment: (
    <>
      Students who obtained both marks typically used a Venn diagram or a table such as:
      <Scroll>
        <TwoWay
          rows={[
            ['', 'F', "F'", ''],
            ['O', '\\frac{1}{m+n}', '', '\\frac{m}{m+n}'],
            ["O'", '0.05', '', ''],
            ['', '\\frac{n}{m+n}', '', '1'],
          ]}
        />
      </Scroll>
      While many students saw the connection to part a. of the question, many did not set up the
      correct equation or did not correctly transpose their equation to make 'm' the subject.
      Students generally recognised the conditional probability. Many did not go further than
      stating a rule.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(O) = \tfrac{17}{20}, \quad \Pr(F) = \tfrac{3}{20}, \quad \Pr(O\cap F) = \tfrac1{20}" />,
    reason: (
      <>
        Name the events (<Katex tex="O" /> oil change, <Katex tex="F" /> air filter change) and write
        down what's given. The question wants <Katex tex="\Pr(F\cap O')" />: inside{' '}
        <Katex tex="F" />, outside <Katex tex="O" />.
      </>
    ),
  },
  {
    working: (
      <Scroll>
        <TwoWay
          center
          hot={[2, 1]}
          rows={[
            ['', 'F', "F'", ''],
            ['O', '\\tfrac{1}{20}', '', '\\tfrac{17}{20}'],
            ["O'", '?', '', '\\tfrac{3}{20}'],
            ['', '\\tfrac{3}{20}', '', '1'],
          ]}
        />
      </Scroll>
    ),
    reason: (
      <>
        Totals go in the margins, and &ldquo;both&rdquo; goes where row <Katex tex="O" /> meets
        column <Katex tex="F" />. The answer is the cell under it, since the <Katex tex="F" /> column
        adds up to <Katex tex="\tfrac{3}{20}" />.
      </>
    ),
    more: (
      <>
        The report notes students who scored the mark generally used a Venn diagram or a table. The{' '}
        <Katex tex="O'" /> total is <Katex tex="1-\tfrac{17}{20}=\tfrac{3}{20}" />; it happens to
        equal <Katex tex="\Pr(F)" />, but it is a different total.
      </>
    ),
  },
  {
    working: <Katex display tex="\Pr(F\cap O') = \Pr(F)-\Pr(F\cap O)" />,
    reason: (
      <>
        <Katex tex="F" /> splits into two pieces that don't overlap, <Katex tex="F\cap O" /> and{' '}
        <Katex tex="F\cap O'" />, so the piece outside <Katex tex="O" /> is all of <Katex tex="F" />{' '}
        minus the overlap.
      </>
    ),
    more: (
      <>
        Every car needing a filter either needs oil too or doesn't, so the two pieces add up to{' '}
        <Katex tex="\Pr(F)" />. In the table this is reading down the <Katex tex="F" /> column.
      </>
    ),
  },
  {
    working: <Katex display tex="= \tfrac3{20}-\tfrac1{20} = \tfrac2{20}" />,
    reason: <>Same denominator, so just subtract.</>,
    more: (
      <>
        As cars: of 20 cars, 3 need a filter and 1 of those also needs oil, so 2 need a filter only.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\tfrac1{10} = 0.1}" />,
    reason: (
      <>
        Simplify. Either form is fine, since <Katex tex="0.1" /> is exact.
      </>
    ),
    more: (
      <>
        Check: the table's other cells are <Katex tex="\tfrac{16}{20}" /> (oil only),{' '}
        <Katex tex="\tfrac{1}{20}" /> (neither), and the four cells add to{' '}
        <Katex tex="\tfrac{1+16+2+1}{20} = 1" /> ✓.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: (
      <Scroll>
        <TwoWay
          center
          hot={[2, 1]}
          rows={[
            ['', 'F', "F'", ''],
            ['O', '1', 'm-1', 'm'],
            ["O'", 'n-1', '1', 'n'],
            ['', 'n', 'm', 'm+n'],
          ]}
        />
      </Scroll>
    ),
    reason: (
      <>
        The same table as part a. Every denominator is <Katex tex="m+n" />, so fill it with{' '}
        <em>counts</em> out of <Katex tex="m+n" /> cars: <Katex tex="m" /> need oil,{' '}
        <Katex tex="n" /> a filter, 1 both. The rest follows by subtraction.
      </>
    ),
    more: (
      <>
        Part a. is the case <Katex tex="m=17" />, <Katex tex="n=3" />. The <Katex tex="O'" /> total
        is <Katex tex="(m+n)-m=n" />, and the <Katex tex="F'" /> total is{' '}
        <Katex tex="(m+n)-n=m" />. Dividing each count by <Katex tex="m+n" /> turns it back into a
        probability.
      </>
    ),
  },
  {
    working: <Katex display tex="\Pr(F\cap O') = \frac{n-1}{m+n}" />,
    reason: (
      <>
        Divide the highlighted count by the total <Katex tex="m+n" />. This is the same subtraction
        as part a.: <Katex tex="\Pr(F)-\Pr(F\cap O) = \tfrac{n}{m+n}-\tfrac{1}{m+n}" />.
      </>
    ),
    more: (
      <>
        Don't stop at this rule: the report notes many did not go further than stating a rule. The
        question gives this probability's value, so the rule becomes an equation.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{n-1}{m+n} = 0.05 = \frac{1}{20}" />,
    reason: (
      <>
        The given 0.05 is the one fact linking <Katex tex="m" /> and <Katex tex="n" />. Writing it
        as <Katex tex="\tfrac1{20}" /> keeps everything in whole numbers.
      </>
    ),
    more: (
      <>
        The report's comment below mentions &ldquo;the conditional probability&rdquo;, but none is
        involved here: <Katex tex="\Pr(F\cap O')" /> is an intersection, not a conditional
        probability.
      </>
    ),
  },
  {
    working: <Katex display tex="20(n-1) = m+n" />,
    reason: (
      <>
        Multiply both sides by 20 and by <Katex tex="m+n" />.
      </>
    ),
    more: (
      <>
        Read it as a sentence: the whole fleet of <Katex tex="m+n" /> cars is 20 times the{' '}
        <Katex tex="n-1" /> filter-only cars, so there is one filter-only car in every 20. The
        diagram below draws this fleet in rows of 20.
      </>
    ),
  },
  {
    working: <Katex display tex="20n-20 = m+n" />,
    reason: <>Expand the brackets.</>,
    more: (
      <>
        The report writes this line as <Katex tex="20+(m+n)=20n" />, the same equation rearranged.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{m = 19n-20}" />,
    reason: (
      <>
        &ldquo;<Katex tex="m" /> in terms of <Katex tex="n" />&rdquo; means <Katex tex="m = \ldots" />{' '}
        with only <Katex tex="n" /> on the right, so subtract <Katex tex="n" /> from both sides.
      </>
    ),
    more: (
      <>
        One equation can't fix two unknowns, so the answer is a relationship: each{' '}
        <Katex tex="n" /> has its own <Katex tex="m" />. Since <Katex tex="m" /> must be a positive
        integer, <Katex tex="n\geq 2" /> (<Katex tex="n=1" /> would give <Katex tex="m=-1" />).
        Check with <Katex tex="n=2" />: <Katex tex="m=18" />, a fleet of 20 with{' '}
        <Katex tex="2-1=1" /> filter-only car, and <Katex tex="\tfrac{1}{20}=0.05" /> ✓.
      </>
    ),
  },
]

export default function MethodsQ2_2020Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (3 marks)</p>
        <p>
          A car manufacturer is reviewing the performance of its car model X. It is known that
          at any given six-month service, the probability of model X requiring an oil change
          is <Katex tex="\tfrac{17}{20}" />, the probability of model X requiring an air
          filter change is <Katex tex="\tfrac{3}{20}" /> and the probability of model X
          requiring both is <Katex tex="\tfrac{1}{20}" />.
        </p>
      </div>

      <Background title="Before You Start">
        <p>
          Translate the words before drawing anything. Let <Katex tex="O" /> be &ldquo;requires an
          oil change&rdquo; and <Katex tex="F" /> &ldquo;requires an air filter change&rdquo;.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            &ldquo;Requiring an oil change&rdquo; is <Katex tex="\Pr(O)" />: <em>all</em> the cars
            that need oil, including those that also need a filter. It is a total (a margin of the
            table), not &ldquo;oil only&rdquo;.
          </li>
          <li>
            &ldquo;Requiring both&rdquo; is <Katex tex="\Pr(O\cap F)" />, the overlap.
          </li>
          <li>
            &ldquo;An air filter change without an oil change&rdquo; is{' '}
            <Katex tex="\Pr(F\cap O')" />.
          </li>
        </ul>
        <p>
          Every probability here is out of 20, so picture 20 cars at a service: 17 need oil, 3 need
          a filter, and 1 needs both. Counting cars is easier than juggling fractions, and
          part b. works the same way with <Katex tex="m+n" /> cars.
        </p>
      </Background>

      <PartCard
        letter="a"
        topic="Venn Diagram"
        marks={1}
        statement={
          <>
            State the probability that at any given six-month service model X will require an
            air filter change without an oil change.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
        <Explore title="Picture 20 cars: an air filter without oil is the 3 air-filter cars minus the 1 needing both">
          <CarsWidget />
        </Explore>
        <WrongMethod
          title="Multiply: Pr(F) × Pr(O′)"
          source="Examiner's report: the most common incorrect answer"
          working={<Katex display tex="\begin{aligned} \Pr(F\cap O') &= \Pr(F)\times\Pr(O') \\ &= \tfrac{3}{20}\times\tfrac{3}{20} = \tfrac{9}{400} \end{aligned}" />}
        >
          <p>
            Multiplying is only allowed for <em>independent</em> events, and nothing in the question
            says these are. The numbers show they aren't: of the 3 cars that need no oil, 2 need a
            filter, which is two-thirds of them, compared with <Katex tex="\tfrac{3}{20}" /> of all the
            cars. Needing no oil makes a filter much more likely. (Or test the given numbers:{' '}
            <Katex tex="\Pr(F)\Pr(O) = \tfrac{3}{20}\times\tfrac{17}{20} = \tfrac{51}{400}" />, but{' '}
            <Katex tex="\Pr(F\cap O) = \tfrac{1}{20} = \tfrac{20}{400}" />, so <Katex tex="F" /> and{' '}
            <Katex tex="O" /> are not independent, and so neither are <Katex tex="F" /> and{' '}
            <Katex tex="O'" />.)
          </p>
          <p>
            A size check catches it too: <Katex tex="\tfrac{9}{400}" /> of 20 cars is 0.45 of a car,
            yet 2 whole cars need a filter without oil. Unless a question tells you events are
            independent, don't multiply: draw the table and subtract.
          </p>
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Probability Algebra"
        marks={2}
        statement={
          <>
            The car manufacturer is developing a new model, Y. The production goals are that
            the probability of model Y requiring an oil change at any given six-month service
            will be <Katex tex="\tfrac{m}{m+n}" />, the probability of model Y requiring an
            air filter change will be <Katex tex="\tfrac{n}{m+n}" /> and the probability of
            model Y requiring both will be <Katex tex="\tfrac{1}{m+n}" />, where{' '}
            <Katex tex="m,n\in Z^+" />.
            <br />
            Determine <Katex tex="m" /> in terms of{' '}
            <Katex tex="n" /> if the probability of model Y requiring an air filter change
            without an oil change at any given six-month service is 0.05
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Explore title="Why m + n = 20(n − 1): one air-filter-only car in every 20">
          <FleetWidget />
        </Explore>
        <WrongMethod
          title="Make an equation from any row or column of the table"
          working={<Katex display tex="1 + (m-1) = m \implies 0 = 0" />}
        >
          This is the <Katex tex="O" /> row, and its middle cell was found by subtracting within that
          same row, so the equation only says the row adds up. It is true for every{' '}
          <Katex tex="m" /> and <Katex tex="n" /> and tells you nothing. The equation has to contain
          the new information, the 0.05: use a line through that cell, the <Katex tex="F" /> column
          or the <Katex tex="O'" /> row.
        </WrongMethod>
        <WrongMethod
          title="Move n across without changing its sign"
          working={<Katex display tex="\begin{aligned} 20n-20 &= m+n \\ m &= 20n+n-20 \\ &= 21n-20 \end{aligned}" />}
        >
          The report notes many did not correctly transpose their equation to make{' '}
          <Katex tex="m" /> the subject. To move <Katex tex="+n" /> off the right-hand side, subtract{' '}
          <Katex tex="n" /> from both sides: <Katex tex="m = 20n-n-20" />. Catch slips like this by
          testing a small value. With <Katex tex="n=2" /> the wrong rule gives <Katex tex="m=22" />, a
          fleet of 24 with one filter-only car: <Katex tex="\tfrac{1}{24}" />, not{' '}
          <Katex tex="\tfrac{1}{20}" />. The correct rule gives <Katex tex="m=18" /> and{' '}
          <Katex tex="\tfrac{1}{20}" /> ✓.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
