package ted.restapi.resources;

import ted.restapi.beans.CategoryBean;
import ted.restapi.dto.CategoryDTO;
import ted.restapi.dto.ItemDTO;
import ted.restapi.dto.UserDTO;
import ted.restapi.persistence.entities.Item;
import ted.restapi.persistence.entities.User;
import ted.restapi.util.Mapper;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequestScoped
@Path("categories")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CategoryResource {

    @Inject private CategoryBean categoryBean;

    @GET
    public Response getAll(){
        List<CategoryDTO> list = categoryBean.getAll().stream().map(Mapper::toDTO).collect(Collectors.toList());
        return Response.ok(list).build();
    }

    @GET
    @Path("{id}")
    public Response getItemsByCategoryId(@PathParam("id") int id){
        List<ItemDTO> items = new ArrayList<>();
        categoryBean.getItemsByCategoryId(id).forEach( item -> items.add(Mapper.toDTO(item)));
        return Response.ok(items).build();
    }

}
