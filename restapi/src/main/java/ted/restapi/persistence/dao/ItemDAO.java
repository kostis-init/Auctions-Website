package ted.restapi.persistence.dao;

import ted.restapi.persistence.entities.Category;
import ted.restapi.persistence.entities.Item;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Collection;
import java.util.List;

@Stateless
public class ItemDAO {

    @PersistenceContext(unitName = "restapi_PU")
    private EntityManager em;

    public List<Item> getAll() { return em.createNamedQuery("Item.findAll", Item.class).getResultList(); }

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
        return em.createNamedQuery("Item.search", Item.class)
                .setParameter(1, "%" + word + "%").getResultList();
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
}
