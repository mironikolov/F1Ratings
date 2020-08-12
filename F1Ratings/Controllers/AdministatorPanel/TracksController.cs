using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using F1Ratings.Models;
using Microsoft.EntityFrameworkCore;

namespace F1Ratings.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TracksController : AdministratorPanelController<Tracks>
    {
        public TracksController(ApplicationDbContext context) : base(context)
        {
            
        }

        public override ActionResult GetEntities()
        {
            return Ok(_context.Tracks.Include(t => t.Country).ToList());
        }

        public override ActionResult PostEntity(Tracks track)
        {
            if ( track.CountryId == 0 )
            {
                return BadRequest("Model is invalid");
            }
            var result = _context.Tracks.Add(track);
            _context.SaveChanges();

            return Ok(result.Entity.Id);
        }

        public override ActionResult DeleteEntity(int id)
        {
            var result = _context.Tracks.Remove(new Tracks { Id = id });
            _context.SaveChanges();

            return Ok();
        }

        public override ActionResult EditEntity(Tracks entity)
        {
            var trackInDb = _context.Tracks.SingleOrDefault(e => e.Id == entity.Id);
            if (trackInDb == null)
            {
                return NotFound();
            }

            trackInDb.Name = entity.Name;
            trackInDb.CountryId = entity.CountryId;
            _context.SaveChanges();

            return Ok(trackInDb);
        }
    }
}