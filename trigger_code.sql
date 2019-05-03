DELIMITER //
DROP TRIGGER IF EXISTS add_book_trigger;
CREATE TRIGGER add_book_trigger after INSERT on book
for each row begin
	declare number INT;
	select count(*) into number from book where bookname=new.bookname;
	if number=0 then
		update book_sum_stock set stock=1 where bookname=new.bookname;
		update book_sum_stock set sum=1 where bookname=new.bookname;
	else
		update book_sum_stock set stock=stock+1 where bookname=new.bookname;
		update book_sum_stock set sum=sum+1 where bookname=new.bookname;
	end if;
end;//
DELIMITER ;



DELIMITER //
DROP TRIGGER IF EXISTS borrow_trigger;
CREATE TRIGGER borrow_trigger after INSERT on borrow
for each row begin
	declare bkname varchar(30);
	select bookname into bkname from book where bno = new.book_id;
	update book_sum_stock set stock=stock-1 where bookname=bkname;
end;//
DELIMITER ;

DELIMITER //
DROP TRIGGER IF EXISTS return_trigger;
CREATE TRIGGER return_trigger after delete on borrow
for each row begin
	declare bkname varchar(30);
	select bookname into bkname from book where bno = old.book_id;
	update book_sum_stock set stock=stock+1 where bookname=bkname;
end;//
DELIMITER ;
