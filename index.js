'use strict'

import {Dialute} from 'dialute';

function* script(r) {
  while (true) {
    yield 'Привет мир 1!';
    yield 'Привет мир 2!';
  }
}

Dialute
  .fromEntrypoint(script)
  .shareApp('dist')
  .start();
