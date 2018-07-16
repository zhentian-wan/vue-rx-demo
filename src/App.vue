<template>
  <h1>{{interval$}}</h1>
</template>

<script>

import {interval, of} from 'rxjs'
import {switchMap} from 'rxjs/operators'

export default {
  name: 'app',
  subscriptions: {
    interval$: interval(1000)
  }
}
</script>
