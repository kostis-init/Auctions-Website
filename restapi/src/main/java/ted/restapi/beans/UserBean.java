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

    public List<User> getUsers(){ return userDAO.getAll(); }

    public User findById(int id) { return userDAO.findById(id); }

    public void update(User newUser) {
    }

    public void create(User user) {
    }

    public void delete(User getUser) {
    }
}
