import useUserContext from '../hooks/useUserContext';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const ProgressBar = () => {
  const { page, title, setPage } = useUserContext();

  useEffect(() => {
    setPage(sessionStorage.getItem('page'));
  });

  const interval = 100 / Object.keys(title).length;
  const progress = (page * interval).toFixed(2);

  const steps = Object.keys(title).map((step, i) => {
    return (
      <div key={i} className='barmarker'>
        <p>{title[i]}</p>
      </div>
    );
  });

  console.log('Page:', page);
  console.log('Progress:', progress);
  console.log('Steps:', steps);

  return (
    <div>
      <Outlet />
      <section className='progress-container'>
        <div className='barmarker-container'>{steps}</div>
        <progress className='progress' max='100' value={progress}></progress>
      </section>
      {/* <p>Page: {page}</p>
      <p>Title: {title[page - 1]}</p> */}
    </div>
  );
};

export default ProgressBar;
