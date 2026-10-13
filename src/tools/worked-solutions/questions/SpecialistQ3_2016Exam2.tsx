// 2016 Specialist Mathematics — Exam 2, Question 3 (11 marks).
// Two-tank mixing problem: a separable differential equation, a concentration, a derived DE,
// verifying a given solution, and solving for a concentration.
// Question text transcribed from the original paper; worked solutions below are original.
// Interactives (qualifying parts, under 40% full marks): b — tank volume vs salt vs concentration;
// d — the family of curves that all satisfy the DE, so the initial condition is a separate check;
// e — the concentration curve meeting 0.095, against the report's dy/dt = 0.095 error.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import { Cas } from '../CasRef'

const TankWidget = lazyWidget(() => import('../interactives/spec-2016e2-q3b-tank'))
const FamilyWidget = lazyWidget(() => import('../interactives/spec-2016e2-q3d-family'))
const ConcWidget = lazyWidget(() => import('../interactives/spec-2016e2-q3e-conc'))

const EXAMINER_A: SAExaminerStats = {
  marks: [29, 16, 13, 42],
  average: 1.7,
  comment: (
    <>
      A range of errors prevented students from achieving full marks for this question. There were many
      instances where students did not separate variables correctly, offering attempts such as{' '}
      <Katex tex="\int(20+t)\,dt=\int-x\,dx\Rightarrow20t+\dfrac{t^2}{2}=-\dfrac{x^2}{2}+c" />. Some students did
      not write down or evaluate the constant. Errors with constants were common among students who added a
      constant to both sides of the expression before attempting to find its value.
      <br />
      <br />
      A small number of students used definite integrals from 0 to <Katex tex="t" /> and 20 to{' '}
      <Katex tex="x" /> on the sides.
    </>
  ),
}

const EXAMINER_B: SAExaminerStats = {
  marks: [66, 34],
  average: 0.4,
  comment: (
    <>
      Many students did not demonstrate an understanding of what was required by this question. Students
      frequently found an expression for <Katex tex="\dfrac{dy}{dt}" /> rather than the concentration at
      time <Katex tex="t" />.
    </>
  ),
}

const EXAMINER_C: SAExaminerStats = {
  marks: [51, 9, 40],
  average: 0.9,
  comment: (
    <>
      This 'show that' question required students to obtain the expression{' '}
      <Katex tex="\dfrac{dy}{dt}=\dfrac13-\dfrac{y}{10+t}" /> by logical steps. Some students incorrectly
      started with the given expression with no explanation of its origin. Students frequently did not seem
      to realise that work done for Question 3b. was useful here.
    </>
  ),
}

const EXAMINER_D: SAExaminerStats = {
  marks: [41, 20, 22, 17],
  average: 1.2,
  comment:
    'Most students were able to find a correct expression for the derivative. It was not always clear how expressions for the left side simplified to the right side. Verification that the given solution satisfied the initial conditions was often absent.',
}

const EXAMINER_E: SAExaminerStats = {
  marks: [69, 8, 23],
  average: 0.6,
  comment: (
    <>
      Many students did not attempt this question. It was common to see <Katex tex="\dfrac{dy}{dt}=0.095" />{' '}
      rather than using the concentration in the equation.
    </>
  ),
}

// Dropbox share links for the tutor's video walkthrough of each part, converted to `raw=1`
// so the browser can stream them directly (Dropbox re-signs the redirect on every request,
// so this stays valid even though the resolved CDN URL is time-limited).
//
// Parts a-d point at `*-h264.mp4` — re-encoded locally from the tutor's original HEVC (h.265)
// recordings (`ffmpeg -c:v libx264 -crf 20 -c:a aac -movflags +faststart`), since HEVC isn't
// decodable by most desktop browsers, including stock Chrome on Windows (the file loads fine
// but plays back as a black frame with no sound). Part e's original was already H.264/AAC —
// just muxed as .mkv, which the browser's native <video> element won't reliably open — so
// that one was only remuxed into an .mp4 container (`ffmpeg -c copy`, instant, no
// re-encoding, identical quality). Originals are kept alongside in Dropbox.
const VIDEO = {
  a: 'https://www.dropbox.com/scl/fo/nj8fctdfyn1hpwbiqjktw/AFPkoRsTltqESy6_xFrY2nM/SM%202016/Converted/SAQ3/SAQ3a-h264.mp4?rlkey=9vak8i9afmguex76hqb71mfv8&raw=1',
  b: 'https://www.dropbox.com/scl/fo/nj8fctdfyn1hpwbiqjktw/ALrDvxpw0hoj0SRzauo1eVk/SM%202016/Converted/SAQ3/SAQ3b-h264.mp4?rlkey=9vak8i9afmguex76hqb71mfv8&raw=1',
  c: 'https://www.dropbox.com/scl/fo/nj8fctdfyn1hpwbiqjktw/AKSSHFgMlSDnatIVht_PpgU/SM%202016/Converted/SAQ3/SAQ3c-h264.mp4?rlkey=9vak8i9afmguex76hqb71mfv8&raw=1',
  d: 'https://www.dropbox.com/scl/fo/nj8fctdfyn1hpwbiqjktw/AK7JKPHRZCTiZjutp19QoOQ/SM%202016/Converted/SAQ3/SAQ3d-h264.mp4?rlkey=9vak8i9afmguex76hqb71mfv8&raw=1',
  e: 'https://www.dropbox.com/scl/fo/nj8fctdfyn1hpwbiqjktw/AFbovH14n6AotWtF4SAyMXQ/SM%202016/Converted/SAQ3/SAQ3e-h264.mp4?rlkey=9vak8i9afmguex76hqb71mfv8&raw=1',
}

export default function SpecialistQ3_2016Exam2() {
  const rowsA: WorkingRow[] = [
    {
      working: (
        <>
          <Katex display tex="\frac{dx}{dt} = -\frac{x}{20+t}" />
          <Katex display tex="\implies\; \frac{1}{x}\,\frac{dx}{dt} = -\frac{1}{20+t}" />
        </>
      ),
      reason: <>Move <Katex tex="\tfrac{x}{20+t}" /> across, then divide by <Katex tex="x" />: every <Katex tex="x" /> on the left, every <Katex tex="t" /> on the right. The DE is separable.</>,
      more: <>The report shows incorrect separations such as <Katex tex="\int(20+t)\,dt=\int-x\,dx" />. That is not legal: <Katex tex="x" /> is <em>divided</em> by <Katex tex="20+t" />, so dividing both sides by <Katex tex="x" /> leaves <Katex tex="\tfrac{1}{20+t}" />, a reciprocal, on the <Katex tex="t" /> side.</>,
    },
    {
      working: (
        <>
          <Katex display tex="\int \frac{1}{x}\,dx = -\int \frac{1}{20+t}\,dt" />
          <Katex display tex="\log_e|x| = -\log_e|20+t| + c" />
        </>
      ),
      reason: <>Integrate both sides with respect to their own variable; one constant <Katex tex="c" />, on one side, is enough.</>,
      more: <>The report notes errors from students who added a constant to both sides. Two constants <Katex tex="c_1" /> and <Katex tex="c_2" /> only ever appear as <Katex tex="c_2 - c_1" />, so they are really one constant; writing two invites mistakes when finding its value. Some students instead used definite integrals, <Katex tex="\int_{20}^{x}\tfrac1x\,dx=-\int_0^t\tfrac{1}{20+t}\,dt" />, which builds the initial condition in and gives the same answer.</>,
    },
    {
      working: <Katex display tex="\begin{aligned} &x > 0 \ (\text{always some salt}) \\ &20+t > 0 \text{ for } t \ge 0 \end{aligned}" />,
      reason: <>Both quantities are positive here, so <Katex tex="|x|=x" /> and{' '}
        <Katex tex="|20+t|=20+t" /> — the modulus signs can be dropped.</>,
    },
    {
      working: (
        <>
          <Katex display tex="\log_e x = \log_e\!\left(\frac{1}{20+t}\right) + c" />
          <Katex display tex="\implies\; x = \frac{A}{20+t}" />
        </>
      ),
      reason: <>Write <Katex tex="-\log_e(20+t)" /> as <Katex tex="\log_e\tfrac{1}{20+t}" />, then exponentiate both sides; <Katex tex="A = e^c" />.</>,
    },
    {
      working: (
        <>
          <Katex display tex="20 = \frac{A}{20}" />
          <Katex display tex="\implies\; A = 400" />
        </>
      ),
      reason: <>Initial condition: at <Katex tex="t=0" /> the tank holds <Katex tex="x=20" /> kg. (The report's equivalent is <Katex tex="c=\log_e 400" />.)</>,
      more: <>The report notes that some students never wrote down or evaluated the constant. "Find <Katex tex="x" /> in terms of <Katex tex="t" />" means a single function, so the constant must be found from the 20 kg at the start.</>,
    },
    {
      working: <Katex display tex="\boxed{x = \dfrac{400}{20+t}}" />,
      reason: <>Check: <Katex tex="x(0)=20" /> ✓, and the salt decreases towards <Katex tex="0" /> as pure water keeps flowing in, as it should.</>,
    },
  ]

  const rowsB: WorkingRow[] = [
    {
      working: <Katex display tex="\begin{aligned} \text{volume}(t) &= 100 + 20t - 10t \\ &= 100 + 10t\ \text{L} \end{aligned}" />,
      reason: <>The volume is not fixed: 20 L/min in and 10 L/min out, so it grows by 10 L each minute from 100 L.</>,
    },
    {
      working: <Katex display tex="\boxed{\text{concentration} = \dfrac{y}{100+10t}\ \text{kg/L}}" />,
      reason: <>Concentration is amount of salt ÷ volume of solution: kg ÷ L gives kg/L, the units asked for.</>,
      more: <>The report says students frequently gave <Katex tex="\tfrac{dy}{dt}" /> instead. That is a rate, how fast the amount of salt changes, in kg/min — not a concentration. The question only asks you to write down the concentration; the DE comes in part c, and it uses this expression. Any equivalent form, such as <Katex tex="\tfrac{y}{10(10+t)}" />, is fine. In the diagram below, the same 10 kg of salt gives two different concentrations.</>,
    },
  ]

  const rowsC: WorkingRow[] = [
    {
      working: <Katex display tex="\begin{aligned} \text{rate in} &= \frac{1}{60}\times 20 \\ &= \frac{1}{3}\ \text{kg/min} \end{aligned}" />,
      reason: <>Salt flows in at (kg per litre) × (litres per minute): the fixed inflow concentration times the inflow rate.</>,
    },
    {
      working: <Katex display tex="\begin{aligned} \text{rate out} &= \frac{y}{100+10t}\times 10 \\ &= \frac{y}{10+t}\ \text{kg/min} \end{aligned}" />,
      reason: <>Salt flows out at the tank's own concentration (part b) times the outflow rate, 10 L/min.</>,
      more: <>The report says many students did not realise part b was useful here. Because the tank is kept uniform by stirring, each litre that leaves carries the tank's current concentration, <Katex tex="\tfrac{y}{100+10t}" /> kg — exactly the expression from part b.</>,
    },
    {
      working: (
        <>
          <Katex display tex="\frac{dy}{dt} = \frac{1}{3} - \frac{y}{10+t}" />
          <Katex display tex="\implies\; \frac{dy}{dt} + \frac{y}{10+t} = \frac{1}{3}" />
          <Katex display tex="\text{As required.}" />
        </>
      ),
      reason: <><Katex tex="\tfrac{dy}{dt}" /> = rate in − rate out; moving the second term across gives the given equation.</>,
      more: <>In a "show that", the given equation is the destination, not the starting point: the report notes some students began with it and gave no explanation of its origin, which earns nothing. Build it from the rate in and rate out, as above.</>,
    },
  ]

  const rowsD: WorkingRow[] = [
    {
      working: (
        <Katex
          display
          tex="\begin{aligned} \frac{dy}{dt} &= \frac{(2t+20)\cdot 6(10+t) - (t^2+20t+900)\cdot 6}{[6(10+t)]^2} \\ &= \frac{6\left[(2t^2+40t+200) - (t^2+20t+900)\right]}{36(10+t)^2} \\ &= \frac{t^2+20t-700}{6(10+t)^2} \end{aligned}"
        />
      ),
      reason: <>Quotient rule with <Katex tex="u = t^2+20t+900" />, <Katex tex="v = 6(10+t)" />, <Katex tex="v' = 6" />; expand, then cancel the common 6.</>,
    },
    {
      working: (
        <Katex
          display
          tex="\begin{aligned} \frac{y}{10+t} &= \frac{t^2+20t+900}{6(10+t)(10+t)} \\ &= \frac{t^2+20t+900}{6(10+t)^2} \end{aligned}"
        />
      ),
      reason: <>The second term of the left side: dividing <Katex tex="y" /> by <Katex tex="10+t" /> gives the same denominator as <Katex tex="\tfrac{dy}{dt}" />.</>,
    },
    {
      working: (
        <Katex
          display
          tex="\begin{aligned} \text{LHS} &= \frac{t^2+20t-700}{6(10+t)^2} + \frac{t^2+20t+900}{6(10+t)^2} \\ &= \frac{2t^2+40t+200}{6(10+t)^2} \\ &= \frac{2(t+10)^2}{6(10+t)^2} \\ &= \frac{1}{3} = \text{RHS} \end{aligned}"
        />
      ),
      reason: <>Add the numerators; <Katex tex="t^2+20t+100=(t+10)^2" /> cancels with the denominator, leaving <Katex tex="\tfrac13" />, the right side.</>,
      more: <>The report says it was often unclear how the left side simplified to the right. Show each line: the sum of numerators, the factorisation, then the cancellation. A CAS can do the simplification, but a "verify" needs the steps written, ending with LHS = RHS.</>,
    },
    {
      working: (
        <>
          <Katex display tex="\begin{aligned} y(0) &= \frac{900}{6(10)} \\ &= 15 \end{aligned}" />
          <Katex display tex="\text{As required.}" />
        </>
      ),
      reason: <>The initial condition: the second tank starts with 15 kg of salt, and the given <Katex tex="y" /> gives 15 at <Katex tex="t=0" />.</>,
      more: <>The report says this check was often left out. It is needed because the DE alone is satisfied by a whole family of curves, <Katex tex="y=\tfrac{t^2+20t+100+K}{6(10+t)}=\tfrac{10+t}{6}+\tfrac{K}{6(10+t)}" /> for any constant <Katex tex="K" /> (substituting it into the left side gives <Katex tex="\tfrac13" /> exactly as above, whatever <Katex tex="K" /> is). Its starting value is <Katex tex="y(0)=\tfrac{100+K}{60}" />, and <Katex tex="y(0)=15" /> forces <Katex tex="K=800" />, the given solution. The diagram below shows the family.</>,
    },
  ]

  const rowsE: WorkingRow[] = [
    {
      working: (
        <Katex display tex="\begin{aligned} \text{concentration} &= \frac{y}{100+10t} \\ &= \frac{t^2+20t+900}{6(10+t)\cdot 10(10+t)} \\ &= \frac{t^2+20t+900}{60(10+t)^2} \end{aligned}" />
      ),
      reason: <>Concentration from part b, with <Katex tex="y" /> from part d substituted in.</>,
    },
    {
      working: (
        <>
          <Katex display tex="\frac{t^2+20t+900}{60(10+t)^2} = 0.095" />
          <Cas fn="solve">solve((t²+20t+900)/(60(10+t)²)=0.095, t) | t≥0</Cas>
        </>
      ),
      reason: <>Set the concentration (not <Katex tex="\tfrac{dy}{dt}" />) equal to 0.095 and solve on CAS, keeping <Katex tex="t \ge 0" />.</>,
      more: (
        <>
          The report's common error was <Katex tex="\tfrac{dy}{dt}=0.095" />: that is a rate in kg/min and gives <Katex tex="t\approx33.13" />, when the salt is increasing at 0.095 kg/min. By hand: with <Katex tex="u=10+t" />, <Katex tex="t^2+20t+900=u^2+800" />, so{' '}
          <Katex tex="u^2+800=5.7u^2" />, <Katex tex="u=\sqrt{800/4.7}\approx13.0466" />, <Katex tex="t\approx3.0466" />. Without the <Katex tex="t\ge0" /> restriction the CAS also gives <Katex tex="t\approx-23.05" />, which is before the process starts.
        </>
      ),
    },
    {
      working: <Katex display tex="t \approx 3.0466 \approx \boxed{3.05\ \text{minutes}}" />,
      reason: <>Correct to two decimal places, as asked.</>,
      more: <>Sensible: the concentration starts at <Katex tex="\tfrac{15}{100}=0.15" /> kg/L and falls towards the inflow's <Katex tex="\tfrac1{60}\approx0.017" /> kg/L, so it passes 0.095 early, and only once.</>,
    },
  ]

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
          <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (11 marks)</p>
          <p className="mb-3">
            A tank initially has 20&nbsp;kg of salt dissolved in 100&nbsp;L of water. Pure water flows into the
            tank at a rate of 10&nbsp;L/min. The solution of salt and water, which is kept uniform by stirring,
            flows out of the tank at a rate of 5&nbsp;L/min.
          </p>
          <p>
            If <Katex tex="x" /> kilograms is the amount of salt in the tank after <Katex tex="t" /> minutes, it
            can be shown that the differential equation relating <Katex tex="x" /> and <Katex tex="t" /> is
          </p>
          <Katex display tex="\frac{dx}{dt} + \frac{x}{20+t} = 0." className="my-2" />
        </div>
      </div>

      <PartCard letter="a" topic="Separable DE" marks={3} videoSrc={VIDEO.a} statement="Solve this differential equation to find x in terms of t." examinerReport={EXAMINER_A}>
        <WorkingTable rows={rowsA} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          A second tank initially has 15&nbsp;kg of salt dissolved in 100&nbsp;L of water. A solution of{' '}
          <Katex tex="\tfrac{1}{60}" /> kg of salt per litre flows into the tank at a rate of 20&nbsp;L/min. The
          solution of salt and water, which is kept uniform by stirring, flows out of the tank at a rate of
          10&nbsp;L/min.
        </p>
      </div>

      <PartCard
        letter="b"
        topic="Concentration"
        marks={1}
        videoSrc={VIDEO.b}
        statement="If y kilograms is the amount of salt in the tank after t minutes, write down an expression for the concentration, in kg/L, of salt in the second tank at time t."
        examinerReport={EXAMINER_B}
      >
        <WorkingTable rows={rowsB} />
        <Explore title="Same salt, different concentration: the volume keeps growing">
          <TankWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="c"
        topic="Mixing Problem"
        marks={2}
        videoSrc={VIDEO.c}
        statement={
          <>
            Show that the differential equation relating <Katex tex="y" /> and <Katex tex="t" /> is{' '}
            <Katex tex="\dfrac{dy}{dt} + \dfrac{y}{10+t} = \dfrac{1}{3}" />.
          </>
        }
        examinerReport={EXAMINER_C}
      >
        <WorkingTable rows={rowsC} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Verify Solution"
        marks={3}
        videoSrc={VIDEO.d}
        statement={
          <>
            Verify by differentiation and substitution into the left side that{' '}
            <Katex tex="y = \dfrac{t^2+20t+900}{6(10+t)}" /> satisfies the differential equation in part c. Verify
            that the given solution for <Katex tex="y" /> also satisfies the initial condition.
          </>
        }
        examinerReport={EXAMINER_D}
      >
        <WorkingTable rows={rowsD} />
        <Explore title="Many curves satisfy the DE; only one starts at 15 kg">
          <FamilyWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="e"
        topic="Solve Equation"
        marks={2}
        videoSrc={VIDEO.e}
        statement="Find when the concentration of salt in the second tank reaches 0.095 kg/L. Give your answer in minutes, correct to two decimal places."
        examinerReport={EXAMINER_E}
      >
        <WorkingTable rows={rowsE} />
        <Explore title="The concentration meets 0.095 once; dy/dt = 0.095 answers a different question">
          <ConcWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
