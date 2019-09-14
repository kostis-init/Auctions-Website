package ted.restapi.resources;

import ted.restapi.beans.BidBean;
import ted.restapi.beans.ItemBean;
import ted.restapi.beans.Session;
import ted.restapi.dto.BidDTO;
import ted.restapi.persistence.entities.Bid;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Date;

@RequestScoped
@Path("bids")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class BidResource {

    @Inject private Session session;
    @Inject private ItemBean itemBean;
    @Inject private BidBean bidBean;

    @POST
    @Path("{itemId}")
    public Response createBid(BidDTO bidDTO, @PathParam("itemId") int itemId){
        Bid bid = new Bid(new Date(),bidDTO.getAmount(),session.getCurrentUser(),itemBean.getItemById(itemId));
        String result = bidBean.create(bid);
        if(result != null){
            return Response.status(400).entity(result).build();
        }
        return Response.ok().build();
    }

}
