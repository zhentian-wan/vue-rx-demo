<template>
    <div>
        <slot :header=header :footer=footer></slot>    
    </div>
</template>
<script>
import {Component, Vue} from 'vue-property-decorator'

export default class Settings extends Vue {
    header = 'This is data for header'
    footer = 'This is the data form footer'
}
</script>

