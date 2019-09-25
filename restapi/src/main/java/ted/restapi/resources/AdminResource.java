package ted.restapi.resources;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import ted.restapi.beans.ItemBean;
import ted.restapi.beans.UserBean;
import ted.restapi.dto.ItemDTO;
import ted.restapi.dto.ItemListDTO;
import ted.restapi.dto.UserDTO;
import ted.restapi.persistence.entities.Item;
import ted.restapi.persistence.entities.User;
import ted.restapi.util.Mapper;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequestScoped
@Path("admin")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AdminResource {

    @Inject UserBean userBean;
    @Inject ItemBean itemBean;

    @GET
    @Path("users")
    public Response getUsers(){
        List<User> users = userBean.getAll();
        if(users.isEmpty()){
            return Response.ok("No users were found in database").build();
        }
        List<UserDTO> list = users.stream().map(Mapper::toDTO).collect(Collectors.toList());
        return Response.ok(list).build();
    }

    @PUT
    @Path("users")
    public Response updateIsApproved(UserDTO userDTO){
        String result = userBean.updateIsApproved(userDTO.getId(), userDTO.getIsApproved());
        if(result == null){
            return Response.ok().build();
        }else{
            return Response.status(400).entity(result).build();
        }
    }

    @DELETE
    @Path("users/{id}")
    public Response deleteUser(@PathParam("id") int id){
        String result = userBean.deleteUser(id);
        if(result == null){
            return Response.ok().build();
        }else{
            return Response.status(400).entity(result).build();
        }
    }

    @GET
    @Path("export/json")
    @Produces("text/plain")
    public Response exportJSON(){
        List<Item> items = itemBean.getAll();
        List<ItemDTO> itemsDTO = new ArrayList<>();
        for (Item item : items) {
            itemsDTO.add(Mapper.toDTO(item));
        }
        for (ItemDTO itemDTO : itemsDTO) {
            itemDTO.setImages(null);
        }

        String json = "";
        try {
            ObjectWriter writer = new ObjectMapper().writer().withDefaultPrettyPrinter();
            json = writer.writeValueAsString(itemsDTO);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return Response.ok(json).header("Content-Disposition", "attachment; filename = items.json").build();
    }

    @GET
    @Path("export/xml")
    @Produces("text/plain")
    public Response exportXML(){
        List<Item> items = itemBean.getAll();
        List<ItemDTO> itemsDTO = new ArrayList<>();
        for (Item item : items) {
            itemsDTO.add(Mapper.toDTO(item));
        }
        for (ItemDTO itemDTO : itemsDTO) {
            itemDTO.setImages(null);
        }
        ItemListDTO itemsXML = new ItemListDTO();
        itemsXML.setItems(itemsDTO);

        String xml = "";
        try {
            Marshaller jaxbMarshaller = JAXBContext.newInstance(ItemListDTO.class).createMarshaller();
            jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
            StringWriter writer = new StringWriter();
            jaxbMarshaller.marshal(itemsXML, writer);
            xml = writer.toString();
        } catch (JAXBException e) {
            e.printStackTrace();
        }

        return Response.ok(xml).header("Content-Disposition", "attachment; filename = items.xml").build();
    }


}
