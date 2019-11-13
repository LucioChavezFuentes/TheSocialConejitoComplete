import React, { Component } from 'react'
import axios from 'axios';
import Scream from '../components/scream/Scream';
import StaticProfile from '../components/profile/StaticProfile';
import ScreamSkeleton from '../util/ScreamSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

//MUI Imports
import Grid from '@material-ui/core/Grid';

//Redux Imports
import {connect} from 'react-redux'; 
import {getUserDataAndScreams} from '../redux/actions/dataActions';
import {AppState} from '../redux/types';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps<{handle: string, screamId: string}> {
    data: AppState['data'];
    getUserDataAndScreams: (userHandle: string) => void
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

        this.props.getUserDataAndScreams(handle)
        axios.get(`/user/${handle}`)
            .then( res => {
                this.setState({
                    profile: res.data.user
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        const {screams, loading} = this.props.data;
        const {screamIdParams} = this.state;

        const screamsMarkUp = loading ? (
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
            <Grid container spacing={3}>
                <Grid item sm={8} xs={12}>
                    {screamsMarkUp} 
                </Grid>

                <Grid item sm={4} xs={12}>
                    {this.state.profile ? (
                        <StaticProfile profile={this.state.profile} />
                        ) : (
                            <ProfileSkeleton />
                        )
                    } 
                </Grid>          
            </Grid>
        )
    }
}

const mapStateToProps = (appState: AppState) => ({
    data: appState.data
});

export default connect(mapStateToProps, {getUserDataAndScreams})(User);
