/* eslint-disable no-underscore-dangle */
const DrawerInitiator = {
  init({ button, drawer }) {
    button.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer);
    });

    window.addEventListener('click', (event) => {
      event.stopPropagation();
      drawer.classList.remove('open');
    });
  },

  _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open');
  },
};

export default DrawerInitiator;
