// 2014 Mathematical Methods — Exam 2, Question 4 (Section B), parts (f)(i)–(f)(ii).
// A craftsman makes plant pots that come out either smooth or rough; whether one pot is
// smooth depends on whether the previous one was. Question text transcribed from the
// original paper (parts f.i–f.ii only); worked solutions below are original.
// No video walkthrough yet.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAMINER_FI: SAExaminerStats = {
  marks: [43, 7, 50],
  average: 1.1,
  comment: (
    <>
      Students who used a tree diagram often gave the correct answer. Matrix formulations with the rows or
      columns of the transition matrix swapped were common incorrect approaches. Brackets were sometimes
      omitted, giving the incorrect answer <Katex tex="0.7\times0.7+0.3\times1-p=0.79-p" />.
    </>
  ),
}

const EXAMINER_FII: SAExaminerStats = {
  marks: [34, 18, 48],
  average: 1.2,
}

export default function MethodsQ4_2014Exam2() {
  const rowsFi: WorkingRow[] = [
    {
      working: <Katex display tex="P(S_1) = 1, \qquad P(S_2) = 0.7" />,
      reason: <>The first pot each week is always smooth. Given the first pot is smooth, <Katex tex="P(\text{next smooth}\mid\text{smooth})=0.7" /> gives the second pot's probability directly.</>,
    },
    {
      working: <Katex display tex="P(S_3) = P(S_3\mid S_2)P(S_2) + P(S_3\mid R_2)P(R_2)" />,
      reason: 'Condition on the state of the second pot (law of total probability).',
    },
    {
      working: <Katex display tex="P(S_3) = (0.7)(0.7) + (1-p)(0.3)" />,
      reason: <>If pot 2 is rough (probability <Katex tex="0.3" />), pot 3 is smooth with probability <Katex tex="1-p" />, since <Katex tex="p" /> is <Katex tex="P(\text{next rough}\mid\text{rough})" />.</>,
    },
    {
      working: <Katex display tex="P(S_3) = 0.49 + 0.3 - 0.3p" />,
    },
    {
      working: <Katex display tex="\boxed{P(S_3) = 0.79-0.3p}" />,
    },
  ]

  const rowsFii: WorkingRow[] = [
    {
      working: <Katex display tex="0.79-0.3p = 0.61" />,
      reason: <>Set the result of part (f)(i) equal to the given probability, <Katex tex="0.61" />.</>,
    },
    {
      working: <Katex display tex="0.3p = 0.18" />,
    },
    {
      working: <Katex display tex="\boxed{p=0.6}" />,
    },
  ]

  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (part f)</p>
        <p>
          A craftsman makes ceramic plant pots. Each pot comes out of the kiln either smooth or rough. The
          first pot made each week is always smooth. For every pot after the first, whether it is smooth or
          rough depends on the previous pot:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>If a pot is smooth, the probability that the next pot is also smooth is <Katex tex="0.7" />.</li>
          <li>
            If a pot is rough, the probability that the next pot is rough is <Katex tex="p" />, where{' '}
            <Katex tex="0<p<1" />.
          </li>
        </ul>
        <p className="mt-2">
          Let <Katex tex="S_n" /> be the event that the <Katex tex="n" />th pot made in a week is smooth, and{' '}
          <Katex tex="R_n" /> the event that it is rough.
        </p>
      </div>

      <PartCard letter="f.i" marks={2} statement={<>Show that the probability that the third pot made in a week is smooth is <Katex tex="0.79-0.3p" />.</>} examinerReport={EXAMINER_FI}>
        <WorkingTable rows={rowsFi} />
      </PartCard>

      <PartCard letter="f.ii" marks={2} statement={<>Given that the probability that the third pot made in a week is smooth is <Katex tex="0.61" />, find the value of <Katex tex="p" />.</>} examinerReport={EXAMINER_FII}>
        <WorkingTable rows={rowsFii} />
      </PartCard>
    </div>
  )
}
