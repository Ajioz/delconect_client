import { Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import Holla from '../components/holla/Holla';
import Profile from '../components/profile/Profile'
import HollaSkeleton from '../util/HollaSkeleton'
import { useDispatch, useSelector } from 'react-redux'
import { getHollas } from '../redux/actions/dataActions'



const Home = () => {

  const dispatch = useDispatch();
  const hollaData = useSelector(state => state.data );
  const { loading, hollas } = hollaData;

  useEffect(() => {
    let isMounted = true;
    if(isMounted){
      (async()=> {
        dispatch(getHollas())
      })()
    }
    return () => isMounted = false;
  }, [dispatch])
  
  let recentHolla = !loading ? ( 
    hollas?.map(holla =><Holla holla={holla} key={holla.hollaId}/>)
    ):( <HollaSkeleton />
  )



  return (
    <>
        <Grid container spacing={10}>
            <Grid item sm={8} xs={12}>
              { recentHolla }
            </Grid>
            <Grid item sm={4} xs={12}>
                <Profile />
            </Grid>
        </Grid>
    </>
  )
}

export default Home