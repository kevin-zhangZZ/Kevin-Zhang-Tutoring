// Topics and subtopics for the exam analysis, and the rules that file every archived question
// (each MCQ, and each part of a short-answer question) under one subtopic.
//
// data.ts only records a loose category per question ("Calculus — …") and partStats.ts a
// free-text label per part ("Tangent Line", "Coordinates"), so the tagging here reads both:
//   1. OVERRIDES — a hand-checked subtopic for an item the rules below get wrong;
//   2. a part's label (PART_LABELS), when the label alone says what the part tests;
//   3. the question's description, matched against its category's rules (RULES);
//   4. the category's default.
// Labels that could mean anything ("Find Parameter", "Solve Equation") fall through to 3, so
// the part takes the question's own subtopic.
//
// After adding questions, run `npm run topic-check` to list every item by subtopic and look
// for anything misfiled; fix it with an override.

import type { SubjectId } from '../worked-solutions/data'

export type AnalysisSubject = Extract<SubjectId, 'methods' | 'specialist'>

export interface Subtopic {
  /** "topic.sub", e.g. "diff.optim" — unique within a subject. */
  id: string
  label: string
}

export interface Topic {
  id: string
  label: string
  /** One line on what the topic covers, shown in the topic key. */
  blurb: string
  subtopics: Subtopic[]
}

function topic(id: string, label: string, blurb: string, subs: [string, string][]): Topic {
  return { id, label, blurb, subtopics: subs.map(([s, l]) => ({ id: `${id}.${s}`, label: l })) }
}

export const TAXONOMY: Record<AnalysisSubject, Topic[]> = {
  methods: [
    topic('functions', 'Functions & Graphs', 'Graphs, domain and range, inverses, composites, transformations, circular functions', [
      ['graphs', 'Graph Sketching & Features'],
      ['domain', 'Domain & Range'],
      ['inverse', 'Inverse Functions'],
      ['composite', 'Composites & Function Properties'],
      ['transform', 'Transformations'],
      ['circular', 'Circular Functions'],
    ]),
    topic('algebra', 'Algebra & Equations', 'Polynomials, exponentials and logs, trig equations, systems, coordinate geometry, Newton’s method', [
      ['poly', 'Polynomials'],
      ['explog', 'Exponentials & Logarithms'],
      ['trigeq', 'Trig Equations'],
      ['systems', 'Simultaneous Equations & Intersections'],
      ['coord', 'Lines & Coordinate Geometry'],
      ['numeric', 'Newton’s Method & Algorithms'],
    ]),
    topic('diff', 'Differentiation', 'Derivative rules, tangents, stationary points, optimisation, rates of change', [
      ['rules', 'Derivatives & Rules'],
      ['tangents', 'Tangents & Normals'],
      ['shape', 'Stationary Points & Curve Shape'],
      ['optim', 'Optimisation'],
      ['rates', 'Rates of Change'],
    ]),
    topic('integ', 'Integration', 'Antiderivatives, definite integrals, areas, average value, numerical integration', [
      ['anti', 'Antiderivatives'],
      ['definite', 'Definite Integrals'],
      ['area', 'Areas'],
      ['avg', 'Average Value'],
      ['approx', 'Numerical Integration'],
    ]),
    topic('prob', 'Probability', 'Probability rules, discrete and continuous random variables, binomial and normal', [
      ['rules', 'Probability Rules'],
      ['discrete', 'Discrete Random Variables'],
      ['binomial', 'Binomial Distribution'],
      ['continuous', 'Continuous Random Variables'],
      ['normal', 'Normal Distribution'],
      ['markov', 'Markov Chains'],
    ]),
    topic('stats', 'Statistical Inference', 'Sample proportions and confidence intervals', [
      ['prop', 'Sample Proportions'],
      ['ci', 'Confidence Intervals'],
    ]),
  ],
  specialist: [
    topic('proof', 'Logic & Proof', 'Induction, contrapositive, contradiction and direct proof', [
      ['induction', 'Induction'],
      ['other', 'Other Proof & Logic'],
    ]),
    topic('functions', 'Functions & Graphs', 'Rational functions, reciprocal and inverse circular functions, conics, absolute value', [
      ['rational', 'Rational Functions & Asymptotes'],
      ['circular', 'Circular Functions & Identities'],
      ['relations', 'Conics & Parametric Curves'],
      ['domain', 'Domain, Inverses & Absolute Value'],
    ]),
    topic('complex', 'Complex Numbers', 'Cartesian and polar form, De Moivre, polynomial roots, loci', [
      ['algebra', 'Complex Algebra'],
      ['polar', 'Polar Form & De Moivre'],
      ['roots', 'Polynomial Roots'],
      ['loci', 'Loci & Regions'],
    ]),
    topic('calculus', 'Calculus', 'Differentiation and integration techniques, related rates, areas, volumes, arc length', [
      ['diff', 'Differentiation Techniques'],
      ['shape', 'Stationary Points & Inflections'],
      ['rates', 'Related Rates'],
      ['integ', 'Integration Techniques'],
      ['area', 'Areas'],
      ['solids', 'Volumes, Arc Length & Surface Area'],
    ]),
    topic('de', 'Differential Equations', 'Solving DEs, growth, mixing and logistic models, Euler’s method', [
      ['solve', 'Solving DEs'],
      ['models', 'Growth, Mixing & Logistic Models'],
      ['euler', 'Euler’s Method & Slope Fields'],
    ]),
    topic('kinematics', 'Kinematics', 'Straight-line motion, and the forces and momentum left from the old course', [
      ['line', 'Straight-Line Motion'],
      ['forces', 'Forces & Momentum'],
    ]),
    topic('vectors', 'Vectors', 'Vector algebra, lines and planes in space, motion described by vectors', [
      ['algebra', 'Vector Algebra'],
      ['space', 'Lines & Planes'],
      ['motion', 'Vector Motion'],
    ]),
    topic('stats', 'Statistics', 'Sums of random variables, sample means, confidence intervals, hypothesis tests', [
      ['lin', 'Sums of Random Variables'],
      ['mean', 'Sample Means'],
      ['ci', 'Confidence Intervals'],
      ['test', 'Hypothesis Testing'],
    ]),
  ],
}

// ── Rules ──────────────────────────────────────────────────────────────────────────────────

type Rule = [RegExp, string]

/** Per subject, per category key (data.ts's category, lower-cased): description rules in
 *  order, then a default. A category missing here uses `*`. */
interface CategoryRules {
  rules: Rule[]
  fallback: string
}

const M_CALCULUS: CategoryRules = {
  rules: [
    [/newton/i, 'algebra.numeric'],
    [/maximis|minimis|optimis|maximum (area|volume|y-intercept)|largest|closest|minimum.distance|reaches maximum/i, 'diff.optim'],
    [/trapezi|rectangle approximation|rectangles|trapezium rule/i, 'integ.approx'],
    [/average value|average values/i, 'integ.avg'],
    [/average rate|rate of change|related rate|steepest chord/i, 'diff.rates'],
    [/tangent|normal/i, 'diff.tangents'],
    [/area|region/i, 'integ.area'],
    [/antidifferentiat|antiderivative|recovering (f|g)|from (f|g)′|integration by (parts|recognition)|deriving ∫/i, 'integ.anti'],
    [/integral|integrat|fundamental theorem/i, 'integ.definite'],
    [/stationary|turning|turns|decreasing|increasing|inflection|shape of|graph of f′|derivative graph|its derivative|sign of f′/i, 'diff.shape'],
    [/derivative|gradient|chain rule|product|quotient|differentiab|smooth|flat rather/i, 'diff.rules'],
    [/volume|cylinder/i, 'diff.optim'],
  ],
  fallback: 'diff.rules',
}

const M_FUNCTIONS: CategoryRules = {
  rules: [
    [/exponential equation|log equation|logarithm equation|dividing exponentials|hidden quadratic/i, 'algebra.explog'],
    [/inverse|one-to-one/i, 'functions.inverse'],
    [/composite|functional|f\(x ?\+|f\(x − 1\)|f\(x\) = x|continuous|odd|dip|sign change|implies/i, 'functions.composite'],
    [/solutions|meeting|intersect/i, 'algebra.systems'],
    [/transformation|dilation/i, 'functions.transform'],
    [/domain|range/i, 'functions.domain'],
    [/cosine|sine|\bsin\b|\bcos\b|tangent graph|circular/i, 'functions.circular'],
  ],
  fallback: 'functions.graphs',
}

const M_ALGEBRA: CategoryRules = {
  rules: [
    [/log|index|exponential|base/i, 'algebra.explog'],
    [/simultaneous|no solution|infinitely|determinant|system/i, 'algebra.systems'],
  ],
  fallback: 'algebra.poly',
}

const M_PROBABILITY: CategoryRules = {
  rules: [
    [/sample proportion|p̂/i, 'stats.prop'],
    [/confidence|sample size/i, 'stats.ci'],
    [/binomial|rolls until|at least one green|coins/i, 'prob.binomial'],
    [/\bnormal\b|standardis|deviation from|tails? p/i, 'prob.normal'],
    [/densit|pdf|continuous|median|percentile|uniform/i, 'prob.continuous'],
    [/discrete|mean of|e\(x|variance|probability function|mass function/i, 'prob.discrete'],
    [/chain|transition/i, 'prob.markov'],
  ],
  fallback: 'prob.rules',
}

const RULES: Record<AnalysisSubject, Record<string, CategoryRules>> = {
  methods: {
    calculus: M_CALCULUS,
    functions: M_FUNCTIONS,
    graphs: {
      rules: [
        [/period|sine|cos|tan\(/i, 'functions.circular'],
        [/dilated|translated|transform/i, 'functions.transform'],
        [/average rate/i, 'diff.rates'],
        [/intersection/i, 'algebra.systems'],
      ],
      fallback: 'functions.graphs',
    },
    transformations: { rules: [], fallback: 'functions.transform' },
    trigonometry: {
      rules: [[/solution|solving|solve|equation/i, 'algebra.trigeq']],
      fallback: 'functions.circular',
    },
    algebra: M_ALGEBRA,
    quadratics: M_ALGEBRA,
    logarithms: { rules: [], fallback: 'algebra.explog' },
    algorithms: { rules: [], fallback: 'algebra.numeric' },
    probability: M_PROBABILITY,
    statistics: {
      rules: [
        [/confidence|sample size/i, 'stats.ci'],
        [/sample proportion/i, 'stats.prop'],
      ],
      fallback: 'prob.normal',
    },
    '*': { rules: [], fallback: 'functions.graphs' },
  },
  specialist: {
    calculus: {
      rules: [
        [/euler/i, 'de.euler'],
        [/separable|differential equation/i, 'de.solve'],
        [/related rate|sand pile|surface area of a cube/i, 'calculus.rates'],
        [/arc.length|length of|surface|volume|revolution|solid/i, 'calculus.solids'],
        [/a = v|acceleration/i, 'kinematics.line'],
        [/substitution|integral|integrand|antidifferentiat|by parts|reduction|u = /i, 'calculus.integ'],
        [/inflection|stationary|turning|gradient of a cubic/i, 'calculus.shape'],
        [/area/i, 'calculus.area'],
      ],
      fallback: 'calculus.diff',
    },
    'related rates': { rules: [], fallback: 'calculus.rates' },
    'complex numbers': {
      rules: [
        [/nth roots|cube roots|roots of unity/i, 'complex.polar'],
        [/cubic|quartic|polynomial|quadratic|sum of the roots|completing the square/i, 'complex.roots'],
        [/locus|loci|circle|ray|line|bisector|region|parallelogram|triangle|meets|cuts/i, 'complex.loci'],
        [/polar|argument|arg|moivre|power|cis|cube|fifth|63rd|z⁵|¹⁴|quotient/i, 'complex.polar'],
      ],
      fallback: 'complex.algebra',
    },
    'coordinate geometry': { rules: [], fallback: 'functions.relations' },
    conics: { rules: [], fallback: 'functions.relations' },
    functions: {
      rules: [
        [/arcsin|arccos|arctan|cos⁻¹|inverse cosine|reciprocal square root of arcsin/i, 'functions.circular'],
        [/asymptote|rational|discontinuity|turning|maxima|hybrid/i, 'functions.rational'],
      ],
      fallback: 'functions.domain',
    },
    graphs: {
      rules: [[/arctan|arcsin|arccos/i, 'functions.circular']],
      fallback: 'functions.rational',
    },
    trigonometry: { rules: [], fallback: 'functions.circular' },
    algebra: {
      rules: [[/partial fraction/i, 'calculus.integ']],
      fallback: 'functions.domain',
    },
    'differential equations': {
      rules: [
        [/euler|direction field|slope field/i, 'de.euler'],
        [/mixing|tank|salt|growth|logistic|population/i, 'de.models'],
        [/air resistance|maximum height|skydiver|acceleration|velocity|sliding|sinking|particle/i, 'kinematics.line'],
      ],
      fallback: 'de.solve',
    },
    kinematics: {
      rules: [[/force|momentum/i, 'kinematics.forces']],
      fallback: 'kinematics.line',
    },
    vectors: {
      rules: [
        [/force|equilibrium|momentum/i, 'kinematics.forces'],
        [/collid|collision|moving|path|particle|velocity|acceleration|speed|motion|projectile|trajectory|travelled|rocket|helicopter|yacht|boat|aeroplane|stunt|minigolf|epitrochoid|ellipse|parabola|circle rather/i, 'vectors.motion'],
        [/\bplanes?\b|\blines?\b|skew|cross product|3d|in space/i, 'vectors.space'],
      ],
      fallback: 'vectors.algebra',
    },
    statistics: {
      rules: [
        [/confidence interval|interval/i, 'stats.ci'],
        [/test|p value|decision rule|type ii|hypothes/i, 'stats.test'],
        [/sample mean|mean of (four|six|25)|distribution of a sample/i, 'stats.mean'],
      ],
      fallback: 'stats.lin',
    },
    probability: { rules: [], fallback: 'stats.lin' },
    proof: {
      rules: [[/induction/i, 'proof.induction']],
      fallback: 'proof.other',
    },
    algorithms: { rules: [], fallback: 'calculus.solids' },
    '*': { rules: [], fallback: 'calculus.diff' },
  },
}

// ── Part labels ────────────────────────────────────────────────────────────────────────────
// A label that settles the subtopic by itself. A function gets the question's category key,
// for labels whose meaning depends on the kind of question.

type LabelRule = string | ((category: string) => string | null)

const M_LABELS: Record<string, LabelRule> = {
  // Functions & Graphs
  'sketch graph': c => (c === 'trigonometry' ? 'functions.circular' : c === 'probability' ? 'prob.continuous' : 'functions.graphs'),
  'sketch hyperbola': 'functions.graphs',
  'sketch truncus': 'functions.graphs',
  'sketch cubic': 'functions.graphs',
  'rational function': 'functions.graphs',
  'hybrid function': 'functions.graphs',
  'rule from graph': 'functions.graphs',
  'axis of symmetry': 'functions.graphs',
  limit: 'functions.graphs',
  'long-term value': c => (c === 'trigonometry' ? 'functions.circular' : 'functions.graphs'),
  'initial value': c => (c === 'trigonometry' ? 'functions.circular' : 'functions.graphs'),
  inequality: 'functions.graphs',
  'nature of graph': 'functions.graphs',
  range: c => (c === 'trigonometry' ? 'functions.circular' : 'functions.domain'),
  domain: 'functions.domain',
  'domain & range': 'functions.domain',
  'maximal domain': 'functions.domain',
  'inverse function': 'functions.inverse',
  'sketch inverse': 'functions.inverse',
  'one-to-one': 'functions.inverse',
  'one-to-one restriction': 'functions.inverse',
  'inverse intersections': 'functions.inverse',
  'inverse area': 'integ.area',
  'composite function': 'functions.composite',
  'composite domain': 'functions.composite',
  'odd function': 'functions.composite',
  symmetry: c => (c === 'trigonometry' ? 'functions.circular' : 'functions.composite'),
  'undefined values': 'functions.composite',
  transformations: 'functions.transform',
  translation: 'functions.transform',
  'vertical translation': 'functions.transform',
  dilation: 'functions.transform',
  reflection: 'functions.transform',
  period: 'functions.circular',
  'period & amplitude': 'functions.circular',
  'period & range': 'functions.circular',
  periodicity: 'functions.circular',
  'periodic increase': 'functions.circular',
  'max & min': c => (c === 'trigonometry' ? 'functions.circular' : null),
  'max & min bounds': 'functions.circular',
  // Algebra & Equations
  factorisation: 'algebra.poly',
  expansion: 'algebra.poly',
  'verify root': 'algebra.poly',
  'repeated root': 'algebra.poly',
  'fitting a cubic': 'algebra.poly',
  'algebraic identity': 'algebra.poly',
  intercepts: 'algebra.poly',
  'exponential equation': 'algebra.explog',
  'log equation': 'algebra.explog',
  'log laws': 'algebra.explog',
  'index laws': 'algebra.explog',
  'trig equation': 'algebra.trigeq',
  'general solution': 'algebra.trigeq',
  'trig inequality': 'algebra.trigeq',
  zeros: c => (c === 'trigonometry' ? 'algebra.trigeq' : 'algebra.poly'),
  'time interval': 'algebra.trigeq',
  'simultaneous equations': 'algebra.systems',
  intersections: 'algebra.systems',
  'intersection point': 'algebra.systems',
  'number of solutions': 'algebra.systems',
  'line equation': 'algebra.coord',
  distance: 'algebra.coord',
  'vertical distance': 'algebra.coord',
  'perpendicular distance': 'algebra.coord',
  'angle between lines': 'algebra.coord',
  'triangle area': 'algebra.coord',
  "newton's method": 'algebra.numeric',
  // Differentiation
  'chain rule': 'diff.rules',
  'product rule': 'diff.rules',
  'quotient rule': 'diff.rules',
  derivative: 'diff.rules',
  'evaluate derivative': 'diff.rules',
  gradient: 'diff.rules',
  continuity: 'diff.rules',
  'smooth join': 'diff.rules',
  'equal gradients': 'diff.rules',
  'decreasing derivative': 'diff.shape',
  'decreasing gradient': 'diff.shape',
  'tangent line': 'diff.tangents',
  'tangent lines': 'diff.tangents',
  'tangent gradient': 'diff.tangents',
  'tangent angle': 'diff.tangents',
  'tangent intercept': 'diff.tangents',
  'tangent through point': 'diff.tangents',
  'tangent through origin': 'diff.tangents',
  'tangent matching': 'diff.tangents',
  'point off curve': 'diff.tangents',
  'normal line': 'diff.tangents',
  'perpendicular tangents': 'diff.tangents',
  'parallel tangents': 'diff.tangents',
  'angle between tangents': 'diff.tangents',
  'stationary points': 'diff.shape',
  'stationary point': 'diff.shape',
  'turning point': 'diff.shape',
  'turning points': 'diff.shape',
  'nature of point': 'diff.shape',
  'local minimum': 'diff.shape',
  'local maximum': 'diff.shape',
  'minimum point': 'diff.shape',
  'point of inflection': 'diff.shape',
  'inflection point': 'diff.shape',
  'increasing function': 'diff.shape',
  'increasing interval': 'diff.shape',
  'decreasing interval': 'diff.shape',
  'gradient table': 'diff.shape',
  'sketch derivative': 'diff.shape',
  optimisation: 'diff.optim',
  'minimum distance': 'diff.optim',
  'closest point': 'diff.optim',
  'maximum gradient': 'diff.optim',
  'maximum difference': 'diff.optim',
  'maximum time': 'diff.optim',
  'maximum value': c => (c === 'trigonometry' ? 'functions.circular' : 'diff.optim'),
  'minimum value': c => (c === 'trigonometry' ? 'functions.circular' : 'diff.optim'),
  'average rate': 'diff.rates',
  'average gradient': 'diff.rates',
  'instantaneous rate': 'diff.rates',
  'rate of change': 'diff.rates',
  'maximum rate': 'diff.rates',
  'related rates': 'diff.rates',
  // Integration
  antiderivative: 'integ.anti',
  antidifferentiation: 'integ.anti',
  'integral recognition': 'integ.anti',
  'definite integral': 'integ.definite',
  'integral properties': 'integ.definite',
  'fundamental theorem': 'integ.definite',
  'area between curves': 'integ.area',
  'area under curve': 'integ.area',
  area: 'integ.area',
  'shaded area': 'integ.area',
  'equal areas': 'integ.area',
  'area function': 'integ.area',
  'bounding an area': 'integ.area',
  'area bound': 'integ.area',
  'average value': 'integ.avg',
  'trapezium rule': 'integ.approx',
  'right endpoint rule': 'integ.approx',
  'rectangle width': 'integ.approx',
  'rectangle area': 'integ.approx',
  // Probability
  'conditional probability': 'prob.rules',
  'total probability': 'prob.rules',
  independence: 'prob.rules',
  'independent events': 'prob.rules',
  complement: 'prob.rules',
  'venn diagram': 'prob.rules',
  'two-way table': 'prob.rules',
  'probability algebra': 'prob.rules',
  'probability bounds': 'prob.rules',
  'selection probability': 'prob.rules',
  'probability expression': 'prob.rules',
  'solve for p': 'prob.rules',
  'discrete distribution': 'prob.discrete',
  'expected value': 'prob.discrete',
  'binomial distribution': 'prob.binomial',
  'conditional binomial': 'prob.binomial',
  'binomial variance': 'prob.binomial',
  'first success': 'prob.binomial',
  'independent trials': 'prob.binomial',
  'expected number': 'prob.binomial',
  'minimum sample size': 'prob.binomial',
  'mean & sd': 'prob.binomial',
  'continuous pdf': 'prob.continuous',
  'mean of pdf': 'prob.continuous',
  median: 'prob.continuous',
  'pdf quantile': 'prob.continuous',
  'transformed pdf': 'prob.continuous',
  'sketch pdf': 'prob.continuous',
  'standard deviation': 'prob.continuous',
  'normal distribution': 'prob.normal',
  'inverse normal': 'prob.normal',
  standardising: 'prob.normal',
  'normal symmetry': 'prob.normal',
  'markov chain': 'prob.markov',
  'transition matrix': 'prob.markov',
  // Statistical inference
  'sample proportion': 'stats.prop',
  'confidence interval': 'stats.ci',
  'confidence level': 'stats.ci',
  'sample size': 'stats.ci',
}

// Specialist labels about motion mean vector motion in a vectors or calculus question, and
// straight-line motion in a kinematics or differential-equations one.
const motion = (c: string) =>
  c === 'kinematics' || c === 'differential equations' || c === 'related rates' ? 'kinematics.line' : 'vectors.motion'

const S_LABELS: Record<string, LabelRule> = {
  // Complex numbers
  'line locus': 'complex.loci',
  'ray locus': 'complex.loci',
  'circle locus': 'complex.loci',
  'line & circle': 'complex.loci',
  'line & circle loci': 'complex.loci',
  'sketch loci': 'complex.loci',
  'sketch circle': 'complex.loci',
  'segment area': 'complex.loci',
  'ray intersections': 'complex.loci',
  'ray equation': 'complex.loci',
  'perpendicular bisector': 'complex.loci',
  'circle through points': 'complex.loci',
  'minimum circle': 'complex.loci',
  'roots in region': 'complex.loci',
  'tangent to circle': 'complex.loci',
  'cartesian form': c => (c === 'complex numbers' ? 'complex.loci' : null),
  'polar form': 'complex.polar',
  argument: 'complex.polar',
  "de moivre's theorem": 'complex.polar',
  'cube roots': 'complex.polar',
  'roots of unity': 'complex.polar',
  'real powers': 'complex.polar',
  'imaginary powers': 'complex.polar',
  'conjugate root': 'complex.roots',
  'conjugate roots': 'complex.roots',
  'factorise quartic': 'complex.roots',
  'complex quadratic': 'complex.roots',
  roots: 'complex.roots',
  'cubic coefficients': 'complex.roots',
  'factor theorem': 'complex.roots',
  'sum of roots': 'complex.roots',
  'completing the square': 'complex.roots',
  'translated roots': 'complex.roots',
  conjugates: 'complex.algebra',
  'conjugate equation': 'complex.algebra',
  'complex product': 'complex.algebra',
  // Vectors
  'unit vector': 'vectors.algebra',
  'angle with axis': 'vectors.algebra',
  magnitude: 'vectors.algebra',
  'perpendicular diagonals': 'vectors.algebra',
  'vector resolute': 'vectors.algebra',
  'vector resolutes': 'vectors.algebra',
  'vector expression': 'vectors.algebra',
  'solve vector equation': 'vectors.algebra',
  'linear dependence': 'vectors.algebra',
  'angle between vectors': 'vectors.algebra',
  'scalar product': 'vectors.algebra',
  'perpendicular part': 'vectors.algebra',
  'vector coordinates': 'vectors.algebra',
  'cross product area': 'vectors.space',
  'parallelogram area': 'vectors.space',
  'unit normal': 'vectors.space',
  'pyramid volume': 'vectors.space',
  'plane equation': 'vectors.space',
  'point in plane': 'vectors.space',
  'shortest distance': 'vectors.space',
  'line-plane angle': 'vectors.space',
  'line equation': 'vectors.space',
  'distance to plane': 'vectors.space',
  'intersection point': c => (c === 'vectors' ? 'vectors.space' : null),
  'planes intersection': 'vectors.space',
  'line of intersection': 'vectors.space',
  'parametric line': 'vectors.space',
  'parallel planes': 'vectors.space',
  'axis intercepts': 'vectors.space',
  'triangle area': 'vectors.space',
  'dot & cross product': 'vectors.space',
  velocity: motion,
  speed: motion,
  acceleration: motion,
  displacement: motion,
  'maximum displacement': motion,
  'meeting times': motion,
  'terminal velocity': 'kinematics.line',
  'limiting velocity': 'kinematics.line',
  'velocity-distance': 'kinematics.line',
  'velocity-distance de': 'kinematics.line',
  'acceleration form': 'kinematics.line',
  'stopping distance': 'kinematics.line',
  'distance integral': 'kinematics.line',
  'speed ratio': 'kinematics.line',
  'verify distance': 'kinematics.line',
  'maximum force': 'kinematics.forces',
  momentum: 'kinematics.forces',
  collision: 'vectors.motion',
  'collision point': 'vectors.motion',
  'sketch path': 'vectors.motion',
  'sketch paths': 'vectors.motion',
  'closest approach': 'vectors.motion',
  'minimum speed': 'vectors.motion',
  'maximum speed': 'vectors.motion',
  'distance travelled': 'vectors.motion',
  'time of flight': 'vectors.motion',
  'maximum height': 'vectors.motion',
  'angle between paths': 'vectors.motion',
  'initial positions': 'vectors.motion',
  'equal speeds': 'vectors.motion',
  position: 'vectors.motion',
  'path intersections': 'vectors.motion',
  'launch angle': 'vectors.motion',
  'projectile path': 'vectors.motion',
  'smooth landing': 'vectors.motion',
  'speed comparison': 'vectors.motion',
  'time within distance': 'vectors.motion',
  'starting point': 'vectors.motion',
  'direction of motion': 'vectors.motion',
  'perpendicular velocities': 'vectors.motion',
  'vector kinematics': 'vectors.motion',
  'angle of elevation': 'vectors.motion',
  'distance along path': 'vectors.motion',
  'time at origin': 'vectors.motion',
  'perpendicular vectors': c => (c === 'vectors' ? null : 'vectors.algebra'),
  'cartesian equation': c => (c === 'vectors' ? 'vectors.motion' : c === 'complex numbers' ? 'complex.loci' : 'functions.relations'),
  // Functions & graphs
  asymptotes: 'functions.rational',
  asymptote: 'functions.rational',
  'asymptote count': 'functions.rational',
  'oblique asymptote': 'functions.rational',
  'removable discontinuity': 'functions.rational',
  'sketch reciprocal': 'functions.rational',
  'sketch reciprocal trig': 'functions.circular',
  'double angle': c => (c === 'calculus' ? 'calculus.integ' : 'functions.circular'),
  'trig equation': 'functions.circular',
  'trig inequality': 'functions.circular',
  'domain & range': 'functions.domain',
  range: 'functions.domain',
  domain: 'functions.domain',
  'maximal domain': 'functions.domain',
  'hybrid function': 'functions.domain',
  'inverse function': 'functions.domain',
  'sketch inverse': 'functions.domain',
  'sketch graph': c =>
    c === 'functions' || c === 'graphs' ? 'functions.rational'
      : c === 'differential equations' ? 'de.models'
        : c === 'vectors' ? 'vectors.motion'
          : 'calculus.shape',
  'partial fractions': c =>
    c === 'functions' ? 'functions.rational' : c === 'differential equations' ? 'de.models' : 'calculus.integ',
  // Calculus
  'implicit differentiation': 'calculus.diff',
  'parametric derivative': 'calculus.diff',
  'parametric tangent': 'calculus.diff',
  'tangent lines': 'calculus.diff',
  'tangent gradient': 'calculus.diff',
  'angle between tangents': 'calculus.diff',
  'angle between curves': 'calculus.diff',
  'derivative identity': 'calculus.diff',
  'arctan derivative': 'calculus.diff',
  'chain rule': 'calculus.diff',
  'product rule': 'calculus.diff',
  derivative: 'calculus.diff',
  gradient: 'calculus.diff',
  'gradient values': 'calculus.diff',
  'limiting gradient': 'calculus.diff',
  continuity: 'calculus.diff',
  'smooth join': 'calculus.diff',
  'stationary point': c => (c === 'functions' ? 'functions.rational' : 'calculus.shape'),
  'stationary points': c => (c === 'functions' ? 'functions.rational' : 'calculus.shape'),
  'turning point': c => (c === 'functions' ? 'functions.rational' : 'calculus.shape'),
  'turning points': c => (c === 'functions' ? 'functions.rational' : 'calculus.shape'),
  'point of inflection': c => (c === 'functions' ? 'functions.rational' : 'calculus.shape'),
  'inflection points': 'calculus.shape',
  'inflection count': 'calculus.shape',
  'second derivative': c => (c === 'differential equations' ? 'de.models' : 'calculus.shape'),
  'no inflection': c => (c === 'differential equations' ? 'de.models' : 'calculus.shape'),
  'volume of revolution': 'calculus.solids',
  'arc length': 'calculus.solids',
  'surface area': 'calculus.solids',
  'efficiency ratio': 'calculus.solids',
  'area under curve': 'calculus.area',
  'area enclosed': 'calculus.area',
  substitution: 'calculus.integ',
  antiderivative: 'calculus.integ',
  'definite integral': 'calculus.integ',
  'arctan integral': 'calculus.integ',
  'algebraic identity': 'calculus.integ',
  'related rates': 'calculus.rates',
  'maximum rate': 'calculus.rates',
  'time to fill': 'calculus.rates',
  'cone volume': 'calculus.rates',
  'limiting area': 'calculus.rates',
  'clean-up time': 'calculus.rates',
  // Differential equations
  'separable de': 'de.solve',
  'verify solution': 'de.solve',
  'time integral': c => (c === 'differential equations' || c === 'related rates' ? 'de.solve' : null),
  'mixing problem': 'de.models',
  concentration: 'de.models',
  'logistic solution': 'de.models',
  'logistic model': 'de.models',
  'sketch logistic': 'de.models',
  'maximum growth': 'de.models',
  harvesting: 'de.models',
  'exponential growth': 'de.models',
  'growth condition': 'de.models',
  equilibrium: 'de.models',
  'limiting value': 'de.models',
  "euler's method": 'de.euler',
  'slope field': 'de.euler',
  // Statistics
  'sample mean': 'stats.mean',
  'difference of means': 'stats.mean',
  'standard deviation': 'stats.mean',
  'find standard deviation': 'stats.lin',
  'linear combination': 'stats.lin',
  'sum of normals': 'stats.lin',
  'difference of normals': 'stats.lin',
  'normal distribution': 'stats.lin',
  'expected value': 'stats.lin',
  variance: 'stats.lin',
  'confidence interval': 'stats.ci',
  'sample size': 'stats.ci',
  hypotheses: 'stats.test',
  'p-value': 'stats.test',
  conclusion: 'stats.test',
  'critical value': 'stats.test',
  'critical region': 'stats.test',
  'type ii error': 'stats.test',
  'hypothesis test': 'stats.test',
}

const PART_LABELS: Record<AnalysisSubject, Record<string, LabelRule>> = { methods: M_LABELS, specialist: S_LABELS }

// ── Overrides ──────────────────────────────────────────────────────────────────────────────
// Keyed by question id, or "id:letter" for one part of a short answer. Hand-checked against
// the question itself.

const OVERRIDES: Record<string, string> = {
  // Methods
  'meth-q9-2022': 'algebra.coord',
  'meth-q1-2025': 'functions.circular',
  'meth-q10-2025': 'algebra.trigeq',
  'meth-q17-2022': 'diff.shape',
  'meth-q10-2024': 'diff.shape',
  'meth-q11-2016': 'functions.composite',
  'meth-q13-2017': 'functions.composite',
  'meth-q4-2021': 'diff.optim',
  'meth-q3-2025-e1:a': 'functions.circular',
  'meth-q3-2025-e1:c': 'functions.circular',
  'meth-q5-2020-e2:b': 'diff.tangents',
  'meth-q1-2024-e2:a': 'algebra.poly',
  'meth-q4-2025-e2:a': 'functions.circular',
  'meth-q4-2025-e2:g.i': 'algebra.poly',
  'meth-q3-2014-e2': 'diff.rates',
  'meth-q3-2014-e2:b.i': 'algebra.systems',
  'meth-q3-2014-e2:b.ii': 'algebra.systems',
  'meth-q3-2014-e2:d': 'diff.shape',
  'meth-q7-2022-e1': 'integ.area',
  'meth-q3-2022-e2:b.ii': 'prob.continuous',
  'meth-q1-2020-e2:a': 'algebra.poly',
  // Specialist
  'spec-q6-2015': 'complex.loci',
  'spec-q6-2014': 'complex.algebra',
  'spec-q4-2019': 'complex.algebra',
  'spec-q6-2025': 'complex.algebra',
  'spec-q1-2020': 'functions.rational',
  'spec-q14-2020': 'vectors.algebra',
  'spec-q14-2021': 'kinematics.line',
  'spec-q14-2023': 'vectors.space',
  'spec-q7-2014-e1:a': 'functions.circular',
  'spec-q8-2015-e1:b.i': 'functions.circular',
  'spec-q8-2015-e1:b.ii': 'functions.circular',
  'spec-q3-2017-e2:b': 'functions.circular',
  'spec-q1-2018-e2:a': 'functions.circular',
  'spec-q1-2018-e2:b': 'functions.circular',
  'spec-q1-2018-e2:e.i': 'functions.circular',
  'spec-q1-2018-e2:e.ii': 'functions.circular',
  'spec-q1-2018-e2:e.iii': 'functions.circular',
  'spec-q3-2015-e2:c.ii': 'functions.relations',
  'spec-q1-2019-e2:b': 'functions.relations',
  'spec-q1-2019-e2:d': 'functions.relations',
  'spec-q9-2018-e1:b': 'functions.relations',
  'spec-q1-2023-e2': 'calculus.diff',
  'spec-q1-2023-e2:e': 'functions.relations',
  'spec-q3-2020-e2:b': 'calculus.shape',
  'spec-q1-2020-e2:a': 'vectors.motion',
  'spec-q2-2015-e2': 'complex.loci',
  'spec-q2-2022-e2': 'complex.loci',
  'spec-q2-2022-e2:a.i': 'complex.roots',
  'spec-q2-2022-e2:a.ii': 'complex.roots',
  'spec-q2-2023-e2:e': 'complex.roots',
  'spec-q3-2018-e2:d': 'de.solve',
  'spec-q3-2022-e2:b.i': 'de.models',
  'spec-q3-2025-e2': 'de.models',
  // Resisted motion set up as a differential equation: the motion is the point, not the DE.
  'spec-q5-2015-e2:d.ii': 'kinematics.line',
  'spec-q5-2015-e2:d.iv': 'kinematics.line',
  'spec-q2-2017-e2:d.i': 'kinematics.line',
  'spec-q2-2017-e2:d.ii': 'kinematics.line',
  'spec-q5-2018-e2:e.i': 'kinematics.line',
  'spec-q5-2018-e2:e.ii': 'kinematics.line',
}

// ── Classifier ─────────────────────────────────────────────────────────────────────────────

/** "Complex Numbers — Argand diagram parallelogram" → "complex numbers". */
export function categoryKey(topicText: string): string {
  return topicText.split('—')[0].trim().toLowerCase()
}

function descriptionOf(topicText: string): string {
  const i = topicText.indexOf('—')
  return i === -1 ? topicText : topicText.slice(i + 1).trim()
}

/** The subtopic a whole question falls under, from its description and category. */
export function questionSubtopic(subject: AnalysisSubject, id: string, topicText: string): string {
  const override = OVERRIDES[id]
  if (override) return override
  const cat = categoryKey(topicText)
  const set = RULES[subject][cat] ?? RULES[subject]['*']
  const desc = descriptionOf(topicText)
  for (const [re, sub] of set.rules) if (re.test(desc)) return sub
  return set.fallback
}

/** The subtopic one part of a short-answer question falls under. */
export function partSubtopic(subject: AnalysisSubject, id: string, letter: string, label: string | undefined, topicText: string): string {
  const override = OVERRIDES[`${id}:${letter}`]
  if (override) return override
  if (label) {
    const rule = PART_LABELS[subject][label.toLowerCase()]
    const sub = typeof rule === 'function' ? rule(categoryKey(topicText)) : rule
    if (sub) return sub
  }
  return questionSubtopic(subject, id, topicText)
}

/** Every subtopic id the taxonomy knows, for checking the rules only ever name real ones. */
export function knownSubtopics(subject: AnalysisSubject): Set<string> {
  return new Set(TAXONOMY[subject].flatMap(t => t.subtopics.map(s => s.id)))
}
