// VCAA grade distributions for the end-of-year exams, 2016–2025, from VCAA's statistics PDFs
// (`source`). Methods and Specialist have two exams (Graded Assessments 2 and 3); Chemistry has
// one (Graded Assessment 3). 2016 uses an older PDF layout and was assembled by hand from its
// cumulative rows. Scores are on VCAA's GA scale, which is twice the raw marks: Exam 1 out of 80
// (raw 40), Exam 2 out of 160 (raw 80), the Chemistry exam out of 240 (raw 120).
// `bands` lists each grade UG, E, E+ … A+ as [lowest score, highest score, students].

export type Subject = 'methods' | 'specialist' | 'chemistry'

export interface ExamInfo {
  label: string
  /** Short label for tight spots: "E1". */
  short: string
  /** Raw marks the paper is out of. */
  rawMax: number
}

export interface SubjectInfo {
  name: string
  /** For the subject switch. */
  label: string
  exams: ExamInfo[]
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
  chemistry: {
    name: 'Chemistry',
    label: 'Chemistry',
    exams: [{ label: 'Exam', short: 'Exam', rawMax: 120 }],
  },
}

export const SUBJECT_IDS = Object.keys(SUBJECTS) as Subject[]

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
}
