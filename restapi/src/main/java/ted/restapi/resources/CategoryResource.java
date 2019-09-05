package ted.restapi.resources;

import ted.restapi.beans.CategoryBean;
import ted.restapi.persistence.entities.Category;
import ted.restapi.persistence.entities.Item;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@RequestScoped
@Path("categories")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CategoryResource {

    @Inject private CategoryBean categoryBean;

    @GET
    public Response getAll(){
        JsonArrayBuilder list = Json.createArrayBuilder();
        categoryBean.getAll().stream().map(Category::toJson).forEach(list::add);
        return Response.ok(list).build();
    }


}
