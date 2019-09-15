package ted.restapi.persistence.dao;

import ted.restapi.persistence.entities.Message;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Stateless
public class MessageDAO {
    @PersistenceContext(unitName = "restapi_PU")
    private EntityManager em;

    public List<Message> getAll() { return em.createNamedQuery("Message.findAll", Message.class).getResultList(); }

    public Message findById(int id) { return em.find(Message.class, id); }

    public void update(Message message) {
        em.merge(message);
    }

    public void create(Message message) {
        em.persist(message);
    }

    public void delete(Message message) {
        if (!em.contains(message)) {
            message = em.merge(message);
        }
        em.remove(message);
    }

    public List<Message> getMessagesOfTwoUsers(int id, int id1) {
        return em.createNamedQuery("Message.findByTwoUsers", Message.class)
                .setParameter(1, id).setParameter(2, id1).getResultList();
    }
}
