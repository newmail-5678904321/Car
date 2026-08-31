const fs = require('fs');
let content = fs.readFileSync('src/types.ts', 'utf8');

content = content.replace(/bodyType: BodyType;/g, 'category: string;\n  bodyType: string;\n  useCase: string;');

fs.writeFileSync('src/types.ts', content);
