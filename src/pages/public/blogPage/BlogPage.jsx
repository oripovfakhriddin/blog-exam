import { Fragment, useEffect, useState } from "react";
import "./blogPageStyle.scss";
import SearchingForm from "../../../components/allForm/searchingForm/SearchingForm";
import ReactPaginate from "react-paginate";
import AllPostsPaginate from "../../../components/allPostsPaginate/AllPostsPaginate";
import request from "../../../server/request";
import { LIMIT } from "../../../constants";

const BlogPage = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [paginationData, setPaginationData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [categoryData, setCategoryData] = useState([]);

  let params = {
    page: activePage,
    limit: LIMIT,
    search: searchValue,
  };

  let param = JSON.stringify(params);

  useEffect(() => {
    const getPosts = async () => {
      try {
        let {
          data: { data, pagination },
        } = await request.get(
          categoryValue && categoryValue !== "all"
            ? `post?category=${categoryValue}`
            : "post",
          { params: JSON.parse(param) }
        );
        setAllPosts(data);
        setPaginationData(pagination);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, [param, categoryValue]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        let {
          data: { data },
        } = await request.get("category");
        setCategoryData(data);
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, []);

  let pageCount = Math.ceil(paginationData?.total / LIMIT);

  const handleSearchClick = (values) => {
    setSearchValue(values);
    setActivePage(1);
  };

  const handlePageClick = ({ selected }) => {
    setActivePage(selected + 1);
  };
  const selectCategory = (value) => {
    setCategoryValue(value);
    setActivePage(1);
  };

  return (
    <Fragment>
      <SearchingForm
        searchValue={searchValue}
        handleSearchClick={handleSearchClick}
      />
      <section>
        <div className="container all__posts__container">
          <div className="all__posts__header">
            <h2 className="all__posts__title">All posts</h2>
            <select
              onChange={(e) => {
                selectCategory(e.target.value);
              }}
              className="category__select"
              name="category"
              id="categoryId"
            >
              <option value="all"> All </option>
              {categoryData?.map((categories, i) => (
                <option key={i} value={categories._id}>
                  {categories?.name}
                </option>
              ))}
            </select>
          </div>
          <span className="line"></span>
          <div className="paginate__box">
            <AllPostsPaginate data={allPosts} />
            {pageCount > 1 ? (
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount || 1}
                previousLabel="< prev"
                renderOnZeroPageCount={null}
                className="page__list"
                pageClassName="page__item"
                nextClassName="page__item"
                previousClassName="page__item"
                activeClassName="active__page"
                disabledClassName="disabled__page"
              />
            ) : null}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default BlogPage;
