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
    public class RaceResultsController : AdministratorPanelController<RaceResults>
    {
        public RaceResultsController( ApplicationDbContext context ): base(context)
        {

        }

        public override ActionResult DeleteEntity(int id)
        {
            var result = _context.RaceResults.Remove(new RaceResults { RaceId = id });
            _context.SaveChanges();

            return Ok();
        }

        public override ActionResult EditEntity(RaceResults entity)
        {
            var raceResultInDb = _context.RaceResults.SingleOrDefault(e => e.RaceId == entity.RaceId && e.DriverId == entity.DriverId);
            if (raceResultInDb == null)
            {
                return NotFound();
            }

            raceResultInDb.Position = entity.Position;
            _context.SaveChanges();

            return Ok(raceResultInDb);
        }

        public override ActionResult GetEntities()
        {
            return Ok(_context.RaceResults
                .Include(r => r.Race )
                .Include(r => r.Driver)
                .ToList());
        }

        public override ActionResult PostEntity(RaceResults entity)
        {
            if (entity.DriverId == 0 || entity.RaceId == 0)
            {
                return BadRequest("Model is invalid");
            }
            var result = _context.RaceResults.Add(entity);
            _context.SaveChanges();

            return Ok(result.Entity);
        }

        [HttpGet]
        [Route("{raceId}")]
        public ActionResult GetRaceResult(int raceId)
        {
            var raceResult = _context.RaceResults.Include(r => r.Driver).Where(r => r.RaceId == raceId ).OrderBy(r => r.Position);
            if (raceResult == null)
            {
                return NotFound();
            }
            return Ok(raceResult);
        }
    }
}