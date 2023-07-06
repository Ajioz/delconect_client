import React, { useState, useEffect, useCallback } from 'react'
import Holla from '../components/holla/Holla'
import { useParams } from 'react-router-dom';
import StaticProfile from '../components/profile/StaticProfile';
import HollaSkeleton from '../util/HollaSkeleton'
import _ from 'lodash'
import axios from 'axios'
// MUI stuff
import { Grid } from '@material-ui/core'
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from '../redux/actions/dataActions';
import ProfileSkeleton from '../util/ProfileSkeleton';



const User = () => {

    const [profile, setProfile] = useState({ });

 
    const dispatch = useDispatch();
    const { handle } = useParams();
    const { hollaId } = useParams();


    useCallback(()=>{
        if(hollaId) {
            setProfile({...profile, hollaIdParam: hollaId });
         }
    },[hollaId])
    
    
    const userData = useSelector(state => state.data);
    const { hollas, loading } = userData;
    
    
    useEffect(() => {
        let isMounted = true;
        if(isMounted){
            dispatch(getUserData(handle))
            axios.get(`/user/${handle}`)
            .then((res) => {
                const{ user } = res.data
                setProfile({...profile, profile: user });
            }).catch((err) => console.log(err))
        }return () => isMounted = false
    },[])
    

    return (
        <>
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                { 
                    loading ? ( < HollaSkeleton />
                    ): hollas === null ? (
                        <p>User has no holla</p>
                    ): !hollaId ? (
                        hollas?.map(holla => <Holla key={holla.hollaId} holla={holla} />)
                    ) : (
                        hollas.map(holla => {
                            if(holla.hollaId !== profile.hollaIdParam) return <Holla key={holla.hollaId} holla={holla} />
                            else return <Holla key={holla.hollaId} holla={holla} />
                        }
                    ))
                }
                </Grid>
                <Grid item sm={4} xs={12}>
                    { _.isEmpty(profile) ? (
                            <ProfileSkeleton />
                    ) : (
                            <StaticProfile profile={profile}/>
                        )
                    }
                </Grid>
            </Grid>
        
        </>
    )
}

export default User