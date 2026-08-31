const fs = require('fs');
const content = fs.readFileSync('src/data/vehicles.ts', 'utf8');
const ids = content.match(/id:\s*['"]([a-zA-Z0-9-]+)['"]/g);
if (ids) {
  console.log(ids.join('\n'));
}
