package ted.restapi.persistence.entities;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "location")
@NamedQueries({
        @NamedQuery(name = "Location.findAll", query = "SELECT l FROM Location l")
})
public class Location {
    private int id;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String address;
    private String city;
    private String country;
    private List<Item> items;
    private List<User> users;

    @Id
    @Column(name = "location_id", nullable = false)
    public int getId() {
        return id;
    }
    public void setId(int locationId) {
        this.id = locationId;
    }

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
    @Column(name = "address", nullable = true, length = 45)
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
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

    @OneToMany(mappedBy = "location")
    public List<Item> getItems() {
        return items;
    }
    public void setItems(List<Item> itemsByLocationId) {
        this.items = itemsByLocationId;
    }

    @OneToMany(mappedBy = "location")
    public List<User> getUsers() { return users; }
    public void setUsers(List<User> usersByLocationId) {
        this.users = usersByLocationId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Location location = (Location) o;
        return id == location.id &&
                Objects.equals(latitude, location.latitude) &&
                Objects.equals(longitude, location.longitude) &&
                Objects.equals(address, location.address) &&
                Objects.equals(city, location.city) &&
                Objects.equals(country, location.country);
    }
    @Override
    public int hashCode() {
        return Objects.hash(id, latitude, longitude, address, city, country);
    }
}
