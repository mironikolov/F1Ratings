using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace F1Ratings.Models
{
    public class RaceDrivers
    {
        [Required]
        public int RaceId { get; set; }
        public Races Race { get; set; }

        [Required]
        public int DriverId { get; set; }
        public Drivers Driver { get; set; }
    }
}
