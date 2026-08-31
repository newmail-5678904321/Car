const fs = require('fs');

let typesContent = fs.readFileSync('src/types.ts', 'utf8');
if (!typesContent.includes('AutomotiveFinishType')) {
  typesContent += `\nexport type AutomotiveFinishType = 'GLOSS' | 'METALLIC' | 'MATTE' | 'CARBON';\n`;
  fs.writeFileSync('src/types.ts', typesContent);
}

let sceneContent = fs.readFileSync('src/components/3d/VehicleScene.tsx', 'utf8');
sceneContent = sceneContent.replace(
  "import { AutomotiveFinishType } from './SculptedAutomotiveModel';",
  ""
);
if (!sceneContent.includes("import { AutomotiveFinishType } from '../../types';")) {
  sceneContent = sceneContent.replace(
    "import { Vehicle, OutdoorLocation, PerspectivePreset } from '../../types';",
    "import { Vehicle, OutdoorLocation, PerspectivePreset, AutomotiveFinishType } from '../../types';"
  );
}

// Also remove `<SculptedAutomotiveModel` usage from VehicleScene!
sceneContent = sceneContent.replace(
  /<\s*SculptedAutomotiveModel[\s\S]*?\/>/g,
  `{/* Image Fallback Handled at Showroom Level */}`
);

fs.writeFileSync('src/components/3d/VehicleScene.tsx', sceneContent);

let showroomContent = fs.readFileSync('src/components/showroom/VehicleShowroom.tsx', 'utf8');
showroomContent = showroomContent.replace(
  "import { AutomotiveFinishType } from '../3d/SculptedAutomotiveModel';",
  "import { AutomotiveFinishType } from '../../types';"
);
fs.writeFileSync('src/components/showroom/VehicleShowroom.tsx', showroomContent);

