<template>
  <Settings >
    <Layout slot-scope="{header, footer}">
        <MyHeader slot="header" :header="header"></MyHeader>
        <section slot="content" class="flex flex-row flex-no-wrap">
          <Robot :names="names" :num="2"></Robot>
        </section>
        <MyContent slot="content" :limit="4" class="flex flex-row flex-no-wrap">
            <div><img src="https://robohash.org/mindy?set=set4" alt=""></div>
            <div><img src="https://robohash.org/john?set=set4" alt=""></div>
            <div><img src="https://robohash.org/kim?set=set4" alt=""></div>
            <div><img src="https://robohash.org/joel?set=set4" alt=""></div>
            <div><img src="https://robohash.org/maggie?set=set4" alt=""></div>
        </MyContent>
        <MyFooter slot="footer" :footer="footer"></MyFooter> 
    </Layout>
  </Settings>
</template>

<script>

import {Component, Prop, Vue} from 'vue-property-decorator'
import Layout from './Layout';
import Settings from './Settings';

import {Header, Footer, Content, Robot} from './components';


@Component({
  components: {
    Layout,
    Settings,
    Robot,
    MyHeader: Header,
    MyFooter: Footer,
    MyContent: Content
  }
})
export default class HelloWorld extends Vue {
  @Prop({
    default: 'Default message from Hello World Component'
  })
  message

  @Prop({
    default: ["mindy", "john", "kim", "joel", "ben"]
  }) names
}
</script>
