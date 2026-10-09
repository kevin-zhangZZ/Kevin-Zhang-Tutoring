// 2023 Specialist Mathematics — Exam 2, MCQ 11. VCAA examination report: 46% correct.
// Setting up the surface-of-revolution integral for y = cos⁻¹(x) about the y-axis. Question
// text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 6, C: 22, D: 18, E: 46 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = \cos^{-1}(x) \;\implies\; x = \cos(y),\quad y\in\big[0,\tfrac{\pi}{2}\big]" />,
    reason: <>Revolving about the <Katex tex="y" />-axis, the radius is each point's distance from the <Katex tex="y" />-axis, which is <Katex tex="x" />, so write <Katex tex="x" /> in terms of <Katex tex="y" /> and integrate with respect to <Katex tex="y" />. The endpoints <Katex tex="(1,0)" /> and <Katex tex="\big(0,\tfrac{\pi}{2}\big)" /> give <Katex tex="y" /> from <Katex tex="0" /> to <Katex tex="\tfrac{\pi}{2}" />.</>,
    more: (
      <>
        Picture the curve spinning around the <Katex tex="y" />-axis: each point <Katex tex="(x,y)" /> on it sweeps out
        a horizontal circle of radius <Katex tex="x" /> at height <Katex tex="y" />, and the surface is a stack of these
        circles from <Katex tex="y=0" /> up to <Katex tex="y=\tfrac{\pi}{2}" />. Taking cos of both sides of <Katex tex="y=\cos^{-1}(x)" /> gives{' '}
        <Katex tex="x=\cos(y)" />, which holds here because <Katex tex="y" /> stays in <Katex tex="[0,\pi]" />, the range
        of <Katex tex="\cos^{-1}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="S = 2\pi\int_0^{\pi/2} x\sqrt{1+\left(\frac{dx}{dy}\right)^2}\,dy" />,
    reason: <>The formula-sheet curved surface area about the <Katex tex="y" />-axis.</>,
    more: (
      <>
        <Katex tex="2\pi x" /> is the circumference of the circle each point sweeps out, and{' '}
        <Katex tex="\sqrt{1+\left(\tfrac{dx}{dy}\right)^2}\,dy" /> is the length of a short piece of the curve, so the
        integral adds up circumference <Katex tex="\times" /> length along the whole curve. The formula sheet also has
        the version for revolution about the <Katex tex="x" />-axis (radius <Katex tex="y" />, integrating with respect
        to <Katex tex="x" />); choosing the right one is the first decision in this question.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} \frac{dx}{dy} &= -\sin(y) \\ 1+\left(\frac{dx}{dy}\right)^2 &= 1+\sin^2(y) \end{aligned}" />,
    reason: <>Differentiate <Katex tex="x=\cos(y)" />. Squaring removes the minus sign, <Katex tex="(-\sin(y))^2=\sin^2(y)" />, so the square root holds <Katex tex="1+\sin^2(y)" />.</>,
  },
  {
    working: <Katex display tex="S = 2\pi\int_0^{\pi/2} \cos(y)\sqrt{1+\sin^2(y)}\,dy" />,
    reason: <>Substitute <Katex tex="x=\cos(y)" /> for the radius.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} u&=\sin(y), \quad \frac{du}{dy} = \cos(y) \\ y=0 &\implies u=0, \quad y=\tfrac{\pi}{2} \implies u=1 \end{aligned}" />,
    reason: <>Options <b>D</b> and <b>E</b> use <Katex tex="u=\sin(y)" />, so make that substitution. The <Katex tex="\cos(y)\,dy" /> in the integral becomes exactly <Katex tex="du" />, and the terminals must change to <Katex tex="u" />-values.</>,
  },
  {
    working: <Katex display tex="\boxed{S = 2\pi\int_0^1\sqrt{1+u^2}\,du}" />,
    reason: <>Matches option <b>E</b>.</>,
    more: (
      <>
        <p>
          Option <b>D</b> makes the same substitution but keeps the <Katex tex="y" />-terminals <Katex tex="0" /> and{' '}
          <Katex tex="\tfrac{\pi}{2}" />; once the variable is <Katex tex="u" />, the terminals must be{' '}
          <Katex tex="u" />-values. Option <b>C</b> has <Katex tex="1-\sin^2(y)" /> under the square root instead of{' '}
          <Katex tex="1+\sin^2(y)" />, as if the minus sign in <Katex tex="\tfrac{dx}{dy}=-\sin(y)" /> survived
          squaring; <Katex tex="1+\left(\tfrac{dx}{dy}\right)^2" /> can never be less than 1. Options <b>A</b> and{' '}
          <b>B</b> use <Katex tex="\cos^{-1}(x)=y" />, the distance from the <Katex tex="x" />-axis, as the radius,
          which is revolution about the wrong axis. Their square root is also of{' '}
          <Katex tex="1+\tfrac{1}{x^2-1}=\tfrac{x^2}{x^2-1}" />, which is negative for <Katex tex="0<x<1" />, and{' '}
          <b>A</b> runs <Katex tex="x" /> up to <Katex tex="\tfrac{\pi}{2}" />, outside the domain of{' '}
          <Katex tex="\cos^{-1}" />.
        </p>
        <p>
          On Exam 2 a CAS check settles it: <Cas fn="nInt">nInt(2π·√(1+u^2), u, 0, 1)</Cas> gives{' '}
          <Katex tex="7.2118" /> for option <b>E</b>, and the integral in <Katex tex="y" /> before the substitution,{' '}
          <Cas fn="nInt">nInt(2π·cos(y)·√(1+(sin(y))^2), y, 0, π/2)</Cas>, gives the same <Katex tex="7.2118" />.
          The same check gives <Katex tex="4.9348" /> for option <b>C</b> and <Katex tex="13.0639" /> for
          option <b>D</b>.
        </p>
      </>
    ),
  },
]

export default function SpecialistQ11_2023() {
  return (
    <MCQShell
      question={
        <p>
          The area of the curved surface generated by revolving part of the curve with equation{' '}
          <Katex tex="y=\cos^{-1}(x)" /> from <Katex tex="\big(0,\tfrac{\pi}{2}\big)" /> to <Katex tex="(1,0)" /> about
          the <Katex tex="y" />-axis can be found by evaluating
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2\pi\displaystyle\int_0^{\pi/2}\cos^{-1}(x)\sqrt{1+\dfrac{1}{x^2-1}}\,dx" /> },
        { letter: 'B', content: <Katex tex="2\pi\displaystyle\int_0^1\cos^{-1}(x)\sqrt{1+\dfrac{1}{x^2-1}}\,dx" /> },
        { letter: 'C', content: <Katex tex="2\pi\displaystyle\int_0^{\pi/2}\cos(y)\sqrt{1-\sin^2(y)}\,dy" /> },
        { letter: 'D', content: <Katex tex="2\pi\displaystyle\int_0^{\pi/2}\sqrt{1+u^2}\,du,\ \text{where } u=\sin(y)" /> },
        { letter: 'E', content: <Katex tex="2\pi\displaystyle\int_0^1\sqrt{1+u^2}\,du,\ \text{where } u=\sin(y)" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
