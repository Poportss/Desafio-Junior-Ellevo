using MongoDB.Bson.Serialization.Attributes;

namespace desafio.backend.Entities
{
    [BsonDiscriminator("User")]
    public class UserEntity : BaseEntity
    {
        public UserEntity(string Name, string User, string Password, string Cpf, string Phone, string Email, bool IsAdmin)
        {
            this.Name = Name;
            this.User = User;
            this.Password = Password;
            this.Cpf = Cpf;
            this.Phone = Phone;
            this.Email = Email;

        }

        [BsonElement("Name")]
        public string Name { get; set; }

        [BsonElement("User")]
        public string User { get; set; }

        [BsonElement("Password")]
        public string Password { get; set; }

        [BsonElement("Cpf")]
        public string Cpf { get; set; }

        [BsonElement("Phone")]
        public string Phone { get; set; }

        [BsonElement("Email")]
        public string Email { get; set; }
        [BsonElement("IsAdmin")]
        public bool IsAdmin { get; set; }


    }
}
