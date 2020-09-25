import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter, RouteComponentProps } from 'react-router-dom'

function HelpMenu({history}: RouteComponentProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChatPageNavigation = () => {

        history.push('/chat');
    };

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Help
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Help Center</MenuItem>
                <MenuItem onClick={handleClose}>FAQs</MenuItem>
                <MenuItem onClick={handleClose}>Contact Us</MenuItem>
                <MenuItem onClick={handleChatPageNavigation}>Chat</MenuItem>
            </Menu>
        </div>
    );
}

export default withRouter (HelpMenu)