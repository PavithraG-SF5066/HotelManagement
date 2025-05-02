using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HotelManagementAPI.Models;

namespace HotelManagementAPI.Controllers
{
    [ApiController]
    [Route("api/hotel/usersController")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public UsersController(ApplicationDBContext _db)
        {
            _dbContext = _db;
        }
        //getting the sign in user
        [HttpGet("{email}")]
        public IActionResult GetUser(string email)
        {
            var user = _dbContext.users.FirstOrDefault(user => user.Email == email.ToLower());
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        //adding new user
        [HttpPost("newUser/{user}")]
        public IActionResult AddNewUser([FromBody] Users user)
        {
            // Generate a unique customer ID by incrementing an auto-incrementing ID
            // customer.CustomerID = ApplicationDBContext.customers.Count + 1;
            _dbContext.users.Add(user);
            _dbContext.SaveChanges();
            return Ok(user.UserID); // Return the added customer to confirm
        }

        [HttpPut("recharge/{userID}/{amount}")]
        public IActionResult RechargeWalletBalance(int userID, double amount)
        {
            var user = _dbContext.users.Find(userID);
            if (user == null)
            {
                return NotFound();
            }
            user.Amount += amount;
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}