import { TextField } from '@mui/material';

export default function StoryTextField({
  className,
  styles,
  label,
  value,
  Icon,
  onChange,
}) {
  return (
    <div className={styles.form_group}>
      <div className={styles.label_container}>
        <Icon
          className={styles.icon}
        />
        <div className={styles.label}>
          {label}
        </div>
      </div>
      <TextField
        className={styles[className]}
        onChange={onChange}
        value={value}
        fullWidth
      />
    </div>
  );
}
