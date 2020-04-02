import {createSelector} from 'reselect';

export default createSelector(
  state => state.pages.treemap.chart.data,
  items => {
    const values = items.map(item => item.present);

    if (values.length) {
      return Math.max(...values);
    }

    return 0;
  }
)