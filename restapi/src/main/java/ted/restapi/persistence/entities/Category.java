package ted.restapi.persistence.entities;

import javax.persistence.*;
import java.sql.Blob;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "category")
@NamedQueries({
        @NamedQuery(name = "Category.findAll", query = "SELECT c FROM Category c"),
        @NamedQuery(name = "Category.findByCategoryId", query = "SELECT c FROM Category c WHERE c.id = ?1"),
        @NamedQuery(name = "Category.findByGeneralCategoryId", query = "SELECT c FROM Category c WHERE c.generalCategory.id = ?1")

})
public class Category {
    private int id;
    private String name;
    private byte[] image;
    private List<Item> items;
    private GeneralCategory generalCategory;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id", nullable = false)
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "name", nullable = false, length = 255)
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    @Lob
    @Column(name = "image")
    public byte[] getImage() { return image; }
    public void setImage(byte[] image) { this.image = image; }

    @ManyToMany(mappedBy = "categories")
    public List<Item> getItems() { return items; }
    public void setItems(List<Item> items) { this.items = items; }

    @ManyToOne
    @JoinColumn(name = "general_category_id", referencedColumnName = "general_category_id")
    public GeneralCategory getGeneralCategory() { return generalCategory; }
    public void setGeneralCategory(GeneralCategory generalCategory){ this.generalCategory = generalCategory;}

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Category category = (Category) o;
        return id == category.id &&
                Objects.equals(name, category.name) &&
                Objects.equals(image, category.image) &&
                Objects.equals(generalCategory, category.generalCategory);
    }
    @Override
    public int hashCode() {
        return Objects.hash(id, name, image, generalCategory);
    }

    public void addItem(Item item) {
        items.add(item);
    }
}
