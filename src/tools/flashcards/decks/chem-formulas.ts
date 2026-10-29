import type { Card, Deck, Face } from '../data'

// The formulas and constants a Units 3–4 student uses in nearly every calculation. All are in
// Tables 3 and 4 of the Data Book; knowing them cold saves the look-up and catches upside-down slips.

const AMOUNT = 'Amount'
const ENERGY = 'Energy'
const ELEC = 'Electrochemistry'
const PCT = 'Percentages & K'
const CONST = 'Constants'

const t = (tex: string): Face => ({ tex })

/** [id, group, front (words), back (TeX), traps (TeX), extra] */
type Row = [string, string, string, string, string[], Partial<Card>?]

const rows: Row[] = [
  // Amount
  ['n-mass', AMOUNT, 'Amount from mass', 'n = \\dfrac{m}{M}', ['n = \\dfrac{M}{m}', 'n = mM'],
    { gap: { tex: 'n = \\dfrac{m}{\\gap}', answers: ['M'] } }],
  ['n-conc', AMOUNT, 'Amount from concentration', 'n = cV', ['n = \\dfrac{c}{V}', 'n = \\dfrac{V}{c}'],
    { tip: 'V in litres.', gap: { tex: 'n = c\\gap', answers: ['V'] } }],
  ['n-particles', AMOUNT, 'Amount from number of particles', 'n = \\dfrac{N}{N_A}', ['n = N N_A', 'n = \\dfrac{N_A}{N}']],
  ['gas', AMOUNT, 'Ideal gas equation', 'pV = nRT', ['pV = \\dfrac{nR}{T}', 'pT = nRV', 'p = nRTV'],
    { tip: 'p in kPa and V in L give n directly with R = 8.31; T in kelvin.', gap: { tex: 'pV = n\\gap T', answers: ['R'] } }],
  ['n-slc', AMOUNT, 'Amount of gas at SLC', 'n = \\dfrac{V}{V_m} = \\dfrac{V}{24.8}', ['n = V \\times 24.8', 'n = \\dfrac{V}{22.4}'],
    { tip: 'Only at SLC (25 °C, 100 kPa); otherwise use pV = nRT.' }],
  ['ppm', AMOUNT, 'Concentration in ppm', 'c_{\\text{ppm}} = \\dfrac{\\text{mass of solute (mg)}}{\\text{mass of solution (kg)}}',
    ['c_{\\text{ppm}} = \\dfrac{\\text{mass of solute (g)}}{\\text{mass of solution (kg)}}', 'c_{\\text{ppm}} = \\dfrac{\\text{mass of solution (kg)}}{\\text{mass of solute (mg)}}']],
  ['density', AMOUNT, 'Density', '\\rho = \\dfrac{m}{V}', ['\\rho = \\dfrac{V}{m}', '\\rho = mV']],

  // Energy
  ['q', ENERGY, 'Heat gained or lost by water', 'q = mc\\Delta T', ['q = \\dfrac{mc}{\\Delta T}', 'q = \\dfrac{m\\Delta T}{c}', 'q = c\\Delta T'],
    { tip: 'With c = 4.18 J g⁻¹ K⁻¹, m in grams gives q in joules.', gap: { tex: 'q = m\\gap\\Delta T', answers: ['c'] } }],
  ['molar-dH', ENERGY, 'Molar enthalpy change', '\\Delta H = \\dfrac{q}{n}', ['\\Delta H = qn', '\\Delta H = \\dfrac{n}{q}'],
    { tip: 'Add the sign yourself: negative for an exothermic reaction.' }],
  ['dH', ENERGY, 'Enthalpy change of a reaction', '\\Delta H = H_{\\text{products}} - H_{\\text{reactants}}', ['\\Delta H = H_{\\text{reactants}} - H_{\\text{products}}', '\\Delta H = H_{\\text{products}} + H_{\\text{reactants}}']],
  ['E-elec', ENERGY, 'Electrical energy supplied', 'E = VIt', ['E = \\dfrac{VI}{t}', 'E = It', 'E = \\dfrac{V}{It}'],
    { tip: 'Used to calibrate a calorimeter electrically.', gap: { tex: 'E = V\\gap t', answers: ['I'] } }],
  ['cf', ENERGY, 'Calibration factor', '\\text{CF} = \\dfrac{E}{\\Delta T}', ['\\text{CF} = \\dfrac{\\Delta T}{E}', '\\text{CF} = E\\,\\Delta T']],
  ['cal-energy', ENERGY, 'Energy released in a calibrated calorimeter', 'E = \\text{CF} \\times \\Delta T', ['E = \\dfrac{\\text{CF}}{\\Delta T}', 'E = \\dfrac{\\Delta T}{\\text{CF}}']],

  // Electrochemistry
  ['Q-It', ELEC, 'Electric charge', 'Q = It', ['Q = \\dfrac{I}{t}', 'Q = \\dfrac{t}{I}', 'Q = IV'],
    { tip: 'Time in seconds.', gap: { tex: 'Q = \\gap\\, t', answers: ['I'] } }],
  ['n-e', ELEC, 'Amount of electrons', 'n(e^-) = \\dfrac{Q}{F}', ['n(e^-) = QF', 'n(e^-) = \\dfrac{F}{Q}'],
    { gap: { tex: 'n(e^-) = \\dfrac{\\gap}{F}', answers: ['Q'] } }],
  ['Ecell', ELEC, 'Standard cell potential', 'E^\\ominus_{\\text{cell}} = E^\\ominus_{\\text{reduction}} - E^\\ominus_{\\text{oxidation}}',
    ['E^\\ominus_{\\text{cell}} = E^\\ominus_{\\text{oxidation}} - E^\\ominus_{\\text{reduction}}', 'E^\\ominus_{\\text{cell}} = E^\\ominus_{\\text{reduction}} + E^\\ominus_{\\text{oxidation}}'],
    { tip: 'Higher E° (the cathode half-cell) minus lower E°.' }],

  // Percentages and K
  ['atom-economy', PCT, 'Percentage atom economy', '\\dfrac{\\text{molar mass of desired product}}{\\text{molar mass of all reactants}} \\times 100',
    ['\\dfrac{\\text{molar mass of all reactants}}{\\text{molar mass of desired product}} \\times 100', '\\dfrac{\\text{actual yield}}{\\text{theoretical yield}} \\times 100'],
    { tip: 'Uses the balanced equation, coefficients included.' }],
  ['yield', PCT, 'Percentage yield', '\\dfrac{\\text{actual yield}}{\\text{theoretical yield}} \\times 100',
    ['\\dfrac{\\text{theoretical yield}}{\\text{actual yield}} \\times 100', '\\dfrac{\\text{molar mass of desired product}}{\\text{molar mass of all reactants}} \\times 100']],
  ['efficiency', PCT, 'Energy efficiency', '\\dfrac{\\text{useful energy out}}{\\text{energy in}} \\times 100',
    ['\\dfrac{\\text{energy in}}{\\text{useful energy out}} \\times 100', '\\dfrac{\\text{actual yield}}{\\text{theoretical yield}} \\times 100']],
  ['pct-error', PCT, 'Percentage error', '\\dfrac{|\\text{experimental} - \\text{accepted}|}{\\text{accepted}} \\times 100',
    ['\\dfrac{|\\text{experimental} - \\text{accepted}|}{\\text{experimental}} \\times 100', '\\dfrac{\\text{experimental}}{\\text{accepted}} \\times 100']],
  ['K', PCT, 'Equilibrium constant for wA + xB ⇌ yC + zD', 'K = \\dfrac{[\\mathrm{C}]^y[\\mathrm{D}]^z}{[\\mathrm{A}]^w[\\mathrm{B}]^x}',
    ['K = \\dfrac{[\\mathrm{A}]^w[\\mathrm{B}]^x}{[\\mathrm{C}]^y[\\mathrm{D}]^z}', 'K = \\dfrac{y[\\mathrm{C}]\\,z[\\mathrm{D}]}{w[\\mathrm{A}]\\,x[\\mathrm{B}]}', 'K = \\dfrac{[\\mathrm{C}]^y + [\\mathrm{D}]^z}{[\\mathrm{A}]^w + [\\mathrm{B}]^x}'],
    { tip: 'Products over reactants, each to the power of its coefficient.' }],
  ['K-reverse', PCT, 'K for the reverse equation', '\\dfrac{1}{K}', ['-K', 'K', 'K^2'], { ask: 'in terms of the forward K', oneWay: true }],
  ['K-double', PCT, 'K when every coefficient is doubled', 'K^2', ['2K', 'K', '\\sqrt{K}'], { ask: 'in terms of the original K', oneWay: true }],
  ['K-halve', PCT, 'K when every coefficient is halved', '\\sqrt{K}', ['\\dfrac{K}{2}', 'K^2', 'K'], { ask: 'in terms of the original K', oneWay: true }],

  // Constants (Data Book Table 4)
  ['F', CONST, 'Faraday constant', 'F = 96\\,500\\ \\mathrm{C\\,mol^{-1}}', ['F = 6.02 \\times 10^{23}\\ \\mathrm{C\\,mol^{-1}}', 'F = 1.60 \\times 10^{-19}\\ \\mathrm{C\\,mol^{-1}}'],
    { tip: 'The charge on 1 mol of electrons.' }],
  ['NA', CONST, 'Avogadro constant', 'N_A = 6.02 \\times 10^{23}\\ \\mathrm{mol^{-1}}', ['N_A = 96\\,500\\ \\mathrm{mol^{-1}}', 'N_A = 6.02 \\times 10^{-23}\\ \\mathrm{mol^{-1}}']],
  ['R', CONST, 'Molar gas constant', 'R = 8.31\\ \\mathrm{J\\,mol^{-1}\\,K^{-1}}', ['R = 24.8\\ \\mathrm{J\\,mol^{-1}\\,K^{-1}}', 'R = 4.18\\ \\mathrm{J\\,mol^{-1}\\,K^{-1}}']],
  ['Vm', CONST, 'Molar volume of a gas at SLC', 'V_m = 24.8\\ \\mathrm{L\\,mol^{-1}}', ['V_m = 22.4\\ \\mathrm{L\\,mol^{-1}}', 'V_m = 8.31\\ \\mathrm{L\\,mol^{-1}}'],
    { tip: '22.4 L mol⁻¹ is at 0 °C, not SLC.' }],
  ['c-water', CONST, 'Specific heat capacity of water', 'c = 4.18\\ \\mathrm{J\\,g^{-1}\\,K^{-1}}', ['c = 4.18\\ \\mathrm{kJ\\,g^{-1}\\,K^{-1}}', 'c = 8.31\\ \\mathrm{J\\,g^{-1}\\,K^{-1}}'],
    { tip: 'Also 4.18 kJ kg⁻¹ K⁻¹.' }],
  ['kelvin', CONST, '0 °C in kelvin', '273\\ \\mathrm{K}', ['298\\ \\mathrm{K}', '100\\ \\mathrm{K}', '-273\\ \\mathrm{K}'], { oneWay: true }],
  ['rho-water', CONST, 'Density of water at 25 °C', '1.0\\ \\mathrm{g\\,mL^{-1}}', ['1.0\\ \\mathrm{kg\\,mL^{-1}}', '4.18\\ \\mathrm{g\\,mL^{-1}}'], { oneWay: true }],
]

export const chemFormulasDeck: Deck = {
  id: 'chem-formulas',
  title: 'Chemistry Formulas',
  blurb: 'The calculation formulas and constants from the Data Book, so you can use them without looking them up or turning them upside down.',
  groups: [AMOUNT, ENERGY, ELEC, PCT, CONST],
  cards: rows.map(([id, group, front, back, traps, extra]) => ({
    id,
    group,
    front: { text: front },
    back: t(back),
    traps: traps.map(t),
    ...extra,
  })),
  directionLabel: { fwd: 'Quantity → Formula', rev: 'Formula → Quantity' },
  promptLabel: { fwd: 'Formula for', rev: 'What does this give?' },
  maxTraps: 3,
  source: 'Tables 3 and 4, 2026 VCE Chemistry Data Book (percentage error and efficiency from the Study Design)',
}
