import type { Card, Deck } from '../data'

// Data Book Table 24: the seven green chemistry principles and nine UN Sustainable Development
// Goals relevant to VCE Chemistry, linear and circular economies, plus atom economy vs yield.

const GREEN = 'Green Chemistry'
const SDG = 'UN SDGs'
const ECON = 'Economies & Terms'

/** A short answer a student could type: plain words, three at most. */
const typeable = (s: string) => /^[A-Za-z0-9 '-]+$/.test(s) && s.trim().split(/\s+/).length <= 3

/** [id, group, front, back, traps, extra] */
type Row = [string, string, string, string, string[]?, Partial<Card>?]

const DB24 = 'Data Book Table 24.'

const principles: [string, string, string][] = [
  ['atom-economy', 'atom economy', 'Design processes so that as much of the reactant material as possible ends up in the final product.'],
  ['catalysis', 'catalysis', 'Choose catalysts that give the same product with less waste, energy and reagents.'],
  ['degradation', 'design for degradation', 'Design products to break down into harmless substances at the end of their use, not persist in the environment.'],
  ['energy-efficiency', 'design for energy efficiency', 'Design processes for maximum energy efficiency, with minimal environmental and economic impact.'],
  ['safer-chemicals', 'designing safer chemicals', 'Design products to do their job while keeping toxicity as low as possible.'],
  ['prevention', 'prevention of wastes', 'Prevent waste rather than treat or clean it up after it has formed.'],
  ['renewable', 'use of renewable feedstocks', 'Make raw materials from renewable (mainly plant-based) sources rather than fossil fuels, where practicable.'],
]

const goals: [number, string][] = [
  [2, 'Zero hunger'],
  [6, 'Clean water and sanitation'],
  [7, 'Affordable and clean energy'],
  [9, 'Industry, innovation and infrastructure'],
  [11, 'Sustainable cities and communities'],
  [12, 'Responsible consumption and production'],
  [13, 'Climate action'],
  [14, 'Life below water'],
  [15, 'Life on land'],
]

const rows: Row[] = [
  ...principles.map(([id, name, meaning]): Row => [`gc-${id}`, GREEN, name, meaning, undefined, { family: 'principle', tip: DB24 }]),
  ...goals.map(([n, name]): Row => [`sdg-${n}`, SDG, `Goal ${n}`, name, undefined, { family: 'sdg', tip: `One of the nine goals listed in ${DB24}` }]),

  ['linear', ECON, 'linear economy', 'Take, make, use, dispose: resources end as waste.',
    ['Resources are kept in use by reusing, repairing and recycling, so waste is designed out.'], { family: 'economy', tip: DB24 }],
  ['circular', ECON, 'circular economy', 'Resources are kept in use by reusing, repairing and recycling, so waste is designed out.',
    ['Take, make, use, dispose: resources end as waste.'], { family: 'economy', tip: DB24 }],
  ['ae-def', ECON, 'percentage atom economy', 'The percentage of the total mass of reactants that ends up in the desired product.',
    ['The percentage of the theoretical amount of product actually obtained.'], { family: 'ae-yield' }],
  ['yield-def', ECON, 'percentage yield', 'The percentage of the theoretical amount of product actually obtained.',
    ['The percentage of the total mass of reactants that ends up in the desired product.'], { family: 'ae-yield' }],
  ['ae-vs-yield', ECON, 'How a reaction can have a 100% yield but a low atom economy', 'It makes all the product expected, but also by-products, so many reactant atoms still end as waste.',
    ['It can’t: a 100% yield always means a 100% atom economy.', 'The yield was measured before the reaction finished.'], { oneWay: true }],
  ['ae-addition', ECON, 'The reaction type with 100% atom economy', 'addition', ['substitution', 'condensation', 'hydrolysis'], { oneWay: true, tip: 'One product, so every reactant atom ends up in it.' }],
  ['high-ae', ECON, 'Why industry wants a high atom economy', 'Less waste and fewer by-products to dispose of, using fewer raw materials per kilogram of product.',
    ['It makes the reaction faster.', 'It guarantees a high yield.'], { oneWay: true }],
  ['sustainable', ECON, 'sustainable development', 'Meeting the needs of the present without compromising the ability of future generations to meet theirs.',
    ['Producing as much as possible at the lowest cost.']],
  ['feedstock', ECON, 'feedstock', 'The raw material that a chemical process starts from.'],
]

export const chemSustainabilityDeck: Deck = {
  id: 'chem-sustainability',
  title: 'Sustainability',
  blurb: 'The seven green chemistry principles and nine UN goals in the Data Book, linear and circular economies, and atom economy vs yield.',
  groups: [GREEN, SDG, ECON],
  cards: rows.map(([id, group, front, back, traps, extra]) => ({
    id,
    group,
    front: typeable(front) ? { text: front, plain: front } : { text: front },
    back: typeable(back) ? { text: back, plain: back } : { text: back },
    traps: traps?.map(text => ({ text })),
    ...extra,
  })),
  directionLabel: { fwd: 'Name → Meaning', rev: 'Meaning → Name' },
  promptLabel: { fwd: 'Recall', rev: 'Which is it?' },
  maxTraps: 2,
  source: 'Table 24, 2026 VCE Chemistry Data Book; VCE Chemistry Study Design Units 3–4',
}
