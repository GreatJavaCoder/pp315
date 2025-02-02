package ru.komm.pp315.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.komm.pp315.dao.RoleDAO;
import ru.komm.pp315.model.Role;

import java.util.List;

@Service
@Transactional
public class RoleServiceImp implements RoleService {
    private final RoleDAO roleRepository;

    @Autowired
    public RoleServiceImp(RoleDAO roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Role> getAllRoles() {
        return roleRepository.getAllRoles();
    }

    @Override
    public Role saveRole(Role role) {
        return roleRepository.saveRole(role);
    }

    @Override
    public Role getRoleById(int id) {
        return roleRepository.getRoleById(id);
    }

    @Override
    public Role getRoleByName(String name) {
        return roleRepository.getRoleByName(name);
    }

    @Override
    public void deleteRoleById(int id) {
        roleRepository.deleteRoleById(id);
    }

    @Override
    public List<Role> findDyIds(List<Integer> ids) {
        return roleRepository.findByIds(ids);
    }
}
