import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from './Loading';
import Download from './Download';
import { motion } from 'framer-motion';

export default function SearchedGifs(): JSX.Element {
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
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="font-style text-white text-2xl hover:text-darkBlue-100"
      >
        <Link to="/">Home</Link>
      </motion.div>
      <main className="flex flex-col items-center justify-evenly pt-8">
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
          className="text-7xl font-style font-bold text-darkBlue-100"
        >
          Search
        </motion.h1>
        <motion.input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          type="text"
          placeholder="Search Gifs"
          className="rounded border-none outline-none p-2 mt-6 bg-light-100 text-darkBlue-100"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeInOut' }}
        />
      </main>
      <section>
        {status === 'loading' && <Loading />}
        {status === 'error' && <div>Error fetching data!</div>}
        {status === 'success' && (
          <div className="gifs-wrapper">
            {data.data.map((searched: any, i: any) => (
              <motion.div
                initial={{ y: i % 2 === 0 ? -100 : 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
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
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
