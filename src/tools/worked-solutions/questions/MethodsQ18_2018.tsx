// 2018 Mathematical Methods — Exam 2, MCQ 18. VCAA examination report: 14% correct —
// the hardest MCQ in the 2017-2018 Methods Exam 2 papers.
// Comparing two power functions on either side of x = 1; which statement must be false?
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 17, B: 22, C: 24, D: 21, E: 14 },
  answer: 'E',
  noAnswer: 2,
  comment: (
    <>
      <Katex tex="f'(d)=g'(d)" /> for some <Katex tex="d\in(1,\infty)" /> is false. Options A to D could be
      seen to be true by substituting in values.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\text{let } r=\tfrac{p}{q}, \ s=\tfrac{m}{n}" />
        <Katex display tex="f(x)=x^r, \ g(x)=x^s" />
      </>
    ),
    reason: <>Rename the exponents so the algebra is easier to track — <Katex tex="p,q,m,n" /> are just the reduced numerator/denominator of each.</>,
  },
  {
    working: (
      <>
        <Katex display tex="f(x)>g(x) \text{ on } (0,1)" />
        <Katex display tex="g(x)>f(x) \text{ on } (1,\infty)" />
        <Katex display tex="\iff\; 0<r<s" />
      </>
    ),
    reason: <>For <Katex tex="0<x<1" />, a <em>smaller</em> exponent gives the larger value (e.g. <Katex tex="x^{1/2}>x^2" /> there); for <Katex tex="x>1" /> it's reversed. The given sign pattern forces <Katex tex="r<s" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="h(x)=g(x)-f(x)=x^s-x^r" />
        <Katex display tex="h'(x)=sx^{s-1}-rx^{r-1}" />
        <Katex display tex="=x^{r-1}\bigl(sx^{s-r}-r\bigr)" />
      </>
    ),
    reason: <>Factor out the smaller power to compare <Katex tex="f'" /> and <Katex tex="g'" /> in one expression: <Katex tex="h'(x)>0 \iff g'(x)>f'(x)" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="x>1" />
        <Katex display tex="\implies\; x^{s-r}>1" />
        <Katex display tex="\implies\; sx^{s-r}>s>r" />
        <Katex display tex="\implies\; sx^{s-r}-r>0" />
      </>
    ),
    reason: <>Since <Katex tex="s-r>0" />, raising <Katex tex="x>1" /> to that power gives something <Katex tex=">1" />; multiplying by <Katex tex="s>0" /> keeps it <Katex tex=">s" />, which is already <Katex tex=">r" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="h'(x)>0 \text{ for every } x>1" />
        <Katex display tex="\boxed{\implies\; g'(x)\ne f'(x) \text{ on } (1,\infty)}" />
      </>
    ),
    reason: <>This holds for <em>any</em> valid choice of <Katex tex="r<s" />, not just a special case — so <Katex tex="f'(d)=g'(d)" /> for some <Katex tex="d\in(1,\infty)" /> is never possible. Matches option <b>E</b>.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{but on } (0,1): \ x^{s-r}<1" />
        <Katex display tex="\implies\; sx^{s-r}-r \text{ can be either sign}" />
      </>
    ),
    reason: <>The same trick doesn't pin down a sign on <Katex tex="(0,1)" /> — so <Katex tex="f'(c)=g'(c)" /> for some <Katex tex="c\in(0,1)" /> (option D) really can happen for a suitable choice of exponents, e.g. <Katex tex="r=\tfrac12,\,s=2" />.</>,
  },
]

export default function MethodsQ18_2018() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Consider the functions <Katex tex="f:\mathbb{R}^+\to\mathbb{R}, \ f(x)=x^{p/q}" /> and{' '}
            <Katex tex="g:\mathbb{R}^+\to\mathbb{R}, \ g(x)=x^{m/n}" />, where <Katex tex="p,q,m" /> and{' '}
            <Katex tex="n" /> are positive integers, and <Katex tex="\tfrac{p}{q}" /> and <Katex tex="\tfrac{m}{n}" />{' '}
            are fractions in simplest form.
          </p>
          <p>
            If <Katex tex="\{x:f(x)>g(x)\}=(0,1)" /> and <Katex tex="\{x:g(x)>f(x)\}=(1,\infty)" />, which of
            the following must be <b>false</b>?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <><Katex tex="q>n" /> and <Katex tex="p=m" /></> },
        { letter: 'B', content: <><Katex tex="m>p" /> and <Katex tex="q=n" /></> },
        { letter: 'C', content: <Katex tex="pn<qm" /> },
        { letter: 'D', content: <><Katex tex="f'(c)=g'(c)" /> for some <Katex tex="c\in(0,1)" /></> },
        { letter: 'E', content: <><Katex tex="f'(d)=g'(d)" /> for some <Katex tex="d\in(1,\infty)" /></>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
