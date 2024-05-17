/* eslint-disable quotes */
const assert = require("assert");

Feature("Liking Restaurant");

Before(({ I }) => {
  I.amOnPage("/#/favorite");
  I.waitForElement("#restaurant", 5);
});

const emptyFavoriteRestoText = "Tidak ada restoran untuk ditampilkan";

Scenario("menayangkan restoran kosong yang disukai", ({ I }) => {
  I.see(emptyFavoriteRestoText, ".restaurant-item__not__found");
  I.amOnPage("/");
});

Scenario("menyukai satu restoran", async ({ I }) => {
  I.see(emptyFavoriteRestoText, ".restaurant-item__not__found");

  I.amOnPage("/");

  I.seeElement(".card-title a");
  const firstMovie = locate(".card-title a").first();
  const firstMovieTitle = (await I.grabTextFrom(firstMovie)).trim();
  I.click(firstMovie);

  I.seeElement("#favoriteButton");
  I.click("#favoriteButton");

  I.amOnPage("/#/favorite");
  I.waitForElement(".restaurant-card", 5); // Pastikan elemen muncul sebelum mengecek

  I.seeElement(".restaurant-card");
  const likedMovieTitle = (await I.grabTextFrom(".card-title")).trim();

  assert.strictEqual(firstMovieTitle, likedMovieTitle);
});

Scenario("tidak menyukai satu restoran", async ({ I }) => {
  I.see(emptyFavoriteRestoText, ".restaurant-item__not__found");

  I.amOnPage("/");

  // Menyukai satu restoran terlebih dahulu
  I.seeElement(".card-title a");
  const firstMovie = locate(".card-title a").first();
  const firstMovieTitle = (await I.grabTextFrom(firstMovie)).trim();
  I.click(firstMovie);

  I.seeElement("#favoriteButton");
  I.click("#favoriteButton");

  I.amOnPage("/#/favorite");
  I.waitForElement(".restaurant-card", 5);

  // Memastikan restoran muncul di halaman favorit
  I.seeElement(".restaurant-card");
  const likedMovieTitle = (await I.grabTextFrom(".card-title")).trim();
  assert.strictEqual(firstMovieTitle, likedMovieTitle);

  // Membatalkan suka restoran tersebut
  I.click(".restaurant-card a");

  // Tambahkan penundaan untuk memastikan halaman detail telah dimuat
  I.wait(1); // Penundaan 1 detik

  // Tunggu sampai elemen #favoritedButton muncul
  I.waitForElement("#favoritedButton", 10); // Tambahkan waktu tunggu hingga 10 detik
  I.seeElement("#favoritedButton");
  I.click("#favoritedButton");

  // Memastikan restoran dihapus dari halaman favorit
  I.amOnPage("/#/favorite");
  I.waitForElement(".restaurant-item__not__found", 10); // Tambahkan waktu tunggu hingga 10 detik
  I.see(emptyFavoriteRestoText, ".restaurant-item__not__found");
});
