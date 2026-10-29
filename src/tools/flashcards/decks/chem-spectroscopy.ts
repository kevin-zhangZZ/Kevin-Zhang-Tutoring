import type { Card, Deck, Face } from '../data'

// Unit 4 AoS 2: mass spectrometry, IR and NMR, read as data. The characteristic ranges are in
// Tables 21–23 of the Data Book; these cards are for recognising the common ones on sight.

const MS = 'Mass Spectrometry'
const IR = 'Infrared'
const NMR = 'NMR Principles'
const SPLIT = 'Splitting'
const SHIFT = 'Shifts to Recognise'

/** A short answer a student could type: plain words, three at most. */
const typeable = (s: string) => /^[A-Za-z0-9 '-]+$/.test(s) && s.trim().split(/\s+/).length <= 3

/** "tex:..." is maths; anything else is words. */
const face = (s: string): Face =>
  s.startsWith('tex:') ? { tex: s.slice(4) } : typeable(s) ? { text: s, plain: s } : { text: s }

/** A wavenumber or shift range as TeX. */
const cm = (lo: number, hi: number) => `tex:${lo}\\text{–}${hi}\\ \\mathrm{cm^{-1}}`
const ppm = (lo: number | string, hi: number | string) => `tex:${lo}\\text{–}${hi}\\ \\text{ppm}`
const ion = (f: string) => `tex:\\mathrm{${f}^+}`

/** [id, group, front, back, traps, extra] */
type Row = [string, string, string, string, string[]?, Partial<Card>?]

const DB21 = 'Data Book Table 21.'
const DB22 = 'Data Book Table 22 (¹³C).'
const DB23 = 'Data Book Table 23 (¹H).'

const rows: Row[] = [
  // Mass spectrometry
  ['m-plus', MS, 'molecular ion peak', 'The peak from the whole molecule minus one electron (M⁺): its m/z gives the molecular mass.',
    ['The tallest peak in the spectrum, set to 100% abundance.', 'A peak from a piece of the molecule that has broken off.'], { family: 'ms-peak', tip: 'Usually the significant peak with the highest m/z.' }],
  ['base-peak', MS, 'base peak', 'The tallest peak in the spectrum (the most abundant ion), set to 100% relative abundance.',
    ['The peak from the whole molecule minus one electron: its m/z gives the molecular mass.', 'A peak from a piece of the molecule that has broken off.'], { family: 'ms-peak' }],
  ['fragment', MS, 'fragment ion', 'A positive ion from a piece of the molecular ion that has broken off; it appears at a lower m/z.',
    ['The tallest peak in the spectrum, set to 100% abundance.', 'The peak from the whole molecule minus one electron.'], { family: 'ms-peak' }],
  ['mz', MS, 'm/z', 'Mass-to-charge ratio; for a 1+ ion it equals the ion’s mass.'],
  ['m-15', MS, 'tex:m/z = 15', ion('CH_3'), [ion('OH'), ion('C_2H_5'), ion('NH_2')], { ask: 'common fragment', family: 'frag' }],
  ['m-17', MS, 'tex:m/z = 17', ion('OH'), [ion('CH_3'), ion('NH_2'), ion('H_2O')], { ask: 'common fragment', family: 'frag' }],
  ['m-29', MS, 'tex:m/z = 29', ion('C_2H_5'), [ion('CH_3'), ion('C_3H_7'), ion('COOH')], { ask: 'common fragment', family: 'frag', tip: 'CHO⁺ also has m/z 29.' }],
  ['m-43', MS, 'tex:m/z = 43', ion('C_3H_7'), [ion('C_2H_5'), ion('COOH'), ion('C_4H_9')], { ask: 'common fragment', family: 'frag', tip: 'CH₃CO⁺ also has m/z 43.' }],
  ['m-45', MS, 'tex:m/z = 45', ion('COOH'), [ion('C_2H_5'), ion('CH_2OH'), ion('C_3H_7')], { ask: 'common fragment', family: 'frag' }],
  ['m-31', MS, 'tex:m/z = 31', ion('CH_2OH'), [ion('CH_3'), ion('COOH'), ion('C_2H_5')], { ask: 'common fragment', family: 'frag', tip: 'A sign of a primary alcohol.' }],

  // Infrared
  ['ir-what', IR, 'What IR spectroscopy identifies', 'The types of bonds (functional groups) present, from absorptions at characteristic wavenumbers.',
    ['The number of carbon environments.', 'The molecular mass.', 'The number of neighbouring hydrogens.'], { family: 'technique', oneWay: true }],
  ['fingerprint', IR, 'fingerprint region', 'The region below about 1500 cm⁻¹: a complex pattern unique to each compound, matched against known spectra.'],
  ['ir-oh-acid', IR, 'O–H (acids)', cm(2500, 3500), [cm(3200, 3600), cm(3300, 3500), cm(2850, 3090)], { family: 'ir', tip: `Very broad, often overlapping C–H. ${DB21}` }],
  ['ir-oh-alc', IR, 'O–H (alcohols)', cm(3200, 3600), [cm(2500, 3500), cm(3300, 3500), cm(1680, 1740)], { family: 'ir', tip: `Broad. ${DB21}` }],
  ['ir-nh', IR, 'N–H (amines and amides)', cm(3300, 3500), [cm(3200, 3600), cm(2500, 3500), cm(2850, 3090)], { family: 'ir', tip: DB21 }],
  ['ir-ch', IR, 'C–H', cm(2850, 3090), [cm(3300, 3500), cm(2500, 3500), cm(1720, 1750)], { family: 'ir', tip: `Almost every organic compound has it. ${DB21}` }],
  ['ir-co', IR, 'C=O (any carbonyl)', cm(1630, 1750), [cm(2850, 3090), cm(2500, 3500), cm(3200, 3600)], { family: 'ir', tip: `Sharp and strong. Esters sit highest (1720–1750), amides lowest (1630–1680). ${DB21}` }],
  ['ir-acid', IR, 'IR signature of a carboxylic acid', 'A very broad O–H at 2500–3500 cm⁻¹ plus a sharp C=O near 1700 cm⁻¹',
    ['A broad O–H at 3200–3600 cm⁻¹ and no C=O', 'A sharp C=O near 1740 cm⁻¹ and no O–H'], { family: 'ir-sig', oneWay: true }],
  ['ir-alcohol', IR, 'IR signature of an alcohol', 'A broad O–H at 3200–3600 cm⁻¹ and no C=O',
    ['A very broad O–H at 2500–3500 cm⁻¹ plus a sharp C=O near 1700 cm⁻¹', 'A sharp C=O near 1740 cm⁻¹ and no O–H'], { family: 'ir-sig', oneWay: true }],
  ['ir-ester', IR, 'IR signature of an ester', 'A sharp C=O near 1720–1750 cm⁻¹ and no O–H',
    ['A very broad O–H at 2500–3500 cm⁻¹ plus a sharp C=O near 1700 cm⁻¹', 'A broad O–H at 3200–3600 cm⁻¹ and no C=O'], { family: 'ir-sig', oneWay: true }],

  // NMR principles
  ['shift', NMR, 'chemical shift', 'Where a peak sits (in ppm) relative to TMS; it shows the chemical environment of the C or H.'],
  ['tms', NMR, 'TMS', 'Tetramethylsilane, Si(CH₃)₄: the reference compound set at 0 ppm.'],
  ['why-tms', NMR, 'Why TMS is the NMR reference', 'Its 12 equivalent H (and 4 C) give one strong signal away from most others; it is also inert and volatile.',
    ['It has many different environments to calibrate against.', 'It absorbs IR strongly.'], { oneWay: true }],
  ['c13-peaks', NMR, 'What the number of peaks in a ¹³C NMR spectrum shows', 'The number of different carbon environments',
    ['The number of carbon atoms', 'The number of neighbouring hydrogens', 'The number of different hydrogen environments'], { family: 'nmr-count', oneWay: true }],
  ['h1-peaks', NMR, 'What the number of peak sets in a ¹H NMR spectrum shows', 'The number of different hydrogen environments',
    ['The number of hydrogen atoms', 'The number of neighbouring hydrogens', 'The number of different carbon environments'], { family: 'nmr-count', oneWay: true }],
  ['integration', NMR, 'What the relative peak areas (integration) in ¹H NMR show', 'The ratio of hydrogen atoms in each environment',
    ['The number of neighbouring hydrogens', 'The number of carbon environments', 'The mass of each fragment'], { family: 'nmr-count', oneWay: true, tip: 'The integration curve’s step height is proportional to the area under the peak.' }],
  ['low-res', NMR, 'low resolution ¹H NMR', 'One peak per hydrogen environment, with no splitting.',
    ['Each environment’s peak is split into n + 1 lines.'], { family: 'res' }],
  ['high-res', NMR, 'high resolution ¹H NMR', 'Each environment’s peak is split into n + 1 lines by neighbouring hydrogens.',
    ['One peak per hydrogen environment, with no splitting.'], { family: 'res' }],
  ['c13-split', NMR, 'Splitting in a VCE ¹³C NMR spectrum', 'None: each carbon environment gives a single peak.',
    ['Each peak is split by the number of neighbouring carbons plus one.', 'Each peak is split by the attached hydrogens plus one.'], { oneWay: true }],

  // Splitting
  ['n-plus-1', SPLIT, 'the n + 1 rule', 'A ¹H signal is split into n + 1 peaks, where n is the number of H on neighbouring carbons.',
    ['A ¹H signal is split into n + 1 peaks, where n is the number of H in that environment.', 'A ¹³C signal is split into n + 1 peaks, where n is the number of attached H.'],
    { gap: { tex: '\\text{peaks} = n + \\gap', answers: ['1'] } }],
  ['singlet', SPLIT, 'singlet', '0 neighbouring H', ['1 neighbouring H', '2 neighbouring H'], { family: 'mult', back: { text: '0 neighbouring H', plain: '0' } }],
  ['doublet', SPLIT, 'doublet', '1 neighbouring H', ['2 neighbouring H', '0 neighbouring H'], { family: 'mult', back: { text: '1 neighbouring H', plain: '1' } }],
  ['triplet', SPLIT, 'triplet', '2 neighbouring H', ['3 neighbouring H', '1 neighbouring H'], { family: 'mult', back: { text: '2 neighbouring H', plain: '2' } }],
  ['quartet', SPLIT, 'quartet', '3 neighbouring H', ['4 neighbouring H', '2 neighbouring H'], { family: 'mult', back: { text: '3 neighbouring H', plain: '3' } }],
  ['ethyl', SPLIT, 'A quartet (2H) and a triplet (3H)', 'An ethyl group, CH₃CH₂–', ['An isopropyl group, (CH₃)₂CH–', 'Two separate CH₃ groups'], { oneWay: true }],
  ['isopropyl', SPLIT, 'A doublet (6H) and a septet (1H)', 'An isopropyl group, (CH₃)₂CH–', ['An ethyl group, CH₃CH₂–', 'A propyl group, CH₃CH₂CH₂–'], { oneWay: true }],
  ['oh-singlet', SPLIT, 'How the –OH proton usually appears in ¹H NMR', 'A singlet: it neither splits nor is split by neighbours.',
    ['A doublet, split by the carbon’s H.', 'It doesn’t appear at all.'], { oneWay: true }],

  // Shifts worth recognising (Data Book Tables 22–23)
  ['c-ketone', SHIFT, '¹³C: ketone C=O', ppm(205, 220), [ppm(190, 200), ppm(160, 185), ppm(110, 150)], { family: 'c13', tip: DB22 }],
  ['c-aldehyde', SHIFT, '¹³C: aldehyde C=O', ppm(190, 200), [ppm(205, 220), ppm(165, 175), ppm(50, 90)], { family: 'c13', tip: DB22 }],
  ['c-acid', SHIFT, '¹³C: carboxylic acid C=O', ppm(160, 185), [ppm(205, 220), ppm(190, 200), ppm(110, 150)], { family: 'c13', tip: `Esters 165–175, amides 165–185. ${DB22}` }],
  ['c-alkene', SHIFT, '¹³C: C=C (alkenes and arenes)', ppm(110, 150), [ppm(160, 185), ppm(50, 90), ppm(8, 25)], { family: 'c13', tip: DB22 }],
  ['c-oh', SHIFT, '¹³C: carbon bonded to –OH', ppm(50, 90), [ppm(8, 25), ppm(110, 150), ppm(160, 185)], { family: 'c13', tip: DB22 }],
  ['h-acid', SHIFT, '¹H: –COOH', ppm('9.0', '13.0'), [ppm('9.4', '10.0'), ppm('0.9', '1.0'), ppm('4.5', '7.0')], { family: 'h1', tip: DB23 }],
  ['h-aldehyde', SHIFT, '¹H: –CHO', ppm('9.4', '10.0'), [ppm('9.0', '13.0'), ppm('2.1', '2.7'), ppm('4.5', '7.0')], { family: 'h1', tip: DB23 }],
  ['h-ch3', SHIFT, '¹H: R–CH₃', ppm('0.9', '1.0'), [ppm('3.3', '4.5'), ppm('2.1', '2.7'), ppm('9.0', '13.0')], { family: 'h1', tip: DB23 }],
  ['h-alkene', SHIFT, '¹H: RHC=CHR', ppm('4.5', '7.0'), [ppm('0.9', '1.0'), ppm('9.4', '10.0'), ppm('3.3', '4.5')], { family: 'h1', tip: DB23 }],
]

export const chemSpectroscopyDeck: Deck = {
  id: 'chem-spectroscopy',
  title: 'Spectroscopy',
  blurb: 'Mass spectra, IR bands and NMR environments, splitting and shifts, for reading instrumental data at a glance.',
  groups: [MS, IR, NMR, SPLIT, SHIFT],
  cards: rows.map(([id, group, front, back, traps, extra]) => ({
    id,
    group,
    front: face(front),
    back: face(back),
    traps: traps?.map(face),
    ...extra,
  })),
  directionLabel: { fwd: 'Feature → Meaning', rev: 'Meaning → Feature' },
  promptLabel: { fwd: 'Recall', rev: 'Which is it?' },
  maxTraps: 3,
  source: 'VCE Chemistry Study Design Unit 4 AoS 2; Tables 21–23, 2026 Data Book',
}
