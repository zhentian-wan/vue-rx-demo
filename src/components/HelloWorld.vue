<template>
  <div @click="onClick" class="hello">
    {{message}}
  </div>
</template>

<script>

import {Component, Prop, Vue} from 'vue-property-decorator'

@Component({})
export default class HelloWorld extends Vue {
  @Prop({
    default: 'Default message from Hello World Component'
  })
  message

  onClick() {
    this.message = 'Goodbye'
  }
}
</script>
