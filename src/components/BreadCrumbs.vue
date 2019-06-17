<template>
 <ul class="bread-crumbs container">
   <li class="bread-item" v-for="(item,index) in lists" :key="'bread' + index">
      <span>{{item.name}}</span>
      <i> > </i>
   </li>
  
 </ul>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'BreadCrumbs',
  components: {

  },
  data () {
    return {
      lists: [] 
    }
  },
  mounted () {
    this.lists = this.$router.currentRoute.matched
  }
}
</script>

<style scoped lang="scss">
.bread-crumbs {
  padding: 25px 0;
  list-style: none;
  font-size: 16px;
  color: #808080;
  .bread-item {
    display: inline;
    &:last-child {
      i {
        display: none
      }
    }
  }
}

</style>
