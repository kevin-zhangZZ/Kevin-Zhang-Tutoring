// 2019 Specialist Mathematics — Exam 2, MCQ 12. VCAA examination report: 62% correct. Which
// set of equations expresses a given vector resolute condition. Question text transcribed from
// the original paper (no diagram). Solution is original. The question is flawed (as the report
// says): the system in option A has no solution, since a resolute can never be longer than the
// vector resolved. Interactive: spec-2019-mcq12-resolute-circle, the resolute's tip confined to
// the circle with diameter OA, drawn to scale in the plane of i + j − k and 2i − 3j + k.
// WrongMethod: equating to i + j − k itself (option B).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const CircleWidget = lazyWidget(() => import('../interactives/spec-2019-mcq12-resolute-circle'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 62, B: 12, C: 12, D: 9, E: 5 },
  noAnswer: 1,
  answer: 'A',
  comment: (
    <>
      Option A gives the set of equations that can be used to obtain the values of{' '}
      <Katex tex="m" />, <Katex tex="n" /> and <Katex tex="p" />. Explicit solution would result
      in a null set as it is not possible for a result of a vector to be of greater magnitude
      than the vector itself.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\text{Vector resolute of } \underset{\sim}{a} \text{ in the direction of } \underset{\sim}{b}" />
        <Katex display tex="= \left(\underset{\sim}{a}\cdot\hat{\underset{\sim}{b}}\right)\hat{\underset{\sim}{b}} = \dfrac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{\left|\underset{\sim}{b}\right|^2}\,\underset{\sim}{b}" />
      </>
    ),
    reason: <>The question hands us a vector resolute, so write down its formula: the scalar resolute <Katex tex="\underset{\sim}{a}\cdot\hat{\underset{\sim}{b}}" /> (how far <Katex tex="\underset{\sim}{a}" /> reaches along <Katex tex="\underset{\sim}{b}" />) times the unit vector <Katex tex="\hat{\underset{\sim}{b}}" />. Writing it with <Katex tex="\left|\underset{\sim}{b}\right|^2" /> avoids square roots, since <Katex tex="\hat{\underset{\sim}{b}}" /> appears twice. Note the result is always a multiple of <Katex tex="\underset{\sim}{b}" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{a}=\underset{\sim}{i}+\underset{\sim}{j}-\underset{\sim}{k}, \qquad \underset{\sim}{b}=m\underset{\sim}{i}+n\underset{\sim}{j}+p\underset{\sim}{k}" />,
    reason: <>Naming the two vectors in the question.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = m+n-p, \qquad \left|\underset{\sim}{b}\right|^2 = m^2+n^2+p^2" />,
    reason: <>The dot product and the squared magnitude.</>,
  },
  {
    working: <Katex display tex="\dfrac{m+n-p}{m^2+n^2+p^2}\left(m\underset{\sim}{i}+n\underset{\sim}{j}+p\underset{\sim}{k}\right) = 2\underset{\sim}{i}-3\underset{\sim}{j}+\underset{\sim}{k}" />,
    reason: <>Set the resolute equal to the given vector, <Katex tex="2\underset{\sim}{i}-3\underset{\sim}{j}+\underset{\sim}{k}" />, not to <Katex tex="\underset{\sim}{i}+\underset{\sim}{j}-\underset{\sim}{k}" />, which is the vector being resolved.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\dfrac{m(m+n-p)}{m^2+n^2+p^2}=2" />
        <Katex display tex="\dfrac{n(m+n-p)}{m^2+n^2+p^2}=-3" />
        <Katex display tex="\dfrac{p(m+n-p)}{m^2+n^2+p^2}=1" />
      </>
    ),
    reason: <>Two vectors are equal only when their <Katex tex="\underset{\sim}{i}" />, <Katex tex="\underset{\sim}{j}" /> and <Katex tex="\underset{\sim}{k}" /> components are all equal, so one vector equation gives three scalar equations.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Option A}}" />,
    reason: (
      <>
        Matches option <b>A</b>. Option <b>B</b> puts the components of{' '}
        <Katex tex="\underset{\sim}{i}+\underset{\sim}{j}-\underset{\sim}{k}" /> on the right instead of the
        resolute's. The others can be ruled out on sight: in <b>C</b> and <b>E</b> the same expression{' '}
        <Katex tex="m+n-p" /> is set equal to three different numbers, which is impossible, and <b>D</b> never uses the
        given resolute <Katex tex="2\underset{\sim}{i}-3\underset{\sim}{j}+\underset{\sim}{k}" /> at all.
        <br />
        The question only asks which equations you would <em>solve</em>. As the report points out, they actually have
        no solution (the report's &ldquo;result of a vector&rdquo; means the resolute). A resolute is always parallel
        to <Katex tex="\underset{\sim}{b}" />, so <Katex tex="\underset{\sim}{b}" /> would have to be parallel to{' '}
        <Katex tex="2\underset{\sim}{i}-3\underset{\sim}{j}+\underset{\sim}{k}" />, and then the resolute is{' '}
        <Katex tex="\tfrac{-2}{14}\left(2\underset{\sim}{i}-3\underset{\sim}{j}+\underset{\sim}{k}\right)" />, not{' '}
        <Katex tex="2\underset{\sim}{i}-3\underset{\sim}{j}+\underset{\sim}{k}" />. Quicker still: a resolute can
        never be longer than the vector being resolved, and here <Katex tex="\sqrt{14}\approx3.7" /> is longer than{' '}
        <Katex tex="\left|\underset{\sim}{i}+\underset{\sim}{j}-\underset{\sim}{k}\right| = \sqrt3\approx1.7" />.
      </>
    ),
  },
]

export default function SpecialistQ12_2019() {
  return (
    <MCQShell
      question={
        <p>
          The vector resolute of <Katex tex="\underset{\sim}{i}+\underset{\sim}{j}-\underset{\sim}{k}" /> in
          the direction of <Katex tex="m\underset{\sim}{i}+n\underset{\sim}{j}+p\underset{\sim}{k}" /> is{' '}
          <Katex tex="2\underset{\sim}{i}-3\underset{\sim}{j}+\underset{\sim}{k}" />, where{' '}
          <Katex tex="m" />, <Katex tex="n" /> and <Katex tex="p" /> are real constants.
          <br />
          The values of <Katex tex="m" />, <Katex tex="n" /> and <Katex tex="p" /> can be found by
          solving the equations
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\tfrac{m(m+n-p)}{m^2+n^2+p^2}=2,\ \tfrac{n(m+n-p)}{m^2+n^2+p^2}=-3 \text{ and } \tfrac{p(m+n-p)}{m^2+n^2+p^2}=1" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\tfrac{m(m+n-p)}{m^2+n^2+p^2}=1,\ \tfrac{n(m+n-p)}{m^2+n^2+p^2}=1 \text{ and } \tfrac{p(m+n-p)}{m^2+n^2+p^2}=-1" /> },
        { letter: 'C', content: <Katex tex="m+n-p=6,\ m+n-p=-9 \text{ and } m+n-p=-3" /> },
        { letter: 'D', content: <Katex tex="m+n-p=3m,\ m+n-p=3n \text{ and } m+n-p=-3p" /> },
        { letter: 'E', content: <Katex tex="m+n-p=2\sqrt3,\ m+n-p=-3\sqrt3 \text{ and } m+n-p=\sqrt3" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Why no m, n and p can work: a resolute is never longer than the vector">
            <CircleWidget />
          </Explore>
          <WrongMethod
            title="It's the resolute of i + j − k, so the equations should equal 1, 1 and −1"
            source="12% chose B"
            working={
              <>
                <Katex display tex="\dfrac{m+n-p}{m^2+n^2+p^2}\left(m\underset{\sim}{i}+n\underset{\sim}{j}+p\underset{\sim}{k}\right)" />
                <Katex display tex="= \underset{\sim}{i}+\underset{\sim}{j}-\underset{\sim}{k}" />
              </>
            }
          >
            The left side is the resolute of <Katex tex="\underset{\sim}{i}+\underset{\sim}{j}-\underset{\sim}{k}" />;
            the right side must be what the question says that resolute <em>is</em>,{' '}
            <Katex tex="2\underset{\sim}{i}-3\underset{\sim}{j}+\underset{\sim}{k}" />. Setting it equal to the
            original vector says the resolute is the whole vector, which only happens when{' '}
            <Katex tex="\underset{\sim}{b}" /> is already parallel to it. Before equating, say it in words: &ldquo;the
            part of this vector along that one equals the given vector.&rdquo;
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
