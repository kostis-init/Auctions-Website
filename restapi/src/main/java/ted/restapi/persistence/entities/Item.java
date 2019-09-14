package ted.restapi.persistence.entities;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "item")
@NamedQueries({
        @NamedQuery(name = "Item.findAll", query = "SELECT i FROM Item i"),
        @NamedQuery(name = "Item.search", query = "SELECT i FROM Item i WHERE LOWER(i.name) LIKE ?1"),
        @NamedQuery(name = "Item.findByName", query = "SELECT i FROM Item i WHERE LOWER(i.name) = LOWER(?1)"),
        @NamedQuery(name = "Item.findBySellerId", query = "SELECT i FROM Item i WHERE i.seller.id = ?1")
})
@Cacheable(false)
public class Item {
    private int id;
    private String name;
    private Double currentBid;
    private Double buyPrice;
    private Double firstBid;
    private int numberOfBids;
    private Date startedAt;
    private Date endsAt;
    private String description;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String city;
    private String country;
    private List<Bid> bids;
    private User seller;
    private List<Category> categories;
    private List<ItemImage> images;

    public Item(){}

    public Item(String name, Double currentBid, Double buyPrice, Double firstBid, int numberOfBids, Date startedAt, Date endsAt, String description, BigDecimal latitude, BigDecimal longitude, String city, String country, User seller, List<Category> categories) {
        this.name = name;
        this.currentBid = currentBid;
        this.buyPrice = buyPrice;
        this.firstBid = firstBid;
        this.numberOfBids = numberOfBids;
        this.startedAt = startedAt;
        this.endsAt = endsAt;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
        this.city = city;
        this.country = country;
        this.seller = seller;
        this.categories = categories;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id", nullable = false)
    public int getId() { return id; }
    public void setId(int itemId) { this.id = itemId; }

    @Basic
    @Column(name = "name", nullable = false, length = 255)
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    @Basic
    @Column(name = "current_bid", nullable = true, precision = 0)
    public Double getCurrentBid() { return currentBid; }
    public void setCurrentBid(Double currentBid) { this.currentBid = currentBid; }

    @Basic
    @Column(name = "buy_price", nullable = true, precision = 0)
    public Double getBuyPrice() { return buyPrice; }
    public void setBuyPrice(Double buyPrice) { this.buyPrice = buyPrice; }

    @Basic
    @Column(name = "first_bid", nullable = true, precision = 0)
    public Double getFirstBid() { return firstBid; }
    public void setFirstBid(Double firstBid) { this.firstBid = firstBid; }

    @Basic
    @Column(name = "number_of_bids", nullable = true)
    public int getNumberOfBids() { return numberOfBids; }
    public void setNumberOfBids(int numberOfBids) { this.numberOfBids = numberOfBids; }

    @Basic
    @Column(name = "started_at", nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    public Date getStartedAt() { return startedAt; }
    public void setStartedAt(Date startedAt) { this.startedAt = startedAt; }

    @Basic
    @Column(name = "ends_at", nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    public Date getEndsAt() { return endsAt; }
    public void setEndsAt(Date endsAt) { this.endsAt = endsAt; }

    @Basic
    @Column(name = "description", nullable = true, length = -1)
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    @Basic
    @Column(name = "latitude", nullable = true, precision = 8)
    public BigDecimal getLatitude() {
        return latitude;
    }
    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }

    @Basic
    @Column(name = "longitude", nullable = true, precision = 8)
    public BigDecimal getLongitude() {
        return longitude;
    }
    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }

    @Basic
    @Column(name = "city", nullable = true, length = 45)
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }

    @Basic
    @Column(name = "country", nullable = true, length = 45)
    public String getCountry() {
        return country;
    }
    public void setCountry(String country) {
        this.country = country;
    }

    @OneToMany(mappedBy = "item")
    public List<Bid> getBids() { return bids; }
    public void setBids(List<Bid> bids) { this.bids = bids; }

    @ManyToOne
    @JoinColumn(name = "seller_id", referencedColumnName = "user_id")
    public User getSeller() { return seller; }
    public void setSeller(User user) { this.seller = user; }

    @ManyToMany
    @JoinTable(name = "item_category",
            joinColumns = @JoinColumn(name = "item_id", referencedColumnName = "item_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id", referencedColumnName = "category_id"))
    public List<Category> getCategories() { return categories; }
    public void setCategories(List<Category> categories) { this.categories = categories; }

    @OneToMany(mappedBy = "item")
    public List<ItemImage> getImages() { return images; }
    public void setImages(List<ItemImage> images) { this.images = images; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Item item = (Item) o;
        return id == item.id &&
                numberOfBids == item.numberOfBids &&
                Objects.equals(name, item.name) &&
                Objects.equals(currentBid, item.currentBid) &&
                Objects.equals(buyPrice, item.buyPrice) &&
                Objects.equals(firstBid, item.firstBid) &&
                Objects.equals(startedAt, item.startedAt) &&
                Objects.equals(endsAt, item.endsAt) &&
                Objects.equals(description, item.description) &&
                Objects.equals(latitude, item.latitude) &&
                Objects.equals(longitude, item.longitude) &&
                Objects.equals(city, item.city) &&
                Objects.equals(country, item.country) &&
                Objects.equals(seller, item.seller);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, currentBid, buyPrice, firstBid, numberOfBids, startedAt, endsAt, description, latitude, longitude, city, country, seller);
    }
}
