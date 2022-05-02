// Copyright © 2022 Dpm Land. All Rights Reserved.

import { colors, Command, emoji } from 'mods/deps.ts';
import * as tasks from 'tasks/main.ts';
import { LOGGER } from 'mods/logger.ts';

export class TaskCommand extends Command {
  #cmd?: Command;

  public constructor(cmd?: Command) {
    super();
    this.#cmd = cmd;

    return this.description(
      `If you need automate some commands tasks is here! ${emoji.get('robot')}`,
    )
      .alias('run')
      .option(
        '-u --update [update:boolean]',
        'Update the deno.json file for the new tasks of the dpm.json file!',
      )
      .option(
        '-n --new [new:boolean]',
        'Add a new task to the dpm.json file and the deno.json file!',
      )
      .option(
        '-l --list [list:string]',
        'List all tasks on the dpm.json or on the deno.json file!',
      )
      .example(
        'Use tasks',
        `This tool help you to make the tasks managment more easy for run the tasks you need ${
          colors.green('deno task <taskName>')
        }`,
      )
      .stopEarly()
      .action(async (options) => {
        // Update the tasks in the deno.json file from the dpm.json
        if (options.update) {
          await tasks.UpdateTasks();
          Deno.exit();
        }

        // Add a new task to the file with a ui
        if (options.new) {
          await tasks.addDpmTask();
          Deno.exit();
        }

        // Add the list and console out in table
        switch (options.list) {
          case 'deno': {
            await tasks.listDenoTasks();
            break;
          }

          case 'dpm': {
            await tasks.listDpmTasks();
            break;
          }

          case 'all': {
            LOGGER.info('Showing the content of the deno files!');
            await tasks.listDenoTasks();
            LOGGER.info('Showing the content of the dpm files!');
            await tasks.listDpmTasks();
            break;
          }

          default: {
            LOGGER.error(
              'Error action not value: Only valid -> all, dpm, deno',
            );
            Deno.exit(2);
          }
        }
      });
  }
}