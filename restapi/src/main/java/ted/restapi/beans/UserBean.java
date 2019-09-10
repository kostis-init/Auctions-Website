package ted.restapi.beans;

import ted.restapi.persistence.dao.UserDAO;
import ted.restapi.persistence.entities.User;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.List;

@Stateless
@LocalBean
public class UserBean {

    @Inject private UserDAO userDAO;

    public List<User> getAll(){
        return userDAO.getAll();
    }

    public User findById(int id) {
        return userDAO.findById(id);
    }

    public String login(String username, String password){
        User user = userDAO.findByUsername(username);
        //TODO: hashing
        if(user == null || !user.getPassword().equals(password)) {
            return "Wrong Credentials";
        }
        System.out.println("USER: " + user.toString());
        if(user.getIsApproved().equals("N")){
            return "User with username: " + user.getUsername() + ", is not approved";
        }
        return null;
    }

    public String isAdmin(String username) {
        User user = userDAO.findByUsername(username);
        return user.getIsAdmin();
    }

    public String register(User user) {
        User checkUser = userDAO.findByUsername(user.getUsername());
        if(checkUser != null){
            return "Username exists";
        }
        checkUser = userDAO.findByEmail(user.getEmail());
        if(checkUser != null){
            return "Email exists";
        }
        userDAO.register(user);
        return null;
    }

    public String updateIsApproved(int id, String isApproved){
        User user = findById(id);
        if(user == null){
            return "Wrong user id: " + id;
        }
        user.setIsApproved(isApproved);
        userDAO.update(user);
        return null;
    }

    public String deleteUser(int id) {
        User user = findById(id);
        if(user == null){
            return "Wrong user id: " + id;
        }
        userDAO.delete(user);
        return null;
    }

    public User getUserByUsername(String username) {
        return userDAO.findByUsername(username);
    }
}
