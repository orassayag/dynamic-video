import { Button, Grid } from '@mui/material';
import StoryColorPicker from '../StoryColorPicker/StoryColorPicker';

export default function StoryColor({
  styles,
  showColorPicker,
  selectedColor,
  onColorChange,
  onToggleColorPicker,
  onToggleColorPickerByValue,
}) {
  return (
    <Grid item xs={6}>
      <div className={styles.color_container}>
        <div className={styles.form_group}>
          <div className={styles.color_form_container}>
            <div className={styles.color_form_button}>
              <Button
                className={styles.color_button}
                variant="contained"
                component="label"
                onClick={onToggleColorPicker}
              >
                Choose Color
              </Button>
            </div>
            <div
              className={styles.thumbnail_color}
              style={{ backgroundColor: selectedColor }}
            />
            <StoryColorPicker
              selectedColor={selectedColor}
              showColorPicker={showColorPicker}
              onClose={onToggleColorPickerByValue}
              onChange={onColorChange}
            />
          </div>
        </div>
      </div>
    </Grid>
  );
}
