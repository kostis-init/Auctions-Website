package ted.restapi.resources;

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

    @Inject
    UserDAO userDAO;

    @GET
    public Response getAll() {
        return Response.ok(userDAO.getAll()).build();
    }

    @GET
    @Path("{id}")
    public Response getTodo(@PathParam("id") int id) {
        User user = userDAO.findById(id);

        return Response.ok(user).build();
    }

    @PUT
    @Path("{id}")
    public Response update(@PathParam("id") int id, User user) {
        User updateUser = userDAO.findById(id);

        //TODO: set fields for updateUser

        userDAO.update(updateUser);

        return Response.ok().build();
    }

    @POST
    public Response create(User user) {
        userDAO.create(user);
        return Response.ok().build();
    }

    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") int id) {
        User getUser = userDAO.findById(id);

        userDAO.delete(getUser);

        return Response.ok().build();
    }


}