export default {
    SET_LOADING: (state, value) => state.loading = value,
    SET_CARS: (state, cars) => state.cars = cars,
    CALCULATE_DISTANCES: (state) => {
        state.cars.forEach(car => {
            let dealerLocation = [car.dealer.latitude, car.dealer.longitude]
            let myLocation = [55.7536232, 37.6199775]
            ymaps.ready(() => {
                let multiRoute = new ymaps.multiRouter.MultiRoute({
                    referencePoints: [
                        myLocation,
                        dealerLocation
                    ],
                    params: {
                        results: 2
                    }
                }, {
                    boundsAutoApply: true
                });
                multiRoute.model.events.add("requestsuccess", function (event) {
                    if (multiRoute.getRoutes().get(0) === undefined) {
                        car.dealer.distance = 0
                    }
                    else {
                        car.dealer.distance = Math.floor(multiRoute.getRoutes().get(0).properties.get('distance').value / 1000)
                    }
                });
            })
        })
    },
    SET_SORT_METHOD: (state, sortMethod) => {
        state.sortMethod = sortMethod
    }
}
