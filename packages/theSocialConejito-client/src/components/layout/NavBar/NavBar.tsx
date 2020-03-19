import React, { Component} from 'react';
import {withStyles, WithStyles,  createStyles, Theme } from '@material-ui/core';
import MyButton from '../../../util/MyButton';
import PostScream from '../../scream/PostScream';
import Notifications from '../Notifications';
import AppIcon from '../../../images/icon.svg';
//CSS
//The margin 'auto' keeps the Buttons Elements at the center of ToolBar
import './NavBar.css';

//React-Router-Dom
import {Link} from 'react-router-dom';

//Material  Ui Imports 
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

//Material Ui Icons
import HomeIcon from '@material-ui/icons/Home';


//Redux imports
import {connect} from 'react-redux';
import { AppState } from '../../../redux/store';

const styles = (theme: Theme) => createStyles({
    navContainer: {
        
        flexGrow: 2,
        textAlign: 'center',
        '& svg': {
            color: '#ffffff'
        },

        '& a': {
            [theme.breakpoints.down(290)]: {
                fontSize: '11px',
                minWidth: '55px',
            },
        },

        
    },

    rabbitImageContainer: {
        flexGrow: 1
    },

    rabbitImage: {
    maxWidth: '2rem',
    maxHeight: '2rem'
    },

    invisibleObject: {
        flexGrow: 1,
        visibility: 'hidden',
        //display: 'flex',
        [theme.breakpoints.down(290)]: {
            display: 'none'
        }
    } 
})


interface Props extends WithStyles<typeof styles> {
    authenticated: boolean
}

class NavBar extends Component<Props> { 
    render() {
        const {authenticated, classes} = this.props;
        return (
            <AppBar>
                
                <Toolbar>
                <div className={classes.rabbitImageContainer}>
                    <Link to='/'>
                        <Tooltip title='Regresa a Casa'>
                            <img src={AppIcon} alt='El Conejito te saluda' className={classes.rabbitImage} />
                        </Tooltip>
                    </Link> 
                </div>
                    {authenticated ? ( 
                        <div className={classes.navContainer}>
                            <PostScream />

                            <Link to='/'>
                                <MyButton tipTitle={'Home'} >
                                    <HomeIcon color='primary' />
                                </MyButton>
                            </Link>

                            <Notifications /> 

                        </div>) : (
                        <div className={classes.navContainer}>
                            <Button color="inherit" component={Link} to='/'>
                                Home 
                            </Button>

                            <Button color="inherit" component={Link} to='/login'>
                                Login 
                            </Button>

                            <Button color="inherit" component={Link} to='/signup'>
                                Signup 
                            </Button>
                        </div>
                    )}

                    <div className={classes.invisibleObject}> 
                        <img src={AppIcon} alt='Encontraste al conejito oculto' className={classes.rabbitImage} />
                    </div> 

                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = (globalState: AppState) => ({
    authenticated: globalState.user.authenticated
})

export default connect(mapStateToProps)(withStyles(styles)(NavBar));
