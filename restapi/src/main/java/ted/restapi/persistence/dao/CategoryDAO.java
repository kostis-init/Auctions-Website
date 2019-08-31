package ted.restapi.persistence.dao;

import ted.restapi.persistence.entities.Category;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Stateless
public class CategoryDAO {

    @PersistenceContext(unitName = "restapi_PU")
    EntityManager em;

    public List<Category> getAll() { return em.createNamedQuery("Category.findAll", Category.class).getResultList(); }

    public Category findById(int id) { return em.find(Category.class, id); }

    public void update(Category category) {
        em.merge(category);
    }

    public void create(Category category) {
        em.persist(category);
    }

    public void delete(Category category) {
        if (!em.contains(category)) {
            category = em.merge(category);
        }
        em.remove(category);
    }

}
