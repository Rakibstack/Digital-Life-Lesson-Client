import React from 'react';
import HeroSlider from './Banner';
import FeaturedLessons from './FeaturedLesson';
import WhyLearningMatters from './LearnFormLife';
import TopContributors from './TopContributors';
import MostSavedLessons from './MostSavedLessons';


const Home = () => {

    return (
        
     <div> 
        <title>Digital-Life-Lesson-Home</title>
      <HeroSlider></HeroSlider>
      <FeaturedLessons></FeaturedLessons>
      <WhyLearningMatters></WhyLearningMatters>
      <TopContributors></TopContributors>
      <MostSavedLessons></MostSavedLessons>
       </div>

    );
};

export default Home;