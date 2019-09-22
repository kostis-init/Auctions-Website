package ted.restapi.resources;

import ted.restapi.beans.UserBean;
import ted.restapi.persistence.entities.User;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@RequestScoped
@Path("ratings")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class RatingResource {

    @Inject private UserBean userBean;

    @POST
    @Path("bidder/{userId}")
    public Response addBidderRating(@PathParam("userId") int userId, @QueryParam("rating") Double rating){

        User user = userBean.findById(userId);
        if(user == null){
            return Response.status(400).entity("No other user found").build();
        }
        userBean.addBidderRating(user, rating);

        return Response.ok().build();
    }

    @POST
    @Path("seller/{userId}")
    public Response addSellerRating(@PathParam("userId") int userId, @QueryParam("rating") Double rating){

        User user = userBean.findById(userId);
        if(user == null){
            return Response.status(400).entity("No other user found").build();
        }
        userBean.addSellerRating(user, rating);

        return Response.ok().build();
    }
}
