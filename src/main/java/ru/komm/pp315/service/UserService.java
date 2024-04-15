package ru.komm.pp315.service;


import ru.komm.pp315.model.User;

import java.util.List;

public interface UserService {
    void saveUser(User user);

    List<User> getAllUsers();

    void delete(int userId);

    User findUserById(int userId);

    void updateUser(User user);

    User findUserByUsername(String username);

    User getAuthUser();

}
