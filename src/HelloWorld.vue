<template>
  <Settings >
    <Layout slot-scope="{header, footer}">
        <Header :header="header"></Header>
        <div slot="content" class="flex-grow p-3">Amazing content</div>
        <Footer :footer="footer"></Footer> 
    </Layout>
  </Settings>
</template>

<script>

import {Component, Prop, Vue} from 'vue-property-decorator'
import Layout from './Layout';
import Settings from './Settings';

import {Header, Footer} from './components';


@Component({
  components: {
    Layout,
    Settings,
    Header,
    Footer
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
