package ted.restapi.models;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name= "User")
@NamedQueries({
        @NamedQuery(name = "User.findAll", query = "SELECT u FROM User u")
})
public class User implements Serializable{

    @Id
    @Column(name = "UserID")
    private String id;

    @Column(name = "Password")
    private String password;

    @Column(name = "Email")
    private String email;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}