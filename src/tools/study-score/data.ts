// VCAA grade distributions for the end-of-year exams, 2014–2025, from VCAA's statistics PDFs
// (`source`): the graded assessments that are exams, in each subject. 2014–2016 use an older PDF
// layout: 2016 maths and Chemistry were assembled by hand from the cumulative rows, and the rest of
// 2014–2016 was read from the PDFs by word position, a method that reproduces those hand-built
// tables exactly. Scores are on VCAA's GA scale, which is not always the raw marks: Methods and
// Specialist Exam 1 out of 80 (raw 40) and Exam 2 out of 160 (raw 80); General Maths (Further
// Maths up to 2022) Exam 1 out of 80 (raw 40) and Exam 2 out of 120 (raw 60); Chemistry out of 240
// (raw 120); English out of 60 (raw 60); Accounting out of 200 (raw 100); Economics out of 180
// (raw 90) in 2014–2016, then 160 (raw 80); Japanese Second Language's oral and written exams as
// one score out of 400, a quarter from the oral (raw 40) and three quarters from the written
// (raw 75), their 12.5% and 37.5% shares of the study score.
// The model turns a mark into a GA score by its share of the paper, so it never assumes a scale.

export type Subject = 'methods' | 'specialist' | 'general' | 'chemistry' | 'english' | 'accounting' | 'economics' | 'japanese'

export interface ExamInfo {
  label: string
  /** Short label for tight spots: "E1". */
  short: string
  /** Raw marks the paper is out of (on the current paper; see `older`). */
  rawMax: number
  /** Which of the year's graded assessments (`YearDist.exams`) this mark feeds. Default: its own
   *  position, one mark per graded assessment. */
  ga?: number
  /** The share of that graded assessment this mark makes up. Default 1. Japanese's oral and
   *  written exams are one graded assessment, a quarter and three quarters of it. */
  share?: number
  /** Older papers out of a different total (Economics was out of 90 up to 2016). */
  older?: { upTo: number; rawMax: number }
}

export interface SubjectInfo {
  name: string
  /** For the subject switch. */
  label: string
  exams: ExamInfo[]
  /** The marks aren't worth the same on every paper (Japanese: an oral mark is worth less than a
   *  written one), so totals are counted as a weighted percentage of the exam, not in marks. */
  weighted?: boolean
}

export const SUBJECTS: Record<Subject, SubjectInfo> = {
  methods: {
    name: 'Mathematical Methods',
    label: 'Methods',
    exams: [
      { label: 'Exam 1', short: 'E1', rawMax: 40 },
      { label: 'Exam 2', short: 'E2', rawMax: 80 },
    ],
  },
  specialist: {
    name: 'Specialist Mathematics',
    label: 'Specialist',
    exams: [
      { label: 'Exam 1', short: 'E1', rawMax: 40 },
      { label: 'Exam 2', short: 'E2', rawMax: 80 },
    ],
  },
  general: {
    name: 'General Mathematics',
    label: 'General Maths',
    exams: [
      { label: 'Exam 1', short: 'E1', rawMax: 40 },
      { label: 'Exam 2', short: 'E2', rawMax: 60 },
    ],
  },
  chemistry: {
    name: 'Chemistry',
    label: 'Chemistry',
    exams: [{ label: 'Exam', short: 'Exam', rawMax: 120 }],
  },
  english: {
    name: 'English',
    label: 'English',
    exams: [{ label: 'Exam', short: 'Exam', rawMax: 60 }],
  },
  accounting: {
    name: 'Accounting',
    label: 'Accounting',
    exams: [{ label: 'Exam', short: 'Exam', rawMax: 100 }],
  },
  economics: {
    name: 'Economics',
    label: 'Economics',
    exams: [{ label: 'Exam', short: 'Exam', rawMax: 80, older: { upTo: 2016, rawMax: 90 } }],
  },
  japanese: {
    name: 'Japanese Second Language',
    label: 'Japanese',
    exams: [
      { label: 'Oral', short: 'Oral', rawMax: 40, ga: 0, share: 0.25 },
      { label: 'Written', short: 'Written', rawMax: 75, ga: 0, share: 0.75 },
    ],
    weighted: true,
  },
}

/** The exams as they were on a given year's paper (Economics 2014–2016 was out of 90). */
export function examsFor(subject: Subject, year: number): ExamInfo[] {
  return SUBJECTS[subject].exams.map(e => (e.older && year <= e.older.upTo ? { ...e, rawMax: e.older.rawMax } : e))
}

/** Subjects whose papers aren't all called by the subject's name. */
export const OLDER_NAME: Partial<Record<Subject, { upTo: number; name: string }>> = {
  general: { upTo: 2022, name: 'Further Mathematics' },
}

export const SUBJECT_IDS = Object.keys(SUBJECTS) as Subject[]

/** The first paper on each subject's current study design. */
export const CURRENT_DESIGN_FROM: Record<Subject, number> = {
  methods: 2023,
  specialist: 2023,
  general: 2023,
  chemistry: 2024,
  english: 2024,
  accounting: 2019,
  economics: 2023,
  japanese: 2020,
}

/** The last paper whose course had topics the Skip Guide tells students to skip. For Specialist
 *  and Chemistry that is every paper before the current design; each is on an older design, not
 *  always the one just before (Chemistry's 2014–2016 papers are on the 2013–2016 design, two back). Methods
 *  also changed in 2023, but the Skip Guide finds nothing to skip on its 2016–2022 papers; only
 *  the Mathematical Methods (CAS) papers of 2014–2015 (matrices, modulus graphs) are flagged. */
export const OLD_COURSE_UP_TO: Record<Subject, number | null> = {
  methods: 2015,
  specialist: 2022,
  chemistry: 2023,
  // No Skip Guide for these.
  general: null,
  english: null,
  accounting: null,
  economics: null,
  japanese: null,
}

export function isOldCourse(subject: Subject, year: number): boolean {
  const last = OLD_COURSE_UP_TO[subject]
  return last !== null && year <= last
}

/** The first paper after the flagged ones, or null when the subject isn't flagged. */
export function currentCourseFrom(subject: Subject): number | null {
  const last = OLD_COURSE_UP_TO[subject]
  return last === null ? null : last + 1
}

/** What to call the papers after the flagged ones: "Current Course" only when they really are
 *  the current study design (Specialist, Chemistry); for Methods, 2016–2025 span two designs, so
 *  they go unlabelled and only the older papers get a label. */
export function newerCourseLabel(subject: Subject): string | null {
  return currentCourseFrom(subject) === CURRENT_DESIGN_FROM[subject] ? 'Current Course' : null
}

export interface ExamDist {
  max: number
  bands: [number, number, number][]
}

export interface YearDist {
  year: number
  /** One per exam, in SUBJECTS order. */
  exams: ExamDist[]
  source: string
}

export const DISTRIBUTIONS: Record<Subject, YearDist[]> = {
  methods: [
    {
      year: 2014,
      exams: [
        { max: 80, bands: [[0, 1, 239], [2, 3, 180], [4, 7, 389], [8, 15, 834], [16, 24, 1288], [25, 35, 1973], [36, 45, 2299], [46, 55, 2657], [56, 64, 2371], [65, 72, 1982], [73, 80, 1400]] },
        { max: 160, bands: [[0, 10, 95], [11, 18, 308], [19, 28, 728], [29, 37, 900], [38, 48, 1366], [49, 61, 1837], [62, 77, 2182], [78, 96, 2488], [97, 114, 2146], [115, 134, 1971], [135, 160, 1593]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2014/section3/vce_mathematical_methods_cas_ga14.pdf',
    },
    {
      year: 2015,
      exams: [
        { max: 80, bands: [[0, 1, 214], [2, 3, 247], [4, 7, 494], [8, 13, 830], [14, 21, 1315], [22, 31, 1943], [32, 42, 2342], [43, 54, 2685], [55, 64, 2344], [65, 73, 1860], [74, 80, 1427]] },
        { max: 160, bands: [[0, 8, 80], [9, 14, 266], [15, 24, 733], [25, 34, 869], [35, 48, 1380], [49, 64, 1826], [65, 81, 2199], [82, 100, 2529], [101, 117, 2207], [118, 134, 1975], [135, 160, 1633]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2015/section3/vce_mathematical_methods_cas_ga15.pdf',
    },
    {
      year: 2016,
      exams: [
        { max: 80, bands: [[0, 3, 278], [4, 6, 279], [7, 10, 501], [11, 16, 947], [17, 22, 1215], [23, 29, 1827], [30, 36, 2188], [37, 45, 2606], [46, 55, 2476], [56, 67, 1984], [68, 80, 1420]] },
        { max: 160, bands: [[0, 7, 43], [8, 16, 382], [17, 26, 738], [27, 35, 849], [36, 46, 1335], [47, 60, 1874], [61, 75, 2189], [76, 94, 2536], [95, 112, 2244], [113, 130, 1946], [131, 160, 1589]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2016/section3/vce_mathematical_methods_ga16.pdf',
    },
    {
      year: 2017,
      exams: [
        { max: 80, bands: [[0, 2, 235], [3, 5, 278], [6, 9, 473], [10, 15, 881], [16, 21, 1251], [22, 29, 1983], [30, 37, 2355], [38, 46, 2608], [47, 56, 2341], [57, 68, 1987], [69, 80, 1450]] },
        { max: 160, bands: [[0, 11, 112], [12, 18, 285], [19, 30, 732], [31, 41, 878], [42, 54, 1364], [55, 69, 1918], [70, 83, 2221], [84, 97, 2481], [98, 110, 2159], [111, 125, 2039], [126, 160, 1656]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2017/section3/vce_mathematical_methods_ga17.pdf',
    },
    {
      year: 2018,
      exams: [
        { max: 80, bands: [[0, 4, 360], [5, 8, 407], [9, 12, 472], [13, 18, 891], [19, 25, 1234], [26, 33, 1935], [34, 40, 2334], [41, 48, 2549], [49, 57, 2394], [58, 67, 2210], [68, 80, 1495]] },
        { max: 160, bands: [[0, 11, 126], [12, 18, 337], [19, 28, 720], [29, 38, 958], [39, 50, 1446], [51, 64, 1972], [65, 79, 2324], [80, 95, 2620], [96, 109, 2179], [110, 125, 2011], [126, 160, 1583]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2018/section3/vce_mathematical_methods_ga18.pdf',
    },
    {
      year: 2019,
      exams: [
        { max: 80, bands: [[0, 6, 338], [7, 10, 316], [11, 14, 463], [15, 19, 764], [20, 25, 1292], [26, 32, 2012], [33, 40, 2335], [41, 49, 2519], [50, 52, 936], [53, 66, 3301], [67, 80, 1339]] },
        { max: 160, bands: [[0, 8, 109], [9, 16, 360], [17, 27, 681], [28, 36, 929], [37, 48, 1330], [49, 63, 1831], [64, 79, 2221], [80, 97, 2453], [98, 114, 2231], [115, 132, 1950], [133, 160, 1515]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2019/section3/vce_mathematical_methods_ga19.pdf',
    },
    {
      year: 2020,
      exams: [
        { max: 80, bands: [[0, 3, 353], [4, 7, 354], [8, 11, 501], [12, 16, 852], [17, 22, 1254], [23, 30, 1983], [31, 38, 2336], [39, 47, 2464], [48, 55, 2158], [56, 65, 2165], [66, 80, 1386]] },
        { max: 160, bands: [[0, 9, 114], [10, 16, 359], [17, 27, 720], [28, 36, 911], [37, 47, 1356], [48, 59, 1815], [60, 73, 2189], [74, 89, 2523], [90, 105, 2235], [106, 122, 2040], [123, 160, 1543]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2020/section3/vce_mathematical_methods_ga20.pdf',
    },
    {
      year: 2021,
      exams: [
        { max: 80, bands: [[0, 1, 263], [2, 6, 411], [7, 10, 494], [11, 15, 746], [16, 21, 1207], [22, 28, 2002], [29, 36, 2439], [37, 45, 2571], [46, 53, 2100], [54, 63, 2063], [64, 80, 1436]] },
        { max: 160, bands: [[0, 11, 155], [12, 18, 340], [19, 29, 719], [30, 38, 930], [39, 49, 1320], [50, 62, 1855], [63, 77, 2213], [78, 93, 2422], [94, 109, 2133], [110, 128, 2082], [129, 160, 1563]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2021/section3/vce_mathematical_methods_ga21.pdf',
    },
    {
      year: 2022,
      exams: [
        { max: 80, bands: [[0, 5, 283], [6, 10, 508], [11, 14, 521], [15, 19, 733], [20, 25, 1169], [26, 33, 1841], [34, 42, 2209], [43, 53, 2417], [54, 63, 2045], [64, 72, 1875], [73, 80, 1227]] },
        { max: 160, bands: [[0, 15, 147], [16, 28, 384], [29, 40, 722], [41, 50, 895], [51, 61, 1217], [62, 74, 1782], [75, 88, 2038], [89, 104, 2248], [105, 121, 2072], [122, 138, 1921], [139, 160, 1404]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2022/section3/vce_mathematical_methods_ga22.pdf',
    },
    {
      year: 2023,
      exams: [
        { max: 80, bands: [[0, 3, 264], [4, 7, 343], [8, 11, 469], [12, 16, 886], [17, 22, 1194], [23, 31, 1742], [32, 39, 1993], [40, 51, 2567], [52, 63, 2229], [64, 72, 1678], [73, 80, 1140]] },
        { max: 160, bands: [[0, 11, 184], [12, 18, 389], [19, 26, 620], [27, 35, 812], [36, 45, 1275], [46, 57, 1743], [58, 70, 2033], [71, 85, 2213], [86, 101, 2001], [102, 121, 1843], [122, 160, 1388]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2023/section3/vce_mathematical_methods_ga23.pdf',
    },
    {
      year: 2024,
      exams: [
        { max: 80, bands: [[0, 3, 333], [4, 6, 510], [7, 10, 616], [11, 15, 767], [16, 20, 1318], [21, 27, 1536], [28, 34, 2223], [35, 45, 2616], [46, 55, 2247], [56, 65, 1749], [66, 80, 1416]] },
        { max: 160, bands: [[0, 13, 125], [14, 21, 283], [22, 31, 639], [32, 40, 950], [41, 50, 1331], [51, 63, 1756], [64, 76, 2229], [77, 93, 2347], [94, 110, 2189], [111, 132, 2039], [133, 160, 1441]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/2025-08/vce_mathematical_methods_ga24.pdf',
    },
    {
      year: 2025,
      exams: [
        { max: 80, bands: [[0, 3, 331], [4, 7, 387], [8, 12, 683], [13, 18, 815], [19, 27, 1390], [28, 35, 1598], [36, 45, 2341], [46, 55, 2761], [56, 63, 2213], [64, 71, 2081], [72, 80, 1440]] },
        { max: 160, bands: [[0, 15, 205], [16, 23, 333], [24, 33, 670], [34, 44, 999], [45, 56, 1302], [57, 71, 1861], [72, 86, 2308], [87, 103, 2558], [104, 120, 2294], [121, 139, 2031], [140, 160, 1483]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/2026-04/vce_mathematical_methods_ga25.pdf',
    },
  ],
  specialist: [
    {
      year: 2014,
      exams: [
        { max: 80, bands: [[0, 3, 78], [4, 7, 98], [8, 12, 131], [13, 22, 294], [23, 32, 394], [33, 43, 557], [44, 54, 705], [55, 63, 651], [64, 69, 571], [70, 74, 560], [75, 80, 377]] },
        { max: 160, bands: [[0, 15, 18], [16, 33, 99], [34, 51, 219], [52, 66, 295], [67, 84, 469], [85, 100, 564], [101, 115, 661], [116, 127, 633], [128, 137, 571], [138, 146, 497], [147, 160, 385]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2014/section3/vce_specialist_mathematics_ga14.pdf',
    },
    {
      year: 2015,
      exams: [
        { max: 80, bands: [[0, 4, 94], [5, 8, 107], [9, 14, 161], [15, 22, 259], [23, 32, 393], [33, 42, 568], [43, 52, 658], [53, 60, 641], [61, 67, 568], [68, 73, 508], [74, 80, 423]] },
        { max: 160, bands: [[0, 11, 11], [12, 23, 87], [24, 39, 216], [40, 53, 309], [54, 69, 477], [70, 85, 583], [86, 101, 683], [102, 115, 631], [116, 127, 524], [128, 139, 484], [140, 160, 377]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2015/section3/vce_specialist_mathematics_ga15.pdf',
    },
    {
      year: 2016,
      exams: [
        { max: 80, bands: [[0, 5, 64], [6, 9, 93], [10, 14, 145], [15, 22, 274], [23, 31, 379], [32, 41, 523], [42, 51, 703], [52, 59, 638], [60, 66, 604], [67, 73, 516], [74, 80, 401]] },
        { max: 160, bands: [[0, 9, 2], [10, 25, 104], [26, 39, 226], [40, 52, 331], [53, 66, 456], [67, 81, 570], [82, 97, 679], [98, 113, 623], [114, 127, 545], [128, 141, 438], [142, 160, 364]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2016/section3/vce_specialist_mathematics_ga16.pdf',
    },
    {
      year: 2017,
      exams: [
        { max: 80, bands: [[0, 2, 78], [3, 4, 72], [5, 7, 118], [8, 13, 273], [14, 20, 398], [21, 28, 535], [29, 39, 743], [40, 49, 667], [50, 59, 625], [60, 68, 557], [69, 80, 397]] },
        { max: 160, bands: [[0, 15, 23], [16, 27, 100], [28, 40, 222], [41, 50, 314], [51, 63, 493], [64, 76, 561], [77, 91, 722], [92, 104, 626], [105, 117, 541], [118, 131, 483], [132, 160, 377]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2017/section3/vce_specialist_mathematics_ga17.pdf',
    },
    {
      year: 2018,
      exams: [
        { max: 80, bands: [[0, 5, 49], [6, 10, 96], [11, 18, 182], [19, 28, 321], [29, 36, 396], [37, 44, 546], [45, 51, 686], [52, 57, 620], [58, 62, 552], [63, 68, 521], [69, 80, 418]] },
        { max: 160, bands: [[0, 12, 27], [13, 19, 54], [20, 33, 218], [34, 47, 312], [48, 64, 485], [65, 81, 588], [82, 99, 702], [100, 115, 634], [116, 129, 549], [130, 141, 442], [142, 160, 379]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2018/section3/vce_specialist_mathematics_ga18.pdf',
    },
    {
      year: 2019,
      exams: [
        { max: 80, bands: [[0, 3, 40], [4, 9, 87], [10, 17, 176], [18, 26, 314], [27, 37, 440], [38, 47, 529], [48, 56, 681], [57, 62, 542], [63, 67, 521], [68, 72, 469], [73, 80, 352]] },
        { max: 160, bands: [[0, 7, 8], [8, 16, 71], [17, 28, 213], [29, 41, 303], [42, 58, 466], [59, 73, 530], [74, 89, 677], [90, 102, 586], [103, 115, 509], [116, 129, 439], [130, 160, 349]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2019/section3/vce_specialist_mathematics_ga19.pdf',
    },
    {
      year: 2020,
      exams: [
        { max: 80, bands: [[0, 5, 81], [6, 12, 108], [13, 18, 164], [19, 25, 284], [26, 32, 374], [33, 40, 508], [41, 49, 650], [50, 56, 565], [57, 63, 546], [64, 70, 469], [71, 80, 368]] },
        { max: 160, bands: [[0, 15, 20], [16, 28, 79], [29, 44, 209], [45, 60, 302], [61, 76, 460], [77, 91, 520], [92, 107, 636], [108, 121, 590], [122, 133, 513], [134, 144, 451], [145, 160, 338]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2020/section3/vce_specialist_mathematics_ga20.pdf',
    },
    {
      year: 2021,
      exams: [
        { max: 80, bands: [[0, 4, 82], [5, 10, 85], [11, 17, 149], [18, 26, 290], [27, 34, 354], [35, 43, 495], [44, 52, 650], [53, 58, 532], [59, 64, 530], [65, 71, 497], [72, 80, 323]] },
        { max: 160, bands: [[0, 13, 34], [14, 18, 51], [19, 29, 216], [30, 39, 299], [40, 51, 452], [52, 62, 498], [63, 75, 641], [76, 88, 548], [89, 101, 485], [102, 116, 423], [117, 160, 339]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2021/section3/vce_specialist_mathematics_ga21.pdf',
    },
    {
      year: 2022,
      exams: [
        { max: 80, bands: [[0, 3, 66], [4, 7, 79], [8, 12, 130], [13, 21, 271], [22, 31, 377], [32, 42, 507], [43, 53, 584], [54, 61, 519], [62, 69, 497], [70, 75, 427], [76, 80, 318]] },
        { max: 160, bands: [[0, 13, 24], [14, 21, 57], [22, 37, 199], [38, 51, 276], [52, 66, 413], [67, 81, 491], [82, 99, 592], [100, 114, 536], [115, 129, 471], [130, 142, 397], [143, 160, 317]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2022/section3/vce_specialist_mathematics_ga22.pdf',
    },
    {
      year: 2023,
      exams: [
        { max: 80, bands: [[0, 6, 72], [7, 10, 93], [11, 15, 129], [16, 22, 232], [23, 31, 317], [32, 41, 440], [42, 51, 569], [52, 59, 521], [60, 66, 496], [67, 73, 427], [74, 80, 278]] },
        { max: 160, bands: [[0, 15, 21], [16, 25, 61], [26, 41, 203], [42, 55, 270], [56, 69, 405], [70, 84, 454], [85, 100, 572], [101, 115, 506], [116, 126, 431], [127, 138, 359], [139, 160, 292]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2023/section3/vce_specialist_mathematics_ga23.pdf',
    },
    {
      year: 2024,
      exams: [
        { max: 80, bands: [[0, 5, 61], [6, 8, 75], [9, 14, 149], [15, 22, 263], [23, 30, 362], [31, 39, 443], [40, 49, 590], [50, 57, 526], [58, 65, 489], [66, 72, 453], [73, 80, 268]] },
        { max: 160, bands: [[0, 15, 30], [16, 24, 71], [25, 37, 192], [38, 49, 255], [50, 65, 410], [66, 80, 458], [81, 98, 595], [99, 112, 513], [113, 126, 490], [127, 140, 396], [141, 160, 269]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/2025-08/vce_specialist_mathematics_ga24.pdf',
    },
    {
      year: 2025,
      exams: [
        { max: 80, bands: [[0, 4, 60], [5, 10, 118], [11, 16, 167], [17, 25, 281], [26, 34, 384], [35, 43, 497], [44, 51, 627], [52, 59, 593], [60, 67, 566], [68, 74, 427], [75, 80, 298]] },
        { max: 160, bands: [[0, 15, 14], [16, 29, 76], [30, 47, 235], [48, 64, 314], [65, 83, 456], [84, 99, 522], [100, 116, 630], [117, 130, 577], [131, 141, 483], [142, 150, 408], [151, 160, 303]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/2026-04/vce_specialist_mathematics_ga25.pdf',
    },
  ],
  chemistry: [
    {
      year: 2014,
      exams: [
        { max: 240, bands: [[0, 15, 18], [16, 27, 128], [28, 44, 443], [45, 62, 697], [63, 84, 1043], [85, 106, 1314], [107, 132, 1543], [133, 156, 1429], [157, 178, 1241], [179, 199, 1059], [200, 240, 858]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2014/section3/vce_chemistry_ga14.pdf',
    },
    {
      year: 2015,
      exams: [
        { max: 240, bands: [[0, 19, 31], [20, 34, 181], [35, 49, 403], [50, 68, 677], [69, 91, 1059], [92, 116, 1328], [117, 144, 1593], [145, 169, 1431], [170, 190, 1225], [191, 209, 1067], [210, 240, 853]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2015/section3/vce_chemistry_ga15.pdf',
    },
    {
      year: 2016,
      exams: [
        { max: 240, bands: [[0, 15, 5], [16, 37, 181], [38, 54, 498], [55, 71, 724], [72, 91, 1063], [92, 112, 1277], [113, 137, 1614], [138, 159, 1424], [160, 178, 1231], [179, 197, 1071], [198, 240, 868]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2016/section3/vce_chemistry_ga16.pdf',
    },
    {
      year: 2017,
      exams: [
        { max: 240, bands: [[0, 21, 49], [22, 31, 164], [32, 48, 479], [49, 66, 746], [67, 87, 1092], [88, 111, 1362], [112, 136, 1632], [137, 155, 1445], [156, 172, 1258], [173, 189, 1109], [190, 240, 901]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2017/section3/vce_chemistry_ga17.pdf',
    },
    {
      year: 2018,
      exams: [
        { max: 240, bands: [[0, 23, 44], [24, 33, 146], [34, 48, 452], [49, 64, 683], [65, 85, 1147], [86, 108, 1335], [109, 134, 1669], [135, 156, 1474], [157, 175, 1311], [176, 193, 1063], [194, 240, 912]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2018/section3/vce_chemistry_ga18.pdf',
    },
    {
      year: 2019,
      exams: [
        { max: 240, bands: [[0, 9, 3], [10, 25, 117], [26, 42, 487], [43, 56, 694], [57, 75, 1145], [76, 94, 1325], [95, 118, 1627], [119, 139, 1415], [140, 158, 1167], [159, 178, 1004], [179, 240, 802]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2019/section3/vce_chemistry_ga19.pdf',
    },
    {
      year: 2020,
      exams: [
        { max: 240, bands: [[0, 21, 52], [22, 30, 149], [31, 44, 464], [45, 60, 746], [61, 80, 1118], [81, 101, 1364], [102, 125, 1641], [126, 145, 1483], [146, 163, 1230], [164, 181, 1086], [182, 240, 875]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2020/section3/vce_chemistry_ga20.pdf',
    },
    {
      year: 2021,
      exams: [
        { max: 240, bands: [[0, 18, 63], [19, 26, 139], [27, 41, 503], [42, 57, 748], [58, 77, 1128], [78, 99, 1411], [100, 125, 1706], [126, 146, 1463], [147, 165, 1292], [166, 185, 1078], [186, 240, 918]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2021/section3/vce_chemistry_ga21.pdf',
    },
    {
      year: 2022,
      exams: [
        { max: 240, bands: [[0, 18, 76], [19, 25, 124], [26, 38, 473], [39, 54, 729], [55, 76, 1180], [77, 99, 1368], [100, 125, 1670], [126, 147, 1511], [148, 167, 1261], [168, 188, 1107], [189, 240, 899]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2022/section3/vce_chemistry_ga22.pdf',
    },
    {
      year: 2023,
      exams: [
        { max: 240, bands: [[0, 21, 40], [22, 28, 106], [29, 44, 443], [45, 60, 642], [61, 83, 1136], [84, 107, 1337], [108, 132, 1619], [133, 154, 1463], [155, 172, 1214], [173, 190, 1032], [191, 240, 871]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2023/section3/vce_chemistry_ga23.pdf',
    },
    {
      year: 2024,
      exams: [
        { max: 240, bands: [[0, 23, 63], [24, 32, 138], [33, 49, 455], [50, 66, 724], [67, 89, 1164], [90, 110, 1397], [111, 134, 1673], [135, 154, 1451], [155, 172, 1288], [173, 190, 1072], [191, 240, 834]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/2025-08/vce_chemistry_ga24.pdf',
    },
    {
      year: 2025,
      exams: [
        { max: 240, bands: [[0, 23, 68], [24, 31, 124], [32, 48, 483], [49, 64, 750], [65, 84, 1239], [85, 105, 1456], [106, 129, 1719], [130, 149, 1560], [150, 167, 1376], [168, 186, 1155], [187, 240, 943]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/2026-04/vce_chemistry_ga25.pdf',
    },
  ],
  general: [
    {
      year: 2014,
      exams: [
        { max: 80, bands: [[0, 7, 3], [8, 15, 121], [16, 22, 879], [23, 30, 2486], [31, 36, 2988], [37, 42, 3513], [43, 50, 5067], [51, 58, 4738], [59, 66, 4144], [67, 72, 2541], [73, 80, 2000]] },
        { max: 120, bands: [[0, 9, 177], [10, 18, 712], [19, 27, 1421], [28, 35, 2066], [36, 45, 3220], [46, 55, 3822], [56, 67, 4494], [68, 79, 4094], [80, 90, 3207], [91, 102, 2928], [103, 120, 2253]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2014/section3/vce_further_mathematics_ga14.pdf',
    },
    {
      year: 2015,
      exams: [
        { max: 80, bands: [[0, 7, 7], [8, 12, 59], [13, 22, 1038], [23, 31, 2512], [32, 37, 2821], [38, 43, 3348], [44, 52, 5585], [53, 61, 4442], [62, 68, 4073], [69, 74, 2624], [75, 80, 2057]] },
        { max: 120, bands: [[0, 7, 85], [8, 17, 503], [18, 27, 1332], [28, 37, 2130], [38, 48, 3303], [49, 60, 3894], [61, 74, 4747], [75, 86, 3856], [87, 97, 3410], [98, 108, 3022], [109, 120, 2238]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2015/section3/vce_further_mathematics_ga15.pdf',
    },
    {
      year: 2016,
      exams: [
        { max: 80, bands: [[0, 9, 15], [10, 15, 175], [16, 21, 695], [22, 29, 2306], [30, 35, 2692], [36, 41, 3422], [42, 49, 5087], [50, 57, 4709], [58, 65, 4139], [66, 71, 2714], [72, 80, 2562]] },
        { max: 120, bands: [[0, 9, 209], [10, 18, 811], [19, 27, 1296], [28, 35, 1895], [36, 44, 3055], [45, 54, 3494], [55, 67, 4454], [68, 79, 4119], [80, 91, 3660], [92, 102, 3106], [103, 120, 2363]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2016/section3/vce_further_mathematics_ga16.pdf',
    },
    {
      year: 2017,
      exams: [
        { max: 80, bands: [[0, 7, 6], [8, 14, 129], [15, 21, 523], [22, 29, 1972], [30, 35, 2794], [36, 40, 3596], [41, 49, 5238], [50, 56, 4936], [57, 65, 4273], [66, 73, 3467], [74, 80, 2677]] },
        { max: 120, bands: [[0, 9, 91], [10, 15, 234], [16, 25, 1006], [26, 35, 2128], [36, 46, 3607], [47, 58, 4054], [59, 72, 4861], [73, 84, 4072], [85, 96, 3830], [97, 108, 3314], [109, 120, 2353]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2017/section3/vce_further_mathematics_ga17.pdf',
    },
    {
      year: 2018,
      exams: [
        { max: 80, bands: [[0, 7, 11], [8, 12, 129], [13, 20, 975], [21, 27, 1974], [28, 33, 2989], [34, 39, 3829], [40, 47, 5352], [48, 55, 4859], [56, 63, 3928], [64, 71, 3135], [72, 80, 2931]] },
        { max: 120, bands: [[0, 11, 103], [12, 24, 656], [25, 36, 1646], [37, 45, 2035], [46, 55, 3402], [56, 65, 3937], [66, 76, 4698], [77, 87, 3961], [88, 97, 3657], [98, 107, 3267], [108, 120, 2687]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2018/section3/vce_further_mathematics_ga18.pdf',
    },
    {
      year: 2019,
      exams: [
        { max: 80, bands: [[0, 7, 2], [8, 9, 9], [10, 19, 584], [20, 27, 2100], [28, 32, 2521], [33, 39, 3065], [40, 49, 5578], [50, 57, 4383], [58, 65, 4088], [66, 73, 3516], [74, 80, 2734]] },
        { max: 120, bands: [[0, 11, 169], [12, 19, 430], [20, 29, 1243], [30, 38, 2167], [39, 49, 3197], [50, 59, 3763], [60, 71, 4433], [72, 82, 4003], [83, 94, 3578], [95, 106, 3190], [107, 120, 2371]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2019/section3/vce_further_mathematics_ga19.pdf',
    },
    {
      year: 2020,
      exams: [
        { max: 80, bands: [[0, 7, 0], [8, 15, 37], [16, 26, 1245], [27, 34, 2600], [35, 40, 2811], [41, 46, 3384], [47, 55, 5072], [56, 62, 5044], [63, 69, 3553], [70, 75, 3013], [76, 80, 2202]] },
        { max: 120, bands: [[0, 11, 105], [12, 20, 436], [21, 30, 1401], [31, 38, 2012], [39, 47, 2942], [48, 56, 3781], [57, 68, 4451], [69, 80, 4187], [81, 92, 3800], [93, 104, 3337], [105, 120, 2480]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2020/section3/vce_further_mathematics_ga20.pdf',
    },
    {
      year: 2021,
      exams: [
        { max: 80, bands: [[0, 7, 1], [8, 12, 23], [13, 21, 770], [22, 27, 1875], [28, 32, 2770], [33, 38, 3595], [39, 47, 5276], [48, 55, 4579], [56, 62, 3924], [63, 70, 3271], [71, 80, 2154]] },
        { max: 120, bands: [[0, 11, 236], [12, 18, 606], [19, 25, 1126], [26, 32, 2043], [33, 41, 2939], [42, 50, 3814], [51, 62, 4572], [63, 73, 3848], [74, 84, 3571], [85, 98, 3297], [99, 120, 2173]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2021/section3/vce_further_mathematics_ga21.pdf',
    },
    {
      year: 2022,
      exams: [
        { max: 80, bands: [[0, 7, 15], [8, 10, 87], [11, 18, 881], [19, 25, 1791], [26, 30, 2626], [31, 37, 3110], [38, 45, 4700], [46, 53, 4553], [54, 60, 3937], [61, 69, 3170], [70, 80, 2580]] },
        { max: 120, bands: [[0, 11, 327], [12, 16, 404], [17, 26, 1327], [27, 36, 2187], [37, 47, 2835], [48, 58, 3705], [59, 73, 4459], [74, 85, 3604], [86, 97, 3464], [98, 107, 2907], [108, 120, 2210]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2022/section3/vce_further_mathematics_ga22.pdf',
    },
    {
      year: 2023,
      exams: [
        { max: 80, bands: [[0, 3, 1], [4, 7, 5], [8, 15, 197], [16, 27, 2192], [28, 33, 2435], [34, 39, 3253], [40, 46, 5008], [47, 55, 4885], [56, 63, 4175], [64, 71, 3348], [72, 80, 2806]] },
        { max: 120, bands: [[0, 5, 61], [6, 11, 217], [12, 23, 1377], [24, 31, 1984], [32, 40, 3208], [41, 51, 3714], [52, 65, 4864], [66, 78, 4285], [79, 91, 3377], [92, 103, 3029], [104, 120, 2174]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2023/section3/vce_general_mathematics_ga23.pdf',
    },
    {
      year: 2024,
      exams: [
        { max: 80, bands: [[0, 7, 10], [8, 10, 22], [11, 16, 296], [17, 26, 2475], [27, 32, 2554], [33, 39, 3219], [40, 47, 4850], [48, 55, 4846], [56, 63, 4444], [64, 71, 3964], [72, 80, 2773]] },
        { max: 120, bands: [[0, 11, 309], [12, 15, 280], [16, 26, 1769], [27, 34, 2183], [35, 44, 3287], [45, 55, 3580], [56, 69, 4811], [70, 81, 4103], [82, 91, 3382], [92, 101, 3190], [102, 120, 2549]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/2025-08/vce_general_mathematics_ga24.pdf',
    },
    {
      year: 2025,
      exams: [
        { max: 80, bands: [[0, 7, 5], [8, 15, 39], [16, 24, 782], [25, 33, 2029], [34, 39, 2471], [40, 46, 4221], [47, 56, 6242], [57, 64, 4979], [65, 71, 3934], [72, 76, 3901], [77, 80, 2315]] },
        { max: 120, bands: [[0, 11, 356], [12, 16, 492], [17, 26, 1916], [27, 34, 2499], [35, 43, 3064], [44, 52, 4170], [53, 65, 4988], [66, 77, 4432], [78, 89, 3874], [90, 100, 2974], [101, 120, 2130]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/2026-04/vce_general_mathematics_ga25.pdf',
    },
  ],
  english: [
    {
      year: 2014,
      exams: [
        { max: 60, bands: [[0, 4, 87], [5, 8, 157], [9, 12, 309], [13, 20, 2465], [21, 25, 4179], [26, 29, 5488], [30, 33, 6867], [34, 37, 6887], [38, 41, 5371], [42, 46, 4458], [47, 60, 3300]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2014/section3/vce_english_ga14.pdf',
    },
    {
      year: 2015,
      exams: [
        { max: 60, bands: [[0, 3, 75], [4, 7, 113], [8, 12, 398], [13, 20, 2540], [21, 25, 4349], [26, 29, 5427], [30, 33, 6870], [34, 37, 6693], [38, 41, 5375], [42, 46, 4355], [47, 60, 3228]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2015/section3/vce_english_ga15.pdf',
    },
    {
      year: 2016,
      exams: [
        { max: 60, bands: [[0, 2, 40], [3, 5, 57], [6, 11, 261], [12, 20, 2310], [21, 25, 3902], [26, 29, 5452], [30, 33, 6786], [34, 37, 6960], [38, 41, 5699], [42, 46, 4376], [47, 60, 3233]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2016/section3/vce_english_ga16.pdf',
    },
    {
      year: 2017,
      exams: [
        { max: 60, bands: [[0, 5, 138], [6, 8, 137], [9, 11, 256], [12, 19, 2381], [20, 24, 4176], [25, 28, 5416], [29, 32, 6726], [33, 36, 6611], [37, 40, 5375], [41, 45, 4418], [46, 60, 3403]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2017/section3/vce_english_ga17.pdf',
    },
    {
      year: 2018,
      exams: [
        { max: 60, bands: [[0, 5, 128], [6, 8, 146], [9, 11, 219], [12, 19, 2040], [20, 24, 3726], [25, 28, 5119], [29, 32, 6743], [33, 36, 6834], [37, 40, 5652], [41, 45, 4582], [46, 60, 3172]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2018/section3/vce_english_ga18.pdf',
    },
    {
      year: 2019,
      exams: [
        { max: 60, bands: [[0, 5, 113], [6, 8, 151], [9, 11, 275], [12, 18, 2071], [19, 23, 3843], [24, 27, 4967], [28, 31, 6061], [32, 35, 6138], [36, 39, 5085], [40, 44, 4273], [45, 60, 3489]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2019/section3/vce_english_ga19.pdf',
    },
    {
      year: 2020,
      exams: [
        { max: 60, bands: [[0, 5, 39], [6, 8, 54], [9, 12, 260], [13, 20, 2430], [21, 25, 4036], [26, 29, 5155], [30, 33, 6208], [34, 37, 6246], [38, 41, 5246], [42, 46, 4463], [47, 60, 2989]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2020/section3/vce_english_ga20.pdf',
    },
    {
      year: 2021,
      exams: [
        { max: 60, bands: [[0, 5, 16], [6, 8, 20], [9, 12, 133], [13, 20, 1857], [21, 25, 3822], [26, 29, 5141], [30, 33, 6402], [34, 37, 6568], [38, 41, 5274], [42, 46, 4421], [47, 60, 2711]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2021/section3/vce_english_ga21.pdf',
    },
    {
      year: 2022,
      exams: [
        { max: 60, bands: [[0, 5, 107], [6, 8, 94], [9, 11, 164], [12, 19, 1667], [20, 24, 3317], [25, 28, 4608], [29, 32, 6221], [33, 36, 6744], [37, 40, 5696], [41, 45, 4700], [46, 60, 3067]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2022/section3/vce_english_ga22.pdf',
    },
    {
      year: 2023,
      exams: [
        { max: 60, bands: [[0, 2, 57], [3, 5, 46], [6, 11, 308], [12, 19, 1833], [20, 24, 3462], [25, 28, 4918], [29, 32, 6735], [33, 36, 6942], [37, 40, 5581], [41, 45, 4399], [46, 60, 3025]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2023/section3/vce_english_ga23.pdf',
    },
    {
      year: 2024,
      exams: [
        { max: 60, bands: [[0, 2, 28], [3, 5, 31], [6, 9, 98], [10, 18, 1284], [19, 23, 3372], [24, 27, 5319], [28, 31, 7366], [32, 35, 8070], [36, 39, 6408], [40, 43, 4158], [44, 60, 3390]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/2025-08/vce_english_ga24.pdf',
    },
    {
      year: 2025,
      exams: [
        { max: 60, bands: [[0, 2, 32], [3, 5, 34], [6, 8, 74], [9, 17, 939], [18, 23, 3291], [24, 27, 5475], [28, 31, 7990], [32, 35, 8106], [36, 39, 6606], [40, 44, 5076], [45, 60, 3145]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/2026-04/vce_english_ga25.pdf',
    },
  ],
  accounting: [
    {
      year: 2014,
      exams: [
        { max: 200, bands: [[0, 2, 86], [3, 6, 117], [7, 14, 260], [15, 26, 339], [27, 45, 497], [46, 65, 577], [66, 89, 711], [90, 113, 681], [114, 134, 587], [135, 157, 511], [158, 200, 419]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2014/section3/vce_accounting_ga14.pdf',
    },
    {
      year: 2015,
      exams: [
        { max: 200, bands: [[0, 5, 83], [6, 12, 123], [13, 24, 230], [25, 39, 336], [40, 59, 492], [60, 80, 545], [81, 107, 662], [108, 131, 638], [132, 151, 546], [152, 168, 479], [169, 200, 398]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2015/section3/vce_accounting_ga15.pdf',
    },
    {
      year: 2016,
      exams: [
        { max: 200, bands: [[0, 2, 94], [3, 6, 119], [7, 14, 234], [15, 27, 355], [28, 45, 492], [46, 66, 576], [67, 92, 685], [93, 120, 651], [121, 145, 562], [146, 167, 473], [168, 200, 407]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2016/section3/vce_accounting_ga16.pdf',
    },
    {
      year: 2017,
      exams: [
        { max: 200, bands: [[0, 5, 97], [6, 11, 136], [12, 21, 257], [22, 35, 365], [36, 54, 514], [55, 78, 587], [79, 105, 700], [106, 132, 689], [133, 152, 589], [153, 169, 520], [170, 200, 427]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2017/section3/vce_accounting_ga17.pdf',
    },
    {
      year: 2018,
      exams: [
        { max: 200, bands: [[0, 6, 109], [7, 13, 145], [14, 25, 293], [26, 38, 375], [39, 55, 538], [56, 76, 643], [77, 102, 762], [103, 128, 734], [129, 151, 626], [152, 170, 544], [171, 200, 454]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2018/section3/vce_accounting_ga18.pdf',
    },
    {
      year: 2019,
      exams: [
        { max: 200, bands: [[0, 6, 102], [7, 15, 126], [16, 28, 247], [29, 42, 348], [43, 59, 488], [60, 78, 568], [79, 104, 701], [105, 128, 645], [129, 150, 570], [151, 169, 492], [170, 200, 406]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2019/section3/vce_accounting_ga19.pdf',
    },
    {
      year: 2020,
      exams: [
        { max: 200, bands: [[0, 3, 92], [4, 10, 122], [11, 20, 234], [21, 32, 341], [33, 49, 468], [50, 69, 521], [70, 93, 645], [94, 116, 599], [117, 139, 535], [140, 160, 460], [161, 200, 383]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2020/section3/vce_accounting_ga20.pdf',
    },
    {
      year: 2021,
      exams: [
        { max: 200, bands: [[0, 3, 95], [4, 11, 111], [12, 26, 230], [27, 41, 313], [42, 56, 425], [57, 76, 514], [77, 104, 597], [105, 134, 567], [135, 158, 494], [159, 176, 420], [177, 200, 358]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2021/section3/vce_accounting_ga21.pdf',
    },
    {
      year: 2022,
      exams: [
        { max: 200, bands: [[0, 11, 89], [12, 21, 107], [22, 35, 209], [36, 51, 308], [52, 70, 431], [71, 91, 494], [92, 119, 604], [120, 143, 576], [144, 160, 499], [161, 175, 436], [176, 200, 379]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2022/section3/vce_accounting_ga22.pdf',
    },
    {
      year: 2023,
      exams: [
        { max: 200, bands: [[0, 19, 81], [20, 32, 104], [33, 47, 202], [48, 63, 299], [64, 82, 438], [83, 104, 513], [105, 131, 610], [132, 153, 564], [154, 170, 512], [171, 182, 422], [183, 200, 354]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2023/section3/vce_accounting_ga23.pdf',
    },
    {
      year: 2024,
      exams: [
        { max: 200, bands: [[0, 13, 115], [14, 22, 112], [23, 37, 222], [38, 55, 321], [56, 77, 438], [78, 101, 523], [102, 126, 629], [127, 149, 585], [150, 167, 510], [168, 180, 445], [181, 200, 354]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/2025-08/vce_accounting_ga24.pdf',
    },
    {
      year: 2025,
      exams: [
        { max: 200, bands: [[0, 12, 96], [13, 20, 110], [21, 35, 217], [36, 51, 343], [52, 70, 476], [71, 92, 540], [93, 120, 663], [121, 146, 604], [147, 166, 545], [167, 181, 462], [182, 200, 374]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/2026-04/vce_accounting_ga25.pdf',
    },
  ],
  economics: [
    {
      year: 2014,
      exams: [
        { max: 180, bands: [[0, 11, 5], [12, 32, 51], [33, 49, 111], [50, 67, 171], [68, 87, 244], [88, 105, 305], [106, 122, 349], [123, 137, 313], [138, 149, 283], [150, 160, 248], [161, 180, 209]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2014/section3/vce_economics_ga14.pdf',
    },
    {
      year: 2015,
      exams: [
        { max: 180, bands: [[0, 17, 7], [18, 43, 71], [44, 63, 134], [64, 79, 171], [80, 98, 259], [99, 115, 322], [116, 131, 383], [132, 143, 334], [144, 153, 294], [154, 162, 248], [163, 180, 218]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2015/section3/vce_economics_ga15.pdf',
    },
    {
      year: 2016,
      exams: [
        { max: 180, bands: [[0, 17, 2], [18, 36, 57], [37, 53, 116], [54, 70, 184], [71, 86, 264], [87, 106, 339], [107, 122, 401], [123, 134, 350], [135, 145, 316], [146, 157, 271], [158, 180, 227]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2016/section3/vce_economics_ga16.pdf',
    },
    {
      year: 2017,
      exams: [
        { max: 160, bands: [[0, 15, 4], [16, 33, 46], [34, 52, 134], [53, 66, 177], [67, 83, 261], [84, 99, 350], [100, 113, 401], [114, 124, 360], [125, 134, 329], [135, 143, 263], [144, 160, 279]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2017/section3/vce_economics_ga17.pdf',
    },
    {
      year: 2018,
      exams: [
        { max: 160, bands: [[0, 15, 14], [16, 28, 57], [29, 46, 134], [47, 60, 187], [61, 76, 299], [77, 93, 375], [94, 110, 438], [111, 123, 397], [124, 133, 342], [134, 143, 313], [144, 160, 234]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2018/section3/vce_economics_ga18.pdf',
    },
    {
      year: 2019,
      exams: [
        { max: 160, bands: [[0, 15, 12], [16, 27, 52], [28, 42, 125], [43, 57, 184], [58, 75, 287], [76, 91, 335], [92, 107, 383], [108, 120, 359], [121, 132, 317], [133, 142, 254], [143, 160, 223]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2019/section3/vce_economics_ga19.pdf',
    },
    {
      year: 2020,
      exams: [
        { max: 160, bands: [[0, 15, 7], [16, 30, 62], [31, 43, 135], [44, 57, 214], [58, 73, 315], [74, 90, 394], [91, 107, 455], [108, 121, 385], [122, 134, 350], [135, 144, 290], [145, 160, 232]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2020/section3/vce_economics_ga20.pdf',
    },
    {
      year: 2021,
      exams: [
        { max: 160, bands: [[0, 15, 18], [16, 28, 67], [29, 41, 144], [42, 55, 215], [56, 72, 323], [73, 89, 401], [90, 110, 485], [111, 124, 424], [125, 136, 375], [137, 146, 311], [147, 160, 243]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2021/section3/vce_economics_ga21.pdf',
    },
    {
      year: 2022,
      exams: [
        { max: 160, bands: [[0, 10, 17], [11, 21, 80], [22, 31, 157], [32, 44, 249], [45, 60, 362], [61, 79, 461], [80, 99, 517], [100, 115, 473], [116, 130, 433], [131, 142, 340], [143, 160, 284]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2022/section3/vce_economics_ga22.pdf',
    },
    {
      year: 2023,
      exams: [
        { max: 160, bands: [[0, 9, 22], [10, 18, 72], [19, 29, 159], [30, 42, 241], [43, 58, 380], [59, 75, 462], [76, 95, 523], [96, 111, 480], [112, 125, 435], [126, 138, 355], [139, 160, 302]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2023/section3/vce_economics_ga23.pdf',
    },
    {
      year: 2024,
      exams: [
        { max: 160, bands: [[0, 15, 7], [16, 28, 81], [29, 41, 177], [42, 57, 259], [58, 74, 384], [75, 94, 508], [95, 112, 575], [113, 125, 505], [126, 135, 447], [136, 145, 380], [146, 160, 290]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/2025-04/vce_economics_ga24.pdf',
    },
    {
      year: 2025,
      exams: [
        { max: 160, bands: [[0, 12, 24], [13, 22, 82], [23, 35, 175], [36, 51, 289], [52, 68, 431], [69, 85, 525], [86, 102, 599], [103, 116, 544], [117, 129, 491], [130, 140, 430], [141, 160, 322]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/2026-04/vce_economics_ga25.pdf',
    },
  ],
  japanese: [
    {
      year: 2014,
      exams: [
        { max: 400, bands: [[0, 39, 1], [40, 58, 5], [59, 79, 12], [80, 92, 21], [93, 119, 38], [120, 145, 67], [146, 179, 125], [180, 214, 151], [215, 269, 236], [270, 339, 214], [340, 400, 117]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2014/section3/vce_lote_japanese_second_language_ga14.pdf',
    },
    {
      year: 2015,
      exams: [
        { max: 400, bands: [[0, 33, 1], [34, 50, 3], [51, 64, 2], [65, 89, 31], [90, 116, 33], [117, 144, 73], [145, 177, 132], [178, 220, 166], [221, 283, 266], [284, 346, 229], [347, 400, 145]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2015/section3/vce_lote_japanese_second_language_ga15.pdf',
    },
    {
      year: 2016,
      exams: [
        { max: 400, bands: [[0, 38, 1], [39, 57, 7], [58, 70, 10], [71, 86, 21], [87, 111, 41], [112, 139, 69], [140, 172, 131], [173, 212, 168], [213, 270, 259], [271, 339, 231], [340, 400, 132]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2016/section3/vce_lote_japanese_second_language_ga16.pdf',
    },
    {
      year: 2017,
      exams: [
        { max: 400, bands: [[0, 39, 0], [40, 58, 4], [59, 83, 9], [84, 104, 20], [105, 121, 46], [122, 146, 82], [147, 174, 134], [175, 217, 175], [218, 280, 271], [281, 342, 243], [343, 400, 133]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2017/section3/vce_lote_japanese_second_language_ga17.pdf',
    },
    {
      year: 2018,
      exams: [
        { max: 400, bands: [[0, 35, 3], [36, 55, 6], [56, 64, 11], [65, 82, 20], [83, 100, 41], [101, 128, 79], [129, 160, 138], [161, 201, 176], [202, 263, 266], [264, 336, 241], [337, 400, 139]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2018/section3/vce_lote_japanese_second_language_ga18.pdf',
    },
    {
      year: 2019,
      exams: [
        { max: 400, bands: [[0, 39, 1], [40, 50, 3], [51, 72, 9], [73, 97, 19], [98, 119, 44], [120, 144, 72], [145, 183, 133], [184, 224, 174], [225, 289, 260], [290, 344, 240], [345, 400, 125]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2019/section3/vce_lote_japanese_second_language_ga19.pdf',
    },
    {
      year: 2020,
      exams: [
        { max: 400, bands: [[0, 39, 1], [40, 68, 5], [69, 80, 9], [81, 96, 22], [97, 120, 46], [121, 147, 75], [148, 181, 133], [182, 215, 175], [216, 265, 267], [266, 314, 240], [315, 400, 132]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2020/section3/vce_lote_japanese_second_language_ga20.pdf',
    },
    {
      year: 2021,
      exams: [
        { max: 400, bands: [[0, 33, 5], [34, 42, 5], [43, 72, 5], [73, 85, 20], [86, 109, 38], [110, 132, 75], [133, 165, 126], [166, 202, 171], [203, 255, 263], [256, 315, 244], [316, 400, 132]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2021/section3/vce_lote_japanese_second_language_ga21.pdf',
    },
    {
      year: 2022,
      exams: [
        { max: 400, bands: [[0, 13, 2], [14, 22, 4], [23, 38, 3], [39, 66, 17], [67, 88, 38], [89, 114, 72], [115, 140, 123], [141, 176, 155], [177, 235, 256], [236, 307, 228], [308, 400, 121]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2022/section3/vce_lote_japanese_second_language_ga22.pdf',
    },
    {
      year: 2023,
      exams: [
        { max: 400, bands: [[0, 19, 1], [20, 44, 3], [45, 58, 10], [59, 73, 13], [74, 93, 37], [94, 116, 68], [117, 146, 115], [147, 176, 151], [177, 239, 241], [240, 322, 211], [323, 400, 112]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/Documents/statistics/2023/section3/vce_lote_japanese_second_language_ga23.pdf',
    },
    {
      year: 2024,
      exams: [
        { max: 400, bands: [[0, 29, 2], [30, 39, 7], [40, 54, 8], [55, 73, 19], [74, 92, 41], [93, 119, 75], [120, 152, 135], [153, 202, 204], [203, 264, 279], [265, 335, 220], [336, 400, 131]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/2025-04/vce_japanese_second_language_ga24.pdf',
    },
    {
      year: 2025,
      exams: [
        { max: 400, bands: [[0, 14, 1], [15, 32, 7], [33, 48, 7], [49, 64, 22], [65, 94, 37], [95, 127, 76], [128, 163, 136], [164, 206, 186], [207, 276, 273], [277, 341, 238], [342, 400, 132]] },
      ],
      source: 'https://www.vcaa.vic.edu.au/sites/default/files/2026-04/vce_japanese_second_language_ga25.pdf',
    },
  ],
}
