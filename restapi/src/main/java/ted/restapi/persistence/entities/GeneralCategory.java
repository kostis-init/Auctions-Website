package ted.restapi.persistence.entities;

import org.eclipse.persistence.annotations.CascadeOnDelete;

import javax.persistence.*;
import java.sql.Blob;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "general_category")
@NamedQueries({
        @NamedQuery(name = "GeneralCategory.findAll", query = "SELECT g FROM GeneralCategory g"),
        @NamedQuery(name = "GeneralCategory.findById", query = "SELECT g FROM GeneralCategory g WHERE g.id = ?1")
})
public class GeneralCategory {
    private int id;
    private String name;
    private byte[] image;
    private List<Category> categories;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "general_category_id", nullable = false)
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "name")
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

    @OneToMany(mappedBy = "generalCategory")
    @CascadeOnDelete
    public List<Category> getCategories(){ return categories;}
    public void setCategories(List<Category> categories){ this.categories = categories;}

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GeneralCategory that = (GeneralCategory) o;
        return id == that.id &&
                Objects.equals(name, that.name) &&
                Objects.equals(image, that.image) &&
                Objects.equals(categories, that.categories);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, image, categories);
    }

}
