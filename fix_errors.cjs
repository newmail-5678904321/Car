const fs = require('fs');
let code = fs.readFileSync('src/components/showroom/VehicleShowroom.tsx', 'utf8');

// 1. Add import for THREE
if (!code.includes("import * as THREE from 'three';")) {
  code = code.replace(
    "import { Canvas } from '@react-three/fiber';",
    "import { Canvas } from '@react-three/fiber';\nimport * as THREE from 'three';"
  );
}

// 2. Add state variables that I used but didn't exist
if (!code.includes("const [loadingProgress, setLoadingProgress]")) {
  code = code.replace(
    "const [isLoading, setIsLoading] = useState(true);",
    "const [isLoading, setIsLoading] = useState(true);\n  const [loadingProgress, setLoadingProgress] = useState(0);\n  const [hasSeparableComponents, setHasSeparableComponents] = useState(false);"
  );
}

// 3. Fix viewMode and selectedColor in the JSX
code = code.replace(/viewMode=\{viewMode\}/g, "viewMode={activeTab}");
code = code.replace(/selectedColorHex=\{selectedColor\?\.hex\}/g, "selectedColorHex={selectedColorHex}");

fs.writeFileSync('src/components/showroom/VehicleShowroom.tsx', code);
