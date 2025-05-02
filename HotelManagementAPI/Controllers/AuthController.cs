using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using HotelManagementAPI.Models;

namespace HotelManagementAPI.Controllers
{
    [ApiController]
    [Route("api/hotel/auth")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public AuthController(ApplicationDBContext _db)
        {
            _dbContext = _db;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Login model)
        {
            var user =  _dbContext.users.FirstOrDefault(user => user.Email == model.Email.ToLower() && user.Password == model.Password);

            // Validate user credentials
            if (user != null)
            {
                var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Role, "Admin"),
                new Claim(ClaimTypes.Email, user.Email),
            };

                var identity = new ClaimsIdentity(claims, "MyCookieAuth");
                var principal = new ClaimsPrincipal(identity);

                await HttpContext.SignInAsync("MyCookieAuth", principal);

                return Ok(new { success = true });
            }

            return Unauthorized();
        }

        [HttpGet("me")]
        [Authorize]
        public IActionResult GetMe()
        {
            var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            var name = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;
            return Ok(new { email, name, success = true });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync("MyCookieAuth");
            return Ok();
        }
    }
}