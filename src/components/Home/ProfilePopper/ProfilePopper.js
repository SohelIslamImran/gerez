import React, { useContext } from 'react';
import { Button, Image, Nav, OverlayTrigger, Popover } from 'react-bootstrap';
import { handleSignOut, initializeLoginFramework } from '../../Login/LoginManager';
import toast from 'react-hot-toast';
import { UserContext } from '../../../App';

const ProfilePopper = () => {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);

    const signOut = () => {
        initializeLoginFramework();
        handleSignOut()
            .then(res => {
                setLoggedInUser(res)
                toast.error('Logged Out!');
            })
    }

    return (
        <OverlayTrigger
            trigger="click"
            key="bottom"
            placement="bottom"
            overlay={
                <Popover id="popover-positioned-bottom">
                    <div className="d-flex justify-content-center mt-1">
                        <Image style={{ maxWidth: "60px" }} src={loggedInUser.photo} roundedCircle />
                    </div>
                    <Popover.Content>
                        <strong className="text-center d-block">{loggedInUser.name}</strong>
                        <strong className="text-center d-block">{loggedInUser.email}</strong>
                        <div className="d-flex justify-content-center mt-1">
                            <Button onClick={signOut}
                                variant="outline-danger"
                                className="py-0 px-1"
                                size="sm">Logout</Button>
                        </div>
                    </Popover.Content>
                </Popover>
            }
        >
            <Nav.Link className="p-0">
                <Image
                    src={loggedInUser.photo}
                    width="40"
                    height="40"
                    roundedCircle
                    className="d-inline-block align-top"
                    alt="Profile"
                />
            </Nav.Link>
        </OverlayTrigger>
    );
};

export default ProfilePopper;