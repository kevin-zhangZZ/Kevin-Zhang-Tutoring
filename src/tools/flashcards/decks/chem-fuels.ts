import type { Card, Deck } from '../data'

// Unit 3 AoS 1: fuels, enthalpy, calorimetry and the energy equations of living things.

const FUELS = 'Fuels'
const ENTHALPY = 'Enthalpy'
const CAL = 'Calorimetry'
const LIFE = 'Food & Life'

/** A short answer a student could type: plain words, three at most. */
const typeable = (s: string) => /^[A-Za-z0-9 '-]+$/.test(s) && s.trim().split(/\s+/).length <= 3

/** [id, group, front, back, traps, extra] */
type Row = [string, string, string, string, string[]?, Partial<Card>?]

const rows: Row[] = [
  // Fuels
  ['fuel', FUELS, 'fuel', 'A substance that reacts (usually by combustion) to release energy in a useful form.'],
  ['fossil-fuel', FUELS, 'fossil fuel', 'A fuel formed from the remains of ancient organisms over millions of years, e.g. coal, natural gas, petrol.',
    ['A fuel made from recently living plant or animal matter, e.g. biogas, bioethanol, biodiesel.']],
  ['biofuel', FUELS, 'biofuel', 'A fuel made from recently living plant or animal matter (biomass), e.g. biogas, bioethanol, biodiesel.',
    ['A fuel formed from the remains of ancient organisms over millions of years, e.g. coal, natural gas, petrol.']],
  ['renewable', FUELS, 'renewable', 'Able to be replaced by natural processes within a relatively short period of time.',
    ['Able to be used without producing any carbon dioxide.', 'Used faster than natural processes can replace it.'], { tip: 'The study design’s own definition of renewability.' }],
  ['non-renewable', FUELS, 'non-renewable', 'Used faster than natural processes can replace it, e.g. coal, crude oil, natural gas.',
    ['Able to be replaced by natural processes within a relatively short period of time.']],
  ['biogas', FUELS, 'biogas', 'A gas fuel of mainly methane (45–75%) with CO₂, from the anaerobic breakdown of organic waste.',
    ['Ethanol made by fermenting glucose from crops, then distilling it.'], { tip: 'The CO₂ in biogas doesn’t burn, so its heat of combustion varies (Data Book Table 14).' }],
  ['bioethanol', FUELS, 'bioethanol', 'Ethanol made by fermenting glucose from plant material, then distilling it.',
    ['A mixture of methyl esters made from plant oils and methanol.', 'Ethanol made by hydrating ethene from crude oil.'], { tip: 'Same molecule as ethanol from ethene; only the source differs.' }],
  ['biodiesel', FUELS, 'biodiesel', 'A mixture of esters made by transesterification of plant oils (triglycerides) with an alcohol such as methanol.',
    ['Ethanol made by fermenting glucose from plant material, then distilling it.', 'A mixture of alkanes distilled from crude oil.']],
  ['complete-comb', FUELS, 'complete combustion', 'Burning in excess oxygen: the carbon is fully oxidised to CO₂, with H₂O.',
    ['Burning in limited oxygen: produces CO and/or C (soot), with H₂O.']],
  ['incomplete-comb', FUELS, 'incomplete combustion', 'Burning in limited oxygen: produces CO and/or C (soot), with H₂O.',
    ['Burning in excess oxygen: the carbon is fully oxidised to CO₂, with H₂O.']],
  ['ghg', FUELS, 'The major greenhouse gases from burning fuels', 'CO₂, CH₄ and H₂O', ['CO, NO₂ and SO₂', 'CO₂, O₂ and N₂'], { oneWay: true }],

  // Enthalpy
  ['exo', ENTHALPY, 'exothermic', 'Releases energy to the surroundings: ΔH is negative and the products have less enthalpy than the reactants.',
    ['Absorbs energy from the surroundings: ΔH is positive and the products have more enthalpy than the reactants.']],
  ['endo', ENTHALPY, 'endothermic', 'Absorbs energy from the surroundings: ΔH is positive and the products have more enthalpy than the reactants.',
    ['Releases energy to the surroundings: ΔH is negative and the products have less enthalpy than the reactants.']],
  ['dH', ENTHALPY, 'enthalpy change (ΔH)', 'The enthalpy of the products minus the enthalpy of the reactants.',
    ['The enthalpy of the reactants minus the enthalpy of the products.', 'The minimum energy needed for a reaction to start.']],
  ['bond-break', ENTHALPY, 'bond breaking', 'Absorbs energy (endothermic).', ['Releases energy (exothermic).'], { family: 'bonds' }],
  ['bond-make', ENTHALPY, 'bond making', 'Releases energy (exothermic).', ['Absorbs energy (endothermic).'], { family: 'bonds', tip: 'Exothermic overall: more energy released making bonds than absorbed breaking them.' }],
  ['thermo-eq', ENTHALPY, 'thermochemical equation', 'A balanced equation, with states, that includes ΔH for the amounts as written.',
    ['A half-equation showing the electrons gained or lost.']],
  ['molar-comb', ENTHALPY, 'molar enthalpy of combustion', 'The enthalpy change when 1 mol of a substance burns completely in oxygen, in kJ mol⁻¹.',
    ['The energy released when 1 g of a fuel burns completely, in kJ g⁻¹.'], { family: 'comb-units' }],
  ['heat-comb', ENTHALPY, 'heat of combustion', 'The energy released when 1 g (or 1 mL) of a fuel burns completely, in kJ g⁻¹ (or kJ mL⁻¹).',
    ['The enthalpy change when 1 mol of a substance burns completely in oxygen, in kJ mol⁻¹.'], { family: 'comb-units' }],
  ['mixture-units', ENTHALPY, 'Why petrol’s heat of combustion is given in kJ g⁻¹, not kJ mol⁻¹', 'It is a mixture, so it has no single molar mass.',
    ['It is a liquid, so it can’t be measured in moles.', 'It burns incompletely, so the moles are unknown.'], { oneWay: true }],
  ['eq-dependent', ENTHALPY, 'What happens to ΔH when an equation’s coefficients are doubled', 'ΔH doubles.',
    ['ΔH stays the same.', 'ΔH changes sign.', 'ΔH is squared.'], { oneWay: true, tip: 'ΔH values are equation-dependent: 2C₂H₆ burning gives −3120 kJ, twice −1560 kJ.' }],
  ['limiting', ENTHALPY, 'limiting reactant', 'The reactant that is completely used up first, so it decides how much product forms.',
    ['The reactant left over once the reaction stops.'], { family: 'limit' }],
  ['excess', ENTHALPY, 'excess reactant', 'The reactant left over once the limiting reactant is used up.',
    ['The reactant that is completely used up first, so it decides how much product forms.'], { family: 'limit' }],
  ['slc', ENTHALPY, 'SLC', 'Standard laboratory conditions: 25 °C and 100 kPa.',
    ['0 °C and 100 kPa.', '25 °C and 101.3 kPa.'], { tip: 'Molar volume of a gas at SLC is 24.8 L mol⁻¹ (Data Book Table 4).' }],

  // Calorimetry
  ['calorimetry', CAL, 'calorimetry', 'Measuring the energy released or absorbed by a reaction from the temperature change of a known system.'],
  ['cf', CAL, 'calibration factor', 'The energy needed to raise the calorimeter’s temperature by 1 °C, in J °C⁻¹ (found electrically or with a known reaction).',
    ['The energy needed to raise the temperature of 1 g of water by 1 °C.'], { family: 'heat-cap' }],
  ['shc', CAL, 'specific heat capacity', 'The energy needed to raise the temperature of 1 g of a substance by 1 °C (water: 4.18 J g⁻¹ K⁻¹).',
    ['The energy needed to raise the calorimeter’s temperature by 1 °C.'], { family: 'heat-cap' }],
  ['why-calibrate', CAL, 'Why a solution calorimeter is calibrated', 'Its contents and vessel absorb energy too, so water alone (mcΔT) would misjudge the energy.',
    ['To make the reaction go to completion.', 'To stop heat being lost to the surroundings.'], { oneWay: true }],
  ['heat-loss', CAL, 'Why a measured ΔH of combustion is usually smaller in size than the Data Book value', 'Heat is lost to the surroundings (and combustion may be incomplete), so the temperature rise is too small.',
    ['The thermometer has too fine a resolution.', 'Too much fuel was burnt.'], { oneWay: true }],
  ['extrapolate', CAL, 'Why the cooling line on a temperature–time graph is extrapolated back', 'To estimate the true maximum temperature change, correcting for heat lost while the reaction happened.',
    ['To find when the reaction started.', 'To find the calibration factor.'], { oneWay: true }],
  ['efficiency', CAL, 'energy efficiency', 'The percentage of chemical energy converted to useful energy.',
    ['The percentage of reactant atoms that end up in the desired product.', 'The percentage of the theoretical yield actually obtained.']],

  // Food & life
  ['photosynthesis', LIFE, 'photosynthesis', 'Light energy into chemical energy: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂',
    ['C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O, releasing energy', 'C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂'], { family: 'glucose' }],
  ['respiration', LIFE, 'cellular respiration', 'Oxidation of glucose to release energy: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O',
    ['6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂, storing light energy', 'C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂'], { family: 'glucose' }],
  ['fermentation', LIFE, 'fermentation', 'Glucose to ethanol by yeast enzymes, without oxygen: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂',
    ['C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O, releasing energy', '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂'], { family: 'glucose' }],
  ['fats-energy', LIFE, 'Energy content of fats and oils', '37 kJ g⁻¹', ['17 kJ g⁻¹', '16 kJ g⁻¹'], { family: 'food', tip: 'Data Book Table 11: fats 37, proteins 17, carbohydrates 16.' }],
  ['protein-energy', LIFE, 'Energy content of proteins', '17 kJ g⁻¹', ['37 kJ g⁻¹', '16 kJ g⁻¹'], { family: 'food', tip: 'Data Book Table 11: fats 37, proteins 17, carbohydrates 16.' }],
  ['carb-energy', LIFE, 'Energy content of carbohydrates', '16 kJ g⁻¹', ['37 kJ g⁻¹', '17 kJ g⁻¹'], { family: 'food', tip: 'Data Book Table 11: fats 37, proteins 17, carbohydrates 16.' }],
  ['primary-carb', LIFE, 'The body’s primary carbohydrate energy source', 'glucose', ['starch', 'glycogen', 'fructose'], { oneWay: true }],
]

export const chemFuelsDeck: Deck = {
  id: 'chem-fuels',
  title: 'Fuels & Energy',
  blurb: 'Fuels and biofuels, enthalpy, calorimetry and the energy equations of photosynthesis, respiration and fermentation.',
  groups: [FUELS, ENTHALPY, CAL, LIFE],
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
  source: 'VCE Chemistry Study Design Unit 3 AoS 1; energy values from Tables 4 and 11, 2026 Data Book',
}
