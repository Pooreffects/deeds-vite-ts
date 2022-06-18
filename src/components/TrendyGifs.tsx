import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loading from './Loading';
import Download from './Download';

/* Do the gsap stagger animation, and some perf enhancements
  - Prefetch or blur img while loading
  - Pagination, show more/show less
*/

export default function TrendyGifs(): JSX.Element {
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

  async function fetchTrendy() {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=${
        import.meta.env.VITE_API_KEY
      }&limit=48&q`
    );
    return response.json();
  }

  const { data, status } = useQuery(['trendy'], fetchTrendy);

  return (
    <div className=" bg-gray-400 border-x border-darkBlue-100 p-4  h-full container mx-auto w-screen">
      <div
        ref={trendyLinkRef}
        className="font-style text-white text-2xl cursor-pointer hover:text-darkBlue-100"
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
      <section>
        {status === 'loading' && <Loading />}
        {status === 'error' && <div>Error fetching data!</div>}
        {status === 'success' && (
          <div className="gifs-wrapper">
            {data.data.map((trendy: any) => (
              <div
                className="bg-darkBlue-100 flex flex-col items-center justify-evenly p-4 rounded card max-w-xs"
                key={trendy.id}
              >
                <img
                  src={trendy.images.original.webp}
                  alt={trendy.title}
                  className="w-56 h-56"
                />
                <h4 className="text-white font-primary font-semibold text-center pt-2">
                  {trendy.title}
                </h4>
                <Download trendy={trendy} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
