import CONFIG from '../../globals/config';

const createRestaurantItemTemplate = (resto) => `
  <div class="restaurant-card">
    <div class="resto-item__header">
      <div class="city-label">
        <span class="city-label-text">
          Kota ${resto.city}
        </span>
      </div>
        <picture>
          <source data-srcset="${CONFIG.BASE_IMAGE_URL + resto.pictureId}">
          <img class="resto-item__header__poster lazyload"
              data-src="${CONFIG.BASE_IMAGE_URL + resto.pictureId}" 
             alt="${resto.name}" />
        </picture>
    </div>
    <div class="card-body">
      <div class="resto-item__header__rating">
        <p>⭐️<span class="movie-item__header__rating__score">${
  resto.rating
}</span></p>
      </div>
      <h3 class="card-title" id="resto-title">
        <a href="/#/details/${
  resto.id
}" title="Link ke halaman detail makanan">${resto.name}</a>
      </h3>
    </div>
  </div>
`;

const createRestaurantDetailTemplate = (resto) => `
    <div class="restaurant-detail">
      <div class="restaurant-detail__poster">
        <picture>
          <source data-srcset="${CONFIG.BASE_IMAGE_URL + resto.pictureId}">
          <img class="lazyload" 
            data-src="${CONFIG.BASE_IMAGE_URL + resto.pictureId}" 
            alt="${resto.name}">
        </picture>
      </div>
    </div>
    <div class="restaurant-detail__info">
      <h2>${resto.name}</h2>
      <ul>
        <li>
          <h3>Kota</h3>
          <p>${resto.city}</p>
        </li>
        <li>
          <h3>Alamat</h3>
          <p>${resto.address}</p>
        </li>
        <li>
          <h3>Rating</h3>
          <p>${resto.rating}</p>
        </li>
        <li>
          <h3>Foods Menu</h3>
          <span id="food">
          <p>${resto.menus.foods.map((food) => food.name).join(', ')}</p>
          </span>
        </li>
        <li>
          <h3>Drinks Menu</h3>
          <span id="drink">
          <p>${resto.menus.drinks.map((food) => food.name).join(', ')}</p>
          </span>
        </li>
      </ul>
    </div>
    <div class="overview">
      <h2>Deskripsi</h2>
      <p>${resto.description}</p>
    </div>
`;

const createRestoReviewTemplate = (reviews) => `
  <div class="review">
    <p>
    <span class="name">${reviews.name}</span> &bull; <span class="date">${reviews.date}</span>
    </p>
    <p>${reviews.review}</p>
  </div>
`;

const createFavoriteButtonTemplate = () => `
<button aria-label="favorite this restaurant" id="favoriteButton" class="favorite">
<i class="far fa-heart" aria-hidden="true"></i>
</button>
`;

const createFavoritedButtonTemplate = () => `
  <button aria-label="unfavorite this restaurant" id="favoritedButton" class="favorite">
  <i class="fas fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createRestoReviewTemplate,
  createFavoriteButtonTemplate,
  createFavoritedButtonTemplate,
};
