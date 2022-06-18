import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
interface Props {}

export default function SearchedGifs({}: Props): JSX.Element {
  let linkRef = useRef(null);
  let searchHeading = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      linkRef.current,
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
      searchHeading.current,
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
        className="font-style text-white text-xl hover:text-darkBlue-100"
        ref={linkRef}
      >
        <Link to="/">Home</Link>
      </div>
      <main className="flex flex-col items-center justify-evenly pt-8">
        <h1
          ref={searchHeading}
          className="text-7xl font-style font-bold text-darkBlue-100"
        >
          Search
        </h1>
      </main>
      <section></section>
      {/* Cards Container 
            - Input
            - Cards
            - Show More/Show Less 
        */}
    </div>
  );
}
