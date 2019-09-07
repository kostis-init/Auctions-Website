package ted.restapi.util;

import ted.restapi.dto.BidDTO;
import ted.restapi.dto.CategoryDTO;
import ted.restapi.dto.ItemDTO;
import ted.restapi.dto.UserDTO;
import ted.restapi.persistence.entities.Bid;
import ted.restapi.persistence.entities.Category;
import ted.restapi.persistence.entities.Item;
import ted.restapi.persistence.entities.User;

import java.util.List;
import java.util.stream.Collectors;

public class Mapper {

    public static UserDTO toDTO(User user){
        return new UserDTO(user.getId(), user.getUsername(), user.getPassword(),
                user.getFirstName(), user.getLastName(), user.getEmail(), user.getTelephoneNum(),
                user.getAfm(), user.getBidderRating(), user.getSellerRating(), user.getIsAdmin(),
                user.getIsApproved(), user.getAddress(), user.getCity(), user.getCountry());
    }

    public static ItemDTO toDTO(Item item){
        List<CategoryDTO> categories = item.getCategories().stream().map(Mapper::toDTO).collect(Collectors.toList());
        List<BidDTO> bids = item.getBids().stream().map(Mapper::toDTO).collect(Collectors.toList());
        return new ItemDTO(item.getId(), item.getName(), item.getCurrentBid(), item.getBuyPrice(),
                item.getFirstBid(), item.getNumberOfBids(), item.getStartedAt(), item.getEndsAt(),
                item.getDescription(), item.getLatitude(), item.getLongitude(), item.getCity(),
                item.getCountry(), Mapper.toDTO(item.getSeller()), categories, bids);
    }

    public static CategoryDTO toDTO(Category category) {
        return new CategoryDTO(category.getId(), category.getName(), category.getImage());
    }

    public static BidDTO toDTO(Bid bid) {
        return new BidDTO(bid.getId(), bid.getTime(), bid.getAmount(), Mapper.toDTO(bid.getBidder()));
    }
}
