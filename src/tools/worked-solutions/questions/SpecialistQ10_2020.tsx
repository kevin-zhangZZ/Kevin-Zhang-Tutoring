// 2020 Specialist Mathematics — Exam 2, MCQ 10. VCAA examination report: 76% correct (no
// comment printed for this question). A mixing-tank differential equation where the volume is
// not constant. Question text transcribed from the original paper. Solution is original; answer
// D agrees with itute and with the NBEASTK and Dr U video walkthroughs. Distractors checked:
// V = 50 − 5t (outflow only) gives E; a fixed 50 L gives C (5m/50 = m/10); B also drops the
// 30 g/min coming in. Solving D with m(0) = 300 (sympy) gives m = 15V − 450(V/50)^{5/3},
// V = 50 − 3t, with dm/dt = 0 at t = 0 — used only by the interactive diagram.
// Interactive diagram (§15): interactives/spec-2020-mcq10-tank.tsx drains the tank with a time
// slider, adds up the volume ledger 50 + 2t − 5t, and draws the level options C and E assume.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const TankWidget = lazyWidget(() => import('../interactives/spec-2020-mcq10-tank'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 1, B: 4, C: 4, D: 76, E: 14 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dm}{dt} = (\text{rate in})-(\text{rate out})" />,
    reason: <><Katex tex="m" /> is the mass of salt, so <Katex tex="\tfrac{dm}{dt}" /> is how fast it changes, in grams per minute. Salt only changes by arriving or leaving, so split it into the two. Each rate is a flow times a concentration: <Katex tex="\tfrac{\text{L}}{\text{min}}\times\tfrac{\text{g}}{\text{L}}=\tfrac{\text{g}}{\text{min}}" />.</>,
  },
  {
    working: <Katex display tex="\text{rate in} = 2\times15 = 30 \ \text{g/min}" />,
    reason: <>"15 grams of salt per litre" is the <em>concentration</em> of what comes in, and 2 litres arrive each minute: 30 g of salt a minute. It doesn't depend on <Katex tex="m" />, so it is a constant.</>,
  },
  {
    working: <Katex display tex="V(t) = 50+2t-5t = 50-3t" />,
    reason: <>The trap. For the outflow you need the concentration <em>in the tank</em>, which depends on how much liquid is in it, and that is changing. Every minute 2 L arrive and 5 L leave, so the tank loses 3 L a minute (watch it drain in the diagram below). Volume = start + (in − out) × time, every time.</>,
  },
  {
    working: <Katex display tex="\text{concentration in the tank} = \frac{m}{50-3t} \ \text{g/L}" />,
    reason: <>"Well stirred" means the salt is spread evenly, so every litre in the tank, including each litre that flows out, holds the same <Katex tex="\tfrac{m}{V}" /> grams.</>,
  },
  {
    working: <Katex display tex="\text{rate out} = 5\times\frac{m}{50-3t} = \frac{5m}{50-3t}" />,
    reason: <>5 litres of that mixture leave each minute.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dm}{dt} = 30-\frac{5m}{50-3t}}" />,
    reason: <>Matches option <b>D</b>. Option E (14%) uses <Katex tex="50-5t" />, which counts the 5 L leaving but forgets the 2 L arriving; option C keeps the volume at 50 L (<Katex tex="\tfrac{5m}{50}=\tfrac{m}{10}" />); option B uses <Katex tex="50-5t" /> and also leaves out the 30 g/min coming in. "For a non-zero volume of mixture" restricts this to <Katex tex="t<\tfrac{50}{3}" />: at <Katex tex="t=\tfrac{50}{3}\approx16.7" /> the tank is empty and the fraction is undefined. Check at <Katex tex="t=0" />: <Katex tex="30-\tfrac{5(300)}{50}=0" />. The tank starts at 6 g/L, so salt leaves at <Katex tex="5\times6=30" /> g/min, exactly what arrives; option A's <Katex tex="\tfrac{dm}{dt}=0" /> is true only at that instant.</>,
  },
]

export default function SpecialistQ10_2020() {
  return (
    <MCQShell
      question={
        <p>
          A tank initially contains 300 grams of salt that is dissolved in 50 L of water. A
          solution containing 15 grams of salt per litre of water is poured into the tank at
          a rate of 2 L per minute and the mixture in the tank is kept well stirred. At the
          same time, 5 L of the mixture flows out of the tank per minute.
          <br />
          A differential
          equation representing the mass, <Katex tex="m" /> grams, of salt in the tank at
          time <Katex tex="t" /> minutes, for a non-zero volume of mixture, is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\frac{dm}{dt}=0" /> },
        { letter: 'B', content: <Katex tex="\frac{dm}{dt}=-\frac{5m}{50-5t}" /> },
        { letter: 'C', content: <Katex tex="\frac{dm}{dt}=30-\frac{m}{10}" /> },
        { letter: 'D', content: <Katex tex="\frac{dm}{dt}=30-\frac{5m}{50-3t}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\frac{dm}{dt}=30-\frac{5m}{50-5t}" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Why the outflow divides by 50 − 3t: the tank loses 3 L every minute">
            <TankWidget />
          </Explore>
          <WrongMethod
            title="The volume goes down by 5 L every minute"
            source="14% chose E"
            working={<Katex display tex="V = 50-5t \implies \frac{dm}{dt} = 30-\frac{5m}{50-5t}" />}
          >
            <p>
              Only the <em>net</em> flow changes the volume. 5 L leave each minute, but 2 L arrive
              too, so the tank loses 3 L a minute, not 5.
            </p>
            <p>
              A quick check catches it: <Katex tex="50-5t" /> says the tank is empty after 10
              minutes, but by then 20 L have poured in and 50 L have flowed out, leaving{' '}
              <Katex tex="50+20-50=20" /> L. Write the volume as start + (in − out) × time, and test
              it at one time before using it.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
