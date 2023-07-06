import React from 'react'
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs'


const useStyles = makeStyles({
    invisibleSeperator:{
        border: 'none',
        margin: 4
    },
    visibleSeperator:{
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0, 0.1)',
        marginBottom: 20
    },
    commentImage:{
        maxWidth: 100,
        height: 100,
        objectFit: 'cover',
        borderRadius: '50%',
        marginRight: '20px'
    },
    commentData:{
        marginLeft: '20px'
    },
})

const Comments = ({ comments }) => {

    const classes = useStyles(); 

    return (
        <Grid container direction='column'>
            {
               comments?.map((comment, index) => {
                    const { body, createdAt, userImage, userHandle } = comment;
                    return(
                        <div key={createdAt}>
                            <Grid item sm={12} xs={12}>
                                <Grid container item sm={12} >
                                    <Grid item sm={2}>
                                        <img src={userImage} alt="comment" className={classes.commentImage} />
                                    </Grid>
                                    <Grid item sm={9}>
                                            <div className={classes.commentData}>
                                            <Typography 
                                                variant='h5' 
                                                component={Link} 
                                                to={`/users/${userHandle}`}
                                                color='primary'>
                                                    {userHandle}
                                            </Typography>
                                            <Typography variant='body1' color='textSecondary'>
                                                {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                            </Typography>
                                                <hr className={classes.invisibleSeperator} />
                                                <Typography variant='body1'>{body}</Typography>
                                            </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                             {index !== comments.length - 1 && (
                                <hr className={classes.visibleSeperator} />
                            )}
                        </div>
                    )
                })
            }
        </Grid>
    )
}

export default Comments