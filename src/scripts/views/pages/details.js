// eslint-disable-next-line import/no-unresolved
import UrlParser from '../../routes/Url-parser';
import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import {
  createRestaurantDetailTemplate,
  createRestoReviewTemplate,
} from '../templates/template-creator';
import FavoriteButtonInitiator from '../../utils/favorite-button-initiator';
import FavoriteRestaurantDB from '../../data/favorite-resto';

const Details = {
  async render() {
    return `
    <div class="details">
    <h2>Details Restaurant</h2>
      <div id="resto-detail" class="row"></div>
    </div>
    <div id="favoriteButtonContainer"></div>
    `;
  },

  async afterRender() {
    document.querySelector('.jumbotron').style.display = 'none';
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restoDetail = await TheRestaurantDbSource.DetailRestaurant(url.id);
    const detailContainer = document.querySelector('#resto-detail');
    detailContainer.innerHTML = createRestaurantDetailTemplate(restoDetail);

    detailContainer.innerHTML += `
    <div id="resto-review" class="resto-review"><h2>Reviews</h2></div>
    `;

    const restoReview = document.querySelector('#resto-review');
    restoDetail.customerReviews.forEach((review) => {
      restoReview.innerHTML += createRestoReviewTemplate(review);
    });

    FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.querySelector(
        '#favoriteButtonContainer',
      ),
      favoriteRestaurants: FavoriteRestaurantDB,
      restaurant: {
        id: restoDetail.id,
        name: restoDetail.name,
        city: restoDetail.city,
        description: restoDetail.description,
        pictureId: restoDetail.pictureId,
        rating: restoDetail.rating,
      },
    });
  },
};

export default Details;
