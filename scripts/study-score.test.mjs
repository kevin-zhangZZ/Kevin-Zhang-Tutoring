// Tests for the Study Score Projection's practice log and projection helpers — run from the
// project root with:
//   node scripts/study-score.test.mjs
// Node 24 strips the TypeScript types itself, so the modules are imported directly.
import * as L from '../src/tools/study-score/practice/log.ts'
import * as M from '../src/tools/study-score/model.ts'
import { aheadOf, examShares } from '../src/tools/study-score/format.ts'
import { nth } from '../src/tools/study-score/practice/dates.ts'
import { DISTRIBUTIONS, SUBJECT_IDS, isOldCourse } from '../src/tools/study-score/data.ts'

let passed = 0, failed = 0
const failures = []
function check(cond, msg) {
  if (cond) passed++
  else { failed++; failures.push(msg) }
}
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)
const enc = list => L.encodeAttempts(list)
const d = (date, paper, ...marks) => ({ date, paper, marks })

// ── Links ──
const OLD = '20260712-2019-27-55.20260719-2018-26-52.20260726-2017-30-60'
const old = L.decodeAttempts(OLD, 'methods')
check(old.length === 3 && enc(old) === OLD, 'an old dated link decodes and re-encodes unchanged')
check(same(old.map(a => a.id), [0, 1, 2]), 'ids are log positions')
const mixed = L.decodeAttempts('20260712-2019-27-55.n-2018-26-52.n-2017-30-60', 'methods')
check(mixed.length === 3 && mixed[1].date === null && enc(mixed) === '20260712-2019-27-55.n-2018-26-52.n-2017-30-60', 'undated attempts round-trip as n')
check(L.decodeAttempts('n-2019-41-55.n-2019-27-81.x-2019-1-1.20261340-2019-1-1.n-2013-1-1.n-2019-1', 'methods').length === 0, 'bad marks, dates, years and mark counts are skipped')
check(L.decodeAttempts('20260712-2019-84.n-2024-100', 'chemistry').length === 2, 'Chemistry has one mark per attempt')
check(L.decodeAttempts('n-2019-27-55', 'chemistry').length === 0, 'a two-mark attempt is not a Chemistry attempt')
check(L.decodeAttempts('', 'methods').length === 0, 'an empty link is an empty log')
check(L.decodeAttempts('20260801-2019-27-55.20260712-2018-26-52', 'methods')[0].paper === 2019, 'a link keeps its own order (no sorting)')

// ── Where attempts go ──
let log = L.decodeAttempts('20260712-2019-27-55.n-2018-26-52.n-2017-30-60.20260802-2016-28-58', 'methods')
let r = L.insertAttempt(log, d(null, 2020, 30, 60))
check(r.at === 4 && r.list[4].paper === 2020 && r.list[4].id === 4, 'no date: added as the latest')
r = L.insertAttempt(log, d('2026-07-20', 2020, 30, 60))
check(r.at === 3 && r.list[3].paper === 2020 && r.list[4].paper === 2016, 'a date goes before the first dated paper sat later')
r = L.insertAttempt(log, d('2026-07-01', 2020, 30, 60))
check(r.at === 0, 'an early date goes first')
r = L.insertAttempt(log, d('2026-09-01', 2020, 30, 60))
check(r.at === 4, 'a date after every dated paper goes last')
r = L.insertAttempt(log, d('2026-08-02', 2020, 30, 60))
check(r.at === 4, 'a paper on the same day as another goes after it')
r = L.insertAttempt([], d(null, 2025, 30, 60))
check(r.at === 0 && r.list.length === 1, 'first paper into an empty log')
check(same(r.list.map(a => a.id), [0]), 'ids renumbered')

r = L.replaceAttempt(log, 1, d(null, 2018, 30, 60))
check(r.at === 1 && r.list[1].marks[0] === 30, 'editing marks keeps the place')
r = L.replaceAttempt(log, 0, d(null, 2019, 27, 55))
check(r.at === 0 && r.list[0].date === null, 'clearing a date keeps the place')
r = L.replaceAttempt(log, 3, d('2026-08-02', 2016, 29, 58))
check(r.at === 3, 'keeping the same date keeps the place')
r = L.replaceAttempt(log, 0, d('2026-08-10', 2019, 27, 55))
check(r.at === 3 && r.list[3].paper === 2019 && r.list[2].paper === 2016, 'a new date moves the paper by the add rule')
r = L.replaceAttempt(log, 1, d('2026-07-01', 2018, 26, 52))
check(r.at === 0 && r.list[0].paper === 2018, 'dating an undated paper moves it too')
check(r.list.length === log.length, 'editing never adds or loses papers')
const removed = L.removeAttempt(log, 1)
check(removed.length === 3 && same(removed.map(a => a.id), [0, 1, 2]) && removed[1].paper === 2017, 'remove renumbers')

check(L.attemptName(log[0]).startsWith('2019 paper from 12 Jul'), 'a dated name has its date')
check(L.attemptName(log[1]) === '2018 paper (2nd logged)', 'an undated name has its place')
check(L.allDated(old) && !L.allDated(log), 'allDated')

// ── Links arriving ──
const A = L.decodeAttempts('20260712-2019-27-55.20260719-2018-26-52', 'methods')
const AB = L.decodeAttempts('20260712-2019-27-55.20260719-2018-26-52.n-2017-30-60', 'methods')
const X = L.decodeAttempts('20260712-2022-27-55', 'methods')
check(L.compareLogs(A, A) === 'same', 'same')
check(L.compareLogs(A, AB) === 'subset', 'an old bookmark is a subset')
check(L.compareLogs(AB, A) === 'superset', 'a link with more is a superset')
check(L.compareLogs(AB, []) === 'superset', 'anything is a superset of an empty device')
check(L.compareLogs(X, A) === 'clash', 'someone else’s log clashes')
check(L.compareLogs([A[1], A[0]], A) === 'clash', 'the same papers in another order is a clash')

// ── Goals ──
check(L.parseGoal('40') === 40 && L.parseGoal('20') === 20 && L.parseGoal('45') === 45, 'goals 20–45')
check(L.parseGoal('46') === null && L.parseGoal('19') === null && L.parseGoal('39.5') === null && L.parseGoal('') === null && L.parseGoal(null) === null, 'bad goals')

// ── Scores ──
const sample = L.decodeAttempts('20260712-2019-27-55.20260719-2018-26-52.20260726-2017-30-60.20260802-2016-28-58.20260816-2020-32-62.20260830-2021-31-64.20260913-2019-33-66.20260927-2022-34-63', 'methods')
const scored = L.scoreAttempts('methods', sample)
check(scored[6].sitting === 2 && scored[0].sitting === 1, 'retakes are counted in order')
check(Math.abs(L.recentAverage(scored) - 38.66) < 0.01, `recent average 38.66 (${L.recentAverage(scored)})`)
check(Math.abs(L.changeSinceStart(scored) - 3.2) < 0.05, `change +3.2 (${L.changeSinceStart(scored)})`)
check(L.changeSinceStart(scored.slice(0, 5)) === null, 'no change before the 6th paper')
check(L.recentAverage([]) === null, 'no average for no papers')
check(L.rollingAverages(scored).length === 6 && L.rollingAverages(scored.slice(0, 2)).length === 0, 'rolling average from the 3rd paper')

// ── Projection helpers ──
const typ = (s, marks) => M.typicalOf(M.project(s, marks))
check(typ('methods', [30, 60]) === 37, `Methods 30/60 typical 37 (${typ('methods', [30, 60])})`)
check(typ('methods', [38, 76]) === 44, `Methods 38/76 typical 44 (${typ('methods', [38, 76])})`)
check(typ('methods', [40, 80]) === 48, `Methods full marks typical 48 (${typ('methods', [40, 80])})`)
for (const s of SUBJECT_IDS) {
  const max = M.totalMax(s)
  check(max === 120, `${s} totals 120`)
  for (let t = 0; t <= max; t++) {
    const parts = M.splitTotal(s, t)
    if (parts.reduce((a, b) => a + b, 0) !== t || parts.some(p => p < 0)) check(false, `${s} split ${t}`)
  }
  check(same(M.splitTotal(s, 60), s === 'chemistry' ? [60] : [20, 40]), `${s} 60 splits as expected`)
  const need = M.marksNeeded(s, [30, 35, 40, 45])
  for (const n of need) {
    if (n.typical !== null) {
      check(M.typicalOf(M.project(s, M.splitTotal(s, n.typical))) >= n.target, `${s} ${n.target}: typical total reaches it`)
      check(n.typical === 0 || M.typicalOf(M.project(s, M.splitTotal(s, n.typical - 1))) < n.target, `${s} ${n.target}: typical total is the smallest`)
    }
    check(n.lo === null || n.hi === null || (n.lo <= n.hi && (n.typical === null || (n.lo <= n.typical && n.typical <= n.hi))), `${s} ${n.target}: lo ≤ typical ≤ hi`)
    check(n.years.length === DISTRIBUTIONS[s].length, `${s} one total per year`)
  }
  for (let i = 1; i < need.length; i++) check((need[i].typical ?? 999) >= (need[i - 1].typical ?? 0), `${s} totals rise with the target`)
  const fm = M.fullMarksRange(s)
  check(fm.lo <= fm.hi && fm.hi <= 50 && fm.lo >= 44, `${s} full marks range ${fm.lo}–${fm.hi}`)
}
// Only the total matters, so any split gives the same score.
check(M.project('methods', [30, 60]).every((r, i) => Math.abs(r.exact - M.project('methods', [40, 50])[i].exact) < 1e-9), 'only the total matters')

// ── Wording ──
check(aheadOf(0.78) === 'ahead of 78%' && aheadOf(0.3404) === 'ahead of 34%', 'ahead of, rounded')
check(aheadOf(0.996) === 'ahead of 99.6%' && aheadOf(0.99999) === 'ahead of 99.9%' && aheadOf(0.99) === 'ahead of 99.0%', 'ahead of, near the top')
check(aheadOf(0.004) === 'ahead of under 1%', 'ahead of, near the bottom')
const p = M.project('methods', [30, 60])[9]
check(examShares('methods', p).startsWith('Exam 1 ahead of ') && examShares('methods', p).includes(' · Exam 2 ahead of '), 'per-exam shares in words')
check(examShares('chemistry', M.project('chemistry', [90])[9]) === '', 'no per-exam shares for one exam')
check(same([1, 2, 3, 4, 11, 12, 13, 21, 22, 23, 101].map(nth), ['1st', '2nd', '3rd', '4th', '11th', '12th', '13th', '21st', '22nd', '23rd', '101st']), 'ordinals')
check(isOldCourse('specialist', 2022) && !isOldCourse('specialist', 2023) && isOldCourse('chemistry', 2023) && !isOldCourse('methods', 2016), 'old course years')

console.log(`${passed} passed, ${failed} failed`)
if (failed) {
  for (const f of failures) console.log('  ✗ ' + f)
  process.exit(1)
}
