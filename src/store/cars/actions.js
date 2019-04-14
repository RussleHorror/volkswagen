import allCars from '@/cars.js'

const getCars = (sortMethod) => new Promise((resolve) => {
    let cars = []
    if (sortMethod === 'price') {
        cars = allCars.sort((car1, car2) => car1.price - car2.price)
    }
    if (sortMethod === 'distance') {
        cars = allCars.sort((car1, car2) => car1.dealer.distance - car2.dealer.distance)
    }
    setTimeout(() => resolve(cars), 2000);
})

export default {
    async loadCars(context) {
        context.commit('SET_LOADING', true)
        const cars = await getCars(context.state.sortMethod) 
        context.commit('SET_CARS', cars)
        context.commit('CALCULATE_DISTANCES')
        setTimeout(()=> {
            context.commit('SET_LOADING', false)
        }, 2400)

    },
    sortCars(context, sortMethod) {
        context.commit('SET_SORT_METHOD', sortMethod)
        context.dispatch('loadCars')
    }
}