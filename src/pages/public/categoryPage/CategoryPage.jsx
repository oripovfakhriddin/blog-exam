import { useParams } from "react-router-dom";
import "./categoryPage.scss";
import { Fragment, useCallback, useEffect, useState } from "react";
import request from "../../../server/request";
import SearchingForm from "../../../components/allForm/searchingForm/SearchingForm";
import AllPostsPaginate from "../../../components/allPostsPaginate/AllPostsPaginate";
import { LIMIT } from "../../../constants";
import ReactPaginate from "react-paginate";

const CategoryPage = () => {
  const [allPosts, setAllPosts] = useState([]);

  const [categoryData, setCategoryData] = useState([]);
  const { categoryId } = useParams();
  const [searchValue, setSearchValue] = useState("");

  const getData = useCallback(async () => {
    let { data } = await request.get(`category/${categoryId}`);
    setCategoryData(data);
  }, [categoryId]);

  const getAllPosts = useCallback(async () => {
    let {
      data: { data },
    } = await request.get("post");
    setAllPosts(data);
  }, []);


  useEffect(() => {
    getData();
    getAllPosts();
  }, [getData, getAllPosts]);

  const handleSearchClick = (values) => {
    setSearchValue(values);
  };

  const handlePageClick = () => {};

  return (
    <Fragment>
      <section id="category">
        <div className="container">
          <div className="category__box">
            <h2 className="cate__title">{categoryData?.name}</h2>
            <p className="cate__text">{categoryData?.description}</p>
            <h3>
              BLOG {">"} {categoryData?.name}
            </h3>
          </div>
        </div>
      </section>
      <section id="posts">
        <div className="container">
          <SearchingForm
            searchValue={searchValue}
            handleSearchClick={handleSearchClick}
          />
          <div>
            <div className="paginate__box">
              <AllPostsPaginate categoryId={categoryId} data={allPosts} />
              (
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                previousLabel="< prev"
                renderOnZeroPageCount={null}
                className="page__list"
                pageClassName="page__item"
                nextClassName="page__item"
                previousClassName="page__item"
                activeClassName="active__page"
                disabledClassName="disabled__page"
              />
              )
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default CategoryPage;
