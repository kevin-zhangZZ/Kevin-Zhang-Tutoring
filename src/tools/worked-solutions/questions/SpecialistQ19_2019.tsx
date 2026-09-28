// 2019 Specialist Mathematics — Exam 2, MCQ 19. VCAA examination report: 75% correct. Finding
// coefficients in a linear combination of two independent random variables from its mean and
// variance. Question text transcribed from the original paper (no diagram).
// Solution is original. Answer C checked with sympy: 4a + 4b = 8 and 9a² + 9b² = 90 give
// (a, b) = (3, −1) or (−1, 3). The VCAA report prints no comment for this question; itute agrees (C).
// Each option checked for mean and variance: A (1, 1) gives 8 and 18; B (4, −2) and E (−2, 4) give
// 8 and 180; C gives 8 and 90; D (1, 3), chosen by 11%, gives the right variance 90 but mean 16.
// Interactive diagram (§15): interactives/spec-2019-mcq19-line-circle.tsx plots the mean condition
// as the line a + b = 2 and the variance condition as the circle a² + b² = 10 in the (a, b) plane,
// with a draggable (a, b), the five options marked, and live E(Z) and Var(Z) readouts. This site's
// own figure; VCAA printed no diagram for this question.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const LineCircleWidget = lazyWidget(() => import('../interactives/spec-2019-mcq19-line-circle'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 6, C: 75, D: 11, E: 3 },
  noAnswer: 1,
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="E(Z)=aE(X)+bE(Y)=4a+4b" />,
    reason: <>Two unknowns need two equations, and the question gives exactly two facts about <Katex tex="Z" />: its mean and its variance. Start with the mean. Expected value is linear, so the constants come straight out.</>,
  },
  {
    working: <Katex display tex="4a+4b=8 \implies a+b=2 \qquad (1)" />,
    reason: <>Setting the mean equal to <Katex tex="8" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\operatorname{Var}(Z)=a^2\operatorname{Var}(X)+b^2\operatorname{Var}(Y)" />
        <Katex display tex="=9a^2+9b^2" />
      </>
    ),
    reason: <>This rule needs <b>independence</b>, which is given. The coefficients come out <b>squared</b> because variance measures squared distances from the mean: multiplying <Katex tex="X" /> by <Katex tex="a" /> multiplies every distance by <Katex tex="a" />, so every squared distance by <Katex tex="a^2" />. That is also why the variances always add, even if <Katex tex="b" /> turns out negative.</>,
  },
  {
    working: <Katex display tex="9a^2+9b^2=90 \implies a^2+b^2=10 \qquad (2)" />,
    reason: <>Setting the variance equal to <Katex tex="90" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="(1)\colon\ b=2-a" />
        <Katex display tex="(2)\colon\ a^2+(2-a)^2=10" />
      </>
    ),
    reason: <>One linear equation and one quadratic: make one variable the subject of the linear equation and substitute it into the quadratic, exactly as you would to find where a line meets a circle. That is what this is, as the diagram below shows.</>,
  },
  {
    working: (
      <>
        <Katex display tex="2a^2-4a+4=10" />
        <Katex display tex="a^2-2a-3=0" />
      </>
    ),
    reason: <>Expanding <Katex tex="(2-a)^2=4-4a+a^2" />, collecting terms and dividing by <Katex tex="2" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="(a-3)(a+1)=0" />
        <Katex display tex="a=3,\ b=-1 \ \text{ or } \ a=-1,\ b=3" />
      </>
    ),
    reason: <>Each value of <Katex tex="a" /> gives its <Katex tex="b" /> from <Katex tex="b=2-a" />. Two solutions, because a line can cross a circle twice.</>,
  },
  {
    working: <Katex display tex="\boxed{a=3,\ b=-1}" />,
    reason: <>Matches option <b>C</b>; the other solution, <Katex tex="a=-1,\ b=3" />, is not offered. Testing each option against both (1) and (2) is a quick exam alternative: <b>A</b>, <b>B</b> and <b>E</b> satisfy (1) but give variances <Katex tex="18" />, <Katex tex="180" /> and <Katex tex="180" />; <b>D</b> satisfies (2) but gives a mean of <Katex tex="16" />.</>,
  },
]

export default function SpecialistQ19_2019() {
  return (
    <MCQShell
      question={
        <p>
          <Katex tex="X" /> and <Katex tex="Y" /> are independent random variables where each has
          a mean of <Katex tex="4" /> and a variance of <Katex tex="9" />.
          <br />
          If the random variable{' '}
          <Katex tex="Z=aX+bY" /> has a mean of <Katex tex="8" /> and a variance of{' '}
          <Katex tex="90" />, possible values of <Katex tex="a" /> and <Katex tex="b" /> are
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="a=1,\ b=1" /> },
        { letter: 'B', content: <Katex tex="a=4,\ b=-2" /> },
        { letter: 'C', content: <Katex tex="a=3,\ b=-1" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="a=1,\ b=3" /> },
        { letter: 'E', content: <Katex tex="a=-2,\ b=4" /> },
      ]}
      background={
        <Background title="Mean and variance of a linear combination">
          <p>For any random variables <Katex tex="X" /> and <Katex tex="Y" /> and constants <Katex tex="a" /> and <Katex tex="b" />,</p>
          <Katex display tex="E(aX+bY)=aE(X)+bE(Y)" />
          <p>If <Katex tex="X" /> and <Katex tex="Y" /> are also <b>independent</b>,</p>
          <Katex display tex="\operatorname{Var}(aX+bY)=a^2\operatorname{Var}(X)+b^2\operatorname{Var}(Y)" />
          <p>
            For example, <Katex tex="\operatorname{Var}(X-Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)" />: subtracting a
            random quantity still adds its uncertainty.
          </p>
        </Background>
      }
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <>
          <Explore title="The mean gives a line, the variance a circle: the answer is where they cross">
            <LineCircleWidget />
          </Explore>
          <WrongMethod
            title="1² + 3² = 10, so a = 1 and b = 3"
            source="11% chose D"
            working={
              <>
                <Katex display tex="9a^2+9b^2=90 \implies a^2+b^2=10" />
                <Katex display tex="1^2+3^2=10 \implies a=1,\ b=3" />
                <Katex display tex="\text{(option D)}" />
              </>
            }
          >
            <p>
              This pair does give the right variance, <Katex tex="9(1)^2+9(3)^2=90" />, but its mean is{' '}
              <Katex tex="4(1)+4(3)=16" />, not <Katex tex="8" />. One equation in two unknowns has infinitely many solutions (a
              whole circle of them), so finding one pair that fits it proves nothing. Only the pairs that fit <em>both</em>{' '}
              conditions are answers.
            </p>
            <p>
              To catch it: before you commit, check your chosen option against every piece of information in the question.
              Here that takes ten seconds.
            </p>
          </WrongMethod>
        </>
      }
    />
  )
}
