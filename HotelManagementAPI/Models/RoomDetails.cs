using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace HotelManagementAPI.Models
{
     [Table("rooms", Schema = "public")]
    public class RoomDetails
    {
        [Key]
        public int RoomID { get; set; }
        public string RoomType { get; set; }
        public int NumberOfBeds { get; set; }
        public double PricePerDay { get; set; }
    }
}