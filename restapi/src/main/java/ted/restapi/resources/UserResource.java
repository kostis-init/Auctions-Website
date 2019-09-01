package ted.restapi.resources;

import ted.restapi.beans.UserBean;
import ted.restapi.persistence.dao.UserDAO;
import ted.restapi.persistence.entities.User;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@RequestScoped
@Path("users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {

    @Inject private UserBean userBean;

    @GET
    public Response getAll() {
        return Response.ok(userBean.getUsers()).build();
    }

    @GET
    @Path("{id}")
    public Response getUser(@PathParam("id") int id) {
        User user = userBean.findById(id);

        return Response.ok(user).build();
    }

    @PUT
    @Path("{id}")
    public Response update(@PathParam("id") int id, User user) {
        User updateUser = userBean.findById(id);

        //TODO: set fields for updateUser

        userBean.update(updateUser);

        return Response.ok().build();
    }

    @POST
    public Response create(User user) {
        userBean.create(user);
        return Response.ok().build();
    }

    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") int id) {
        User getUser = userBean.findById(id);

        userBean.delete(getUser);

        return Response.ok().build();
    }


}