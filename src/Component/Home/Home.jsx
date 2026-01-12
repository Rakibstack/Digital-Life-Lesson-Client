import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSlider from './Banner';
import FeaturedLessons from './FeaturedLesson';
import WhyLearningMatters from './LearnFormLife';
import TopContributors from './TopContributors';
import MostSavedLessons from './MostSavedLessons';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const sectionsRef = useRef([]);

    useEffect(() => {
        // Animate sections on scroll
        sectionsRef.current.forEach((section, index) => {
            if (section) {
                gsap.fromTo(
                    section,
                    {
                        opacity: 0,
                        y: 100,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 80%',
                            end: 'top 50%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }
        });
    }, []);

    return (
        <div>
            <title>Digital-Life-Lesson-Home</title>
            <HeroSlider />
            <div ref={(el) => (sectionsRef.current[0] = el)}>
                <FeaturedLessons />
            </div>
            <div ref={(el) => (sectionsRef.current[1] = el)}>
                <WhyLearningMatters />
            </div>
            <div ref={(el) => (sectionsRef.current[2] = el)}>
                <TopContributors />
            </div>
            <div ref={(el) => (sectionsRef.current[3] = el)}>
                <MostSavedLessons />
            </div>
        </div>
    );
};

export default Home;