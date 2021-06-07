Create Database Library

Create Table Authors(
	Author_Id int identity(1, 1) primary key not null,
	Author_First_Name nvarchar(20) not null,
	Author_Last_Name nvarchar(20) not null,
	Author_Alias nvarchar(20),
)

insert into Authors(Author_First_Name, Author_Last_Name, Author_Alias)
values('Stephen', 'King', 'The horror master')

select * from Authors

Create Table Books(
	Book_Id int identity(1, 1) primary key not null,
	Book_Title nvarchar(30) not null,
	Author_Id Int not null foreign key references Authors ON DELETE CASCADE,
	Pages int not null,
	Publisher nvarchar(30) not null,
	Publish_Date date not null,
	Language nvarchar(30) not null,
	Book_Description nvarchar(300),
	Photo_File_Name nvarchar(500)
)

insert into Books(Book_Title, Author_id, Pages, Publisher, 
Publish_Date, Language, Book_Description, Photo_File_Name)
values('IT',1, 200, 'Books OOD', '2018-10-20', 'English', 
'Crazy killer clown eats kids', 'anonymous.png')

select * from Books

Create Table Issues(
	Book_Issue_Id int identity(1, 1) primary key not null,
	Client_First_Name nvarchar(20) not null,
	Client_Last_Name nvarchar(20) not null,
	Book_Id Int not null foreign key references Books ON DELETE CASCADE,
	Issue_Date date not null,
	Due_Date date not null
)

insert into Issues(Client_First_Name, Client_Last_Name, Book_Id, Issue_Date, Due_Date)
values('Alexander', 'Kuzmov', 1, '2018-10-20', '2018-11-20')

select * from Issues

select Book_Id, Book_Title, Author_First_Name, Author_Last_Name, Author_Alias, Pages, Publisher, Publish_Date, Language, Book_Description from Books Join Authors on Books.Author_Id = Authors.Author_Id

select Book_Issue_Id, Book_Title, Client_First_Name, Client_Last_Name, Issue_Date, Due_Date from Issues join Books on Issues.Book_Id = Books.Book_Id