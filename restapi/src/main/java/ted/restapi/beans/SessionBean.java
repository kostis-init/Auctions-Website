package ted.restapi.beans;

import ted.restapi.persistence.entities.User;

import javax.ejb.*;
import javax.enterprise.context.SessionScoped;
import javax.inject.Inject;
import java.io.Serializable;

@SessionScoped
@Stateful
@LocalBean
public class SessionBean implements Serializable {

    @Inject private UserBean userBean;

    private User currentUser;

    public User getCurrentUser() {
        return currentUser;
    }

    public String setCurrentUser(String username) {
        currentUser = userBean.getUserByUsername(username);
        if(currentUser == null){
            return "Session: no user found";
        }
        return null;
    }
}
