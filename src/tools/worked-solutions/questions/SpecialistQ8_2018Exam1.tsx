// 2018 Specialist Mathematics — Exam 1, Question 8 (4 marks). A salt-tank mixing problem:
// set up the differential equation, then solve it. Question text transcribed from the
// original paper (no diagram given). Answer checked independently with sympy (dsolve with
// the initial condition) and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [56, 44],
  average: 0.5,
  comment: (
    <>
      This problem required students to recognise a difference of rates. The most common
      error was a failure to explicitly note that the rate in was zero.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [27, 12, 38, 23],
  average: 1.6,
  comment: (
    <>
      The majority of students realised that this was a separable differential equation, but
      many made errors in the subsequent integration with the arbitrary constant of
      integration frequently missing. Some students made transcription errors that
      fundamentally changed the problem.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dQ}{dt} = (\text{rate in}) - (\text{rate out})" />,
    reason: <>The standard set-up for any mixing problem. Each rate is a concentration times a flow rate, in kilograms per minute.</>,
  },
  {
    working: <Katex display tex="\text{Rate in} = 0 \ \text{kg/min}" />,
    reason: <>Pure water flows in, so it carries no salt — the inflow rate of <em>salt</em> is zero even though the inflow rate of liquid is <Katex tex="5" /> L/min. The report says failing to state this explicitly was the single most common reason for losing the mark.</>,
  },
  {
    working: <Katex display tex="V(t) = 16 + (5-3)t = 16+2t \ \text{ litres}" />,
    reason: <>The volume is <em>not</em> constant: liquid enters at <Katex tex="5" /> L/min and leaves at <Katex tex="3" /> L/min, so the tank gains <Katex tex="2" /> L every minute.</>,
  },
  {
    working: <Katex display tex="\text{Concentration} = \frac{Q}{16+2t} \ \text{ kg/L}" />,
    reason: <>The mixture is stirred continuously, so the salt is spread evenly and the outflow carries the same concentration as the tank.</>,
  },
  {
    working: <Katex display tex="\text{Rate out} = \frac{Q}{16+2t}\times 3 = \frac{3Q}{16+2t}" />,
    reason: <>Concentration times the outflow rate of <Katex tex="3" /> L/min.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dQ}{dt} = 0 - \frac{3Q}{16+2t} = -\frac{3Q}{16+2t}} \ \checkmark" />,
    reason: <>As required. Negative throughout, which is right — with no salt coming in, the amount can only fall.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{1}{Q}\,dQ = -\frac{3}{16+2t}\,dt" />,
    reason: <>Separating the variables: all the <Katex tex="Q" />s on one side, all the <Katex tex="t" />s on the other.</>,
  },
  {
    working: <Katex display tex="\int\frac{1}{Q}\,dQ = -3\int\frac{1}{16+2t}\,dt" />,
    reason: <>Integrating both sides.</>,
  },
  {
    working: <Katex display tex="\log_e(Q) = -\frac32\log_e(16+2t) + c" />,
    reason: <>The <Katex tex="\tfrac12" /> comes from the chain rule on <Katex tex="16+2t" />, giving <Katex tex="-3\times\tfrac12=-\tfrac32" />. Keep the constant — the report says it was frequently missing, and without it the initial condition cannot be applied.</>,
  },
  {
    working: <Katex display tex="Q = e^c(16+2t)^{-3/2} = \frac{A}{(16+2t)^{3/2}}" />,
    reason: <>Exponentiating both sides and writing <Katex tex="A=e^c" /> for the new constant.</>,
  },
  {
    working: <Katex display tex="t=0,\ Q=0.5: \quad \frac12 = \frac{A}{16^{3/2}} = \frac{A}{64}" />,
    reason: <>The initial condition: <Katex tex="0.5" /> kg of salt in the tank at the start. Note <Katex tex="16^{3/2}=\left(\sqrt{16}\right)^3=4^3=64" />.</>,
  },
  {
    working: <Katex display tex="A = 32" />,
    reason: <>Solving for the constant.</>,
  },
  {
    working: <Katex display tex="\boxed{Q = \frac{32}{(16+2t)^{3/2}}}" />,
    reason: <>The required form <Katex tex="\tfrac{a}{(16+2t)^{b/c}}" /> with <Katex tex="a=32" />, <Katex tex="b=3" />, <Katex tex="c=2" />, all positive integers. Two checks: at <Katex tex="t=0" />, <Katex tex="Q=\tfrac{32}{64}=0.5" /> ✓, and <Katex tex="Q\to0" /> as <Katex tex="t\to\infty" />, which is right since fresh water keeps flushing salt out.</>,
  },
]

export default function SpecialistQ8_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 8 (4 marks)</p>
        <p>
          A tank initially holds <Katex tex="16" /> L of water in which <Katex tex="0.5" /> kg
          of salt has been dissolved. Pure water then flows into the tank at a rate of{' '}
          <Katex tex="5" /> L per minute. The mixture is stirred continuously and flows out of
          the tank at a rate of <Katex tex="3" /> L per minute.
        </p>
      </div>

      <PartCard letter="a" marks={1} statement={<>Show that the differential equation for <Katex tex="Q" />, the number of kilograms of salt in the tank after <Katex tex="t" /> minutes, is given by <Katex tex="\dfrac{dQ}{dt}=-\dfrac{3Q}{16+2t}" />.</>} examinerReport={EXAM_A}>
        <Background>
          <p>
            Two details make this problem the shape it is. The water coming in is{' '}
            <em>pure</em>, so the rate of salt entering is zero — say so, because that is the
            mark. And the inflow exceeds the outflow, so the volume grows steadily rather
            than staying at <Katex tex="16" /> L; that growing denominator is what puts the{' '}
            <Katex tex="16+2t" /> into the equation.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" marks={3} statement={<>Solve the differential equation given in part a. to find <Katex tex="Q" /> as a function of <Katex tex="t" />. Express your answer in the form <Katex tex="Q=\dfrac{a}{(16+2t)^{b/c}}" />, where <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="c" /> are positive integers.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
