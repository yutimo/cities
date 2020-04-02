const defaultState = {
  ui: {
    filters: {
      selectedCities: [],
      selectedMetric: null
    }
  },
  chart: {
    data: [],
    status: null,
    description: null
  }
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case 'TREEMAP/CHART/GET/PENDING':
      return {
        ...state,
        chart: {
          ...state.chart,
          status: 'pending'
        }
      };
    case 'TREEMAP/CHART/GET/SUCCESS':
      return {
        ...state,
        chart: {
          ...state.chart,
          status: 'success',
          data: action.payload,
          description: null
        }
      };
    case 'TREEMAP/CHART/GET/ERROR':
      return {
        ...state,
        chart: {
          ...state.chart,
          status: 'error',
          data: [],
          description: action.payload
        }
      };
    case 'TREEMAP/UI/FILTERS/PATCH':
      return {
        ...state,
        ui: {
          filters: {
            ...state.ui.filters,
            [action.payload.field]: action.payload.value
          }
        },
      };
    default:
      return state;
  }
}