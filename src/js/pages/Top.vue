<template>
    <div>
        <p>foo</p>
    </div>
</template>

<script>
import {mapState} from 'vuex'


export default {
    components: {
    },
    computed: mapState({
        articles: state => state.article.list,
    }),
}
</script>

<style lang="scss" scoped>
</style>
