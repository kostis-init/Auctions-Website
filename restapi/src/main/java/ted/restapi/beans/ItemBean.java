package ted.restapi.beans;

import ted.restapi.persistence.dao.ItemDAO;
import ted.restapi.persistence.entities.Category;
import ted.restapi.persistence.entities.Item;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.*;

@Stateless
@LocalBean
public class ItemBean {

    @Inject private ItemDAO itemDAO;

    public void create(Item item){
        itemDAO.create(item);
    }

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
}
