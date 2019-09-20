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
@Path("freeitems")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class FreeItemResource {

    @Inject private ItemBean itemBean;

    @GET
    @Path("{id}")
    public Response getItemById(@PathParam("id") int id){
        Item item = itemBean.getItemById(id);
        if(item == null){
            return Response.status(400).entity("No item with this id").build();
        }
        ItemDTO itemDTO = Mapper.toDTO(item);
        return Response.ok(itemDTO).build();
    }

    @GET
    @Path("search")
    public Response search(
            @DefaultValue("-1")@QueryParam("category") int generalCategoryId,
            @DefaultValue("-1")@QueryParam("subcategory") int categoryId,
            @DefaultValue(" ")@QueryParam("text") String text){
        Set<Item> items;
        if(categoryId == -1 && generalCategoryId == -1){
            items = itemBean.search(text);
        } else if (generalCategoryId == -1){
            items = itemBean.searchByCategory(text, categoryId);
        } else if (categoryId == -1){
            items = itemBean.searchByGeneralCategory(text, generalCategoryId);
        } else {
            return Response.status(400).entity("Wrong query parameters").build();
        }
        if(items.isEmpty()){
            return Response.ok(items).build();
        }
        List<ItemDTO> itemsDTO = items.stream().map(Mapper::toDTO).collect(Collectors.toList());
        //only 1 image
        for (ItemDTO itemDTO : itemsDTO) {
            List<byte[]> images = itemDTO.getImages();
            if(!images.isEmpty()){
                byte[] image = images.get(0);
                images.clear();
                images.add(image);
            }
            itemDTO.setImages(images);
        }
        return Response.ok(itemsDTO).build();
    }

}
