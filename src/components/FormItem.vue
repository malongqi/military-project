<template>
  <div class="form-item">
    <slot name="append">
    </slot>
    <slot name="icon" v-if="iconLeft">
      <i class="icons" :class="iconLeft"></i>
    </slot>
    <div class="form-item-inner">
      <input
      class="input-inner"
      :type="type"
      :placeholder="placeholder"
      v-model="value">  
    </div>
    <slot name="icon" v-if="iconRight">
      <i class="icons" :class="iconRight"></i>
    </slot>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    iconLeft: {
      type: String,
      default: ''
    },
    iconRight: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      value: ''
    }
  },
  computed: {},
  mounted() {

  },
  methods: {}
}
</script>
<style lang='scss' scoped>
.form-item {
  display: flex;
  padding: 0 10px;
  border: 1px solid #c4c4c4;
  align-items: center;
  .form-item-inner {
    flex: 1;
  }
  .input-inner {
    padding: 10px;
    border:0;
    width: 100%;
    box-sizing: border-box;
    outline: none;
  }
}
</style>