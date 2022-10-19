import { useState } from 'react';

export const SelectTrack = () => {
  const [selected, setSelected] = useState(false);
  const toggle = () => setSelected(!selected);

  return [selected, toggle];
};
