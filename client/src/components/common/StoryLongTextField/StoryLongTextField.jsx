import { TextField } from '@mui/material';

export default function StoryLongTextField({
  styles,
  name,
  value,
  label,
  Icon,
  onChange,
}) {
  return (
    <div className={styles.txt_group}>
      <div className={styles.label_container}>
        <Icon
          className={styles.icon}
        />
        <div className={styles.label}>
          {label}
        </div>
      </div>
      <TextField
        name={name}
        className={styles.long_txt}
        onChange={onChange}
        value={value}
        fullWidth
      />
    </div>
  );
}
