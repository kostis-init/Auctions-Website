package ted.restapi.beans;

import ted.restapi.persistence.dao.BidDAO;
import ted.restapi.persistence.dao.ItemDAO;
import ted.restapi.persistence.entities.Bid;
import ted.restapi.persistence.entities.Item;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;

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
        if(bid.getAmount() >= item.getBuyPrice()){
            return "Unacceptable bid. Bid cannot be >= than buyPrice. Just buy it!";
        }
        bidDAO.create(bid);

        item.setCurrentBid(bid.getAmount());
        item.setNumberOfBids(item.getNumberOfBids() + 1);
        itemDAO.update(item);

        return null;
    }
}
