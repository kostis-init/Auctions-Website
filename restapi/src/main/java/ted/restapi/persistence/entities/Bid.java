package ted.restapi.persistence.entities;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "bid")
@NamedQueries({
        @NamedQuery(name = "Bid.findAll", query = "SELECT b FROM Bid b")
})
public class Bid {
    private int id;
    private Date time;
    private Double amount;
    private User bidder;
    private Item item;

    @Id
    @Column(name = "bid_id", nullable = false)
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "time", nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    public Date getTime() {
        return time;
    }
    public void setTime(Date time) {
        this.time = time;
    }

    @Basic
    @Column(name = "amount", nullable = true, precision = 0)
    public Double getAmount() {
        return amount;
    }
    public void setAmount(Double amount) {
        this.amount = amount;
    }

    @ManyToOne
    @JoinColumn(name = "bidder_id", referencedColumnName = "user_id", nullable = false)
    public User getBidder() {
        return bidder;
    }
    public void setBidder(User user) {
        this.bidder = user;
    }

    @ManyToOne
    @JoinColumn(name = "item_id", referencedColumnName = "item_id", nullable = false)
    public Item getItem() {
        return item;
    }
    public void setItem(Item item) {
        this.item = item;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Bid bid = (Bid) o;
        return id == bid.id &&
                Objects.equals(time, bid.time) &&
                Objects.equals(amount, bid.amount);
    }
    @Override
    public int hashCode() {
        return Objects.hash(id, time, amount);
    }
}
