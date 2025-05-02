using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using HotelManagementAPI.Models;

namespace HotelManagementAPI.Controllers
{
    [ApiController]
    [Route("api/hotel/wishlistcontroller")]
    public class WishListController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public WishListController(ApplicationDBContext _db)
        {
            _dbContext = _db;
        }
        [HttpGet("get/available/wislists")]
        public IActionResult GetAvailableWishLists()
        {
            var availableWish = _dbContext.wishLists
                .Where(wish => !_dbContext.roomSelections
                    .Any(room => room.RoomID == wish.RoomID
                                 && room.BookingStatus != ApplicationDBContext.bookingStatus[2]
                                 && ((wish.FromDate >= room.StayingDateFrom && wish.FromDate <= room.StayingDateTo)
                                     || (wish.ToDate >= room.StayingDateFrom && wish.ToDate <= room.StayingDateTo)
                                     || (wish.FromDate <= room.StayingDateFrom && wish.ToDate >= room.StayingDateTo))))
                .ToList();

            return Ok(availableWish);
        }



        [HttpGet("get/wishlit/{userID}")]
        public IActionResult GetWishListDetail(int userID)
        {
            var userWishList = _dbContext.wishLists.Where(wishlist => wishlist.UserID == userID);
            if (userWishList == null)
            {
                return NotFound();
            }
            return Ok(userWishList);
        }
         [HttpGet("get/individualwishlit/{wishListID}")]
        public IActionResult GetIndividualWish(int wishListID)
        {
            var userWishList = _dbContext.wishLists.Find(wishListID);
            if (userWishList == null)
            {
                return NotFound();
            }
            return Ok(userWishList);
        }

        [HttpGet("get/wishlit/{userID}/{bookingID}")]
        public IActionResult GetWishListDetail(int userID, int bookingID)
        {
            var userWishList = _dbContext.bookingDetails.Where(booking => booking.BookingID == bookingID && booking.UserID == userID);
            // var list;
            if (userWishList == null)
            {
            }
            var list = _dbContext.roomSelections.Where(carts => carts.BookingID == bookingID);
            return Ok(list);
        }

        //Delete Wishlist
        [HttpDelete("delete/{wisListID}")]
        public IActionResult DeleteWishList(int wisListID)
        {
            var wisList = _dbContext.wishLists.Find(wisListID);
            if (wisList == null)
            {
                return NotFound();
            }
            _dbContext.wishLists.Remove(wisList);
            _dbContext.SaveChanges();
            return Ok();
        }
        //Add new List
        [HttpPost("add/newwishlist")]
        public IActionResult AddNewWishList([FromBody] WishList wishlist)
        {
            _dbContext.wishLists.Add(wishlist);
            _dbContext.SaveChanges();
            return Ok(wishlist.WishListID);
        }

        [HttpPut("wishlist/edit")]
        public IActionResult EditWishList([FromBody] WishList wishlistData)
        {
            var wishlist = _dbContext.wishLists.FirstOrDefault(list => list.WishListID == wishlistData.WishListID);
            if (wishlist == null)
            {
                return NotFound();
            }
            wishlist.FromDate = wishlistData.FromDate;
            wishlist.ToDate = wishlistData.ToDate;
            wishlist.PriceOfRoom=wishlistData.PriceOfRoom;
            // wishlist.BookAvailability = bookData.BookAvailability;
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}