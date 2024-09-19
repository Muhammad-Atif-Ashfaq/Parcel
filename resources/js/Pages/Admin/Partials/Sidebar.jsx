import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from '@inertiajs/react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import Typography from '@mui/material/Typography';
import ViewListIcon from '@mui/icons-material/ViewList';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import DiscountIcon from '@mui/icons-material/Discount';
import HubIcon from '@mui/icons-material/Hub';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import ContactMailIcon from '@mui/icons-material/ContactMail';

export default function Sidebar({ user = null }) {
  const buttonStyles = {
    '&:hover': {
      backgroundColor: '#7393B3',
      color: 'white',
    },
  };

  return (
    <>
      <Box
        sx={{
          marginLeft: 5,
          marginTop: 5,
        }}
      >
        <Typography sx={{ marginLeft: 2, color: '#fff', fontSize: '1rem' }}>
          {user && user.name}
        </Typography>
      </Box>
      <List>
        <Link href={route('admin.dashboard')}>
          <ListItem button sx={buttonStyles}>
            <ListItemIcon>
              <DashboardIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>

        {user && user.id === 1 ? (
          <>
              <Link href={route('admin.promo_codes.index')}>
                  <ListItem button sx={buttonStyles}>
                      <ListItemIcon>
                          <DiscountIcon sx={{ color: '#fff' }} />
                      </ListItemIcon>
                      <ListItemText primary="Promo Codes" />
                  </ListItem>
              </Link>
            <Link href={route('admin.collection_points.index')}>
              <ListItem button sx={buttonStyles}>
                <ListItemIcon>
                  <HubIcon sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText primary="Collection Points" />
              </ListItem>
            </Link>
            <Link href={route('admin.orders')}>
              <ListItem button sx={buttonStyles}>
                <ListItemIcon>
                  <ViewListIcon sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </ListItem>
            </Link>
            <Link href={route('admin.archive')}>
              <ListItem button sx={buttonStyles}>
                <ListItemIcon>
                  <BeenhereIcon sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText primary="Archive" />
              </ListItem>
            </Link>
            <Link href={route('admin.veloce_link')}>
              <ListItem button sx={buttonStyles}>
                <ListItemIcon>
                  <ViewListIcon sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText primary="Veloce Link" />
              </ListItem>
            </Link>
            <Link href={route('admin.contact')}>
              <ListItem button sx={buttonStyles}>
                <ListItemIcon>
                  <ContactMailIcon sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText primary="Contact Us" />
              </ListItem>
            </Link>
          </>
        ) : (
          <>
            <Link href={route('admin.ship_orders')}>
              <ListItem button sx={buttonStyles}>
                <ListItemIcon>
                  <RocketLaunchIcon sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText primary="From Client" />
              </ListItem>
            </Link>
            <Link href={route('admin.dropoff_orders')}>
              <ListItem button sx={buttonStyles}>
                <ListItemIcon>
                  <LocalShippingIcon sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText primary="To Client" />
              </ListItem>
            </Link>
          </>
        )}

        <Link href={route('admin.profile.edit')}>
          <ListItem button sx={buttonStyles}>
            <ListItemIcon>
              <PersonIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </Link>
      </List>
    </>
  );
}
