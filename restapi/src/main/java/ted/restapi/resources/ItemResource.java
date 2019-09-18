package ted.restapi.resources;

import ted.restapi.beans.CategoryBean;
import ted.restapi.beans.ItemBean;
import ted.restapi.beans.SessionBean;
import ted.restapi.dto.CategoryDTO;
import ted.restapi.dto.ItemDTO;
import ted.restapi.persistence.entities.Category;
import ted.restapi.persistence.entities.Item;
import ted.restapi.persistence.entities.ItemImage;
import ted.restapi.persistence.entities.User;
import ted.restapi.util.Constants;
import ted.restapi.util.Mapper;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@RequestScoped
@Path("items")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ItemResource {

    @Inject private SessionBean sessionBean;
    @Inject private ItemBean itemBean;
    @Inject private CategoryBean categoryBean;

    private SimpleDateFormat simpleDateFormat = new SimpleDateFormat(Constants.DATE_FORMAT);

    @GET
    public Response getItemsOfCurrentUser(){
        List<ItemDTO> itemsDTO = new ArrayList<>();
        List<Item> items = itemBean.getItemsBySellerId(sessionBean.getCurrentUser().getId());
        for (Item item : items) {
            itemsDTO.add(Mapper.toDTO(item));
        }
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

    @POST
    public Response createItem(ItemDTO itemDTO) {
        User currentUser = sessionBean.getCurrentUser();
        try{
            Date startedAt = simpleDateFormat.parse(itemDTO.getStartedAt());
            Date endsAt = simpleDateFormat.parse(itemDTO.getEndsAt());
            Date curDate = new Date();

            if(startedAt.before(curDate) || endsAt.before(startedAt)){
                return Response.status(400).entity("Unacceptable date values").build();
            }

            List<Category> categories = new ArrayList<>();
            for (CategoryDTO category : itemDTO.getCategories()) {
                categories.add(categoryBean.findById(category.getId()));
            }

            Item item = new Item(itemDTO.getName(), itemDTO.getFirstBid(), itemDTO.getBuyPrice(), itemDTO.getFirstBid(),
                    0, startedAt, endsAt, itemDTO.getDescription(), itemDTO.getLatitude(), itemDTO.getLongitude(),
                    currentUser.getCity(), currentUser.getCountry(), currentUser, categories);
            String result = itemBean.createItem(item);
            if(result != null){
                return Response.status(400).entity(result).build();
            }

            for (byte[] image : itemDTO.getImages()) {
                ItemImage itemImage = new ItemImage();
                itemImage.setImage(image);
                itemImage.setItem(item);
                itemBean.createItemImage(itemImage);
            }

            return Response.ok().build();
        } catch (ParseException e){
            return Response.status(400).entity("Cannot parse date:" + e.getMessage()).build();
        }

    }

    //TODO: check update for images
    @PUT
    @Path("{id}")
    public Response editItem(ItemDTO itemDTO, @PathParam("id") int id){
        User currentUser = sessionBean.getCurrentUser();
        Item item = itemBean.getItemById(id);
        if(item == null){
            return Response.status(400).entity("Item not found").build();
        }
        if(item.getSeller().getId() != currentUser.getId()){
            return Response.status(400).entity("Cannot edit an item of another user").build();
        }
        if(item.getNumberOfBids() > 0){
            return Response.status(400).entity("Cannot edit an item that someone has made a bid").build();
        }
        try{
            Date startedAt = simpleDateFormat.parse(itemDTO.getStartedAt());
            Date endsAt = simpleDateFormat.parse(itemDTO.getEndsAt());
            Date curDate = new Date();
            if(startedAt.before(curDate) || endsAt.before(startedAt)){
                return Response.status(400).entity("Unacceptable date values").build();
            }

            List<Category> categories = new ArrayList<>();
            for (CategoryDTO category : itemDTO.getCategories()) {
                categories.add(categoryBean.findById(category.getId()));
            }

            Item newItem = new Item(itemDTO.getName(), itemDTO.getFirstBid(), itemDTO.getBuyPrice(), itemDTO.getFirstBid(),
                    0, startedAt, endsAt, itemDTO.getDescription(), itemDTO.getLatitude(), itemDTO.getLongitude(),
                    currentUser.getCity(), currentUser.getCountry(), currentUser, categories);
            newItem.setId(id);
            String result = itemBean.update(newItem);
            if(result != null){
                return Response.status(400).entity(result).build();
            }

            for (byte[] image : itemDTO.getImages()) {
                ItemImage itemImage = new ItemImage();
                itemImage.setImage(image);
                itemImage.setItem(item);
                itemBean.updateItemImage(itemImage);
            }

            return Response.ok().build();
        } catch (ParseException e){
            return Response.status(400).entity("Cannot parse date:" + e.getMessage()).build();
        }

    }

    @DELETE
    @Path("{id}")
    public Response deleteItem(@PathParam("id") int id){
        User currentUser = sessionBean.getCurrentUser();
        Item item = itemBean.getItemById(id);
        String result = itemBean.delete(currentUser, item);
        if(result != null){
            return Response.status(400).entity(result).build();
        }
        return Response.ok().build();
    }

    @POST
    @Path("{id}/buynow")
    public Response buyNow(@PathParam("id") int id){
        User currentUser = sessionBean.getCurrentUser();
        Item item = itemBean.getItemById(id);
        String result = itemBean.buyNow(currentUser, item);
        if(result != null){
            return Response.status(400).entity(result).build();
        }
        return Response.ok().build();
    }

}
