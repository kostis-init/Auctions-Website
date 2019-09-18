package ted.restapi.persistence.dao;

import ted.restapi.persistence.entities.Category;
import ted.restapi.persistence.entities.Item;
import ted.restapi.persistence.entities.ItemImage;
import ted.restapi.util.Constants;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Collection;
import java.util.List;

@Stateless
public class ItemDAO {

    @PersistenceContext(unitName = "restapi_PU")
    private EntityManager em;

    public List<Item> getAll() {
        return em.createNamedQuery("Item.findAll", Item.class).getResultList();
    }

    public List<Item> getReadyItems() {
        return em.createNamedQuery("Item.findByState", Item.class).setParameter(1, Constants.ITEM_READY_STATE).getResultList();
    }

    public List<Item> getActiveItems() {
        return em.createNamedQuery("Item.findByState", Item.class).setParameter(1, Constants.ITEM_ACTIVE_STATE).getResultList();
    }

    public List<Item> getEndedItems() {
        return em.createNamedQuery("Item.findByState", Item.class).setParameter(1, Constants.ITEM_ENDED_STATE).getResultList();
    }

    public Item findById(int id) { return em.find(Item.class, id); }

    public void update(Item item) {
        em.merge(item);
    }

    public void create(Item item) {
        em.persist(item);
    }

    public void delete(Item item) {
        if (!em.contains(item)) {
            item = em.merge(item);
        }
        em.remove(item);
    }

    public List<Item> searchByWord(String word) {
        return em.createNamedQuery("Item.searchByState", Item.class)
                .setParameter(1, "%" + word + "%").setParameter(2, Constants.ITEM_ACTIVE_STATE).getResultList();
    }

    public Item findByName(String name) {
        List<Item> items = em.createNamedQuery("Item.findByName", Item.class).setParameter(1,name).getResultList();
        if(items.isEmpty()){
            return null;
        }
        return items.get(0);
    }

    public List<Item> findBySellerId(int id) {
        return em.createNamedQuery("Item.findBySellerId", Item.class).setParameter(1, id).getResultList();
    }

    public void createItemImage(ItemImage itemImage) {
        em.persist(itemImage);
    }

    public void updateItemImage(ItemImage itemImage) {
        em.merge(itemImage);
    }
}
