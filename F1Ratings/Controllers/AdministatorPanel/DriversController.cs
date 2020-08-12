using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using F1Ratings.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace F1Ratings.Controllers.AdministatorPanel
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriversController : AdministratorPanelController<Drivers>
    {
        public DriversController(ApplicationDbContext context) : base(context)
        {

        }

        public override ActionResult DeleteEntity(int id)
        {
            var result = _context.Drivers.Remove(new Drivers { Id = id });
            _context.SaveChanges();

            return Ok();
        }

        public override ActionResult EditEntity(Drivers entity)
        {
            var driverInDb = _context.Drivers.SingleOrDefault(e => e.Id == entity.Id);
            if (driverInDb == null)
            {
                return NotFound();
            }

            driverInDb.FirstName = entity.FirstName;
            driverInDb.Surname = entity.Surname;
            driverInDb.LastName = entity.LastName;
            driverInDb.Wins = entity.Wins;
            driverInDb.Podiums = entity.Podiums;
            driverInDb.Starts = entity.Starts;
            driverInDb.Debut = entity.Debut;
            driverInDb.Retired = entity.Retired;

            _context.SaveChanges();

            return Ok(driverInDb);
        }

        public override ActionResult GetEntities()
        {
            return Ok(_context.Drivers.OrderByDescending(d => d.Debut).ToList());
        }

        public override ActionResult PostEntity(Drivers entity)
        {
            var result = _context.Drivers.Add(entity);
            _context.SaveChanges();

            return Ok(result.Entity.Id);
        }

        [HttpGet]
        [Route("{year}")]
        public ActionResult GetDriversByYear( int year )
        {
            return Ok(_context
                .Drivers
                .Where(d => d.Debut.Value.Year <= year && (d.Retired == null ? true : d.Retired.Value.Year >= year) )
                .ToList());
        }
    }
}