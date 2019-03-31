using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IBang.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public string Title { get; set; }

        //Foreign Key
        public int UserId { get; set; }
        public User User { get; set; }

        public ICollection<Time> Times { get; set; }
    }
}
