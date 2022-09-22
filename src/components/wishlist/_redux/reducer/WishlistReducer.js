import * as Types from "../type/Types";

const initialState = {
  isAdding: false,
  isLoading: false,
  addedWishlist: null,
  wishlist: [],
  removeLoading: false,
  isWishListRemove: false,
};
function WishlistReducer(state = initialState, action) {
  switch (action.type) {
    case Types.ADD_TO_WISH_LIST:
      // console.log(wishlist);

      return {
        isAdding: action.payload.isAdding,
        addedWishlist: action.payload.data,
      };
    case Types.GET_USER_WISHLIST:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        wishlist: action.payload.data,
      };
    case Types.REMOVE_FROM_WISHLIST:
      return {
        ...state,
        removeLoading: action.payload.deleting,
      };
    case Types.REMOVE_WISHLIST:
      return {
        ...state,
        isWishListRemove: action.payload,
      };
    default:
      break;
  }
  return state;
}
export default WishlistReducer;
