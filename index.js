'use strict'

import {Dialute} from 'dialute';

function* script(r) {
  while (true) {
    yield 'Hello world from Dialute!';
  }
}

Dialute
  .fromEntrypoint(script)
  .shareApp('dist')
  .start();
