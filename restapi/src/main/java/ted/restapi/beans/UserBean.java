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

    public List<User> getAll(){ return userDAO.getAll(); }

    public User findById(int id) { return userDAO.findById(id); }

    public boolean validLogin(String username, String password){
        User user = userDAO.findByUsername(username);
        if(user == null){
            return false;
        }
        //TODO: hashing
        System.out.println("USER: " + user.toString());
        return user.getPassword().equals(password) && !user.getIsApproved().equals("N");
    }

    public String isAdmin(String username) {
        User user = userDAO.findByUsername(username);
        return user.getIsAdmin();
    }

    public String register(String username, String password, String firstName, String lastName, String email,
                           String telephoneNum, String country, String city, String address, String afm) {
        User user = userDAO.findByUsername(username);
        if(user != null){
            return "Username exists";
        }
        user = userDAO.findByEmail(email);
        if(user != null){
            return "Email exists";
        }
        userDAO.register(username, password, firstName, lastName, email,
                telephoneNum, country, city, address, afm);
        return null;
    }
}
