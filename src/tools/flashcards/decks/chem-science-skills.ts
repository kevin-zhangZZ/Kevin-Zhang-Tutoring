import type { Card, Deck } from '../data'

// The key science skills: measurement quality, errors, variables and evidence. Examined in both
// exam papers and needed for the Unit 4 poster.

const QUALITY = 'Measurement Quality'
const ERRORS = 'Errors & Uncertainty'
const DESIGN = 'Investigation Design'
const DATA = 'Data & Evidence'

/** A short answer a student could type: plain words, three at most. */
const typeable = (s: string) => /^[A-Za-z0-9 '-]+$/.test(s) && s.trim().split(/\s+/).length <= 3

/** [id, group, front, back, traps, extra] */
type Row = [string, string, string, string, string[]?, Partial<Card>?]

const rows: Row[] = [
  // Measurement quality
  ['accuracy', QUALITY, 'accuracy', 'How close a measurement is to the true (accepted) value.',
    ['How close repeated measurements are to each other.', 'The smallest change an instrument can show.'], { family: 'acc-prec', tip: 'Repeating a biased method won’t improve accuracy.' }],
  ['precision', QUALITY, 'precision', 'How close repeated measurements are to each other.',
    ['How close a measurement is to the true (accepted) value.', 'Whether other people get the same result.'], { family: 'acc-prec', tip: 'Precise results can still be inaccurate if they share a systematic error.' }],
  ['repeatability', QUALITY, 'repeatability', 'Agreement between results when the same person repeats the method with the same equipment and conditions.',
    ['Agreement between results when the investigation is redone by different people, equipment or labs.'], { family: 'rep' }],
  ['reproducibility', QUALITY, 'reproducibility', 'Agreement between results when the investigation is redone by different people, equipment or labs.',
    ['Agreement between results when the same person repeats the method with the same equipment and conditions.'], { family: 'rep' }],
  ['resolution', QUALITY, 'resolution', 'The smallest change in a quantity that an instrument can detect or display.',
    ['How close a measurement is to the true value.', 'The range of values an instrument can measure.'], { tip: 'More decimal places is finer resolution, not necessarily more accuracy.' }],
  ['validity', QUALITY, 'validity', 'Whether the investigation actually measures what it claims to, with other variables controlled.',
    ['How close repeated measurements are to each other.', 'Whether other people get the same result.']],
  ['true-value', QUALITY, 'true value', 'The value that would be found in an ideal measurement; in practice, the accepted reference value.'],

  // Errors and uncertainty
  ['random', ERRORS, 'random error', 'Unpredictable variation that scatters results either side of the true value; reduced by repeating and averaging.',
    ['A consistent bias that shifts every result the same way; not reduced by repeating.', 'A mistake such as misreading a scale or spilling a sample.'], { family: 'error', tip: 'Affects precision.' }],
  ['systematic', ERRORS, 'systematic error', 'A consistent bias that shifts every result the same way; not reduced by repeating.',
    ['Unpredictable variation that scatters results either side of the true value; reduced by repeating and averaging.', 'A mistake such as misreading a scale or spilling a sample.'], { family: 'error', tip: 'Affects accuracy; e.g. an uncalibrated balance or heat lost from a calorimeter.' }],
  ['personal', ERRORS, 'personal error', 'A mistake, such as misreading a scale or spilling a sample; the result should be discarded, not analysed.',
    ['Unpredictable variation that scatters results either side of the true value.', 'A consistent bias that shifts every result the same way.'], { family: 'error', tip: 'VCAA: mistakes aren’t counted as experimental errors.' }],
  ['uncertainty', ERRORS, 'uncertainty', 'The range within which the true value is expected to lie, given the limits of the measurement.'],
  ['outlier', ERRORS, 'outlier', 'A result that lies well outside the pattern of the rest of the data.',
    ['The result closest to the mean.']],
  ['fix-random', ERRORS, 'How to reduce the effect of random error', 'Repeat the measurement and average the results (or use more precise equipment).',
    ['Calibrate the equipment.', 'Change the method entirely.'], { family: 'fix', oneWay: true }],
  ['fix-systematic', ERRORS, 'How to reduce systematic error', 'Calibrate or change the equipment or method; repeating won’t help.',
    ['Repeat the measurement and average the results.', 'Take more readings.'], { family: 'fix', oneWay: true }],

  // Investigation design
  ['iv', DESIGN, 'independent variable', 'The variable deliberately changed by the investigator.',
    ['The variable measured in response.', 'A variable kept the same throughout.'], { family: 'variable' }],
  ['dv', DESIGN, 'dependent variable', 'The variable measured in response to changes in the independent variable.',
    ['The variable deliberately changed by the investigator.', 'A variable kept the same throughout.'], { family: 'variable' }],
  ['cv', DESIGN, 'controlled variable', 'A variable kept the same so it can’t affect the dependent variable.',
    ['The variable deliberately changed by the investigator.', 'The variable measured in response.'], { family: 'variable' }],
  ['control', DESIGN, 'control (or blank)', 'A set-up without the independent variable applied, used for comparison.',
    ['A variable kept the same throughout.']],
  ['hypothesis', DESIGN, 'hypothesis', 'A testable prediction of how the independent variable will affect the dependent variable, with a reason.',
    ['A statement of what the investigation is trying to find out.', 'A well-tested explanation supported by much evidence.'], { family: 'aim-hyp' }],
  ['aim', DESIGN, 'aim', 'A statement of what the investigation is trying to find out, e.g. to investigate the effect of X on Y.',
    ['A testable prediction of how the independent variable will affect the dependent variable, with a reason.'], { family: 'aim-hyp' }],
  ['controlled-exp', DESIGN, 'controlled experiment', 'An investigation of how an independent variable affects a dependent variable, with all other variables controlled.'],

  // Data and evidence
  ['primary-data', DATA, 'primary data', 'Data collected first-hand by the investigator.', ['Data collected by someone else and used by the investigator.'], { family: 'data-src' }],
  ['secondary-data', DATA, 'secondary data', 'Data collected by someone else and used by the investigator.', ['Data collected first-hand by the investigator.'], { family: 'data-src' }],
  ['qualitative', DATA, 'qualitative data', 'Descriptive observations without numbers, e.g. a colour change.', ['Numerical measurements, e.g. a temperature or mass.'], { family: 'data-type' }],
  ['quantitative', DATA, 'quantitative data', 'Numerical measurements, e.g. a temperature or mass.', ['Descriptive observations without numbers, e.g. a colour change.'], { family: 'data-type' }],
  ['logbook', DATA, 'logbook', 'A dated record of all planning, raw data and analysis, used to authenticate the student’s own work.'],
  ['conclusion-scope', DATA, 'How far a conclusion can reach', 'Only to the conditions and range actually tested.',
    ['To all similar reactions.', 'Beyond the range tested, if the trend is clear.'], { oneWay: true }],
]

export const chemScienceSkillsDeck: Deck = {
  id: 'chem-science-skills',
  title: 'Science Skills',
  blurb: 'Accuracy, precision, repeatability, reproducibility, resolution and validity, the types of error, variables and data.',
  groups: [QUALITY, ERRORS, DESIGN, DATA],
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
  source: 'Key science skills, VCE Chemistry Study Design 2024–2028',
}
