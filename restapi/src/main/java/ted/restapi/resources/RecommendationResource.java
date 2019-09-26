package ted.restapi.resources;

import ted.restapi.beans.BidBean;
import ted.restapi.beans.ItemBean;
import ted.restapi.beans.SessionBean;
import ted.restapi.dto.ItemDTO;
import ted.restapi.persistence.entities.Item;
import ted.restapi.persistence.entities.User;
import ted.restapi.util.Mapper;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.*;
import java.util.stream.Collectors;

@RequestScoped
@Path("recommendations")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class RecommendationResource {

    private final static int MAX_RECOMMENDED_ITEMS = 4;

    @Inject private SessionBean sessionBean;
    @Inject private ItemBean itemBean;
    @Inject private BidBean bidBean;

    @GET
    public Response getRecommendations(){
        User currentUser = sessionBean.getCurrentUser();

        List<Item> biddenItems = itemBean.getBiddenItems(currentUser);
        if(biddenItems.isEmpty()){
            biddenItems = itemBean.getVisitedItems(currentUser);
        }

        Map<User, Integer> neighbors = new HashMap<>();
        for (Item item : biddenItems) {
            List<User> bidders = bidBean.getBidders(item);
            bidders.remove(currentUser);
            for (User bidder : bidders) {
                if(neighbors.containsKey(bidder)){
                    neighbors.put(bidder, neighbors.get(bidder) + 1);
                }
                else{
                    neighbors.put(bidder, 1);
                }
            }
        }

        //sort neighbors
        neighbors = neighbors.entrySet().stream().sorted((k1, k2) -> -k1.getValue().compareTo(k2.getValue()))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));

        List<Item> recommendedItems = new ArrayList<>();
        List<Item> ownedItems = currentUser.getItems();
        List<Item> excludedItems = new ArrayList<>();
        excludedItems.addAll(ownedItems);
        excludedItems.addAll(biddenItems);
        for(User user : neighbors.keySet()){
            if(recommendedItems.size() >= MAX_RECOMMENDED_ITEMS){
                break;
            }
            System.out.println("Checking neighbor:" + user.getUsername());
            List<Item> nomineeItems = itemBean.getBiddenActiveItems(user);
            nomineeItems.removeAll(excludedItems);
            nomineeItems.removeAll(recommendedItems);
            recommendedItems.addAll(nomineeItems);
        }

        //not enough recommended, put some top items
        int remaining = MAX_RECOMMENDED_ITEMS - recommendedItems.size();
        if(remaining > 0){
            excludedItems.addAll(recommendedItems);
            recommendedItems.addAll(itemBean.getTopItems(excludedItems, remaining));
        }

        List<ItemDTO> recommendedItemsDTO = new ArrayList<>();
        for (Item recommendedItem : recommendedItems) {
            recommendedItemsDTO.add(Mapper.toDTO(recommendedItem));
        }
        //only 1 image
        for (ItemDTO itemDTO : recommendedItemsDTO) {
            List<byte[]> images = itemDTO.getImages();
            if(!images.isEmpty()){
                byte[] image = images.get(0);
                images.clear();
                images.add(image);
            }
            itemDTO.setImages(images);
        }

        return Response.ok(recommendedItemsDTO).build();
    }


    @GET
    @Path("top")
    public Response getTopRec(){
        List<Item> recommendedItems = itemBean.getTopItems(new ArrayList<>(), MAX_RECOMMENDED_ITEMS);
        List<ItemDTO> recommendedItemsDTO = new ArrayList<>();
        for (Item recommendedItem : recommendedItems) {
            recommendedItemsDTO.add(Mapper.toDTO(recommendedItem));
        }
        //only 1 image
        for (ItemDTO itemDTO : recommendedItemsDTO) {
            List<byte[]> images = itemDTO.getImages();
            if(!images.isEmpty()){
                byte[] image = images.get(0);
                images.clear();
                images.add(image);
            }
            itemDTO.setImages(images);
        }

        return Response.ok(recommendedItemsDTO).build();
    }

}
