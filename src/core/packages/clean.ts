// Copyright © 2024 Dpm Land. All Rights Reserved.

import { colors, dracoFiles } from 'mods/deps.ts';
import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';
import { readDpmFile, readImportMapFile } from 'json/reader.ts';

// Delete all dependencies from the files!
// The import map file and the dpm dependencies file!
export async function cleanAllDeps() {
  if (dracoFiles.exists(BASE_DIRECTORIES.DPM_FILE)) {
    const [file, imports] = await Promise.all([
      readDpmFile(),
      readImportMapFile(),
    ]);
    // Delete the imports data
    if (!('imports' in imports)) {
      LOGGER.error(
        'Imports key not found! check the documentation with << dpm doc init.syntax >> ',
      );
      Deno.exit(2);
    }
    const imp = imports.imports;
    Object.keys(imp).forEach((k) => delete imp[k]);
    // Delete the dependency key
    if (!('dependencies' in file)) {
      LOGGER.error(
        'Dependencies key not found! check the documentation with << dpm doc init.syntax >>',
      );
      Deno.exit(2);
    }
    const deps = file.dependencies;
    Object.keys(deps).forEach((k) => delete deps[k]);
    // Write with the new data
    await Deno.writeTextFile(
      BASE_DIRECTORIES.DPM_FILE,
      JSON.stringify(file, null, '  '),
    );

    await Deno.writeTextFile(
      BASE_DIRECTORIES.IMPORT_MAPS,
      JSON.stringify(imports, null, '  '),
    );

    LOGGER.info(
      `Cleaned successfully the ${NAME_DIRECTORIES.DPM_FILE} and the ${NAME_DIRECTORIES.IMPORT_MAPS}!`,
    );
    Deno.exit();
  }
  // Show error
  LOGGER.error(
    'Dpm file not found! Init a dpm project with << dpm init -A >> or check the documentation with << dpm doc init >>',
  );
  Deno.exit(2);
}

export async function cleanAnyDependency(deps: string[]) {
  if (dracoFiles.exists(BASE_DIRECTORIES.DPM_FILE)) {
    // Read the files!
    const [file, imports] = await Promise.all([
      readDpmFile(),
      readImportMapFile(),
    ]);

    // Check if exists imports and if exists dependencies
    if (!('imports' in imports)) {
      LOGGER.error(
        'Imports key not found! check the documentation with << dpm doc init.syntax >> ',
      );
      Deno.exit(2);
    }

    if (!('dependencies' in file)) {
      LOGGER.error(
        'Dependencies key not found! check the documentation with << dpm doc init.syntax >>',
      );
      Deno.exit(2);
    }

    // Helper consts!
    const f = file.dependencies;
    const imp = imports.imports;

    console.info('Cleanning the dependencies.... ');
    for (const i of deps) {
      if (Object.hasOwn(f, `${i}/`)) {
        Object.keys(f).forEach((_k) => delete f[`${i}/`]);
      } else {
        LOGGER.warn(
          `Not found the ${i} dependency in the ${NAME_DIRECTORIES.DPM_FILE}`,
        );
      }
      if (Object.hasOwn(imp, `${i}/`)) {
        Object.keys(imp).forEach((_k) => delete imp[`${i}/`]);
      } else {
        LOGGER.warn(
          `Not found the ${i} dependency in the ${NAME_DIRECTORIES.IMPORT_MAPS}`,
        );
      }
    }

    // Update the DPM File
    await Deno.writeTextFile(
      BASE_DIRECTORIES.DPM_FILE,
      JSON.stringify(file, null, '  '),
    );

    await Deno.writeTextFile(
      BASE_DIRECTORIES.IMPORT_MAPS,
      JSON.stringify(imports, null, '  '),
    );

    LOGGER.info(
      `Cleanned successfully! ${
        colors.bold(deps.join(' '))
      } -> On ${NAME_DIRECTORIES.DPM_FILE} ${NAME_DIRECTORIES.IMPORT_MAPS}`,
    );
    Deno.exit();
  }
  LOGGER.error(
    'Dpm file not found! Init a dpm project with << dpm init -A >> or check the documentation with << dpm doc init >>',
  );
  Deno.exit(2);
}
