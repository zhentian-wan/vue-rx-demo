<template>
  <Layout>
  </Layout>
</template>

<script>

import {Component, Prop, Vue} from 'vue-property-decorator'
import Layout from './Layout';

@Component({
  components: {
    Layout
  }
})
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
