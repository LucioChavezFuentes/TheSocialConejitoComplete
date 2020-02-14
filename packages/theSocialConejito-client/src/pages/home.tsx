import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import ScreamSkeleton from '../util/ScreamSkeleton';
import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';

//Redux import 
import {connect} from 'react-redux';
import {getScreams} from '../redux/actions/dataActions';
import { AppState } from '../redux/types';

//Types Interfaces
interface HomeState {
    screams: string[] | null 
}

interface HomeProps {
    data: AppState['data'];
    getScreams: () => void;
}

class Home extends Component<HomeProps, HomeState> {
    state: HomeState = {
        screams: null
    }

    componentDidMount(){
        this.props.getScreams()
    }


    render() {
        const {loading, screams} = this.props.data
        let recentScreamsMarkUp : any = !loading ? (
            screams.map( (scream : any) => ( 
            <Scream key={scream.screamId}  scream={scream} />))
            ) : (
            <ScreamSkeleton />
            );

        return (
            <Grid container spacing={3}>
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkUp} 
                </Grid>

                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>          
            </Grid>
        )
    } 
}

const mapStateToProps = (appState: AppState) => ({
    data: appState.data
})

export default connect(mapStateToProps, {getScreams})(Home);
