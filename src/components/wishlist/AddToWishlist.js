import axios from "axios";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toggleModal} from "../../_redux/_global_store/action/GlobalAction";
import {showToast} from "../master/Helper/Notification";
import {getOwnProductList} from "../ourProducts/_redux/Action/OurProductAction";
import SmallLoading from "./../master/simpleLoading/SmallLoading";
import {getUserDataAction} from "./../_redux/getUserData/Action/UserDataAction";
import {
  addToWishlistAction,
  isRemoveAction,
} from "./_redux/action/WishlistAction";
/**
 * @param {id} need product id for added product in wishlist
 * @returns AddToWishlist component
 */
const AddToWishlist = ({id, is_in_wishlist, setItemRemove, itemRemove}) => {
  // console.log(is_in_wishlist, "is_in_wishlist");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.UserDataReducer.userData);
  const isAdding = useSelector((state) => state.WishlistReducer.isAdding);
  const [addingID, setAddingID] = useState(null);
  // const [itemRemove, setItemRemove] = useState(false);

  useEffect(() => {
    dispatch(getUserDataAction());
  }, []);

  const handleRemoveToWishlist = async () => {
    const access_token = JSON.parse(localStorage.getItem("access_token"));
    if (
      typeof access_token !== "undefined" &&
      access_token !== null &&
      access_token !== ""
    ) {
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
        },
      };
      const url = `/wishlist-products/remove/${id}`;
      axios.get(url, config).then((res) => {
        if (res.status == 200) {
          setItemRemove(true);
          showToast("error", "Wishlist Remove successfully!");
          // window.location.reload()
        }
      });
    }
  };

  // useEffect(() => {
  //   console.log("item remove");
  //   dispatch(getUserDataAction());
  // }, [itemRemove]);

  const handleAddToWishlist = () => {
    if (
      typeof userData !== "undefined" &&
      userData !== null &&
      userData !== ""
    ) {
      if (!is_in_wishlist) {
        setAddingID(id);
        dispatch(addToWishlistAction(id));
        dispatch(getOwnProductList());
        dispatch(isRemoveAction(false));
      } else {
        handleRemoveToWishlist();
        dispatch(isRemoveAction(true));
      }
    } else {
      dispatch(toggleModal());
    }

    setTimeout(() => {
      dispatch(getOwnProductList());
    }, 1000);
  };

  useEffect(() => {
    // window.location.reload();
    if (!isAdding) {
      setAddingID(null);
    }
    // dispatch(getOwnProductList());
    // window.location.reload();
  }, [isAdding]);

  return addingID !== null && addingID === id && isAdding === true ? (
    <SmallLoading />
  ) : (
    <div
      className={`add_to_wishlist   pointer ${
        is_in_wishlist ? "inWishList" : ""
      }`}
      onClick={handleAddToWishlist}>
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="heart"
        className="svg-inline--fa fa-heart fa-w-16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512">
        <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
      </svg>
    </div>
  );
};

export default AddToWishlist;
