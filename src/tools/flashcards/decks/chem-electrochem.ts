import type { Card, Deck, Face } from '../data'

// Unit 3 AoS 1 and 2: redox, galvanic and fuel cells, electrolysis, rechargeable cells,
// green hydrogen and Faraday's laws.

const REDOX = 'Redox'
const GALV = 'Galvanic & Fuel Cells'
const ELEC = 'Electrolysis & Recharging'
const H2 = 'Hydrogen Half-Equations'

/** A short answer a student could type: plain words, three at most. */
const typeable = (s: string) => /^[A-Za-z0-9 '-]+$/.test(s) && s.trim().split(/\s+/).length <= 3

/** "tex:..." is maths; anything else is words. */
const face = (s: string): Face =>
  s.startsWith('tex:') ? { tex: s.slice(4) } : typeable(s) ? { text: s, plain: s } : { text: s }

/** [id, group, front, back, traps, extra] */
type Row = [string, string, string, string, string[]?, Partial<Card>?]

const ANODE_G = 'The negative electrode, where oxidation occurs.'
const CATHODE_G = 'The positive electrode, where reduction occurs.'
const ANODE_E = 'The positive electrode, where oxidation occurs.'
const CATHODE_E = 'The negative electrode, where reduction occurs.'
const ELECTRODE_TIP = 'An Ox, Red Cat in every cell; only the signs swap between galvanic and electrolytic.'

const eq = (s: string) => `tex:\\mathrm{${s}}`

const rows: Row[] = [
  // Redox
  ['oxidation', REDOX, 'oxidation', 'Loss of electrons; the oxidation number increases.', ['Gain of electrons; the oxidation number decreases.'], { family: 'ox-red' }],
  ['reduction', REDOX, 'reduction', 'Gain of electrons; the oxidation number decreases.', ['Loss of electrons; the oxidation number increases.'], { family: 'ox-red', tip: 'OIL RIG: oxidation is loss, reduction is gain.' }],
  ['oxidant', REDOX, 'oxidising agent', 'The species that gains electrons and is reduced, causing another species to be oxidised.',
    ['The species that loses electrons and is oxidised, causing another species to be reduced.'], { family: 'agent' }],
  ['reductant', REDOX, 'reducing agent', 'The species that loses electrons and is oxidised, causing another species to be reduced.',
    ['The species that gains electrons and is reduced, causing another species to be oxidised.'], { family: 'agent' }],
  ['redox-pair', REDOX, 'conjugate redox pair', 'An oxidising agent and the reducing agent it becomes by gaining electrons, e.g. Cu²⁺/Cu.',
    ['An acid and the base it becomes by losing H⁺.', 'The two electrodes of a galvanic cell.']],
  ['redox', REDOX, 'redox reaction', 'A reaction in which oxidation and reduction happen simultaneously, as electrons are transferred.'],
  ['half-eq', REDOX, 'half-equation', 'An equation for just the oxidation or just the reduction, showing the electrons.'],
  ['strongest-ox', REDOX, 'Where the strongest oxidising agent is in the electrochemical series', 'Top left (F₂)', ['Bottom right (Li)', 'Top right (F⁻)', 'Bottom left (Li⁺)'], { family: 'ecs', oneWay: true }],
  ['strongest-red', REDOX, 'Where the strongest reducing agent is in the electrochemical series', 'Bottom right (Li)', ['Top left (F₂)', 'Bottom left (Li⁺)', 'Top right (F⁻)'], { family: 'ecs', oneWay: true }],
  ['ecs-predict', REDOX, 'When the electrochemical series predicts a reaction', 'When the oxidising agent (left side) is higher in the series than the reducing agent (right side).',
    ['When the reducing agent (right side) is higher in the series than the oxidising agent (left side).', 'Whenever the two half-cells are connected by a salt bridge.'], { oneWay: true }],
  ['ecs-limits', REDOX, 'A limitation of electrochemical series predictions', 'They apply to standard conditions only and say nothing about how fast the reaction is.',
    ['They only work for metals.', 'They only work for gases.'], { oneWay: true }],
  ['basic', REDOX, 'Balancing a half-equation in basic conditions', 'Balance with H⁺ as for acid, then add OH⁻ to both sides to turn each H⁺ into H₂O.',
    ['Balance with H⁺ as for acid, then remove all the water.', 'Add H⁺ to the side with fewer oxygen atoms.'], { oneWay: true }],

  // Galvanic and fuel cells
  ['galvanic', GALV, 'galvanic cell', 'A cell that converts chemical energy into electrical energy from a spontaneous redox reaction.',
    ['A cell that uses electrical energy to drive a non-spontaneous redox reaction.'], { family: 'cell-type' }],
  ['anode-g', GALV, 'anode of a galvanic cell', ANODE_G, [CATHODE_G, ANODE_E], { family: 'electrode', tip: ELECTRODE_TIP }],
  ['cathode-g', GALV, 'cathode of a galvanic cell', CATHODE_G, [ANODE_G, CATHODE_E], { family: 'electrode', tip: ELECTRODE_TIP }],
  ['electron-flow', GALV, 'Direction of electron flow in the external circuit', 'From anode to cathode', ['From cathode to anode', 'Through the salt bridge'], { oneWay: true, tip: 'True for galvanic and electrolytic cells alike.' }],
  ['salt-bridge', GALV, 'salt bridge', 'Lets ions move between the half-cells to keep each electrically neutral, completing the circuit.',
    ['Carries electrons between the half-cells.', 'Supplies the reactants for the cell reaction.']],
  ['sb-anions', GALV, 'Where anions in the salt bridge migrate', 'Towards the anode', ['Towards the cathode'], { family: 'sb', oneWay: true }],
  ['sb-cations', GALV, 'Where cations in the salt bridge migrate', 'Towards the cathode', ['Towards the anode'], { family: 'sb', oneWay: true, tip: 'Cations go to the cathode, where positive ions are being used up.' }],
  ['electrolyte', GALV, 'electrolyte', 'A solution or molten compound with mobile ions that conducts charge.'],
  ['inert', GALV, 'inert electrode', 'An unreactive conductor (e.g. platinum or graphite) used when a half-cell has no solid metal to carry electrons.',
    ['An electrode that is oxidised during the reaction.']],
  ['primary', GALV, 'primary cell', 'A non-rechargeable galvanic cell: its reaction can’t practically be reversed.',
    ['A rechargeable cell: galvanic when discharging, electrolytic when recharging.', 'A galvanic cell whose reactants are supplied continuously.'], { family: 'cell-type' }],
  ['secondary', GALV, 'secondary cell', 'A rechargeable cell: galvanic when discharging, electrolytic when recharging.',
    ['A non-rechargeable galvanic cell: its reaction can’t practically be reversed.', 'A galvanic cell whose reactants are supplied continuously.'], { family: 'cell-type' }],
  ['fuel-cell', GALV, 'fuel cell', 'A galvanic cell whose reactants are supplied continuously and products removed, so it produces electricity continuously.',
    ['A rechargeable cell: galvanic when discharging, electrolytic when recharging.', 'A furnace that burns fuel to make steam for a turbine.'], { family: 'cell-type' }],
  ['porous', GALV, 'Why fuel cells use porous electrodes', 'Gases can diffuse in, giving a large contact area between gas, electrolyte and electrode, so the cell is more efficient.',
    ['So the electrodes are oxidised faster.', 'To let electrons pass through to the electrolyte.'], { oneWay: true }],
  ['fc-catalyst', GALV, 'Why fuel cell electrodes carry a catalyst (often platinum)', 'To speed up the electrode reactions.',
    ['To increase the cell voltage.', 'To shift the equilibrium towards products.'], { oneWay: true }],
  ['fc-efficiency', GALV, 'Why a fuel cell is more efficient than a gas-fired power station', 'It converts chemical energy straight to electrical energy, so less is lost as heat in extra energy transformations.',
    ['Its fuel has a higher heat of combustion.', 'It burns its fuel at a higher temperature.'], { oneWay: true }],

  // Electrolysis and recharging
  ['electrolytic', ELEC, 'electrolytic cell', 'A cell that uses electrical energy to drive a non-spontaneous redox reaction.',
    ['A cell that converts chemical energy into electrical energy from a spontaneous redox reaction.'], { family: 'cell-type' }],
  ['anode-e', ELEC, 'anode of an electrolytic cell', ANODE_E, [CATHODE_E, ANODE_G], { family: 'electrode', tip: ELECTRODE_TIP }],
  ['cathode-e', ELEC, 'cathode of an electrolytic cell', CATHODE_E, [ANODE_E, CATHODE_G], { family: 'electrode', tip: ELECTRODE_TIP }],
  ['cathode-reacts', ELEC, 'What reacts at the cathode in electrolysis', 'The strongest oxidising agent present', ['The strongest reducing agent present', 'The electrode itself'], { family: 'which-reacts', oneWay: true }],
  ['anode-reacts', ELEC, 'What reacts at the anode in electrolysis', 'The strongest reducing agent present, which may be the anode itself', ['The strongest oxidising agent present', 'Always water'], { family: 'which-reacts', oneWay: true }],
  ['aqueous-na', ELEC, 'Why aqueous NaCl can’t be electrolysed to make sodium', 'Water is a stronger oxidising agent than Na⁺, so H₂ forms at the cathode instead.',
    ['Na⁺ is a stronger oxidising agent than water.', 'Chlorine reacts with the sodium as it forms.'], { oneWay: true, tip: 'Reactive metals are made from their molten salts.' }],
  ['remove-products', ELEC, 'Why commercial cells remove products as they form', 'So the products can’t react with each other or at the other electrode.',
    ['To make the cell voltage higher.', 'To keep the electrolyte molten.'], { oneWay: true }],
  ['plating', ELEC, 'The electrode the object goes on in electroplating', 'The cathode', ['The anode', 'Either electrode'], { oneWay: true, tip: 'Metal ions are reduced onto the cathode; the anode is often the plating metal.' }],
  ['recharge', ELEC, 'recharging', 'An external power supply forces the discharge reaction in reverse, so the cell runs as an electrolytic cell.',
    ['The cell runs as a galvanic cell, producing electricity.']],
  ['recharge-condition', ELEC, 'What a cell needs to be rechargeable', 'Its discharge products must stay in contact with the electrodes, so the reaction can be reversed.',
    ['Its electrodes must be inert.', 'Its reactants must be gases supplied continuously.'], { oneWay: true }],
  ['recharge-polarity', ELEC, 'What happens to the electrodes when a secondary cell is recharged', 'Their polarity stays the same, but the anode and cathode swap.',
    ['Their polarity reverses, and the anode stays the anode.', 'Both electrodes become cathodes.'], { oneWay: true, tip: 'The positive electrode is the cathode on discharge and the anode on recharge.' }],
  ['green-h2', ELEC, 'green hydrogen', 'Hydrogen made by electrolysis of water powered by renewable energy (e.g. solar or wind).',
    ['Hydrogen made from natural gas (methane).'], { family: 'h2' }],
  ['pem', ELEC, 'PEM electrolysis', 'Water split with electricity, using a polymer electrolyte membrane that lets H⁺ pass from anode to cathode.',
    ['Water split by sunlight using a water oxidation catalyst and a proton reduction catalyst.'], { family: 'h2' }],
  ['art-photo', ELEC, 'artificial photosynthesis', 'Water split by sunlight using a water oxidation catalyst and a proton reduction catalyst.',
    ['Water split with electricity, using a polymer electrolyte membrane that lets H⁺ pass from anode to cathode.'], { family: 'h2' }],
  ['faraday-1', ELEC, 'Faraday’s first law', 'The amount of substance produced at an electrode is directly proportional to the charge passed.',
    ['To produce 1 mol of a substance, a whole number of moles of electrons is needed.'], { family: 'faraday' }],
  ['faraday-2', ELEC, 'Faraday’s second law', 'To produce 1 mol of a substance, a whole number of moles of electrons is needed (from its half-equation).',
    ['The amount of substance produced at an electrode is directly proportional to the charge passed.'], { family: 'faraday' }],

  // Hydrogen half-equations (fuel cell and PEM electrolysis)
  ['h2-acid-cathode', H2, 'Hydrogen fuel cell, acidic: cathode', eq('O_2(g) + 4H^+(aq) + 4e^- \\rightarrow 2H_2O(l)'),
    [eq('H_2(g) \\rightarrow 2H^+(aq) + 2e^-'), eq('O_2(g) + 2H_2O(l) + 4e^- \\rightarrow 4OH^-(aq)')], { family: 'h2-eq' }],
  ['h2-acid-anode', H2, 'Hydrogen fuel cell, acidic: anode', eq('H_2(g) \\rightarrow 2H^+(aq) + 2e^-'),
    [eq('O_2(g) + 4H^+(aq) + 4e^- \\rightarrow 2H_2O(l)'), eq('H_2(g) + 2OH^-(aq) \\rightarrow 2H_2O(l) + 2e^-')], { family: 'h2-eq' }],
  ['h2-base-cathode', H2, 'Hydrogen fuel cell, alkaline: cathode', eq('O_2(g) + 2H_2O(l) + 4e^- \\rightarrow 4OH^-(aq)'),
    [eq('O_2(g) + 4H^+(aq) + 4e^- \\rightarrow 2H_2O(l)'), eq('H_2(g) + 2OH^-(aq) \\rightarrow 2H_2O(l) + 2e^-')], { family: 'h2-eq' }],
  ['h2-base-anode', H2, 'Hydrogen fuel cell, alkaline: anode', eq('H_2(g) + 2OH^-(aq) \\rightarrow 2H_2O(l) + 2e^-'),
    [eq('H_2(g) \\rightarrow 2H^+(aq) + 2e^-'), eq('O_2(g) + 2H_2O(l) + 4e^- \\rightarrow 4OH^-(aq)')], { family: 'h2-eq' }],
  ['pem-anode', H2, 'PEM electrolysis of water: anode', eq('2H_2O(l) \\rightarrow O_2(g) + 4H^+(aq) + 4e^-'),
    [eq('2H^+(aq) + 2e^- \\rightarrow H_2(g)'), eq('O_2(g) + 4H^+(aq) + 4e^- \\rightarrow 2H_2O(l)')], { family: 'h2-eq' }],
  ['pem-cathode', H2, 'PEM electrolysis of water: cathode', eq('2H^+(aq) + 2e^- \\rightarrow H_2(g)'),
    [eq('2H_2O(l) \\rightarrow O_2(g) + 4H^+(aq) + 4e^-'), eq('H_2(g) \\rightarrow 2H^+(aq) + 2e^-')], { family: 'h2-eq' }],
]

export const chemElectrochemDeck: Deck = {
  id: 'chem-electrochem',
  title: 'Electrochemistry',
  blurb: 'Redox terms, galvanic, fuel, electrolytic and rechargeable cells, green hydrogen and Faraday’s laws.',
  groups: [REDOX, GALV, ELEC, H2],
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
  maxTraps: 2,
  source: 'VCE Chemistry Study Design Unit 3 AoS 1–2; Electrochemical series, 2026 Data Book',
}
