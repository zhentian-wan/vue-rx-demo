<script>
import { shuffle } from "lodash"
export default {
  functional: true,
  render: (createElement, { children, props, data }) => {
    if(props.limit) {
        return createElement('div', data, shuffle(children.slice(0, props.limit)));
    } else {
        return createElement('div', data, shuffle(children));
    }
  }
}
</script>