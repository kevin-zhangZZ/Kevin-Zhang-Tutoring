// 2019 Mathematical Methods — Exam 2, MCQ 8. VCAA examination report: 71% correct. A binomial
// conditional probability. Question text transcribed from the original paper (no diagram).
// Solution is original; values re-checked with scipy: Pr(X = 74) = 0.12354, Pr(X ≥ 70) = 0.82662,
// ratio 0.14945. Distractors verified: B = Pr(X ≥ 70), D = Pr(X ≥ 74) = 0.30045, A =
// Pr(X ≥ 74)/Pr(X ≥ 70) = 0.36347. E (0.1701) matches no slip we could reproduce, so it is not
// named. The report makes no comment on this question. Interactive (in extras):
// meth-2019-mcq8-given, the binomial bars with the ruled-out ones greyed and the kept ones
// rescaled to total 1, plus the "at least 74" misreading as a toggle.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const GivenWidget = lazyWidget(() => import('../interactives/meth-2019-mcq8-given'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 11, C: 71, D: 5, E: 4 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X \sim \operatorname{Bi}(80,\ 0.9)" />,
    reason: <>Let <Katex tex="X" /> be the number of hits. Binomial applies: a fixed <Katex tex="80" /> attempts, each a hit or a miss, a constant probability <Katex tex="0.9" />, and (stated) independence.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\Pr(X=74 \mid X\ge70)" />
        <Katex display tex="= \dfrac{\Pr\bigl(X=74 \ \cap \ X\ge70\bigr)}{\Pr(X\ge70)}" />
      </>
    ),
    reason: <>The word "given" signals conditional probability, <Katex tex="\Pr(A\mid B)=\tfrac{\Pr(A\cap B)}{\Pr(B)}" />. The event after "given" (at least <Katex tex="70" /> hits) goes on the bottom: it is the new, smaller set of possible outcomes.</>,
  },
  {
    working: <Katex display tex="= \dfrac{\Pr(X=74)}{\Pr(X\ge70)}" />,
    reason: <>Hitting exactly <Katex tex="74" /> times <em>already</em> means hitting at least <Katex tex="70" /> times, so the overlap of the two events is simply <Katex tex="X=74" />. This collapse is the whole idea of the question.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\Pr(X=74) = \binom{80}{74}(0.9)^{74}(0.1)^{6} \approx 0.12354" />
        <Katex display tex="\Pr(X\ge70) \approx 0.82662" />
      </>
    ),
    reason: <>On CAS: <Cas fn="binomPdf">binomPdf(80, 0.9, 74)</Cas> for the top and <Cas fn="binomCdf">binomCdf(80, 0.9, 70, 80)</Cas> for the bottom. binomCdf takes both bounds, so "at least <Katex tex="70" />" is simply lower bound <Katex tex="70" />, upper bound <Katex tex="80" /> (the complement <Katex tex="1-\Pr(X\le69)" /> gives the same). Keep five or more decimal places until the final division.</>,
  },
  {
    working: <Katex display tex="\dfrac{0.12354}{0.82662} \approx 0.1494" />,
    reason: <>Dividing, then rounding to four decimal places as asked.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.1494}" />,
    reason: <>Matches option <b>C</b>. The distractors are all near-misses: <b>B</b> <Katex tex="(0.8266)" /> is the denominator on its own, <b>D</b> <Katex tex="(0.3005)" /> is <Katex tex="\Pr(X\ge74)" />, and <b>A</b> <Katex tex="(0.3635)" /> is <Katex tex="\Pr(X\ge74\mid X\ge70)" /> — the answer to the question if "exactly" had read "at least".</>,
  },
]

export default function MethodsQ8_2019() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            An archer can successfully hit a target with a probability of <Katex tex="0.9" />.
            The archer attempts to hit the target <Katex tex="80" /> times. The outcome of each
            attempt is independent of any other attempt.
          </p>
          <p>
            Given that the archer successfully hits the target at least <Katex tex="70" /> times,
            the probability that the archer successfully hits the target exactly{' '}
            <Katex tex="74" /> times, correct to four decimal places, is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.3635" /> },
        { letter: 'B', content: <Katex tex="0.8266" /> },
        { letter: 'C', content: <Katex tex="0.1494" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="0.3005" /> },
        { letter: 'E', content: <Katex tex="0.1701" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title={'What "given" does to a probability'}>
          <p>
            <Katex tex="\Pr(A\mid B)" /> asks: now that we know <Katex tex="B" /> happened, how
            likely is <Katex tex="A" />? Knowing <Katex tex="B" /> rules out every outcome outside{' '}
            <Katex tex="B" />, so <Katex tex="B" /> becomes the whole world. The answer is the
            share of <Katex tex="B" />&apos;s probability that also belongs to <Katex tex="A" />:
            the overlap <Katex tex="\Pr(A\cap B)" /> divided by <Katex tex="\Pr(B)" />.
          </p>
          <p>
            Dividing by <Katex tex="\Pr(B)" />, a number less than <Katex tex="1" />, scales every
            surviving probability <em>up</em> so they total <Katex tex="1" /> again. That is why
            the conditional answer here (<Katex tex="0.1494" />) is a little bigger than the
            plain <Katex tex="\Pr(X=74)\approx0.1235" />.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="Given at least 70: keep only those bars and ask what share 74 has">
            <GivenWidget />
          </Explore>
          <WrongMethod
            title="The question says given at least 70, so the answer is Pr(X ≥ 70)"
            source="11% chose B"
            working={<Katex display tex="\Pr(X\ge70)\approx0.8266 \quad \text{(option B)}" />}
          >
            <p>
              That is the probability of the condition itself, the bottom of the fraction, and the
              question never asks for it. The question is about <em>exactly 74</em> hits, so{' '}
              <Katex tex="X=74" /> has to appear on top. A size check catches it: exactly one
              number of hits out of the eleven from <Katex tex="70" /> to <Katex tex="80" /> can&apos;t
              carry <Katex tex="83\%" /> of the probability. Even the most likely value, <Katex tex="X=72" />,
              has probability only about <Katex tex="0.15" /> (about <Katex tex="0.18" /> once you
              are given <Katex tex="X\ge70" />).
            </p>
          </WrongMethod>
          <WrongMethod
            title={'Read "exactly 74" as "at least 74"'}
            source="9% chose A"
            working={<Katex display tex="\dfrac{\Pr(X\ge74)}{\Pr(X\ge70)} \approx \dfrac{0.30045}{0.82662} \approx 0.3635 \quad \text{(option A)}" />}
          >
            <p>
              The structure is right, but the top is a whole tail, <Katex tex="74" /> to{' '}
              <Katex tex="80" /> hits, instead of the single value <Katex tex="74" />. That answers
              &ldquo;given at least <Katex tex="70" />, what is the chance of at least{' '}
              <Katex tex="74" />?&rdquo;. Underline <em>exactly</em> in the stem: exactly means
              binomPdf, one bar; at least or at most means binomCdf, a run of bars.
            </p>
          </WrongMethod>
        </>
      }
    />
  )
}
