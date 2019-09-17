package ted.restapi.resources;

import ted.restapi.beans.CategoryBean;
import ted.restapi.dto.CategoryDTO;
import ted.restapi.dto.GeneralCategoryDTO;
import ted.restapi.persistence.entities.Category;
import ted.restapi.persistence.entities.GeneralCategory;
import ted.restapi.util.Mapper;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.stream.Collectors;

@RequestScoped
@Path("images")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ImageResource {

    @Inject private CategoryBean categoryBean;

    @GET
    @Path("categories")
    public Response categories(){
        List<GeneralCategoryDTO> list = categoryBean.getGeneralCategories().stream()
                .map(Mapper::toDTO).collect(Collectors.toList());
        return Response.ok(list).build();
    }

    @GET
    @Path("subcategories")
    public Response subcategories(){
        List<CategoryDTO> list = categoryBean.getCategories().stream()
                .map(Mapper::toDTO).collect(Collectors.toList());
        return Response.ok(list).build();
    }

}
