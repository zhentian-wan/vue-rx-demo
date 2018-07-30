<template>
    <div>
        <slot :header=header :footer=footer></slot>    
    </div>
</template>
<script>
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class Settings extends Vue {
    header = 'This is data for header'
    footer = 'This is the data form footer'
}
</script>

/**<script>
export default {
    
    // Renderless component: https://css-tricks.com/building-renderless-vue-components/?utm_campaign=Revue%20newsletter&utm_medium=Newsletter&utm_source=Vue.js%20News

    render() {
        return this.$scopedSlot.default({
            header: 'New header data',
            footer: 'New footer data'
        })
    }
}
</script>
 */