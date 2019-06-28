<template>
    <div class="dialog" v-show="showMask" @click="handleClose">
        <div class="dialog-container" :style="{'width': width + 'px'}" @click.stop="">
            <div class="dialog-title">{{title}}</div>
            <div class="content">
                <slot></slot>
            </div>
            <div class="dialog-footer">
                <slot name="foot"></slot>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    props: {
        value: {},
        // 类型包括 defalut 默认， danger 危险， confirm 确认，
        type:{
            type: String,
            default: 'default'
        },
        width: {
            type: Number,
            default: 500
        },
        content: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        dangerText: {
            type: String,
            default: '删除'
        },
        confirmText: {
            type: String,
            default: '确认'
        },
    },
    data(){
        return{
            showMask: false,
        }
    },
    methods:{
        closeBtn(){
            this.$emit('cancel');
            this.handleClose();
        },
        dangerBtn(){
            this.$emit('danger');
            this.handleClose();
        },
        confirmBtn(){
            this.$emit('confirm');
            this.handleClose();
        },
        handleClose (e) {
            this.showMask = false;
        }
    },
    mounted(){
        this.showMask = this.value;
    },
    watch:{
        value(newVal, oldVal){
            this.showMask = newVal;
        },
        showMask(val) {
            this.$emit('input', val);
        }
    },
}
</script>
<style lang="scss" scoped>
    .dialog{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        box-sizing: border-box;
        padding-bottom: 90px;
        background: rgba(0, 0, 0, 0.6);
        z-index: 9999;
        .dialog-container{
            background: #ffffff;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            position: relative;
            .dialog-title{
                width: 100%;
                height: 60px;
                font-size: 18px;
                color: #ffffff;
                font-weight: 600;
                background: #2b93c6;
                padding: 16px 50px 0 20px;
                box-sizing: border-box;
            }
            .content{
                color: #797979;
                line-height: 26px;
                box-sizing: border-box;
            }
            .close-btn{
                position: absolute;
                top: 16px;
                right: 16px;
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-size: 18px;
                cursor: pointer;
                &:hover{
                    font-weight: 600;
                }
            }
        }
        .dialog-footer {
            position: absolute;
            width: 100%;
            bottom: 30px;
            text-align: center;
        }
    }
</style>