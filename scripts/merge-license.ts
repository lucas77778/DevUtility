import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Read the license files
const licenseMain = readFileSync(join(process.cwd(), 'LICENSE'), 'utf8');
const licenseGPL = readFileSync(join(process.cwd(), 'LICENSE.GPL'), 'utf8');
const licenseCommercial = readFileSync(join(process.cwd(), 'LICENSE.COMMERCIAL'), 'utf8');

// Merge licenses into a full license file
const fullLicense = `${licenseMain}

================================================================================
GNU GENERAL PUBLIC LICENSE
================================================================================

${licenseGPL}

================================================================================
COMMERCIAL LICENSE
================================================================================

${licenseCommercial}
`;

// Write the merged license to LICENSE.FULL
writeFileSync(join(process.cwd(), 'LICENSE.FULL'), fullLicense);

console.log('Successfully merged licenses into LICENSE.FULL');
