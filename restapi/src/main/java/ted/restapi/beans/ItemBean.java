package ted.restapi.beans;

import ted.restapi.persistence.dao.BidDAO;
import ted.restapi.persistence.dao.ItemDAO;
import ted.restapi.persistence.entities.*;
import ted.restapi.util.Constants;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.*;

@Stateless
@LocalBean
public class ItemBean {

    @Inject private BidDAO bidDAO;
    @Inject private ItemDAO itemDAO;
    @Inject private CategoryBean categoryBean;

    public List<Item> getAll() {
        return itemDAO.getAll();
    }

    public Item getItemById(int id) {
        return itemDAO.findById(id);
    }

    public List<Item> getOnlyActiveItems(List<Item> items) {
        List<Item> newItems = new ArrayList<>();
        for (Item item : items) {
            if(item.getState().equals(Constants.ITEM_ACTIVE_STATE)){
                newItems.add(item);
            }
        }
        return newItems;
    }

    public Set<Item> search(String text) {
        Set<Item> items = new HashSet<>();
        String[] words = text.split(" ");

        for (String word : words) {
            items.addAll(itemDAO.searchByWord(word));
            System.out.println(word + "\n" + items + "\n");
        }

        return items;
    }

    public Set<Item> searchByCategory(String text, int categoryId) {
        Set<Item> items = search(text);
        Set<Item> newItems = new HashSet<>();
        items.forEach( item -> {
            boolean exists = false;
            for (Category category : item.getCategories()) {
                if(category.getId() == categoryId){
                    exists = true;
                    break;
                }
            }
            if(exists){
                newItems.add(item);
            }
        });
        return newItems;
    }

    public Set<Item> searchByGeneralCategory(String text, int generalCategoryId) {
        List<Category> categories = categoryBean.getCategoriesByGeneralCategoryId(generalCategoryId);
        List<Integer> catIds = new ArrayList<>();
        for (Category category : categories) {
            catIds.add(category.getId());
        }
        Set<Item> items = search(text);
        Set<Item> newItems = new HashSet<>();
        items.forEach( item -> {
            boolean exists = false;
            for (Category category : item.getCategories()) {
                if(catIds.contains(category.getId())){
                    exists = true;
                    break;
                }
            }
            if(exists){
                newItems.add(item);
            }
        });
        return newItems;
    }

    public String createItem(Item item) {
        Item checkItem = itemDAO.findByName(item.getName());
        if(checkItem != null){
            return "Item name already exists";
        }
        if(item.getFirstBid() == null || item.getFirstBid() <= 0){
            return "Unacceptable first bid";
        }
        if(item.getBuyPrice() != null && item.getBuyPrice() < item.getFirstBid()){
            return "Unacceptable buy price";
        }
        itemDAO.create(item);
        return null;
    }


    public String update(Item item) {
        if(item.getFirstBid() == null || item.getFirstBid() <= 0){
            return "Unacceptable first bid";
        }
        if(item.getBuyPrice() != null && item.getBuyPrice() < item.getFirstBid()){
            return "Unacceptable buy price";
        }
        itemDAO.update(item);
        return null;
    }

    public List<Item> getItemsBySellerId(int id) {
        return itemDAO.findBySellerId(id);
    }

    public void createItemImage(ItemImage itemImage) {
        itemDAO.createItemImage(itemImage);
    }

    public String delete(User currentUser, Item item) {
        if(item == null){
            return "Item not found";
        }
        if(item.getSeller().getId() != currentUser.getId()){
            return "Cannot delete an item of another user";
        }
        if(item.getNumberOfBids() > 0){
            return "Cannot delete an item that someone has made a bid";
        }

        itemDAO.delete(item);
        return null;
    }

    public String buyNow(User currentUser, Item item) {
        if(item == null){
            return "Item not found";
        }
        if(item.getBuyPrice() == null){
            return "Item has no buy price";
        }

        Bid buyBid = new Bid(new Date(), item.getBuyPrice(), currentUser, item);
        bidDAO.create(buyBid);

        item.setCurrentBid(item.getBuyPrice());
        item.setNumberOfBids(item.getNumberOfBids() + 1);
        item.setState(Constants.ITEM_ENDED_STATE);
        currentUser.getBoughtItems().add(item);
        item.setBuyer(currentUser);
        itemDAO.update(item);

        return null;
    }

    public void removeItemImages(Item item) {
        for (ItemImage image : item.getImages()) {
            itemDAO.removeImage(image);
        }
    }

    public List<Item> getBiddenActiveItems(User currentUser) {
        List<Item> items = itemDAO.getActiveItems();
        List<Bid> bids = currentUser.getBids();
        List<Integer> itemIds = new ArrayList<>();
        for (Bid bid : bids) {
            if(!itemIds.contains(bid.getItem().getId())){
                itemIds.add(bid.getItem().getId());
            }
        }
        List<Item> newItems = new ArrayList<>();
        for (Item item : items) {
            if(itemIds.contains(item.getId())){
                newItems.add(item);
            }
        }

        return newItems;
    }

    public List<Item> getBiddenItems(User currentUser) {
        List<Item> items = new ArrayList<>();
        List<Bid> bids = currentUser.getBids();
        List<Integer> itemIds = new ArrayList<>();
        for (Bid bid : bids) {
            if(!itemIds.contains(bid.getItem().getId())){
                items.add(bid.getItem());
                itemIds.add(bid.getItem().getId());
            }
        }
        return items;
    }

    public List<Item> getVisitedItems(User currentUser) {
        //TODO
        return null;
    }
}
