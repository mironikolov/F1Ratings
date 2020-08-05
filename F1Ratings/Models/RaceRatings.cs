using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace F1Ratings.Models
{
    public class RaceRatings
    {
        [Required]
        public int RaceId { get; set; }
        public Races Race { get; set; }

        [Required]
        public int RatingId { get; set; }
        public Ratings Rating { get; set; }
    }
}
