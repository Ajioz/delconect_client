import React, { useState, useEffect } from 'react'
import MyButton from '../../util/MyButton'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import { useDispatch, useSelector } from 'react-redux';
import { likeHolla, unLikeHolla } from '../../redux/actions/dataActions';


const LikeButton = ({ hollaId }) => {

    const dispatch = useDispatch();
    const [heart, setHeart] = useState(false)

    const userData = useSelector(state => state.user);
    const { userInfo, authenticated, likes } = userData;

    const _likeHolla = () => {
        dispatch(likeHolla(hollaId))
    }

    const _unlikeHolla = () => {
        dispatch(unLikeHolla(hollaId))
    }

    useEffect(() => {
      let isMounted = true;
      if(isMounted){
        if(userInfo?.likes && userInfo?.likes.find((like) => like?.hollaId === hollaId )) setHeart(true)  
        else setHeart(false) 
      } return () => isMounted = false;
    },[userInfo, hollaId, likes])


    return (
        <>
            { !authenticated ? (
                <Link to='/login'>
                    <MyButton tip='like'>
                        <FavoriteBorder color='primary' />
                    </MyButton>
                </Link> 
                ):(heart ? (
                    <MyButton tip='Undo Like'onClick={_unlikeHolla}>
                        <FavoriteIcon color='primary' />
                    </MyButton>
                ):(
                    <MyButton tip='Like'onClick={_likeHolla}>
                        <FavoriteBorder color='primary' />
                    </MyButton>
                )) 
            }   
        </>
    )
}

export default LikeButton