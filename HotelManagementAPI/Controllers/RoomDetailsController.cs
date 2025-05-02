using HotelManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace HotelManagementAPI.Controllers
{
    [ApiController]
    [Route("api/hotel/roomdetailscontroller")]
    public class RoomDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public RoomDetailsController(ApplicationDBContext _db)
        {
            _dbContext = _db;
        }
        [HttpGet("rooms")]
        public IActionResult GetRooms()
        {
            return Ok(_dbContext.rooms);
        }

        //getting the room
        [HttpGet("get/room/{roomID}")]
        public IActionResult GetRoomDetail(int roomID)
        {
            var room = _dbContext.rooms.Find(roomID);
            if (room == null)
            {
                return NotFound();
            }
            return Ok(room);
        }

        //Adding new room
        [HttpPost("add/newRoom")]
        public IActionResult AddNewRoom([FromBody] RoomDetails room)
        {
            // book.BookID = _dbContext.bookinfo.Count + 1;
            _dbContext.rooms.Add(room);
            _dbContext.SaveChanges();
            return Ok(room.RoomID);
        }

        // //checking if the Room already exists
        // [HttpGet("room/{roomName}")]
        // public IActionResult GetBookExist(string bookName)
        // {
        //     bool isBookValid = _dbContext.bookinfo.Any(book => book.BookName.ToLower() == bookName.ToLower());
        //     return Ok(isBookValid);
        // }

        [HttpPut("new/room/edit")]
        public IActionResult EditRoom(RoomDetails roomData)
        {
            var room = _dbContext.rooms.FirstOrDefault(room => room.RoomID == roomData.RoomID);
            if (room == null)
            {
                return NotFound();
            }
            room.RoomType = roomData.RoomType;
            room.NumberOfBeds = roomData.NumberOfBeds;
            room.PricePerDay = roomData.PricePerDay;
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("delete/{roomID}")]
        public IActionResult DeleteRoom(int roomID)
        {
            var room = _dbContext.rooms.Find(roomID);
            if (room == null)
            {
                return NotFound();
            }
            _dbContext.rooms.Remove(room);
            _dbContext.SaveChanges();
            return Ok();
        }

    }
}