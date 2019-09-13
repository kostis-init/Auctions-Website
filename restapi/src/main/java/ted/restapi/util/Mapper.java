package ted.restapi.util;

import ted.restapi.dto.*;
import ted.restapi.persistence.entities.*;

import java.text.SimpleDateFormat;
import java.util.Date;
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
        List<CategoryDTO> categories = item.getCategories().stream().map(Mapper::toDTONoImage).collect(Collectors.toList());
        List<BidDTO> bids = item.getBids().stream().map(Mapper::toDTO).collect(Collectors.toList());
        String startedAt = null;
        if(item.getStartedAt() != null){
            startedAt = new SimpleDateFormat(Constants.DATE_FORMAT).format(item.getStartedAt());
        }
        String endsAt = null;
        if(item.getEndsAt() != null) {
            endsAt = new SimpleDateFormat(Constants.DATE_FORMAT).format(item.getEndsAt());
        }
        return new ItemDTO(item.getId(), item.getName(), item.getCurrentBid(), item.getBuyPrice(),
                item.getFirstBid(), item.getNumberOfBids(), startedAt, endsAt,
                item.getDescription(), item.getLatitude(), item.getLongitude(), item.getCity(),
                item.getCountry(), Mapper.toDTO(item.getSeller()), categories, bids);
    }

    public static CategoryDTO toDTO(Category category) {
        return new CategoryDTO(category.getId(), category.getName(), category.getImage());
    }

    public static CategoryDTO toDTONoImage(Category category) {
        return new CategoryDTO(category.getId(), category.getName());
    }

    public static BidDTO toDTO(Bid bid) {
        return new BidDTO(bid.getId(), bid.getTime(), bid.getAmount(), Mapper.toDTO(bid.getBidder()));
    }

    public static GeneralCategoryDTO toDTO(GeneralCategory generalCategory) {
        return new GeneralCategoryDTO(generalCategory.getId(), generalCategory.getName(), generalCategory.getImage());
    }

    public static GeneralCategoryDTO toDTONoImage(GeneralCategory generalCategory) {
        return new GeneralCategoryDTO(generalCategory.getId(), generalCategory.getName());
    }
}
