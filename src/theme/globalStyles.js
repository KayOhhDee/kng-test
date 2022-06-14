// material
import { GlobalStyles as GlobalThemeStyles } from '@mui/material';

// ----------------------------------------------------------------------

export default function GlobalStyles() {
  return (
    <GlobalThemeStyles
      styles={{
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box'
        },
        html: {
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch'
        },
        body: {
          width: '100%',
          height: '100%',
          background: '#000',
          color: '#fff'
        },
        '#root': {
          width: '100%',
          height: '100%'
        },
        '.Mui-selected': {
          color: '#fff !important',
          background: '#2B899D !important',
        }
      }}
    />
  );
}
