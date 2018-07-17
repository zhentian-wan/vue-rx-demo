<template>
  <section class="section">
    <button class="button" v-stream:click="click$">Click</button>
    <h1 class="title">{{random$}}</h1>
  </section>
</template>

<script>
import { interval, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export default {
  name: 'app',
  domStreams: ['click$'],
  subscriptions() {

    const random$ = this.click$.pipe(
      map(() => Math.random())
    )

    return {
      random$
    }
  }
};
</script>
