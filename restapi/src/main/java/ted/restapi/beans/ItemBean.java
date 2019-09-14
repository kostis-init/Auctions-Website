package ted.restapi.beans;

import ted.restapi.persistence.dao.ItemDAO;
import ted.restapi.persistence.entities.Category;
import ted.restapi.persistence.entities.Item;
import ted.restapi.persistence.entities.ItemImage;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.*;

@Stateless
@LocalBean
public class ItemBean {

    @Inject private ItemDAO itemDAO;
    @Inject private CategoryBean categoryBean;

    public List<Item> getAll() {
        return itemDAO.getAll();
    }

    public Item getItemById(int id) {
        return itemDAO.findById(id);
    }

    public Set<Item> search(String text) {
        Set<Item> items = new HashSet<>();
        List<String> words = Arrays.asList(text.split(" "));

        words.forEach(word -> {
            items.addAll(itemDAO.searchByWord(word));
            System.out.println(word + "\n" + items + "\n");
        });

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


    public void update(Item item) {
        itemDAO.update(item);
    }

    public List<Item> getItemsBySellerId(int id) {
        return itemDAO.findBySellerId(id);
    }

    public void createItemImage(ItemImage itemImage) {
        itemDAO.createItemImage(itemImage);
    }
}
