package ted.restapi.dto;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.sql.Blob;

@XmlRootElement
public class CategoryDTO implements Serializable {
    @XmlElement private int id;
    @XmlElement private String name;
    @XmlElement private Blob image;

    public CategoryDTO() { }

    public CategoryDTO(int id, String name, Blob image) {
        this.id = id;
        this.name = name;
        this.image = image;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Blob getImage() {
        return image;
    }

    public void setImage(Blob image) {
        this.image = image;
    }
}
