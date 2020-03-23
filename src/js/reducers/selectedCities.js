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
    case 'SELECTEDCITIES/GET/PENDING':
      return {
        ...state,
        list: {
          ...state.list,
          status: 'pending'
        }
      };
    case 'SELECTEDCITIES/GET/SUCCESS':
      return {
        ...state,
        list: {
          ...state.list,
          status: 'success',
          data: action.payload,
          description: null
        }
      };
    case 'SELECTEDCITIES/GET/ERROR':
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