import Dlog from 'https://deno.land/x/dlog2@1.1.1/mod.ts';
import { BASE_DIRECTORIES } from 'mods/dirs.ts';

// Export the base LOGGER
export const LOGGER = new Dlog('DPM', true, BASE_DIRECTORIES.LOGS);
