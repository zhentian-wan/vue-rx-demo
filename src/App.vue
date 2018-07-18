<template>
  <section class="section">
    <button class="button" v-stream:click="click$">Click</button>
    <h2>
      {{name$}}
    </h2>
    <img :src="image$" alt="">
  </section>
</template>

<script>
import { from, of } from 'rxjs';
import { switchMap, pluck, map, mapTo, catchError, shareReplay, share } from 'rxjs/operators';

export default {
  name: 'app',
  domStreams: ['click$'],
  subscriptions() {
    const createLoader = url => from(this.$http.get(url)).pipe(pluck('data'));

    const luke$ = this.click$.pipe(
      mapTo('https://starwars.egghead.trainin/people/1'),
      switchMap(createLoader),
      catchError(() => createLoader('https://starwars.egghead.training/people/2')),
      share()
    );

    const name$ = luke$.pipe(pluck('name'));

    const image$ = luke$.pipe(
      pluck('image'),
      map(src => `https://starwars.egghead.training/${src}`)
    );

    return {
      name$,
      image$
    };
  }
};
</script>
