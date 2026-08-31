const fs = require('fs');
let content = fs.readFileSync('src/types.ts', 'utf8');

// The issue is this part:
// export type BodyType = string;  | 'Hypercar'   | 'Supercar'   | 'Grand Tourer'   | 'Sports Coupe'   | 'Luxury Sedan'   | 'Performance SUV'   | 'Electric Hyper-GT'   | 'Track Special';
// Let's replace it properly.

content = content.replace(/export type BodyType = string;[^\;]+\;/g, 'export type BodyType = string;');

fs.writeFileSync('src/types.ts', content);
