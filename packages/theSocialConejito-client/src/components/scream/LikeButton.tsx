import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import {Link} from 'react-router-dom';
import { css } from "@emotion/core";

//MUI Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

//Redux Imports
import {connect} from 'react-redux';
import {likeScream, unlikeScream} from '../../redux/actions/dataActions';
import { AppState } from '../../redux/store';

import BounceLoader from "react-spinners/BounceLoader";


interface Props {
    user: AppState['user'];
    likeScream: (screamId: string) => void;
    unlikeScream: (screamId: string) => void;
    loadingLike: boolean;
    screamId: string;
    

} 

const override = css`
  display: block;
  position: absolute;
  margin: 0 auto;
  right: 33%;
  bottom: 36%;
`;

class LikeButton extends Component<Props> {

    likedScream = () => {
        if(this.props.user.likes && this.props.user.likes.find((like) => like.screamId === this.props.screamId)){
            return true;
        } else {
            return false;
        }
    };

    likeScream = () => {
        this.props.likeScream(this.props.screamId)
    };

    unlikeScream = () => {
        this.props.unlikeScream(this.props.screamId)
    };

    render() {
        const {user: {authenticated}} = this.props
        const likeButton = !authenticated ? (
            <Link to='/login'>
                <MyButton tipTitle='Like'>
                    <FavoriteBorder color='primary' />
                </MyButton>
            </Link>
            ) : (
                this.likedScream() ? (
                    <MyButton tipTitle='Unlike' onClick={this.unlikeScream} disabled={this.props.loadingLike}>
                        <FavoriteIcon color='primary' />
                        <div >
                            <BounceLoader
                                css={override}
                                size={15}
                                color={"#cca353"}
                                loading={this.props.loadingLike}
                            />
                        </div>
                    </MyButton> ) : (
                    
                    <MyButton tipTitle='Like' onClick={this.likeScream} disabled={this.props.loadingLike}>
                        <FavoriteBorder color='primary' />
                        <div >
                            <BounceLoader
                                css={override}
                                size={15}
                                color={"#cca353"}
                                loading={this.props.loadingLike}
                            />
                        </div>
                    </MyButton>
                )
            )
            return likeButton;
    }
}

const mapStateToProps = (appState: AppState) => ({
    user: appState.user,
})

const mapActionsToProps = {
    likeScream,
    unlikeScream
}

//Always esport defualt a component in Typescript,
//it seems the Props types in 'imports {} from' doesn't work well. 
export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
