// 2020 Mathematical Methods — Exam 1, Question 5 (4 marks). A binomial "three or more",
// then a conditional probability in a prescribed algebraic form. Question text transcribed
// from the original paper (no diagram given). Answers checked with sympy and against the
// VCAA examination report, itute and three tutor videos (LMK Maths, Dr U Education, Math
// Channel Mr Nie): all give 297/625 and 6³/(5⁴ − 2⁴). The report's sample working writes the
// numerator of part b. as "Pr(X = 2) ∩ Pr(X ≥ 1)"; the intersection belongs inside a single Pr,
// as written here. LMK's video says the binomial formula is not on the formula sheet — it is,
// on the 2020 sheet printed with this paper (and on the current one), so the solution says so.
// Every wrong method shown was computed and gives the stated wrong answer (a. Pr(X = 3) only →
// 216/625; no 4C3 → 27/125; b. multiplied out and simplified → 72/203; one person fixed →
// 36/125). Solution is original.
// Interactive diagrams (§15): a. a four-person probability tree that lights up the paths in
// "exactly 3", "all 4" and "3 or more" (interactives/meth-2020e1-q5a-tree.tsx); b. the 625
// equally likely outcomes as a 25 × 25 square (each person drawing one of five tickets, three
// with the gene), built up in steps to show where 6³, 5⁴ and 2⁴ come from, with a "person 1 has
// it" toggle for the fix-one-person slip (interactives/meth-2020e1-q5b-given.tsx).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const TreeWidget = lazyWidget(() => import('../interactives/meth-2020e1-q5a-tree'))
const GivenWidget = lazyWidget(() => import('../interactives/meth-2020e1-q5b-given'))

const EXAM_A: SAExaminerStats = {
  marks: [33, 38, 29],
  average: 1,
  comment: (
    <>
      Most students recognised use of the binomial distribution, clearly specifying the
      distribution with the parameters <Katex tex="n=4" /> and <Katex tex="p=\tfrac35" />.
      <br />
      Common errors included
      finding <Katex tex="\Pr(X=3)" /> only, use of an incorrect formula, or arithmetic
      errors in evaluation.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [60, 31, 10],
  average: 0.5,
  comment: (
    <>
      Students were generally able to identify that conditional probability was involved.
      However, they need to be aware that simply quoting a rule or formula is not sufficient;
      they are required to demonstrate how it is used within the context of the question (i.e.
      in this case, give evaluations of <Katex tex="\Pr(X=2)" /> and{' '}
      <Katex tex="\Pr(X\ge1)" />). Many students did not present their answer in the required
      form.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="X \sim \mathrm{Bi}\!\left(4,\tfrac35\right)" />,
    reason: <><Katex tex="X" /> is the number of the four people with the gene. It is binomial because there is a fixed number of trials (four people), each one either has the gene or doesn&apos;t, the probability is <Katex tex="\tfrac35" /> every time, and the question tells you the people are independent. Define it even in a technology-free exam: the report notes most students clearly specified the distribution with <Katex tex="n=4" /> and <Katex tex="p=\tfrac35" />.</>,
  },
  {
    working: <Katex display tex="\Pr(X\ge3) = \Pr(X=3)+\Pr(X=4)" />,
    reason: <>With only four people, &ldquo;three or more&rdquo; can only mean 3 or 4. Writing the values down first is what stops you finding <Katex tex="\Pr(X=3)" /> only, which the report lists as a common error. (Two terms is also less work than <Katex tex="1-\Pr(X\le2)" />, which needs three.)</>,
  },
  {
    working: <Katex display tex="\Pr(X=3) = \binom43\left(\tfrac35\right)^3\left(\tfrac25\right)^1" />,
    reason: <>One order, say the first three with the gene and the fourth without, has probability <Katex tex="\left(\tfrac35\right)^3\left(\tfrac25\right)" /> because the people are independent. The person without the gene can be any of the four, so there are <Katex tex="\binom43=4" /> orders, all with that same probability: the four orange paths in the tree below.</>,
  },
  {
    working: <Katex display tex="= 4\times\tfrac{27}{125}\times\tfrac25 = \tfrac{216}{625}" />,
    reason: <>Leave the denominator as <Katex tex="5^4=625" />: every term here has it, so the two terms will add easily.</>,
  },
  {
    working: <Katex display tex="\Pr(X=4) = \binom44\left(\tfrac35\right)^4\left(\tfrac25\right)^0 = \tfrac{81}{625}" />,
    reason: <>Only one way for all four to have it: <Katex tex="\binom44=1" /> and <Katex tex="\left(\tfrac25\right)^0=1" />. The report lists arithmetic errors in evaluation among the common errors, so work each term out on its own line.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(X\ge3) = \tfrac{216}{625}+\tfrac{81}{625} = \tfrac{297}{625}}" />,
    reason: <><Katex tex="216+81=297" />, and <Katex tex="297=3^3\times11" /> shares no factor with <Katex tex="625=5^4" />, so it doesn&apos;t simplify. Check: <Katex tex="\tfrac{297}{625}\approx0.475" />. On average <Katex tex="4\times\tfrac35=2.4" /> of the four have the gene, so three or more happening a little under half the time is plausible.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X=2\mid X\ge1) = \frac{\Pr(X=2\cap X\ge1)}{\Pr(X\ge1)}" />,
    reason: <>&ldquo;Given that at least one has the gene&rdquo; means you are told <Katex tex="X\ge1" /> happened, so this is a conditional probability: <Katex tex="\Pr(A\mid B)=\tfrac{\Pr(A\cap B)}{\Pr(B)}" />, from the formula sheet. Quoting it is not enough: the report says you need to give evaluations of <Katex tex="\Pr(X=2)" /> and <Katex tex="\Pr(X\ge1)" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}X=2 \implies X\ge1\\ \therefore\ \Pr(X=2\cap X\ge1) = \Pr(X=2)\end{gathered}" />,
    reason: <>&ldquo;Both&rdquo; means exactly two have the gene <em>and</em> at least one has it. If exactly two have it, then certainly at least one does, so the intersection is just <Katex tex="X=2" />: the event sits inside the condition.</>,
  },
  {
    working: <Katex display tex="\Pr(X=2) = \binom42\left(\tfrac35\right)^2\left(\tfrac25\right)^2 = \frac{6\times3^2\times2^2}{5^4}" />,
    reason: <>Look at the required form before calculating. <Katex tex="\tfrac{a^3}{b^4-c^4}" /> is built from powers, so keep <Katex tex="3^2" />, <Katex tex="2^2" /> and <Katex tex="5^4" /> as powers instead of multiplying out (that road leads to <Katex tex="\tfrac{72}{203}" />; see below). <Katex tex="\binom42=6" />: the number of ways to choose which two of the four have the gene.</>,
  },
  {
    working: <Katex display tex="\Pr(X\ge1) = 1-\Pr(X=0) = 1-\left(\tfrac25\right)^4 = \frac{5^4-2^4}{5^4}" />,
    reason: <>&ldquo;At least one&rdquo; is <Katex tex="X=1,2,3" /> or <Katex tex="4" />: four terms. Its complement, &ldquo;nobody has the gene&rdquo;, is one term. Writing <Katex tex="1" /> as <Katex tex="\tfrac{5^4}{5^4}" /> for the common denominator produces <Katex tex="5^4-2^4" />, which is already the <Katex tex="b^4-c^4" /> of the required form.</>,
  },
  {
    working: <Katex display tex="\Pr(X=2\mid X\ge1) = \frac{6\times3^2\times2^2}{5^4}\div\frac{5^4-2^4}{5^4}" />,
    reason: <>Both evaluations substituted into the conditional formula.</>,
  },
  {
    working: <Katex display tex="= \frac{6\times3^2\times2^2}{5^4-2^4}" />,
    reason: <>Dividing by a fraction: the <Katex tex="5^4" /> denominators cancel.</>,
  },
  {
    working: <Katex display tex="3^2\times2^2 = (3\times2)^2 = 6^2, \qquad 6\times6^2 = 6^3" />,
    reason: <>The numerator has to become a single cube. Powers with the same index multiply into one power, so <Katex tex="3^2\times2^2=6^2" />, and the lone <Katex tex="6" /> from <Katex tex="\binom42" /> makes it <Katex tex="6^3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(X=2\mid X\ge1) = \frac{6^3}{5^4-2^4}}" />,
    reason: <>The required form, with <Katex tex="a=6" />, <Katex tex="b=5" />, <Katex tex="c=2" /> (the question asks for the form, so there is no need to list <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="c" /> separately). The report notes many students did not present their answer in the required form. Check: <Katex tex="\tfrac{216}{609}\approx0.355" />, a little more than <Katex tex="\Pr(X=2)=\tfrac{216}{625}\approx0.346" />. That makes sense: being told at least one has the gene rules out only the unlikely &ldquo;nobody&rdquo; case (<Katex tex="\tfrac{16}{625}\approx0.026" />), so it nudges the answer up slightly. The diagram below shows why.</>,
  },
]

export default function MethodsQ5_2020Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (4 marks)</p>
        <p>
          For a certain population the probability of a person being born with the specific
          gene SPGE1 is <Katex tex="\tfrac35" />. The probability of a person having this gene
          is independent of any other person in the population having this gene.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Binomial Distribution"
        marks={2}
        statement={
          <>
            In a randomly selected group of four people, what is the probability that three or
            more people have the SPGE1 gene?
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="What the Binomial Formula Counts">
          <p>
            The formula sheet gives <Katex tex="\Pr(X=x)=\binom nx p^x(1-p)^{n-x}" />. Read it as a
            recipe: <Katex tex="p^x" /> for the <Katex tex="x" /> people with the gene,{' '}
            <Katex tex="(1-p)^{n-x}" /> for the <Katex tex="n-x" /> without it (independence lets you
            multiply), and <Katex tex="\binom nx" /> for the number of different orders they can come in,
            since every order has the same probability.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <Explore title="“Three or more” is five paths of the tree: four with exactly three, one with all four">
          <TreeWidget />
        </Explore>
        <WrongMethod
          title="“Three or more”, so find Pr(X = 3)"
          source="Examiner's report"
          working={<Katex display tex="\Pr(X\ge3) = \binom43\left(\tfrac35\right)^3\left(\tfrac25\right) = \tfrac{216}{625}" />}
        >
          That is <em>exactly</em> three. &ldquo;Three or more&rdquo; also includes all four people having the gene, so{' '}
          <Katex tex="\Pr(X=4)=\tfrac{81}{625}" /> is missing and the answer comes out too small. Before calculating
          anything, write down which values of <Katex tex="X" /> the event covers: here <Katex tex="X\in\{3,4\}" />.
          &ldquo;Or more&rdquo;, &ldquo;at least&rdquo; and <Katex tex="\ge" /> all include the number itself.
        </WrongMethod>
        <WrongMethod
          title="Leave out the 4C3"
          working={<Katex display tex="\left(\tfrac35\right)^3\left(\tfrac25\right)+\left(\tfrac35\right)^4 = \tfrac{54}{625}+\tfrac{81}{625} = \tfrac{27}{125}" />}
        >
          <Katex tex="\left(\tfrac35\right)^3\left(\tfrac25\right)" /> is the probability of <em>one particular</em> order,
          say the fourth person being the one without the gene. The person without it could be any of the four, and
          each of those orders is equally likely, so the term needs multiplying by <Katex tex="\binom43=4" /> (the four
          orange paths in the tree). The report lists use of an incorrect formula among the common errors: the formula
          is on the formula sheet, so copy it with every factor, and know what each one counts.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Conditional Binomial"
        marks={2}
        statement={
          <>
            In a randomly selected group of four people, what is the probability that exactly
            two people have the SPGE1 gene, given that at least one of those people has the
            SPGE1 gene? Express your answer in the form{' '}
            <Katex tex="\dfrac{a^3}{b^4-c^4}" />, where <Katex tex="a,b,c\in Z^+" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Explore title={<>“Given at least one” crosses out only the “nobody” corner, and that is where <span className="whitespace-nowrap">6³/(5⁴ − 2⁴)</span> comes from</>}>
          <GivenWidget />
        </Explore>
        <WrongMethod
          title="Multiply everything out, then simplify"
          source="Examiner's report"
          working={<Katex display tex="\frac{216/625}{609/625} = \frac{216}{609} = \frac{72}{203}" />}
        >
          The value is right (about <Katex tex="0.355" />), but the question asks for the form{' '}
          <Katex tex="\tfrac{a^3}{b^4-c^4}" />, and the report notes many students did not present their answer in the
          required form. <Katex tex="72" /> isn&apos;t a cube and <Katex tex="203" /> isn&apos;t a difference of two
          fourth powers, so once the common factor 3 has been cancelled the form is very hard to find again. When a
          question prescribes a form made of powers, keep every number as a power and let the form steer the algebra.
          If you have already multiplied out, look for the powers inside: <Katex tex="216=6^3" /> and{' '}
          <Katex tex="609=625-16=5^4-2^4" />.
        </WrongMethod>
        <WrongMethod
          title="At least one has it, so give one person the gene and find exactly one more among the other three"
          working={<Katex display tex="\binom31\left(\tfrac35\right)\left(\tfrac25\right)^2 = \tfrac{36}{125}" />}
        >
          &ldquo;At least one&rdquo; doesn&apos;t say <em>which</em> one. Handing the gene to a particular person answers a
          different question: exactly two, given that <em>that person</em> has it. That condition rules out every outcome
          where the chosen person lacks the gene (250 of the 625 equally likely outcomes in the diagram), while &ldquo;at
          least one&rdquo; rules out only the 16 where nobody has it. Turn on &ldquo;What if I say person 1 has it?&rdquo;
          on the last step of the diagram to compare the two. The safe route is the formula: divide{' '}
          <Katex tex="\Pr(X=2)" /> by <Katex tex="\Pr(X\ge1)=1-\Pr(X=0)" />.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
