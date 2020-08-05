using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace F1Ratings.Models
{
    public class Countries
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
