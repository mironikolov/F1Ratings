using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace F1Ratings.Models
{
    public class Races
    {
        public int Id { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public string ExtraInfo { get; set; }

        [Required]
        public int TrackId { get; set; }
        public Tracks Track { get; set; }

    }
}
