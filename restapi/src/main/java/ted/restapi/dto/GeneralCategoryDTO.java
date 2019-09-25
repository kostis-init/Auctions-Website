package ted.restapi.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import ted.restapi.persistence.entities.GeneralCategory;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.sql.Blob;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder
@JsonIgnoreProperties(ignoreUnknown=true)
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
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

    public GeneralCategoryDTO(int id, String name) {
        this.id = id;
        this.name = name;
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
