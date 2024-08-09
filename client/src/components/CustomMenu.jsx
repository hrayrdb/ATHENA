// src/components/CustomMenu.jsx
import React from 'react';
import { styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import History from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

// Custom styled Menu component
const CustomMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        backgroundColor: '#f7f7f7',
        color: '#333',
        borderRadius: '10px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
        padding: '10px',
        minWidth: '220px',
    },
}));

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
    '&:hover': {
        backgroundColor: '#bde6ff',
        color: '#0E0C15',
    },
    '&.selected': {
        backgroundColor: '#9DD2F2',
        color: '#0E0C15',
        '& .MuiSvgIcon-root': {
            color: '#0E0C15',
        },
    },
    '& .MuiListItemText-primary': {
        color: '#333',
        fontSize: '1rem',
        fontWeight: '500',
        fontFamily: 'Sora',
    },
    '& .MuiListItemIcon-root': {
        minWidth: '40px',
    },
    '& .MuiSvgIcon-root': {
        color: '#555',
    },
    fontSize: '1rem',
    fontFamily: 'Sora',
    fontWeight: '500',
    margin: '5px 0',
    padding: '10px 15px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
}));

const CustomMenuComponent = ({ anchorEl, open, onClose, handleMenuItemClick, selectedItem }) => {
    return (
        <CustomMenu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={open}
            onClose={onClose}
        >
            <CustomMenuItem onClick={() => handleMenuItemClick('profile')} className={selectedItem === 'profile' ? 'selected' : ''}>
                <ListItemIcon>
                    <AccountCircleIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="PROFILE" />
            </CustomMenuItem>
            <CustomMenuItem onClick={() => handleMenuItemClick('settings')} className={selectedItem === 'settings' ? 'selected' : ''}>
                <ListItemIcon>
                    <SettingsIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="SETTINGS" />
            </CustomMenuItem>
            <CustomMenuItem onClick={() => handleMenuItemClick('logout')} className={selectedItem === 'logout' ? 'selected' : ''}>
                <ListItemIcon>
                    <ExitToAppIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="LOGOUT" />
            </CustomMenuItem>
        </CustomMenu>
    );
};

export default CustomMenuComponent;
