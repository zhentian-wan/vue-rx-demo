<template>
  <Settings >
    <Layout slot-scope="props">
        <header slot='header'>{{props.header}}</header>
        <footer slot='footer'>{{props.footer}}</footer>
    </Layout>
  </Settings>
</template>

<script>

import {Component, Prop, Vue} from 'vue-property-decorator'
import Layout from './Layout';
import Settings from './Settings';

@Component({
  components: {
    Layout,
    Settings
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
