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

    public void register(String username, String password, String firstName, String lastName, String email,
                         String telephoneNum, String country, String city, String address, String afm) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setTelephoneNum(telephoneNum);
        user.setCountry(country);
        user.setCity(city);
        user.setAddress(address);
        user.setAfm(afm);
        user.setIsAdmin("N");
        user.setIsApproved("N");

        em.persist(user);
    }
}