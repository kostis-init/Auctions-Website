package ted.restapi.persistence.dao;

import ted.restapi.persistence.entities.Category;
import ted.restapi.persistence.entities.GeneralCategory;
import ted.restapi.persistence.entities.Item;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Stateless
public class CategoryDAO {

    @PersistenceContext(unitName = "restapi_PU")
    private EntityManager em;

    public List<GeneralCategory> getGeneralCategories() { return em.createNamedQuery("GeneralCategory.findAll", GeneralCategory.class).getResultList(); }

    public Category findById(int id) { return em.find(Category.class, id); }

    public Category findByCategoryId(int id){
        return em.createNamedQuery("Category.findByCategoryId", Category.class)
                .setParameter(1, id).getResultList().get(0);
    }

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

    public List<Category> getCategoriesByGeneralCategoryId(int id) {
        return em.createNamedQuery("Category.findByGeneralCategoryId", Category.class)
                .setParameter(1, id).getResultList();
    }
}
