<template>
    <div>
        <modal name="CarModal"
               @before-open="beforeOpen"
               :adaptive="true"
               :scrollable="true"
               transition="easing"
               height="auto"
               width="500px"
        >
           <car-card :car="car"
                     modal
           />
        </modal>
    </div>
</template>

<script>
    import CarCard from '@/components/CarCard'
    export default {
        components: {
            CarCard
        },
        data: () => ({
            car: {
            }
        }),
        methods: {
            beforeOpen (event) {
                this.car = event.params.car
            }
        }
    }
</script>
