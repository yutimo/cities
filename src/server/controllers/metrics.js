const metrics = [
  {
    "id":"inhabitants",
    "en":"Number of inhabitants",
    "ru":"Число жителей",
    "optgroup":"Популяция",
    "optgroup_en":"Population",
    "color":"#4651a0",
    "relative":false,
    "target":200000
  },
  {
    "id":"inhabitants_childrens",
    "en":"Number of children inhabitants",
    "ru":"Число детей",
    "optgroup":"Популяция",
    "optgroup_en":"Population",
    "color":"#4651a0",
    "relative":false,
    "target":null
  },
  {
    "id":"middle_age",
    "en":"Middle age",
    "ru":"Срединий возраст",
    "optgroup":"Возраст",
    "optgroup_en":"Age",
    "color":"#8851a0",
    "relative":false,
    "target":null
  },
  {
    "id":"retiree_percent",
    "en":"Retirees percent",
    "ru":"Процент пенсионеров",
    "optgroup":"Возраст",
    "optgroup_en":"Age",
    "color":"#8851a0",
    "relative":true,
    "target":null
  }
]

export const metricsController = (request, response, next) => {
  response.set('content-type', 'application/json');
  response.send(metrics);
  response.end();
};