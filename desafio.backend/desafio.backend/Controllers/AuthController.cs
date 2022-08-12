
using desafio.backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace desafio.backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
       

        private readonly IConfiguration _configuration;
        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IConfiguration Get_configuration()
        {
            return _configuration;
        }
       

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel user)
        {
            var connect = _configuration.GetConnectionString("CustomerCon");
            MongoClient dbClient = new MongoClient(connect);

            var filter = Builders<LoginModel>.Filter.Eq("User", user.User);

            
           
            var search = dbClient.GetDatabase("portscodeBd").GetCollection<LoginModel>("Customers").Find(filter).Project(p => new LoginModel { User = p.User, Password = p.Password}).Limit(1).Single();
        
            if (search is null)
            {
                return BadRequest("Invalid client request");
            }

            if (user.User == search.User && user.Password == search.Password)
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.User),
                    new Claim(ClaimTypes.Role, "Manager")
                };

                var tokeOptions = new JwtSecurityToken(
                    issuer: "https://localhost:5001",
                    audience: "https://localhost:5001",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signinCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

                return Ok(new { Token = tokenString });
            }

            return Unauthorized();
        }
    }
}
