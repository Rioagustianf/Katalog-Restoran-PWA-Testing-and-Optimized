/* eslint-disable no-prototype-builtins */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable consistent-return */
// eslint-disable-next-line quotes
import { openDB } from "idb";
// eslint-disable-next-line quotes
import CONFIG from "../globals/config";

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: "id" });
  },
});

const FavoriteRestaurantDB = {
  async getRestaurant(id) {
    if (!id) {
      return;
    }

    // eslint-disable-next-line consistent-return
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },
  async getAllRestaurants() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async putRestaurant(restaurant) {
    if (!restaurant.hasOwnProperty("id")) {
      return;
    }

    return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
  },
  async deleteRestaurant(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
  // eslint-disable-next-line no-empty-function
  async searchRestaurants() {},
};

export default FavoriteRestaurantDB;
