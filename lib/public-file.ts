import {existsSync} from 'node:fs';
import {join} from 'node:path';
// Checked when the page is built: a file dropped into /public shows up on the next deploy.
export const publicFileExists=(path:string)=>existsSync(join(process.cwd(),'public',path.replace(/^\//,'')));
