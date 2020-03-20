const cityOverview = {
  id: 'Москва',
  trips_volume: {
    present: 8290,
    past: 7290
  },
  orders_volume: 1360,
  burned: 350
};

export const citiesOverviewController = (request, response, next) => {
  response.set('content-type', 'application/json');
  response.send(cityOverview);
  response.end();
};