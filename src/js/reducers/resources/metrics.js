const defaultState = {
  list: {
    data: [],
    status: null,
    description: null
  },
  item: {}
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case 'RESOURCES/METRICS/GET/PENDING':
      return {
        ...state,
        list: {
          ...state.list,
          status: 'pending'
        }
      };
    case 'RESOURCES/METRICS/GET/SUCCESS':
      return {
        ...state,
        list: {
          ...state.list,
          status: 'success',
          data: action.payload,
          description: null
        }
      };
    case 'RESOURCES/METRICS/GET/ERROR':
      return {
        ...state,
        list: {
          ...state.list,
          status: 'error',
          data: [],
          description: action.payload
        }
      };
    default:
      return state;
  }
}