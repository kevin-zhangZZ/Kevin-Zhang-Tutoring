import type { Deck, Face } from '../data'

// Table 9 of the VCE Chemistry Data Book (2026): formulas and charges for selected ions.

const CATIONS = 'Cations'
const ANIONS = 'Anions'

/** [name, formula without charge, charge, family of look-alikes] */
type Row = [string, string, number, string?]

const rows: Row[] = [
  // Cations
  ['ammonium', 'NH4', 1, 'nh'],
  ['copper(I)', 'Cu', 1, 'copper'],
  ['hydronium', 'H3O', 1, 'nh'],
  ['lithium', 'Li', 1],
  ['potassium', 'K', 1],
  ['silver', 'Ag', 1],
  ['sodium', 'Na', 1],
  ['barium', 'Ba', 2],
  ['calcium', 'Ca', 2],
  ['copper(II)', 'Cu', 2, 'copper'],
  ['iron(II)', 'Fe', 2, 'iron'],
  ['lead(II)', 'Pb', 2],
  ['magnesium', 'Mg', 2],
  ['mercury(II)', 'Hg', 2],
  ['nickel(II)', 'Ni', 2],
  ['tin(II)', 'Sn', 2],
  ['zinc', 'Zn', 2],
  ['aluminium', 'Al', 3],
  ['chromium(III)', 'Cr', 3, 'chromium'],
  ['iron(III)', 'Fe', 3, 'iron'],
  ['titanium(IV)', 'Ti', 4],
  // Anions
  ['bromide', 'Br', -1, 'halide'],
  ['chlorate', 'ClO3', -1, 'chlorine'],
  ['chloride', 'Cl', -1, 'chlorine'],
  ['chlorite', 'ClO2', -1, 'chlorine'],
  ['cyanide', 'CN', -1, 'carbon'],
  ['dihydrogenphosphate', 'H2PO4', -1, 'phosphate'],
  ['ethanoate', 'CH3COO', -1, 'carbon'],
  ['fluoride', 'F', -1, 'halide'],
  ['hydrogencarbonate', 'HCO3', -1, 'carbon'],
  ['hydrogensulfate', 'HSO4', -1, 'sulfur'],
  ['hydrogensulfide', 'HS', -1, 'sulfur'],
  ['hydrogensulfite', 'HSO3', -1, 'sulfur'],
  ['hydroxide', 'OH', -1, 'oxygen'],
  ['hypochlorite', 'ClO', -1, 'chlorine'],
  ['iodide', 'I', -1, 'halide'],
  ['nitrate', 'NO3', -1, 'nitrogen'],
  ['nitrite', 'NO2', -1, 'nitrogen'],
  ['perchlorate', 'ClO4', -1, 'chlorine'],
  ['permanganate', 'MnO4', -1, 'chromium'],
  ['carbonate', 'CO3', -2, 'carbon'],
  ['chromate', 'CrO4', -2, 'chromium'],
  ['dichromate', 'Cr2O7', -2, 'chromium'],
  ['monohydrogenphosphate', 'HPO4', -2, 'phosphate'],
  ['oxide', 'O', -2, 'oxygen'],
  ['peroxide', 'O2', -2, 'oxygen'],
  ['sulfate', 'SO4', -2, 'sulfur'],
  ['sulfide', 'S', -2, 'sulfur'],
  ['sulfite', 'SO3', -2, 'sulfur'],
  ['thiosulfate', 'S2O3', -2, 'sulfur'],
  ['citrate', 'C6H5O7', -3, 'carbon'],
  ['nitride', 'N', -3, 'nitrogen'],
  ['phosphate', 'PO4', -3, 'phosphate'],
]

/** "2+", "+", "3−" — the charge as written on an ion. */
export function chargeLabel(q: number) {
  const n = Math.abs(q)
  return `${n === 1 ? '' : n}${q > 0 ? '+' : '−'}`
}

/** "SO4", -2 → SO₄²⁻ in TeX, the charge stacked over the last subscript as in the Data Book. */
export function ionTex(formula: string, q: number) {
  return `${bodyTex(formula)}^{${plainCharge(q)}}`
}

const bodyTex = (formula: string) =>
  formula.replace(/([A-Za-z]+)|(\d+)/g, (_, letters, digits) => (letters ? `\\mathrm{${letters}}` : `_{${digits}}`))

/** The charge as typed: "2-", "+". */
const plainCharge = (q: number) => chargeLabel(q).replace('−', '-')

/** The same ion with the wrong charge: a slip of one either way, never zero. */
function wrongCharges(q: number): number[] {
  const s = Math.sign(q), n = Math.abs(q)
  return (n === 1 ? [2] : [n - 1, n + 1]).map(m => s * m)
}

export const ionDeck: Deck = {
  id: 'ions',
  title: 'Ions',
  blurb: 'Names, formulas and charges of the cations and anions in Table 9 of the Data Book.',
  groups: [CATIONS, ANIONS],
  cards: rows.map(([name, formula, q, family]) => ({
    id: `${name}-${q}`,
    group: q > 0 ? CATIONS : ANIONS,
    section: chargeLabel(q),
    front: { text: name, plain: name },
    back: { tex: ionTex(formula, q), plain: formula + plainCharge(q) },
    traps: wrongCharges(q).map((w): Face => ({ tex: ionTex(formula, w) })),
    family,
    tip: /\([IV]+\)/.test(name) ? 'The Roman numeral in the name is the charge.' : undefined,
    // Fill the gap: the charge.
    gap: { tex: `\\text{${name}}\\quad ${bodyTex(formula)}^{\\gap}`, answers: [plainCharge(q)] },
  })),
  directionLabel: { fwd: 'Name → Formula', rev: 'Formula → Name' },
  promptLabel: { fwd: 'Formula of', rev: 'Name of' },
  maxTraps: 1,
  source: 'Table 9, 2026 VCE Chemistry Data Book',
}
