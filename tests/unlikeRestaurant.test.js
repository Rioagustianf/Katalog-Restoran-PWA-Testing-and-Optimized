import FavoriteButtonInitiator from "../src/scripts/utils/favorite-button-initiator";
import FavoriteRestaurantDB from "../src/scripts/data/favorite-resto";

describe("Tidak Menyukai Restoran", () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="favoriteButtonContainer"></div';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestaurantDB.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestaurantDB.deleteRestaurant(1);
  });

  it("harus menampilkan widget yang berbeda ketika film disukai", async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.querySelector(
        "#favoriteButtonContainer"
      ),
      favoriteRestaurants: FavoriteRestaurantDB,
      restaurant: {
        id: 1,
      },
    });

    expect(
      document.querySelector('[aria-label="unfavorite this restaurant"]')
    ).toBeTruthy();
  });

  it("tidak boleh menampilkan widget seperti ketika film telah disukai ", async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.querySelector(
        "#favoriteButtonContainer"
      ),
      favoriteRestaurants: FavoriteRestaurantDB,
      restaurant: {
        id: 1,
      },
    });

    expect(
      document.querySelector('[aria-label="favorite this restaurant"]')
    ).toBeFalsy();
  });

  it("harus dapat menghapus film yang disukai dari daftar ", async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.querySelector(
        "#favoriteButtonContainer"
      ),
      favoriteRestaurants: FavoriteRestaurantDB,
      restaurant: {
        id: 1,
      },
    });

    document
      .querySelector("[aria-label='unfavorite this restaurant']")
      .dispatchEvent(new Event("click"));
    expect(await FavoriteRestaurantDB.getAllRestaurants()).toEqual([]);
  });

  it("tidak boleh menimbulkan kesalahan ketika pengguna mengklik widget yang tidak disukai jika film yang tidak disukai tidak ada dalam daftar", async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.querySelector(
        "#favoriteButtonContainer"
      ),
      favoriteRestaurants: FavoriteRestaurantDB,
      restaurant: {
        id: 1,
      },
    });

    await FavoriteRestaurantDB.deleteRestaurant(1);
    document
      .querySelector('[aria-label="unfavorite this restaurant"]')
      .dispatchEvent(new Event("click"));
    expect(await FavoriteRestaurantDB.getAllRestaurants()).toEqual([]);
  });
});
