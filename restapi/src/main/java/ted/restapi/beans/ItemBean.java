package ted.restapi.beans;

import ted.restapi.persistence.dao.ItemDAO;
import ted.restapi.persistence.entities.Item;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.List;

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


}
