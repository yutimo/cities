import {createSelector} from 'reselect';

import maxValueTreemapSelector from './maxValueTreemapSelector';

export default createSelector(
  state => state.pages.treemap.chart.data,
  maxValueTreemapSelector,
  (items, maxValue) => items.map(item => {
    return {
      id: item.city,
      name: item.city,
      value: item.present,
      past: item.past,
      colorValue: Math.round((item.present / maxValue) * items.length),
    }
  })
)