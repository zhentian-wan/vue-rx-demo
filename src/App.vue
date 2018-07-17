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
import { from } from 'rxjs';
import { switchMap, pluck, map } from 'rxjs/operators';

export default {
  name: 'app',
  domStreams: ['click$'],
  subscriptions() {

    const person$ = from(
      this.$http.get(
        "https://starwars.egghead.training/people/1"
      )
    ).pipe(
      pluck('data')
    )

    const luke$ = this.click$.pipe(
      switchMap(() => person$)
    )

    const name$ = luke$.pipe(
      pluck('name')
    )

    const image$ = luke$.pipe(
      pluck('image'),
      map(src => `https://starwars.egghead.training/${src}` )
    )

    return {
      name$,
      image$
    }
  }
};
</script>
