package ted.restapi.beans;

import ted.restapi.persistence.dao.CategoryDAO;
import ted.restapi.persistence.entities.Bid;
import ted.restapi.persistence.entities.Category;
import ted.restapi.persistence.entities.GeneralCategory;
import ted.restapi.persistence.entities.Item;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.List;

@Stateless
@LocalBean
public class CategoryBean {
    @Inject private CategoryDAO categoryDAO;

    public List<GeneralCategory> getGeneralCategories(){ return categoryDAO.getGeneralCategories(); }

    public List<Category> getCategories(){
        return categoryDAO.getCategories();
    }

    public Category findById(int id) { return categoryDAO.findById(id); }

    public List<Category> getCategoriesByGeneralCategoryId(int id){
        return categoryDAO.getCategoriesByGeneralCategoryId(id);
    }

    public List<Item> getItemsByCategoryId(int categoryId){
        return categoryDAO.findByCategoryId(categoryId).getItems();
    }

    public byte[] getCategoryImage(int id) {
        return categoryDAO.getCategoryImage(id);
    }

    public byte[] getGeneralCategoryImage(int id) {
        return categoryDAO.getGeneralCategoryImage(id);
    }

    public void update(Category category) {
        categoryDAO.update(category);
    }
}
