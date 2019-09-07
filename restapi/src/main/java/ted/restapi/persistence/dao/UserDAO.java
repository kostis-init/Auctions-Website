package ted.restapi.persistence.dao;

import ted.restapi.persistence.entities.User;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Stateless
public class UserDAO{

    @PersistenceContext(unitName = "restapi_PU")
    private EntityManager em;

    public List<User> getAll() {
        return em.createNamedQuery("User.findAll", User.class).getResultList();
    }

    public User findById(int id) {
        return em.find(User.class, id);
    }

    public void update(User user) {
        em.merge(user);
    }

    public void create(User user) {
        em.persist(user);
    }

    public void delete(User user) {
        if (!em.contains(user)) {
            user = em.merge(user);
        }
        em.remove(user);
    }

    public User findByUsername(String username){
        List<User> users = em.createNamedQuery("User.findByUsername", User.class)
                            .setParameter(1, username).getResultList();
        if(users.size() != 1){
            return null;
        }else{
            return users.get(0);
        }
    }

    public User findByEmail(String email) {
        List<User> users = em.createNamedQuery("User.findByEmail", User.class)
                .setParameter(1, email).getResultList();
        if(users.size() != 1){
            return null;
        }else{
            return users.get(0);
        }
    }

    public void register(User user) {
        em.persist(user);
    }
}