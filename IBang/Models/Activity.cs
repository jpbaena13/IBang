using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace IBang.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public ICollection<Time> Times { get; set; }
    }
}
