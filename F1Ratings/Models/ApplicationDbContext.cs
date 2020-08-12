using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace F1Ratings.Models
{
    public class ApplicationDbContext : IdentityDbContext<Users>
    {
        public DbSet<Countries> Countries { get; set; }

        public DbSet<Drivers> Drivers{ get; set; }

        public DbSet<RaceResults> RaceResults { get; set; }

        public DbSet<RaceRatings> RaceRatings { get; set; }

        public DbSet<Races> Races { get; set; }

        public DbSet<Ratings> Ratings { get; set; }

        public DbSet<Tracks> Tracks { get; set; }

        public ApplicationDbContext()
        {

        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating( modelBuilder );
            modelBuilder.Entity<RaceResults>().HasKey(rd => new { rd.DriverId, rd.RaceId });
            modelBuilder.Entity<RaceRatings>().HasKey(rr => new { rr.RaceId, rr.RatingId });
        }
    }
}
