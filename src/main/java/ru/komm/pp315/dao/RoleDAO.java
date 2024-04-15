package ru.komm.pp315.dao;

import ru.komm.pp315.model.Role;

import java.util.List;

public interface RoleDAO {
    Role getRoleById(int id);

    Role getRoleByName(String name);

    List<Role> getAllRoles();

    Role saveRole(Role role);

    void deleteRoleById(int id);

    List<Role> findByIds(List<Integer> ids);
}
