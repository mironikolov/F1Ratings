using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using F1Ratings.Models;
using F1Ratings.Dtos;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;

namespace F1Ratings.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private UserManager<Users> _userManager;
        private SignInManager<Users> _signInManager;
        private RoleManager<IdentityRole> _roleManager;
        private readonly ApplicationSettings _appSettings;

        public AccountController(UserManager<Users> userManager,
            SignInManager<Users> signInManager,
            RoleManager<IdentityRole> roleManager,
            IOptions<ApplicationSettings> appSettings)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _appSettings = appSettings.Value;
        }

        //POST: /api/Account/Register
        [HttpPost]
        [Route("Register")]
        public async Task<Object> PostUser( UserDto userDto )
        {
            var user = new Users() {
                UserName = userDto.UserName,
                Email = userDto.Email
            };

            try
            {
                var result = await _userManager.CreateAsync( user, userDto.Password );

                //Temp code to add admin
                //await _roleManager.CreateAsync(new IdentityRole("Admin"));

                await _userManager.AddToRoleAsync( user, "Default");

                return Ok( result );
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        //POST: /api/Account/Login
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync( loginDto.UserName );
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                return BadRequest(new { message = "Wrong username or password"});
            }

            //Get role assignet to the user
            var role = await _userManager.GetRolesAsync(user);
            IdentityOptions options = new IdentityOptions();
            if (role.Count() == 0)
            {
                await _userManager.AddToRoleAsync( user, "Default ");
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("UserId", user.Id.ToString()),
                    new Claim( options.ClaimsIdentity.RoleClaimType, role.FirstOrDefault() ),
                    new Claim("Username", user.UserName)
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(securityToken);

            return Ok( new { token } );
        }
    }
}