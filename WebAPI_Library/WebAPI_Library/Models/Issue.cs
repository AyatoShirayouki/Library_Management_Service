using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI_Library.Models
{
    public class Issue
    {
        public int Book_Issue_Id { get; set; }
        public string Client_First_Name { get; set; }
        public string Client_Last_Name { get; set; }
        public int Book_Id { get; set; }
        public string Issue_Date { get; set; }
        public string Due_Date { get; set; }
    }
}
