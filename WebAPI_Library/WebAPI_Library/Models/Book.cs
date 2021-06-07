using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI_Library.Models
{
    public class Book
    {
        public int Book_Id { get; set; }
        public string Book_Title { get; set; }
        public int Author_Id { get; set; }
        public int Pages { get; set; }
        public string Publisher { get; set; }
        public string Publish_Date { get; set; }
        public string Language { get; set; }
        public string Book_Description { get; set; }
        public string Photo_File_Name { get; set; }
    }
}
