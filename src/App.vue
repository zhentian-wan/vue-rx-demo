<template>
  <section class="section">
    <button class="button" :disabled="disabled$" v-stream:click="click$">{{buttonText$}}</button>
    <h2>
      {{name$}}
    </h2>
    <img v-stream:error="imageError$" :src="image$" alt="">
  </section>
</template>

<script>
import { from, of, merge, throwError } from 'rxjs';
import {
  exhaustMap,
  switchMap,
  pluck,
  map,
  mapTo,
  catchError,
  shareReplay,
  share,
  startWith
} from 'rxjs/operators';

export default {
  name: 'app',
  domStreams: ['click$', 'imageError$'],
  subscriptions() {
    const createLoader = url => from(this.$http.get(url)).pipe(pluck('data'));

    const luke$ = this.click$.pipe(
      mapTo('https://starwars.egghead.training/people/1'),
      exhaustMap(createLoader),
      catchError(() => of({name: 'Failed.. :('})),
      share()
    );

    const name$ = luke$.pipe(pluck('name'));

    const loadImage$ = luke$.pipe(
      pluck('image'),
      map(src => `https://starwars.egghead.training/${src}`)
    );

    const failImage$ = this.imageError$.pipe(
      mapTo(`http://via.placeholder.com/400x400`)
    );

    const image$ = merge(
      loadImage$,
      failImage$
    )

    const disabled$ = merge(
      this.click$.pipe(mapTo(true)),
      luke$.pipe(mapTo(false)),
    ).pipe(startWith(false));

    const buttonText$ = disabled$.pipe(map(b => (b ? 'Loading...' : 'Load')));


    return {
      name$,
      image$,
      failImage$,
      disabled$,
      buttonText$
    };
  }
};
</script>
