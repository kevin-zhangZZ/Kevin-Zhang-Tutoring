import type { Card, Deck } from '../data'

// Unit 3 AoS 2: rates of reaction, the extent of reaction and Le Chatelier's principle.

const RATE = 'Rates'
const EQM = 'Equilibrium'
const LC = 'Le Chatelier'
const GRAPH = 'Concentration–Time Graphs'

/** A short answer a student could type: plain words, three at most. */
const typeable = (s: string) => /^[A-Za-z0-9 '-]+$/.test(s) && s.trim().split(/\s+/).length <= 3

/** [id, group, front, back, traps, extra] */
type Row = [string, string, string, string, string[]?, Partial<Card>?]

const RIGHT_K_SAME = 'Shifts right (net forward reaction); K unchanged'
const LEFT_K_SAME = 'Shifts left (net back reaction); K unchanged'
const NO_SHIFT = 'No shift; K unchanged'

const rows: Row[] = [
  // Rates
  ['rate', RATE, 'rate of reaction', 'The change in amount or concentration of a reactant or product per unit time.',
    ['How far a reaction proceeds: how much product forms.'], { family: 'rate-extent' }],
  ['collision-theory', RATE, 'collision theory', 'Particles react only when they collide with at least the activation energy and the correct orientation.'],
  ['successful', RATE, 'successful collision', 'A collision with energy at least equal to the activation energy and the correct orientation, so products form.',
    ['Any collision between reactant particles.']],
  ['ea', RATE, 'activation energy', 'The minimum energy colliding particles need to break reactant bonds and react.',
    ['The energy released when products form.', 'The enthalpy of the products minus the reactants.']],
  ['catalyst', RATE, 'catalyst', 'A substance that speeds up a reaction by providing an alternative pathway with a lower activation energy, without being used up.',
    ['A substance that increases the yield of a reaction by shifting the equilibrium.', 'A reactant that is added in excess.']],
  ['temp-rate', RATE, 'Why a higher temperature increases rate', 'Particles have more kinetic energy, so a greater proportion of collisions have at least the activation energy (and collisions are more frequent).',
    ['More particles per unit volume, so collisions are more frequent.', 'The activation energy is lowered.'], { family: 'why-rate', oneWay: true }],
  ['conc-rate', RATE, 'Why a higher concentration (or gas pressure) increases rate', 'More particles per unit volume, so collisions are more frequent.',
    ['A greater proportion of collisions have at least the activation energy.', 'The activation energy is lowered.'], { family: 'why-rate', oneWay: true }],
  ['sa-rate', RATE, 'Why a larger surface area increases rate', 'More reactant particles are exposed, so collisions are more frequent.',
    ['The particles have more kinetic energy.', 'The activation energy is lowered.'], { family: 'why-rate', oneWay: true }],
  ['cat-rate', RATE, 'Why a catalyst increases rate', 'Its alternative pathway has a lower activation energy, so a greater proportion of collisions are successful.',
    ['The particles have more kinetic energy.', 'It shifts the equilibrium to the right.'], { family: 'why-rate', oneWay: true }],
  ['open', RATE, 'open system', 'A system that matter can enter or leave (e.g. a gas escaping from an open flask).',
    ['A system where no matter enters or leaves, though energy can.'], { family: 'system' }],
  ['closed', RATE, 'closed system', 'A system where no matter enters or leaves, though energy can.',
    ['A system that matter can enter or leave (e.g. a gas escaping from an open flask).'], { family: 'system', tip: 'Equilibrium needs a closed system.' }],

  // Equilibrium
  ['reversible', EQM, 'reversible reaction', 'A reaction in which the products can react to re-form the reactants.',
    ['A reaction that goes to completion; products can’t re-form reactants.'], { family: 'rev' }],
  ['irreversible', EQM, 'irreversible reaction', 'A reaction that goes to completion; the products can’t re-form the reactants.',
    ['A reaction in which the products can react to re-form the reactants.'], { family: 'rev' }],
  ['extent', EQM, 'extent of reaction', 'How far a reaction proceeds: how much product forms.',
    ['The change in amount or concentration of a reactant or product per unit time.'], { family: 'rate-extent' }],
  ['dynamic', EQM, 'dynamic equilibrium', 'The forward and reverse reactions continue at equal rates, so concentrations stay constant.',
    ['Both reactions have stopped, so concentrations stay constant.', 'The concentrations of reactants and products are equal.']],
  ['homogeneous', EQM, 'homogeneous equilibrium', 'An equilibrium in which all species are in the same phase (all gases or all aqueous).'],
  ['K', EQM, 'equilibrium constant (K)', 'The ratio of product to reactant concentrations, each raised to its coefficient, at equilibrium.',
    ['The same ratio at any point in time, not necessarily at equilibrium.'], { family: 'kq' }],
  ['Q', EQM, 'reaction quotient (Q)', 'The concentration ratio of the K expression at any point in time: a measure of the extent so far.',
    ['The ratio of product to reactant concentrations, each raised to its coefficient, at equilibrium.'], { family: 'kq' }],
  ['q-less', EQM, 'If Q < K', 'Net forward reaction until Q = K', ['Net back reaction until Q = K', 'The system is at equilibrium'], { family: 'q-vs-k' }],
  ['q-more', EQM, 'If Q > K', 'Net back reaction until Q = K', ['Net forward reaction until Q = K', 'The system is at equilibrium'], { family: 'q-vs-k' }],
  ['q-equal', EQM, 'If Q = K', 'The system is at equilibrium', ['Net forward reaction until Q = K', 'Net back reaction until Q = K'], { family: 'q-vs-k' }],
  ['big-K', EQM, 'A very large K (e.g. above 10⁴)', 'Mostly products at equilibrium: the reaction goes almost to completion.',
    ['Mostly reactants at equilibrium: very little product forms.', 'The reaction is very fast.'], { family: 'k-size' }],
  ['small-K', EQM, 'A very small K (e.g. below 10⁻⁴)', 'Mostly reactants at equilibrium: very little product forms.',
    ['Mostly products at equilibrium: the reaction goes almost to completion.', 'The reaction is very slow.'], { family: 'k-size' }],
  ['k-temp', EQM, 'The only change that alters K for a given equation', 'temperature', ['pressure', 'concentration', 'adding a catalyst'], { oneWay: true }],
  ['k-rate', EQM, 'What K tells you about how fast equilibrium is reached', 'Nothing: K is about extent, not rate.',
    ['A large K means equilibrium is reached quickly.', 'A small K means equilibrium is reached quickly.'], { oneWay: true }],

  // Le Chatelier
  ['lc', LC, 'Le Chatelier’s principle', 'If a change is made to a system at equilibrium, the system shifts to partially oppose the change.',
    ['If a change is made to a system at equilibrium, the system shifts to fully cancel the change.']],
  ['add-reactant', LC, 'Adding a reactant', RIGHT_K_SAME, [LEFT_K_SAME, 'Shifts right; K increases'], { family: 'lc-shift', oneWay: true }],
  ['remove-product', LC, 'Removing a product', RIGHT_K_SAME, [LEFT_K_SAME, 'Shifts right; K increases'], { family: 'lc-shift', oneWay: true }],
  ['add-product', LC, 'Adding a product', LEFT_K_SAME, [RIGHT_K_SAME, 'Shifts left; K decreases'], { family: 'lc-shift', oneWay: true }],
  ['halve-volume', LC, 'Halving the volume of a gas mixture', 'Shifts to the side with fewer gas particles; K unchanged',
    ['Shifts to the side with more gas particles; K unchanged', 'No shift; all concentrations double'], { family: 'lc-shift', oneWay: true, tip: 'All concentrations jump up first; the shift then partially opposes the rise in pressure.' }],
  ['dilute', LC, 'Diluting an aqueous equilibrium with water', 'Shifts to the side with more dissolved particles; K unchanged',
    ['Shifts to the side with fewer dissolved particles; K unchanged', 'No shift; K unchanged'], { family: 'lc-shift', oneWay: true }],
  ['inert-gas', LC, 'Adding an inert gas at constant volume', NO_SHIFT, ['Shifts to the side with fewer gas particles', RIGHT_K_SAME], { family: 'lc-shift', oneWay: true, tip: 'Total pressure rises but no concentration in the K expression changes.' }],
  ['add-cat', LC, 'Adding a catalyst', 'No shift; equilibrium is reached faster', [RIGHT_K_SAME, 'Shifts right; K increases'], { family: 'lc-shift', oneWay: true }],
  ['heat-exo', LC, 'Raising the temperature (forward reaction exothermic)', 'Shifts left; K decreases',
    ['Shifts right; K increases', LEFT_K_SAME], { family: 'lc-temp', oneWay: true }],
  ['heat-endo', LC, 'Raising the temperature (forward reaction endothermic)', 'Shifts right; K increases',
    ['Shifts left; K decreases', RIGHT_K_SAME], { family: 'lc-temp', oneWay: true }],
  ['cool-exo', LC, 'Lowering the temperature (forward reaction exothermic)', 'Shifts right; K increases',
    ['Shifts left; K decreases', RIGHT_K_SAME], { family: 'lc-temp', oneWay: true }],
  ['rate-yield', LC, 'The rate–yield conflict for an exothermic reaction', 'A low temperature gives a higher yield but a slow rate, so a compromise temperature and a catalyst are used.',
    ['A high temperature gives a higher yield but a slow rate, so the temperature is kept low.', 'A catalyst increases the yield, so no compromise is needed.'], { oneWay: true }],

  // Reading concentration-time graphs
  ['graph-species', GRAPH, 'A sudden jump in one species only', 'That species was added or removed',
    ['The volume was changed', 'The temperature was changed'], { family: 'graph', tip: 'The other species then change gradually as the system shifts.' }],
  ['graph-all', GRAPH, 'Every concentration jumps at the same moment', 'The volume was changed (pressure or dilution)',
    ['One species was added', 'The temperature was changed'], { family: 'graph' }],
  ['graph-gradual', GRAPH, 'All concentrations change gradually, with no sudden jump', 'The temperature was changed',
    ['The volume was changed (pressure or dilution)', 'One species was added'], { family: 'graph' }],
  ['graph-flat', GRAPH, 'All the lines go flat (horizontal)', 'Equilibrium has been reached',
    ['The reaction has stopped', 'All the reactants are used up'], { family: 'graph' }],
]

export const chemRatesEquilibriumDeck: Deck = {
  id: 'chem-rates-equilibrium',
  title: 'Rates & Equilibrium',
  blurb: 'Collision theory and catalysts, dynamic equilibrium, K and Q, Le Chatelier’s principle and reading concentration–time graphs.',
  groups: [RATE, EQM, LC, GRAPH],
  cards: rows.map(([id, group, front, back, traps, extra]) => ({
    id,
    group,
    front: typeable(front) ? { text: front, plain: front } : { text: front },
    back: typeable(back) ? { text: back, plain: back } : { text: back },
    traps: traps?.map(text => ({ text })),
    ...extra,
  })),
  directionLabel: { fwd: 'Term → Meaning', rev: 'Meaning → Term' },
  promptLabel: { fwd: 'Recall', rev: 'Which is it?' },
  maxTraps: 2,
  source: 'VCE Chemistry Study Design Unit 3 AoS 2',
}
