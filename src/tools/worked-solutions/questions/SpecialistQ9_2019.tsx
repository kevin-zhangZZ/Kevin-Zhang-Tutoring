// 2019 Specialist Mathematics — Exam 2, MCQ 9. VCAA examination report: 57% correct.
// Matching a direction field diagram to its differential equation. Question text and diagram
// transcribed from the original paper (the diagram is the actual VCAA figure, cropped from
// the official exam PDF, not a redrawing). Solution is original. Checked against the figure:
// the marks on y = x have gradient 1 (e.g. at (1, 1), (2, 2)) and the flat marks lie on
// y − x ≈ ±1.5, i.e. ±π/2. Interactive (extras): spec-2019-mcq9-fields — draws each option's
// field with a draggable probe; A/C flat on y = x, E vertical there, D never flat, B matches.
// WrongMethods: D passes the origin test (16% chose D); A/C from the stripes alone (12% C, 10% A).
// The report has no comment on this question beyond the statistics.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import dirFieldSrc from './spec-2019-mcq9-dirfield.png'

const FieldsWidget = lazyWidget(() => import('../interactives/spec-2019-mcq9-fields'))

const DIAGRAM = (
  <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-3 w-fit">
    <img loading="lazy" decoding="async"
      src={dirFieldSrc}
      alt="A direction field on axes from -8 to 8, banded diagonally: constant along lines y-x=k, with horizontal tangent marks offset from the y=x diagonal rather than sitting on it"
      className="w-full max-w-[440px]"
    />
  </div>
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 57, C: 12, D: 16, E: 5 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\frac{dy}{dx}=f(y-x)" />
        <Katex display tex="\implies \text{slope constant on } y-x=c" />
      </>
    ),
    reason: <>The field repeats along every line of gradient <Katex tex="1" />, because each option depends only on <Katex tex="y-x" />. All five options have this form, so the stripes on their own separate nothing. What does separate them is <em>which</em> stripe is flat, steep or vertical, so test a line where every option is easy to evaluate.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{On } y=x:\ \ y-x=0" />
        <Katex display tex="\text{A, C: } \sin(0)=0 \qquad \text{E: } \tfrac{1}{\sin(0)} \text{ undefined}" />
        <Katex display tex="\text{B: } \cos(0)=1 \qquad \text{D: } \tfrac{1}{\cos(0)}=1" />
      </>
    ),
    reason: <>The line <Katex tex="y=x" /> through <Katex tex="O" /> is the easiest to read. In the diagram its marks slope upward at gradient <Katex tex="1" /> (look at <Katex tex="(1,1)" /> and <Katex tex="(2,2)" />; the <Katex tex="x" />-axis is stretched, so they look a little flatter than <Katex tex="45^\circ" />). A and C would be flat there and E vertical, so those three are out.</>,
  },
  {
    working: <Katex display tex="-1 \le \cos(y-x) \le 1 \implies \left|\frac{1}{\cos(y-x)}\right| \ge 1" />,
    reason: <>B and D both pass the <Katex tex="y=x" /> test, so find a second feature. The reciprocal of a number between <Katex tex="-1" /> and <Katex tex="1" /> has size at least <Katex tex="1" />, so every mark in D&apos;s field is at least as steep as <Katex tex="45^\circ" />, never flat, and vertical where <Katex tex="\cos(y-x)=0" />. The diagram has plenty of flat marks, so D is out.</>,
  },
  {
    working: <Katex display tex="\cos(y-x)=0 \iff y-x=\pm\tfrac{\pi}{2},\ \pm\tfrac{3\pi}{2},\ \dots" />,
    reason: <>Check B&apos;s flat marks against the picture: they lie on the diagonals <Katex tex="y=x\pm\tfrac{\pi}{2}" />, which cross the <Katex tex="y" />-axis at <Katex tex="y\approx\pm1.6" />. That is exactly where the diagram&apos;s flat marks sit.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = \cos(y-x)}" />,
    reason: <>Matches option <b>B</b>. Option <b>D</b> gives the right gradient on <Katex tex="y=x" /> but can never be flat; options <b>A</b> and <b>C</b> are flat along <Katex tex="y=x" />, where the diagram&apos;s marks slope upward.</>,
  },
]

export default function SpecialistQ9_2019() {
  return (
    <MCQShell
      question={
        <>
          <div className="mb-3">{DIAGRAM}</div>
          <p>The differential equation that has the diagram above as its direction field is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{dy}{dx} = \sin(y-x)" /> },
        { letter: 'B', content: <Katex tex="\dfrac{dy}{dx} = \cos(y-x)" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\dfrac{dy}{dx} = \sin(x-y)" /> },
        { letter: 'D', content: <Katex tex="\dfrac{dy}{dx} = \dfrac{1}{\cos(y-x)}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{dy}{dx} = \dfrac{1}{\sin(y-x)}" /> },
      ]}
      rows={ROWS}
      background={
        <Background title="Reading a Direction Field">
          <p>
            Each little mark is drawn with gradient equal to <Katex tex="\tfrac{dy}{dx}" /> at that point, so a solution
            curve through the point runs along it. To match a field to an equation, don&apos;t try to picture the whole
            field: find a few points or lines where each option is easy to work out (a value of <Katex tex="0" /> gives a
            flat mark, <Katex tex="\pm1" /> a mark at <Katex tex="45^\circ" /> on equal axes, an undefined value a vertical
            mark) and compare them with the diagram, crossing options off as you go.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="Test each option's field against the diagram">
            <FieldsWidget />
          </Explore>
          <WrongMethod
            title={<>&ldquo;The gradient at the origin is <Katex tex="1" />, and <Katex tex="\tfrac{1}{\cos(0)} = 1" />, so it&apos;s D&rdquo;</>}
            source="16% chose D"
            working={<Katex display tex="\frac{dy}{dx}\Big|_{(0,0)} = \frac{1}{\cos(0-0)} = 1" />}
          >
            D does pass the origin test, but so does B, so one test is not enough. Because{' '}
            <Katex tex="|\cos(y-x)| \le 1" />, its reciprocal always has size at least <Katex tex="1" />: D&apos;s marks
            are never flatter than <Katex tex="45^\circ" />, and where <Katex tex="\cos(y-x)=0" /> they are vertical. The
            diagram is full of flat marks, so D cannot be it. When two options survive a test, look for a feature one
            has and the other can&apos;t (here, a flat mark).
          </WrongMethod>
          <WrongMethod
            title={<>&ldquo;The stripes run along <Katex tex="y=x" />, so it&apos;s <Katex tex="\sin(y-x)" /> (or <Katex tex="\sin(x-y)" />)&rdquo;</>}
            source="12% chose C, 10% chose A"
            working={<Katex display tex="\sin(y-x) = \sin(x-y) = 0 \ \text{ on } \ y=x" />}
          >
            All five options depend only on <Katex tex="y-x" />, so all five fields have stripes parallel to{' '}
            <Katex tex="y=x" />; the stripes pick no option. Test one stripe: both sine options are <Katex tex="0" /> on{' '}
            <Katex tex="y=x" />, so their marks along it would be flat, but in the diagram the marks on{' '}
            <Katex tex="y=x" /> slope upward.
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
