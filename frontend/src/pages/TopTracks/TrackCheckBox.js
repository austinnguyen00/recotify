import { Checkbox } from '@mui/material';
import { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';

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
        onChange={() => {
          toggle();
        }}
        sx={{ fontSize: 24 }}
        data-tip='Select Track'
        data-place='top'
      >
        <ReactTooltip delayShow={800} />
      </Checkbox>
    </div>
  );
};

export default TrackCheckBox;
