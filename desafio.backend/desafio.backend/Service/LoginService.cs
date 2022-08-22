using AutoMapper;
using desafio.backend.Entities;
using desafio.backend.Infra.Contract;
using desafio.backend.Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace desafio.backend.Service
{
    public class LoginService
    {
        private readonly IMapper _mapper;

        private readonly IUserRepository _login;

        public LoginService(IUserRepository login, IMapper mapper)
        {
            _mapper = mapper;
            _login = login;

        }
        public string Login(LoginModel userLogin)
        {
           var userEntity = _login.GetByUserName(userLogin.User);

            if (userEntity.User == userLogin.User && userEntity.Password == userLogin.Password)
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var claims = new List<Claim>
                {
                    new Claim("UserId", userEntity.Id)
                };

                var tokeOptions = new JwtSecurityToken(
                    issuer: "https://localhost:5001",
                    audience: "https://localhost:5001",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signinCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

                return tokenString;
            }
            return null;
        }
    }
}
