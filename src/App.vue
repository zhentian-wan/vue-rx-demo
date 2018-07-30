<template>


  <section class="section">
  <hello-world message="Message from APP"></hello-world>
  <section style="margin-top: 60px">
      {{activeTab$}}
  <b-tabs v-model="activeTab">
    <b-tab-item v-for="person of people$" :key="person.id" :label="person.name"></b-tab-item>
  </b-tabs>
  <!--  <button class="button" :disabled="disabled$" v-stream:click="{subject: click$, data: 1}">{{buttonText$}}</button>-->
    <h2>
      {{name$}}
    </h2>
    <img v-stream:error="imageError$" :src="image$" alt="">
  </section>

  </section>
</template>

<script>
import HelloWorld from './HelloWorld';
import { from, of, merge, combineLatest } from 'rxjs';
import {
  exhaustMap,
  switchMap,
  pluck,
  map,
  mapTo,
  catchError,
  share,
  startWith
} from 'rxjs/operators';

export default {
  name: 'app',
  components:{
    HelloWorld
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  data() {
    return {
      activeTab: 0
    };
  },
  domStreams: ['click$', 'imageError$'],
  subscriptions() {

    let cache = {};
    const cachePerson = cache => url =>
      cache[url] ?
      cache[url]:
      cache[url] = createLoader(url);

    const activeTab$ = this.$watchAsObservable('activeTab', {
      immediate: true
    }).pipe(pluck('newValue'));

    const createLoader = url => from(this.$http.get(url)).pipe(pluck('data'));

    const people$ = createLoader('https://starwars.egghead.training/people').pipe(
      map(people => people.slice(0,7 ))
    );

    const person$ = combineLatest(
      activeTab$,
      people$,
      (people$, (tabId, people) => people[tabId].id))
    .pipe(
      map(id => `https://starwars.egghead.training/people/${id}`),
      switchMap(cachePerson(cache)),
      catchError(() => of({ name: 'Failed.. :(' })),
      share()
    );

    const name$ = person$.pipe(pluck('name'));

    const loadImage$ = person$.pipe(
      pluck('image'),
      map(src => `https://starwars.egghead.training/${src}`)
    );

    const failImage$ = this.imageError$.pipe(
      mapTo(`http://via.placeholder.com/400x400`)
    );

    const image$ = merge(loadImage$, failImage$);

    const disabled$ = merge(
      this.click$.pipe(mapTo(true)),
      person$.pipe(mapTo(false))
    ).pipe(startWith(false));

    const buttonText$ = disabled$.pipe(map(b => (b ? 'Loading...' : 'Load')));

    return {
      name$,
      image$,
      failImage$,
      disabled$,
      buttonText$,
      activeTab$,
      people$
    };
  }
};
</script>
