import type { Card, Deck } from '../data'

// Unit 4 AoS 1–2: proteins and enzymes, carbohydrates, fats and oils, and how medicines work.
// (Coenzymes, induced fit, vitamins and glycaemic index left the study design in 2024.)

const PROT = 'Proteins'
const ENZ = 'Enzymes'
const CARB = 'Carbohydrates'
const FATS = 'Fats & Oils'
const MED = 'Medicines'

/** A short answer a student could type: plain words, three at most. */
const typeable = (s: string) => /^[A-Za-z0-9 '-]+$/.test(s) && s.trim().split(/\s+/).length <= 3

/** [id, group, front, back, traps, extra] */
type Row = [string, string, string, string, string[]?, Partial<Card>?]

const LEVELS = [
  'The sequence of amino acids, held by covalent peptide (amide) bonds.',
  'Folding of the backbone into α-helices and β-pleated sheets, held by hydrogen bonds between C=O and N–H groups.',
  'The overall 3D shape, from bonds between Z groups: hydrogen bonds, ionic bonds, disulfide bridges and dispersion forces.',
  'Two or more polypeptide chains held together as one functional protein.',
]
const others = (i: number) => LEVELS.filter((_, j) => j !== i)

const rows: Row[] = [
  // Proteins
  ['amino-acid', PROT, '2-amino acid', 'A molecule with an amino group and a carboxyl group on the same carbon (C2), plus a side chain (Z group).',
    ['A long-chain carboxylic acid.', 'A molecule with an amino group on each end of the chain.'], { tip: 'Structures of all 20 are in Data Book Table 19.' }],
  ['zwitterion', PROT, 'zwitterion', 'An amino acid with –NH₃⁺ and –COO⁻ groups: charged ends but no overall charge.',
    ['An amino acid with –NH₃⁺ and –COOH groups: an overall positive charge.', 'An amino acid with –NH₂ and –COO⁻ groups: an overall negative charge.']],
  ['aa-acid', PROT, 'An amino acid in strongly acidic solution', 'The –NH₂ gains H⁺ (–NH₃⁺) and –COOH stays: overall positive.',
    ['The –COOH loses H⁺ (–COO⁻) and –NH₂ stays: overall negative.', 'It forms a zwitterion with no overall charge.'], { family: 'aa-ph', oneWay: true }],
  ['aa-base', PROT, 'An amino acid in strongly basic solution', 'The –COOH loses H⁺ (–COO⁻) and –NH₂ stays: overall negative.',
    ['The –NH₂ gains H⁺ (–NH₃⁺) and –COOH stays: overall positive.', 'It forms a zwitterion with no overall charge.'], { family: 'aa-ph', oneWay: true }],
  ['peptide-bond', PROT, 'peptide bond', 'The –CONH– (amide) link formed by condensation of one amino acid’s –COOH with another’s –NH₂.',
    ['The C–O–C link formed by condensation of two sugar –OH groups.', 'The –COO– link formed by condensation of an acid and an alcohol.'], { family: 'link' }],
  ['polypeptide', PROT, 'polypeptide', 'A chain of many amino acids joined by peptide bonds.'],
  ['primary', PROT, 'primary structure', LEVELS[0], others(0), { family: 'level' }],
  ['secondary', PROT, 'secondary structure', LEVELS[1], others(1), { family: 'level' }],
  ['tertiary', PROT, 'tertiary structure', LEVELS[2], others(2), { family: 'level' }],
  ['quaternary', PROT, 'quaternary structure', LEVELS[3], others(3), { family: 'level' }],
  ['disulfide', PROT, 'disulfide bridge', 'A covalent S–S bond between the side chains of two cysteine residues.',
    ['A hydrogen bond between two serine side chains.', 'An ionic bond between two lysine side chains.']],
  ['protein-hydrolysis', PROT, 'Products of protein hydrolysis', 'amino acids', ['glucose', 'fatty acids', 'glycerol'], { oneWay: true }],

  // Enzymes
  ['enzyme', ENZ, 'enzyme', 'A protein that acts as a biological catalyst.', ['A carbohydrate that stores energy.', 'A molecule that blocks a catalyst.']],
  ['active-site', ENZ, 'active site', 'The region of an enzyme, with a specific shape, where the substrate binds.',
    ['The molecule an enzyme acts on.']],
  ['substrate', ENZ, 'substrate', 'The molecule an enzyme acts on.', ['The region of an enzyme where the substrate binds.']],
  ['lock-key', ENZ, 'lock-and-key model', 'Only a substrate with a shape complementary to the active site can bind, as only one key fits a lock.'],
  ['denaturation', ENZ, 'denaturation', 'Loss of the protein’s secondary and tertiary (and quaternary) structure, so the active site changes shape and stops working.',
    ['Breaking the peptide bonds, so the primary structure is lost.', 'A temporary, reversible slowing of an enzyme at low temperature.'], { tip: 'The primary structure stays. VCE treats denaturation as irreversible.' }],
  ['high-t', ENZ, 'Effect on an enzyme of a temperature well above its optimum', 'Denaturation: bonds holding the tertiary structure break and the active site changes shape.',
    ['Lowered activity: fewer successful collisions, but the shape is unchanged.', 'No effect: enzymes are catalysts.'], { family: 'enz-cond', oneWay: true }],
  ['low-t', ENZ, 'Effect on an enzyme of a temperature below its optimum', 'Lowered activity: fewer successful collisions, but the shape is unchanged.',
    ['Denaturation: bonds holding the tertiary structure break and the active site changes shape.', 'The peptide bonds break.'], { family: 'enz-cond', oneWay: true }],
  ['ph', ENZ, 'Effect on an enzyme of a pH far from its optimum', 'Z groups gain or lose H⁺, disrupting ionic and hydrogen bonds; the enzyme can denature.',
    ['The peptide bonds are hydrolysed instantly.', 'Lowered activity only: the shape is unchanged.'], { family: 'enz-cond', oneWay: true }],

  // Carbohydrates
  ['mono', CARB, 'monosaccharide', 'A single sugar unit, e.g. glucose, fructose or galactose (C₆H₁₂O₆).',
    ['Two sugar units joined by a glycosidic link.', 'Many sugar units joined by condensation polymerisation.'], { family: 'saccharide' }],
  ['di', CARB, 'disaccharide', 'Two sugar units joined by a glycosidic link, e.g. sucrose, maltose, lactose.',
    ['A single sugar unit, e.g. glucose, fructose or galactose.', 'Many sugar units joined by condensation polymerisation.'], { family: 'saccharide' }],
  ['poly', CARB, 'polysaccharide', 'Many sugar units joined by condensation polymerisation, e.g. starch, glycogen.',
    ['Two sugar units joined by a glycosidic link.', 'A single sugar unit, e.g. glucose, fructose or galactose.'], { family: 'saccharide' }],
  ['glycosidic', CARB, 'glycosidic link', 'The C–O–C link between sugar units, formed by condensation of two –OH groups.',
    ['The –CONH– (amide) link formed by condensation of an acid and an amine.', 'The –COO– link formed by condensation of an acid and an alcohol.'], { family: 'link' }],
  ['starch', CARB, 'starch', 'The energy-storage polysaccharide in plants: α-glucose as amylose and amylopectin.',
    ['The highly branched energy-storage polymer of α-glucose in animals.'], { family: 'store' }],
  ['amylose', CARB, 'amylose', 'The unbranched (coiling) form of starch.', ['The branched form of starch.'], { family: 'starch-form' }],
  ['amylopectin', CARB, 'amylopectin', 'The branched form of starch.', ['The unbranched (coiling) form of starch.'], { family: 'starch-form' }],
  ['glycogen', CARB, 'glycogen', 'The highly branched energy-storage polymer of α-glucose in animals, stored in the liver and muscles.',
    ['The energy-storage polysaccharide in plants: α-glucose as amylose and amylopectin.'], { family: 'store' }],
  ['carb-hydrolysis', CARB, 'Product of hydrolysing starch or glycogen completely', 'glucose', ['fructose', 'amino acids', 'glycerol'], { oneWay: true }],

  // Fats and oils
  ['triglyceride', FATS, 'triglyceride', 'A tri-ester formed by condensation of glycerol with three fatty acids.',
    ['A polymer of glucose.', 'An ester of methanol and one fatty acid.']],
  ['glycerol', FATS, 'glycerol', 'Propane-1,2,3-triol: the alcohol with three –OH groups in every fat and oil.', ['Propan-2-ol: a secondary alcohol.']],
  ['fatty-acid', FATS, 'fatty acid', 'A long-chain carboxylic acid.', ['A 2-amino acid with a long side chain.', 'A long-chain alcohol.'], { tip: 'Data Book Table 18 lists common ones.' }],
  ['ester-link', FATS, 'ester link', 'The –COO– link formed by condensation of an acid and an alcohol (three in a triglyceride).',
    ['The C–O–C link formed by condensation of two sugar –OH groups.', 'The –CONH– (amide) link formed by condensation of an acid and an amine.'], { family: 'link' }],
  ['oil-liquid', FATS, 'Why oils are liquid but fats solid at room temperature', 'Oils have more C=C double bonds, whose kinks stop the chains packing closely, so dispersion forces are weaker.',
    ['Oils have longer chains, so dispersion forces are stronger.', 'Oils hydrogen bond with each other.'], { oneWay: true }],
  ['iodine', FATS, 'What a higher iodine number shows', 'More C=C double bonds: a more unsaturated fat or oil.',
    ['Fewer C=C double bonds: a more saturated fat or oil.', 'A longer carbon chain.'], { oneWay: true, tip: 'Iodine adds across each C=C; 1 mol I₂ per mol C=C.' }],

  // Medicines
  ['chiral', MED, 'chiral centre', 'A carbon atom bonded to four different groups.',
    ['A carbon atom bonded to four identical groups.', 'A carbon atom with a double bond.']],
  ['enantiomers', MED, 'optical isomers (enantiomers)', 'Non-superimposable mirror-image forms of a molecule with a chiral centre.',
    ['Compounds with the same molecular formula but a different arrangement of atoms.']],
  ['one-enantiomer', MED, 'Why often only one enantiomer of a medicine works', 'Only one has the 3D shape that fits the target’s active site.',
    ['The other enantiomer has a different molecular formula.', 'The other enantiomer is not soluble in water.'], { oneWay: true, tip: 'Thalidomide: one form sedated, the other caused birth defects.' }],
  ['competitive', MED, 'competitive inhibitor', 'A molecule shaped like the substrate that binds to the active site, blocking the substrate from binding.',
    ['A molecule that denatures the enzyme by changing its pH.', 'A molecule that speeds up an enzyme.']],
  ['extraction', MED, 'solvent extraction', 'Separating a compound from a mixture (e.g. plant material) by dissolving it in a solvent it is more soluble in.'],
]

export const chemBiomoleculesDeck: Deck = {
  id: 'chem-biomolecules',
  title: 'Biomolecules & Medicines',
  blurb: 'Amino acids and protein structure, enzymes, carbohydrates, fats and oils, chiral medicines and competitive inhibitors.',
  groups: [PROT, ENZ, CARB, FATS, MED],
  cards: rows.map(([id, group, front, back, traps, extra]) => ({
    id,
    group,
    front: typeable(front) ? { text: front, plain: front } : { text: front },
    back: typeable(back) ? { text: back, plain: back } : { text: back },
    traps: traps?.map(text => ({ text })),
    ...extra,
  })),
  directionLabel: { fwd: 'Term → Meaning', rev: 'Meaning → Term' },
  promptLabel: { fwd: 'Recall', rev: 'Which term?' },
  maxTraps: 2,
  source: 'VCE Chemistry Study Design Unit 4 AoS 1–2; Tables 18–20, 2026 Data Book',
}
