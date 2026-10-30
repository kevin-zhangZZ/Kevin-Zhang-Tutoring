// 2021 Chemistry Exam, Section B Question 9 (11 marks). Aspartame breaking down to DKP in
// lemonade, followed by HPLC: why aspartame is added (old food-chemistry content — part a. is
// labelled "Not in the Current Study Design", following the skip guide's 2018 MCQ 2 ruling on
// aspartame/artificial sweeteners), the dependent variable, the missing calibration-curve steps,
// improving peak resolution, a conclusion from the data table, and an uncontrolled variable and
// its effect on validity. Question text transcribed from the original paper; the two calibration
// chromatograms and the lemonade chromatogram are cropped from the original VCAA exam PDF; the
// results table is transcribed. Mark distributions and comments are from the VCAA examination
// report (VCAA report only — no second source). The "How to Think About It" notes, model answers
// and our mark-scheme readings are original. Concentration changes checked in Python.
// Note: the report's first example for e.i. says no analysis was done "at time = 0"; the paper
// does test one can at the start, so the working reads it as "each can's own starting
// concentration was never measured".

import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import calibrationSrc from './chem-2021sa-q9-calibration.png'
import lemonadeSrc from './chem-2021sa-q9-lemonade.png'

const EXAM_BI: SAExaminerStats = {
  marks: [30, 70],
  average: 0.7,
  comment: (
    <>
      Any of the following responses were accepted:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>rate of production of DKP</li>
        <li>change in concentration of DKP (over time)</li>
        <li>change in amount of DKP (over time).</li>
      </ul>
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [73, 13, 7, 6],
  average: 0.5,
  comment: (
    <>
      The correct steps are:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>Calibrate the high-performance liquid chromatography (HPLC) under experimental conditions.</li>
        <li>Run a range of standard solutions for DKP.</li>
        <li>Use these standards to produce a calibration curve.</li>
      </ul>
      The DKP levels in the lemonade could then be analysed by comparison with this calibration curve at the
      various time intervals.
      <br />
      The use of a calibration curve produced under the same conditions that experimental data is collected is a
      fundamental aspect of instrumental analysis, which is explicitly stated in the study design.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [89, 11],
  average: 0.1,
  comment: (
    <>
      Any one of the following responses were accepted:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>increasing the length of the column</li>
        <li>altering either the mobile or stationary phases</li>
        <li>altering the temperature of the column.</li>
      </ul>
      A common incorrect response was &lsquo;repeat more trials&rsquo;, which is not applicable when asked to state a
      change to the operating conditions of the instrument.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [78, 22],
  average: 0.2,
  comment: (
    <>
      Measurement errors occur due to the overlap of the two peaks. If any of the stated factors in Part 9ci. are
      altered this can result in improved separation/resolution of peaks in a HPLC. Improved resolution of peaks
      leads to a more reliable analysis of peak areas and subsequently the concentrations of aspartame and DKP.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [33, 67],
  average: 0.7,
  comment: (
    <>
      A mark was awarded if any one of the following concepts was communicated by the student.
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>As the temperature increases, the concentration of DKP shows a general increase.</li>
        <li>
          With the exception of the outlier at 25 °C, the trend is that as temperature increases the concentration of
          DKP increases.
        </li>
        <li>
          There is no consistent trend in DKP as the 15 °C trial shows a decrease in DKP concentration compared to
          other temperatures, which show an average increase.
        </li>
      </ul>
    </>
  ),
}

const EXAM_EI: SAExaminerStats = {
  marks: [74, 26],
  average: 0.3,
  comment: (
    <>
      The following are examples of variables that have not been controlled in this experiment:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          the initial concentration DKP/aspartame was not known (i.e. no analysis of either DKP or aspartame was done
          at time = 0)
        </li>
        <li>the age of the cans of lemonade (i.e. were they produced from the same batch?)</li>
        <li>the brands/sources of lemonade that are used.</li>
      </ul>
    </>
  ),
}

const EXAM_EII: SAExaminerStats = {
  marks: [62, 38],
  average: 0.4,
  comment: (
    <>
      Students were required to relate the effect of the uncontrolled variable identified in Question 9ei. to the
      validity of the experiment. A response could have been as follows:
      <br />
      The lack of initial concentration values means it cannot be assumed that the starting concentrations of
      aspartame and DKP were the same in each can. Therefore, the final concentrations cannot be relied upon as a
      measure of the production of DKP, hence the validity of the experiment is compromised.
    </>
  ),
}

const ROWS_BI: WorkingRow[] = [
  {
    working: <>The <b>rate of production of DKP</b> — measured as the <b>change in concentration of DKP over time</b>.</>,
    reason: (
      <>
        The <b>independent</b> variable is what Kim deliberately changes: the <b>storage temperature</b> (15, 25,
        35 °C). The <b>dependent</b> variable is what she measures to see its effect — the aim says &ldquo;the effect of
        storage temperature on the <b>rate of production of DKP</b>&rdquo;. Just &ldquo;DKP&rdquo; or &ldquo;temperature&rdquo; is not enough.
      </>
    ),
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: (
      <>
        Prepare a <b>range of DKP standard solutions</b> of <b>known concentrations</b> (e.g. by diluting the DKP stock
        to several different concentrations that cover the expected range in the diluted lemonade).
      </>
    ),
    reason: (
      <>
        Mark: a <b>range</b> of standards. Steps 1–5 give only <b>one</b> DKP standard (1000 mg L⁻¹ diluted 100-fold
        to 10 mg L⁻¹) — one point cannot make a calibration curve, and it only tells Kim DKP&rsquo;s retention time.
      </>
    ),
  },
  {
    working: (
      <>
        Inject each standard into the HPLC <b>under the same operating conditions</b> as the lemonade samples and
        record the <b>peak area</b> of the DKP peak (at its retention time, about 6.3 min).
      </>
    ),
    reason: (
      <>
        Mark: calibrate <b>under the experimental conditions</b>. Retention time identifies <i>which</i> peak is DKP;
        the <b>area</b> under that peak tells you <i>how much</i>. A peak area only means something when compared with
        standards run the same way (same column, mobile phase, temperature, flow rate).
      </>
    ),
  },
  {
    working: (
      <>
        Plot a <b>calibration curve</b> of peak area against DKP concentration. Use it to read the DKP concentration of
        each diluted lemonade sample from its peak area, then multiply by the <b>dilution factor</b> (×100) to get the
        concentration in the can.
      </>
    ),
    reason: (
      <>
        Mark: <b>produce a calibration curve</b> and use it. Steps 7–8 dilute 10.00 mL to 1.000 L, a 100-fold dilution,
        so the can&rsquo;s concentration is 100 × the reading.
      </>
    ),
  },
  {
    working: (
      <>
        Plot DKP concentration against time for each storage temperature; the <b>gradient</b> gives the <b>rate of
        production of DKP</b> at that temperature.
      </>
    ),
    reason: <>This turns the concentrations into the dependent variable from part b.i — the rate.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <>Use a <b>longer column</b> (or change the <b>mobile phase</b>/<b>stationary phase</b>, or the <b>column temperature</b>).</>,
    reason: (
      <>
        Any one of these is the mark; one is enough. It must be an <b>operating condition of the HPLC</b> — the report
        says &lsquo;repeat more trials&rsquo; was a common incorrect response, because it does not change how
        the instrument runs.
      </>
    ),
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: (
      <>
        Aspartame (≈ 6.1 min) and DKP (≈ 6.3 min) have very similar retention times, so in the lemonade chromatogram
        their <b>peaks overlap</b>.
      </>
    ),
    reason: (
      <>
        Compare the two calibration chromatograms with the lemonade one: the lemonade shows one tall peak with a small
        shoulder on its right — two peaks run together. Overlap is the <b>source of the measurement error</b>.
      </>
    ),
  },
  {
    working: (
      <>
        A longer column gives more interaction with the stationary phase, so the difference in retention times
        increases and the peaks are <b>separated (better resolution)</b>. Each <b>peak area</b> can then be measured
        accurately, giving <b>more accurate concentrations</b> of aspartame and DKP.
      </>
    ),
    reason: (
      <>
        Mark: link the change to <b>better separation/resolution</b> of the peaks and so to reliable <b>peak areas</b>.
        Concentration comes from peak area, and overlapping peaks make each area uncertain.
      </>
    ),
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: (
      <>
        At 15 °C, DKP falls slightly (0.00045 → 0.00041 M); at 25 °C it rises to 0.00063 M; at 35 °C to 0.00058 M.
      </>
    ),
    reason: (
      <>
        Compare each temperature with the starting value, 0.00045 M DKP. Over three days: 15 °C −0.00004 M, 25 °C
        +0.00018 M, 35 °C +0.00013 M. On days 1 and 2 the 35 °C cans have the most DKP (0.00051 and 0.00049 M,
        against 0.00043–0.00046 M at the lower temperatures). Aspartame falls most at 35 °C (0.00178 → 0.00154 M),
        which fits it breaking down faster when warmer.
      </>
    ),
  },
  {
    working: (
      <>
        <b>As the storage temperature increases, the concentration of DKP generally increases</b>, so the rate of
        production of DKP generally increases with temperature — although the trend is <b>not consistent</b> (the
        25 °C day-3 value looks like an <b>outlier</b>).
      </>
    ),
    reason: (
      <>
        Mark: a conclusion must <b>answer the aim</b> — the effect of <b>temperature</b> on DKP. It is a trend statement
        drawn from the data, not a list of numbers. Saying the data is inconsistent (15 °C even decreases) was also
        accepted.
      </>
    ),
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: (
      <>
        The <b>initial concentrations</b> of aspartame and DKP <b>in each can</b> (only one can was tested at the start).
      </>
    ),
    reason: (
      <>
        A controlled variable is anything other than temperature that could affect the DKP results and should be kept
        the same. Only one can was analysed before storage, so the other nine cans&rsquo; starting values are assumed,
        not measured. Also accepted: the <b>age/batch</b> of the cans, or the <b>brand/source</b> of the lemonade.
        (The report&rsquo;s first example says no analysis was done &ldquo;at time = 0&rdquo;. Kim did test one can at the
        start, so read it as: none of the nine stored cans was analysed at time = 0.)
      </>
    ),
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: (
      <>
        Because the starting concentrations were not measured for each can, we <b>cannot assume they were the same</b>.
        A different DKP concentration after storage could be due to a different starting concentration rather than the
        temperature, so the results do not measure the <b>production of DKP</b> caused by temperature — the <b>validity
        of the experiment is compromised</b>.
      </>
    ),
    reason: (
      <>
        Mark: link the variable to <b>validity</b>. A <b>valid</b> experiment measures what it claims to measure — here
        the effect of temperature. If another variable could also cause the change, the effect of temperature can&rsquo;t
        be isolated. (Indeed, the 15 °C cans show DKP <i>below</i> the starting value, which hints the cans differed.)
      </>
    ),
  },
]

const cell = 'border border-gray-300 dark:border-gray-700 px-2.5 py-1.5 text-center'

export default function ChemistryQ9_2021SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 9 (11 marks)</p>
        <p className="mb-2">
          Aspartame is an ingredient in some soft drinks. Aspartame is unstable in some conditions and reacts to form
          four main products. One of the products of aspartame breakdown is
          5-benzyl-3,6-dioxo-2-piperazineacetic acid (DKP). It is thought that DKP may be harmful to humans.
        </p>
        <p className="mb-3">
          A student, Kim, investigates the effect of storage temperature on the rate of production of DKP from aspartame
          in lemonade. Experimental data is obtained using high-performance liquid chromatography (HPLC) to analyse the
          aspartame and DKP content in lemonade samples.
        </p>
        <p className="font-semibold text-gray-900 dark:text-white mb-1">HPLC calibration</p>
        <p className="mb-1">Kim first calibrated the HPLC using the following method:</p>
        <ol className="list-decimal pl-7 mb-3 flex flex-col gap-0.5">
          <li>Prepare and refrigerate a standard solution of pure aspartame with a concentration of 1000 mg L⁻¹.</li>
          <li>Transfer a 10.00 mL aliquot of the pure aspartame solution into a 1.000 L volumetric flask.</li>
          <li>Fill the volumetric flask up to the 1.000 L mark with deionised water and shake the flask.</li>
          <li>Inject a sample of the diluted aspartame solution into the HPLC to obtain a chromatogram.</li>
          <li>Repeat steps 1–4 with DKP.</li>
        </ol>
        <p className="mb-2">The following two calibration chromatograms were obtained.</p>
        <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={calibrationSrc}
            alt="Two calibration chromatograms: aspartame gives a single peak at a retention time just after 6 min; DKP gives a single peak slightly later, at about 6.3 min — from the original 2021 VCAA exam paper"
            className="w-full max-w-[420px]"
          />
        </div>
        <p className="font-semibold text-gray-900 dark:text-white mb-1">Analysis of lemonade samples</p>
        <p className="mb-1">
          Kim then followed the method given in steps 6–14 to investigate the rate of production of DKP from aspartame
          in lemonade at different storage temperatures.
        </p>
        <ol start={6} className="list-decimal pl-7 mb-3 flex flex-col gap-0.5">
          <li>Open a can of lemonade.</li>
          <li>Transfer a 10.00 mL aliquot of lemonade from the can into a 1.000 L volumetric flask.</li>
          <li>Fill the volumetric flask up to the 1.000 L mark with deionised water and shake the flask.</li>
          <li>Inject a sample of the diluted lemonade into the HPLC using the same operating conditions used during calibration.</li>
          <li>Set up three water baths at temperatures of 15 °C, 25 °C and 35 °C.</li>
          <li>Put three unopened cans of lemonade into each of the three water baths.</li>
          <li>After one day, take one can from each water bath and follow steps 6–9.</li>
          <li>After two days, take one can from each water bath and follow steps 6–9.</li>
          <li>After three days, take one can from each water bath and follow steps 6–9.</li>
        </ol>
        <p className="mb-2">One of the chromatograms from the diluted lemonade is given below.</p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={lemonadeSrc}
            alt="Chromatogram of the diluted lemonade: one tall peak at about 6.1 min with a small shoulder peak on its right at about 6.3 min, the two overlapping — from the original 2021 VCAA exam paper"
            className="w-full max-w-[440px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Artificial Sweeteners"
        marks={2}
        statement={<>Using your knowledge of food chemistry, explain why aspartame is sometimes added to lemonade.</>}
      >
        <Background title="Not in the Current Study Design" always>
          <p>
            Part a. tests the old study design&rsquo;s food chemistry on <b>artificial sweeteners</b> (aspartame compared
            with sugar). Artificial sweeteners are not in the 2024–2027 study design, so this part is left without a
            worked solution; the skip guide lists aspartame (artificial sweeteners) questions as ones to skip. The rest
            of this question — experimental design and HPLC — is fully current.
          </p>
        </Background>
      </PartCard>

      <PartCard
        letter="b.i"
        topic="Dependent Variable"
        marks={1}
        statement={<>What is the dependent variable?</>}
        examinerReport={EXAM_BI}
      >
        <Background title="How to Think About It">
          <p>
            Read the aim: Kim &ldquo;investigates the effect of <b>storage temperature</b> on the <b>rate of production of
            DKP</b>&rdquo;. In &ldquo;the effect of X on Y&rdquo;, X is the independent variable and Y is the dependent
            variable. One mark, one idea — name Y precisely.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BI} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Any one of: <b>rate of production of DKP</b>; <b>change in concentration of DKP</b> (over time); <b>change in amount of DKP</b> (over time).</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Calibration Curve"
        marks={3}
        statement={<>What steps, in addition to steps 1–14, need to be taken to use the HPLC data to measure the dependent variable?</>}
        examinerReport={EXAM_BII}
      >
        <Background title="How to Think About It">
          <p>
            Ask: how does an HPLC peak become a <b>concentration</b>? Only through a <b>calibration curve</b> — peak area
            against concentration for several <b>standards</b> run under the same conditions. Kim ran just <b>one</b>{' '}
            standard of each compound, which only tells her where each peak appears. Three marks means three steps: a{' '}
            <b>range of DKP standards</b>, run <b>under the experimental conditions</b>, used to make a <b>calibration
            curve</b>. Only 6% of students scored all three.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BII} />
        <MarkScheme
          source="ours"
          points={[
            { point: <>Run a <b>range of standard solutions of DKP</b> of known concentration.</> },
            { point: <>Calibrate the HPLC <b>under the same (experimental) conditions</b> as the lemonade samples, measuring <b>peak areas</b>.</> },
            { point: <>Use the standards to <b>produce a calibration curve</b> (peak area vs concentration) and read the DKP concentrations of the lemonade samples from it.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="c.i"
        topic="HPLC Resolution"
        marks={1}
        statement={<>State a change to the operating conditions of the HPLC that could be made to reduce the errors in measuring the concentrations of aspartame and DKP.</>}
        examinerReport={EXAM_CI}
      >
        <Background title="How to Think About It">
          <p>
            Look at the chromatograms before you answer. Aspartame and DKP come out at almost the same time, so in the
            lemonade their <b>peaks overlap</b> — that is the error. The fix is something that <b>separates</b> the two
            peaks, and it has to be a change to <b>how the HPLC runs</b> (column, phases, temperature). &lsquo;Repeat more
            trials&rsquo; is the trap the report names: it does not change the operating conditions.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CI} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Any one of: <b>increase the length of the column</b>; <b>alter the mobile or stationary phase</b>; <b>alter the temperature of the column</b>. (&lsquo;Repeat more trials&rsquo; was not accepted.)</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="HPLC Resolution"
        marks={1}
        statement={<>State how this change would reduce the measurement errors.</>}
        examinerReport={EXAM_CII}
      >
        <Background title="How to Think About It">
          <p>
            The chain the marker wants is: overlapping peaks → the change gives <b>better separation (resolution)</b> →
            each <b>peak area</b> can be measured properly → <b>more accurate concentrations</b>. Name the overlap as the
            cause of the error, then link your change from c.i to resolving it.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CII} />
        <MarkScheme
          source="ours"
          points={[
            { point: <>The change gives <b>improved separation/resolution</b> of the <b>overlapping</b> aspartame and DKP peaks, so the <b>peak areas</b> — and so the concentrations — are measured more reliably.</> },
          ]}
        />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-1">Kim found that the can of lemonade tested at the beginning of the experiment contained:</p>
        <ul className="list-disc pl-6 mb-2">
          <li>0.00178 M aspartame</li>
          <li>0.00045 M DKP.</li>
        </ul>
        <p className="mb-2">Kim quantified the remaining data from the HPLC and prepared the following table.</p>
        <div className="overflow-x-auto">
          <table className="text-[13.5px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
            <thead>
              <tr>
                <th rowSpan={2} className={`${cell} font-semibold`}>Storage temperature</th>
                <th colSpan={2} className={`${cell} font-semibold`}>Concentration after one day (M)</th>
                <th colSpan={2} className={`${cell} font-semibold`}>Concentration after two days (M)</th>
                <th colSpan={2} className={`${cell} font-semibold`}>Concentration after three days (M)</th>
              </tr>
              <tr>
                <th className={`${cell} font-semibold`}>Aspartame</th>
                <th className={`${cell} font-semibold`}>DKP</th>
                <th className={`${cell} font-semibold`}>Aspartame</th>
                <th className={`${cell} font-semibold`}>DKP</th>
                <th className={`${cell} font-semibold`}>Aspartame</th>
                <th className={`${cell} font-semibold`}>DKP</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className={cell}>15 °C</td><td className={cell}>0.00179</td><td className={cell}>0.00043</td><td className={cell}>0.00175</td><td className={cell}>0.00042</td><td className={cell}>0.00176</td><td className={cell}>0.00041</td></tr>
              <tr><td className={cell}>25 °C</td><td className={cell}>0.00175</td><td className={cell}>0.00044</td><td className={cell}>0.00172</td><td className={cell}>0.00046</td><td className={cell}>0.00171</td><td className={cell}>0.00063</td></tr>
              <tr><td className={cell}>35 °C</td><td className={cell}>0.00160</td><td className={cell}>0.00051</td><td className={cell}>0.00155</td><td className={cell}>0.00049</td><td className={cell}>0.00154</td><td className={cell}>0.00058</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <PartCard
        letter="d"
        topic="Drawing Conclusions"
        marks={1}
        statement={<>Write a conclusion based on the results given in the table above.</>}
        examinerReport={EXAM_D}
      >
        <Background title="How to Think About It">
          <p>
            A conclusion answers the <b>aim</b>: what is the effect of <b>temperature</b> on the production of DKP? Compare
            each row&rsquo;s DKP with the starting 0.00045 M and state the overall <b>trend</b> in one sentence. The data is
            messy, so an honest conclusion notes that too — the report accepted either the general trend (with the
            25 °C outlier) or &ldquo;no consistent trend&rdquo;.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Any one of: <b>as temperature increases, the concentration of DKP generally increases</b>; the same trend <b>except for the 25 °C outlier</b>; or <b>no consistent trend</b>, since DKP decreases at 15 °C while the other temperatures show an increase.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="e.i"
        topic="Controlled Variables"
        marks={1}
        statement={<>Identify a variable that has not been controlled.</>}
        examinerReport={EXAM_EI}
      >
        <Background title="How to Think About It">
          <p>
            Go through the method looking for anything <b>other than temperature</b> that could make one can&rsquo;s DKP
            differ from another&rsquo;s. Nine different cans were stored, but only one was analysed at the start — so each
            can&rsquo;s starting concentration is unknown. Name one specific variable.
          </p>
        </Background>
        <WorkingTable rows={ROWS_EI} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Any one of: the <b>initial concentration of DKP/aspartame</b> in each can; the <b>age/batch of the cans</b>; the <b>brand/source of the lemonade</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="e.ii"
        topic="Validity"
        marks={1}
        statement={<>Explain how the variable identified in <b>part e.i.</b> affects the validity of the experiment.</>}
        examinerReport={EXAM_EII}
      >
        <Background title="How to Think About It">
          <p>
            <b>Validity</b> asks: does the experiment measure what it claims to — the effect of temperature on DKP
            production? Explain how your uncontrolled variable could <b>also</b> change the DKP results, so the effect of
            temperature can&rsquo;t be separated out. The report says students had to <b>relate</b> the variable to validity;
            name the variable, then say what it does to the results.
          </p>
        </Background>
        <WorkingTable rows={ROWS_EII} />
        <MarkScheme
          source="ours"
          points={[
            { point: <>The starting concentrations <b>cannot be assumed to be the same in each can</b>, so the final DKP concentrations <b>cannot be relied on as a measure of DKP production</b> due to temperature — <b>validity is compromised</b>.</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
