import { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import StoryProgressBar from '../StoryProgressBar/StoryProgressBar';

export default function StoryBackgroundImage({ styles }) {
  const [isClick, setIsClick] = useState(false);
  const [progress, setProgress] = useState(0);
  const [randomImageId, setRandomImageId] = useState(0);

  useEffect(() => {
    if (!isClick || progress === 100) {
      return () => { };
    }
    const interval = setInterval(() => setProgress((prev) => {
      if (prev === 100) {
        clearInterval(interval);
        setIsClick(false);
        return prev;
      }
      return prev + 20;
    }), 1000);
    return () => clearInterval(interval);
  }, [isClick, progress]);

  const handleBackgroundImageChange = () => {
    setIsClick(true);
    setRandomImageId(Math.floor(1 + Math.random() * (50 - 1 + 1)));
    setProgress(0);
  };

  return (
    <Grid item xs={6}>
      <div className={styles.upload_container}>
        <div className={styles.form_group}>
          <div className={styles.label_container}>
            <div className={styles.label}>
              Background image
            </div>
          </div>
          <div className={styles.upload_form_container}>
            <div className={styles.upload_form_button}>
              <Button
                className={styles.upload_button}
                variant="contained"
                component="label"
              >
                Upload
                <input type="file" className={styles.file_upload} onChange={handleBackgroundImageChange} />
              </Button>
              {isClick && (
                <StoryProgressBar
                  value={progress}
                />
              )}
            </div>
            <div
              className={`${styles.thumbnail} ${progress === 100 ? styles.active : ''}`}
              style={{
                backgroundImage: progress === 100
                  ? `url("https://randomuser.me/api/portraits/thumb/women/${randomImageId}.jpg")` : 'none',
              }}
            />
          </div>
        </div>
      </div>
    </Grid>
  );
}
