using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using IBang.Models;

namespace IBang.Models
{
    public class IBangContext : DbContext
    {
        public IBangContext (DbContextOptions<IBangContext> options)
            : base(options)
        {
        }

        public DbSet<IBang.Models.User> User { get; set; }

        public DbSet<IBang.Models.Activity> Activity { get; set; }

        public DbSet<IBang.Models.Time> Time { get; set; }
    }
}
