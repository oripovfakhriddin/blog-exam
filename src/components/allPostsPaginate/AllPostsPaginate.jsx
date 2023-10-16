import { Fragment } from 'react'
import PropTypes from "prop-types"
import AllPostsCard from '../allCards/allPostsCard/AllPostsCard'

const AllPostsPaginate = ({data}) => {
  return (
    <Fragment>
      { data.map((post)=>{
        return <AllPostsCard key={post._id} {...post} />
      }) }
    </Fragment>
  )
}

AllPostsPaginate.propTypes = {
  data: PropTypes.array,
}

export default AllPostsPaginate