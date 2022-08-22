namespace desafio.backend.Models
{
    public class UpdateUserModel
    {
        public string Name { get; set; }
        public string User { get; set; }
        public string Password { get; set; }
        public string Cpf { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
    }
}
