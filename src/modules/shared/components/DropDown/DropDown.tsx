import type { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  paramKey: string;
  defaultValue: string;
  options: Option[];
};

export const DropDown: FC<Props> = ({ label, paramKey, defaultValue, options }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = searchParams.get(paramKey) ?? defaultValue;

  const handleChange = (newValue: string) => {
    const params = new URLSearchParams(searchParams);

    if (newValue === defaultValue || newValue === 'all') {
      params.delete(paramKey);
    } else {
      params.set(paramKey, newValue);
    }

    params.delete('page');
    setSearchParams(params);
  };

  return (
    <FormControl size="small" fullWidth>
      <InputLabel
        sx={{
          fontFamily: '"Playfair Display", "Times New Roman", serif',

          '&.Mui-focused': {
            color: '#7a1e2d',
          },
        }}
      >
        {label}
      </InputLabel>

      <Select
        value={value}
        label={label}
        onChange={(e) => handleChange(e.target.value)}
        sx={{
          fontFamily: '"Playfair Display", "Times New Roman", serif',
          fontSize: '14px',

          '& .MuiSelect-select': {
            padding: '10px 14px',
          },

          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '20px',
          },

          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#7a1e2d',
          },
        }}
      >
        {options.map((opt) => (
          <MenuItem
            key={opt.value}
            value={opt.value}
            sx={{
              fontFamily: '"Playfair Display", "Times New Roman", serif',
              fontSize: '14px',

              '&.Mui-selected': {
                backgroundColor: '#e5e7eb',
              },

              '&.Mui-selected:hover': {
                backgroundColor: '#e5e7eb',
              },
            }}
          >
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
