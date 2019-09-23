package ted.restapi.util;

import ted.restapi.dto.*;
import ted.restapi.persistence.entities.*;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Mapper {

    public static UserDTO toDTO(User user){
        Double bidderRating = 0.0;
        Double sellerRating = 0.0;
        if(user.getBidderRatings() > 0){
            bidderRating = user.getBidderRatingSum() / user.getBidderRatings();
        }
        if(user.getSellerRatings() > 0){
            sellerRating = user.getSellerRatingSum() / user.getSellerRatings();
        }
        return new UserDTO(user.getId(), user.getUsername(), user.getPassword(),
                user.getFirstName(), user.getLastName(), user.getEmail(), user.getTelephoneNum(),
                user.getAfm(), bidderRating, sellerRating, user.getIsAdmin(),
                user.getIsApproved(), user.getAddress(), user.getCity(), user.getCountry());
    }

    private static UserDTO toDTOtruncated(User user) {
        Double bidderRating = 0.0;
        Double sellerRating = 0.0;
        if(user.getBidderRatings() > 0){
            bidderRating = user.getBidderRatingSum() / user.getBidderRatings();
        }
        if(user.getSellerRatings() > 0){
            sellerRating = user.getSellerRatingSum() / user.getSellerRatings();
        }
        return new UserDTO(user.getId(), user.getUsername(), bidderRating, sellerRating, user.getAddress(), user.getCity(), user.getCountry());
    }

    public static ItemDTO toDTO(Item item){
        List<CategoryDTO> categories = item.getCategories().stream().map(Mapper::toDTONoImage).collect(Collectors.toList());
        List<BidDTO> bids = item.getBids().stream().map(Mapper::toDTOtruncated).collect(Collectors.toList());
        List<byte[]> images = new ArrayList<>();
        for (ItemImage image : item.getImages()) {
            images.add(image.getImage());
        }
        String startedAt = null;
        if(item.getStartedAt() != null){
            startedAt = new SimpleDateFormat(Constants.DATE_FORMAT).format(item.getStartedAt());
        }
        String endsAt = null;
        if(item.getEndsAt() != null) {
            endsAt = new SimpleDateFormat(Constants.DATE_FORMAT).format(item.getEndsAt());
        }
        User seller = item.getSeller();
        return new ItemDTO(item.getId(), item.getName(), item.getCurrentBid(), item.getBuyPrice(),
                item.getFirstBid(), item.getNumberOfBids(), startedAt, endsAt,
                item.getDescription(), seller.getLatitude(), seller.getLongitude(), seller.getCity(),
                seller.getCountry(), Mapper.toDTOtruncated(seller), categories, bids, images, item.getState());
    }

    public static CategoryDTO toDTO(Category category) {
        return new CategoryDTO(category.getId(), category.getName(), category.getImage());
    }

    public static CategoryDTO toDTONoImage(Category category) {
        return new CategoryDTO(category.getId(), category.getName());
    }

    public static BidDTO toDTO(Bid bid) {
        String time = null;
        if(bid.getTime() != null){
            time = new SimpleDateFormat(Constants.DATE_FORMAT).format(bid.getTime());
        }
        return new BidDTO(bid.getId(), time, bid.getAmount(), Mapper.toDTO(bid.getBidder()));
    }

    public static BidDTO toDTOtruncated(Bid bid) {
        String time = null;
        if(bid.getTime() != null){
            time = new SimpleDateFormat(Constants.DATE_FORMAT).format(bid.getTime());
        }
        return new BidDTO(bid.getId(), time, bid.getAmount(), Mapper.toDTOtruncated(bid.getBidder()));
    }

    public static GeneralCategoryDTO toDTO(GeneralCategory generalCategory) {
        return new GeneralCategoryDTO(generalCategory.getId(), generalCategory.getName(), generalCategory.getImage());
    }

    public static GeneralCategoryDTO toDTONoImage(GeneralCategory generalCategory) {
        return new GeneralCategoryDTO(generalCategory.getId(), generalCategory.getName());
    }
}
