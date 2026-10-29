import type { Card, Deck, Face } from '../data'

// Unit 4 AoS 1: the organic families in the study design, their functional groups, the IUPAC
// suffixes and prefixes (Data Book Table 17), classes of alcohol and the physical-property trends.

const GROUPS = 'Functional Groups'
const NAMING = 'Suffixes & Prefixes'
const CLASSES = 'Classes & Terms'
const PROPS = 'Properties'

/** A short answer a student could type: plain words, three at most. */
const typeable = (s: string) => /^[A-Za-z0-9 '-]+$/.test(s) && s.trim().split(/\s+/).length <= 3

/** "tex:..." is maths; anything else is words. */
const face = (s: string): Face =>
  s.startsWith('tex:') ? { tex: s.slice(4) } : typeable(s) ? { text: s, plain: s } : { text: s }

const m = (s: string) => `tex:\\mathrm{${s}}`

/** [id, group, front, back, traps, extra] */
type Row = [string, string, string, string, string[]?, Partial<Card>?]

const FG = { ask: 'functional group', family: 'fg' }
const SUFFIX = { ask: 'name suffix', family: 'suffix' }
const PREFIX = { ask: 'name prefix', family: 'prefix' }
const DB17 = 'Data Book Table 17.'

const rows: Row[] = [
  // Functional groups
  ['fg-acid', GROUPS, 'carboxylic acid', m('-COOH'), [m('-COOR'), m('-CHO'), m('-OH')], FG],
  ['fg-ester', GROUPS, 'ester', m('-COOR'), [m('-COOH'), m('-CO-'), m('-CONH_2')], { ...FG, tip: 'R is an alkyl group: the part that came from the alcohol.' }],
  ['fg-aldehyde', GROUPS, 'aldehyde', m('-CHO'), [m('-CO-'), m('-COOH'), m('-OH')], { ...FG, tip: 'C=O at the end of the chain.' }],
  ['fg-ketone', GROUPS, 'ketone', m('-CO-'), [m('-CHO'), m('-COOR'), m('-COOH')], { ...FG, tip: 'C=O inside the chain, with a carbon on each side.' }],
  ['fg-alcohol', GROUPS, 'alcohol', m('-OH'), [m('-COOH'), m('-CHO'), m('-NH_2')], { ...FG, tip: 'The hydroxyl group.' }],
  ['fg-amine', GROUPS, 'primary amine', m('-NH_2'), [m('-CONH_2'), m('-OH'), m('-NO_2')], FG],
  ['fg-amide', GROUPS, 'primary amide', m('-CONH_2'), [m('-NH_2'), m('-COOR'), m('-COOH')], FG],
  ['fg-alkene', GROUPS, 'alkene', m('>C{=}C<'), [m('-C{\\equiv}C-'), m('>C{=}O'), m('-C{-}C-')], { ...FG, tip: 'Unsaturated: at least one carbon–carbon double bond.' }],
  ['fg-halo', GROUPS, 'haloalkane', 'tex:\\mathrm{-X}\\ (\\mathrm{X = F, Cl, Br, I})', [m('-OH'), m('-NH_2')], FG],
  ['fg-alkane', GROUPS, 'alkane', 'Only C–C and C–H single bonds', ['At least one C=C double bond', 'A ring of six carbons with delocalised electrons'], FG],
  ['fg-benzene', GROUPS, 'benzene', 'A ring of six carbons (C₆H₆) with delocalised electrons', ['A ring of six carbons (C₆H₁₂) with only single bonds', 'At least one C=C double bond'], FG],
  ['fg-cyclohexane', GROUPS, 'cyclohexane', 'A ring of six carbons (C₆H₁₂) with only single bonds', ['A ring of six carbons (C₆H₆) with delocalised electrons'], FG],

  // Suffixes and prefixes
  ['sfx-acid', NAMING, 'carboxylic acid', '-oic acid', ['-oate', '-al', '-ol'], { ...SUFFIX, tip: DB17 }],
  ['sfx-ester', NAMING, 'ester', 'alkyl …-oate', ['-oic acid', '-one', '…-oyl alkane'], { ...SUFFIX, tip: 'Alcohol part first, acid part second: ethyl ethanoate.' }],
  ['sfx-aldehyde', NAMING, 'aldehyde', '-al', ['-one', '-ol', '-oic acid'], { ...SUFFIX, tip: 'Always on carbon 1, so no number is needed.' }],
  ['sfx-ketone', NAMING, 'ketone', '-one', ['-al', '-ol', '-ene'], { ...SUFFIX, tip: DB17 }],
  ['sfx-alcohol', NAMING, 'alcohol', '-ol', ['-al', '-one', '-ene'], { ...SUFFIX, tip: DB17 }],
  ['sfx-amine', NAMING, 'primary amine', '-amine', ['-amide', '-ol', 'amino-'], { ...SUFFIX, tip: DB17 }],
  ['sfx-alkene', NAMING, 'alkene', '-ene', ['-ane', '-yne', '-ol'], { ...SUFFIX, tip: DB17 }],
  ['sfx-alkane', NAMING, 'alkane', '-ane', ['-ene', '-yl', '-one'], { ...SUFFIX }],
  ['pfx-hydroxy', NAMING, 'alcohol', 'hydroxy-', ['amino-', 'oxo-', '-ol'], { ...PREFIX, tip: 'Used when a higher-priority group takes the suffix, e.g. 2-hydroxypropanoic acid.' }],
  ['pfx-amino', NAMING, 'primary amine', 'amino-', ['hydroxy-', 'amido-', '-amine'], { ...PREFIX, tip: 'e.g. 2-aminopropanoic acid (alanine).' }],
  ['pfx-halo', NAMING, 'haloalkane', 'fluoro-, chloro-, bromo-, iodo-', ['hydroxy-', 'methyl-, ethyl-, propyl-'], { ...PREFIX, tip: 'Halogens are always prefixes; they never take the suffix.' }],
  ['pfx-alkyl', NAMING, 'alkyl side chain', 'methyl-, ethyl-, propyl-, …', ['fluoro-, chloro-, bromo-, iodo-', 'hydroxy-'], { ...PREFIX }],

  // Classes and terms
  ['priority', CLASSES, 'IUPAC priority order of VCE functional groups, highest first', 'acid > ester > aldehyde > ketone > alcohol > amine > alkene',
    ['ester > acid > ketone > aldehyde > alcohol > amine > alkene', 'acid > ester > ketone > aldehyde > amine > alcohol > alkene', 'alcohol > acid > ester > aldehyde > ketone > amine > alkene'],
    { oneWay: true, tip: 'The highest-priority group gives the suffix; the rest become prefixes (Data Book Table 17).' }],
  ['suffix-rule', CLASSES, 'Which functional group gives a molecule its suffix', 'The one with the highest priority', ['The one nearest carbon 1', 'The one that appears most often'], { oneWay: true }],
  ['primary-oh', CLASSES, 'primary alcohol', 'The carbon bonded to –OH is bonded to at most one other carbon.',
    ['The carbon bonded to –OH is bonded to two other carbons.', 'The carbon bonded to –OH is bonded to three other carbons.'], { family: 'oh-class' }],
  ['secondary-oh', CLASSES, 'secondary alcohol', 'The carbon bonded to –OH is bonded to two other carbons.',
    ['The carbon bonded to –OH is bonded to at most one other carbon.', 'The carbon bonded to –OH is bonded to three other carbons.'], { family: 'oh-class', tip: 'e.g. propan-2-ol.' }],
  ['tertiary-oh', CLASSES, 'tertiary alcohol', 'The carbon bonded to –OH is bonded to three other carbons.',
    ['The carbon bonded to –OH is bonded to two other carbons.', 'The carbon bonded to –OH is bonded to at most one other carbon.'], { family: 'oh-class', tip: 'e.g. 2-methylpropan-2-ol.' }],
  ['homologous', CLASSES, 'homologous series', 'A family with the same functional group and general formula, each member differing by CH₂.',
    ['Molecules with the same molecular formula but different structures.']],
  ['isomers', CLASSES, 'structural isomers', 'Compounds with the same molecular formula but a different arrangement of atoms.',
    ['A family with the same functional group and general formula, each member differing by CH₂.', 'Mirror-image molecules that can’t be superimposed.']],
  ['saturated', CLASSES, 'saturated', 'Contains only carbon–carbon single bonds.', ['Contains at least one carbon–carbon double bond.'], { family: 'sat' }],
  ['unsaturated', CLASSES, 'unsaturated', 'Contains at least one carbon–carbon double (or triple) bond.', ['Contains only carbon–carbon single bonds.'], { family: 'sat' }],
  ['alkane-formula', CLASSES, 'General formula of the alkanes', 'tex:\\mathrm{C}_n\\mathrm{H}_{2n+2}', ['tex:\\mathrm{C}_n\\mathrm{H}_{2n}', 'tex:\\mathrm{C}_n\\mathrm{H}_{2n-2}'], { family: 'gen' }],
  ['alkene-formula', CLASSES, 'General formula of the alkenes (one C=C)', 'tex:\\mathrm{C}_n\\mathrm{H}_{2n}', ['tex:\\mathrm{C}_n\\mathrm{H}_{2n+2}', 'tex:\\mathrm{C}_n\\mathrm{H}_{2n-2}'], { family: 'gen' }],
  ['carbon-diversity', CLASSES, 'Why carbon forms so many compounds', 'Four valence electrons form four strong covalent bonds, including stable C–C chains, rings and multiple bonds.',
    ['It has a full outer shell, so it is unreactive.', 'It forms ionic bonds with most elements.'], { oneWay: true }],

  // Physical properties
  ['bp-chain', PROPS, 'Effect of a longer carbon chain on boiling point', 'Higher: stronger dispersion forces between the larger molecules.',
    ['Lower: weaker dispersion forces between the larger molecules.', 'Higher: more hydrogen bonding.'], { family: 'bp', oneWay: true }],
  ['bp-branch', PROPS, 'Effect of branching on boiling point', 'Lower: less contact between molecules, so weaker dispersion forces.',
    ['Higher: more contact between molecules, so stronger dispersion forces.', 'No effect: the molar mass is unchanged.'], { family: 'bp', oneWay: true }],
  ['bp-alcohol', PROPS, 'Why alcohols boil higher than alkanes of similar mass', 'Hydrogen bonding between –OH groups, as well as dispersion forces.',
    ['Alcohols have stronger covalent bonds.', 'Alkanes have more dispersion forces.'], { family: 'bp', oneWay: true }],
  ['bp-acid', PROPS, 'Why carboxylic acids boil higher than alcohols of similar mass', 'The –COOH group forms more (and stronger) hydrogen bonds between molecules.',
    ['Carboxylic acids have more dispersion forces.', 'Carboxylic acids are ionic.'], { family: 'bp', oneWay: true }],
  ['bp-ester', PROPS, 'Why esters boil lower than carboxylic acids of similar mass', 'Esters have no O–H, so can’t hydrogen bond with each other.',
    ['Esters have weaker covalent bonds.', 'Esters are smaller molecules.'], { family: 'bp', oneWay: true }],
  ['viscosity', PROPS, 'Effect of a longer carbon chain on viscosity', 'Higher: stronger dispersion forces and more tangling between chains.',
    ['Lower: the molecules move more freely.', 'No effect.'], { oneWay: true }],
  ['solubility', PROPS, 'Effect of a longer carbon chain on solubility in water (e.g. alcohols)', 'Lower: the larger non-polar chain outweighs the polar functional group.',
    ['Higher: more hydrogen bonds with water.', 'No effect.'], { oneWay: true }],
]

export const chemOrganicFamiliesDeck: Deck = {
  id: 'chem-organic-families',
  title: 'Organic Families',
  blurb: 'Functional groups, IUPAC suffixes and prefixes, priority order, classes of alcohol and boiling-point trends.',
  groups: [GROUPS, NAMING, CLASSES, PROPS],
  cards: rows.map(([id, group, front, back, traps, extra]) => ({
    id,
    group,
    front: face(front),
    back: face(back),
    traps: traps?.map(face),
    ...extra,
  })),
  directionLabel: { fwd: 'Family → Feature', rev: 'Feature → Family' },
  promptLabel: { fwd: 'Recall', rev: 'Which is it?' },
  maxTraps: 3,
  source: 'VCE Chemistry Study Design Unit 4 AoS 1; Tables 16–17, 2026 Data Book',
}
