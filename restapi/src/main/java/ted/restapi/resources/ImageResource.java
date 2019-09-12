package ted.restapi.resources;

import ted.restapi.beans.CategoryBean;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@RequestScoped
@Path("images")
@Produces("image/jpg")
public class ImageResource {

    @Inject private CategoryBean categoryBean;

    @GET
    @Path("categories/{id}")
    public Response categoryImage(@PathParam("id")int id){
        return Response.ok(categoryBean.getGeneralCategoryImage(id)).build();
    }

    @GET
    @Path("subcategories/{id}")
    public Response subcategoryImage(@PathParam("id")int id){
        return Response.ok(categoryBean.getCategoryImage(id)).build();
    }


}
