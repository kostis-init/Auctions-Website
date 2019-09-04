package ted.restapi.persistence.entities;

import javax.json.Json;
import javax.json.JsonObject;
import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "category")
@NamedQueries({
        @NamedQuery(name = "Category.findAll", query = "SELECT c FROM Category c")
})
public class Category {
    private int id;
    private String name;
    private List<Item> items;

    public JsonObject toJson(){
        return Json.createObjectBuilder()
                .add("id", id)
                .add("name", name)
                .build();
    }

    @Id
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

    @ManyToMany
    @JoinTable(name = "item_category",
            joinColumns = @JoinColumn(name = "category_id", referencedColumnName = "category_id", nullable = false),
            inverseJoinColumns = @JoinColumn(name = "item_id", referencedColumnName = "item_id", nullable = false))
    public List<Item> getItems() { return items; }
    public void setItems(List<Item> items) { this.items = items; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Category category = (Category) o;
        return id == category.id &&
                Objects.equals(name, category.name);
    }
    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}
