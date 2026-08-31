const fs = require('fs');
let code = fs.readFileSync('src/components/3d/VehicleScene.tsx', 'utf8');
code = code.replace(
  "{/* Vehicle Model: If isolating a single component, use SculptedAutomotiveModel for true precision component isolation */}",
  "{/* Vehicle Model */}"
);
fs.writeFileSync('src/components/3d/VehicleScene.tsx', code);
