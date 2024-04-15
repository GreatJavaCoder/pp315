package ru.komm.pp315.dao;

import ru.komm.pp315.model.User;

import java.util.List;


public interface UserDAO {
    void addUser(User user);

    List<User> getAllUsers();

    void removeUserById(int id);

    User getUserById(int id);

    void updateUser(User user);
    User findByUsername(String username);
}
