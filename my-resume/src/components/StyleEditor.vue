<template>
  <div class="styleEditor" ref="container">
    <div class="code" v-html="codeInStyleTag"></div>
    <pre v-html="highlightedCode"></pre>
  </div>
</template>

<script>
  import Prism from 'prismjs'
  export default {
    name: 'Editor',
    props: ['code'],
    computed: {
      highlightedCode: function () {
        return Prism.highlight(this.code, Prism.languages.css)
      },
      codeInStyleTag: function () {
        return `<style>${this.code}</style`
      }
    },
    methods: {
           goBottom:function(){
             this.$refs.container.scrollTop=100000;
           }
         }
  }

</script>

<style scoped>
  .code {
    display: none;
  }
</style>
