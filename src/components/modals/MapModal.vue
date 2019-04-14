<template>
    <div>
        <modal name="MapModal"
               @before-open="beforeOpen"
               :adaptive="true"
               :scrollable="true"
               transition="easing"
               height="auto"
               width="700px"
        >
            <div v-if="dealer.url" class="link">
                <a :href="dealer.url">Перейти на сайт диллера</a>
            </div>
            <div id="map" style="width: 700px; height: 500px"></div>
        </modal>
    </div>
</template>

<script>
    export default {
        data: () => ({
            myLocation: [55.7536232, 37.6199775],
            dealer: {},
        }),
        methods: {
            initMap() {
                ymaps.ready(() => {
                    let myMap = new ymaps.Map("map", {
                        center: this.myLocation,
                        zoom: 14
                    });
                    let multiRoute = new ymaps.multiRouter.MultiRoute({
                        referencePoints: [
                            this.myLocation,
                            this.dealerLocation,
                            this.dealer.address
                        ],
                        params: {
                            results: 2
                        }
                    }, {
                        boundsAutoApply: true
                    });
                    multiRoute.model.events.add("requestsuccess", function (event) {

                        console.log(multiRoute.getRoutes().get(0).properties.get('distance'));

                    });
                    let myGeoObject = new ymaps.GeoObject({
                        geometry: {
                            type: "Point",
                            coordinates: this.myLocation
                        },
                        properties: {
                            iconContent: 'Ваше местоположение',
                        }
                    }, {
                        preset: 'islands#blackStretchyIcon',
                        draggable: false
                    })
                    myMap.geoObjects.add(myGeoObject)
                    myMap.geoObjects.add(multiRoute);

                })
            },
            beforeOpen({params}) {
                this.initMap()
                this.dealer = {
                    ...params.dealer,
                    dealerLocation: [params.dealer.latitude, params.dealer.longitude]
                }
            }
        }
    }
</script>

<style lang="scss">
    .link {
        height: 30px;
        margin-top: 5px;
        text-align: center;
        font-family: ExoTwo, serif;
        font-size: 1em;
        a {
            margin-top: 6px;
            text-decoration: none;
            &:visited {
                color: #259ed5;
            }
            &:active {
                color: #259ed5;
            }
        }
    }
</style>
