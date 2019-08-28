package ted.restapi.resources;

import ted.restapi.dao.UserDAO;
import ted.restapi.models.User;

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
    public Response getTodo(@PathParam("id") String id) {
        User user = userDAO.findById(id);

        return Response.ok(user).build();
    }

    @PUT
    @Path("{id}")
    public Response update(@PathParam("id") String id, User user) {
        User updateUser = userDAO.findById(id);

        updateUser.setEmail(user.getEmail());
        updateUser.setPassword(user.getPassword());
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
    public Response delete(@PathParam("id") String id) {
        User getUser = userDAO.findById(id);

        userDAO.delete(getUser);

        return Response.ok().build();
    }


}