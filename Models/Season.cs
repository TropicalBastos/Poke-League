using System;

namespace pokeleague.Models
{
    public class Season : IEntity
    {
         public int Id { get; set; }
         public DateTime SeasonStart { get; set; }
         public DateTime SeasonEnd { get; set; }
         public string Winner { get; set; }
    }
}