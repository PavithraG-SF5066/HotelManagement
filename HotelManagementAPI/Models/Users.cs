using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace HotelManagementAPI.Models
{
     [Table("users", Schema = "public")]
    public class Users
    {
        [Key]
        public int UserID { get; set; }
        public string Name { get; set; }
        public string UserPhoneNumber { get; set; }
        public string AadharNumber { get; set; }
        public string Address { get; set; }
        public string FoodType{get;set;}
        public string Gender{get;set;}
        public string Email { get; set; }
        public string Password { get; set; }
        public double Amount { get; set; }
    }
}