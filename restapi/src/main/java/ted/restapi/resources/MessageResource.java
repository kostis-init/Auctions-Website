package ted.restapi.resources;

import ted.restapi.beans.MessageBean;
import ted.restapi.beans.Session;
import ted.restapi.beans.UserBean;
import ted.restapi.dto.MessageDTO;
import ted.restapi.dto.UserDTO;
import ted.restapi.persistence.entities.User;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Comparator;
import java.util.List;

@RequestScoped
@Path("messages")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class MessageResource {

    @Inject private Session session;
    @Inject private MessageBean messageBean;
    @Inject private UserBean userBean;

    @GET
    @Path("{userId}")
    public Response getChat(@PathParam("userId")int id){
        User currentUser = session.getCurrentUser();
        User otherUser = userBean.findById(id);
        if(otherUser == null){
            return Response.status(400).entity("No other user found").build();
        }
        List<MessageDTO> chat = messageBean.getChat(currentUser, otherUser);
        chat.sort(Comparator.comparingInt(MessageDTO::getId));
        return Response.ok(chat).build();
    }

    @POST
    @Path("{userId}")
    public Response sendMessage(MessageDTO messageDTO, @PathParam("userId")int id){
        User currentUser = session.getCurrentUser();
        User otherUser = userBean.findById(id);
        if(otherUser == null){
            return Response.status(400).entity("No other user found").build();
        }
        messageBean.sendMessage(currentUser, otherUser, messageDTO.getText());
        return Response.ok().build();
    }

}
