import { useState, useEffect, useRef } from 'react';
import useUserContext from '../hooks/useUserContext';
import { useLocation } from 'react-router-dom';

export const PlayAudio = (track) => {
  const audio = useRef(new Audio(track.preview_url));
  const { trackPlaying, setTrackPlaying, isPlaying, setIsPlaying } =
    useUserContext();

  useEffect(() => {
    audio.current = new Audio(track.preview_url);
  }, [track.preview_url]);

  // console.log(new Audio(url));
  audio.current.loop = true; // repeat when preview over
  audio.current.volume = 0.3; // default is 1

  const [playing, setPlaying] = useState(false);
  const toggle = () => {
    // console.log('Button clicked bitch');
    setPlaying(!playing);
    // console.log('playing:', playing);
  };

  useEffect(() => {
    playing ? audio.current.play() : audio.current.pause();
  });

  useEffect(() => {
    var old_track = trackPlaying['track'];

    // Remove old track object if it is the current track
    if (old_track === track) {
      old_track = {};
    }
    // console.log('Old track name:', old_track);
    if (playing) {
      // Play track and set it as current playing track
      // console.log('audio:', audio);
      // console.log('typeof audio:', typeof audio);
      audio.current.play();
      setTrackPlaying({
        ...trackPlaying,
        track: track,
        is_playing: true,
        old_track: old_track,
        audio: audio,
        toggle: toggle,
        playing: playing,
      });
      setIsPlaying(true);
      // console.log('SetPlaying:', trackPlaying['is_playing']);
    } else {
      // Stop playing track and set playing track as empty
      audio.current.pause();
      if (trackPlaying['track']['name'] === track.name) {
        setTrackPlaying({
          ...trackPlaying,
          is_playing: false,
          old_track: '',
          toggle: toggle,
          playing: playing,
        });
        setIsPlaying(false);
      }
    }
  }, [playing, audio]);

  // Stop the old track when playing new track
  useEffect(() => {
    if (trackPlaying['old_track']['name'] === track.name) {
      if (playing) {
        toggle();
      }
    }
  }, [trackPlaying]);

  // Stop the song when moving to another page
  // const location = useLocation();
  // useEffect(() => {
  //   audio.current.pause();
  //   setTrackPlaying({
  //     ...trackPlaying,
  //     track_name: {},
  //     is_playing: false,
  //     old_track_name: {},
  //     track: track,
  //   });
  // }, [location]);

  useEffect(() => {
    return () => {
      audio.current.pause();
      // console.log('in cleanup');
    };
  }, []);

  return [playing, toggle];
};
