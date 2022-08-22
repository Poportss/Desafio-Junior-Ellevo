using desafio.backend.Entities;
using desafio.backend.Extensions;
using desafio.backend.Infra.Contract;
using desafio.backend.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace desafio.backend.Infra
{
    public class MongoRepository<T> : IMongoRepository<T> where T : BaseEntity
    {
        private readonly IMongoCollection<T> _model;
        private readonly IConfiguration _configuration;

        public MongoRepository(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _model = database.GetCollection<T>(typeof(T).GetCollectionName());
        }
        public IQueryable<T> GetAll() => _model.AsQueryable();

        public T Get(string id) =>
            _model.Find<T>(user => user.Id == id).FirstOrDefault();

        public T Create(T user)
        {
            _model.InsertOne(user);
            return user;
        }

        public void Update(string id, T userIn) => _model.ReplaceOne(user => user.Id == id, userIn);

        public void Remove(string id)
        {
            var user = Get(id);
            _model.DeleteOne(user => user.Id == id);
        }
    }
}
