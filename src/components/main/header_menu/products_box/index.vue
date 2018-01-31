<template>
    <transition name="headerproducts">
        <div class="products__container">
        <ul v-if="showAllProducts">
            <li v-for="service in allservices" @click="gotoService(service)">
                {{service.text}}
            </li>
        </ul>
        </div>
    </transition>
</template>

<script>
    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
    export default {
        props: ['showAllProducts'],
        methods: {
            gotoService(s) {

                this.$router.push(`/service/${s.short_name}`);
                this.$emit('openProducts');
            },
        },
        mounted(){
            this.$store.dispatch('fetchAllServicesMenu');
        },
        computed:{
            ...mapState({
                allservices: (state) => {
                    return state.menus_info.allServicesMenu
                }
            })
        } 
             
    }
</script>

<style lang="scss" scoped>
    .products__container {
        position: fixed;
        z-index: 100;
        left: 60px;
        top: 50px;
        right: 0;
        background-color: white;
        overflow: hidden;
        padding: 0 60px;
        background-image: url("../../../../assets/images/common/submenu_bg.jpg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        ul{
            width: 620px;
            padding-top: 25px;
            li {
                display: inline-block;
                width: 185px;
                color: white;
                padding: 15px 0;
                font-size: 12px;
                &:hover{
                    color: #9B9B9B;
                }
            }
        }
    }

    .headerproducts-enter-active {
        transition: all 0.3s ease;
    }
    .headerproducts-enter {
        height: 0px !important;
    }
    .headerproducts-leave-active {
        transition: all 0.3s ease;
        height: 0px !important;
    }
    .headerproducts-leave {

    }
</style>