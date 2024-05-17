/* eslint-disable quotes */
/* eslint-disable no-shadow */
import TheRestaurantDbSource from "../../data/therestaurantdb-source";
import { createRestaurantItemTemplate } from "../templates/template-creator";

const Home = {
  async render() {
    return `
    <div class="content">
        <h2 class="content__heading">Explore Restaurant</h2>
        <div id="restaurant" class="restaurant">
        </div>
    </div>
        `;
  },

  async afterRender() {
    const restoContainer = document.querySelector("#restaurant");
    const restaurant = await TheRestaurantDbSource.ListRestaurants();
    restaurant.forEach((restaurant) => {
      restoContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Home;
