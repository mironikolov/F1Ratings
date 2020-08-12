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
    public abstract class AdministratorPanelController<T> : ControllerBase
    {
        protected readonly ApplicationDbContext _context;

        public AdministratorPanelController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Post request on /Controller/New to create new entity
        /// </summary>
        /// <param name="entity">Entity object</param>
        /// <returns> ActionResult </returns>
        [Route("New")]
        [HttpPost]
        public abstract ActionResult PostEntity(T entity);

        /// <summary>
        /// Get request on /controller/All for all recors
        /// </summary>
        /// <returns>List of recors</returns>
        [Route("All")]
        [HttpGet]
        public abstract ActionResult GetEntities();

        /// <summary>
        /// Delete request on /Controller/Delete/{id}
        /// </summary>
        /// <param name="id">Record Id</param>
        /// <returns></returns>
        [Route("Delete/{id}")]
        [HttpDelete]
        public abstract ActionResult DeleteEntity(int id);

        /// <summary>
        /// Put request (edit record) on /Controller/Edit
        /// </summary>
        /// <param name="entity">New data</param>
        /// <returns> ActionResul </returns>
        [Route("Edit")]
        [HttpPut]
        public abstract ActionResult EditEntity(T entity);
    }
}