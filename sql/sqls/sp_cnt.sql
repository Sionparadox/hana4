drop procedure if exists sp_cnt;

delimiter $$

create procedure sp_cnt(_table varchar(31))
begin
    SET @sql = CONCAT('select count(*) cnt from ', _table);
    
    PREPARE myQuery from @sql;
    EXECUTE myQuery;
    
    DEALLOCATE PREPARE myQuery;
end $$

delimiter ;