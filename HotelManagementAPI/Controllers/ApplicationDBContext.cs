using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using HotelManagementAPI.Models;

namespace HotelManagementAPI.Controllers
{
    public class ApplicationDBContext: DbContext
    {
        public static List<string> foodType = new List<string>() { "Veg", "Non-Veg" };
        public static List<string> gender = new List<string>() { "Male", "Female","Others" };
        public static List<string> roomType = new List<string>() { "Standard", "Delux","Suit"};
        public static List<string> bookingStatus = new List<string>() { "Initiated", "Booked","Cancelled"};
       public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }
        //Application data
        public DbSet<Users> users { get; set; } 
        public DbSet<BookingDetails> bookingDetails { get; set; }
        public DbSet<RoomDetails> rooms { get; set; }
        public DbSet<RoomSelection> roomSelections { get; set; }
        public DbSet<WishList> wishLists { get; set; }

    }
}