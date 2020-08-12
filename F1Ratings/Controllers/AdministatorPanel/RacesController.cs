using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using F1Ratings.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace F1Ratings.Controllers.AdministatorPanel
{
    [Route("api/[controller]")]
    [ApiController]
    public class RacesController : AdministratorPanelController<Races>
    {
        public RacesController(ApplicationDbContext context): base (context)
        {

        }

        public override ActionResult DeleteEntity(int id)
        {
            var result = _context.Races.Remove(new Races { Id = id });
            _context.SaveChanges();

            return Ok();
        }

        public override ActionResult EditEntity(Races entity)
        {
            var raceInDb = _context.Races.SingleOrDefault(e => e.Id == entity.Id);
            if (raceInDb == null)
            {
                return NotFound();
            }

            raceInDb.TrackId = entity.TrackId;
            raceInDb.Date = entity.Date;
            raceInDb.ExtraInfo = entity.ExtraInfo;
            _context.SaveChanges();

            return Ok(raceInDb);
        }

        public override ActionResult GetEntities()
        {
           return Ok(_context.Races.Include(r => r.Track).ThenInclude(t => t.Country).OrderByDescending(r => r.Date).ToList());
        }

        public override ActionResult PostEntity(Races entity)
        {
            if (entity.TrackId == 0)
            {
                return BadRequest("Model is invalid");
            }
            var result = _context.Races.Add(entity);
            _context.SaveChanges();

            return Ok(result.Entity.Id);
        }

        [HttpGet]
        [Route("{year}")]
        public ActionResult GetRacesByYear(int year)
        {
            return Ok(_context
                .Races
                .Include(r => r.Track)
                .Where(r => r.Date.Year == year)
                .ToList()
                .OrderBy(r => r.Date));
        }
    }
}