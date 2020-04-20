import React, { Component} from 'react';
import Scream from '../components/scream/Scream';
import StaticProfile from '../components/profile/StaticProfile';
import ScreamSkeleton from '../util/ScreamSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

//MUI Imports
import Grid from '@material-ui/core/Grid';

//Redux Imports
import {connect} from 'react-redux'; 
import {getUserDataAndScreams} from '../redux/actions/dataActions';
import {getArrayOfScreams} from '../redux/reducers/dataReducer';
import {AppState} from '../redux/types';
import { RouteComponentProps } from 'react-router-dom';


interface Props extends RouteComponentProps<{handle: string, screamId: string}> {
    screams: any[];
    loading: boolean;
    getUserDataAndScreams: (userHandle: string) => void;
    user: AppState['data']['guestUser'];
    loadingHostUser: boolean;
}

interface State {
    profile: any;
    screamIdParams: string | null;
}

class User extends Component<Props, State> {
    state: State = {
        profile: null,
        screamIdParams: null
    }
     
    componentDidMount() {
        const handle = this.props.match.params.handle;
        const screamIdParams = this.props.match.params.screamId;

        if(screamIdParams) {
            this.setState({ screamIdParams: screamIdParams})
        }
        //TODO: Make a cancel dispacth for this action when user doesnt need its data. 
        this.props.getUserDataAndScreams(handle)
        /*axios.get(`/user/${handle}`)
            .then( res => {
                this.setState({
                    profile: res.data.user
                })
            })
            .catch(error => console.log(error))*/
    }

    componentDidUpdate(prevProps:Props, prevState: State) {
        const handle = this.props.match.params.handle;
        const prevHandle = prevProps.match.params.handle;

        if(prevHandle !== handle){
            this.props.getUserDataAndScreams(handle)
            /*axios.get(`/user/${handle}`)
                .then( res => {
                    this.setState({
                        profile: res.data.user
                    })
                })
                .catch(error => console.log(error))*/
        }
    }

    getSpacing = () => {
        return (window.innerWidth <= 600 ? 1 : window.innerWidth <= 1050 ? 2 : 3)
    }

    render() {
        const {screams, loading, loadingHostUser} = this.props;
        const {screamIdParams} = this.state;

        const screamsMarkUp = loading || loadingHostUser ? (
            <ScreamSkeleton />
        ) : (
            screams === null ? (
                <p>No screams form this User</p>
            ) : !screamIdParams ? (
                screams.map(scream => (<Scream key={scream.screamId} scream={scream} />))
            ) : (
                screams.map(scream => {
                    if(scream.screamId !== screamIdParams){
                        return (<Scream key={scream.screamId} scream={scream} />)
                    } else {
                        return (<Scream key={scream.screamId} scream={scream} openDialog />)
                    }
                })
            )
        )


        return (
            <Grid container spacing={this.getSpacing()}>
                <Grid item sm={8} xs={12}>
                    {screamsMarkUp} 
                </Grid>

                <Grid item sm={4} xs={12}>
                    {loading ? (
                            <ProfileSkeleton />
                        ) : (
                            <StaticProfile profile={this.props.user} />
                            
                        )
                    }
                </Grid>          
            </Grid>
        )
    }
}

const mapStateToProps = (appState: AppState) => ({
    screams: getArrayOfScreams(appState.data.screams, appState.data.screamIds),
    loading: appState.data.loading,
    user: appState.data.guestUser,
    loadingHostUser: appState.user.loading
});

export default connect(mapStateToProps, {getUserDataAndScreams})(User);
