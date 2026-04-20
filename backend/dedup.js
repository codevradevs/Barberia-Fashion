const fs = require('fs');
let content = fs.readFileSync('seed.js', 'utf8');

// Find all product object boundaries by splitting on },\n  {
// Strategy: parse each product block, keep only first occurrence by name

const productsStart = content.indexOf('const products = [') + 'const products = ['.length;
const productsEnd = content.lastIndexOf('];');

const header = content.slice(0, productsStart);
const footer = content.slice(productsEnd);
const body = content.slice(productsStart, productsEnd);

// Split into individual product entries
// Each product starts with optional whitespace + {
const productBlocks = [];
let depth = 0;
let current = '';
let inProduct = false;

for (let i = 0; i < body.length; i++) {
  const ch = body[i];
  if (ch === '{') {
    depth++;
    inProduct = true;
  }
  if (inProduct) current += ch;
  if (ch === '}') {
    depth--;
    if (depth === 0 && inProduct) {
      productBlocks.push(current.trim());
      current = '';
      inProduct = false;
    }
  }
}

console.log('Total product blocks found:', productBlocks.length);

// Deduplicate by name
const seen = new Set();
const unique = [];
for (const block of productBlocks) {
  const nameMatch = block.match(/name: '([^']+)'/);
  if (!nameMatch) continue;
  const name = nameMatch[1];
  if (!seen.has(name)) {
    seen.add(name);
    unique.push(block);
  } else {
    console.log('Removed duplicate:', name);
  }
}

console.log('Unique products:', unique.length);

// Rebuild file
const newBody = '\n' + unique.join(',\n') + '\n';
const newContent = header + newBody + footer;
fs.writeFileSync('seed.js', newContent);
console.log('Done. seed.js rewritten.');
