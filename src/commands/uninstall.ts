// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Command, UtilUnknown } from 'mods/deps.ts';
import * as uninstall from 'packages/clean.ts';

export const UninstallCommand = new Command()
  .description(
    `Uninstall dependencies from the dpm file and the import file! 🧙`,
  )
  .alias('remove')
  .arguments('[dependency:...string]')
  .option('-A, --all [all:boolean]', 'Remove all dependencies from the files!')
  .action(async ({ all }, dependency) => {
    if (typeof all == 'boolean') {
      if (all) {
        await uninstall.cleanAllDeps();
        Deno.exit();
      }
    }

    if (UtilUnknown.isArray(dependency, UtilUnknown.isString)) {
      await uninstall.cleanAnyDependency(dependency);
    }
  });
