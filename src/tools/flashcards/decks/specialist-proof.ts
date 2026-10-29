import type { Card, Deck, Face } from '../data'

// Specialist Units 3 & 4, Discrete mathematics: logic and proof. Implications and their
// converse and contrapositive, necessary and sufficient conditions, quantifiers and negation,
// which proof method to use, induction, and the definitions proofs are written from.

type F = string | Face
const f = (x: F): Face => (typeof x === 'string' ? { tex: x } : x)
const w = (text: string): Face => ({ text })

/** [id, group, front, back, traps, extra] — a string is TeX, w() is words. */
type Row = [string, string, F, F, F[], Partial<Card>?]

const NOT = '\\text{not }'
const IMP = '\\Rightarrow'
const AND = '\\text{ and }'
const OR = '\\text{ or }'
const Z = 'k\\in Z'

const LOGIC = 'Implications'
const NEG = 'Quantifiers & Negation'
const METHOD = 'Proof Methods'
const IND = 'Induction'
const DEF = 'Definitions'

const rows: Row[] = [
  // Implications
  ['converse', LOGIC, w('The converse of "if P then Q"'), `Q ${IMP} P`, [`${NOT}Q ${IMP} ${NOT}P`, `${NOT}P ${IMP} ${NOT}Q`, `P ${IMP} ${NOT}Q`], { family: 'imp', tip: 'Not equivalent to the original.' }],
  ['contrapositive', LOGIC, w('The contrapositive of "if P then Q"'), `${NOT}Q ${IMP} ${NOT}P`, [`Q ${IMP} P`, `${NOT}P ${IMP} ${NOT}Q`, `${NOT}Q ${IMP} P`], { family: 'imp', tip: 'Equivalent to the original: prove one and you have proved the other.' }],
  ['false-imp', LOGIC, w('"If P then Q" is false exactly when'), w('P is true and Q is false'), [w('P is false'), w('P is false and Q is true'), w('P and Q are both false')], { oneWay: true }],
  ['iff', LOGIC, 'P \\Leftrightarrow Q', w('P ⇒ Q and Q ⇒ P: "P if and only if Q"'), [w('P ⇒ Q only'), w('Q ⇒ P only'), w('P and Q are both true')], { tip: 'Prove both directions.' }],
  ['sufficient', LOGIC, w('In P ⇒ Q, P is'), w('A sufficient condition for Q'), [w('A necessary condition for Q'), w('A necessary and sufficient condition for Q'), w('The converse of Q')], { family: 'nec' }],
  ['necessary', LOGIC, w('In P ⇒ Q, Q is'), w('A necessary condition for P'), [w('A sufficient condition for P'), w('A necessary and sufficient condition for P'), w('The contrapositive of P')], { family: 'nec', tip: 'P cannot happen without Q.' }],
  ['nec-suff', LOGIC, w('"P is necessary and sufficient for Q"'), 'P \\Leftrightarrow Q', [`P ${IMP} Q`, `Q ${IMP} P`, `${NOT}P ${IMP} ${NOT}Q`], { oneWay: true }],
  ['only-if', LOGIC, w('"P only if Q"'), `P ${IMP} Q`, [`Q ${IMP} P`, 'P \\Leftrightarrow Q', `${NOT}P ${IMP} ${NOT}Q`], { oneWay: true, tip: 'P can only be true if Q is: P ⇒ Q.' }],

  // Quantifiers and negation
  ['forall', NEG, '\\forall', w('For all'), [w('There exists'), w('Such that'), w('Therefore')], { family: 'symbol', back: { text: 'For all', plain: 'for all' } }],
  ['exists', NEG, '\\exists', w('There exists'), [w('For all'), w('Is an element of'), w('Therefore')], { family: 'symbol', back: { text: 'There exists', plain: 'there exists' } }],
  ['neg-forall', NEG, w('The negation of "for all x, P(x)"'), `\\exists x,\\ ${NOT}P(x)`, [`\\forall x,\\ ${NOT}P(x)`, '\\exists x,\\ P(x)', `${NOT}\\exists x,\\ ${NOT}P(x)`], { family: 'neg-q', tip: 'One counterexample is enough to make a "for all" statement false.' }],
  ['neg-exists', NEG, w('The negation of "there exists x such that P(x)"'), `\\forall x,\\ ${NOT}P(x)`, [`\\exists x,\\ ${NOT}P(x)`, '\\forall x,\\ P(x)', `${NOT}\\forall x,\\ P(x)`], { family: 'neg-q' }],
  ['neg-and', NEG, w('The negation of "P and Q"'), `${NOT}P${OR}${NOT}Q`, [`${NOT}P${AND}${NOT}Q`, `P${OR}Q`, `${NOT}P${AND}Q`], { family: 'neg-c' }],
  ['neg-or', NEG, w('The negation of "P or Q"'), `${NOT}P${AND}${NOT}Q`, [`${NOT}P${OR}${NOT}Q`, `P${AND}Q`, `${NOT}P${OR}Q`], { family: 'neg-c' }],
  ['neg-imp', NEG, w('The negation of "if P then Q"'), `P${AND}${NOT}Q`, [`${NOT}P ${IMP} ${NOT}Q`, `P ${IMP} ${NOT}Q`, `${NOT}P${AND}Q`], { tip: 'The negation of an implication is not an implication.' }],
  ['neg-eg', NEG, w('The negation of "all primes are odd"'), w('There exists a prime that is not odd'), [w('All primes are even'), w('No primes are odd'), w('There exists a prime that is odd')], { oneWay: true }],
  ['neg-ineq', NEG, w('The negation of x > 3'), 'x \\le 3', ['x < 3', 'x \\ge 3', 'x \\le -3'], { oneWay: true }],

  // Proof methods
  ['direct', METHOD, w('Direct proof'), w('Assume P, then deduce Q through a chain of implications'), [w('Assume not Q, then deduce not P'), w('Assume the statement is false and reach something impossible'), w('Show P(1), then show P(k) ⇒ P(k + 1)')], { family: 'method' }],
  ['contra-proof', METHOD, w('Proof by contrapositive'), w('Assume not Q, then deduce not P'), [w('Assume P, then deduce Q'), w('Assume not P, then deduce not Q'), w('Assume the statement is false and reach something impossible')], { family: 'method' }],
  ['contradiction', METHOD, w('Proof by contradiction'), w('Assume the statement is false and deduce something impossible'), [w('Assume not Q, then deduce not P'), w('Find one example where the statement fails'), w('Assume P, then deduce Q')], { family: 'method' }],
  ['cases', METHOD, w('Proof by cases'), w('Split into cases that cover every possibility, and prove each one'), [w('Check enough cases to see the pattern'), w('Prove the first case, then the next from it'), w('Find one case where the statement fails')], { family: 'method', tip: 'e.g. n even and n odd.' }],
  ['disprove-forall', METHOD, w('Disproving a "for all" statement'), w('Give one counterexample'), [w('Check many examples'), w('Use induction'), w('Show the converse is false')], { family: 'how' }],
  ['prove-exists', METHOD, w('Proving a "there exists" statement'), w('Give one example that works'), [w('Give one counterexample'), w('Show it holds for every x'), w('Check every possible case')], { family: 'how' }],
  ['use-irrational', METHOD, w('The usual method to prove √2 is irrational'), w('Contradiction'), [w('Induction'), w('Contrapositive'), w('Direct proof')], { family: 'which', oneWay: true, back: { text: 'Contradiction', plain: 'contradiction' } }],
  ['use-n2-even', METHOD, w('The usual method for "if n² is even, then n is even"'), w('Contrapositive'), [w('Induction'), w('Contradiction with a counterexample'), w('Direct proof')], { family: 'which', oneWay: true, back: { text: 'Contrapositive', plain: 'contrapositive' }, tip: '"n odd" gives n = 2k + 1, which you can square.' }],
  ['use-sum', METHOD, w('The usual method for a sum formula holding for all n ∈ N'), w('Induction'), [w('Contradiction'), w('Contrapositive'), w('Proof by cases')], { family: 'which', oneWay: true, back: { text: 'Induction', plain: 'induction' } }],

  // Induction
  ['ind-steps', IND, w('The steps of a proof by induction, in order'), w('Base case; assume P(k); prove P(k + 1); conclude'), [w('Assume P(k); prove P(k + 1); conclude'), w('Base case; assume P(k + 1); prove P(k); conclude'), w('Base case; assume P(n) for all n; conclude')], { oneWay: true }],
  ['ind-assume', IND, w('The inductive assumption'), w('Assume P(k) is true for some k ∈ N'), [w('Assume P(k) is true for all k ∈ N'), w('Assume P(k + 1) is true'), w('Prove P(k) is true')], { tip: 'Assuming it for all k assumes what you are proving.' }],
  ['ind-divisible', IND, w('Writing "f(k) is divisible by 9" as the assumption'), 'f(k) = 9m,\\ m\\in Z', ['f(k) = 9k', 'f(k) = \\dfrac{m}{9},\\ m\\in Z', '9 = m\\,f(k),\\ m\\in Z'], { tip: 'Use a new letter: k is already taken.' }],
  ['ind-base', IND, w('The base case for a statement about all integers n ≥ 3'), w('Show P(3) is true'), [w('Show P(1) is true'), w('Show P(0) is true'), w('Show P(4) is true')], { oneWay: true }],
  ['ind-conclude', IND, w('The conclusion of a proof by induction'), w('P(1) is true, and P(k) true implies P(k + 1) true, so P(n) is true for all n ∈ N'), [w('P(1) and P(2) are true, so P(n) is true for all n ∈ N'), w('P(k + 1) is true, so P(n) is true for all n ∈ N'), w('P(k) is true for all k, so P(k + 1) is true')], { oneWay: true }],

  // Definitions
  ['even', DEF, w('n is even'), `n = 2k,\\ ${Z}`, [`n = 2k + 1,\\ ${Z}`, `n = k^2,\\ ${Z}`, 'n = 2k,\\ k\\in R'], { family: 'parity' }],
  ['odd', DEF, w('n is odd'), `n = 2k + 1,\\ ${Z}`, [`n = 2k,\\ ${Z}`, 'n = 2k + 1,\\ k\\in R', `n = k + 1,\\ ${Z}`], { family: 'parity' }],
  ['divisible', DEF, w('b is divisible by a'), `b = ak,\\ ${Z}`, [`a = bk,\\ ${Z}`, `b = a + k,\\ ${Z}`, 'b = ak,\\ k\\in R']],
  ['rational', DEF, w('x is rational'), 'x = \\dfrac{p}{q},\\ p, q\\in Z,\\ q \\ne 0', ['x = \\dfrac{p}{q},\\ p, q\\in R,\\ q \\ne 0', 'x = \\dfrac{p}{q},\\ p, q\\in Z', 'x = p + q,\\ p, q\\in Z'], { tip: 'In a contradiction proof, also take p and q with no common factors.' }],
  ['prime', DEF, w('A prime number'), w('A positive integer greater than 1 whose only positive divisors are 1 and itself'), [w('An odd number with no factors'), w('Any positive integer whose only positive divisors are 1 and itself, including 1'), w('An integer with exactly one positive divisor')]],
  ['conjecture', DEF, w('A conjecture'), w('A statement believed to be true but not yet proved or disproved'), [w('A statement that has been proved'), w('A statement assumed true without proof'), w('A statement shown false by a counterexample')]],
]

export const specialistProofDeck: Deck = {
  id: 'specialist-proof',
  title: 'Logic & Proof',
  blurb: 'Converse and contrapositive, necessary and sufficient, quantifiers and negation, choosing a proof method, induction and the definitions behind proofs.',
  groups: [LOGIC, NEG, METHOD, IND, DEF],
  cards: rows.map(([id, group, front, back, traps, extra]) => ({
    id,
    group,
    front: f(front),
    back: f(back),
    traps: traps.map(f),
    ...extra,
  })),
  directionLabel: { fwd: 'Term → Meaning', rev: 'Meaning → Term' },
  promptLabel: { fwd: 'What is this?', rev: 'Which term is this?' },
  maxTraps: 3,
  source: "VCE Specialist Mathematics Study Design 2023–2027, Units 3 & 4: Logic and proof; KZ's Proofs lectures",
}
