export const state = () => ({
    isLogged: false,
    isAdmin: false,
    isScanner: false,
    isStudent: false,
    userToken: "",
})

export const mutations = {
    login(state, token  )    {
        state.isLogged = true
        state.userToken = token
    },
    logout(state)   {
        state.isLogged = false
        state.userToken = ""
    },
    giveAdminAccess(state)  {
        state.isAdmin = true
    },
    revokeAdminAccess(state)    {
        state.isAdmin = false
    },
    giveScanAccess(state)  {
        state.isScanner = true
    },
    revokeScanAccess(state)    {
        state.isScanner = false
    }
}

export const getters =  {
    getLogged: state => state.isLogged,
    getStudent: state => state.isStudent,
    getAdmin: state => state.isAdmin,
    getScanner: state => state.isScanner,
    getToken: state => state.userToken
}
