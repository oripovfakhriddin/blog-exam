import { Fragment, useEffect, useState } from "react";
import "./blogPageStyle.scss";
import SearchingForm from "../../../components/allForm/searchingForm/SearchingForm";
import ReactPaginate from "react-paginate";
import AllPostsPaginate from "../../../components/allPostsPaginate/AllPostsPaginate";
import request from "../../../server/request";
import { LIMIT } from "../../../constants";

const BlogPage = () => {

  const [allPosts, setAllPosts ] = useState([]);
  const [activePage, setActivePage] = useState(1)
  const [paginationData, setPaginationData] = useState([])
  const [searchValue, setSearchValue] = useState("")

  let params = {
    page: activePage,
    limit: LIMIT,
    search: searchValue,
  }
  
  let param = JSON.stringify(params)

  useEffect(()=>{
    const getPosts = async () => {
      try {
        let { data: {data, pagination} } = await request.get(`post`, {params: JSON.parse(param)})
        setAllPosts(data)
        setPaginationData(pagination)
      } catch (err) {
        console.log(err);
      }
    }
    getPosts()
  }, [param])

  

  let pageCount = Math.ceil(paginationData?.total / LIMIT)

  const handleSearchClick = (values) => {
    setSearchValue(values)
  }

  const handlePageClick = ( {selected} ) => {
    setActivePage(selected+1);
  }

  return (
    <Fragment>
      <SearchingForm searchValue={searchValue} handleSearchClick={handleSearchClick} />
      <section>
        <div className="container all__posts__container">
          <h2 className="all__posts__title">
            All posts
          </h2>
          <span className="line"></span>
          <div className="paginate__box">
            <AllPostsPaginate data={allPosts} />
            {pageCount>1 ? <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount || 1}
              previousLabel="< prev"
              renderOnZeroPageCount={null}
              className="page__list"
              pageClassName="page__item"
              nextClassName="page__item"
              previousClassName="page__item"
              containerClassName="page__li"
              pageLinkClassName="sd"
            /> : null}
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default BlogPage