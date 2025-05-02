using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using HotelManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace HotelManagementAPI.Controllers
{
    [ApiController]
    [Route("api/hotel/bookingdetailscontroller")]
    public class BookingDetailsController : ControllerBase
    {
       private readonly ApplicationDBContext _dbContext;
        public BookingDetailsController(ApplicationDBContext _db)
        {
            _dbContext = _db;
        }
        [HttpGet("bookings")]
        public IActionResult GetBookings()
        {
            return Ok(_dbContext.bookingDetails);
        }

        //getting the room
        [HttpGet("get/booking/{bookingID}")]
        public IActionResult GetRoomDetail(int bookingID)
        {
            var booking = _dbContext.bookingDetails.Find(bookingID);
            if (booking == null)
            {
                return NotFound();
            }
            return Ok(booking);
        }
        //Adding new room
        [HttpPost("add/newBooking/{totalPrice}/{userID}")]
        public IActionResult AddNewBooking([FromBody] BookingDetails booking,int totalPrice,int userID)
        {
            // book.BookID = _dbContext.bookinfo.Count + 1;
            _dbContext.bookingDetails.Add(booking);
            var user=_dbContext.users.Find(userID);
            user.Amount-=totalPrice;
            _dbContext.SaveChanges();
            return Ok(booking.BookingID);
        }
        //Cancel Booking
        [HttpPut("cancel/booking/{bookingID}")]
        public IActionResult CancelBooking(int bookingID)
        {
            // book.BookID = _dbContext.bookinfo.Count + 1;
            var booking1=_dbContext.bookingDetails.Find(bookingID);
            if (booking1 == null)
            {
                return NotFound();
            }
             if (booking1.BookingStatus == ApplicationDBContext.bookingStatus[2])
            {
                return BadRequest("Room is cancelled already");
            }
            var rooms1=_dbContext.roomSelections.Where(rooms => booking1.BookingID==rooms.BookingID);        
            booking1.BookingStatus = ApplicationDBContext.bookingStatus[2];
            foreach(var roomSelect in rooms1)
            {
                roomSelect.BookingStatus=ApplicationDBContext.bookingStatus[2];
            }
            var user=_dbContext.users.FirstOrDefault(user => booking1.UserID==user.UserID);
            user.Amount+=booking1.TotalPrice;
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}