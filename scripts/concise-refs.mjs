// Concise-view text that points at Detailed-only material. A WorkingRow's `reason` shows in both
// views, but Explore diagrams, Background boxes, Common Mistake boxes and `more` only show in the
// Detailed view (studyMode.tsx) — so a reason that says "the diagram below", "drag the slider" or
// "see the Background" leaves a Concise reader pointing at nothing. Lists every such reason.
//   node scripts/concise-refs.mjs [fileRegex]      (see AUTHORING_GUIDE §15, Concise / Detailed)
import fs from 'fs'
import path from 'path'
import ts from 'typescript'

const dir = 'src/tools/worked-solutions/questions'
const filter = process.argv[2] ? new RegExp(process.argv[2]) : /^(Methods|Specialist)/
const RE = /\b(Try It Yourself|interactive|(?:the|this|a) (?:diagram|widget|slider|animation|sketch|graph|picture|figure|box) (?:below|above)|(?:diagram|widget|graph|picture) below(?! the [xy]-axis)|(?:like|as in) the one below|see below|shown below|below shows|drag(?:ging)? (?:the|a|it|k|x|t|P|Q)\b|slide (?:the|k|x|a|b)\b|move the slider|press play|(?:the|this) Background|Background (?:above|below)|mistake box)\b/i
// The box's name, capitalised as on the page ("a common mistake" in running text is the report's wording).
const BOX = /\bCommon Mistake\b/
// Phrases the pattern catches that are not pointers: reasoning or maths that happens to use the words.
const NOT_POINTERS = [/graph below the [xy]-axis/i, /working below/i, /slide the graph until/i]

function textOf(node, sf) {
  let s = ''
  const visit = x => {
    if (ts.isJsxText(x)) s += x.text
    else if (ts.isStringLiteral(x) || ts.isNoSubstitutionTemplateLiteral(x)) s += x.text
    else ts.forEachChild(x, visit)
  }
  visit(node)
  return s.replace(/\s+/g, ' ').trim()
}
let hits = 0
const perFile = {}
for (const f of fs.readdirSync(dir).sort()) {
  if (!f.endsWith('.tsx') || !filter.test(f)) continue
  const src = fs.readFileSync(path.join(dir, f), 'utf8')
  const sf = ts.createSourceFile(f, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const visit = n => {
    if (ts.isPropertyAssignment(n) && n.name.getText(sf) === 'reason') {
      const t = textOf(n.initializer, sf)
      const m = NOT_POINTERS.some(r => r.test(t)) ? null : t.match(RE) || t.match(BOX)
      if (m) {
        hits++
        perFile[f] = (perFile[f] || 0) + 1
        const line = sf.getLineAndCharacterOfPosition(n.getStart()).line + 1
        const at = Math.max(0, m.index - 70)
        console.log(`${f}:${line}: …${t.slice(at, m.index + 90)}…`)
      }
    }
    ts.forEachChild(n, visit)
  }
  visit(sf)
}
console.log(`${hits} reason(s) in ${Object.keys(perFile).length} file(s) point at Detailed-only material`)
