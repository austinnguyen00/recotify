import { Checkbox } from '@mui/material';
import { useEffect } from 'react';

const TrackCheckBox = ({
  track,
  selected,
  toggle,
  selectedTracks,
  setSelectedTracks,
}) => {
  // Remove track after it has been unselected
  const RemoveTrack = () => {
    setSelectedTracks((current) =>
      current.filter((currentTrack) => currentTrack !== track)
    );
  };

  // Changing the selected state of the current track and update the selected tracks in the page
  useEffect(() => {
    const changeSelectedTracks = () => {
      if (selected) {
        setSelectedTracks([...selectedTracks, track]);
      } else {
        RemoveTrack();
      }
    };
    changeSelectedTracks();
  }, [selected]);

  return (
    <div className={[selected ? 'track-checkbox-active' : 'track-checkbox']}>
      <Checkbox
        onClick={() => {
          toggle();
        }}
        sx={{ fontSize: 24 }}
      />
      {/* <span>{selected ? <p>Yes</p> : <p>No</p>}</span> */}
    </div>
  );
};

export default TrackCheckBox;
