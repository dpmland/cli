// Copyright © 2022 Dpm Land. All Rights Reserved.

import { writeDpmFile, writeImportMapFile } from 'json/writer.ts';
import { readDpmFile, readImportMapFile } from 'json/reader.ts';
import { dracoFiles } from 'mods/deps.ts';
import { colors } from 'mods/deps.ts';
import { httpClient } from 'mods/http.ts';
import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';
import {
  appendModuleToDpm,
  appendOptions,
  appendStdToFile,
  esmGetVersion,
} from 'packages/add.ts';

export async function installDepsToImports(
  depName: string[],
  options: appendOptions = {},
) {
  if (
    !(dracoFiles.exists(BASE_DIRECTORIES.IMPORT_MAPS))
  ) {
    await writeImportMapFile();
  }
  if (!(dracoFiles.exists(BASE_DIRECTORIES.DPM_FILE))) {
    await writeDpmFile({});
  }
  const [data, dpm] = await Promise.all([
    readImportMapFile(),
    readDpmFile(),
  ]);
  const mods = appendModuleToDpm(depName, options);
  if (!('dependencies' in dpm)) {
    LOGGER.error(
      'Dependency key not found check the correct syntax of the file! More information on << dpm doc init.syntax >> or run << dpm init --dpm for restart the dpm file >>',
    );
    Deno.exit(2);
  }
  if (!('imports' in data)) {
    LOGGER.error(
      'Imports key not found check the correct syntax of the file! More information on << dpm doc init.syntax >> or run << dpm init --dpm >> for restart the dpm file',
    );
    Deno.exit(2);
  }
  const imports = data.imports;
  const deps = dpm.dependencies;
  options.host = (typeof options.host == 'undefined')
    ? 'https://deno.land/x'
    : options.host;
  for (const i of mods) {
    const splited = i.replace(options.host, ' ');
    const pkg = splited.split('/');
    const version = await getTheVersionOfDep(pkg[1], options.host);
    if (version == '') {
      imports[`${pkg[1]}/`] = i;
    } else {
      imports[`${pkg[1]}/`] = `${options.host}/${pkg[1]}@${version}/`;
    }
    if (version == '') {
      deps[`${pkg[1]}/`] = 'none';
    } else {
      deps[`${pkg[1]}/`] = `${version}`;
    }
  }

  await Deno.writeTextFile(
    BASE_DIRECTORIES.IMPORT_MAPS,
    JSON.stringify(data, null, '  '),
  );
  await Deno.writeTextFile(
    BASE_DIRECTORIES.DPM_FILE,
    JSON.stringify(dpm, null, '  '),
  );
  LOGGER.info(
    `Successfully installed ${
      colors.bold(depName.join(', '))
    } into ${NAME_DIRECTORIES.IMPORT_MAPS} and in the ${NAME_DIRECTORIES.DPM_FILE}`,
  );
  Deno.exit();
}

export async function getTheVersionOfDep(
  dep: string,
  host: string,
): Promise<string> {
  if (host == 'https://deno.land/x') {
    if (dep.includes('@')) {
      return ``;
    }
    const url = `https://cdn.deno.land/${dep}/meta/versions.json`;
    const versionList = await httpClient(url);
    if (versionList.latest) {
      return versionList.latest;
    }
  }
  return '';
}

export async function installStdToImports(
  depName: string[],
) {
  // Check if exists files!
  if (
    !(dracoFiles.exists(BASE_DIRECTORIES.IMPORT_MAPS))
  ) {
    await writeImportMapFile();
  }
  if (!(dracoFiles.exists(BASE_DIRECTORIES.DPM_FILE))) {
    await writeDpmFile({});
  }
  // Read the files!
  const [data, dpm] = await Promise.all([
    readImportMapFile(),
    readDpmFile(),
  ]);
  if (!('dependencies' in dpm)) {
    LOGGER.error(
      'Dependency key not found check the correct syntax of the file! More information on << dpm doc init.syntax >> or run << dpm init --dpm for restart the dpm file >>',
    );
    Deno.exit(2);
  }
  if (!('imports' in data)) {
    LOGGER.error(
      'Imports key not found check the correct syntax of the file! More information on << dpm doc init.syntax >> or run << dpm init --dpm >> for restart the dpm file',
    );
    Deno.exit(2);
  }
  // Helper constants
  const imports = data.imports;
  const deps = dpm.dependencies;

  // Iterate and generate the dataaaaaaaa!

  await appendStdToFile(depName).then((f) => {
    for (const i of f) {
      const pkg = i.split('/');
      imports[`${pkg[5]}/`] = i;
      deps[`${pkg[5]}/`] = i.split('@')[1].replace(/[^\d.-]/g, '');
    }
  });

  await Deno.writeTextFile(
    BASE_DIRECTORIES.IMPORT_MAPS,
    JSON.stringify(data, null, '  '),
  );
  await Deno.writeTextFile(
    BASE_DIRECTORIES.DPM_FILE,
    JSON.stringify(dpm, null, '  '),
  );
  LOGGER.info(
    `Successfully installed ${
      colors.bold(depName.join(', '))
    } into ${NAME_DIRECTORIES.IMPORT_MAPS} and in the ${NAME_DIRECTORIES.DPM_FILE}`,
  );
  Deno.exit();
}

export async function esmInstallation(depName: string[]) {
  // Check if exists files!
  if (
    !(dracoFiles.exists(BASE_DIRECTORIES.IMPORT_MAPS))
  ) {
    await writeImportMapFile();
  }
  if (!(dracoFiles.exists(BASE_DIRECTORIES.DPM_FILE))) {
    await writeDpmFile({});
  }
  // Read the files!
  const [data, dpm] = await Promise.all([
    readImportMapFile(),
    readDpmFile(),
  ]);
  if (!('dependencies' in dpm)) {
    LOGGER.error(
      'Dependency key not found check the correct syntax of the file! More information on << dpm doc init.syntax >> or run << dpm init --dpm for restart the dpm file >>',
    );
    Deno.exit(2);
  }
  if (!('imports' in data)) {
    LOGGER.error(
      'Imports key not found check the correct syntax of the file! More information on << dpm doc init.syntax >> or run << dpm init --dpm >> for restart the dpm file',
    );
    Deno.exit(2);
  }
  // Helper constants
  const imports = data.imports;
  const deps = dpm.dependencies;

  await esmGetVersion(depName).then((f) => {
    for (const i of f) {
      const pkg = i.replace(' ', '').split('/');
      imports[`${pkg[3].split('@')[0]}/`] = `${i.replace(' ', '')}/`;
      deps[`${pkg[3].split('@')[0]}/`] = `${i.replace(' ', '').split('@')[1]}`;
    }
  });

  await Deno.writeTextFile(
    BASE_DIRECTORIES.IMPORT_MAPS,
    JSON.stringify(data, null, '  '),
  );
  await Deno.writeTextFile(
    BASE_DIRECTORIES.DPM_FILE,
    JSON.stringify(dpm, null, '  '),
  );
  LOGGER.info(
    `Successfully installed ${
      colors.bold(depName.join(', '))
    } into ${NAME_DIRECTORIES.IMPORT_MAPS} and in the ${NAME_DIRECTORIES.DPM_FILE}`,
  );
  Deno.exit();
}
