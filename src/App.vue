<template>


  <section class="section">

  {{activeTab$}}
  <b-tabs v-model="activeTab">
    <b-tab-item v-for="person of people" :key="person.id" :label="person.name"></b-tab-item>
  </b-tabs>
  <!--  <button class="button" :disabled="disabled$" v-stream:click="{subject: click$, data: 1}">{{buttonText$}}</button>-->
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
  data() {
    return {
      activeTab: 0,
      people: [
        { name: 'Luke', id: 1 },
        { name: 'Darth', id: 4 },
        { name: 'Leia', id: 5 },
        { name: 'Tion', id: 20 }
      ]
    };
  },
  domStreams: ['click$', 'imageError$'],
  subscriptions() {
    const activeTab$ = this.$watchAsObservable('activeTab', {
      immediate: true
    }).pipe(pluck('newValue'));

    const createLoader = url => from(this.$http.get(url)).pipe(pluck('data'));

    const luke$ = activeTab$.pipe(
      map(index => this.people[index].id),
      map(id => `https://starwars.egghead.training/people/${id}`),
      exhaustMap(createLoader),
      catchError(() => of({ name: 'Failed.. :(' })),
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

    const image$ = merge(loadImage$, failImage$);

    const disabled$ = merge(
      this.click$.pipe(mapTo(true)),
      luke$.pipe(mapTo(false))
    ).pipe(startWith(false));

    const buttonText$ = disabled$.pipe(map(b => (b ? 'Loading...' : 'Load')));

    return {
      name$,
      image$,
      failImage$,
      disabled$,
      buttonText$,
      activeTab$
    };
  }
};
</script>
