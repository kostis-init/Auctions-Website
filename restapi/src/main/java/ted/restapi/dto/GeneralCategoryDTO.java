package ted.restapi.dto;

import ted.restapi.persistence.entities.GeneralCategory;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.sql.Blob;

@XmlRootElement
public class GeneralCategoryDTO implements Serializable {
    @XmlElement private int id;
    @XmlElement private String name;
    @XmlElement private byte[] image;

    public GeneralCategoryDTO(){}

    public GeneralCategoryDTO(int id, String name, byte[] image) {
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

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}
