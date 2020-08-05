using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace F1Ratings.Models
{
    public class Drivers
    {
        public int Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        public string Surname { get; set; }

        [Required]
        public string LastName { get; set; }

        public int Wins { get; set; }

        public int Podiums { get; set; }

        public int Starts { get; set; }

        public DateTime Debut { get; set; }

        public DateTime Retired { get; set; }

    }
}
