package ted.restapi.resources;

import ted.restapi.beans.ItemBean;
import ted.restapi.persistence.entities.Item;
import ted.restapi.persistence.entities.User;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@RequestScoped
@Path("items")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ItemResource {

    @Inject private ItemBean itemBean;

    @GET
    public Response getAll() {
        JsonArrayBuilder list = Json.createArrayBuilder();
        itemBean.getAll().stream().map(Item::toJson).forEach(list::add);
        return Response.ok(list).build();
    }

    @POST
    public Response create(Item item) {
        itemBean.create(item);
        return Response.ok().build();
    }

}
