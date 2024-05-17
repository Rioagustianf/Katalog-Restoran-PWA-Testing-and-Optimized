import Details from '../views/pages/details';
import Home from '../views/pages/home';
import Favorite from '../views/pages/favorite';

const routes = {
  '/': Home,
  '/home': Home,
  '/favorite': Favorite,
  '/details/:id': Details,
};

export default routes;
