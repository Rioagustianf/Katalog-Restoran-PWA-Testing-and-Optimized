import FavoriteButtonInitiator from "../src/scripts/utils/favorite-button-initiator";
import FavoriteRestaurantDB from "../src/scripts/data/favorite-resto";

describe("Menyukai Restoran", () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="favoriteButtonContainer"></div';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it("Harus Menampilkan Tombol Suka Ketika Restoran Tersebut Belum Pernah Disukai", async () => {
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
    ).toBeTruthy();
  });

  it("Tidak Boleh Menampilkan Tombol Suka Ketika restoran Tersebut Belum Pernah Disukai ", async () => {
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
    ).toBeFalsy();
  });

  it("Harus Bisa Menyukai Restoran ", async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.querySelector(
        "#favoriteButtonContainer"
      ),
      favoriteRestaurants: FavoriteRestaurantDB,
      restaurant: {
        id: 1,
      },
    });

    document.querySelector("#favoriteButton").dispatchEvent(new Event("click"));
    const resto = await FavoriteRestaurantDB.getRestaurant(1);
    expect(resto).toEqual({ id: 1 });

    await FavoriteRestaurantDB.deleteRestaurant(1);
  });

  it("Tidak Boleh Menambahkan Film Lagi Ketika Sudah Disukai ", async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.querySelector(
        "#favoriteButtonContainer"
      ),
      favoriteRestaurants: FavoriteRestaurantDB,
      restaurant: {
        id: 1,
      },
    });
    await FavoriteRestaurantDB.putRestaurant({ id: 1 });
    document.querySelector("#favoriteButton").dispatchEvent(new Event("click"));
    expect(await FavoriteRestaurantDB.getAllRestaurants()).toEqual([{ id: 1 }]);
    await FavoriteRestaurantDB.deleteRestaurant(1);
  });

  it("tidak boleh menambahkan film jika tidak memiliki id ", async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.querySelector(
        "#favoriteButtonContainer"
      ),
      favoriteRestaurants: FavoriteRestaurantDB,
      restaurant: {},
    });
    document.querySelector("#favoriteButton").dispatchEvent(new Event("click"));
    expect(await FavoriteRestaurantDB.getAllRestaurants()).toEqual([]);
  });
});
