package ru.komm.pp315.service;

import ru.komm.pp315.model.Role;

import java.util.List;

public interface RoleService {
    Role getRoleById(int id);
    Role getRoleByName(String name);

    List<Role> getAllRoles();

    Role saveRole(Role role);

    void deleteRoleById(int id);
    List<Role> findDyIds(List<Integer> ids);
}
