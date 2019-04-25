module.exports.role = {
    Admin: 'Admin',
    User: 'User'
}

module.exports.window = {
    Books: {
        isConditioned: true,
        wName: 'Books'
    }
}

module.exports.action = {
    Creat: 'Creat',
    Delete: 'Delete',
    Read: 'Read',
    Edit: 'Edie'
}

const RBAC = {
    [this.window.Books.wName]:
    {
        [this.role.Admin]:
        {
            generalActions:
                [this.action.Creat,
                this.action.Delete,
                this.action.Read,
                this.action.Edit],

            conditionedAction: []
        },
        [this.role.User]:
        {
            generalActions: [this.action.Creat, this.action.Read],
            conditionedAction: [this.action.Delete, this.action.Edit]
        }
    },
}

module.exports.generalCheck = function (userRole, windowType, action) {
    if (typeof (RBAC[windowType.wName][userRole]) === 'undefined') return false
    if (RBAC[windowType.wName][userRole].generalActions.indexOf(action) !== -1) return true
    return false
}
module.exports.conditionalCheck = function(userRole, windowType, action) {
    if (typeof (RBAC[windowType.wName][userRole]) === 'undefined') return false
    if (this.window[windowType.wName].isConditioned && RBAC[windowType.wName][userRole].conditionedAction.indexOf(action) !== -1) return true
    if (this.window[windowType.wName].isConditioned && RBAC[windowType.wName][userRole].generalActions.indexOf(action) !== -1) return true
    return false
}

