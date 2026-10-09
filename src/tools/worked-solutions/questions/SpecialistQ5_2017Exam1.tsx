// 2017 Specialist Mathematics — Exam 1, Question 5 (4 marks). The angle at C between CB
// and CD, solved for a parameter in one of the position vectors. Question text transcribed
// from the original paper (no diagram given). Answer a = −2 checked with sympy and against the
// VCAA examination report and itute. Solution is original. No lettered parts, so this uses the
// single-card layout.
//
// Interactive widgets (after the working): spec-2017e1-q5-tail-to-tail — a 3D view of O, B, C, D
// at a = −2 with the three pairs a student might dot (CB, CD / b, d / BC, CD) and the angle each pair
// really measures (π/3, π/2 = angle BOD, 2π/3 = the outside angle); spec-2017e1-q5-squaring — triangle
// BCD drawn flat at true size with a slider on a, showing that the squared equation only tests cos²θ = 1/4,
// so it accepts the 2π/3 angle at a = 2 as well as π/3 at a = −2. Wrong-method boxes: dotting the
// position vectors b and d (a = 4 ± 2√3), keeping a = 2, and using BC with CD (gives a = 2).
//
// Note on the report: its comment says the vectors must be "tail to tail and therefore working with"
// BC and CD (arrows as printed). BC and CD are head to tail; tail to tail at C is CB and CD. Kept
// verbatim below; the BC-and-CD wrong-method box explains the difference.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, WrongMethod, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const TailWidget = lazyWidget(() => import('../interactives/spec-2017e1-q5-tail-to-tail'))
const SquaringWidget = lazyWidget(() => import('../interactives/spec-2017e1-q5-squaring'))

const EXAM: SAExaminerStats = {
  marks: [25, 5, 45, 13, 11],
  average: 1.8,
  comment: (
    <>
      A broad spread of levels of achievement was seen for this question. Most students were
      able to make some progress but many had some difficulties. The majority knew that they
      needed to find to vectors involving <Katex tex="C" /> and attempt to use the dot product
      to find the unknown, though some algebra when finding the dot product was poor. The most
      common errors involved finding the dot product of two (or sometimes all three) of the
      given vectors, not understanding that when finding the angle between vectors they need
      to be tail to tail and therefore working with <Katex tex="\overrightarrow{BC}" /> and{' '}
      <Katex tex="\overrightarrow{CD}" />. Some used the correct application of the dot product
      or cosine rule but poor algebra led to an incorrect equation for <Katex tex="a" />,
      others correctly found <Katex tex="a=\pm2" /> from the surd equation but did not
      eliminate <Katex tex="a=2" /> or incorrectly eliminated <Katex tex="a=-2" />. Many
      students did not know their exact values. Notation was often poor, with students not
      showing the dot or using another symbol. A large number of students struggled with the
      algebra. A number of students incorrectly solved <Katex tex="x^2=4" /> to get{' '}
      <Katex tex="x=\pm\sqrt2" /> or similar.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\overrightarrow{CB} = \underset{\sim}{b}-\underset{\sim}{c} = -\underset{\sim}{i}+\underset{\sim}{k}" />,
    reason: (
      <>
        Angle <Katex tex="BCD" /> has its vertex at the middle letter, <Katex tex="C" />, and the angle between two
        vectors is measured with their tails together. So both vectors must <em>start</em> at <Katex tex="C" />. A
        vector from <Katex tex="C" /> to <Katex tex="B" /> is &ldquo;end minus start&rdquo;:{' '}
        <Katex tex="\underset{\sim}{b}-\underset{\sim}{c}" />. Dotting <Katex tex="\underset{\sim}{b}" />,{' '}
        <Katex tex="\underset{\sim}{c}" /> or <Katex tex="\underset{\sim}{d}" /> themselves measures an angle at the
        origin instead, the report&apos;s most common error.
      </>
    ),
  },
  {
    working: <Katex display tex="\overrightarrow{CD} = \underset{\sim}{d}-\underset{\sim}{c} = (a-2)\underset{\sim}{i}-\underset{\sim}{j}-\underset{\sim}{k}" />,
    reason: (
      <>
        Same rule, end minus start, one component at a time: <Katex tex="a-2" />,{' '}
        <Katex tex="-2-(-1)=-1" /> and <Katex tex="0-1=-1" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\overrightarrow{CB}\cdot\overrightarrow{CD} = (-1)(a-2)+(0)(-1)+(1)(-1)" />
        <Katex display tex="= 1-a" />
      </>
    ),
    reason: (
      <>
        Multiply matching components and add. The report says some students&apos; algebra here was poor; the slip to watch is the
        first term, <Katex tex="(-1)(a-2)=2-a" />, not <Katex tex="a-2" />. Write the dot: the report also noted students
        leaving it out or using another symbol.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\left|\overrightarrow{CB}\right|=\sqrt{1+0+1}=\sqrt2" />
        <Katex display tex="\left|\overrightarrow{CD}\right|=\sqrt{(a-2)^2+2}" />
      </>
    ),
    reason: <>Square each component, add, then take the square root.</>,
  },
  {
    working: <Katex display tex="\frac{1-a}{\sqrt2\,\sqrt{(a-2)^2+2}}=\cos\!\left(\frac{\pi}{3}\right)=\frac12" />,
    reason: (
      <>
        The dot-product rule <Katex tex="\underset{\sim}{u}\cdot\underset{\sim}{v}=|\underset{\sim}{u}||\underset{\sim}{v}|\cos\theta" />{' '}
        rearranged for <Katex tex="\cos\theta" />, with <Katex tex="\theta=\tfrac{\pi}{3}" />. Exact value:{' '}
        <Katex tex="\cos\tfrac{\pi}{3}=\tfrac12" /> (the report notes many students did not know their exact values).
        The cosine rule in triangle <Katex tex="BCD" /> also works (the report mentions it): with{' '}
        <Katex tex="BD^2=|\underset{\sim}{d}-\underset{\sim}{b}|^2=(a-1)^2+5" /> it simplifies to the same equation,{' '}
        <Katex tex="2(1-a)=\sqrt2\,\sqrt{(a-2)^2+2}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="1-a>0 \implies a<1" />,
    reason: (
      <>
        Read the sign off <em>before</em> squaring. The denominator is a product of lengths, so it is positive; the
        fraction equals <Katex tex="+\tfrac12" />, so the numerator <Katex tex="1-a" /> must be positive too. In picture
        terms, <Katex tex="\tfrac{\pi}{3}" /> is acute, and an acute angle means a positive dot product. Squaring is about
        to throw this sign away, so write it down now; it decides between the two roots at the end.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="2(1-a)=\sqrt2\,\sqrt{(a-2)^2+2}" />
        <Katex display tex="4(1-a)^2 = 2\left((a-2)^2+2\right)" />
      </>
    ),
    reason: (
      <>
        Cross-multiply, then square both sides to clear the surds. The squared equation is also true when{' '}
        <Katex tex="2(1-a)=-\sqrt2\,\sqrt{(a-2)^2+2}" />, that is when <Katex tex="\cos\theta=-\tfrac12" /> and the angle
        is <Katex tex="\tfrac{2\pi}{3}" />, so it can produce an extra root.
      </>
    ),
  },
  {
    working: <Katex display tex="2-4a+2a^2 = a^2-4a+6" />,
    reason: <>Halve both sides, then expand: <Katex tex="2(1-a)^2=2-4a+2a^2" /> and <Katex tex="(a-2)^2+2=a^2-4a+6" />.</>,
  },
  {
    working: <Katex display tex="a^2=4 \implies a=\pm2" />,
    reason: (
      <>
        The <Katex tex="-4a" /> terms cancel, leaving <Katex tex="a^2=4" />. Its roots are <Katex tex="\pm2" />{' '}
        (not <Katex tex="\pm\sqrt2" />, a slip the report mentions).
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{a=-2}" />,
    reason: (
      <>
        Only <Katex tex="a=-2" /> satisfies <Katex tex="a<1" />. Check: at <Katex tex="a=-2" />,{' '}
        <Katex tex="\overrightarrow{CB}\cdot\overrightarrow{CD}=3" /> and{' '}
        <Katex tex="|\overrightarrow{CD}|=\sqrt{18}=3\sqrt2" />, so{' '}
        <Katex tex="\cos\theta=\tfrac{3}{\sqrt2\times3\sqrt2}=\tfrac12" />. The other root, <Katex tex="a=2" />, gives a
        dot product of <Katex tex="-1" /> and <Katex tex="|\overrightarrow{CD}|=\sqrt2" />, so{' '}
        <Katex tex="\cos\theta=-\tfrac12" />: that is the angle <Katex tex="\tfrac{2\pi}{3}" /> that squaring let in.
      </>
    ),
  },
]

export default function SpecialistQ5_2017Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (4 marks)</p>
        <p>
          Relative to a fixed origin, the points <Katex tex="B" />, <Katex tex="C" /> and{' '}
          <Katex tex="D" /> are defined respectively by the position vectors{' '}
          <Katex tex="\underset{\sim}{b}=\underset{\sim}{i}-\underset{\sim}{j}+2\underset{\sim}{k}" />
          ,{' '}
          <Katex tex="\underset{\sim}{c}=2\underset{\sim}{i}-\underset{\sim}{j}+\underset{\sim}{k}" />{' '}
          and{' '}
          <Katex tex="\underset{\sim}{d}=a\underset{\sim}{i}-2\underset{\sim}{j}" />, where{' '}
          <Katex tex="a" /> is a real constant.
        </p>
        <p className="mt-2">
          Given that the magnitude of angle <Katex tex="BCD" /> is <Katex tex="\tfrac{\pi}{3}" />
          , find <Katex tex="a" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            The angle between two vectors comes from the dot product,{' '}
            <Katex tex="\underset{\sim}{u}\cdot\underset{\sim}{v}=|\underset{\sim}{u}||\underset{\sim}{v}|\cos\theta" />,
            where <Katex tex="\theta" /> is the angle between the vectors when they are placed <b>tail to tail</b>{' '}
            (<Katex tex="0\le\theta\le\pi" />). An angle named with three letters, like <Katex tex="BCD" />, has its
            vertex at the middle letter, so the two vectors you need both start at <Katex tex="C" />:{' '}
            <Katex tex="\overrightarrow{CB}" /> and <Katex tex="\overrightarrow{CD}" />. The given{' '}
            <Katex tex="\underset{\sim}{b}" />, <Katex tex="\underset{\sim}{c}" /> and <Katex tex="\underset{\sim}{d}" />{' '}
            all start at the origin, so they are only the raw material.
          </p>
          <p>
            The <b>sign</b> of the dot product tells you the kind of angle: positive for acute, zero for a right angle,
            negative for obtuse. Here the angle <Katex tex="\tfrac{\pi}{3}" /> is acute, so{' '}
            <Katex tex="\overrightarrow{CB}\cdot\overrightarrow{CD}" /> must come out positive. Keep that in mind: the
            algebra involves squaring, which throws the sign away.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <Explore title="The angle at C needs two arrows that start at C">
          <TailWidget />
        </Explore>
        <Explore title="Why squaring lets a = 2 in: it can't tell π/3 from 2π/3">
          <SquaringWidget />
        </Explore>
        <WrongMethod
          title={<>&ldquo;The angle is between <Katex tex="B" /> and <Katex tex="D" />, so dot <Katex tex="\underset{\sim}{b}" /> with <Katex tex="\underset{\sim}{d}" />&rdquo;</>}
          source="Examiner's report"
          working={
            <>
              <Katex display tex="\frac{a+2}{\sqrt6\,\sqrt{a^2+4}}=\frac12" />
              <Katex display tex="\Rightarrow a^2-8a+4=0 \Rightarrow a=4\pm2\sqrt3" />
            </>
          }
        >
          <p>
            Position vectors start at the origin, so this is the angle <Katex tex="BOD" /> at <Katex tex="O" />, not the
            angle at <Katex tex="C" />. (Both of these values of <Katex tex="a" /> really do make angle{' '}
            <Katex tex="BOD" /> equal <Katex tex="\tfrac{\pi}{3}" />.) The catch is in the name of the angle: the middle
            letter is the vertex, and both vectors must start there, so subtract position vectors first. Two surd answers
            and no way to choose between them is another hint that something is off.
          </p>
        </WrongMethod>
        <WrongMethod
          title={<>&ldquo;Both <Katex tex="a=2" /> and <Katex tex="a=-2" /> came out of the equation, so both work&rdquo;</>}
          source="Examiner's report"
          working={
            <>
              <Katex display tex="a=2:\ \ \cos\theta=\frac{1-2}{\sqrt2\times\sqrt2}=-\frac12" />
              <Katex display tex="\Rightarrow \theta=\frac{2\pi}{3}" />
            </>
          }
        >
          <p>
            Squaring turned <Katex tex="\cos\theta=\tfrac12" /> into <Katex tex="\cos^2\theta=\tfrac14" />, which is also
            true when <Katex tex="\cos\theta=-\tfrac12" />. So the algebra finds every <Katex tex="a" /> that makes the angle
            either <Katex tex="\tfrac{\pi}{3}" /> or <Katex tex="\tfrac{2\pi}{3}" />, and <Katex tex="a=2" /> is the second
            kind. Catch it by noting <Katex tex="1-a>0" /> before squaring, or by substituting each root back into the
            unsquared equation. Don&apos;t over-correct either: the report also saw students reject <Katex tex="a=-2" />{' '}
            instead, but <Katex tex="a" /> is just a coordinate and is free to be negative.
          </p>
        </WrongMethod>
        <WrongMethod
          title={<>&ldquo;Go round the triangle: use <Katex tex="\overrightarrow{BC}" /> and <Katex tex="\overrightarrow{CD}" />&rdquo;</>}
          working={
            <>
              <Katex display tex="\overrightarrow{BC}\cdot\overrightarrow{CD}=(1)(a-2)+0+(-1)(-1)" />
              <Katex display tex="=a-1" />
              <Katex display tex="\frac{a-1}{\sqrt2\,\sqrt{(a-2)^2+2}}=\frac12" />
              <Katex display tex="\Rightarrow a^2=4,\ a>1 \Rightarrow a=2" />
            </>
          }
        >
          <p>
            <Katex tex="\overrightarrow{BC}" /> ends at <Katex tex="C" />, so these two arrows are head to tail. Slide{' '}
            <Katex tex="\overrightarrow{BC}" /> so its tail is at <Katex tex="C" /> and it points away from{' '}
            <Katex tex="B" />: the angle it makes with <Katex tex="\overrightarrow{CD}" /> is the outside angle{' '}
            <Katex tex="\pi-\angle BCD" />. Every step is correct algebra, but it solves the wrong question and lands
            exactly on the root that should be rejected. The report&apos;s comment below prints{' '}
            <Katex tex="\overrightarrow{BC}" /> beside the words &ldquo;tail to tail&rdquo;; for the angle at{' '}
            <Katex tex="C" />, tail to tail means <Katex tex="\overrightarrow{CB}" /> and <Katex tex="\overrightarrow{CD}" />.
          </p>
        </WrongMethod>
        <SAExaminerReport stats={EXAM} maxMarks={4} />
        <div>
          <p className="text-[11px] font-bold tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">Video Walkthrough</p>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 italic">Coming soon.</p>
        </div>
      </div>
    </div>
  )
}
