import React, {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {useDispatch, useSelector} from "react-redux";

import ItemNotFound from "../master/itemNotFound/ItemNotFound";
import SimpleLoading from "../master/simpleLoading/SimpleLoading";
import ProductMiniCard from "../productMiniCard/ProductMiniCard";
import CategoryCard from "./partials/CategoryCard";
import {
  getCategoriesProducts,
  getMainSubCategoryList,
} from "./_redux/Action/ProductCategoriesAction";

const SubCategory = ({id}) => {
  const dispatch = useDispatch();

  const isAdding = useSelector((state) => state.WishlistReducer.isAdding);
  const isRemove = useSelector(
    (state) => state.WishlistReducer.isWishListRemove
  );

  const [page, setpage] = useState(1);
  const [products, setproducts] = useState([]);

  const loadingSubCategory = useSelector(
    (state) => state.ProductCategoryReducer.loadingSubCategory
  );
  const productSubCategoryList = useSelector(
    (state) => state.ProductCategoryReducer.productSubCategoryList
  );
  const subParent = useSelector(
    (state) => state.ProductCategoryReducer.subParent
  );

  useEffect(() => {
    dispatch(getMainSubCategoryList(id));
  }, [id, isAdding, isRemove]);

  let fetchMoreData = () => {
    setpage(page + 1);
    // console.log('first', categoriesAllProducts)
    // setTimeout(() => {
    dispatch(getCategoriesProducts(id, page));

    // }, 2000);

    //  console.log('hi')
  };
  const categoriesAllProducts = useSelector(
    (state) => state.ProductCategoryReducer.categoriesAllProducts
  );

  // console.log("categoriesAllProducts", categoriesAllProducts.meta);
  useEffect(() => {
    dispatch(getCategoriesProducts(id, page));
  }, [id, isAdding, isRemove]);

  useEffect(() => {
    if (categoriesAllProducts.data) {
      let margedProducts = [...products, ...categoriesAllProducts.data];
      setproducts(margedProducts);
    }
    // dispatch(getCategoriesProducts(id,page));
  }, [categoriesAllProducts]);

  // console.log('products', products)
  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(getCategoriesProducts(id));
  //   }, 3000);
  // }, [isAdding]);

  return (
    <React.Fragment>
      {/* start */}
      {/* {
                typeof subParent !== "undefined" && subParent !== null && (
                    <img src={subParent.cover_image} alt={subParent.name} className="category_cover_img" />
                )
            } */}
      {/* end */}
      <div className="sub_category pt-5">
        <div className="sub_category_container container">
          {/* start */}
          <div className="row">
            <div className="col-12 col-md-12">
              <div className="section-heading py-3">
                <h4 className="heading-title">
                  <span className="heading-circle green"></span>
                  {typeof subParent !== "undefined" && subParent !== null
                    ? subParent.name
                    : "Category"}
                </h4>
              </div>
              {!loadingSubCategory && productSubCategoryList.length === 0 && (
                <ItemNotFound title="Category" />
              )}
            </div>

            {productSubCategoryList &&
              productSubCategoryList.length > 0 &&
              productSubCategoryList.map((item, index) => (
                <CategoryCard item={item} path="sub-sub-category" />
              ))}
          </div>
          {/* end */}
          {loadingSubCategory === true && <SimpleLoading type="spokes" />}
        </div>
      </div>
      <div className="product-section py-5">
        <div className="container">
          {products?.length && (
            <InfiniteScroll
              dataLength={products?.length}
              next={fetchMoreData}
              hasMore={products.length < categoriesAllProducts?.meta?.total}
              loader={<h4>Loading...</h4>}
              style={{overflow: "hidden"}}>
              <div className="row">
                {products.length > 0 &&
                  products.map((item, index) => (
                    <ProductMiniCard product={item} key={index + 1} />
                  ))}
              </div>
            </InfiniteScroll>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SubCategory;
