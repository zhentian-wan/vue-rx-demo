<script>
export default {
    functional: true,
    render: (h, {props, data}) => {
        return props.names.map(
            name => `https://robohash.org/${name}?set=set${props.num}`
        ).map(
            url => <div><img src={url} alt="" /></div>
        );
    }
}
</script>
