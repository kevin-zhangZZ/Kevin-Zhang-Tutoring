// Renders a chemical formula/equation string with automatic subscripts (stoichiometric
// subscripts like the 2 in H2O) and superscripts (ionic charges like the 2+ in Cu2+, or a lone
// +/- like Cl- or e-). This is chemistry's equivalent of the <Katex> component — write plain
// text with digits and +/- where they belong, and this renders it correctly, instead of hand
// -writing <sub>/<sup> tags in every equation.
//
// Rule: a run of digits becomes a subscript, UNLESS it's immediately followed by a bare + or -
// (with nothing else touching it), in which case the digits and the sign together become a
// superscript (a charge). A lone +/- with no digit in front (e.g. after "Cl" or "e") is also a
// superscript. A digit with nothing letter-like in front of it (e.g. a leading stoichiometric
// coefficient like the 2 in "2H2O") stays normal-sized text, since only digits that immediately
// follow a letter or a closing bracket are chemical-formula subscripts.
//
// Arrows: type "->" for a one-way reaction arrow and "<=>" for an equilibrium (both are
// rendered as their proper Unicode arrows); typing the Unicode arrows directly also works.

type Token = { type: 'text' | 'sub' | 'sup'; value: string }

function tokenize(eq: string): Token[] {
  const tokens: Token[] = []
  let i = 0
  const pushText = (ch: string) => {
    const last = tokens[tokens.length - 1]
    if (last && last.type === 'text') last.value += ch
    else tokens.push({ type: 'text', value: ch })
  }
  while (i < eq.length) {
    const rest = eq.slice(i)

    if (rest.startsWith('<=>')) {
      pushText('⇌')
      i += 3
      continue
    }
    if (rest.startsWith('->')) {
      pushText('→')
      i += 2
      continue
    }

    const charge = rest.match(/^\d+[+-]/)
    if (charge) {
      tokens.push({ type: 'sup', value: charge[0] })
      i += charge[0].length
      continue
    }

    const loneSign = rest.match(/^[+-](?![a-zA-Z0-9])/)
    if (loneSign) {
      tokens.push({ type: 'sup', value: loneSign[0] })
      i += 1
      continue
    }

    const digits = rest.match(/^\d+/)
    const last = tokens[tokens.length - 1]
    if (digits && last && last.type === 'text' && /[A-Za-z)\]]$/.test(last.value)) {
      tokens.push({ type: 'sub', value: digits[0] })
      i += digits[0].length
      continue
    }

    pushText(eq[i])
    i += 1
  }
  return tokens
}

export default function Chem({ eq, className = '' }: { eq: string; className?: string }) {
  return (
    <span className={className}>
      {tokenize(eq).map((t, idx) =>
        t.type === 'sub' ? <sub key={idx}>{t.value}</sub> : t.type === 'sup' ? <sup key={idx}>{t.value}</sup> : t.value
      )}
    </span>
  )
}
