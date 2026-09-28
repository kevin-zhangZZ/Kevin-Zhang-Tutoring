// 2018 Specialist Mathematics — Exam 2, MCQ 14. VCAA examination report: 75% correct. The
// scalar resolute of one vector in the direction of another. Question text transcribed from
// the original paper; VCAA printed no diagram and neither does the stem here (guide §7).
// Value checked in sympy and agrees with itute. Solution is original.
//
// Every distractor re-derived in sympy: A = −9/√13 (b resolved onto a), B = the vector
// resolute of a on b, D = the vector resolute of b on a, E = −7/√14 = −√14/2 (a misread as
// 3i − 2j, so a·b = −3 − 4 = −7). The report makes no comment beyond the percentages.
//
// Interactive (extras): interactives/spec-2018-mcq14-shadow — a and b drawn in their own plane
// at true length and angle; the scalar resolute is the signed length of a's shadow on the line
// of b. Toggles produce options A, B and D.
// WrongMethods: the vector resolute (11% chose B) and the misread k-component (7% chose E).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const Shadow = lazyWidget(() => import('../interactives/spec-2018-mcq14-shadow'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 11, C: 75, D: 3, E: 7 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\hat{\underset{\sim}{b}} = \frac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{\left|\underset{\sim}{b}\right|}" />,
    reason: <>The scalar resolute of <Katex tex="\underset{\sim}{a}" /> in the direction of <Katex tex="\underset{\sim}{b}" /> is how far <Katex tex="\underset{\sim}{a}" /> reaches along <Katex tex="\underset{\sim}{b}" />: the signed length of its shadow. The vector after &ldquo;in the direction of&rdquo; is the ruler, so it is the one turned into a unit vector.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{a} = 3\underset{\sim}{i} + 0\underset{\sim}{j} - 2\underset{\sim}{k}" />,
    reason: <><Katex tex="\underset{\sim}{a}" /> has no <Katex tex="\underset{\sim}{j}" /> term. Writing the <Katex tex="0" /> in lines the components up, so the <Katex tex="-2" /> is multiplied by <Katex tex="\underset{\sim}{b}" />&apos;s <Katex tex="\underset{\sim}{k}" /> component and not its <Katex tex="\underset{\sim}{j}" /> one.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = (3)(-1)+(0)(2)+(-2)(3) = -9" />,
    reason: <>Multiply matching components and add. The result is negative, so the angle between the vectors is obtuse: <Katex tex="\underset{\sim}{a}" />&apos;s shadow falls <em>behind</em> <Katex tex="\underset{\sim}{b}" /> and the resolute will be negative.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{b}\right| = \sqrt{(-1)^2+2^2+3^2} = \sqrt{14}" />,
    reason: <>The length of the ruler <Katex tex="\underset{\sim}{b}" />, not of <Katex tex="\underset{\sim}{a}" />.</>,
  },
  {
    working: <Katex display tex="\frac{-9}{\sqrt{14}} = -\frac{9\sqrt{14}}{14}" />,
    reason: <>Rationalise the denominator to match the form of the options.</>,
  },
  {
    working: <Katex display tex="\boxed{-\frac{9\sqrt{14}}{14}}" />,
    reason: <>Matches option <b>C</b>. Option <b>B</b>, chosen by <Katex tex="11\%" />, is the <em>vector</em> resolute, and option <b>E</b> (<Katex tex="7\%" />) comes from reading the <Katex tex="-2" /> as a <Katex tex="\underset{\sim}{j}" /> component (both below). Option <b>A</b> divides by <Katex tex="\sqrt{13}=\left|\underset{\sim}{a}\right|" />, resolving <Katex tex="\underset{\sim}{b}" /> onto <Katex tex="\underset{\sim}{a}" /> instead, and option <b>D</b> is the vector version of that.</>,
  },
]

export default function SpecialistQ14_2018() {
  return (
    <MCQShell
      question={
        <p>
          The scalar resolute of{' '}
          <Katex tex="\underset{\sim}{a}=3\underset{\sim}{i}-2\underset{\sim}{k}" /> in the
          direction of{' '}
          <Katex tex="\underset{\sim}{b}=-\underset{\sim}{i}+2\underset{\sim}{j}+3\underset{\sim}{k}" />{' '}
          is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-\dfrac{9\sqrt{13}}{13}" /> },
        { letter: 'B', content: <Katex tex="-\dfrac{9}{14}\left(-\underset{\sim}{i}+2\underset{\sim}{j}+3\underset{\sim}{k}\right)" /> },
        { letter: 'C', content: <Katex tex="-\dfrac{9\sqrt{14}}{14}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="-\dfrac{9}{13}\left(3\underset{\sim}{i}-2\underset{\sim}{k}\right)" /> },
        { letter: 'E', content: <Katex tex="-\dfrac{\sqrt{14}}{2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Scalar resolute versus vector resolute">
          <p>
            Shine a light straight down onto the line of <Katex tex="\underset{\sim}{b}" />.
            The shadow of <Katex tex="\underset{\sim}{a}" /> has length{' '}
            <Katex tex="\left|\underset{\sim}{a}\right|\cos\theta" />, and since{' '}
            <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b}=\left|\underset{\sim}{a}\right|\left|\underset{\sim}{b}\right|\cos\theta" />,
            that is the dot product divided by <Katex tex="\left|\underset{\sim}{b}\right|" />.
          </p>
          <p>
            <b>Scalar</b> resolute:{' '}
            <Katex tex="\dfrac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{\left|\underset{\sim}{b}\right|}" />{' '}
            — a single number, the signed length of the shadow (negative when{' '}
            <Katex tex="\theta" /> is obtuse).
          </p>
          <p>
            <b>Vector</b> resolute:{' '}
            <Katex tex="\dfrac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{\left|\underset{\sim}{b}\right|^2}\underset{\sim}{b}" />{' '}
            — the shadow itself, an arrow along the line of <Katex tex="\underset{\sim}{b}" />.
          </p>
          <p>
            Both start from the same dot product and the options include both, so reading
            &ldquo;scalar&rdquo; and noting <em>which</em> vector follows &ldquo;in the direction
            of&rdquo; decide the mark.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="The scalar resolute is the signed length of a's shadow on b">
            <Shadow />
          </Explore>
          <WrongMethod
            title="The resolute of a on b is (a·b / |b|²) b"
            source="11% chose B"
            working={
              <Katex
                display
                tex="\frac{-9}{14}\left(-\underset{\sim}{i}+2\underset{\sim}{j}+3\underset{\sim}{k}\right)"
              />
            }
          >
            <p>
              That formula is the <b>vector</b> resolute: the shadow as an arrow. The question
              asks for the <b>scalar</b> resolute, a number. The two are linked: the scalar
              resolute is the arrow&apos;s length,{' '}
              <Katex tex="\tfrac{9}{14}\times\sqrt{14}=\tfrac{9}{\sqrt{14}}" />, with a minus sign
              because the arrow points against <Katex tex="\underset{\sim}{b}" />.
            </p>
            <p>
              To catch it: a scalar answer cannot contain <Katex tex="\underset{\sim}{i}" />,{' '}
              <Katex tex="\underset{\sim}{j}" /> or <Katex tex="\underset{\sim}{k}" />.
            </p>
          </WrongMethod>
          <WrongMethod
            title="a = 3i − 2k, so its components are 3 and −2"
            source="7% chose E"
            working={
              <>
                <Katex display tex="(3)(-1)+(-2)(2)=-7" />
                <Katex display tex="\frac{-7}{\sqrt{14}}=-\frac{\sqrt{14}}{2}" />
              </>
            }
          >
            <p>
              Pairing the <Katex tex="-2" /> with <Katex tex="\underset{\sim}{b}" />&apos;s second
              number treats it as a <Katex tex="\underset{\sim}{j}" /> component. It belongs to{' '}
              <Katex tex="\underset{\sim}{k}" />, so it multiplies <Katex tex="3" />, not{' '}
              <Katex tex="2" />, and <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b}=-3-6=-9" />.
            </p>
            <p>
              To catch it: write every vector with all three components,{' '}
              <Katex tex="3\underset{\sim}{i}+0\underset{\sim}{j}-2\underset{\sim}{k}" />, before
              taking a dot product.
            </p>
          </WrongMethod>
        </>
      }
    />
  )
}
