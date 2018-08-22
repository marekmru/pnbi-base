<template>
    <div class="pnbi-datatable-plus">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'pnbi-datatable-plus',
    props: [ 'placeholder' ],
    mounted () {
        console.log('adsasd')
    },
}
</script>
