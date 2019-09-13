package ted.restapi.beans;

import ted.restapi.persistence.entities.User;

import javax.ejb.DependsOn;
import javax.ejb.LocalBean;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.inject.Inject;

@Singleton
@LocalBean
@Startup
@DependsOn("UserBean")
public class Session {

    @Inject private UserBean userBean;

    private User currentUser;

    public User getCurrentUser() {
        return currentUser;
    }

    public void setCurrentUser(String username) {
        currentUser = userBean.getUserByUsername(username);
    }
}
