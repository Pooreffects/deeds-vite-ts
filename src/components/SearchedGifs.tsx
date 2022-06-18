import { Link } from 'react-router-dom';
import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import Loading from './Loading';
import Download from './Download';

export default function SearchedGifs(): JSX.Element {
  let linkRef = useRef(null);
  let inputRef = useRef(null);
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
        delay: 0.2,
        ease: 'back.out(1)',
      }
    );
    gsap.fromTo(
      inputRef.current,
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
  const [searchTerm, setSearchTerm] = useState('');
  async function fetchSearched() {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${
        import.meta.env.VITE_API_KEY
      }&limit=48&q=${searchTerm}`
    );
    return response.json();
  }

  const { data, status, refetch } = useQuery(['searched'], fetchSearched, {
    enabled: false,
  });

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      refetch();
    }
  }
  return (
    <div className=" bg-gray-400 border-x border-darkBlue-100 p-4  container mx-auto w-full">
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
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          ref={inputRef}
          type="text"
          placeholder="Search Gifs"
          className="rounded border-none outline-none p-2 mt-6 bg-light-100 text-darkBlue-100"
        />
      </main>
      <section>
        {status === 'loading' && <Loading />}
        {status === 'error' && <div>Error fetching data!</div>}
        {status === 'success' && (
          <div className="gifs-wrapper">
            {data.data.map((searched: any) => (
              <div
                className="bg-darkBlue-100 flex flex-col items-center justify-evenly p-4 rounded card max-w-xs"
                key={searched.id}
              >
                <img
                  src={searched.images.original.webp}
                  alt={searched.title}
                  className="w-56 h-56"
                />
                <h4 className="text-white font-primary font-semibold text-center pt-2">
                  {searched.title}
                </h4>
                <Download trendy={searched} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
