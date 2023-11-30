import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

type DropdownProps = {
  onChange: (item: any) => void;
  label: string;
  currentValue: any;
  values: any;
};

export default function Dropdown({
  onChange,
  label,
  currentValue,
  values = [],
}: DropdownProps) {
  const handleChange = (event: any) => {
    onChange(event.target.value);
  };

  return (
    <Box sx={{ paddingBlockEnd: 2 }}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          value={currentValue}
          label={label}
          onChange={handleChange}
          MenuProps={{
            style: {
              maxHeight: 400,
            },
          }}
        >
          {values.map((value: any) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
