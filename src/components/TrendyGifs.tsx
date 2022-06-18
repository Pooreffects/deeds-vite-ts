import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
interface Props {}

export default function TrendyGifs({}: Props): JSX.Element {
  let trendyLinkRef = useRef(null);
  let trendyHeading = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      trendyLinkRef.current,
      {
        opacity: 0,
        x: -40,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: 'back.out(1)',
      }
    );
    gsap.fromTo(
      trendyHeading.current,
      {
        opacity: 0,
        x: -100,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        delay: 0.4,
        ease: 'back.out(1)',
      }
    );
  }, []);
  return (
    <div className=" bg-gray-400 border-x border-darkBlue-100 p-4  h-screen container mx-auto w-full">
      <div
        ref={trendyLinkRef}
        className="font-style text-white text-xl hover:text-darkBlue-100"
      >
        <Link to="/">Home</Link>
      </div>
      <main className="flex flex-col items-center justify-evenly pt-8">
        <h1
          ref={trendyHeading}
          className="text-7xl font-style font-bold text-darkBlue-100"
        >
          Trending
        </h1>
      </main>
      <section></section>
      {/* Cards Container 
            - Cards
            - Show More/Show Less 
        */}
    </div>
  );
}
