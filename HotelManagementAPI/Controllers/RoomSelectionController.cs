using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotelManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace HotelManagementAPI.Controllers
{
    [ApiController]
    [Route("api/hotel/roomselectioncontroller")]
    public class RoomSelectionController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public RoomSelectionController(ApplicationDBContext _db)
        {
            _dbContext = _db;
        }
        [HttpGet("roomselection")]
        public IActionResult GetRoomSelections()
        {
            return Ok(_dbContext.roomSelections);
        }

        //getting the room
        [HttpGet("get/roomSelection/{roomSelectionID}")]
        public IActionResult GetRoomSelectionsDetail(int selectionID)
        {
            var booking = _dbContext.roomSelections.Find(selectionID);
            if (booking == null)
            {
                return NotFound();
            }
            return Ok(booking);
        }
         //Adding new roomSelection
        [HttpPost("add/roomSelection")]
        public IActionResult AddNewRoomSelection([FromBody] RoomSelection roomSelect)
        {
            // book.BookID = _dbContext.bookinfo.Count + 1;
            _dbContext.roomSelections.Add(roomSelect);
            _dbContext.SaveChanges();
            return Ok(roomSelect.SelectionID);
        }
    }
}