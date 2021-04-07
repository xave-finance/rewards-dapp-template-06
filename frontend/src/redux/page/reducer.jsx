import actions from "./actions";
const initState = {
  ethPrice: 0
};

export default function pageReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_ETH_PRICE_SUCCESS:
      return {
        ...state,
        ethPrice: action.ethPrice,
      };
    default:
      return state;
  }
}
