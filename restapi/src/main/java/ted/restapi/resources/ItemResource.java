package ted.restapi.resources;

import ted.restapi.beans.ItemBean;
import ted.restapi.dto.ItemDTO;
import ted.restapi.persistence.entities.Item;
import ted.restapi.util.Mapper;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@RequestScoped
@Path("items")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ItemResource {

    @Inject private ItemBean itemBean;

//    @GET
//    public Response getAll() {
//        JsonArrayBuilder list = Json.createArrayBuilder();
//        itemBean.getAll().stream().map(Item::toJson).forEach(list::add);
//        return Response.ok(list).build();
//    }

    @GET
    @Path("{id}")
    public Response getItemById(@PathParam("id") int id){
        Item item = itemBean.getItemById(id);
        if(item == null){
            return Response.status(400).build();
        }
        ItemDTO itemDTO = Mapper.toDTO(item);
        return Response.ok(itemDTO).build();
    }


}
