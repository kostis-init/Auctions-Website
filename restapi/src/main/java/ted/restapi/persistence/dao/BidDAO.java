package ted.restapi.persistence.dao;

import ted.restapi.persistence.entities.Bid;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Stateless
public class BidDAO {

    @PersistenceContext(unitName = "restapi_PU")
    EntityManager em;

    public List<Bid> getAll() { return em.createNamedQuery("Bid.findAll", Bid.class).getResultList(); }

    public Bid findById(int id) { return em.find(Bid.class, id); }

    public void update(Bid bid) {
        em.merge(bid);
    }

    public void create(Bid bid) {
        em.persist(bid);
    }

    public void delete(Bid bid) {
        if (!em.contains(bid)) {
            bid = em.merge(bid);
        }
        em.remove(bid);
    }

}
