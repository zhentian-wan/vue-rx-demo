<template>
  <Settings >
    <Layout slot-scope="{header, footer}">
        <Header slot="header" :header="header"></Header>
        <Content slot="content" :limit="4">
            <div><img src="https://robohash.org/mindy?set=set4" alt=""></div>
            <div><img src="https://robohash.org/john?set=set4" alt=""></div>
            <div><img src="https://robohash.org/kim?set=set4" alt=""></div>
            <div><img src="https://robohash.org/joel?set=set4" alt=""></div>
            <div><img src="https://robohash.org/maggie?set=set4" alt=""></div>
        </Content>
        <Footer slot="footer" :footer="footer"></Footer> 
    </Layout>
  </Settings>
</template>

<script>

import {Component, Prop, Vue} from 'vue-property-decorator'
import Layout from './Layout';
import Settings from './Settings';

import {Header, Footer, Content} from './components';


@Component({
  components: {
    Layout,
    Settings,
    Header,
    Footer,
    Content
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
