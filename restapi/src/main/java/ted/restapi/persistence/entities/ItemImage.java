package ted.restapi.persistence.entities;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Objects;

@Entity
@Table(name = "item_images")
@NamedQueries({
        @NamedQuery(name = "ItemImage.findAll", query = "SELECT i FROM ItemImage i")
})
@Cacheable(false)
public class ItemImage {
    private int id;
    private Item item;
    private byte[] image;

    public ItemImage() {}

    public ItemImage(Item item, byte[] image) {
        this.item = item;
        this.image = image;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_images_id", nullable = false)
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    @ManyToOne
    @JoinColumn(name = "item_id", referencedColumnName = "item_id", nullable = false)
    public Item getItem() {
        return item;
    }
    public void setItem(Item item) {
        this.item = item;
    }

    @Lob
    @Column(name = "image")
    public byte[] getImage() { return image; }
    public void setImage(byte[] image) { this.image = image; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ItemImage itemImage = (ItemImage) o;
        return id == itemImage.id &&
                Objects.equals(item, itemImage.item) &&
                Arrays.equals(image, itemImage.image);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(id, item);
        result = 31 * result + Arrays.hashCode(image);
        return result;
    }
}
