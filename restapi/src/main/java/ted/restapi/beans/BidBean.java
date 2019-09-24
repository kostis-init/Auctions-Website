package ted.restapi.beans;

import ted.restapi.persistence.dao.BidDAO;
import ted.restapi.persistence.dao.ItemDAO;
import ted.restapi.persistence.entities.Bid;
import ted.restapi.persistence.entities.Item;
import ted.restapi.persistence.entities.User;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

@Stateless
@LocalBean
public class BidBean {

    @Inject private BidDAO bidDAO;
    @Inject private ItemDAO itemDAO;

    public String create(Bid bid){
        Item item = bid.getItem();
        if(item == null){
            return "No item found for this itemId";
        }
        if(bid.getAmount() <= item.getCurrentBid()){
            return "Unacceptable bid. Bid cannot be <= than currentBid";
        }
        if(item.getBuyPrice() != null && bid.getAmount() >= item.getBuyPrice()){
            return "Unacceptable bid. Bid cannot be >= than buyPrice. Just buy it!";
        }
        bidDAO.create(bid);

        item.setCurrentBid(bid.getAmount());
        item.setNumberOfBids(item.getNumberOfBids() + 1);
        itemDAO.update(item);

        return null;
    }

    public List<User> getBidders(Item item) {
        List<User> users = new ArrayList<>();
        List<Bid> bids = item.getBids();
        List<Integer> userIds = new ArrayList<>();
        for (Bid bid : bids) {
            if(!userIds.contains(bid.getBidder().getId())){
                users.add(bid.getBidder());
                userIds.add(bid.getBidder().getId());
            }
        }
        return users;
    }
}
