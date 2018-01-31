<template>
    <div v-if="loading" class="loadTop" >
        <div class="flex__center flex__column loadWidth load_bg" >
            <div class="loadEffect">
                <span></span> <span></span>
                <span></span> <span></span>
                <span></span> <span></span>
                <span></span> <span></span>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapMutations, mapActions  } from 'vuex';
    export default{
    		computed:{
    			...mapState({
    				loading:(state)=>{
    					return state.progress_bar.now_loading
    				}
    			})
    		},
        methods:{
            close() {
                this.$emit('close');
            }
        }
    }
</script>

<style lang='scss' scoped>
    .loadTop{
        position:absolute;
        top:0;
        left:0;
        z-index:9999;
        background: rgba(0,0,0,0.5);
    }

    .loadWidth{
        width:100vw;
        height:100vh;
    }

    .loadEffect {
        width: 70px;
        height: 70px;
        position: absolute;
        display: block;
        margin: 0 auto;
        top: calc(50% - 35px);
        left: calc(50% - 35px);
    }

    .loadEffect span {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #ccc;
        position: absolute;
        -webkit-animation: load 1.04s ease infinite;
    }

    @-webkit-keyframes load {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0.2;
        }
    }

    .loadEffect span:nth-child(1) {
        left: 0;
        top: 50%;
        margin-top: -6px;
        -webkit-animation-delay: 0.13s;
    }

    .loadEffect span:nth-child(2) {
        left: 8.3px;
        top: 8.3px;
        -webkit-animation-delay: 0.26s;
    }

    .loadEffect span:nth-child(3) {
        left: 50%;
        top: 0;
        margin-left: -6px;
        -webkit-animation-delay: 0.39s;
    }

    .loadEffect span:nth-child(4) {
        top: 8.3px;
        right: 8.3px;
        -webkit-animation-delay: 0.52s;
    }

    .loadEffect span:nth-child(5) {
        right: 0;
        top: 50%;
        margin-top: -6px;
        -webkit-animation-delay: 0.65s;
    }

    .loadEffect span:nth-child(6) {
        right: 8.3px;
        bottom: 8.3px;
        -webkit-animation-delay: 0.78s;
    }

    .loadEffect span:nth-child(7) {
        bottom: 0;
        left: 50%;
        margin-left: -6px;
        -webkit-animation-delay: 0.91s;
    }

    .loadEffect span:nth-child(8) {
        bottom: 8.3px;
        left: 8.3px;
        -webkit-animation-delay: 1.04s;
    }
    .load_bg{

    }
</style>
