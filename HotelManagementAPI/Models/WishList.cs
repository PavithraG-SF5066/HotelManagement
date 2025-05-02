using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace HotelManagementAPI.Models
{
     [Table("wishList", Schema = "public")]
    public class WishList
    {
        [Key]
        public int WishListID { get; set; }
        public int UserID { get; set; }
        public int RoomID { get; set; }
        public double PriceOfRoom { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
    }
}