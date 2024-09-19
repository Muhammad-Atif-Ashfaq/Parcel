import React from 'react';
import {
    AppBar,
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useTheme
} from '@mui/material';
import {Logout} from "@mui/icons-material";
import {Link} from '@inertiajs/react';
import {admin, buttonStyles} from "@/Pages/Admin/Styles/Styles";
import MenuIcon from "@mui/icons-material/Menu";
import {web} from "@/Pages/Web/Styles/Styles";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import DiscountIcon from '@mui/icons-material/Discount';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HubIcon from '@mui/icons-material/Hub';
import ViewListIcon from '@mui/icons-material/ViewList';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import ContactMailIcon from '@mui/icons-material/ContactMail';


export default function Topbar({user, pageName = ''}) {
    const theme = useTheme()
    const [open, setOpen] = React.useState(false)
    return (
        <>
            <AppBar position="static" sx={{bgcolor: admin.bgBlue}}>
                <Toolbar>
                    <Typography variant="h6" sx={{flexGrow: 1}}>
                        {pageName && (
                            pageName
                        )}
                    </Typography>
                    <Link method="post" href={route('logout')} as="button">
                        <Button color="inherit"> <Logout/> Sign Out</Button>
                    </Link>
                    <IconButton
                        onClick={() => setOpen(true)}
                    >
                        <MenuIcon
                            sx={{
                                color: '#fff',
                                [theme.breakpoints.up('md')]: {
                                    display: 'none'
                                }
                            }}
                        />
                    </IconButton>
                    {/*<img src="img/logo.png"/>*/}
                </Toolbar>
            </AppBar>
            <Drawer variant='temporary' open={open}
                    anchor="right"
                    sx={{
                        [`& .MuiDrawer-paper`]: {width: '100%'}
                    }}
                    PaperProps={{
                        sx: {
                            background: web.bgBlue
                        }
                    }}
            >
                <IconButton sx={{color: '#fff'}}
                            onClick={() => setOpen(false)}
                >
                    <CloseIcon/>
                </IconButton>
                <Divider/>
                <Box sx={{mt: 3, display: 'flex', flexDirection: 'column'}}>
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
        <Link href={route('admin.promo_codes.index')}>
              <ListItem button sx={buttonStyles}>
                <ListItemIcon>
                  <DiscountIcon sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText primary="Promo Codes" />
              </ListItem>
        </Link>
        {user && user.name === 'master_access' ? (
          <>

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
                </Box>
            </Drawer>
        </>


    );
}
