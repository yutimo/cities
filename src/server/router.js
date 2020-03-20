import {citiesController} from './controllers/cities';
import {metricsController} from './controllers/metrics';
import {treemapController} from './controllers/treemap';
import {citiesOverviewController} from './controllers/citiesOverview';

export default app => {
  app.get('/classifiers/cities', citiesController);
  app.get('/classifiers/metrics', metricsController);
  app.get('/chart/treemap', treemapController);
  app.get('/cities/:cityId/overview', citiesOverviewController);
};