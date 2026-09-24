// 2015 Specialist Mathematics — Exam 1, Question 8 (7 marks). A show-that antiderivative of
// tan(2x), the asymptotes and inverse of f(x) = arctan(x)/2, and the area under f found by
// integrating the inverse. Question text transcribed from the original paper; the graph in
// the stem is a crop of VCAA's own artwork, the part b(ii) answer is an SVG overlay on it, and
// the part d. area diagram is this site's own matplotlib figure.
// Answers checked with sympy and against the VCAA examination report. Solution is original.
// Audit, Sept 2026: the b(ii) answer used to be a matplotlib re-plot of VCAA's printed curve;
// it is now an SVG overlay (tan(2x) and its asymptotes) on the cropped figure. VCAA's figure
// is not to scale, so the overlay is calibrated to the printed asymptotes y = ±π/4 (118.5 px
// either side of the x-axis at y = 359.5 px; origin at x = 564 px, measured from the image).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import graphSrc from './spec-2015e1-q8-graph.png'
import areaSrc from './spec-2015e1-q8d-area.png'

const EXAM_A: SAExaminerStats = {
  marks: [44, 9, 47],
  average: 1.1,
  comment: (
    <>
      This question was answered reasonably well. There were many instances of poor choices
      of substitution, such as <Katex tex="u=\sin(2x)" />, <Katex tex="u=\tan(2x)" />,{' '}
      <Katex tex="u=\sec(2x)" /> or <Katex tex="u=\cos(x)" /> (after the use of double-angle
      formulas) rather than <Katex tex="u=\cos(2x)" />. These attempts led to a more
      complicated solution and were rarely successful. Some students who used the correct
      substitution then made sign or arithmetical errors or did not use a modulus sign at the
      integration stage (although it often appeared at the end). Some attempted to use the tan
      double-angle formula, but this was rarely successful. A few students used
      differentiation as their method, but only a small number could correctly obtain the
      derivative of the right-hand scale. There were some unconvincing arguments, often due to
      insufficient steps shown.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [28, 72],
  average: 0.7,
  comment: (
    <>
      Most students answered this question correctly. Some gave{' '}
      <Katex tex="y=\pm\tfrac\pi2" />. Others gave <Katex tex="\pm\tfrac\pi4" /> rather than
      equations.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [46, 54],
  average: 0.6,
  comment: (
    <>
      Students were expected to be able to reflect the given graph in the line{' '}
      <Katex tex="y=x" />, or find the equation <Katex tex="y=\tan(2x)" /> and sketch that
      directly. Typical errors included poor attempts at the shape of the inverse (sometimes
      graphed as <Katex tex="y=-\tan(2x)" />), poor positioning of the vertical asymptotes,
      and either not labelling or incorrect labelling of the vertical asymptotes – for
      example, <Katex tex="y=\pm\tfrac\pi4" /> – and drawing the graph beyond its domain.
      Asymptotic behaviour was lacking in some of the attempts, with curves sometimes moving
      away from the asymptotes.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [14, 86],
  average: 0.9,
  comment: (
    <>
      This question was well answered. The main errors seen were <Katex tex="\tfrac\pi3" />{' '}
      and <Katex tex="\tfrac\pi{12}" />, with some students not knowing the exact values.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [26, 52, 23],
  average: 1,
  comment: (
    <>
      Only a small proportion of students answered this question correctly. Some gave the
      correct expression for the area in terms of arctan, but no progress or poor attempts at
      integration (usually where the supposed antiderivative was actually the derivative) was
      made. Many gave an incorrect (incomplete) expression for the area in terms of the
      inverse (omitting <Katex tex="\tfrac{\sqrt3\,\pi}6" />) or incorrect terminals. Some
      students tried to integrate <Katex tex="\tan(2y)" /> rather than using the information
      contained in part a. but were usually unsuccessful. Several of those who used the
      correct antiderivative of <Katex tex="\tan(2y)" /> using part a., made subsequent
      substitution errors. A number of students found the wrong area and obtained{' '}
      <Katex tex="\tfrac12\log_e(2)" />. Using a diagram would have been helpful for many
      students.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\int\tan(2x)\,dx = \int\frac{\sin(2x)}{\cos(2x)}\,dx" />,
    reason: <>Rewrite in terms of sine and cosine — the numerator is then almost the derivative of the denominator.</>,
  },
  {
    working: <Katex display tex="u = \cos(2x) \implies \frac{du}{dx} = -2\sin(2x)" />,
    reason: <>The substitution the report says students kept getting wrong. Take the <em>denominator</em>, because that is what makes the integral a <Katex tex="\tfrac{f'}{f}" /> form.</>,
  },
  {
    working: <Katex display tex="\sin(2x)\,dx = -\tfrac12\,du" />,
    reason: <>Rearranging the differential.</>,
  },
  {
    working: <Katex display tex="\int\frac{\sin(2x)}{\cos(2x)}\,dx = -\frac12\int\frac{1}{u}\,du" />,
    reason: <>Substituting throughout.</>,
  },
  {
    working: <Katex display tex="= -\tfrac12\log_e|u|+c = -\tfrac12\log_e\bigl|\cos(2x)\bigr|+c" />,
    reason: <>The modulus is required — <Katex tex="\cos(2x)" /> changes sign.</>,
  },
  {
    working: <Katex display tex="= \tfrac12\log_e\bigl|\cos(2x)\bigr|^{-1}+c = \tfrac12\log_e\bigl|\sec(2x)\bigr|+c" />,
    reason: <>A negative coefficient in front of a logarithm is the logarithm of the reciprocal, and <Katex tex="\sec = \tfrac1{\cos}" />. That is the given form — as required. The marks are for the substitution and simplification above, not for restating the result.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="-\tfrac\pi2 < \arctan(x) < \tfrac\pi2 \quad\text{for all } x\in R" />,
    reason: <>The range of <Katex tex="\arctan" /> is the source of both asymptotes.</>,
  },
  {
    working: <Katex display tex="f(x) = \tfrac12\arctan(x) \implies -\tfrac\pi4 < f(x) < \tfrac\pi4" />,
    reason: <>Halving the whole range.</>,
  },
  {
    working: <Katex display tex="\boxed{y = \tfrac\pi4 \ \text{ and }\ y = -\tfrac\pi4}" />,
    reason: <>Write them as <em>equations</em> of horizontal lines; <Katex tex="\pm\tfrac\pi4" /> on its own does not answer the question.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="y = \tfrac12\arctan(x) \implies x = \tan(2y)" />,
    reason: <>Swapping <Katex tex="x" /> and <Katex tex="y" /> and making the new <Katex tex="y" /> the subject gives the inverse directly.</>,
  },
  {
    working: <Katex display tex="f^{-1}(x) = \tan(2x),\quad x\in\left(-\tfrac\pi4,\tfrac\pi4\right)" />,
    reason: <>The domain of the inverse is the range of <Katex tex="f" />, which part b(i) just established — this is what stops the sketch running past the asymptotes.</>,
  },
  {
    working: <Katex display tex="\text{asymptotes: } x = \tfrac\pi4,\ x = -\tfrac\pi4" />,
    reason: <>The horizontal asymptotes of <Katex tex="f" /> become vertical asymptotes of <Katex tex="f^{-1}" />. Labelling them <Katex tex="y=\pm\tfrac\pi4" /> is the report's example of incorrect labelling.</>,
  },
  {
    working: <InverseOverlay />,
    reason: <>The reflection of the printed curve in <Katex tex="y=x" />, drawn in orange on VCAA's own axes, with its vertical asymptotes dashed at the reflections of the printed horizontal ones. It passes through the origin with gradient 2 and is increasing, so <Katex tex="-\tan(2x)" /> — a wrong shape the report names — is upside down. It must stay between its asymptotes and bend towards them, not away.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f(\sqrt3) = \tfrac12\arctan(\sqrt3)" />,
    reason: <>Straight substitution.</>,
  },
  {
    working: <Katex display tex="\tan\!\left(\tfrac\pi3\right) = \sqrt3 \implies \arctan(\sqrt3) = \tfrac\pi3" />,
    reason: <>An exact value worth knowing cold; <Katex tex="\tfrac\pi3" /> lies in <Katex tex="\left(-\tfrac\pi2,\tfrac\pi2\right)" />, so it is the principal value.</>,
  },
  {
    working: <Katex display tex="\boxed{f(\sqrt3) = \tfrac\pi6}" />,
    reason: <>Halving. Answering <Katex tex="\tfrac\pi3" /> forgets the <Katex tex="\tfrac12" />; <Katex tex="\tfrac\pi{12}" /> halves twice.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: (
      <div className="flex flex-col gap-2">
        <img
          src={areaSrc}
          alt="The curve y = arctan(x)/2 with the region A between it and the x-axis from the origin to x = √3 shaded, the point (√3, π/6) marked, and the region B above the curve completing the rectangle"
          className="w-full max-w-[360px]"
        />
      </div>
    ),
    reason: <>The region <Katex tex="A" /> asked for, inside the rectangle <Katex tex="\sqrt3\times\tfrac\pi6" /> fixed by part c. Region <Katex tex="B" /> above the curve is the one that part a. can integrate.</>,
  },
  {
    working: <Katex display tex="A + B = \sqrt3\times\tfrac\pi6 = \tfrac{\sqrt3\,\pi}6" />,
    reason: <>The rectangle has width <Katex tex="\sqrt3" /> and height <Katex tex="f(\sqrt3)=\tfrac\pi6" />.</>,
  },
  {
    working: <Katex display tex="B = \int_0^{\pi/6}f^{-1}(y)\,dy = \int_0^{\pi/6}\tan(2y)\,dy" />,
    reason: <>Region <Katex tex="B" /> is bounded on the left by the <Katex tex="y" />-axis, so integrating <em>along the </em><Katex tex="y" /><em>-axis</em> turns it into the integral part a. handed you.</>,
  },
  {
    working: <Katex display tex="B = \left[\tfrac12\log_e\bigl|\sec(2y)\bigr|\right]_0^{\pi/6}" />,
    reason: <>Exactly the antiderivative shown in part a. — that is what part a. was for.</>,
  },
  {
    working: <Katex display tex="= \tfrac12\log_e\!\left|\sec\!\left(\tfrac\pi3\right)\right| - \tfrac12\log_e\bigl|\sec(0)\bigr|" />,
    reason: <>Substituting the terminals.</>,
  },
  {
    working: <Katex display tex="= \tfrac12\log_e(2) - \tfrac12\log_e(1) = \tfrac12\log_e(2)" />,
    reason: <><Katex tex="\sec\!\left(\tfrac\pi3\right)=\tfrac1{\cos(\pi/3)}=2" /> and <Katex tex="\log_e(1)=0" />. This value alone is region <Katex tex="B" />, and handing it in was the report's common wrong answer.</>,
  },
  {
    working: <Katex display tex="\boxed{A = \frac{\sqrt3\,\pi}{6} - \frac12\log_e(2)}" />,
    reason: <>Numerically <Katex tex="0.907-0.347\approx0.56" />, which is plausible for a region roughly <Katex tex="1.7" /> wide and a little under <Katex tex="0.5" /> tall.</>,
  },
]

export default function SpecialistQ8_2015Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 8 (7 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Antiderivative"
        marks={2}
        statement={
          <>
            Show that{' '}
            <Katex tex="\displaystyle\int\tan(2x)\,dx = \tfrac12\log_e\bigl|\sec(2x)\bigr|+c" />
            .
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1 flex flex-col gap-3">
        <p>
          The graph of <Katex tex="f(x)=\tfrac12\arctan(x)" /> is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="An increasing S-shaped curve through the origin flattening out towards two horizontal dashed asymptotes, on a gridded set of axes — from the original 2015 VCAA exam paper"
            className="w-full max-w-[440px]"
          />
        </div>
      </div>

      <PartCard
        letter="b.i"
        topic="Asymptotes"
        marks={1}
        statement={<>Write down the equations of the asymptotes.</>}
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Sketch Inverse"
        marks={1}
        statement={
          <>
            On the axes above, sketch the graph of <Katex tex="f^{-1}" />, labelling any
            asymptotes with their equations.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard letter="c" topic="Function Value" marks={1} statement={<>Find <Katex tex="f(\sqrt3)" />.</>} examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Area Under Curve"
        marks={2}
        statement={
          <>
            Find the area enclosed by the graph of <Katex tex="f" />, the{' '}
            <Katex tex="x" />-axis and the line <Katex tex="x=\sqrt3" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <Background>
          <p>
            The four parts are one chain: part a. supplies an antiderivative, part b. supplies
            the inverse function, part c. supplies a terminal, and part d. needs all three at
            once. An antiderivative of <Katex tex="\arctan(x)" /> is not on the formula sheet,
            and the technique that finds one (integration by parts) is not part of VCE
            Specialist Mathematics — so the region is turned on its side and integrated in{' '}
            <Katex tex="y" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}

// Part b(ii)'s answer drawn over VCAA's own figure (guide §7: annotate the crop, never re-plot
// it). Pixel calibration measured from spec-2015e1-q8-graph.png (1160 × 691): origin (564,
// 359.5); VCAA drew the asymptotes y = ±π/4 at 118.5 px from the x-axis, so 1 unit = 150.9 px
// in both directions, which keeps the reflection in y = x true to the printed asymptotes.
const INVERSE_PATH = 'M 477.5 693.7 L 478.1 686.8 L 478.7 680.1 L 479.3 673.7 L 479.9 667.5 L 480.5 661.5 L 481.1 655.6 L 481.6 650.0 L 482.2 644.5 L 482.8 639.1 L 483.4 633.9 L 484.0 628.9 L 484.6 624.0 L 485.2 619.3 L 485.8 614.6 L 486.4 610.1 L 487.0 605.7 L 487.6 601.4 L 488.2 597.2 L 488.8 593.2 L 489.3 589.2 L 489.9 585.3 L 490.5 581.5 L 491.1 577.8 L 491.7 574.2 L 492.3 570.6 L 492.9 567.2 L 493.5 563.8 L 494.1 560.5 L 494.7 557.2 L 495.3 554.0 L 495.9 550.9 L 496.5 547.8 L 497.0 544.8 L 497.6 541.9 L 498.2 539.0 L 498.8 536.2 L 499.4 533.4 L 500.0 530.6 L 500.6 528.0 L 501.2 525.3 L 501.8 522.7 L 502.4 520.2 L 503.0 517.7 L 503.6 515.2 L 504.2 512.8 L 504.8 510.4 L 505.3 508.0 L 505.9 505.7 L 506.5 503.4 L 507.1 501.2 L 507.7 499.0 L 508.3 496.8 L 508.9 494.6 L 509.5 492.5 L 510.1 490.4 L 510.7 488.4 L 511.3 486.3 L 511.9 484.3 L 512.5 482.3 L 513.0 480.4 L 513.6 478.4 L 514.2 476.5 L 514.8 474.6 L 515.4 472.8 L 516.0 470.9 L 516.6 469.1 L 517.2 467.3 L 517.8 465.5 L 518.4 463.8 L 519.0 462.0 L 519.6 460.3 L 520.2 458.6 L 520.7 456.9 L 521.3 455.3 L 521.9 453.6 L 522.5 452.0 L 523.1 450.3 L 523.7 448.7 L 524.3 447.1 L 524.9 445.6 L 525.5 444.0 L 526.1 442.4 L 526.7 440.9 L 527.3 439.4 L 527.9 437.9 L 528.5 436.4 L 529.0 434.9 L 529.6 433.4 L 530.2 432.0 L 530.8 430.5 L 531.4 429.1 L 532.0 427.6 L 532.6 426.2 L 533.2 424.8 L 533.8 423.4 L 534.4 422.0 L 535.0 420.6 L 535.6 419.2 L 536.2 417.9 L 536.7 416.5 L 537.3 415.2 L 537.9 413.8 L 538.5 412.5 L 539.1 411.2 L 539.7 409.8 L 540.3 408.5 L 540.9 407.2 L 541.5 405.9 L 542.1 404.6 L 542.7 403.3 L 543.3 402.1 L 543.9 400.8 L 544.4 399.5 L 545.0 398.2 L 545.6 397.0 L 546.2 395.7 L 546.8 394.5 L 547.4 393.2 L 548.0 392.0 L 548.6 390.7 L 549.2 389.5 L 549.8 388.3 L 550.4 387.1 L 551.0 385.8 L 551.6 384.6 L 552.1 383.4 L 552.7 382.2 L 553.3 381.0 L 553.9 379.8 L 554.5 378.6 L 555.1 377.4 L 555.7 376.2 L 556.3 375.0 L 556.9 373.8 L 557.5 372.6 L 558.1 371.4 L 558.7 370.2 L 559.3 369.0 L 559.9 367.8 L 560.4 366.6 L 561.0 365.4 L 561.6 364.2 L 562.2 363.1 L 562.8 361.9 L 563.4 360.7 L 564.0 359.5 L 564.6 358.3 L 565.2 357.1 L 565.8 355.9 L 566.4 354.8 L 567.0 353.6 L 567.6 352.4 L 568.1 351.2 L 568.7 350.0 L 569.3 348.8 L 569.9 347.6 L 570.5 346.4 L 571.1 345.2 L 571.7 344.0 L 572.3 342.8 L 572.9 341.6 L 573.5 340.4 L 574.1 339.2 L 574.7 338.0 L 575.3 336.8 L 575.9 335.6 L 576.4 334.4 L 577.0 333.2 L 577.6 331.9 L 578.2 330.7 L 578.8 329.5 L 579.4 328.3 L 580.0 327.0 L 580.6 325.8 L 581.2 324.5 L 581.8 323.3 L 582.4 322.0 L 583.0 320.8 L 583.6 319.5 L 584.1 318.2 L 584.7 316.9 L 585.3 315.7 L 585.9 314.4 L 586.5 313.1 L 587.1 311.8 L 587.7 310.5 L 588.3 309.2 L 588.9 307.8 L 589.5 306.5 L 590.1 305.2 L 590.7 303.8 L 591.3 302.5 L 591.8 301.1 L 592.4 299.8 L 593.0 298.4 L 593.6 297.0 L 594.2 295.6 L 594.8 294.2 L 595.4 292.8 L 596.0 291.4 L 596.6 289.9 L 597.2 288.5 L 597.8 287.0 L 598.4 285.6 L 599.0 284.1 L 599.5 282.6 L 600.1 281.1 L 600.7 279.6 L 601.3 278.1 L 601.9 276.6 L 602.5 275.0 L 603.1 273.4 L 603.7 271.9 L 604.3 270.3 L 604.9 268.7 L 605.5 267.0 L 606.1 265.4 L 606.7 263.7 L 607.3 262.1 L 607.8 260.4 L 608.4 258.7 L 609.0 257.0 L 609.6 255.2 L 610.2 253.5 L 610.8 251.7 L 611.4 249.9 L 612.0 248.1 L 612.6 246.2 L 613.2 244.4 L 613.8 242.5 L 614.4 240.6 L 615.0 238.6 L 615.5 236.7 L 616.1 234.7 L 616.7 232.7 L 617.3 230.6 L 617.9 228.6 L 618.5 226.5 L 619.1 224.4 L 619.7 222.2 L 620.3 220.0 L 620.9 217.8 L 621.5 215.6 L 622.1 213.3 L 622.7 211.0 L 623.2 208.6 L 623.8 206.2 L 624.4 203.8 L 625.0 201.3 L 625.6 198.8 L 626.2 196.3 L 626.8 193.7 L 627.4 191.0 L 628.0 188.4 L 628.6 185.6 L 629.2 182.8 L 629.8 180.0 L 630.4 177.1 L 631.0 174.2 L 631.5 171.2 L 632.1 168.1 L 632.7 165.0 L 633.3 161.8 L 633.9 158.5 L 634.5 155.2 L 635.1 151.8 L 635.7 148.4 L 636.3 144.8 L 636.9 141.2 L 637.5 137.5 L 638.1 133.7 L 638.7 129.8 L 639.2 125.8 L 639.8 121.8 L 640.4 117.6 L 641.0 113.3 L 641.6 108.9 L 642.2 104.4 L 642.8 99.7 L 643.4 95.0 L 644.0 90.1 L 644.6 85.1 L 645.2 79.9 L 645.8 74.5 L 646.4 69.0 L 647.0 63.4 L 647.5 57.5 L 648.1 51.5 L 648.7 45.3 L 649.3 38.9 L 649.9 32.2 L 650.5 25.3 L 651.1 18.2 L 651.7 10.8 L 652.3 3.2 L 652.9 -4.8'

function InverseOverlay() {
  return (
    <div className="relative w-full max-w-[440px] bg-white rounded-xl border border-gray-200 dark:border-gray-800 p-0 overflow-hidden">
      <img
        src={graphSrc}
        alt="VCAA's graph of y = arctan(x)/2 with this site's answer overlaid in orange: y = tan(2x) rising steeply through the origin between dashed vertical asymptotes x = ±π/4"
        className="w-full block"
      />
      <svg viewBox="0 0 1160 691" className="absolute inset-0 w-full h-full" aria-hidden="true">
        <path d={INVERSE_PATH} fill="none" stroke="#f97316" strokeWidth={5} />
        <line x1={445.5} y1={0} x2={445.5} y2={691} stroke="#f97316" strokeWidth={3} strokeDasharray="18 12" />
        <line x1={682.5} y1={0} x2={682.5} y2={691} stroke="#f97316" strokeWidth={3} strokeDasharray="18 12" />
        <text x={433} y={120} textAnchor="end" fontSize={34} fill="#f97316" fontStyle="italic">x = −π/4</text>
        <text x={695} y={620} textAnchor="start" fontSize={34} fill="#f97316" fontStyle="italic">x = π/4</text>
      </svg>
    </div>
  )
}
