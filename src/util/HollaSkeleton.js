import React from 'react'
import NoImg from '../images/no-img.png';
// MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({

    sCard:{
        display: 'flex',
        marginBottom: 20,
    },

    sCardContent:{
        width: '100%',
        flexDirection: 'column',
        padding: 25
    },

    sCover:{
        minWidth: 200,
        objectFit: 'cover',
    },

    sHandle:{
        width: 60,
        height: 18,
        backgroundColor: 'primary',
        marginBottom: 7
    },
    
    sDate:{
        height: 14,
        width: 100,
        backgroundColor: 'rgba(0,0,0,0.3)',
        marginBottom: 10
    },
    fullLine: {
        height: 15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: '100%',
        marginBottom: 10
    },
    
    halfLine: {
        height: 15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: '50%',
        marginBottom: 10
    },
})


const HollaSkeleton = () => {

    const classes = useStyles();
    
    return (
        <>
            {
                Array.from({ length: 5 }).map((item, index) => (
                    <Card className={classes.sCard} key={index}>
                        <CardMedia className={classes.sCover} image={NoImg} />
                        <CardContent className={classes.sCardContent}>
                            <div className={classes.sHandle}></div>
                            <div className={classes.sDate}></div>
                            <div className={classes.fullLine}></div>
                            <div className={classes.fullLine}></div>
                            <div className={classes.halfLine}></div>
                        </CardContent>
                    </Card>
                ))
            }
        </>
    )
}

export default HollaSkeleton;