using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using F1Ratings.Models;

namespace F1Ratings.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class CountriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CountriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [Route("New")]
        [HttpPost]
        public ActionResult PostCountry(Countries country)
        {
            var exists = _context.Countries.SingleOrDefault(c => c.Name == country.Name);
            if (exists != null)
            {
                return BadRequest("Country is already added");
            }
            var result = _context.Countries.Add(country);
            _context.SaveChanges();

            return Ok(result.Entity.Id);
        }

        [Route("All")]
        [HttpGet]
        public List<Countries> GetCountries()
        {
            var countiesList = _context.Countries.OrderBy(c => c.Name).ToList();

            return countiesList;
        }

        [Route("Delete/{id}")]
        [HttpDelete]
        public ActionResult DeleteCountry(int id)
        {
            var result = _context.Countries.Remove(new Countries { Id = id });
            _context.SaveChanges();

            return Ok();
        }

        [Route("Edit")]
        [HttpPut]
        public ActionResult EditCountry(Countries country)
        {
            var countryInDb = _context.Countries.SingleOrDefault(c => c.Id == country.Id);
            if (countryInDb == null)
            {
                return NotFound();
            }

            countryInDb.Name = country.Name;
            _context.SaveChanges();
            return Ok(countryInDb);
        }
    }
}