package ted.restapi.beans;

import org.mindrot.jbcrypt.BCrypt;
import ted.restapi.persistence.dao.ItemDAO;
import ted.restapi.persistence.dao.UserDAO;
import ted.restapi.persistence.entities.Bid;
import ted.restapi.persistence.entities.Item;
import ted.restapi.persistence.entities.User;
import ted.restapi.util.Constants;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import java.io.Serializable;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

@Stateless
@LocalBean
public class UserBean implements Serializable {

    @Inject private UserDAO userDAO;
    @Inject private ItemDAO itemDAO;

    public List<User> getAll(){
        return userDAO.getAll();
    }

    public User findById(int id) {
        return userDAO.findById(id);
    }

    public User getUserByUsername(String username) {
        return userDAO.findByUsername(username);
    }

    public String login(String username, String password){
        User user = userDAO.findByUsername(username);
        if(user == null || !BCrypt.checkpw(password, user.getPassword())) {
            return "Wrong Credentials";
        }
        System.out.println("LOGIN: " + user.toString());
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
        String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt(10));
        user.setPassword(hashedPassword);
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


    public void updateDB() {
        List<Item> items = itemDAO.getAll();
        for (Item item : items) {
            Date currentDate = new Date();
            if (item.getState().equals(Constants.ITEM_READY_STATE) && item.getStartedAt().before(currentDate)) {
                item.setState(Constants.ITEM_ACTIVE_STATE);
                itemDAO.update(item);
                System.out.println("Item with id: " + item.getId() + ", READY -> ACTIVE\n");
            } else if (item.getState().equals(Constants.ITEM_ACTIVE_STATE) && item.getEndsAt().before(currentDate)) {
                item.setState(Constants.ITEM_ENDED_STATE);
                if (!item.getBids().isEmpty()) {
                    Bid winningBid = item.getBids().stream().max(Comparator.comparing(Bid::getAmount)).get();
                    User winner = winningBid.getBidder();
                    winner.getBoughtItems().add(item);
                    item.setBuyer(winner);
                    itemDAO.update(item);
                }
                System.out.println("Item with id: " + item.getId() + ", ACTIVE -> ENDED\n");
            }
        }
    }

    public void addBidderRating(User user, Double rating) {
        user.setBidderRatings(user.getBidderRatings() + 1);
        user.setBidderRatingSum(user.getBidderRatingSum() + rating);
        userDAO.update(user);
    }

    public void addSellerRating(User user, Double rating) {
        user.setSellerRatings(user.getSellerRatings() + 1);
        user.setSellerRatingSum(user.getSellerRatingSum() + rating);
        userDAO.update(user);
    }
}
