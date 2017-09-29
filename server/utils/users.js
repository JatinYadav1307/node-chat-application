class Users {
    constructor() {
        this.users = []
    }

    addUser(id, name) {
        var user = {id, name}
        this.users.push(user)
        return user
    }

    removeUser(id) {
        let existingUser = this.getUser(id)
        if (existingUser) {
            this.users = this.users.filter(function (user) {
                return user.id !== id
            })
        }
        return existingUser
    }

    getUser(id) {
        return this.users.filter(function (user) {
            return user.id === id
        })[0]
    }

    getUserList() {
        let names = this.users.map(function (user) {
            return user.name
        })

        return names
    }
}

module.exports = {Users}