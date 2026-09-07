// 2016 Specialist Mathematics — Exam 2, Question 3 (11 marks).
// Two-tank mixing problem solved by a first-order linear differential equation.
// Question text transcribed from the original paper; worked solutions below are original.

import { useState, ReactNode } from 'react'
import Katex from '../../../components/Katex'

// Dropbox share links for the tutor's video walkthrough of each part, converted to `raw=1`
// so the browser can stream them directly (Dropbox re-signs the redirect on every request,
// so this stays valid even though the resolved CDN URL is time-limited).
const VIDEO = {
  a: 'https://www.dropbox.com/scl/fo/x672xwjrtj2j9xu7i61hm/AIOn1w4ddBCICyFZTZXW8gA/SAQ3a.MP4?rlkey=5hew4el0gbyauzhc3y9aqdda2&raw=1',
  b: 'https://www.dropbox.com/scl/fo/x672xwjrtj2j9xu7i61hm/ACcreEmy-vDumy_DslW6WW0/SAQ3b.MP4?rlkey=5hew4el0gbyauzhc3y9aqdda2&raw=1',
  c: 'https://www.dropbox.com/scl/fo/x672xwjrtj2j9xu7i61hm/AGMUilrUNPQu-Vz1Iah6h9E/SAQ3c.MP4?rlkey=5hew4el0gbyauzhc3y9aqdda2&raw=1',
  d: 'https://www.dropbox.com/scl/fo/x672xwjrtj2j9xu7i61hm/AB-4-1fTqn1puMeR_uexDzU/SAQ3d.MP4?rlkey=5hew4el0gbyauzhc3y9aqdda2&raw=1',
  // .mkv isn't reliably playable via the browser's native <video> element, so this one
  // links out to Dropbox instead of embedding.
  e: 'https://www.dropbox.com/scl/fo/x672xwjrtj2j9xu7i61hm/AP_Z5rNBne17FsKM3EepZn8/SAQ3e.mkv?rlkey=5hew4el0gbyauzhc3y9aqdda2&dl=0',
}

export default function SpecialistSAQ3_2016() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
          <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (11 marks)</p>
          <p className="mb-3">
            A tank initially has 20&nbsp;kg of salt dissolved in 100&nbsp;L of water. Pure water flows into the
            tank at a rate of 10&nbsp;L/min. The solution of salt and water, which is kept uniform by stirring,
            flows out of the tank at a rate of 5&nbsp;L/min.
          </p>
          <p>
            If <Katex tex="x" /> kilograms is the amount of salt in the tank after <Katex tex="t" /> minutes, it
            can be shown that the differential equation relating <Katex tex="x" /> and <Katex tex="t" /> is
          </p>
          <Katex display tex="\frac{dx}{dt} + \frac{x}{20+t} = 0." className="my-2" />
        </div>
      </div>

      <Part letter="a" marks={3} videoSrc={VIDEO.a} statement="Solve this differential equation to find x in terms of t.">
        <Step n={1}>
          Separate the variables:
          <Katex display tex="\frac{dx}{x} = -\frac{dt}{20+t}" className="my-2" />
        </Step>
        <Step n={2}>
          Integrate both sides:
          <Katex display tex="\ln|x| = -\ln(20+t) + c \quad\implies\quad x = \frac{A}{20+t}" className="my-2" />
        </Step>
        <Step n={3}>
          Apply the initial condition — at <Katex tex="t=0" />, <Katex tex="x=20" />:
          <Katex display tex="20 = \frac{A}{20} \implies A = 400" className="my-2" />
        </Step>
        <Step n={4} final>
          <Katex display tex="\boxed{x = \dfrac{400}{20+t}}" className="my-2" />
        </Step>
      </Part>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          A second tank initially has 15&nbsp;kg of salt dissolved in 100&nbsp;L of water. A solution of{' '}
          <Katex tex="\tfrac{1}{60}" /> kg of salt per litre flows into the tank at a rate of 20&nbsp;L/min. The
          solution of salt and water, which is kept uniform by stirring, flows out of the tank at a rate of
          10&nbsp;L/min.
        </p>
      </div>

      <Part
        letter="b"
        marks={1}
        videoSrc={VIDEO.b}
        statement="If y kilograms is the amount of salt in the tank after t minutes, write down an expression for the concentration, in kg/L, of salt in the second tank at time t."
      >
        <Step n={1}>
          Tank 2 gains 20&nbsp;L/min and loses 10&nbsp;L/min, so its volume grows at 10&nbsp;L/min:
          <Katex display tex="\text{volume}(t) = 100 + 10t = 10(10+t)\ \text{L}" className="my-2" />
        </Step>
        <Step n={2} final>
          Concentration is salt divided by volume:
          <Katex display tex="\boxed{\text{concentration} = \dfrac{y}{10(10+t)}\ \text{kg/L}}" className="my-2" />
        </Step>
      </Part>

      <Part
        letter="c"
        marks={2}
        videoSrc={VIDEO.c}
        statement={
          <>
            Show that the differential equation relating <Katex tex="y" /> and <Katex tex="t" /> is{' '}
            <Katex tex="\dfrac{dy}{dt} + \dfrac{y}{10+t} = \dfrac{1}{3}" />.
          </>
        }
      >
        <Step n={1}>
          Salt flows in at the fixed inflow concentration times the inflow rate:
          <Katex display tex="\text{rate in} = \frac{1}{60}\times 20 = \frac{1}{3}\ \text{kg/min}" className="my-2" />
        </Step>
        <Step n={2}>
          Salt flows out at the tank's own concentration (from part b) times the outflow rate:
          <Katex display tex="\text{rate out} = \frac{y}{10(10+t)}\times 10 = \frac{y}{10+t}" className="my-2" />
        </Step>
        <Step n={3} final>
          <Katex tex="\dfrac{dy}{dt}" /> is rate in minus rate out:
          <Katex display tex="\frac{dy}{dt} = \frac{1}{3} - \frac{y}{10+t} \quad\implies\quad \boxed{\dfrac{dy}{dt} + \dfrac{y}{10+t} = \dfrac{1}{3}}" className="my-2" />
        </Step>
      </Part>

      <Part
        letter="d"
        marks={3}
        videoSrc={VIDEO.d}
        statement={
          <>
            Verify by differentiation and substitution into the left side that{' '}
            <Katex tex="y = \dfrac{t^2+20t+900}{6(10+t)}" /> satisfies the differential equation in part c. Verify
            that the given solution for <Katex tex="y" /> also satisfies the initial condition.
          </>
        }
      >
        <Step n={1}>
          Differentiate with the quotient rule, <Katex tex="N = t^2+20t+900" />, <Katex tex="D = 6(10+t)" />:
          <Katex display tex="\frac{dy}{dt} = \frac{(2t+20)\cdot 6(10+t) - (t^2+20t+900)\cdot 6}{[6(10+t)]^2} = \frac{t^2+20t-700}{6(10+t)^2}" className="my-2" />
        </Step>
        <Step n={2}>
          Add <Katex tex="\dfrac{y}{10+t}" /> and simplify:
          <Katex
            display
            tex="\frac{dy}{dt} + \frac{y}{10+t} = \frac{t^2+20t-700}{6(10+t)^2} + \frac{t^2+20t+900}{6(10+t)^2} = \frac{2(t+10)^2}{6(10+t)^2} = \frac{1}{3}"
            className="my-2"
          />
          which matches the right side of part c's equation — verified.
        </Step>
        <Step n={3} final>
          Initial condition — the second tank starts with 15&nbsp;kg, i.e. <Katex tex="y(0)=15" />:
          <Katex display tex="y(0) = \frac{900}{6(10)} = \frac{900}{60} = 15 \quad\checkmark" className="my-2" />
        </Step>
      </Part>

      <Part
        letter="e"
        marks={2}
        videoSrc={VIDEO.e}
        videoIsExternal
        statement="Find when the concentration of salt in the second tank reaches 0.095 kg/L. Give your answer in minutes, correct to two decimal places."
      >
        <Step n={1}>
          Using <Katex tex="y" /> from part d, the concentration is:
          <Katex
            display
            tex="\text{concentration}(t) = \frac{y}{10(10+t)} = \frac{t^2+20t+900}{60(10+t)^2}"
            className="my-2"
          />
        </Step>
        <Step n={2}>
          Substitute <Katex tex="u = 10+t" />, so <Katex tex="t^2+20t+900 = (t+10)^2+800 = u^2+800" />, and set
          the concentration to 0.095:
          <Katex display tex="\frac{u^2+800}{60u^2} = 0.095 \implies u^2+800 = 5.7u^2 \implies u^2 = \frac{800}{4.7}" className="my-2" />
        </Step>
        <Step n={3} final>
          <Katex display tex="u = \sqrt{\tfrac{800}{4.7}} \approx 13.0466 \quad\implies\quad t = u - 10 \approx \boxed{3.05\ \text{minutes}}" className="my-2" />
        </Step>
      </Part>
    </div>
  )
}

function Part({
  letter,
  marks,
  statement,
  videoSrc,
  videoIsExternal,
  children,
}: {
  letter: string
  marks: number
  statement: ReactNode
  videoSrc: string
  videoIsExternal?: boolean
  children: ReactNode
}) {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3">
          <span className="flex-none w-7 h-7 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 font-display text-sm font-bold flex items-center justify-center">
            {letter}
          </span>
          <p className="text-[14px] text-gray-800 dark:text-gray-200 leading-relaxed pt-0.5">{statement}</p>
        </div>
        <span className="flex-none text-[11px] font-medium text-gray-400 dark:text-gray-500 whitespace-nowrap pt-1">
          {marks} mark{marks === 1 ? '' : 's'}
        </span>
      </div>

      <div className="pl-10">
        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
          Worked solution
        </p>
        <ol className="flex flex-col gap-3 list-none p-0 m-0 mb-5">{children}</ol>

        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
          Video walkthrough
        </p>
        {videoIsExternal ? (
          <a
            href={videoSrc}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-sky-700 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900 rounded-xl px-4 py-2.5"
          >
            Watch part ({letter}) on Dropbox
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </a>
        ) : (
          <EmbeddedVideo src={videoSrc} label={`part (${letter})`} />
        )}
      </div>
    </div>
  )
}

function Step({ n, final, children }: { n: number; final?: boolean; children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span
        className={`flex-none w-[22px] h-[22px] rounded-full text-white font-display text-xs font-bold flex items-center justify-center mt-0.5 ${
          final ? 'bg-emerald-500' : 'bg-sky-500'
        }`}
      >
        {n}
      </span>
      <div className="text-[13.5px] leading-relaxed text-gray-700 dark:text-gray-300 flex-1 min-w-0">{children}</div>
    </li>
  )
}

function EmbeddedVideo({ src, label }: { src: string; label: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <a
        href={src.replace('&raw=1', '&dl=0')}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 text-[13px] font-medium text-sky-700 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900 rounded-xl px-4 py-2.5"
      >
        Watch {label} on Dropbox
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
      </a>
    )
  }

  return (
    <video controls preload="metadata" playsInline className="w-full max-w-xl rounded-xl bg-black" onError={() => setFailed(true)}>
      <source src={src} />
    </video>
  )
}
