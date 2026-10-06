// Every non-component element sitting beside a PartCard or a WorkingTable (i.e. in the answer
// area or between parts), classified for the Concise/Detailed split:
//   wrapper  — only holds Background / Explore / WrongMethod (needs <DetailOnly> around it)
//   stem     — question text (kept)
//   review   — anything else, printed in full for a manual decision
// node scripts/detail-check.mjs [fileRegex]   (see AUTHORING_GUIDE §15, Concise / Detailed)
import fs from 'fs'
import path from 'path'
import ts from 'typescript'

const dir = 'src/tools/worked-solutions/questions'
const filter = process.argv[2] ? new RegExp(process.argv[2]) : /^(Methods|Specialist)/
const DETAIL = new Set(['Background', 'Explore', 'WrongMethod', 'DetailOnly'])
const tagOf = n =>
  ts.isJsxElement(n) ? n.openingElement.tagName.getText() : ts.isJsxSelfClosingElement(n) ? n.tagName.getText() : ts.isJsxFragment(n) ? '<>' : null
function kids(n) {
  const out = []
  for (const c of n.children ?? []) {
    if (ts.isJsxText(c)) { if (c.text.trim()) out.push({ t: '#text', n: c }); continue }
    if (ts.isJsxExpression(c)) { if (c.expression) out.push({ t: '{expr}', n: c }); continue }
    const t = tagOf(c)
    if (t === '<>' || t === 'Fragment') out.push(...kids(c))
    else out.push({ t, n: c })
  }
  return out
}
const res = { wrapper: [], review: [] }
for (const f of fs.readdirSync(dir).sort()) {
  if (!f.endsWith('.tsx') || !filter.test(f)) continue
  const src = ts.createSourceFile(f, fs.readFileSync(path.join(dir, f), 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const visit = n => {
    if (ts.isJsxElement(n)) {
      const ks = kids(n)
      if (ks.some(k => k.t === 'PartCard' || k.t === 'WorkingTable')) {
        for (const k of ks) {
          if (['PartCard', 'WorkingTable', 'SAExaminerReport', ...DETAIL].includes(k.t)) continue
          const txt = k.n.getText().replace(/\s+/g, ' ')
          const line = src.getLineAndCharacterOfPosition(k.n.getStart()).line + 1
          if (/Video Walkthrough/.test(txt)) continue
          if (/^<div className="text-\[14\.5px\]/.test(txt)) continue // the question stem box
          const inner = ts.isJsxElement(k.n) ? kids(k.n) : []
          if (/<Background title="[^"]*" always/.test(txt)) continue // a notice, shown in both views
          if (inner.length && inner.every(i => DETAIL.has(i.t))) res.wrapper.push(`${f}:${line}`)
          else res.review.push(`${f}:${line}: ${txt.slice(0, 200)}`)
        }
      }
    }
    ts.forEachChild(n, visit)
  }
  visit(src)
}
console.log(`WRAPPERS (${res.wrapper.length})`)
res.wrapper.forEach(s => console.log('  ' + s))
console.log(`REVIEW (${res.review.length})`)
res.review.forEach(s => console.log('  ' + s))
