// Copyright © 2024 Dpm Land. All Rights Reserved.

import { readDpmFile } from 'json/reader.ts';
import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { colors, Confirm } from 'mods/deps.ts';
import { LOGGER } from 'mods/logger.ts';

export async function generateInstaller() {
  const dpm = await readDpmFile();

  const TXT = `
// Generated by DPM: https://github.com/dpmland/dpm

import { Monk } from 'https://deno.land/x/monk/mod.ts';

// Initialize Monk
await Monk({
  versions: {
    downloadVersion: 'stable', // Here you can add the version for download only canary or stable!
    stable: {
      url: 'https://github.com/dpmland/dpm', // Here you add the url and branch for the stable and canary
      branch: 'main',
    },
    canary: {
      url: 'https://github.com/dpmland/dpm',
      branch: 'dev',
    },
  },
  files: {
    appName: '${dpm.name}', // With this name compile the app into a binary!
    stable: {
      importMapFile: './${NAME_DIRECTORIES.IMPORT_MAPS}', // This route is necessary for the compilation!
      mainFile: '${dpm.main}',
    },
    canary: {
      importMapFile: './${NAME_DIRECTORIES.IMPORT_MAPS}',
      mainFile: '${dpm.main}',
    },
  },

  // OPTIONAL
  social: {
    github: 'https://github.com/dpmland/dpm', // The GitHub Repo for more information!
    discord: 'https://discord.com/invite/Um27YPJKud', // The Discord Server for more information!
    errors: 'https://github.com/dpmland/dpm/issues', // The issues route for the bugs!
  },
});
    `;
  console.log(
    colors.brightCyan(
      `If you want check more information about Monk can you check here: ${
        colors.underline('https://github.com/dpmland/monk')
      }`,
    ),
  );

  const create: boolean = await Confirm.prompt(
    'Do you want to create the installer file for your application?',
  );

  if (create) {
    await Deno.writeTextFile(BASE_DIRECTORIES.INSTALLER, TXT).catch((e) => {
      LOGGER.error(
        `Error at write text file in the ${
          colors.dim(BASE_DIRECTORIES.INSTALLER)
        }.\nCaused by:\n${colors.bold(e.message)}`,
      );
      Deno.exit(2);
    });

    LOGGER.done(
      `Successfully writed the ${
        colors.bold(NAME_DIRECTORIES.INSTALLER.toUpperCase())
      }`,
    );
    Deno.exit();
  }
  LOGGER.warn('Ok... skiping the create of the installer');
}