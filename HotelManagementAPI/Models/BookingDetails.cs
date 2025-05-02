using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace HotelManagementAPI.Models
{
     [Table("bookings", Schema = "public")]
    public class BookingDetails
    {
        [Key]
        public int BookingID { get; set; }
        public int UserID { get; set; }
        public double TotalPrice { get; set; }
        public DateTime DateOfBooking { get; set; }
        public string BookingStatus { get; set; }
    }
}