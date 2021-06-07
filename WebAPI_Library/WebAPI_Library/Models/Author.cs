using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI_Library.Models
{
    public class Author
    {
        public int Author_Id { get; set; }
        public string Author_First_Name { get; set; }
        public string Author_Last_Name { get; set; }
        public string Author_Alias { get; set; }
    }
}
