// JSON read line, command line ECAM module
// // for feed-manager.mjs

import * as readline from 'readline';
import { stdin as input, stdout as output } from 'process';

// export for event based
// // const rl = readline.createInterface({ input, output });  
export const rl = readline.createInterface({ input, output });

export function question(query) {
    return new Promise(resolve => {
        rl.question(query, resolve);
    });
}

// Close the input file
export function close() {
    rl.close();
}
