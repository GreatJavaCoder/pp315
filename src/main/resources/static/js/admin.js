let tableUsers = [];
let currentUser = "";
let deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
let editModal = new bootstrap.Modal(document.getElementById('editModal'));
let request = new Request("/api/admin", {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
    },
});
getUsers()

function getUsers() {
    fetch(request).then(res =>
        res.json()).then(data => {
        tableUsers = [];
        if (data.length > 0) {
            data.forEach(user => {
                tableUsers.push(user)
            })
        } else {
            tableUsers = [];
        }
        showUsers(tableUsers);
    })
}

fetch("/api/admin/current").then(res => res.json())
    .then(data => {
        currentUser = data;
        console.log(data)
        showOneUser(currentUser);
        document.getElementById("headUsername").innerText = currentUser.username;
        document.getElementById("headRoles").innerText = currentUser.roles.map(role => role.roleNameString)
            .join(" ");
    })

function showUsers(table) {
    let temp = "";
    table.forEach(user => {
        temp += "<tr>"
        temp += "<td>" + user.id + "</td>"
        temp += "<td>" + user.username + "</td>"
        temp += "<td>" + user.height + "</td>"
        temp += "<td>" + user.roles.map(role => role.roleNameString).join(" ") + "</td>"
        temp += "<td>" + `<a onclick='showEditModal(${user.id})' 
                            class="btn btn-info" id="edit">Edit</a>` + "</td>"
        temp += "<td>" + `<a onclick='showDeleteModal(${user.id})' 
                            class="btn btn-danger" id="delete">Delete</a>` + "</td>"
        temp += "</tr>"
        document.getElementById("allUsersBody").innerHTML = temp;
    })
}

function getRoles(list) {
    let userRoles = [];
    for (let role of list) {
        if (role === 1 || role.id === 1) {
            userRoles.push("USER");
        }
        if (role === 2 || role.id === 2) {
            userRoles.push("ADMIN");
        }
    }
    return userRoles.join(" , ");
}

function showOneUser(user) {
    let temp = "";
    temp += "<tr>"
    temp += "<td>" + user.id + "</td>"
    temp += "<td>" + user.username + "</td>"
    temp += "<td>" + user.height + "</td>"
    temp += "<td>" + user.roles.map(role => role.roleNameString).join(" ") + "</td>"
    temp += "</tr>"
    document.getElementById("oneUserBody").innerHTML = temp;
}

function createRole(roleId, roleName) {
    return {
        roleId,
        roleName,
    };
}

function rolesUser(event) {
    const rolesAdmin = createRole(1, "ROLE_USER");
    const rolesUser = createRole(2, "ROLE_ADMIN");
    let roles = [];
    let allRoles = [];
    let sel = document.querySelector(event);
    for (let i = 0, n = sel.options.length; i < n; i++) {
        if (sel.options[i].selected) {
            roles.push(sel.options[i].value);
        }
    }
    if (roles.includes('1')) {
        allRoles.push(rolesUser);
    }
    if (roles.includes('2')) {
        allRoles.push(rolesAdmin);
    } else if (roles.length === 0) {
        allRoles.push(rolesUser)
    }
    return allRoles;
}

document.getElementById('newUser').addEventListener('submit', addNewUser);

function addNewUser(form) {
    form.preventDefault();
    let newUserForm = new FormData(form.target);
    let user = {
        username: newUserForm.get('username'),
        height: newUserForm.get('height'),
        password: newUserForm.get('password'),
        roles: rolesUser("#roles")
    };
    let req = new Request("/api/admin", {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    fetch(req).then(() => getUsers())
    form.target.reset();
    const triggerE1 = document.querySelector('#v-pills-tabContent button[data-bs-target="#nav-home"]');
    bootstrap.Tab.getInstance(triggerE1).show();
}

function showDeleteModal(id) {
    document.getElementById('closeDeleteModal').setAttribute('onclick', () => {
        deleteModal.hide();
        document.getElementById('deleteUser').reset();
    });

    let request = new Request("/api/admin/" + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    fetch(request).then(res => res.json()).then(deleteUser => {
            console.log(deleteUser);
            document.getElementById('idDel').setAttribute('value', deleteUser.id);
            document.getElementById('usernameDel').setAttribute('value', deleteUser.username);
            document.getElementById('heightDel').setAttribute('value', deleteUser.height);
            document.getElementById('passwordDel').setAttribute('value', deleteUser.password);
            if (getRoles(deleteUser.roles).includes("USER") && getRoles(deleteUser.roles).includes("ADMIN")) {
                document.getElementById('rolesDel1').setAttribute('selected', 'true');
                document.getElementById('rolesDel2').setAttribute('selected', 'true');
            } else if (getRoles(deleteUser.roles).includes("USER")) {
                document.getElementById('rolesDel1').setAttribute('selected', 'true');
            } else if (getRoles(deleteUser.roles).includes("ADMIN")) {
                document.getElementById('rolesDel2').setAttribute('selected', 'true');
            }
            deleteModal.show();
        }
    );
    let isDelete = false;
    document.getElementById('deleteUser').addEventListener('submit', event => {
        event.preventDefault();
        if (!isDelete) {
            isDelete = true;
            let request = new Request("/api/admin/" + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            fetch(request).then(() => {
                getUsers();
            });
            document.getElementById('deleteUser').reset();
        }
        deleteModal.hide();
    });
}

function showEditModal(id) {
    let request = new Request("/api/admin/" + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    fetch(request).then(res => res.json()).then(editUser => {
            document.getElementById('idRed').setAttribute('value', editUser.id);
            document.getElementById('usernameRed').setAttribute('value', editUser.username);
            document.getElementById('heightRed').setAttribute('value', editUser.height);
            document.getElementById('passwordRed').setAttribute('value', editUser.password);
            if ((editUser.roles.map(role => role.id)) === 1 && ((editUser.roles.map(role => role.id)) === 2)) {
                document.getElementById('rolesRed1').setAttribute('selected', 'true');
                document.getElementById('rolesRed2').setAttribute('selected', 'true');
            } else if ((editUser.roles.map(role => role.id)) === 1) {
                document.getElementById('rolesRed1').setAttribute('selected', 'true');
            } else if (editUser.roles.map(role => role.id) === 2) {
                document.getElementById('rolesRed2').setAttribute('selected', 'true');
            }
            editModal.show();
        }
    );
    document.getElementById('editUser').addEventListener('submit', submitFormEditUser);
}

function submitFormEditUser(event) {
    event.preventDefault();
    let redUserForm = new FormData(event.target);
    let user = {
        id: redUserForm.get('id'),
        username: redUserForm.get('username'),
        height: redUserForm.get('height'),
        password: redUserForm.get('password'),
        roles: rolesUser("#rolesRed")
    }
    let request = new Request("/api/admin", {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    fetch(request).then(
        function () {
            getUsers();
            event.target.reset();
            editModal.hide();
        });
}