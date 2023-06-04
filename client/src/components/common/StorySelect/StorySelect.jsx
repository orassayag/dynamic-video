import {
  Grid, FormControl, Select, MenuItem,
} from '@mui/material';

export default function StorySelect({
  styles,
  name,
  value,
  label,
  options,
  onChange,
}) {
  return (
    <Grid item xs={4}>
      <div className={styles.form_group}>
        <div className={styles.label_container}>
          <div className={`${styles.label} ${styles.select}`}>
            {label}
          </div>
        </div>
        <FormControl
          fullWidth
        >
          <Select
            name={name}
            className={styles.select}
            value={value}
            onChange={onChange}
          >
            {options.map((o) => (
              <MenuItem
                key={o.key}
                value={o.key}
              >
                {o.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Grid>
  );
}
