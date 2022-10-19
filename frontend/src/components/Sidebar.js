import React, { useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import useUserContext from '../hooks/useUserContext';
import SidebarTrack from './SidebarTrack';

import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const Sidebar = () => {
  const { key, page, title, setPage } = useUserContext();

  useEffect(() => {
    setPage(sessionStorage.getItem('page'));
    getActivePage();
  });

  // Get tracks name element from tracks name string
  const tracksName = (string) => {
    let tracks = string.split(',');
    // console.log('tracks: ', tracks);
    var list = [];
    tracks.map((track, i) => {
      list.push(
        <p key={i}>
          {i + 1}. {track}
        </p>
      );
    });
    return list;
  };

  // Get list of page titles for sidebar
  const pageTitles = Object.keys(title).map((step, i) => {
    let storage = sessionStorage.getItem(key[i]);
    let userOption =
      typeof storage === 'string' ? (
        storage.includes(',') ? (
          tracksName(storage)
        ) : (
          <p>{storage}</p>
        )
      ) : (
        storage
      );
    // console.log('User option: ' + userOption);

    return (
      <div
        key={i}
        className={[
          'sidebar-step',
          title[i] === 'Tracks' ? 'sidebar-top-tracks' : '',
        ].join(' ')}
      >
        <li>
          {title[i] === 'Get Started' ? (
            <Link className='sidebar-step-title' href={'/get-started'}>
              {title[i]}
            </Link>
          ) : (
            <p className='sidebar-step-title'>{title[i]}</p>
          )}
          <span className='sidebar-step-option'>{userOption}</span>
        </li>
      </div>
    );
  });

  // Get the current active page and change the class in the sidebar
  const getActivePage = () => {
    const allItems = document.querySelectorAll('.sidebar-step');
    // // console.log('all items:', allItems);
    // Remove active page from all items
    for (var i = 0; i < allItems.length; i++) {
      allItems[i].classList.remove('active');
    }
    // Add active class to current page
    const activePage = allItems[page - 1];
    activePage.classList.add('active');
  };

  return (
    <>
      <div className='sidebar-wrapper'>
        <div className='sidebar-home'>
          <Link to='/'>
            <h2>Recotify</h2>
          </Link>
        </div>
        <div className='sidebar-steps-wrapper'>
          <ul>
            {pageTitles}
            {/* <div className='sidebar-step'>
              <p>
                <EmojiEmotionsIcon /> Mood
              </p>
            </div> */}
          </ul>
        </div>
        <SidebarTrack />
      </div>
      <Outlet />
    </>
  );
};

export default Sidebar;
