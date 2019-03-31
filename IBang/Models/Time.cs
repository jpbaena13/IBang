using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace IBang.Models
{
    public class Time
    {
        public int Id { get; set; }
        public int Value { get; set; }

        [DataType(DataType.Date)]
        public DateTime ActivityDate { get; set; }

        //Foreign Key
        public int ActivityId { get; set; }
        public Activity Activity { get; set; }
    }
}
