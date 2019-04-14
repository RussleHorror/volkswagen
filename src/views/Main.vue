<template>
    <div  v-loading.fullscreen.lock="loading" class="cars">
        <div class="cars__filtration">
            Сортировать
            <el-radio-group v-model="sortMethod">
                {{sortMethod}}
                <el-radio style="margin-left: 20px" label="price">По цене</el-radio>
                <el-radio label="distance">По удаленности</el-radio>
            </el-radio-group>
        </div>
        <div class="cars__list" v-if="!loading">
            <car-card
                    v-for="car in cars"
                    :key="car.id"
                    :car="car"
                    @open-modal="$modal.show('CarModal', {car: car})"
                    @open-map="$modal.show('MapModal', {dealer: car.dealer})"
            />
        </div>
        <car-modal/>
        <map-modal/>
    </div>
</template>

<script>
    import CarCard from '@/components/CarCard'
    import CarModal from '@/components/modals/CarModal'
    import MapModal from '@/components/modals/MapModal'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        components: {
            CarCard,
            CarModal,
            MapModal
        },
        async mounted() {
            await this.$store.dispatch('loadCars')
        },
        computed: {
            ...mapGetters(['cars', 'loading']),
            sortMethod: {
                get(){
                    return this.$store.getters.sortMethod
                },
                set(sortMethod){
                    this.$store.dispatch('sortCars', sortMethod)
                }
            }
        }
    }
</script>

<style lang="scss">
    .cars {
        &__filtration {
            padding-left: 30px;
            padding-top: 20px;
        }
        background: #f4f5f7;
        width: 100vw;
        height: auto;
        font-family: ExoTwo, serif;
        &__list {
            padding: 20px;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
        }
    }
</style>
