import { saveAs } from 'file-saver';
import { FiDownloadCloud } from 'react-icons/fi';
import { IconContext } from 'react-icons';

function DownloadIcon({ children }: any) {
  return (
    <>
      <IconContext.Provider value={{ color: '#6C63FF', size: '1.5rem' }}>
        {children}
      </IconContext.Provider>
    </>
  );
}

export default function Download({ trendy }: any) {
  const saveGif = () => {
    saveAs(trendy.images.looping.mp4, trendy.title);
  };
  return (
    <>
      <button
        onClick={saveGif}
        className="flex mt-2 items-center justify-evenly bg-light-100 p-2 rounded border-none"
      >
        <DownloadIcon>
          <FiDownloadCloud />
        </DownloadIcon>
        <h4 className="pl-2 text-gray-900 font-primary text-sm font-semibold">
          Download
        </h4>
      </button>
    </>
  );
}
