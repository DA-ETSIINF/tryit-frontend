export const state = () => ({
    isLogged: false,
    isAdmin: false,
    userToken: ""
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
    }
}

export const getters =  {
    getLogged: state => state.isLogged,
    getAdmin: state => state.isAdmin,
    getToken: state => state.userToken
}
