namespace pokeleague.Models
{
    public class Entry : IEntity
    {
         public int Id { get; set; }
         public string Name { get; set; }
         public int Wins { get; set; }
         public int Losses { get; set; }
         public int Draws { get; set; }

         public int Score {
             get {
                 return (Wins * 3) + Draws;
             }
         }
    }
}