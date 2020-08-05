using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using F1Ratings.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace F1Ratings.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private UserManager<Users> _userManager;

        public UserProfileController(UserManager<Users> userManager)
        {
            _userManager = userManager;
        }

        //GET: api/UserProfile
        [HttpGet]
        [Route("Details")]
        [Authorize]
        public async Task<object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value;
            var user = await _userManager.FindByIdAsync( userId );
            return Ok( new
            {
                user.UserName,
                user.Email
            });
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        [Route("ForAdmin")]
        public string GetForAdmin()
        {
            return "Web method for admin";
        }

    }
}