package ted.restapi.resources;

import ted.restapi.beans.CategoryBean;
import ted.restapi.dto.CategoryDTO;
import ted.restapi.dto.ItemDTO;
import ted.restapi.dto.UserDTO;
import ted.restapi.persistence.entities.Item;
import ted.restapi.persistence.entities.User;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

@RequestScoped
@Path("categories")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CategoryResource {

    @Inject private CategoryBean categoryBean;

    @GET
    public Response getAll(){
        List<CategoryDTO> list = new ArrayList<>();
        categoryBean.getAll().forEach( category -> {
            list.add(new CategoryDTO(category.getId(),
                                    category.getName(),
                                    category.getImage()));
        });

        return Response.ok(list).build();
    }

    @GET
    @Path("{id}")
    public Response getItemsByCategoryId(@PathParam("id") int id){
        List<Item> items = categoryBean.getItemsByCategoryId(id);
        List<ItemDTO> list = new ArrayList<>();
        categoryBean.getItemsByCategoryId(id).forEach( item -> {
            User seller = item.getSeller();
            UserDTO sellerDTO = new UserDTO(seller.getId(), seller.getUsername(), seller.getPassword(),
                                seller.getFirstName(), seller.getLastName(), seller.getEmail(), seller.getTelephoneNum(),
                                seller.getAfm(), seller.getBidderRating(), seller.getSellerRating(), seller.getIsAdmin(),
                                seller.getIsApproved(), seller.getAddress(), seller.getCity(), seller.getCountry());
            list.add(new ItemDTO(item.getId(), item.getName(), item.getCurrentBid(),
                                item.getBuyPrice(), item.getFirstBid(), item.getNumberOfBids(),
                                item.getStartedAt(), item.getEndsAt(), item.getDescription(),
                                item.getLatitude(), item.getLongitude(), item.getCity(),
                                item.getCountry(), sellerDTO));
        });
        return Response.ok(list).build();
    }

}
