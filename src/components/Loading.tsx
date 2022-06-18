import '../styles/loader.css';
export default function Loading() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <div className="loader">
        <svg
          viewBox="0 0 120 120"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle className="load one" cx="60" cy="60" r="20" pathLength="1" />
          <circle className="load two" cx="60" cy="60" r="10" />
          <circle
            className="load three"
            cx="60"
            cy="60"
            r="30"
            pathLength="1"
          />
        </svg>
      </div>
    </div>
  );
}
