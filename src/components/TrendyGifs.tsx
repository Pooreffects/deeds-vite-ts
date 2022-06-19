import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loading from './Loading';
import Download from './Download';
import { motion } from 'framer-motion';

export default function TrendyGifs(): JSX.Element {
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
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="font-style text-white text-2xl cursor-pointer hover:text-darkBlue-100"
      >
        <Link to="/">Home</Link>
      </motion.div>
      <main className="flex flex-col items-center justify-evenly pt-8">
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeInOut' }}
          className="text-7xl font-style font-bold text-darkBlue-100"
        >
          Trending
        </motion.h1>
      </main>
      <section>
        {status === 'loading' && <Loading />}
        {status === 'error' && <div>Error fetching data!</div>}
        {status === 'success' && (
          <div className="gifs-wrapper">
            {data.data.map((trendy: any, i: any) => (
              <motion.div
                initial={{ y: i % 2 === 0 ? -100 : 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
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
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
