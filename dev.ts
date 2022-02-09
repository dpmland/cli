import { Run } from 'runner/main.ts';
import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { dracoFiles } from 'mods/deps.ts';

if (Deno.args[0] == 'upload') {
  console.log('Formatting and checking the lint with deno!');
  await Run(`${Deno.execPath()} fmt -c deno.json`);
  console.log('Formatted!');
  await Run(`${Deno.execPath()} lint -c deno.json`);
  console.log('Linted!');
  console.log('Ready To Upload dont forget use the Contributing guides!');
  Deno.exit();
}

if (Deno.args[0] == 'help') {
  console.log(
    'With this tool you can check the requirements and develop more easy and fast dpm!\nMore info on https://github.com/dpmland/dpm/blob/dev/CONTRIBUTING.md\nAvaliable Commands:\n CLEAN, UPLOAD!',
  );
  Deno.exit();
}

if (Deno.args[0] == 'clean') {
  console.log('Cleanning the files!');
  if (dracoFiles.exists(BASE_DIRECTORIES.IMPORT_MAPS)) {
    await Deno.remove(BASE_DIRECTORIES.IMPORT_MAPS);
    console.log(`Removed the ${NAME_DIRECTORIES.IMPORT_MAPS} file!`);
  }
  if (dracoFiles.exists(BASE_DIRECTORIES.DENO_JSON_FILE)) {
    await Deno.remove(BASE_DIRECTORIES.DENO_JSON_FILE);
    console.log(`Removed the ${NAME_DIRECTORIES.DENO_JSON_FILE} file!`);
  }
  if (dracoFiles.exists(BASE_DIRECTORIES.DEPS_DIR)) {
    await Deno.remove(BASE_DIRECTORIES.DEPS_DIR, { recursive: true });
    console.log(`Removed the ${NAME_DIRECTORIES.DEPS_DIR} dir!`);
  }
  console.log('Cleaned!');
  Deno.exit();
}

console.log('For more information run ddpm help!');