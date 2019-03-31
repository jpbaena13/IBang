using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IBang.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public ICollection<Activity> Activities { get; set; }
    }
}
