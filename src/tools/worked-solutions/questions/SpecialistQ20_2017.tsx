// 2017 Specialist Mathematics — Exam 2, MCQ 20. VCAA examination report: 77% correct.
// The decision rule for a one-sided test at the 5% level. Question text transcribed from
// the original paper; solution is original.
// Interactive (extras): spec-2017-mcq20-tail — the distribution of the test statistic under H₀
// with the 5% rejection tail; slide the observed value and the p-value (the area beyond it) drops
// below 0.05 exactly when it enters the tail. Buttons jump to each option's p; a two-sided toggle
// shows p is calculated differently but compared with 0.05 the same way. WrongMethod: the rule
// reversed (B 9%, A 5%, E 3%). itute agrees (C).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const TailWidget = lazyWidget(() => import('../interactives/spec-2017-mcq20-tail'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 9, C: 77, D: 5, E: 3 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="p < \alpha \implies \text{reject } H_0" />,
    reason: <>The decision rule, with <Katex tex="\alpha=0.05" /> from &ldquo;the 5% level of significance&rdquo;. A small <Katex tex="p" />-value means the observed data would be unlikely if <Katex tex="H_0" /> were true, so <Katex tex="H_0" /> goes. Test every option against this one rule.</>,
  },
  {
    working: <Katex display tex="\text{A: } p=0.04<0.05" />,
    reason: <>So <Katex tex="H_0" /> <em>should</em> be rejected, but A says it should not. False.</>,
  },
  {
    working: <Katex display tex="\text{B: } p=0.06>0.05" />,
    reason: <>Not enough evidence, so <Katex tex="H_0" /> should <em>not</em> be rejected, but B says it should. False.</>,
  },
  {
    working: <Katex display tex="\text{C: } p=0.03<0.05 \implies \text{reject } H_0" />,
    reason: <>True.</>,
  },
  {
    working: <Katex display tex="\text{D: } p\ne0.05 \text{ includes, for example, } p=0.01" />,
    reason: <>For any <Katex tex="p<0.05" /> the null hypothesis should be rejected, so &ldquo;should not be rejected whenever <Katex tex="p\ne0.05" />&rdquo; is false.</>,
  },
  {
    working: <Katex display tex="\text{E: } p=0.01<0.05" />,
    reason: <>Strong evidence against <Katex tex="H_0" />, so it should be rejected, but E says the opposite. False.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{C}}" />,
    reason: <>Matches option <b>C</b>. The one-sided/two-sided distinction is a red herring here: it changes how <Katex tex="p" /> is <em>calculated</em>, not how it is compared with <Katex tex="\alpha" /> once you have it.</>,
  },
]

export default function SpecialistQ20_2017() {
  return (
    <MCQShell
      question={
        <p>
          In a one-sided statistical test at the <Katex tex="5\%" /> level of significance, it
          would be concluded that
        </p>
      }
      background={
        <p>
          The <Katex tex="p" />-value is the probability, assuming <Katex tex="H_0" /> is true, of getting a result at
          least as extreme as the one observed. At the <Katex tex="5\%" /> level, <Katex tex="H_0" /> is rejected when{' '}
          <Katex tex="p<0.05" /> and not rejected otherwise. Equivalently, the observed result lies in the most extreme{' '}
          <Katex tex="5\%" /> of outcomes expected under <Katex tex="H_0" />.
        </p>
      }
      options={[
        { letter: 'A', content: <><Katex tex="H_0" /> should not be rejected if <Katex tex="p=0.04" /></> },
        { letter: 'B', content: <><Katex tex="H_0" /> should be rejected if <Katex tex="p=0.06" /></> },
        { letter: 'C', content: <><Katex tex="H_0" /> should be rejected if <Katex tex="p=0.03" /></>, isAnswer: true },
        { letter: 'D', content: <><Katex tex="H_0" /> should not be rejected if <Katex tex="p\ne0.05" /></> },
        { letter: 'E', content: <><Katex tex="H_0" /> should not be rejected if <Katex tex="p=0.01" /></> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="p < 0.05 exactly when the result lands in the most extreme 5%">
            <TailWidget />
          </Explore>
          <WrongMethod
            title="A bigger p-value is stronger evidence, so reject H₀ when p is above 0.05"
            source="B 9%, A 5%, E 3%"
            working={<Katex display tex="p=0.06>0.05 \implies \text{reject } H_0 \quad \text{(option B)}" />}
          >
            <p>
              The comparison is the wrong way round. <Katex tex="p" /> measures how likely a result like this is{' '}
              <em>if <Katex tex="H_0" /> is true</em>, so a large <Katex tex="p" /> means the data fit{' '}
              <Katex tex="H_0" /> comfortably: no evidence against it. Under the reversed rule, options A and E would be
              true as well, which is one sign that something is off. Remember: small <Katex tex="p" />, reject{' '}
              <Katex tex="H_0" />.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
