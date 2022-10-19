import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './assets/global.css';

import Home from './pages/Home/Home';
import GetStarted from './pages/GetStarted/GetStarted';
import Genres from './pages/Genres/Genres';
import Artists from './pages/Artists/Artists';
import TopTracks from './pages/TopTracks/TopTracks';
import TrackRecommendations from './pages/TrackRecommendations/TrackRecommendations';

import CurrentSong from './components/CurrentSong';
import TrackPlayer from './components/TrackPlayer';
import CustomSwiper from './components/CustomSwiper';

import Auth from './components/Auth';
import PrivateRoutes from './utils/PrivateRoutes';
import RequireAuth from './utils/RequireAuth';

import { UserProvider } from './contexts/UserContext';
import { AuthProvider } from './contexts/AuthContext';
import Sidebar from './components/Sidebar';
import ProgressBar from './components/ProgressBar';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = 'Recotify';
  });

  return (
    <>
      {/* private routes */}
      <UserProvider>
        <Router>
          <Routes>
            {/* <Route element={<PrivateRoutes />}> */}
            {/* <Route element={<RequireAuth />}> */}
            <Route path='/get-started' element={<GetStarted />} />
            <Route path='/genres/:emotion' element={<Genres />} />
            <Route path='/artists/:genre' element={<Artists />} />
            <Route
              path='/artist-top-tracks/:artist_id'
              element={<TopTracks />}
            />
            <Route
              path='/track-recommendations'
              element={<TrackRecommendations />}
            />
            {/* </Route> */}

            {/* public routes */}
            <Route path='/' element={<Home />} />
            <Route path='/song' element={<CurrentSong />} />
            <Route path='/track/:track_id' element={<TrackPlayer />}></Route>
            <Route path='/swiper' element={<CustomSwiper />} />
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
