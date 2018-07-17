<template>
  <section class="section">
    <button class="button" v-stream:click="click$">Click</button>
    <h2>
      {{luke$}}
    </h2>
  </section>
</template>

<script>
import { from } from 'rxjs';
import { switchMap, pluck } from 'rxjs/operators';

export default {
  name: 'app',
  domStreams: ['click$'],
  subscriptions() {

    const people$ = from(
      this.$http.get(
        "https://starwars.egghead.training/people/1"
      )
    )

    const luke$ = this.click$.pipe(
      switchMap(() => people$),
      pluck('data', 'name')
    )

    return {
      luke$
    }
  }
};
</script>
