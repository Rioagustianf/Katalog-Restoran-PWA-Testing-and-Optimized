/* eslint-disable no-undef */
/* eslint-disable quotes */
/* eslint-disable no-underscore-dangle */
import {
  createFavoriteButtonTemplate,
  createFavoritedButtonTemplate,
} from "../views/templates/template-creator";

const FavoriteButtonInitiator = {
  async init({ favoriteRestaurants, restaurant }) {
    this._favoriteButtonContainer = favoriteButtonContainer;
    this._restaurant = restaurant;
    this._favoriteRestaurants = favoriteRestaurants;
    // eslint-disable-next-line no-underscore-dangle
    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await this._favoriteRestaurants.getRestaurant(id);
    return !!restaurant;
  },

  _renderLike() {
    this._favoriteButtonContainer.innerHTML = createFavoriteButtonTemplate();

    const favoriteButton = document.querySelector("#favoriteButton");
    favoriteButton.addEventListener("click", async () => {
      await this._favoriteRestaurants.putRestaurant(this._restaurant);
      this._renderLiked(); // Perbarui tampilan ke tombol favorited setelah mengkliknya
    });
  },

  _renderLiked() {
    this._favoriteButtonContainer.innerHTML = createFavoritedButtonTemplate();

    const favoritedButton = document.querySelector("#favoritedButton");
    favoritedButton.addEventListener("click", async () => {
      await this._favoriteRestaurants.deleteRestaurant(this._restaurant.id);
      this._renderLike(); // Perbarui tampilan ke tombol favorit setelah mengkliknya
    });
  },
};

export default FavoriteButtonInitiator;
