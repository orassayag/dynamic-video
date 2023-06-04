import { Button, CircularProgress } from '@mui/material';

export default function StoryGenerateButton({
  styles,
  isLoading,
  onClick,
}) {
  return (
    <div className={styles.generate_button}>
      <Button
        variant="contained"
        disabled={isLoading}
        onClick={onClick}
      >
        Generate
        {isLoading && <CircularProgress size={16} className={styles.loader} />}
      </Button>
    </div>
  );
}
