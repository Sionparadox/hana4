drop procedure if exists sp_deptinfo;
DELIMITER $$
CREATE Procedure sp_deptinfo(_dept_name varchar(31)) 
BEGIN
	select count(*) empcnt, format((salary) * 10000,0) avgsal from v_emp_dept where dname = _dept_name; 
    
    

END $$
DELIMITER ;