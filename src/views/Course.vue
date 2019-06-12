<template>
  <div class="Course">
    <bread-crumbs></bread-crumbs>
    <div class="container">
      <div class="catalog">
        <label for="">分类：</label>
        <span class="active">全部</span>
        <span>公共</span>
        <span>专业</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BreadCrumbs from './../components/BreadCrumbs'
export default {
 name: 'Course',
 components: {
   BreadCrumbs
 },
 data () {
 return {
   
 }
 }
}
</script>

<style scoped lang="scss">
/* scss */

</style>

