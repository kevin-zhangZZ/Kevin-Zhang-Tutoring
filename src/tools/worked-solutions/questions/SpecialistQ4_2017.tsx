// 2017 Specialist Mathematics — Exam 2, MCQ 4. VCAA examination report: 53% correct.
// The n-th roots of 1 + i. Question text transcribed from the original paper; solution is
// original. Options and working now write 2\pi k, as the paper does (was 2k\pi).
// Widget: interactives/spec-2017-mcq4-roots (raise each option's points to the power n and see
// which land on 1 + i). WrongMethods: D's modulus 2^(1/n) (15%) and A's k in R (14%), both computed.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const RootsWidget = lazyWidget(() => import('../interactives/spec-2017-mcq4-roots'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 7, C: 11, D: 15, E: 53 },
  answer: 'E',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="1+i = \sqrt2\,\operatorname{cis}\!\left(\frac{\pi}{4}\right)" />,
    reason: <>Roots of a complex number always start with polar form, because De Moivre&apos;s theorem works on the modulus and the argument separately. Modulus <Katex tex="\sqrt{1^2+1^2}=\sqrt2" />; argument <Katex tex="\tfrac{\pi}{4}" /> since the point sits on the line <Katex tex="y=x" /> in the first quadrant.</>,
  },
  {
    working: <Katex display tex="z^n = \sqrt2\,\operatorname{cis}\!\left(\frac{\pi}{4}+2\pi k\right), \quad k\in Z" />,
    reason: <>This is the step that makes <Katex tex="n" /> answers appear. Adding any number of full turns <Katex tex="2\pi k" /> points in the same direction, so <Katex tex="1+i" /> has all of these arguments. Once they are divided by <Katex tex="n" /> they become steps of <Katex tex="\tfrac{2\pi}{n}" />, which are <em>not</em> full turns, so they give <Katex tex="n" /> different roots. Adding <Katex tex="2\pi k" /> after dividing (option B) only ever gives one point.</>,
  },
  {
    working: <Katex display tex="z = \left(\sqrt2\right)^{\frac1n}\operatorname{cis}\!\left(\frac{\frac{\pi}{4}+2\pi k}{n}\right)" />,
    reason: <>De Moivre with index <Katex tex="\tfrac1n" />: take the <Katex tex="n" />th root of the modulus and divide the argument by <Katex tex="n" />.</>,
  },
  {
    working: <Katex display tex="\left(\sqrt2\right)^{\frac1n} = \left(2^{\frac12}\right)^{\frac1n} = 2^{\frac{1}{2n}}" />,
    reason: <>The modulus. Writing <Katex tex="2^{1/n}" /> instead is option D, the most popular wrong answer — it forgets that the modulus was <Katex tex="\sqrt2" />, not <Katex tex="2" />.</>,
  },
  {
    working: <Katex display tex="\frac{\frac{\pi}{4}+2\pi k}{n} = \frac{\pi}{4n}+\frac{2\pi k}{n}" />,
    reason: <>Both terms get divided by <Katex tex="n" />. Option C divides only the second, leaving <Katex tex="\tfrac{\pi}{4}" /> untouched.</>,
  },
  {
    working: <Katex display tex="\boxed{2^{\frac{1}{2n}}\operatorname{cis}\!\left(\frac{\pi}{4n}+\frac{2\pi k}{n}\right),\ k\in Z}" />,
    reason: <>Matches option <b>E</b>. The final detail is <Katex tex="k\in Z" />, not <Katex tex="k\in R" />: <Katex tex="k" /> counts whole turns, so only integers give solutions. That is all that separates E from A. D has the modulus <Katex tex="2^{\frac1n}" /> (row 4) and C leaves <Katex tex="\tfrac{\pi}{4}" /> undivided (row 5).</>,
  },
]

export default function SpecialistQ4_2017() {
  return (
    <MCQShell
      question={
        <p>
          The solutions to <Katex tex="z^n=1+i" />, <Katex tex="n\in Z^+" /> are given by
        </p>
      }
      background={
        <p>
          Three things separate the five options: the <em>modulus</em> (is it{' '}
          <Katex tex="2^{1/n}" /> or <Katex tex="2^{1/(2n)}" />?), whether the{' '}
          <Katex tex="\tfrac{\pi}{4}" /> was divided by <Katex tex="n" /> as well, and
          whether <Katex tex="k" /> ranges over the integers or the reals. Check all three
          before committing.
        </p>
      }
      extras={
        <>
          <Explore title={"Raise each option's points to the power n: only E's all land on 1 + i"}>
            <RootsWidget />
          </Explore>
          <WrongMethod
            title="|1 + i| is 2, so every root has modulus 2^(1/n)"
            source="15% chose D"
            working={
              <>
                <Katex display tex="\left(2^{\frac1n}\operatorname{cis}\tfrac{\pi}{4n}\right)^n = 2\operatorname{cis}\tfrac{\pi}{4}" />
                <Katex display tex="= \sqrt2+\sqrt2\,i \ne 1+i" />
              </>
            }
          >
            The modulus of <Katex tex="1+i" /> is <Katex tex="\sqrt{1^2+1^2}=\sqrt2" />; the <Katex tex="2" /> is
            what is under the square root. D&apos;s points have the right directions but lie too far out, so their{' '}
            <Katex tex="n" />th powers land on <Katex tex="\sqrt2+\sqrt2\,i" />, past <Katex tex="1+i" /> on the same
            ray. To catch it, raise one answer to the power <Katex tex="n" />: its modulus must come back to{' '}
            <Katex tex="\sqrt2" />.
          </WrongMethod>
          <WrongMethod
            title="k can be any real number"
            source="14% chose A"
            working={
              <>
                <Katex display tex="k=\tfrac12:\ \left(2^{\frac{1}{2n}}\operatorname{cis}\!\left(\tfrac{\pi}{4n}+\tfrac{\pi}{n}\right)\right)^n" />
                <Katex display tex="= \sqrt2\operatorname{cis}\!\left(\tfrac{\pi}{4}+\pi\right) = -1-i \ne 1+i" />
              </>
            }
          >
            <Katex tex="k" /> counts the extra full turns added to the argument of <Katex tex="1+i" />. Half a turn
            points the opposite way, so it gives a point whose <Katex tex="n" />th power is <Katex tex="-1-i" />.
            With <Katex tex="k\in R" /> the &ldquo;solutions&rdquo; would fill a whole circle, but{' '}
            <Katex tex="z^n=1+i" /> has exactly <Katex tex="n" /> solutions, from <Katex tex="k=0,1,\dots,n-1" />.
          </WrongMethod>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="2^{\frac{1}{2n}}\operatorname{cis}\!\left(\tfrac{\pi}{4n}+\tfrac{2\pi k}{n}\right),\ k\in R" /> },
        { letter: 'B', content: <Katex tex="2^{\frac{1}{n}}\operatorname{cis}\!\left(\tfrac{\pi}{4n}+2\pi k\right),\ k\in Z" /> },
        { letter: 'C', content: <Katex tex="2^{\frac{1}{2n}}\operatorname{cis}\!\left(\tfrac{\pi}{4}+\tfrac{2\pi k}{n}\right),\ k\in R" /> },
        { letter: 'D', content: <Katex tex="2^{\frac{1}{n}}\operatorname{cis}\!\left(\tfrac{\pi}{4n}+\tfrac{2\pi k}{n}\right),\ k\in Z" /> },
        { letter: 'E', content: <Katex tex="2^{\frac{1}{2n}}\operatorname{cis}\!\left(\tfrac{\pi}{4n}+\tfrac{2\pi k}{n}\right),\ k\in Z" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
