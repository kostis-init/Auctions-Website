package ted.restapi.resources;

import ted.restapi.beans.UserBean;
import ted.restapi.dto.UserDTO;
import ted.restapi.persistence.entities.User;
import ted.restapi.util.Mapper;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.stream.Collectors;

@RequestScoped
@Path("admin")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AdminResource {

    @Inject UserBean userBean;

    @GET
    @Path("users")
    public Response getUsers(){
        List<User> users = userBean.getAll();
        if(users.isEmpty()){
            return Response.ok("No users were found in database").build();
        }
        List<UserDTO> list = users.stream().map(Mapper::toDTO).collect(Collectors.toList());
        return Response.ok(list).build();
    }

    @PUT
    @Path("users")
    public Response updateIsApproved(UserDTO userDTO){
        String result = userBean.updateIsApproved(userDTO.getId(), userDTO.getIsApproved());
        if(result == null){
            return Response.ok().build();
        }else{
            return Response.status(400).entity(result).build();
        }
    }

    @DELETE
    @Path("users/{id}")
    public Response deleteUser(@PathParam("id") int id){
        String result = userBean.deleteUser(id);
        if(result == null){
            return Response.ok().build();
        }else{
            return Response.status(400).entity(result).build();
        }
    }

}
