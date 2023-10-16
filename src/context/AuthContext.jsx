import { Fragment, createContext, useState } from "react"
import PropTypes  from "prop-types"
import { ROLE, TOKEN } from "../constants"
import Cookies from "js-cookie"

export const AuthContext = createContext()


const AuthContextProvider = ({ children }) => {

const [ isAuthenticated, setIsAuthenticated ] = useState( Boolean(Cookies.get(TOKEN)) )
const  [ role, setRole ] = useState(localStorage.getItem( ROLE ));
  
  const state = { isAuthenticated, role, setIsAuthenticated, setRole }
  
  return (
    <Fragment >
      <AuthContext.Provider value={state} >
        { children }
      </AuthContext.Provider>
    </Fragment>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.node,
}

export default AuthContextProvider;