using MongoDB.Bson.Serialization.Attributes;

namespace desafio.backend.Entities
{
    public class UserEntity : BaseEntity
    {
        public UserEntity(string name, string user, string password, string cpf, string phone, string email)
        {
            Name = name;
            User = user;
            Password = password;
            Cpf = cpf;
            Phone = phone;
            Email = email;
            
        }

        [BsonElement("name")]
        public string Name { get; private set; }

        [BsonElement("user")]
        public string User { get; private set; }

        [BsonElement("password")]
        public string Password { get; private set; }

        [BsonElement("cpf")]
        public string Cpf { get; private set; }

        [BsonElement("phone")]
        public string Phone { get; private set; }

        [BsonElement("email")]
        public string Email { get; private set; }
    }
}
