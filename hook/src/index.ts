import { Dialute, SberRequest } from 'dialute';

function* script(r: SberRequest) {
  while (true) {
    yield 'Hello world from Dialute!';
  }
}

Dialute
  .fromEntrypoint(script as GeneratorFunction)
  .shareApp('../app/public')
  .start();
