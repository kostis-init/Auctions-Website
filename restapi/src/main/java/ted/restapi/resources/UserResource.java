package ted.restapi.resources;

import ted.restapi.beans.UserBean;
import ted.restapi.dto.LoginResponseDTO;
import ted.restapi.dto.UserDTO;
import ted.restapi.persistence.entities.User;
import ted.restapi.util.JWT;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.json.Json;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@RequestScoped
@Path("users")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {

    @Inject private UserBean userBean;

    @POST
    @Path("login")
    public Response login(UserDTO userDTO) {
        String username = userDTO.getUsername();
        String password = userDTO.getPassword();
        String result = userBean.login(username, password);
        if(result == null){
            String jwt = JWT.createJWT(userDTO.getUsername());
            String isAdmin = userBean.isAdmin(username);
            LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
            loginResponseDTO.setJwt(jwt);
            loginResponseDTO.setIsAdmin(isAdmin);
            return Response.ok(loginResponseDTO).build();
        }else{
            return Response.status(400).entity(result).build();
        }
    }

    @POST
    @Path("registration")
    public Response registration(UserDTO userDTO){
        String username = userDTO.getUsername();
        String password = userDTO.getPassword();
        String firstName = userDTO.getFirstName();
        String lastName = userDTO.getLastName();
        String email = userDTO.getEmail();
        String telephoneNum = userDTO.getTelephoneNum();
        String country = userDTO.getCountry();
        String city = userDTO.getCity();
        String address = userDTO.getAddress();
        String afm = userDTO.getAfm();

        User user = new User(username, password, firstName, lastName, email, telephoneNum, afm,
                0.0, 0.0, "N", address, city, country, "N");

        String result = userBean.register(user);
        if(result != null){
            return Response.status(400)
                    .entity(Json.createObjectBuilder().add("message", result).build())
                    .build();
        } else {
            return Response.ok().build();
        }

    }

}