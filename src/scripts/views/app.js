/* eslint-disable no-underscore-dangle */
import drawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/Url-parser';
import routes from '../routes/routes';

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this._initialAppShell();
  }

  _initialAppShell() {
    drawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();

    const skipLink = document.querySelector('.skip2content');
    const mainContent = document.querySelector('#main-container');

    skipLink.addEventListener('click', (event) => {
      event.preventDefault();
      mainContent.focus();
    });
  }
}

export default App;
