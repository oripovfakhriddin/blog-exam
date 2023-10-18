import { Fragment, useCallback, useEffect, useState } from "react";
import "./myPostsPageStyle.scss";
import SearchingForm from "../../../components/allForm/searchingForm/SearchingForm";
import request from "../../../server/request";
import ReactPaginate from "react-paginate";
import { LIMIT } from "../../../constants";
import PostsPaginate from "../../../components/postsPaginate/PostsPaginate";
import { toast } from "react-toastify";
import Modal from "../../../components/modal/Modal";


const MyPostsPage = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [paginationData, setPaginationData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [modal, setModal] = useState(false);

  let params = {
    page: activePage,
    limit: LIMIT,
    search: searchValue,
  };
  

  let param = JSON.stringify(params);

  const getPosts = useCallback(async () => {
    try {
      let {
        data: { data, pagination },
      } = await request.get(
        categoryValue && categoryValue !== "all"
          ? `post/user?category=${categoryValue}`
          : "post/user",
        { params: JSON.parse(param) }
      );
      setUserPosts(data);
      setPaginationData(pagination);
    } catch (err) {
      toast.error(err.response.data);
    }
  }, [categoryValue, param]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        let {
          data: { data },
        } = await request.get("category");
        setCategoryData(data);
      } catch (err) {
        toast.error(err.response.data);
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

  const deletePost = useCallback(async (id) => {
      await request.delete(`post/${id}`);
      toast.info("Deleted posts success!");
  }, []);

  useEffect(() => {
    deletePost();
  }, [deletePost]);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <Fragment>
      <section>
        <div className="container">
          <div className="header__box">
            <h2>My posts</h2>
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
                <option key={i} value={categories?._id}>
                  {categories?.name}
                </option>
              ))}
            </select>
            <button onClick={toggleModal} className="open__modal__btn">Add post</button>
          </div>
          <SearchingForm
            searchValue={searchValue}
            handleSearchClick={handleSearchClick}
          />
          <div className="container">
            <div className="paginate__box">
              <PostsPaginate data={userPosts} deletePost={deletePost} />
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
        </div>
        <Modal toggleModal={toggleModal} categoryData = {categoryData} modal={modal} />
      </section>
    </Fragment>
  );
};

export default MyPostsPage;
