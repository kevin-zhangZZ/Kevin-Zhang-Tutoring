// 2020 Specialist Mathematics — Exam 2, MCQ 14. VCAA examination report: 76% correct (no
// comment printed for this question). The word "force" is dressing; the mathematics is a scalar
// resolute, which is current Specialist content. Question text transcribed from the original
// paper. Solution is original; 92/7 (B) agrees with itute and the NBEASTK walkthrough. Checked in
// sympy: F · d = 92, |d| = 7, |F| = 19, angle ≈ 46.2°. Distractors checked: A is F · d / |F|
// (92/19 exactly); D is F · d divided by 2 + 3 + 6 = 11 (92/11 exactly). No clean slip found for
// C or E, so they are not named.
// Interactive diagram (§15): interactives/spec-2020-mcq14-shadow.tsx draws the plane of F and d
// flat and to scale, with F's shadow on the line of d; stretching d leaves the shadow unchanged,
// and a toggle shows option A's F · d / |F| as the shadow of d on F instead.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const ShadowWidget = lazyWidget(() => import('../interactives/spec-2020-mcq14-shadow'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 76, C: 8, D: 5, E: 3 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{scalar resolute} = \frac{\underset{\sim}{F}\cdot\underset{\sim}{d}}{\left|\underset{\sim}{d}\right|}" />,
    reason: (
      <>
        "The component of <Katex tex="\underset{\sim}{F}" /> in the direction of{' '}
        <Katex tex="\underset{\sim}{d}" />" is the scalar resolute: the length of{' '}
        <Katex tex="\underset{\sim}{F}" />'s shadow on the line of{' '}
        <Katex tex="\underset{\sim}{d}" />, <Katex tex="|\underset{\sim}{F}|\cos\theta" />.
        Since <Katex tex="\underset{\sim}{F}\cdot\underset{\sim}{d}=|\underset{\sim}{F}||\underset{\sim}{d}|\cos\theta" />,
        dividing by <Katex tex="|\underset{\sim}{d}|" /> leaves exactly that. Divide by the
        length of the vector you are projecting <em>onto</em>: only its direction matters.
      </>
    ),
  },
  {
    working: <Katex display tex="\underset{\sim}{F}\cdot\underset{\sim}{d} = (1)(2)+(6)(-3)+(-18)(-6)" />,
    reason: <>Multiply matching components and add. Write the brackets in: the signs are where marks are lost.</>,
  },
  {
    working: <Katex display tex="= 2-18+108 = 92" />,
    reason: <>The two negatives in the last term make it positive.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{d}\right| = \sqrt{2^2+3^2+6^2} = \sqrt{49} = 7" />,
    reason: (
      <>
        Pythagoras in three dimensions. 2, 3, 6, 7 is a Pythagorean quadruple worth
        recognising. Adding <Katex tex="2+3+6=11" /> instead of squaring gives option D,{' '}
        <Katex tex="\tfrac{92}{11}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\frac{92}{7}}" />,
    reason: (
      <>
        Matches option <b>B</b>. The question asks for the magnitude, but{' '}
        <Katex tex="\tfrac{92}{7}" /> is already positive (the angle between{' '}
        <Katex tex="\underset{\sim}{F}" /> and <Katex tex="\underset{\sim}{d}" /> is acute, about{' '}
        <Katex tex="46^\circ" />), so it is its own magnitude.
      </>
    ),
  },
]

export default function SpecialistQ14_2020() {
  return (
    <MCQShell
      question={
        <p>
          The magnitude of the component of the force{' '}
          <Katex tex="\underset{\sim}{F}=\underset{\sim}{i}+6\underset{\sim}{j}-18\underset{\sim}{k}" />{' '}
          that acts in the direction{' '}
          <Katex tex="\underset{\sim}{d}=2\underset{\sim}{i}-3\underset{\sim}{j}-6\underset{\sim}{k}" />{' '}
          is
        </p>
      }
      background={
        <Background title="Scalar resolutes, and the force wording">
          <p>
            The <b>scalar resolute</b> of <Katex tex="\underset{\sim}{F}" /> in the direction of{' '}
            <Katex tex="\underset{\sim}{d}" /> is{' '}
            <Katex tex="\underset{\sim}{F}\cdot\hat{\underset{\sim}{d}}=\dfrac{\underset{\sim}{F}\cdot\underset{\sim}{d}}{|\underset{\sim}{d}|}=|\underset{\sim}{F}|\cos\theta" />:
            how much of <Katex tex="\underset{\sim}{F}" /> points along{' '}
            <Katex tex="\underset{\sim}{d}" />. It is negative when the angle is obtuse, which is
            why a question asking for a "magnitude" takes its absolute value. The vector resolute
            is that number times <Katex tex="\hat{\underset{\sim}{d}}" />.
          </p>
          <p>
            Mechanics is no longer an area of study in Specialist Mathematics, but nothing
            in this question depends on it. Delete the word "force" and you have a scalar
            resolute of one vector along another — squarely current content, and worth
            doing.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="\frac{92}{19}" /> },
        { letter: 'B', content: <Katex tex="\frac{92}{7}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\frac{124}{7}" /> },
        { letter: 'D', content: <Katex tex="\frac{92}{11}" /> },
        { letter: 'E', content: <Katex tex="\frac{18}{7}" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="The component along d is F's shadow on the line of d">
            <ShadowWidget />
          </Explore>
          <WrongMethod
            title="Divide the dot product by |F|"
            source="8% chose A"
            working={<Katex display tex="\frac{\underset{\sim}{F}\cdot\underset{\sim}{d}}{|\underset{\sim}{F}|}=\frac{92}{\sqrt{1+36+324}}=\frac{92}{19}" />}
          >
            <p>
              <Katex tex="\dfrac{\underset{\sim}{F}\cdot\underset{\sim}{d}}{|\underset{\sim}{F}|}=|\underset{\sim}{d}|\cos\theta" />,
              the shadow of <Katex tex="\underset{\sim}{d}" /> on the line of{' '}
              <Katex tex="\underset{\sim}{F}" />: the question turned round. It also changes if{' '}
              <Katex tex="\underset{\sim}{d}" /> is replaced by{' '}
              <Katex tex="2\underset{\sim}{d}" />, which points the same way, so it can't be
              "the component in the direction of <Katex tex="\underset{\sim}{d}" />".
            </p>
            <p>
              To catch it, say the rule as "divide by the length of the direction", and ask which
              vector only supplies a direction. Here that is <Katex tex="\underset{\sim}{d}" />.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
