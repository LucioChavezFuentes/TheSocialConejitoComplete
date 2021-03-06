import React, { Fragment } from 'react'
import noImg from '../images/noImage.png';
import {withStyles, WithStyles,  createStyles, Theme } from '@material-ui/core';

//MUI Imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = (theme: Theme) => createStyles({
    card: {
        display: 'flex',
        marginBottom: '1.5rem'
    },
    
    cardContent:{
        width: '100%',
        flexDirection: 'column',
        padding: '1.5rem',
        [theme.breakpoints.down('sm')]: {
            padding: '1rem',
        },
    },

    cover: {
        minWidth: '12rem',
        objectFit: 'cover',
        [theme.breakpoints.down('sm')]: {
            minWidth: '2rem',
            maxHeight: '2rem',
            margin: '15px',
            marginRight: '0',
            borderRadius: '50%',
            
        },

    },

    handle: {
        width: '5rem',
        height: '1.5rem',
        backgroundColor: theme.palette.primary.main,
        marginBottom:'0.7rem',

        [theme.breakpoints.down('sm')]: {
            height: '1rem',
            
        },
    },

    date:{
        height: '1.1rem',
        width: '7rem',
        backgroundColor: 'rgba(0,0,0, 0.3)',
        marginBottom: '0.7rem',
        [theme.breakpoints.down('sm')]: {
            height: '0.9rem',
            
        },
    },

    fullLine:{
        height: '1rem',
        width: '90%',
        marginBottom: '0.7rem',
        backgroundColor: 'rgba(0,0,0, 0.3)',
    },

    halfLine: {
        height: '1rem',
        width: '50%',
        marginBottom: '0.7rem',
        backgroundColor: 'rgba(0,0,0, 0.3)',
    }
})

interface Props extends WithStyles<typeof styles> {
    
}


const ScreamSkeleton : React.FC<Props> = (props: Props) => {
    const {classes} = props;

    const content = Array.from({length: 5}).map((item, index) => {
        return (
            <Card key={index} className={classes.card}>

                <CardMedia image={noImg} className={classes.cover} />

                <CardContent className={classes.cardContent}>
                    
                    <div className={classes.handle} />
                    <div className={classes.date} />
                    <div className={classes.fullLine} />
                    <div className={classes.fullLine} />
                    <div className={classes.halfLine} />

                </CardContent>
            </Card>
        )
    })
        return (
            <Fragment>
                {content}
            </Fragment>
        )
}

export default withStyles(styles)(ScreamSkeleton);
