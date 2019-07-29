<template>
  <div class="form-item">
    <slot name="append">
    </slot>
    <slot name="iconLeft">
      <i class="icons" :class="iconLeft"></i>
    </slot>
    <div class="form-item-inner">
      <input
      class="input-inner"
      :type="type"
      :placeholder="placeholder"
      :value="value" 
      @input="$emit('input', $event.target.value)">  
      <span class="error-tips" v-if="error">{{error}}</span>
    </div>
    <slot name="iconRight">
      <i class="icons" :class="iconRight" v-if="iconRight"></i>
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
      default: '',
    },
    value: {
      default: ''
    },
    errorTips: String
  },
  data () {
    return {
      // error: ''
    }
  },
  computed: {
    error () {
      return this.errorTips
    }
  },
  // watch: {
  //   errorTips(val) {
  //     this.error = val
  //   }
  // },
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
    position: relative;
    flex: 1;
  }
  .error-tips {
    position: absolute;
    right: 0px;
    font-size: 12px;
    color: #e26262;
    line-height: 50px;
  }
  .input-inner {
    padding: 10px;
    border:0;
    width: 100%;
    box-sizing: border-box;
    outline: none;
    background-color: #ffffff;
  }
}
</style>