import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

type horizontalType = 'left' | 'center' | 'right';
type verticalType = 'top' | 'center' | 'bottom';

type MouseOverPopoverProviderProps = {
  message: string;
  anchorOriginVertical?: verticalType;
  anchorOriginHorizontal?: horizontalType;
  transformOriginVertical?: verticalType;
  transformOriginHorizontal?: horizontalType;
  children: ReactNode;
};

export const MouseOverPopoverProvider = ({
  message,
  anchorOriginVertical = 'center',
  anchorOriginHorizontal = 'center',
  transformOriginVertical = 'center',
  transformOriginHorizontal = 'center',
  children,
}: MouseOverPopoverProviderProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {children}
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: anchorOriginVertical,
          horizontal: anchorOriginHorizontal,
        }}
        transformOrigin={{
          vertical: transformOriginVertical,
          horizontal: transformOriginHorizontal,
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>{message}</Typography>
      </Popover>
    </div>
  );
};
