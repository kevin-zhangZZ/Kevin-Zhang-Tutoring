import type { Card, Deck } from '../data'

// Unit 4 AoS 1: the reaction pathways in the study design (reagents and conditions → product),
// the reaction types, and naming the ester from its acid and alcohol.

const PATH = 'Pathways'
const TYPES = 'Reaction Types'
const SPOT = 'Spot the Type'
const ESTERS = 'Naming Esters'

/** A short answer a student could type: plain words, three at most. */
const typeable = (s: string) => /^[A-Za-z0-9 '-]+$/.test(s) && s.trim().split(/\s+/).length <= 3

/** [id, group, front, back, traps, extra] */
type Row = [string, string, string, string, string[]?, Partial<Card>?]

const ONE = { oneWay: true }

const rows: Row[] = [
  // Pathways: several routes lead to the same product, so these are asked one way.
  ['alkane-halogen', PATH, 'alkane + Cl₂ (UV light)', 'chloroalkane + HCl', ['dichloroalkane only', 'alkene + HCl', 'alcohol + HCl'],
    { ...ONE, tip: 'Substitution. Can keep going, replacing more H atoms.' }],
  ['alkene-h2', PATH, 'alkene + H₂ (Ni or Pt catalyst, heat)', 'alkane', ['alcohol', 'alkyne', 'haloalkane'], { ...ONE, tip: 'Addition (hydrogenation).' }],
  ['alkene-halogen', PATH, 'alkene + Br₂', 'dibromoalkane', ['bromoalkane + HBr', 'bromoalkene', 'alcohol'], { ...ONE, tip: 'Addition: one Br on each carbon of the old C=C. The test for C=C.' }],
  ['alkene-hx', PATH, 'alkene + HCl', 'chloroalkane', ['dichloroalkane', 'chloroalkene + H₂', 'alcohol + Cl₂'], { ...ONE, tip: 'Addition.' }],
  ['alkene-water', PATH, 'alkene + H₂O(g) (H₃PO₄ catalyst, heat and pressure)', 'alcohol', ['aldehyde', 'carboxylic acid', 'alkane'], { ...ONE, tip: 'Addition (hydration): how ethanol is made from ethene.' }],
  ['halo-hydroxide', PATH, 'haloalkane + NaOH(aq) or KOH(aq)', 'alcohol + halide ion', ['alkene + water', 'carboxylic acid + halide ion', 'primary amine + halide ion'], { ...ONE, tip: 'Substitution: OH replaces the halogen.' }],
  ['halo-ammonia', PATH, 'haloalkane + NH₃ (in ethanol)', 'primary amine + HX', ['amide + HX', 'alcohol + HX', 'alkene + NH₄X'], { ...ONE, tip: 'Substitution: NH₂ replaces the halogen.' }],
  ['primary-ox', PATH, 'primary alcohol + H⁺/Cr₂O₇²⁻ or H⁺/MnO₄⁻ (heat)', 'carboxylic acid (via the aldehyde)', ['ketone', 'ester', 'no reaction'], { ...ONE, tip: 'Dichromate turns orange → green; permanganate purple → colourless.' }],
  ['secondary-ox', PATH, 'secondary alcohol + H⁺/Cr₂O₇²⁻ or H⁺/MnO₄⁻', 'ketone', ['carboxylic acid', 'aldehyde', 'no reaction'], ONE],
  ['tertiary-ox', PATH, 'tertiary alcohol + H⁺/Cr₂O₇²⁻ or H⁺/MnO₄⁻', 'no reaction', ['ketone', 'carboxylic acid', 'aldehyde'], { ...ONE, tip: 'No H on the carbon bonded to –OH.' }],
  ['esterification', PATH, 'carboxylic acid + alcohol (conc. H₂SO₄ catalyst, heat)', 'ester + water', ['ester + hydrogen', 'amide + water', 'ether + water'], { ...ONE, tip: 'Condensation (esterification).' }],
  ['acid-amine', PATH, 'carboxylic acid + primary amine', 'amide + water', ['ester + water', 'amine + CO₂', 'amide + hydrogen'], { ...ONE, tip: 'Condensation: the same link joins amino acids in proteins.' }],
  ['ester-hydrolysis', PATH, 'ester + water (acid catalyst, heat)', 'carboxylic acid + alcohol', ['two alcohols', 'two carboxylic acids', 'alkene + carboxylic acid'], { ...ONE, tip: 'Hydrolysis: the reverse of esterification.' }],
  ['ester-naoh', PATH, 'ester + NaOH(aq) (heat)', 'carboxylate salt + alcohol', ['carboxylic acid + sodium alkoxide', 'two alcohols', 'alkene + carboxylate salt'], { ...ONE, tip: 'Base hydrolysis gives the ion, not the acid.' }],
  ['transesterification', PATH, 'triglyceride + methanol (KOH catalyst)', 'methyl esters (biodiesel) + glycerol', ['fatty acids + glycerol', 'methyl esters (biodiesel) + water', 'glycerol + methane'], { ...ONE, tip: 'Transesterification. No water: it would hydrolyse the esters instead.' }],
  ['fat-hydrolysis', PATH, 'triglyceride + water (lipase)', 'glycerol + 3 fatty acids', ['glycerol + 3 methyl esters', 'glucose + 3 fatty acids', 'glycerol + 3 amino acids'], { ...ONE, tip: 'Hydrolysis of the three ester links.' }],
  ['acid-carbonate', PATH, 'carboxylic acid + NaHCO₃', 'salt + CO₂ + H₂O', ['salt + H₂', 'ester + H₂O', 'no reaction'], { ...ONE, tip: 'The fizz is the test for a carboxyl group.' }],

  // Reaction types
  ['substitution', TYPES, 'substitution', 'An atom or group in a molecule is replaced by a different atom or group.',
    ['Atoms add across a C=C double bond, leaving a single bond; one product.', 'Two molecules join, releasing a small molecule such as water.']],
  ['addition', TYPES, 'addition', 'Atoms add across a C=C double bond, leaving a single bond; one product.',
    ['An atom or group in a molecule is replaced by a different atom or group.', 'A large molecule is split by reaction with water.']],
  ['condensation', TYPES, 'condensation', 'Two molecules join, releasing a small molecule such as water.',
    ['A large molecule is split by reaction with water.', 'Atoms add across a C=C double bond, leaving a single bond; one product.'], { family: 'cond-hyd' }],
  ['hydrolysis', TYPES, 'hydrolysis', 'A large molecule is split by reaction with water.',
    ['Two molecules join, releasing a small molecule such as water.', 'An atom or group in a molecule is replaced by a different atom or group.'], { family: 'cond-hyd' }],
  ['oxidation', TYPES, 'oxidation (of an alcohol)', 'The carbon bonded to –OH loses H (and gains O), using an oxidising agent such as acidified dichromate.',
    ['Atoms add across a C=C double bond, leaving a single bond; one product.']],
  ['transester', TYPES, 'transesterification', 'An ester reacts with an alcohol, swapping its alkyl group to form a new ester.',
    ['A carboxylic acid and an alcohol react to form an ester and water.'], { family: 'ester' }],
  ['esterif', TYPES, 'esterification', 'A carboxylic acid and an alcohol react to form an ester and water.',
    ['An ester reacts with an alcohol, swapping its alkyl group to form a new ester.'], { family: 'ester' }],

  // Spot the type
  ['spot-hydration', SPOT, 'ethene + water → ethanol', 'addition', ['substitution', 'condensation', 'hydrolysis'], ONE],
  ['spot-halo-oh', SPOT, 'chloroethane + NaOH → ethanol + NaCl', 'substitution', ['addition', 'hydrolysis', 'condensation'], ONE],
  ['spot-ester', SPOT, 'ethanoic acid + ethanol → ethyl ethanoate + water', 'condensation', ['addition', 'hydrolysis', 'substitution'], ONE],
  ['spot-protein', SPOT, 'protein + water → amino acids', 'hydrolysis', ['condensation', 'substitution', 'addition'], ONE],
  ['spot-starch', SPOT, 'many glucose → starch + water', 'condensation', ['addition', 'hydrolysis', 'substitution'], ONE],
  ['spot-chlorination', SPOT, 'methane + Cl₂ → chloromethane + HCl', 'substitution', ['addition', 'condensation', 'hydrolysis'], ONE],
  ['spot-bromine', SPOT, 'propene + Br₂ → 1,2-dibromopropane', 'addition', ['substitution', 'condensation', 'hydrolysis'], ONE],
  ['spot-fat', SPOT, 'triglyceride + 3 water → glycerol + 3 fatty acids', 'hydrolysis', ['condensation', 'transesterification', 'substitution'], ONE],
  ['spot-biodiesel', SPOT, 'triglyceride + 3 methanol → glycerol + 3 methyl esters', 'transesterification', ['hydrolysis', 'condensation', 'substitution'], ONE],

  // Naming esters: the alcohol gives the first word, the acid the second.
  ['me-ethanoate', ESTERS, 'methanol + ethanoic acid', 'methyl ethanoate', ['ethyl methanoate', 'methyl ethanol', 'ethanoyl methane'], { family: 'ester-name' }],
  ['et-propanoate', ESTERS, 'ethanol + propanoic acid', 'ethyl propanoate', ['propyl ethanoate', 'ethyl propanol', 'propanoyl ethane'], { family: 'ester-name' }],
  ['pr-ethanoate', ESTERS, 'propan-1-ol + ethanoic acid', 'propyl ethanoate', ['ethyl propanoate', 'propyl ethanol', 'propanyl ethanoate'], { family: 'ester-name' }],
  ['bu-methanoate', ESTERS, 'butan-1-ol + methanoic acid', 'butyl methanoate', ['methyl butanoate', 'butyl methanol', 'butanyl methanoate'], { family: 'ester-name' }],
  ['et-butanoate', ESTERS, 'ethanol + butanoic acid', 'ethyl butanoate', ['butyl ethanoate', 'ethyl butanol', 'butanoyl ethane'], { family: 'ester-name' }],
  ['pe-ethanoate', ESTERS, 'pentan-1-ol + ethanoic acid', 'pentyl ethanoate', ['ethyl pentanoate', 'pentyl ethanol', 'pentanyl ethanoate'], { family: 'ester-name' }],
  ['me-propanoate', ESTERS, 'methanol + propanoic acid', 'methyl propanoate', ['propyl methanoate', 'methyl propanol', 'propanoyl methane'], { family: 'ester-name' }],
]

const ESTER_TIP = 'Alkyl from the alcohol first, then the acid with -oic acid → -oate.'

export const chemOrganicReactionsDeck: Deck = {
  id: 'chem-organic-reactions',
  title: 'Organic Reactions',
  blurb: 'Reagents and conditions for each pathway in the study design, the reaction types, and naming the ester an acid and alcohol make.',
  groups: [PATH, TYPES, SPOT, ESTERS],
  cards: rows.map(([id, group, front, back, traps, extra]) => ({
    id,
    group,
    front: typeable(front) ? { text: front, plain: front } : { text: front },
    back: typeable(back) ? { text: back, plain: back } : { text: back },
    traps: traps?.map(text => ({ text })),
    tip: group === ESTERS ? ESTER_TIP : undefined,
    ...extra,
  })),
  directionLabel: { fwd: 'Reactants → Product', rev: 'Product → Reactants' },
  promptLabel: { fwd: 'Recall', rev: 'Which is it?' },
  maxTraps: 3,
  source: 'VCE Chemistry Study Design Unit 4 AoS 1',
}
