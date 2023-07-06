import React from 'react'
import { Route, Navigate  } from 'react-router-dom'


// function AuthRoute({ component: Component, authenticated, ...rest }){
//   return (
//     <Route 
//         {...rest}
//         component={(props) => {
//         if (authenticated) {
//           return <Component {...props} />;
//         } else {
//           return <Navigate to={"/"} />;
//         }
//       }}
//     />
//   )
// }

const AuthRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route 
    {...rest}
    component={(props) => authenticated === true ? <Navigate to='/' /> : <Component {...props} />}
    />
  )
}

export default AuthRoute;