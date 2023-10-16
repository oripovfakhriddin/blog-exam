import { Fragment, useEffect, useState } from "react";
import Slider from "react-slick";
import request  from "../../../server/request"
import "./homeStyle.scss"
import HeroSection from "../../../components/hero/HeroSection";
import PopularPostsCard from "../../../components/allCards/popularPostsCard/PopularPostsCard";
import AllCategoryCard from "../../../components/allCards/allCategoryCard/allCategoryCard";

const HomePage = () => {

  const [singleData, setSingleData] = useState({});
  const [popularPosts, setPopularPosts] =useState([]);
  const [allCategory, setAllCategory] = useState([]);


  useEffect(()=>{
    const getData = async ()=>{
      let { data} = await request.get("post/lastone")
      setSingleData(data)
    }
    getData()
  }, [])

  useEffect(()=>{
    const getData = async ()=>{
      let { data} = await request.get("post/lastones")
      setPopularPosts(data)
    }
    getData()
  }, [])

  useEffect(()=>{
    const getData = async ()=>{
      let  { data }= await request.get("category")
      setAllCategory(data.data)
      console.log( data.data );
    }
    getData()
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const settingsCategory = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
    <Fragment>
      <section id="hero">
        <div className="hero">
          <HeroSection data={singleData} />
        </div>
      </section>
    
      <section id="popular__blogs">
        <div className="container popular__blogs__container">
          <h2 className="popular__blogs__title">
            Popular Blogs
          </h2>
          <Slider {...settings}>
            {popularPosts?.map((post, i)=>{
              return <PopularPostsCard key={i} {...post} />
            })}
          </Slider>
          <span className="line"></span>
        </div>
      </section>

      <section id="category__blogs">
        <div className="container category__container">
          <h2 className="category__title">Choose A Catagory</h2>
          <Slider {...settingsCategory}>
            { 
              allCategory.map((category)=> {
                return <AllCategoryCard key={category._id} {...category} />
              })
            }
          </Slider>
        </div>
      </section>
    </Fragment>
  )
}

export default HomePage;