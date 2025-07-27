import React from "react"
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import NewsLetterBox from "../components/NewsLetterBox";
const Home = ()=>{
  return(
    <div>
      <Hero/>
      <LatestCollection/>
      <NewsLetterBox/>
    </div>
  )
}
export default Home