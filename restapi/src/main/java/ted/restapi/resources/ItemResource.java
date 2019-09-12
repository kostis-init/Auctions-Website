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
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequestScoped
@Path("items")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ItemResource {

    @Inject private ItemBean itemBean;

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

    @GET
    @Path("search")
    public Response search(
            @DefaultValue("-1")@QueryParam("category") int categoryId,
            @DefaultValue(" ")@QueryParam("text") String text){

        Set<Item> items;

        if(categoryId == -1){
            items = itemBean.search(text);
        } else {
            items = itemBean.searchByCategory(text, categoryId);
        }
        List<ItemDTO> itemsDTO = items.stream().map(Mapper::toDTO).collect(Collectors.toList());

        return Response.ok(itemsDTO).build();
    }


}
