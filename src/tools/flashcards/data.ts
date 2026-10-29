import { trigDeck } from './decks/trig'
import { ionDeck } from './decks/ions'
import { integrationMethodsDeck } from './decks/integration-methods'
import { integrationSpecialistDeck } from './decks/integration-specialist'
import { specialistProofDeck } from './decks/specialist-proof'
import { specialistComplexDeck } from './decks/specialist-complex'
import { specialistCalculusDeck } from './decks/specialist-calculus'
import { specialistDeDeck } from './decks/specialist-de'
import { specialistKinematicsDeck } from './decks/specialist-kinematics'
import { specialistVectorsDeck } from './decks/specialist-vectors'
import { specialistLinesPlanesDeck } from './decks/specialist-lines-planes'
import { specialistStatisticsDeck } from './decks/specialist-statistics'
import { methodsIndexLogDeck } from './decks/methods-index-log-laws'
import { methodsFunctionFeaturesDeck } from './decks/methods-function-features'
import { methodsTransformationsDeck } from './decks/methods-transformations'
import { methodsFunctionsAlgebraDeck } from './decks/methods-functions-algebra'
import { methodsDerivativesDeck } from './decks/methods-derivatives'
import { methodsCalculusFactsDeck } from './decks/methods-calculus-facts'
import { methodsDiscreteProbabilityDeck } from './decks/methods-discrete-probability'
import { methodsContinuousInferenceDeck } from './decks/methods-continuous-inference'
import { chemFormulasDeck } from './decks/chem-formulas'
import { chemFuelsDeck } from './decks/chem-fuels'
import { chemElectrochemDeck } from './decks/chem-electrochem'
import { chemRatesEquilibriumDeck } from './decks/chem-rates-equilibrium'
import { chemOrganicFamiliesDeck } from './decks/chem-organic-families'
import { chemOrganicReactionsDeck } from './decks/chem-organic-reactions'
import { chemBiomoleculesDeck } from './decks/chem-biomolecules'
import { chemSpectroscopyDeck } from './decks/chem-spectroscopy'
import { chemLabAnalysisDeck } from './decks/chem-lab-analysis'
import { chemSustainabilityDeck } from './decks/chem-sustainability'
import { chemScienceSkillsDeck } from './decks/chem-science-skills'

// A flashcard deck: cards in groups the student can turn on and off, studied either way round.

/** One side of a card: maths as TeX, or plain words. */
export interface Face {
  tex?: string
  text?: string
  /** How a student would type it, when they could (ion names and formulas); enables Written questions. */
  plain?: string
}

export interface Card {
  id: string
  group: string
  /** A heading within the group for the list view (the ions' charges, as the Data Book lays them out). */
  section?: string
  front: Face
  back: Face
  /** Said under the prompt when the front alone doesn't pin down the answer ("in terms of cos x only"). */
  ask?: string
  /** A line on the back of the card: how to remember it or where it comes from. */
  tip?: string
  /** Asked front → back only: the back alone has more than one right front (−sin x is sin(−x) and sin(π + x)). */
  oneWay?: boolean
  /** Likely slips for the back, used first as Test distractors. */
  traps?: Face[]
  /** Cards that are easily mixed up with this one (chlorate, chlorite, perchlorate…), the next distractors. */
  family?: string
  /** A fill-the-gap version: TeX with `\gap` where the missing piece goes, and the answers accepted. */
  gap?: { tex: string; answers: string[] }
}

export type Direction = 'fwd' | 'rev' | 'mixed'
export type Side = Exclude<Direction, 'mixed'>

export interface Deck {
  id: string
  title: string
  blurb: string
  /** The groups, in order; every card's `group` is one of these. */
  groups: string[]
  cards: Card[]
  /** What front → back and back → front are called for this deck. */
  directionLabel: Record<Side, string>
  /** The words above a prompt, one for each way round ("Formula of", "Name of"). */
  promptLabel: Record<Side, string>
  /** How many of a card's traps a Test question may use (the rest come from its family and group). */
  maxTraps: number
  /** Where the content comes from, shown under the deck. */
  source?: string
}

export interface Subject {
  id: string
  name: string
  decks: Deck[]
}

export const subjects: Subject[] = [
  {
    id: 'methods',
    name: 'Methods',
    // In study-design order: functions, then calculus, then probability and statistics.
    decks: [
      methodsIndexLogDeck, methodsFunctionFeaturesDeck, methodsTransformationsDeck, methodsFunctionsAlgebraDeck,
      methodsDerivativesDeck, methodsCalculusFactsDeck, integrationMethodsDeck,
      methodsDiscreteProbabilityDeck, methodsContinuousInferenceDeck,
    ],
  },
  {
    id: 'specialist',
    name: 'Specialist',
    // In study-design order: proof, functions, complex numbers, calculus, vectors, statistics.
    decks: [
      specialistProofDeck, trigDeck, specialistComplexDeck,
      specialistCalculusDeck, integrationSpecialistDeck, specialistDeDeck, specialistKinematicsDeck,
      specialistVectorsDeck, specialistLinesPlanesDeck, specialistStatisticsDeck,
    ],
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    // Foundations first (ions, formulas), then Unit 3, Unit 4, and the skills that run through both.
    decks: [
      ionDeck, chemFormulasDeck,
      chemFuelsDeck, chemElectrochemDeck, chemRatesEquilibriumDeck,
      chemOrganicFamiliesDeck, chemOrganicReactionsDeck, chemBiomoleculesDeck, chemSpectroscopyDeck, chemLabAnalysisDeck,
      chemSustainabilityDeck, chemScienceSkillsDeck,
    ],
  },
]

/** A card's id across every deck, for saved progress. */
export const cardKey = (deck: Deck, card: Card) => `${deck.id}/${card.id}`

export const faceKey = (f: Face) => f.tex ?? f.text ?? ''

/** A card as asked: what's shown, what's wanted. */
export interface Prompt {
  card: Card
  dir: Side
  show: Face
  answer: Face
}

export function promptFor(card: Card, dir: Side): Prompt {
  return dir === 'fwd'
    ? { card, dir, show: card.front, answer: card.back }
    : { card, dir, show: card.back, answer: card.front }
}

/** The way round to ask this card: one-way cards are always asked front → back. */
export function pickDir(card: Card, dir: Direction): Side {
  if (card.oneWay) return 'fwd'
  if (dir === 'mixed') return Math.random() < 0.5 ? 'fwd' : 'rev'
  return dir
}

export function shuffle<T>(xs: T[]): T[] {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Up to `n` wrong answers for a prompt: the card's own traps first (front → back only), then
 *  cards from its family, then its group, then anything in the deck. */
export function distractors(p: Prompt, deck: Deck, n = 3): Face[] {
  const side = (c: Card) => (p.dir === 'fwd' ? c.back : c.front)
  const others = deck.cards.filter(c => c.id !== p.card.id)
  const tiers: Face[][] = [
    p.dir === 'fwd' ? shuffle(p.card.traps ?? []).slice(0, deck.maxTraps) : [],
    shuffle(others.filter(c => p.card.family && c.family === p.card.family).map(side)),
    shuffle(others.filter(c => c.group === p.card.group).map(side)),
    shuffle(others.map(side)),
  ]
  const seen = new Set([faceKey(p.answer)])
  const picked: Face[] = []
  for (const tier of tiers) {
    for (const f of tier) {
      if (picked.length === n) return picked
      const k = faceKey(f)
      if (seen.has(k)) continue
      seen.add(k)
      picked.push(f)
    }
  }
  return picked
}

/** Four choices for a prompt, the answer among them. */
export const choicesFor = (p: Prompt, deck: Deck) => shuffle([p.answer, ...distractors(p, deck)])

// ── Typed answers ───────────────────────────────────────────────────────────

const SUPERSCRIPT: Record<string, string> = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁺': '+', '⁻': '-' }
const SUBSCRIPT: Record<string, string> = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9' }

/** Spaces, carets and fancy minus signs out; ½ as 1/2. */
function norm(s: string) {
  return s
    .replace(/[⁰-⁹¹²³⁺⁻₀-₉]/g, ch => SUPERSCRIPT[ch] ?? SUBSCRIPT[ch] ?? ch)
    .replace(/[−–—]/g, '-')
    .replace(/½/g, '1/2')
    .trim()
}

/** For an answer that ends in a charge (a formula, or a charge on its own): a charge written
 *  "-2" or "1-" read as "2-" and "-". Never applied to numbers, where −1 is not −. */
function normCharge(s: string) {
  return s
    // "NO3 1-": a charge of one set apart from the formula, before the spaces go.
    .replace(/[\s^]+1([+-])$/, '$1')
    .replace(/[\s^]/g, '')
    .replace(/([+-])(\d)$/, '$2$1')
    .replace(/(^|[^\d])1([+-])$/, '$1$2')
}

const isCharged = (answer: string) => /[+-]$/.test(norm(answer))

/** Is a typed answer one of the accepted ones? Words ignore case; formulas don't (Co is not CO). */
export function typedMatches(input: string, answers: string[], caseSensitive: boolean) {
  const typed = norm(input)
  if (!typed) return false
  const same = (x: string, y: string) => (caseSensitive ? x === y : x.toLowerCase() === y.toLowerCase())
  return answers.some(t => {
    const want = norm(t)
    if (isCharged(t)) return same(normCharge(want), normCharge(typed))
    return same(want.replace(/[\s^]/g, ''), typed.replace(/[\s^]/g, ''))
  })
}

/** The gap drawn empty, or filled with the answer. */
export function gapTex(tex: string, fill?: string) {
  return tex.replace('\\gap', fill === undefined ? '\\boxed{\\phantom{00}}' : `\\boxed{\\color{#10b981}{${fill.replace(/−/g, '-')}}}`)
}
