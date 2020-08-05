using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace F1Ratings.Models
{
    public class Ratings
    {
        public int Id { get; set; }

        [Required]
        public int Rating { get; set; }

        [Required]
        public int UserId { get; set; }
        public Users User { get; set; }
    }
}
