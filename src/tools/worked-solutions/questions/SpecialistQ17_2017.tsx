// 2017 Specialist Mathematics — Exam 2, MCQ 17. VCAA examination report: 37% correct
// (tied for third-hardest in the 2017-2018 Specialist Exam 2 papers).
// Find the magnitude and direction of the resultant of two forces meeting at an angle.
// Question text/diagram transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 37, B: 17, C: 20, D: 8, E: 17 },
  answer: 'A',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="R^2 = 10^2+8^2+2(10)(8)\cos(60°) = 100+64+80 = 244" />,
    reason: <>Standard resultant formula for two vectors meeting at angle <Katex tex="\theta=60°" />: <Katex tex="R^2=F_1^2+F_2^2+2F_1F_2\cos\theta" />.</>,
  },
  {
    working: <Katex display tex="\boxed{R = \sqrt{244} \approx 15.6 \text{ N}}" />,
  },
  {
    working: <Katex display tex="\tan\phi = \frac{8\sin(60°)}{10+8\cos(60°)} = \frac{8(0.8660)}{10+4} = \frac{6.928}{14} \approx 0.4949" />,
    reason: <>The angle <Katex tex="\phi" /> the resultant makes with the 10 N force, found by resolving the 8 N force into components along and perpendicular to the 10 N force.</>,
  },
  {
    working: <Katex display tex="\boxed{\phi = \tan^{-1}(0.4949) \approx 26.3°}" />,
    reason: <>Matches option <b>A</b>.</>,
  },
]

export default function SpecialistQ17_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-3">Forces of 10 N and 8 N act on a body as shown below.</p>
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-3 flex justify-center">
            <ForcesDiagram />
          </div>
          <p className="mt-3">The resultant force acting on the body will, correct to one decimal place, have</p>
        </>
      }
      options={[
        { letter: 'A', content: 'magnitude 15.6 N and act at 26.3° to the 10 N force.', isAnswer: true },
        { letter: 'B', content: 'magnitude 9.2 N and act at 49.1° to the 10 N force.' },
        { letter: 'C', content: 'magnitude 15.6 N and act at 33.7° to the 10 N force.' },
        { letter: 'D', content: 'magnitude 9.2 N and act at 70.9° to the 10 N force.' },
        { letter: 'E', content: 'magnitude 15.6 N and act at 49.1° to the 10 N force.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}

function ForcesDiagram() {
  return (
    <svg viewBox="0 0 280 200" width={260} height={186}>
      <defs>
        <marker id="arrowF" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#0ea5e9" />
        </marker>
        <marker id="arrowF2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#f97316" />
        </marker>
      </defs>
      <line x1={40} y1={100} x2={220} y2={30} stroke="#0ea5e9" strokeWidth={2.5} markerEnd="url(#arrowF)" />
      <line x1={40} y1={100} x2={220} y2={170} stroke="#f97316" strokeWidth={2.5} markerEnd="url(#arrowF2)" />
      <path d="M 80 100 A 40 40 0 0 0 68 76" fill="none" stroke="#6b7280" strokeWidth={1.5} />
      <text x={85} y={90} fontSize={13} className="fill-gray-600 dark:fill-gray-400">60°</text>
      <text x={120} y={52} fontSize={13} className="fill-sky-600 dark:fill-sky-400">10 N</text>
      <text x={110} y={155} fontSize={13} className="fill-orange-600 dark:fill-orange-400">8 N</text>
    </svg>
  )
}
