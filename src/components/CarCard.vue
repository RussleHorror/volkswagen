<template>
    <div class="car" :style="{ width: modal ? '100%' : '330px', margin: modal ? '0' : '10px' }">
        <div class="car__image-block">
            <img :src="car.images[0]"
                 :alt="car.model_name"
                 :width="modal ? 400 : 250"
            >
        </div>
        <section class="car__info-block" :style="{textAlign:  modal ? 'center' : 'left' }">
            <div class="car__info-block__model">
                {{car.model_name}} {{car.kit_name ? car.kit_name : ''}}
            </div>
            <div class="car__info-block__price">
                {{formatPrice(car.price)}}
            </div>
            <div class="car__info-block__features">
                <div class="car__info-block__features__title">Особенности:</div>
                 <!-- :key - это обязательно -->
                <ul v-if="!state.showMore" class="car__info-block__features__list" 
                    v-for="feature in modal ? car.features : car.features.slice(0,3) ">
                    <li>
                        {{feature}}
                    </li>
                </ul>
                <span v-if="car.features.length > 3 && !modal"
                      class="car__info-block__features__show-more"
                      @click="$emit('open-modal')"
                >
                    еще {{formatShowMore(car.features.length)}} 
                </span>
            </div>
        </section>
        <div v-if="!modal" class="car__geo">
            <img src="@/assets/pin.svg">
            <div class="car__geo__address" @click="$emit('open-map', car)">
                {{car.dealer.name}}, {{car.dealer.city}}<p style="display:inline;" v-if="car.dealer.distance !== 0 && car.dealer.distance < 1000">{{`, ~ ${car.dealer.distance} км`}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    car: Object,
    imgWidth: Number,
    modal: Boolean
  },
  data: () => ({
    state: {
      showMore: false
    }
  }),
  computed: {
    ...mapGetters({
      cars: "cars"
    }),
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";
    },
    formatShowMore(length) {
      const text_forms = ['особенность', 'особенности', 'особенностей']
      const remaining = length - 3;
      const n = remaining % 100;
      const n1 = remaining % 10;
      if (n > 10 && n < 20) {
        return `${remaining} ${text_forms[2]}`;
      }
      if (n1 > 1 && n1 < 5) {
        return `${remaining} ${text_forms[1]}`;
      }
      if (n1 === 1) {
        return `${remaining} ${text_forms[0]}`;
      }
      return `${remaining} ${text_forms[2]}`;
    }
  }
};
</script>

<style lang="scss">
.car {
  min-height: 410px;
  background: white;
  border-radius: 15px;
  position: relative;
  font-family: ExoTwo, serif;
  &__image-block {
    img {
      display: block;
      margin: 0 auto;
    }
  }
  &__info-block {
    padding: 30px 30px 50px;
    &__model {
      font-size: 1.5em;
      color: #259ed5;
    }
    &__price {
      margin-top: 10px;
      color: black;
      font-size: 1.6em;
    }
    &__features {
      text-align: left;
      margin-top: 15px;
      color: #919598;
      font-size: 0.9em;
      &__title {
        margin-bottom: 10px;
      }
      &__list {
        margin-left: 17px;
        li {
          margin: 5px 0;
        }
      }
      &__show-more {
        color: #259ed5;
        cursor: pointer;
      }
    }
  }
  &__geo {
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    height: 40px;
    width: 100%;
    color: #259ed5;
    font-size: 0.9em;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    border-top: 1px solid #dfe0e2;
    img {
      width: 30px;
      display: block;
      margin: 5px;
    }
    &__address {
      cursor: pointer;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: 85%;
    }
  }
}
</style>