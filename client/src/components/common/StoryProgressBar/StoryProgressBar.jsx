import styles from './StoryProgressBar.module.scss';

export default function StoryProgressBar({ value }) {
  return (
    <progress className={styles.progress} value={value} max="100" />
  );
}
