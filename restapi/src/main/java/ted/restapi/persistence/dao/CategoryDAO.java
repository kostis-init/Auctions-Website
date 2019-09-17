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

    public byte[] getCategoryImage(int id) {
        List<Category> categories = em.createQuery("SELECT c FROM Category c WHERE c.id = ?1", Category.class).setParameter(1, id).getResultList();
        if(categories.isEmpty()){
            return null;
        }
        return categories.get(0).getImage();
    }

    public byte[] getGeneralCategoryImage(int id) {
        List<GeneralCategory> generalCategories = em.createQuery("SELECT g FROM GeneralCategory g WHERE g.id = ?1", GeneralCategory.class).setParameter(1, id).getResultList();
        if(generalCategories.isEmpty()){
            return null;
        }
        return generalCategories.get(0).getImage();
    }

    public List<Category> getCategories() {
        return em.createNamedQuery("Category.findAll", Category.class).getResultList();
    }
}
