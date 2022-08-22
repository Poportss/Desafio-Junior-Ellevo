namespace desafio.backend.Models
{
    public class LoginModel
    { 
       public string? User{ get; set; }
       public string? Password { get; set; }
        public object Id { get; internal set; }
    }
}
