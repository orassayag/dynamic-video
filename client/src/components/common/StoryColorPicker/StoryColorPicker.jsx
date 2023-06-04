import React, { useCallback, useRef } from 'react';
import { HexColorPicker } from 'react-colorful';
import useClickOutside from '../../../hooks/useClickOutside';
import styles from './StoryColorPicker.module.scss';

export default function StoryColorPicker({
  selectedColor, showColorPicker, onClose, onChange,
}) {
  const popover = useRef();
  const close = useCallback(() => onClose(false), [onClose]);
  useClickOutside(popover, close);

  return (
    <div className={styles.picker}>
      {showColorPicker && (
        <div className={styles.popover} ref={popover}>
          <HexColorPicker color={selectedColor} onChange={onChange} />
        </div>
      )}
    </div>
  );
}
