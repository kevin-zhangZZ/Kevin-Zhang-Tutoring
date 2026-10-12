// 2020 Mathematical Methods — Exam 2, MCQ 19. VCAA examination report: 15% correct — the
// hardest MCQ on this paper (worse than a guess). Relating the probability function for "6 rolled"
// to that for "6 not rolled" in 20 trials. Question text transcribed from the original paper; the
// diagram is cropped directly from the original VCAA exam PDF, not a redrawing. Solution is
// original; answer A checked against the VCAA report and itute (both A), and every value (q(17) =
// p(3) ≈ 0.2379, the sum of 1 − p(w) being 20, which options are defined where) checked in sympy.
// Interactive diagrams (§15), this site's own explanatory figures computed from Bi(20, 1/6) and
// Bi(20, 5/6): interactives/meth-2020e2-mcq19-mirror.tsx slides w along a row of 20 rolls and
// pairs q(w) with p(20 − w), mirror images in x = 10; interactives/meth-2020e2-mcq19-options.tsx
// tests each option at w = 0, …, 20 against the true q (B and C defined only at w = 0 and 20, D only
// at w = 20, E adding to 20).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import diagramSrc from './meth-2020-mcq19-probfunc.png'

const MirrorWidget = lazyWidget(() => import('../interactives/meth-2020e2-mcq19-mirror'))
const OptionsWidget = lazyWidget(() => import('../interactives/meth-2020e2-mcq19-options'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 15, B: 33, C: 15, D: 9, E: 27 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="q\sim\mathrm{Bi}\left(20,\tfrac56\right),\ p\sim\mathrm{Bi}\left(20,\tfrac16\right)" />
      <br />
      Examples
      <br />
      <Katex tex="q(19)=\binom{20}{19}\left(\tfrac56\right)^{19}\left(\tfrac16\right)=p(1)=\binom{20}{1}\left(\tfrac16\right)\left(\tfrac56\right)^{19}" />
      <br />
      <Katex tex="q(18)=\binom{20}{18}\left(\tfrac56\right)^{18}\left(\tfrac16\right)^{2}=p(2)=\binom{20}{2}\left(\tfrac16\right)^{2}\left(\tfrac56\right)^{18}" />
      <br />
      In general
      <br />
      <Katex tex="q(w)=\binom{20}{w}\left(\tfrac56\right)^{w}\left(\tfrac16\right)^{20-w}=p(20-w)=\binom{20}{20-w}\left(\tfrac16\right)^{20-w}\left(\tfrac56\right)^{w}" />
      <br />
      <Katex tex="q(w)=p(20-w)" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X \sim \mathrm{Bi}\big(20,\tfrac16\big),\quad p(x) = \Pr(X=x)" />,
    reason: <>Name the variable <Katex tex="p" /> describes: <Katex tex="X" />, the number of 6s in 20 independent rolls, each a 6 with probability <Katex tex="\tfrac16" />, so binomial.</>,
    more: <>That fits the graph: its peak is at <Katex tex="x=3" />, near the mean <Katex tex="20\times\tfrac16\approx3.3" />.</>,
  },
  {
    working: <Katex display tex="W = 20 - X,\quad q(w) = \Pr(W=w)" />,
    reason: <><Katex tex="W" /> counts the rolls that are <em>not</em> a 6. Every roll is one or the other, so the counts add to 20: <b><Katex tex="w" /> rolls that aren&apos;t a 6 means <Katex tex="20-w" /> rolls that are</b>.</>,
    more: <>This is the whole question. The rest of the working just writes it in symbols.</>,
  },
  {
    working: <Katex display tex="q(w) = \Pr(20-X=w) = \Pr(X=20-w)" />,
    reason: <><Katex tex="20-X=w" /> rearranges to <Katex tex="X=20-w" />: the same event, so the same probability.</>,
  },
  {
    working: (
      <>
        <Katex display tex="q(w) = \binom{20}{w}\left(\tfrac56\right)^{w}\left(\tfrac16\right)^{20-w}" />
        <Katex display tex="p(20-w) = \binom{20}{20-w}\left(\tfrac16\right)^{20-w}\left(\tfrac56\right)^{w}" />
      </>
    ),
    reason: <>Check with the formulas: <Katex tex="W" /> is binomial too, with <Katex tex="\Pr(\text{not a }6)=\tfrac56" />, so <Katex tex="W\sim\mathrm{Bi}\big(20,\tfrac56\big)" />; the powers match and <Katex tex="\binom{20}{w}=\binom{20}{20-w}" />, so the two expressions are identical.</>,
    more: <>The binomial coefficients are equal because choosing which <Katex tex="w" /> rolls are non-sixes is the same as choosing which <Katex tex="20-w" /> are sixes.</>,
  },
  {
    working: <Katex display tex="\text{e.g. } q(17) = p(3) \approx 0.238" />,
    reason: <>A concrete case: 17 non-sixes is the same as 3 sixes. As <Katex tex="w" /> and <Katex tex="20-w" /> are equally far from 10, the graph of <Katex tex="q" /> is the graph of <Katex tex="p" /> reflected in <Katex tex="x=10" />.</>,
    more: <>The peak of <Katex tex="p" /> at 3 becomes the peak of <Katex tex="q" /> at 17. Slide <Katex tex="w" /> in the first diagram below to see every pair.</>,
  },
  {
    working: <Katex display tex="\boxed{q(w) = p(20-w)}" />,
    reason: <><Katex tex="\Pr(X=20-w) = p(20-w)" /> by definition. Matches option <b>A</b>.</>,
    more: <>Option <b>B</b> (chosen by 33%) feeds <Katex tex="p" /> the <em>fraction</em> of rolls that are sixes, <Katex tex="1-\tfrac{w}{20}" />, instead of the <em>number</em> of sixes. Option <b>E</b> (27%) takes the complement of a probability instead of switching which outcome is counted. Both are unpacked in the Common Mistakes below. Option <b>C</b>, <Katex tex="p\big(\tfrac{w}{20}\big)" />, feeds <Katex tex="p" /> the fraction of non-sixes, and option <b>D</b>, <Katex tex="p(w-20)" />, asks for a negative number of sixes whenever <Katex tex="w<20" />: it translates <Katex tex="p" /> 20 units right instead of reflecting it.</>,
  },
]

export default function MethodsQ19_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Shown below is the graph of <Katex tex="p" />, which is the probability function for the number of
            times, <Katex tex="x" />, that a '6' is rolled on a fair six-sided die in 20 trials.
          </p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-3 w-fit">
            <img loading="lazy" decoding="async" src={diagramSrc} alt="Graph of p(x), the probability function for the number of 6s rolled in 20 trials, from the original 2020 VCAA exam paper" className="w-full max-w-[380px]" />
          </div>
          <p>
            Let <Katex tex="q" /> be the probability function for the number of times, <Katex tex="w" />, that a '6'
            is <b>not</b> rolled on a fair six-sided die in 20 trials.
            <br />
            <Katex tex="q(w)" /> is given by
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="p(20-w)" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="p\!\left(1-\dfrac{w}{20}\right)" /> },
        { letter: 'C', content: <Katex tex="p\!\left(\dfrac{w}{20}\right)" /> },
        { letter: 'D', content: <Katex tex="p(w-20)" /> },
        { letter: 'E', content: <Katex tex="1-p(w)" /> },
      ]}
      background={
        <Background title="What a Probability Function Is">
          <p>
            <Katex tex="p(x)=\Pr(X=x)" /> takes a possible <em>count</em> <Katex tex="x" />, here one of{' '}
            <Katex tex="0,1,\dots,20" />, and gives the probability of exactly that count. Its graph is one dot per
            count, and the dots&apos; heights add to 1. So <Katex tex="q(w)" /> is &ldquo;the probability of exactly{' '}
            <Katex tex="w" /> rolls that aren&apos;t a 6&rdquo;, and the question is asking: which number of <em>sixes</em>{' '}
            is that the same event as? Whatever goes inside the brackets of <Katex tex="p" /> has to be a number of sixes.
          </p>
        </Background>
      }
      rows={ROWS}
      extras={
        <>
          <Explore title="w rolls that aren't a 6 means 20 − w rolls that are — so q is p reflected in x = 10">
            <MirrorWidget />
          </Explore>
          <Explore title="Test each option at w = 0, 1, …, 20: only one of them is even a probability function">
            <OptionsWidget />
          </Explore>
          <WrongMethod
            title="Swap to the fraction that aren't sixes: q(w) = p(1 − w/20)"
            source="33% chose B"
            working={
              <>
                <Katex display tex="\text{fraction of non-sixes} = \tfrac{w}{20}" />
                <Katex display tex="\implies \text{fraction of sixes} = 1-\tfrac{w}{20}" />
                <Katex display tex="q(w) = p\left(1-\tfrac{w}{20}\right) \quad \text{(option B)}" />
              </>
            }
          >
            <p>
              The complement idea is right, but on the wrong scale. The input of <Katex tex="p" /> is a <em>number</em> of
              sixes, <Katex tex="0" /> to <Katex tex="20" />, not a fraction of the rolls: for <Katex tex="w=17" />, B asks for{' '}
              <Katex tex="p(0.15)" />, which doesn&apos;t exist. The number of sixes is{' '}
              <Katex tex="20\left(1-\tfrac{w}{20}\right)=20-w" />, which is option A.
            </p>
            <p>
              Check an option by putting in one value you can reason about: 17 non-sixes means 3 sixes, so{' '}
              <Katex tex="q(17)" /> has to be <Katex tex="p(3)" />.
            </p>
          </WrongMethod>
          <WrongMethod
            title="“Not rolled” means the complement, so q(w) = 1 − p(w)"
            source="27% chose E"
            working={
              <>
                <Katex display tex="q(w) = \Pr(\text{not } X=w)" />
                <Katex display tex="= 1-p(w) \quad \text{(option E)}" />
              </>
            }
          >
            <p>
              <Katex tex="1-p(w)" /> is the probability of <em>any number of sixes except</em> <Katex tex="w" />, which is a
              different event from &ldquo;exactly <Katex tex="w" /> non-sixes&rdquo;. For example{' '}
              <Katex tex="1-p(17)\approx1" />, but 17 non-sixes means 3 sixes, so <Katex tex="q(17)=p(3)\approx0.238" />.
            </p>
            <p>
              A quick test catches it: a probability function&apos;s values add to 1, but{' '}
              <Katex tex="\sum_{w=0}^{20}\left(1-p(w)\right)=21-1=20" />. &ldquo;Not rolled&rdquo; changes which outcome you
              count; it doesn&apos;t turn a probability into its complement.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
