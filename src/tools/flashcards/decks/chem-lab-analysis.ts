import type { Card, Deck, Face } from '../data'

// Unit 4 AoS 2: chromatography and HPLC, qualitative tests, purity and separation, redox
// titrations, and the colours of Data Book Table 8 that make redox reactions visible.

const CHROM = 'Chromatography'
const TESTS = 'Qualitative Tests'
const PURITY = 'Purity & Separation'
const TITR = 'Redox Titration'
const COLOURS = 'Data Book Colours'

/** A short answer a student could type: plain words, three at most. */
const typeable = (s: string) => /^[A-Za-z0-9 '-]+$/.test(s) && s.trim().split(/\s+/).length <= 3

/** "tex:..." is maths; anything else is words. */
const face = (s: string): Face =>
  s.startsWith('tex:') ? { tex: s.slice(4) } : typeable(s) ? { text: s, plain: s } : { text: s }

const m = (s: string) => `tex:\\mathrm{${s}}`

/** [id, group, front, back, traps, extra] */
type Row = [string, string, string, string, string[]?, Partial<Card>?]

const DB8 = 'Data Book Table 8.'
// Several species share a colour, so colour cards are asked species → colour only.
const COL = { family: 'colour', oneWay: true, tip: DB8 }

const rows: Row[] = [
  // Chromatography
  ['stationary', CHROM, 'stationary phase', 'The fixed material (e.g. paper, alumina, column packing) the components adsorb onto.',
    ['The solvent or gas that carries the components along.'], { family: 'phase' }],
  ['mobile', CHROM, 'mobile phase', 'The solvent or gas that carries the components along.',
    ['The fixed material (e.g. paper, alumina, column packing) the components adsorb onto.'], { family: 'phase' }],
  ['adsorption', CHROM, 'adsorption', 'Components sticking to the surface of the stationary phase.',
    ['Components dissolving back into the mobile phase.'], { family: 'sorb' }],
  ['desorption', CHROM, 'desorption', 'Components leaving the stationary phase and dissolving back into the mobile phase.',
    ['Components sticking to the surface of the stationary phase.'], { family: 'sorb' }],
  ['separation', CHROM, 'What separates the components in chromatography', 'Different strengths of adsorption to the stationary phase and desorption into the mobile phase.',
    ['Different boiling points.', 'Different masses of the molecules.'], { oneWay: true }],
  ['rf', CHROM, 'Rf value', 'Distance moved by the component ÷ distance moved by the solvent front (always less than 1).',
    ['Distance moved by the solvent front ÷ distance moved by the component.', 'Time for the component to pass through the column.']],
  ['high-rf', CHROM, 'A high Rf value', 'Weak adsorption to the stationary phase (more attracted to the mobile phase).',
    ['Strong adsorption to the stationary phase.', 'A high concentration of the component.'], { oneWay: true }],
  ['retention', CHROM, 'retention time', 'The time a component takes to pass through the HPLC column, from injection to the detector.',
    ['Distance moved by the component ÷ distance moved by the solvent front.']],
  ['long-rt', CHROM, 'A long HPLC retention time', 'Strong adsorption to the stationary phase.',
    ['Weak adsorption to the stationary phase.', 'A high concentration of the component.'], { oneWay: true }],
  ['identify-hplc', CHROM, 'How HPLC identifies a component', 'Its retention time matches a standard run under identical conditions.',
    ['Its peak area matches a standard.', 'Its peak is the tallest.'], { oneWay: true }],
  ['peak-area', CHROM, 'What the peak area in HPLC tells you', 'The amount (concentration) of that component.',
    ['The identity of the component.', 'The molecular mass of the component.'], { oneWay: true }],
  ['calibration', CHROM, 'calibration curve', 'A graph of peak area against concentration for standard solutions, used to read off an unknown’s concentration.',
    ['A graph of temperature against time, used to correct for heat loss.']],
  ['standard', CHROM, 'standard solution', 'A solution whose concentration is accurately known.'],

  // Qualitative tests
  ['test-cc', TESTS, 'Test for C=C', 'Bromine water decolourises quickly (red-brown → colourless), without UV light.',
    ['Acidified dichromate turns orange → green.', 'Sodium hydrogencarbonate fizzes (CO₂).'], { family: 'test', tip: 'Addition of Br₂ across the double bond. Alkanes only react in UV light.' }],
  ['test-oh', TESTS, 'Test for a primary or secondary alcohol (–OH)', 'Acidified dichromate turns orange → green (or permanganate purple → colourless).',
    ['Bromine water decolourises quickly.', 'Sodium hydrogencarbonate fizzes (CO₂).'], { family: 'test', tip: 'Tertiary alcohols don’t react.' }],
  ['test-cooh', TESTS, 'Test for a carboxyl group (–COOH)', 'Sodium carbonate or hydrogencarbonate fizzes (CO₂ given off).',
    ['Acidified dichromate turns orange → green.', 'Bromine water decolourises quickly.'], { family: 'test' }],
  ['iodine-number', TESTS, 'iodine number', 'The mass of I₂ (in g) that reacts with 100 g of a fat or oil: a measure of its unsaturation.',
    ['The mass of fat that reacts with 100 g of I₂.', 'The number of carbons in a fatty acid.'], { tip: 'Each C=C adds one I₂.' }],

  // Purity and separation
  ['mp-pure', PURITY, 'Melting point of a pure substance', 'Sharp, and matches the accepted (literature) value.',
    ['Lower than expected and over a broad range.'], { family: 'mp', oneWay: true }],
  ['mp-impure', PURITY, 'Melting point of an impure sample', 'Lower than the accepted value, and over a broader range.',
    ['Sharp, and matches the accepted (literature) value.', 'Higher than the accepted value, and sharp.'], { family: 'mp', oneWay: true }],
  ['simple-distil', PURITY, 'simple distillation', 'Separates a liquid from dissolved solids, or from a liquid with a very different boiling point.',
    ['Separates miscible liquids with close boiling points, using a fractionating column.'], { family: 'distil' }],
  ['fractional-distil', PURITY, 'fractional distillation', 'Separates miscible liquids with close boiling points, using a fractionating column.',
    ['Separates a liquid from dissolved solids, or from a liquid with a very different boiling point.'], { family: 'distil' }],
  ['distil-order', PURITY, 'Which component distils over first', 'The one with the lowest boiling point', ['The one with the highest boiling point', 'The one in the greatest amount'], { oneWay: true }],
  ['solvent-ext', PURITY, 'solvent extraction', 'Separating a compound by dissolving it in a solvent it is more soluble in than the rest of the mixture.'],

  // Redox titration
  ['titration', TITR, 'volumetric analysis', 'Finding an unknown amount by reacting it with a measured volume of a solution of known concentration.'],
  ['aliquot', TITR, 'aliquot', 'An accurately measured volume of solution, delivered by pipette.', ['The volume delivered from the burette to reach the end point.'], { family: 'vol' }],
  ['titre', TITR, 'titre', 'The volume delivered from the burette to reach the end point.', ['An accurately measured volume of solution, delivered by pipette.'], { family: 'vol' }],
  ['equivalence', TITR, 'equivalence point', 'The point where the reactants have reacted in exactly the mole ratio of the equation.',
    ['The point where the indicator (or a colour) changes.'], { family: 'point' }],
  ['end-point', TITR, 'end point', 'The point where the indicator (or a colour) changes, ideally at the equivalence point.',
    ['The point where the reactants have reacted in exactly the mole ratio of the equation.'], { family: 'point' }],
  ['concordant', TITR, 'concordant titres', 'Titres that agree closely (typically within 0.10 mL of each other).',
    ['Titres that are close to the accepted value.']],
  ['permanganate', TITR, 'Why permanganate titrations need no indicator', 'MnO₄⁻ is intense purple and Mn²⁺ nearly colourless, so the first lasting pale pink marks the end point.',
    ['Permanganate is a primary standard.', 'The reaction gives off a gas at the end point.'], { oneWay: true, tip: 'Self-indicating.' }],
  ['starch', TITR, 'Why starch is added in iodine titrations', 'It forms a blue-black complex with I₂, so a small amount of iodine is easy to see.',
    ['It speeds up the reaction.', 'It reacts with excess thiosulfate.'], { oneWay: true, tip: DB8 }],
  ['rinse-burette', TITR, 'What the burette is rinsed with before use', 'The solution it will be filled with', ['Deionised water', 'The solution in the flask'], { family: 'rinse', oneWay: true }],
  ['rinse-pipette', TITR, 'What the pipette is rinsed with before use', 'The solution it will deliver', ['Deionised water', 'The solution in the burette'], { family: 'rinse', oneWay: true }],
  ['rinse-flask', TITR, 'What the conical flask is rinsed with before use', 'Deionised water', ['The solution in the burette', 'The solution it will hold'], { family: 'rinse', oneWay: true, tip: 'Extra water in the flask doesn’t change the amount of the aliquot.' }],

  // Data Book colours
  ['col-mno4', COLOURS, m('MnO_4^-(aq)'), 'intense purple', ['orange', 'pale pink', 'blue'], COL],
  ['col-mn', COLOURS, m('Mn^{2+}(aq)'), 'colourless (very pale pink if concentrated)', ['intense purple', 'green', 'black/brown'], COL],
  ['col-cr2o7', COLOURS, m('Cr_2O_7^{2-}(aq)'), 'orange', ['green', 'yellow/brown', 'intense purple'], COL],
  ['col-cr', COLOURS, m('Cr^{3+}(aq)'), 'green', ['orange', 'blue', 'pale green'], COL],
  ['col-cu2', COLOURS, m('Cu^{2+}(aq)'), 'blue', ['green', 'pink', 'colourless'], COL],
  ['col-cu', COLOURS, m('Cu(s)'), 'red-brown', ['silver', 'blue', 'black'], COL],
  ['col-fe3', COLOURS, m('Fe^{3+}(aq)'), 'yellow/brown', ['pale green', 'orange', 'red-brown'], COL],
  ['col-fe2', COLOURS, m('Fe^{2+}(aq)'), 'pale green', ['yellow/brown', 'blue', 'colourless'], COL],
  ['col-i2', COLOURS, m('I_2(aq)'), 'brown', ['colourless', 'purple', 'pale yellow-green'], COL],
  ['col-i', COLOURS, m('I^-(aq)'), 'colourless', ['brown', 'pale green', 'blue-black'], COL],
  ['col-br2', COLOURS, m('Br_2'), 'reddish-brown', ['pale yellow-green', 'colourless', 'purple'], COL],
  ['col-cl2', COLOURS, m('Cl_2'), 'pale yellow-green', ['reddish-brown', 'colourless', 'brown'], COL],
  ['col-ni', COLOURS, m('Ni^{2+}(aq)'), 'green', ['pink', 'blue', 'colourless'], COL],
  ['col-co', COLOURS, m('Co^{2+}(aq)'), 'pink', ['green', 'blue', 'colourless'], COL],
  ['col-mno2', COLOURS, m('MnO_2(s)'), 'black/brown', ['intense purple', 'colourless', 'green'], COL],
  ['col-starch', COLOURS, 'starch with iodine', 'blue-black', ['brown', 'colourless', 'purple'], COL],
]

export const chemLabAnalysisDeck: Deck = {
  id: 'chem-lab-analysis',
  title: 'Lab Analysis',
  blurb: 'Chromatography and HPLC, functional group tests, purity and distillation, redox titration terms and the Data Book colours.',
  groups: [CHROM, TESTS, PURITY, TITR, COLOURS],
  cards: rows.map(([id, group, front, back, traps, extra]) => ({
    id,
    group,
    front: face(front),
    back: face(back),
    traps: traps?.map(face),
    ...extra,
  })),
  directionLabel: { fwd: 'Term → Meaning', rev: 'Meaning → Term' },
  promptLabel: { fwd: 'Recall', rev: 'Which is it?' },
  maxTraps: 3,
  source: 'VCE Chemistry Study Design Unit 4 AoS 2; colours from Table 8, 2026 Data Book',
}
