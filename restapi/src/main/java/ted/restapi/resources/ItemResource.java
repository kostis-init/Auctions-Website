package ted.restapi.resources;

import ted.restapi.beans.CategoryBean;
import ted.restapi.beans.ItemBean;
import ted.restapi.beans.Session;
import ted.restapi.dto.CategoryDTO;
import ted.restapi.dto.ItemDTO;
import ted.restapi.persistence.entities.Category;
import ted.restapi.persistence.entities.Item;
import ted.restapi.util.Constants;
import ted.restapi.util.Mapper;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequestScoped
@Path("items")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ItemResource {
@PersistenceContext
private EntityManager em;

    @Inject private Session session;
    @Inject private ItemBean itemBean;
    @Inject private CategoryBean categoryBean;

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
        List<ItemDTO> itemsDTO = items.stream().map(Mapper::toDTO).collect(Collectors.toList());
        return Response.ok(itemsDTO).build();
    }

    @POST
    public Response createItem(ItemDTO itemDTO) {
        try{
            Date startedAt = new SimpleDateFormat(Constants.DATE_FORMAT).parse(itemDTO.getStartedAt());
            Date endsAt = new SimpleDateFormat(Constants.DATE_FORMAT).parse(itemDTO.getEndsAt());
            List<Category> categories = new ArrayList<>();
            for (CategoryDTO category : itemDTO.getCategories()) {
                categories.add(categoryBean.findById(category.getId()));
            }
            Item item = new Item(itemDTO.getName(),itemDTO.getFirstBid(),itemDTO.getBuyPrice(),itemDTO.getFirstBid(),
                    0, startedAt,endsAt,itemDTO.getDescription(),itemDTO.getLatitude(), itemDTO.getLongitude(),
                    itemDTO.getCity(),itemDTO.getCountry(),session.getCurrentUser(),categories);
            itemBean.createItem(item);
            return Response.ok().build();
        } catch (ParseException e){
            return Response.status(400).entity("Cannot parse date:" + e.getMessage()).build();
        }

    }

}
