import FavoriteRestaurantDB from '../../data/favorite-resto';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
    <div class="favorite-content">
      <h2 class="content__heading">Your Favorites Restaurant</h2>
      <div id="restaurant" class="restaurant"></div>
      <div class="restaurant-item__not__found" style="display: none;">
        Tidak ada restoran untuk ditampilkan.
      </div>
    </div>
    `;
  },

  async afterRender() {
    document.querySelector('.jumbotron').style.display = 'none';
    const restaurants = await FavoriteRestaurantDB.getAllRestaurants();
    const restoContainer = document.querySelector('#restaurant');
    const notFoundElement = document.querySelector(
      '.restaurant-item__not__found',
    );

    // Kosongkan kontainer restoran
    restoContainer.innerHTML = '';

    // Tampilkan elemen ".restaurant-item__not__found" jika tidak ada restoran
    if (restaurants.length === 0) {
      notFoundElement.style.display = 'block';
    } else {
      notFoundElement.style.display = 'none';
      // Tampilkan daftar restoran
      restaurants.forEach((restaurant) => {
        restoContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    }
  },
};

export default Favorite;
