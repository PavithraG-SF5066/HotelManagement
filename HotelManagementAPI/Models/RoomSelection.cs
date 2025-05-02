using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace HotelManagementAPI.Models
{
     [Table("roomselections", Schema = "public")]
    public class RoomSelection
    {
        [Key]
        public int SelectionID { get; set; }
        public int WishListID { get; set; }
        public int BookingID { get; set; }
        public int RoomID { get; set; }
        public DateTime StayingDateFrom { get; set; }
        public DateTime StayingDateTo { get; set; }
        public double Price { get; set; }
        public int NumberOfDays { get; set; }
        public string BookingStatus { get; set; }
    }
}